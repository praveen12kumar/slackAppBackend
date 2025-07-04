import bcrypt from "bcryptjs";

import { ENABLE_EMAIL_VERIFICATION } from "../config/serverConfig.js";
import { addEmailToMailQueue } from "../producer/mailQueueProducer.js";
import userRepository from "../repository/userRepository.js"
import { generateToken } from "../utils/common/authUtils.js";
import { verifyEmailMail } from "../utils/common/mailObject.js";
import { BadRequest, NotFound } from "../utils/errors/index.js";
import ValidationError from "../utils/errors/validationError.js";

export const signUpService = async(data)=>{
   try {
     const newUser = await userRepository.signUpUser(data);
     
    if (ENABLE_EMAIL_VERIFICATION === 'true') {
      // send verification email
      addEmailToMailQueue({
        ...verifyEmailMail(newUser.verificationToken),
        to: newUser.email
      });
    }
     
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
      _id: user._id,
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


export const verifyTokenService = async(token)=>{
  
  try {
    const user = await userRepository.getUserByToken(token);
    
    if(!user){
      throw new NotFound("token", token);
    }

    // check if the token is expired or not

    if(user.verificationTokenExpiry < Date.now()){
      throw new BadRequest("token", token);
    };

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    await user.save();

    return user

  } catch (error) {
    console.log(`Error in signing in user: ${error}`);    
    throw error;
  }
}