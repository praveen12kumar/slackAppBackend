import userRepository from "../repository/userRepository.js"

export const signUpService = async(data)=>{
   try {
     const newUser = await userRepository.create(data);
     return newUser;

   } catch (error) {
    console.log(`Error in creating user: ${error}`);
   }
}