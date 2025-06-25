import {v4 as uuidv4} from 'uuid';

import channelRepository from '../repository/channelRepository.js';
import workspaceRepository from "../repository/workSpaceRepository.js";
import {NotFound, UnAuthorized} from '../utils/errors/index.js';
import ValidationError from '../utils/errors/validationError.js';

const isUserAdminOfWorkspace = (userId, workspace) => {
    return workspace.members.find((member) => member.memberId.toString() === userId.toString() && member.role === "admin");
}

const isUserMemberOfWorkspace = (workspace, userId)=>{
    return workspace.members.find((member) => member.memberId.toString() === userId.toString());
}



export const createWorkspaceService = async(workspaceData)=>{
    //console.log("workspaceData", workspaceData);
    try {
        const joinCode = uuidv4().substring(0, 6).toUpperCase();

        const response = await workspaceRepository.create({
            name:workspaceData.name,
            description: workspaceData.description,
            joinCode
        });

        //console.log("response workspace", response);

        await workspaceRepository.addMemberToWorkSpace(
            response._id, workspaceData.owner, "admin");

        const updatedWorkspace = await workspaceRepository.addChannelToWorkSpace(response._id, "general");

        return updatedWorkspace;

      } catch (error) {
        //console.log("error", error);
        console.log(`Error in creating workspace: ${error}`);
        if( error.name === 'MongooseError'){
            throw new ValidationError({
            error: ['A user with same email or username already exists']
            }, `A user with same email or username already exists`);
        }
        throw error;
      }

}


export const getWorkspacesUserIsMemberOfService = async(userId)=>{
    try {
        const response = await workspaceRepository.fetchAllWorkspaceByMemberId(userId);

        return response;
    } catch (error) {
        console.log(`Error in getting workspaces user is member of: ${error}`);
        throw error;
    }
}


export const deleteWorkspaceService = async(workspaceId, userId)=>{
    try{
        const workspace = await workspaceRepository.getById(workspaceId);

        if(!workspace){
            throw new NotFound("Workspace", workspaceId);
        }

        const isAllowed = isUserAdminOfWorkspace(userId, workspace); 

        // delete channels
        if(isAllowed){
            await channelRepository.deleteMany(workspace.channels);
            const response = await workspaceRepository.delete(workspaceId);
            return response;
        }

        throw new UnAuthorized("User is either not a member or an admin of this workspace");
    }
    catch(error){
        console.log(`Error in deleting workspace: ${error}`);
        throw error;
    }
}