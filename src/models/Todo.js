import mongoose from "mongoose";

const todoScheme = new mongoose.Schema({

    title:String,
    description:String,
    status:{
        type:String,
        state:['pending','completed'],
        default:'pending'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

export default mongoose.model('Todo',todoScheme)