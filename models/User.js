const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firebaseUid:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    userName:{type:String,require:true},
    profilePicture:{type:String},
    totalTasks:{type:Number},
    completedTasks:{type:Number}
},{timestamps:true})

module.exports = mongoose.model("User",UserSchema);