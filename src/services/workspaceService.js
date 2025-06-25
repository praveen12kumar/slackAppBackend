import {v4 as uuidv4} from 'uuid';

import workspaceRepository from "../repository/workSpaceRepository.js";
import ValidationError from '../utils/errors/validationError.js';


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