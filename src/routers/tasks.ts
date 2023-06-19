import express from "express";
import {
  deleteTask,
  findAllTasks,
  insertTask,
  updateTask,
} from "../controllers/tasks";

const router = express.Router();

router.get("/tasks", findAllTasks);
router.post("/tasks", insertTask);
router.put("/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);

export default router;
