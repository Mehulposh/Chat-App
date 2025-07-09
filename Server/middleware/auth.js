import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.js";


//Middleware to prtect route



export const protectRoute = async (req,res,next) => {
    try {
        const token = req.headers.token;

        const decoded = jwt.verify(token,process.env.JWT_KEY)

        const user = await User.findById(decoded.userId).select('-password');

        if(!user) {
            return res.json({success: false, message: 'User not found'});
        }
        req.user = user;

        next();
    } catch (error) {
        res.json({success: false, message:error.message});
        console.log(error.message);
    }
}