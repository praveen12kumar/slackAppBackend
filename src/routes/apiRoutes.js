import express from 'express';

import v1Routes from "./v1/v1Routes.js";


const router = express.Router();

router.use('/v1', v1Routes);

export default router;