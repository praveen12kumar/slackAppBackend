

import User from "../schema/userSchema.js";
import Workspace from "../schema/workspaceSchema.js";
import { BadRequest,NotFound } from "../utils/errors.js";
import crudRepository from "./crudRepository";

const workSpaceRepository = {
    ...crudRepository("WorkSpace"),


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

    addChannelToWorkSpace: function(){},

    fetchAllWorkspaceByMemberId: function(){}
}



export default workSpaceRepository;

