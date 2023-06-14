const User = require("../models/authModel");
const userOTPVerification = require("../models/userOTPVerification");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/token");
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')

const transporter = nodemailer.createTransport({
  // host: "smtp-mail.outlook.com",
  // port: 587,
  auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS
  }
  
});

const sendVerificationEmail= async({_id,email},res)=>{
  try{
    const otp = otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
    await userOTPVerification.deleteMany({userId:_id});
    console.log(otp)
    const mailOptions={
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify your email",
      html:`<p>Enter <b>${otp}</b> to verify your email ...</p>`
    }

    const hashedotp = await bcrypt.hash(otp, 10);
    const value = await userOTPVerification.create({
      userId:_id,
      otp:hashedotp,
      createdAt:Date.now(),
      expiresAt:Date.now() + 4800000
    });

    transporter.sendMail(mailOptions,(err, info) => {
      if(err){
        console.log('err',err);
        console.log(info.messageId);
      }  
    });
    return value.userId;
  }catch(err){
    console.log(err);
    res.status(500).json({msg:err});
  }

}

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, dob, password ,email, phoneNumber , address , gender } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({success:false, msg: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createuser =await User.create({ firstName,lastName, dob,password: hashedPassword ,email,phoneNumber,address , gender})

    // const data = await sendVerificationEmail(createuser,res);

    res.status(200).send({userId:createuser._id , msg:"Registration Successful"})

    }
catch (error) {
  if (error.code === 11000 && error.name === 'MongoServerError') {
    // Duplicate key error
    res.status(400).json({ error: 'Phone number already exists' });
  }
  else{
    res.status(500).json({ error: `Internal server error ${error}` });
  }
}
}

exports.login = async (req, res) => {
    try {
        const { password ,email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ status: false, msg: "This email is not registered!!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ status: false, msg: "Password incorrect!!" });
        // const token = createAccessToken({ id: user._id });
        res.status(200).json({user, status: true, msg: "Login successful.." });
    }
    catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error hee" });
  }
}

exports.verifyOtp = async(req,res) =>{
  try{
    // const {otp1,otp2,otp3,otp4,otp5,otp6} = req.body;
    // const otp = otp1+otp2+otp3+otp4+otp5+otp6;
       const {otp ,val} = req.body;
       const otpvalue = await userOTPVerification.findOne({userId : val});
       const result = await bcrypt.compare(otp , otpvalue.otp);
    // const userid = req.body.userid;
    // const otpvalue =  await userOTPVerification.findOne({userId:userid});
    // const result  = await bcrypt.compare(otp,otpvalue.otp);
    // if (result){
    //   res.redirect('/login');
    // }
       if (result){
          res.status(200).json({status:true,msg:"otp matched"})
       }
    else{
      res.status(400).json({ status: false, msg: "otp mismatched" });
    }
     
  }
   catch (err) {
     console.error(err);
     return res.status(500).json({ status: false, msg: "Internal Server Error" }); }
   
}

exports.resendOtp = async(req,res)=>{
  try{
  const userid = req.body.userid;
  const user = await User.findById(userid);
  if (!user) {
    return res.status(400).json({ status: false, msg: "User not found" });
  }
  const data = await sendVerificationEmail(user, res);
  res.redirect(`/otpverify/${data}`);
 }
  catch (err) {
    console.error(err);
  return res.status(500).json({ status: false, msg: "Internal Server Error" });

}
}