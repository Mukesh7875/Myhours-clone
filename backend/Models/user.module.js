

const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    full_name: String,
    email : {type:String, required:true},
    password : {type:String, required:true},
    
},{
    versionKey:false
})

const userModel = mongoose.model("User", userSchema )

module.exports={
    userModel
}
