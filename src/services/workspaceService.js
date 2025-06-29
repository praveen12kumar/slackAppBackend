import {v4 as uuidv4} from 'uuid';

import { addEmailToMailQueue } from '../producer/mailQueueProducer.js';
import channelRepository from '../repository/channelRepository.js';
import userRepository from '../repository/userRepository.js';
import workspaceRepository from "../repository/workSpaceRepository.js";
import {workspaceJoinMail} from '../utils/common/mailObject.js';
import {BadRequest, NotFound, UnAuthorized} from '../utils/errors/index.js';
import ValidationError from '../utils/errors/validationError.js';


const isUserAdminOfWorkspace = (workspace, userId) => {    
    return workspace.members.find((member) => member.memberId.toString()  === userId 
                                        || member.memberId._id.toString() === userId
    && member.role === "admin");
}

export const isUserMemberOfWorkspace = (workspace, userId)=>{
   //console.log("workspace", workspace, userId);
    return workspace.members.find((member) => member.memberId?._id.toString() === userId);
}

const isChannelAlreadyPartOfWorkspace = (workspace, channelName) => {
    return workspace.channels.find((channel) => channel.name.toLowerCase() === channelName.toLowerCase());
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

        await workspaceRepository.addMemberToWorkspace(
            response._id, workspaceData.owner, "admin");

        const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(response._id, "general");

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

        const isAllowed = isUserAdminOfWorkspace(workspace, userId); 
        console.log("isAllowed", isAllowed);
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


export const getWorkspaceService = async(workspaceId, userId)=>{
    try {
        const workspace = await workspaceRepository.getWorkspaceDetailsById(workspaceId);

        if(!workspace){
            throw new NotFound("Workspace", workspaceId);
        }
        const isMember = isUserMemberOfWorkspace(workspace, userId);
        if(!isMember){
            throw new UnAuthorized("User is not a member of this workspace");
        }
        return workspace;
    } catch (error) {
        console.log(`Error in getting workspace: ${error}`);
        throw error;
    }
}

export const getWorkspaceDetailsByJoinCodeService = async(joinCode, userId)=>{
    try {
        const workspace = await workspaceRepository.getWorkSpaceByJoinCode(joinCode);

        if(!workspace){
            throw new NotFound("Workspace", joinCode);
        }

        const isMember = isUserMemberOfWorkspace(workspace, userId);
        if(!isMember){
            throw new UnAuthorized("User is not a member of this workspace");
        }
        return workspace;
    } catch (error) {
        console.log(`Error in getting workspace by Joincode: ${error}`);
        throw error;
    }
}

export const updateWorkspaceService = async(workspaceId, workspaceData, userId)=>{
    try {
        const workspace = await workspaceRepository.getById(workspaceId);
  
        if(!workspace){
            throw new NotFound("Workspace", workspaceId);
        }
        const isAdmin = isUserMemberOfWorkspace(workspace, userId);
        console.log("isAdmin", isAdmin);
        if(!isAdmin){
            throw new UnAuthorized("User is not a member of this workspace");
        }
        const updatedWorkspace = await workspaceRepository.update(workspaceId, workspaceData);
        return updatedWorkspace;

    } catch (error) {
        console.log(`Error in updating workspace: ${error}`);
        throw error;
    } 
}

export const addMemberToWorkspaceService = async (workspaceId, memberId, role, userId) => {
    //console.log('addMemberToWorkspaceService', workspaceId, memberId, role, userId);
  try {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
      throw new NotFound("Workspace", workspaceId);
    }
    //console.log("workspace", workspace);
    const isAdmin = isUserAdminOfWorkspace(workspace, userId);
    if (!isAdmin) {
      throw new UnAuthorized("User is not an admin of this workspace");
    }

    const isValidUser = await userRepository.getById(memberId);
    if (!isValidUser) {
        throw new NotFound("User", memberId);
    }

    const isMember = isUserMemberOfWorkspace(workspace, memberId);
    if (isMember) {
      throw new BadRequest("User", "User already member of workspace");
    }

    const response = await workspaceRepository.addMemberToWorkspace(
      workspace,
      memberId,
      role
    );
    addEmailToMailQueue(
      {...workspaceJoinMail(workspace),
        to: isValidUser.email
      });
      
    return response;
  } catch (error) {
    console.log('addMemberToWorkspaceService error', error);
    throw error;
  }
};

export const addChannelToWorkspaceService = async (
  workspaceId,
  channelName,
  userId
) => {
  try {
    const workspace = await workspaceRepository.getWorkspaceDetailsById(workspaceId);
    if (!workspace) {
       throw new NotFound("Workspace", workspaceId);
    }
    //console.log('addChannelToWorkspaceService', workspace, userId);
    const isAdmin = isUserAdminOfWorkspace(workspace, userId);
    if (!isAdmin) {
      throw new UnAuthorized("User is not an admin of this workspace");
    }
    const isChannelPartOfWorkspace = isChannelAlreadyPartOfWorkspace(
      workspace,
      channelName
    );

    if (isChannelPartOfWorkspace) {
      throw new BadRequest("Channel", "Channel already part of workspace");
    }
    //console.log('addChannelToWorkspaceService', workspaceId, channelName);
    const response = await workspaceRepository.addChannelToWorkspace(
      workspaceId,
      channelName
    );

    return response;
  } catch (error) {
    console.log('addChannelToWorkspaceService error', error);
    throw error;
  }
};

export const joinWorkspaceService = async (workspaceId, joinCode, userId) => {
  try {
    const workspace =
      await workspaceRepository.getWorkspaceDetailsById(workspaceId);
    if (!workspace) {
      throw new NotFound("Workspace", workspaceId);
    }

    if (workspace.joinCode !== joinCode) {
      throw new BadRequest("Workspace", "Invalid join code");
    }

    const updatedWorkspace = await workspaceRepository.addMemberToWorkspace(
      workspaceId,
      userId,
      'member'
    );

    return updatedWorkspace;
  } catch (error) {
    console.log('joinWorkspaceService error', error);
    throw error;
  }
};