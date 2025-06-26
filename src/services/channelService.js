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

        return channel;
    } catch (error) {
        console.log(`Error in getting channel by id: ${error}`);
        throw error;
    }
}