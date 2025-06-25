

import User from "../schema/userSchema.js";
import Workspace from "../schema/workspaceSchema.js";
import { BadRequest,NotFound } from "../utils/errors/index.js";
import channelRepository from "./channelRepository.js";
import crudRepository from "./crudRepository.js";

const workspaceRepository = {
    ...crudRepository(Workspace),


    getWorkSpaceByName: async function (workSpacename) {
        const workSpace = await Workspace.findOne({ name: workSpacename });
        if(!workSpace) 
            throw new NotFound("WorkSpace", workSpacename); 
        
        return workSpace;
    },


    getWorkSpaceByJoinCode: async function (joinCode) {
        const workSpace = await Workspace.findOne({ joinCode: joinCode });
        if(!workSpace) 
            throw new NotFound("WorkSpace", joinCode);
        return workSpace;
    },


    addMemberToWorkSpace: async function(workSpaceId, memberId, role){
        //console.log("workSpaceId", workSpaceId, memberId, role);
        const workSpace = await Workspace.findById(workSpaceId );
        
        if(!workSpace) 
            throw new NotFound("WorkSpace", workSpaceId); 
        
        const isValidUser = await User.findById(memberId);
        
        if(!isValidUser) 
            throw new NotFound("User", memberId);

        const isMemberAlreadyPartOfWorkspace = workSpace.members.some((member) => member.memberId.equals(memberId));

        if(isMemberAlreadyPartOfWorkspace) 
            throw new BadRequest("User", "User already part of workspace");


        workSpace.members.push({memberId, role});
        await workSpace.save();

        return workSpace;
    },

    addChannelToWorkSpace: async function(workSpaceId, channelName){
        
        const workSpace = await Workspace.findById(workSpaceId ).populate("channels");
        
        if(!workSpace) 
            throw new NotFound("WorkSpace", workSpaceId);
        
        const isChannelAlreadyPartOfWorkSpace = workSpace.channels.some((channel) => channel.name.toString() === channelName.toString());

        //console.log("isChannelAlreadyPartOfWorkSpace", isChannelAlreadyPartOfWorkSpace);
        if(isChannelAlreadyPartOfWorkSpace) 
            throw new BadRequest("Channel", "Channel already part of workspace");

        const channel = await channelRepository.create({name: channelName});
        //console.log("channel", channel);
        workSpace.channels.push(channel);
        await workSpace.save();
        
        return workSpace;
    },

    fetchAllWorkspaceByMemberId: async function(memberId){
        const workSpace = await Workspace.find({
            'members.memberId': memberId
        }).populate('members.memberId', 'username email avatar');

        return workSpace;

    }
}



export default workspaceRepository;

