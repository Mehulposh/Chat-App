import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { connectDB } from './LIB/db.js';
import userRouter from './routes/userRoute.js';
import messageRouter from './routes/messageRoutes.js';
import {initSocket} from '../Server/Socket/socket.js';
import { Socket } from 'dgram';
import { log } from 'console';

//Create Express app and HTTP server 

const app = express();

const server = http.createServer(app);

//initialize socket.io server
initSocket(server);


//Middleware setup

app.use(express.json({limit: '4mb'}));
app.use(cors());

//Route setup

app.use('/api/status', (req,res) => res.send('server is live') );
app.use('/api/auth',userRouter);
app.use('/api/messages',messageRouter);

//Connect to DB
await connectDB();

if(process.env.NODE_ENV !== 'production'){
    const PORT = process.env.PORT || 5000;

server.listen(PORT , ()=> console.log('server is running on PORT:' + PORT));
}

//export server for vercel
export default server;
