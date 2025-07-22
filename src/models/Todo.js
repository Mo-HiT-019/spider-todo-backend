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
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    createdBy: {
         type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('Todo',todoScheme)