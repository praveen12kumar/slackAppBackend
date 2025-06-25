import userRepository from "../repository/userRepository.js"
import ValidationError from "../utils/errors/validationError.js";

export const signUpService = async(data)=>{
   try {
     const newUser = await userRepository.create(data);
     return newUser;

   } catch (error) {
    console.log(`Error in creating user: ${error}`);
    console.log("errors",error);
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