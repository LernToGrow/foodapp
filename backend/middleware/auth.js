import jwt from 'jsonwebtoken';
// const { ObjectId } = require('mongodb');
// import ObjectId from 'bson-objectid';

const authmiddleware = async (req,res,next)=>{
    const {token} = req.headers;
    if(!token) {
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        // const userId = ObjectId.isValid(token_decode.id) ? new ObjectId(token_decode.id) : null;
        // if(userId == null){
        //     res.json({success:false,message:"userId having Error"});
        //     return false;
        // } 
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export default authmiddleware;