import User from "../schema/userSchema.js";
import crudRepository from "./crudRepository.js";

const userRepository = {...crudRepository(User),

    signUpUser: async function(data) {
        const newUser = new User(data);
        await newUser.save();
        return newUser;
    },


    getUserByEmail: async(email) =>{
    const user = await User.findOne({email});
    return user
    },

    getUserByName: async(name) =>{
    const user = await User.findOne({username: name}).select('-password'); // exclude password
    return user;
    },

    getUserByToken: async(token) =>{
        const user = await User.findOne({verificationToken: token}).select('-password'); // exclude password
        return user;
    }
}


export default userRepository;





