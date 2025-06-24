import express from 'express';
import connectDB from './config/dbConnect.js';
import { PORT } from './config/serverConfig.js'
const app = express();
app.use(express.json({ extended: true }));

app.listen(PORT, async() => {
  console.log(`Server running on port: ${PORT}`);
  await connectDB();
});
