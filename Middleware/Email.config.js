  import nodemailer from "nodemailer"
  import { EMAIL_PASS,EMAIL_USER } from "../config/gmailConfig.js";

  export const transporter = nodemailer.createTransport({
      
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
        
      },


    });


