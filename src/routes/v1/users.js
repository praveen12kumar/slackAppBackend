import express from 'express';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();


 
router.use('/', (req, res)=>{
    res.status(StatusCodes.OK).send('Users');
})


export default router;