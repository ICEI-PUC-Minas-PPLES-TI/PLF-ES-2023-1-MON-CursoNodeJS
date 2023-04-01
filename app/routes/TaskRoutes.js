import { Router } from "express";
const TaskRoutes = Router();

import AuthenticationMiddleware from "../middlewares/AuthenticationMiddleware.js";
import UserAccessTaskMiddleware from "../middlewares/UserAccessTaskMiddleware.js";

import TaskController from "../controllers/TaskController.js";
const taskController = new TaskController();

TaskRoutes.post(
    "/",
    [AuthenticationMiddleware.verifyToken],
    taskController.create
);
TaskRoutes.get(
    "/",
    [AuthenticationMiddleware.verifyToken],
    taskController.list
);
TaskRoutes.get(
    "/:id",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessTaskMiddleware.verifyTaskPermission,
    ],
    taskController.find
);
TaskRoutes.delete(
    "/:id",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessTaskMiddleware.verifyTaskPermission,
    ],
    taskController.delete
);
TaskRoutes.put(
    "/:id",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessTaskMiddleware.verifyTaskPermission,
    ],
    taskController.update
);

export default TaskRoutes;
