const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb successfully connected✅");
})
.catch((e)=>{
    console.log(e.message);
    console.log("Mongodb connection failed❌");
})

module.exports = connection;