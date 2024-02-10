import express from "express";
import * as authHandlers from "./../handlers/authHandlers.js";

const authRouter = express.Router();

authRouter.post("/register", authHandlers.registerUser);
authRouter.post("/login", authHandlers.loginUser);

export default authRouter;
