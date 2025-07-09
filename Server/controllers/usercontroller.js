import bcrypt, { hash } from 'bcryptjs';
import {generateToken} from '../LIB/utils';
//Signup a new user

import User from "../models/user";

export const signup = async (req,res) => {
    const {fullname,email,password,bio} = req.body;

    try {
        if(!fullname || !email || !password || !bio){
            return res.json({success: false, message: 'Missing Data'});
        }
        const user = await User.findOne({email});

        if(user){
            return res.json({success: false, message: 'Account already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({fullname,email,password: hashpassword, bio});

        const token = generateToken(newUser._id);

        res.json({success: true, userData: newUser,token, message: ' Account created successfully'});
    } catch (error) {
        res.json({success: false, message: error.message})
        console.log(error.message);
    }
} 


//controller to login

export const login = async (req,res) => {

    try {
        const {email,password} = req.body;

        const userData = await User.findOne({email});

        const isPasswordCorrect = await bcrypt.compare(password,userData.password);

        if(!isPasswordCorrect) {
            return res.json({ success:false, message: 'Invalid credentials'});
        }

        const token = generateToken(userData._id);

        res.json({success: true,userData,token, message: ' Login successfully'});

    } catch (error) {
        res.json({success: false, message: error.message})
        console.log(error.message);
    }

}


//Controller to chack is user is authenticated

export const checkAuth = (req,res) => {
    res.json({success: true, user: req.user});
}