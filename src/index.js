import express from 'express';

import { serverAdapter } from './config/bull-board.config.js';
import connectDB from './config/dbConnect.js';
import { PORT } from './config/serverConfig.js'
import apiRouter from './routes/apiRoutes.js';
import { errorHandler } from './utils/errorHandle.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/ui', serverAdapter.getRouter());

app.use('/api', apiRouter)

app.use(errorHandler);

app.listen(PORT, async() => {
  console.log(`Server running on port: ${PORT}`);
  await connectDB();
});
