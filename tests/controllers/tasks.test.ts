import request from "supertest";
import app from "../../src/index";
import { HttpCodes } from "../../src/enums/http_codes";
import db from "../../src/config/firebase";
import { Task } from "../../src/models/task";
import messages from "../../src/constants/response_message";

const taskMock = {
  title: "Tarea 10",
  description: "Descripcion de la tarea 10",
  status: "pendiente",
};

describe("consulta de tareas", () => {
  it("debe devolver un listado de tareas", async () => {
    const response = await request(app)
      .get("/v1/tasks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send()
      .expect(200);

    const tasksDatabase = await db.collection("tasks").get();
    const tasks = tasksDatabase.docs.map((task) => {
      const { title, description, status } = task.data();
      const taskTransformed: Task = {
        id: task.id,
        title,
        description,
        status,
      };
      return taskTransformed;
    });

    expect(response.body).toEqual({
      data: tasks,
      code: HttpCodes.OK,
      message: messages.SUCCESS_FIND_TASKS,
    });
  });
});

describe("insercion de tareas", () => {
  it("debe insertar la tarea un listado de tareas", async () => {
    const response = await request(app)
      .post("/v1/tasks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send(taskMock)
      .expect(200);

    const responseBodyMock = {
      code: HttpCodes.OK,
      message: messages.SUCCESS_CREATE_TASK,
    };

    expect(response.body).toEqual(responseBodyMock);
  });

  it("debe devolver un error 500", async () => {
    const response = await request(app)
      .post("/v1/tasks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send()
      .expect(500);

    const responseBodyMock = {
      code: HttpCodes.INTERNAL_SERVER_ERROR,
      message: messages.ERROR_CREATE_TASK,
    };

    expect(response.body).toEqual(responseBodyMock);
  });
});

describe("actualizar una tarea", () => {
  it("debe actualizar la tarea", async () => {
    const taskRef = (
      await db.collection("tasks").where("title", "==", taskMock.title).get()
    ).docs[0];

    const response = await request(app)
      .put(`/v1/tasks/${taskRef.id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send(taskMock)
      .expect(200);

    const responseBodyMock = {
      code: HttpCodes.OK,
      message: messages.SUCCESS_UPDATE_TASK,
    };

    expect(response.body).toEqual(responseBodyMock);
  });

  it("debe devolver un error 500", async () => {
    const taskRef = (
      await db.collection("tasks").where("title", "==", taskMock.title).get()
    ).docs[0];

    const response = await request(app)
      .put(`/v1/tasks/${taskRef.id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send()
      .expect(500);

    const responseBodyMock = {
      code: HttpCodes.INTERNAL_SERVER_ERROR,
      message: messages.ERROR_UPDATE_TASK,
    };

    expect(response.body).toEqual(responseBodyMock);
  });

  it("debe devolver un 404 al no encontrar la task", async () => {
    const response = await request(app)
      .put("/v1/tasks/3")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send()
      .expect(404);

    const responseBodyMock = {
      code: HttpCodes.NOT_FOUND,
      message: messages.TASK_NOT_FOUND,
    };

    expect(response.body).toEqual(responseBodyMock);
  });
});

describe("eliminar una tarea", () => {
  it("debe eliminar la tarea", async () => {
    const taskRef = (
      await db.collection("tasks").where("title", "==", taskMock.title).get()
    ).docs[0];

    const response = await request(app)
      .delete(`/v1/tasks/${taskRef.id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send()
      .expect(200);

    const responseBodyMock = {
      code: HttpCodes.OK,
      message: messages.SUCCESS_DELETE_TASK,
      data: taskRef.id,
    };

    expect(response.body).toEqual(responseBodyMock);
  });

  it("debe devolver un 404 al no encontrar la task", async () => {
    const response = await request(app)
      .delete("/v1/tasks/3")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send()
      .expect(404);

    const responseBodyMock = {
      code: HttpCodes.NOT_FOUND,
      message: messages.TASK_NOT_FOUND,
    };

    expect(response.body).toEqual(responseBodyMock);
  });
});
