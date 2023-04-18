import express from "express";
import { UserController } from "../Controller/UserController";


export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get('/profile', userController.getProfile);
userRouter.get('/allUsers', userController.allUsers);