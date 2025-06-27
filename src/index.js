import express from 'express';
import {createServer} from 'http';
import { Server } from 'socket.io';

import { serverAdapter } from './config/bull-board.config.js';
import connectDB from './config/dbConnect.js';
import { PORT } from './config/serverConfig.js'
import channelSocketHandlers from './controllers/channelSocketController.js';
import messageSocketHandlers from './controllers/messageSocketController.js';
import apiRouter from './routes/apiRoutes.js';
import { errorHandler } from './utils/errorHandle.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);
const io = new Server(server);


app.use('/ui', serverAdapter.getRouter());

app.use('/api', apiRouter)

app.use(errorHandler);

// Listen for a new client socket connection
io.on('connection', (socket) => {
  // console.log('a user connected', socket.id);

  // // Listen for an event 'messageFromClient' sent by the connected client
  // socket.on('messageFromClient', (data) => {
  //   console.log("message from client", data);

  //   // Broadcast the received message (converted to uppercase) to all connected clients
  //   // server will emit the event 'broadcast'
  //   io.emit("broadcast", data.toUpperCase());
  // });

  messageSocketHandlers(io, socket);
  channelSocketHandlers(io, socket);

});

server.listen(PORT, async() => {
  console.log(`Server running on port: ${PORT}`);
  await connectDB();
});
