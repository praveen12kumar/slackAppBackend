import channelRepository from "../repository/channelRepository.js";
import messageRepository from "../repository/messageRepository.js";
import { UnAuthorized } from "../utils/errors/index.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";

export const getMessageService = async(messageParams, page, limit, user)=>{
    console.log("messageParams", messageParams, page, limit, user);
    
    const channelDetails = await channelRepository.getChannelWithWorkspaceDetails(messageParams.channelId);

    const workspaceDetails = channelDetails.workspaceId;

    const isMember = await isUserMemberOfWorkspace(workspaceDetails, user);

    if(!isMember){
        throw new UnAuthorized("User is not a member of this workspace");
    }
    
    const messages = await messageRepository.getPaginatedMessaged(messageParams, page, limit);
    
    return messages
}



export const createMessageService = async(messageData)=>{
    
    const newMessage = await messageRepository.create(messageData);
    console.log("newMessage", newMessage);
    return newMessage;
}