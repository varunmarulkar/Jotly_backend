import UserModel from "../Models/User.model.js";
import crypto from "crypto"
import { SendVerificationCode, WelcomeEmail } from "../Middleware/Email.js";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/gmailConfig.js";
import { EMAIL_PASS,EMAIL_USER } from "../config/gmailConfig.js";

export async function register(req, res) {

    try {
        const { name, email} = req.body

        if (!name || !email) {
          return  res.status(400).json({ message: "All fields are required" })
        }
  
        const isExisted = await UserModel.findOne({ email })

        if (isExisted) {
          return  res.status(400).json({ message: "User already exist" })
        }

    
        const verificationCode=crypto.randomInt(100000,900000).toString()
        const expiryTime = new Date(Date.now() + 10 * 60 * 1000);

        const newUser = await UserModel.create({ name, email, verificationCode,verificationCodeExpiry:expiryTime })

        SendVerificationCode(newUser.email, verificationCode)
        res.status(201).json({ message: "User created successfully", newUser })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export async function verifyEmail(req, res) {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Email and code are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.verificationCodeExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired, please request a new one" });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }


    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpiry=null;

    WelcomeEmail(user.email,user.name)

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }

    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
