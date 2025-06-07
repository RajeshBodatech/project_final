require('dotenv').config();
const twilio = require('twilio');

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const verifyService = process.env.TWILIO_VERIFY_SID;

const sendOTP = async (phoneNumber, countryCode) => {
    try {
        // Clean phone number format
        phoneNumber = phoneNumber.replace(/^\+/, '').replace(/[^0-9]/g, '');
        const fullNumber = `+${countryCode}${phoneNumber}`;
        console.log('Sending OTP to number:', fullNumber); // Debug log
        
        const verification = await client.verify.v2.services(verifyService)
            .verifications
            .create({
                to: fullNumber,
                channel: 'sms'
            });
            
        console.log('Twilio send response:', verification); // Debug log
        
        return {
            success: true,
            status: verification.status
        };
    } catch (error) {
        console.error('Failed to send OTP:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

const verifyOTP = async (phoneNumber, countryCode, code) => {
    try {
        // Clean phone number format
        phoneNumber = phoneNumber.replace(/^\+/, '').replace(/[^0-9]/g, '');
        const fullNumber = `+${countryCode}${phoneNumber}`;
        console.log('Verifying OTP for number:', fullNumber); // Debug log
        
        const verificationCheck = await client.verify.v2.services(verifyService)
            .verificationChecks
            .create({
                to: fullNumber,
                code: code
            });
            
        console.log('Twilio verification response:', verificationCheck); // Debug log
        
        return {
            success: verificationCheck.status === 'approved',
            status: verificationCheck.status
        };
    } catch (error) {
        console.error('Failed to verify OTP:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

module.exports = {
    sendOTP,
    verifyOTP
};