const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOTPVerificationSchema = new Schema({
    userId:{
        type: String
    },
    otp:{
        type: String
    },
    createdAt:{
        type: Date
    },
    expiresAt:{
        type: Date
    }
})

const userOTPVerification = new mongoose.model('userOTPVerification',userOTPVerificationSchema);

module.exports = userOTPVerification;