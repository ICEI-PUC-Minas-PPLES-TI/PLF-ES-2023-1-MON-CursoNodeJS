import { Router } from "express";
const UserRoutes = Router();

import AuthenticationMiddleware from "../middlewares/AuthenticationMiddleware.js";

import UserController from "../controllers/UserController.js";
const userController = new UserController();

UserRoutes.post("/login", userController.login);
UserRoutes.post("/", userController.create);
UserRoutes.get(
    "/",
    [AuthenticationMiddleware.verifyToken],
    userController.find
);
UserRoutes.put(
    "/",
    [AuthenticationMiddleware.verifyToken],
    userController.update
);

export default UserRoutes;
