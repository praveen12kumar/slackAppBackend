import Message from "../schema/messageSchema.js";
import crudRepository from "./crudRepository.js";

const messageRepository = {
    ...crudRepository(Message),

    

};

export default messageRepository;