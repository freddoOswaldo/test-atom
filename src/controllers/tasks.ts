import { Request, Response } from "express";
import db from "../config/firebase";
import { Task } from "../models/task";
import { ResponseHttp } from "../models/response_http";
import { HttpCodes } from "../enums/http_codes";

export const findAllTasks = async (
  req: Request,
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
      message: "Consulta exitosa",
    };

    res.status(HttpCodes.OK).json(response);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocurrio un error al obtener las tareas",
      code: HttpCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export const insertTask = async (
  req: Request<Task>,
  res: Response<ResponseHttp<Task[]>>
) => {
  try {
    const { title, description, status } = req.body;
    const taskData: Task = {
      title,
      description,
      status,
    };

    const tasksRef = db.collection("tasks");
    await tasksRef.add(taskData);

    const response: ResponseHttp<Task[]> = {
      code: HttpCodes.OK,
      message: "Se inserto el task exitosamente",
    };

    res.status(HttpCodes.OK).json(response);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocurrio un error al insertar la tarea",
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
    const { title, description, status } = req.body;
    const taskData: Task = { title, description, status };

    const taskRef = db.collection("tasks").doc(taskId);
    await taskRef.set(taskData, { merge: true });

    const response: ResponseHttp<Task[]> = {
      code: HttpCodes.OK,
      message: "Se actualizo el task exitosamente",
    };

    res.status(HttpCodes.OK).json(response);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocurrio un error al actualizar la tarea",
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
    await taskRef.delete();

    const response: ResponseHttp<string> = {
      code: HttpCodes.OK,
      message: "Se elimino el task exitosamente",
      data: taskId,
    };

    res.status(HttpCodes.OK).json(response);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocurrio un error al eliminar la tarea",
      code: HttpCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
