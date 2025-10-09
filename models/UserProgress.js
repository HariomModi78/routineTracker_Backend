const mongoose = require("mongoose");
const UserProgress = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,unique:true},
    chart:{type:Array}
})

module.exports = mongoose.model("UserProgress",UserProgress);