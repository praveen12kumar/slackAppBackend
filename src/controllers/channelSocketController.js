import { JOIN_CHANNEL } from "../utils/common/eventConstants.js";

export default function messageHandlers (io, socket){
    socket.on(JOIN_CHANNEL, async function joinChannelHandler(data, cb){
        
        const roomId = data.channelId;
        socket.join(roomId);
        console.log("User Joined channel with: ", roomId, "and",socket.id);
        cb?.({
            success: true,
            message: "Joined channel successfully",
            data: roomId
        })
    });
}