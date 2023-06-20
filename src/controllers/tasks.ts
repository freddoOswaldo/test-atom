import { Request, Response } from "express";
import db from "../config/firebase";
import { Task } from "../models/task";
import { ResponseHttp } from "../models/response_http";
import { HttpCodes } from "../enums/http_codes";
import messages from "../constants/response_message";
import { isValidStatus } from "../utils/taskUtils";

export const findAllTasks = async (
  _req: Request,
  res: Response<ResponseHttp<Task[]>>
) => {
  try {
    const tasksDatabase = await db.collection("tasks").get();

    const tasks: Task[] = tasksDatabase.docs.map((task) => {
      const { title, description, status } = task.data();
      const taskTransformed: Task = {
        id: task.id,
        title,
        description,
        status,
      };
      return taskTransformed;
    });

    const response: ResponseHttp<Task[]> = {
      data: tasks,
      code: HttpCodes.OK,
      message: messages.SUCCESS_FIND_TASKS,
    };

    res.status(HttpCodes.OK).json(response);
  } catch (error) {
    console.log("Error fetching tasks:", error);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      message: messages.ERROR_FIND_TASKS,
      code: HttpCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export const insertTask = async (
  req: Request<Task>,
  res: Response<ResponseHttp<Task[]>>
) => {
  try {
    if (!req.body || Object.entries(req.body).length === 0)
      return res.status(HttpCodes.BAD_REQUEST).json({
        message: messages.INVALID_BODY,
        code: HttpCodes.BAD_REQUEST,
      });

    const { title, description, status } = req.body;

    if (!isValidStatus(status))
      return res.status(HttpCodes.BAD_REQUEST).json({
        message: messages.INVALID_STATUS,
        code: HttpCodes.BAD_REQUEST,
      });

    const taskData: Task = {
      title,
      description,
      status,
    };

    const tasksRef = db.collection("tasks");
    await tasksRef.add(taskData);

    const response: ResponseHttp<Task[]> = {
      code: HttpCodes.OK,
      message: messages.SUCCESS_CREATE_TASK,
    };

    res.status(HttpCodes.OK).json(response);
  } catch (error) {
    console.log("Error adding task:", error);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      message: messages.ERROR_CREATE_TASK,
      code: HttpCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateTask = async (
  req: Request,
  res: Response<ResponseHttp<Task[]>>
) => {
  try {
    const { taskId } = req.params;
    if (!req.body || Object.entries(req.body).length === 0)
      return res.status(HttpCodes.BAD_REQUEST).json({
        message: messages.INVALID_BODY,
        code: HttpCodes.BAD_REQUEST,
      });

    const { title, description, status } = req.body;

    if (!isValidStatus(status))
      return res.status(HttpCodes.BAD_REQUEST).json({
        message: messages.INVALID_STATUS,
        code: HttpCodes.BAD_REQUEST,
      });

    const taskData: Task = { title, description, status };

    const taskRef = db.collection("tasks").doc(taskId);

    if (!(await taskRef.get()).exists)
      return res.status(HttpCodes.NOT_FOUND).json({
        message: messages.TASK_NOT_FOUND,
        code: HttpCodes.NOT_FOUND,
      });

    await taskRef.set(taskData, { merge: true });

    const response: ResponseHttp<Task[]> = {
      code: HttpCodes.OK,
      message: messages.SUCCESS_UPDATE_TASK,
    };

    res.status(HttpCodes.OK).json(response);
  } catch (error) {
    console.log("Error updating task:", error);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      message: messages.ERROR_UPDATE_TASK,
      code: HttpCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response<ResponseHttp<string>>
) => {
  try {
    const { taskId } = req.params;

    const taskRef = db.collection("tasks").doc(taskId);

    if (!(await taskRef.get()).exists)
      return res.status(HttpCodes.NOT_FOUND).json({
        message: messages.TASK_NOT_FOUND,
        code: HttpCodes.NOT_FOUND,
      });

    await taskRef.delete();

    const response: ResponseHttp<string> = {
      code: HttpCodes.OK,
      message: messages.SUCCESS_DELETE_TASK,
      data: taskId,
    };

    res.status(HttpCodes.OK).json(response);
  } catch (error) {
    console.log("Error deleting task:", error);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      message: messages.ERROR_DELETE_TAKS,
      code: HttpCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
