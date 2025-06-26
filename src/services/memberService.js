import userRepository from "../repository/userRepository.js";
import workspaceRepository from "../repository/workSpaceRepository.js";
import { NotFound, UnAuthorized } from "../utils/errors/index.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";


export const isMemberPartOfWorkspaceService = async(workspaceId, memberId)=>{
    try {
        const workspace = await workspaceRepository.getById(workspaceId);
        if(!workspace){
            throw new NotFound("Workspace", workspaceId);
        }

        const isUserMember = isUserMemberOfWorkspace(workspace, memberId);
        if(!isUserMember){
            throw new UnAuthorized("User is not a member of this workspace");
        }

        const user = await userRepository.getById(memberId);

        return user;
        
    } 
    catch (error) {
        console.log(`Error in getting workspace: ${error}`);
        throw error;
    }
}