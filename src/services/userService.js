import bcrypt from "bcryptjs";

import userRepository from "../repository/userRepository.js"
import { generateToken } from "../utils/common/authUtils.js";
import { BadRequest, NotFound } from "../utils/errors/index.js";
import ValidationError from "../utils/errors/validationError.js";

export const signUpService = async(data)=>{
   try {
     const newUser = await userRepository.create(data);
     return newUser;

   } catch (error) {
    console.log(`Error in creating user: ${error}`);
    if(error.name === 'ValidationError'){  
      throw new ValidationError({
        error: error.errors
      }, error.message);
    }
    if( error.name === 'MongooseError'){
      throw new ValidationError({
        error: ['A user with same email or username already exists']
      }, `A user with same email or username already exists`);
    }
  }
}



export const signInService = async(data)=>{
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if(!user){
      throw new NotFound("email", data.email);
    }
    // match password

    const isMatch = await bcrypt.compareSync(data.password, user.password);
    if(!isMatch){
      throw new BadRequest("password", data.password);
    }

    return {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      token: generateToken({_id: user._id, email: user.email})
    }

  } catch (error) {
    console.log(`Error in signing in user: ${error}`);    
    throw error;
  }
}