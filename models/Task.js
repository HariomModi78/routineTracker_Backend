const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    task:{type:String,required:true},
    isCompleted:{type:String,default:false},
    createdAt:{type:Date,required:true}
});

module.exports = mongoose.model("Task",TaskSchema);