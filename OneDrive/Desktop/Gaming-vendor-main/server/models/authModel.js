const {Schema, model} =   require("mongoose");
const bcrypt = require("bcrypt");

const gamerSchema = new Schema({
   firstName:{
      type: String,
      required: true
   },
   lastName:{
    type: String,
    required: true
   },
   dob:{
     type:Date,
     required:true
   },
   password: {
      type: String,
      required: true
   },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique:true,
    },
    gender: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    }
   },
   {timestamp:true}
   )

   gamerSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified("password")) return next();
    user.password = bcrypt.hash(user.password,10);
    next();
   })
  
   //now create a collection inside the database

   const gamer = new model("gamerdb",gamerSchema);
   
   module.exports=gamer;