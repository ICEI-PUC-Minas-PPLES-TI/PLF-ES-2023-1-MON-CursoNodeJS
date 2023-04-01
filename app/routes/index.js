import { Router } from "express";
const router = Router();

import userRoutes from "./UserRoutes.js";
import taskRoutes from "./TaskRoutes.js";

router.use("/user", userRoutes);
router.use("/task", taskRoutes);

export default router;
