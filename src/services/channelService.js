import channelRepository from "../repository/channelRepository.js";
import {NotFound, UnAuthorized} from "../utils/errors/index.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";

export const getChannelByIdService = async(channelId, userId) =>{
    try {
        const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);
        if(!channel || !channel.workspaceId){
            throw new NotFound("Channel or Workspace", channelId);
        }

        const isUserPartOfWorkspace = isUserMemberOfWorkspace(channel.workspaceId, userId);

        if(!isUserPartOfWorkspace){
            throw new UnAuthorized("User is not a member of this workspace");
        }

        const messages = await channelRepository.getPaginatedMessaged({channelId}, 1, 20);
        
        return{
            messages,
            _id: channel._id,
            name: channel.name,
            createdAt: channel.createdAt,
            updatedAt: channel.updatedAt,
            workspaceId: channel.workspaceId
        }
    } catch (error) {
        console.log(`Error in getting channel by id: ${error}`);
        throw error;
    }
}



