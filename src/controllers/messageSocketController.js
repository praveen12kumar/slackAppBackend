import { createMessageService } from "../services/messageService.js";
import { NEW_MESSAGE_EVENT, NEW_MESSAGE_RECEIVED_EVENT } from "../utils/common/eventConstants.js";



export default function messageHandlers(io, socket) {
    socket.on(NEW_MESSAGE_EVENT, async function createMessageHandlerController(data, cb){
        const {channelId} = data;
        console.log("channelId", channelId);
        console.log("data", data);
        const messageResponse = await createMessageService(data);
    
    io.to(channelId).emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);
    cb({
        success: true,
        message: "Message created successfully",
        data: messageResponse
        })
    })
}

