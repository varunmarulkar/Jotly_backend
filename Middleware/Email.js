import { Verification_Email_Template, Welcome_Email_Template } from "../EmailTemplate.js";
import { transporter } from "./Email.config.js";
import { EMAIL_USER,EMAIL_PASS } from "../config/gmailConfig.js";

export async function SendVerificationCode(email,verificationCode){
    try {
        const response = await transporter.sendMail({
            from:'"Jotly App" <${EMAIL_USER}>"',
            to: email,
            subject: "Verify your email ✔",
            text: "Verify your email", // plain‑text body
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode), // HTML body
          });

          console.log(EMAIL_USER)
    } catch (error) {
        console.log("Email error")
    }
}

export async function WelcomeEmail(email,name){
    try {
        const response = await transporter.sendMail({
            from:'"Jotly App" <${EMAIL_USER}>"',
            to: email,
            subject: "Verify your email ✔",
            text: "Verify your email", // plain‑text body
            html: Welcome_Email_Template.replace("{name}",name), // HTML body
          });
    } catch (error) {
        console.log("Email error")
    }
}

