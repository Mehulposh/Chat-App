import Message from "../models/message.js";
import User from "../models/user.js";

//Get all users except logedin user
export const getUsers = async (req,res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select('-password');

        //number of unseen messages
        const UnseenMsg = {};
        const Promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({senderID: user._id, receiverID: userId, seen: false});
            if(messages.length > 0 ){
                UnseenMsg[user._id] = messages.length;
            }
        } )
        await Promise.all(Promises);
        res.json({success: true, users: filteredUsers, UnseenMsg});
    } catch (error) {
        console.log(error.messages);
        
         res.json({success: false, message: error.message});
    }
}


//Get all messages for selected user
export const getMessages = async (req,res) => {
    try {
        const {id: selectedUserId} = req.params;
        const myId = req.user._id;
        
        const messages = await Message.find({
            $or: [
                {senderID: myId, receiverID: selectedUserId},
                {senderID: selectedUserId, receiverID: myId},
            ]
        })

        await Message.updateMany({
            senderID: selectedUserId,
            receiverID: myId,
        }, {
            seen: true
        });

        res.json({success: true, messages});

    } catch (error) {
        console.log(error.messages);
        
        res.json({success: false, message: error.message});
    }
}


//api to mark message as seen
export const markMsgAsSeen = async (req,res) => {
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id,{seen: true});
        res.json({success:true});

    } catch (error) {
        console.log(error.messages);
        
        res.json({success: false, message: error.message});
    }
}