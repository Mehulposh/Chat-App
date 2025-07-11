import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getMessages, getUsers, markMsgAsSeen, sendMessage } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get('/users', protectRoute, getUsers);
messageRouter.get('/:id', protectRoute, getMessages);
messageRouter.put('/mark/:id', protectRoute, markMsgAsSeen);
messageRouter.post('/send/:id', protectRoute, sendMessage);


export default messageRouter;