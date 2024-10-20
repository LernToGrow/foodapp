import foodModel from "../models/foodmodel.js";
import fs from 'fs';    
import { error } from "console";

// add food item
const   addFood = async (req,res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
          name:req.body.name,
          description:req.body.description,
          price:req.body.price,
          category:req.body.category,
          image:image_filename
    });
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        res.json({success:false,message:`Error is ${error}`})
    }
}

// all food list
const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log("Error in get food list",error);
        res.json({success:false,message:"Error"})
    }
}
// remove food 
const removeFood =  async(req,res)=>{
    try {
        if(!req.body.id) throw error("Record id missing");
        const food = await foodModel.findById(req.body.id);
        console.log(food);
        // if(food){
            fs.unlink(`uploads/${food.image}`,()=>{})
        // }
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}




export {addFood,listFood,removeFood  }

