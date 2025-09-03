import { register, verifyEmail } from "../Controllers/user.controller.js";

export function userRoutes(app) {
    app.post("/register", register)
    app.post("/verifyemail", verifyEmail)
}