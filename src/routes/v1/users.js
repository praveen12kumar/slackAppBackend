import express from 'express';

import { signup } from '../../controllers/userController.js';
import { userSignUpSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidate.js';

const router = express.Router();


 
router.post('/signup', validate(userSignUpSchema), signup);


export default router;