import {v4 as uuidv4} from 'uuid';

import workspaceRepository from "../repository/workSpaceRepository.js";
export const createWorkSpaceService = async(workspaceData)=>{
    try {
        const joinCode = uuidv4().substring(0, 6);

        const response = await workspaceRepository.create({
            name:workspaceData.name,
            description: workspaceData.description,
            joinCode
        });

        await workspaceRepository.addMemberToWorkSpace(
            response._id, workspaceData.owner, "admin");

        await workspaceRepository.addChannelToWorkSpace(response._id, "general");

        return response;

      } catch (error) {
        console.log(`Error in creating workspace: ${error}`);
        throw error;
      }

}