import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// login user

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Doesnt Exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid Crreadentails"});
        }
        const token = createToken(user._id);
        res.json({success:true,token,userData:user})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }
};

// create token
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
};


// register user 
const registerUser  = async(req,res)=>{
    const {name,password,email} = req.body;
    console.log(name,password,email);
    try {
        // code for chack user allrady exists
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:"User Already Exists"})
        }
        // valodating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter valid email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"please enter strong password"})
        }
        // hasing user pawword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(password,salt);

        const newUSer = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        });
        const user = await newUSer.save();
        if(user){
            const token =createToken(user._id)
            res.json({success:true,token,userData:user})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in User Create"+error})
    }
}

export {loginUser,registerUser}