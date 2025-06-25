import User from "../schema/userSchema.js";
import crudRepository from "./crudRepository.js";

const userRepository = {...crudRepository(User),

    getUserByEmail: async(email) =>{
    const user = await User.findOne({email});
    return user
    },

    getUserByName: async(name) =>{
    const user = await User.findOne({username: name}).select('-password'); // exclude password
    return user;
    }
}


export default userRepository;





