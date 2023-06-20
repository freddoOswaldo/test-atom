import swaggerJSDoc, { Options } from "swagger-jsdoc";
import dotenv from "dotenv";
import { StatusTask } from "../enums/status_task";

dotenv.config();

const PORT = process.env.PORT || 3000;

const options: Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "REST API Tasks for Swagger Documentation",
      version: "1.0.0",
      description: "REST API Tasks for Swagger Documentation",
      contact: {
        name: "Freddy Ayon",
        url: "https://github.com/freddoOswaldo",
        email: "freddyon18@gmail.com",
      },
    },
    schemes: ["http", "https"],
    servers: [{ url: `http://localhost:${PORT}/v1` }],
    basePath: "/v1",
    consumes: ["application/json"],
    produces: ["application/json"],
    paths: {
      "/tasks": {
        get: {
          tags: ["Tasks"],
          summary: "Obtener las tareas",
          description: "Obtener las tareas",
          operationId: "getTasks",
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/definitions/ResponseWithTasks",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/definitions/Response",
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Tasks"],
          summary: "Crear las tareas",
          description: "Crear las tareas",
          operationId: "createTask",
          requestBody: {
            description: "Task object that needs to be added to the store",
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/definitions/TaskWithoutId",
                },
              },
            },
          },
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/definitions/Response",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/definitions/Response",
                  },
                },
              },
            },
            400: {
              description: "Bad Request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/definitions/Response",
                  },
                },
              },
            },
          },
        },
      },
      "/tasks/{taskId}": {
        put: {
          tags: ["Tasks"],
          summary: "Actualizar las tareas",
          description: "Actualizar las tareas",
          operationId: "updateTask",
          requestBody: {
            description: "Task object that needs to be added to the store",
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/definitions/TaskWithoutId",
                },
              },
            },
          },
          parameters: [
            {
              name: "taskId",
              in: "path",
              description: "id de la tarea",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/definitions/ResponseWithTasks",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/definitions/Response",
                  },
                },
              },
            },
            404: {
              description: "Not Found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/definitions/Response",
                  },
                },
              },
            },
            400: {
              description: "Bad Request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/definitions/Response",
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Tasks"],
          summary: "Eliminar las tareas",
          description: "Eliminar las tareas",
          operationId: "deleteTask",
          parameters: [
            {
              name: "taskId",
              in: "path",
              description: "id de la tarea",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/definitions/ResponseDelete",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/definitions/Response",
                  },
                },
              },
            },
            404: {
              description: "Not Found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/definitions/Response",
                  },
                },
              },
            },
          },
        },
      },
    },
    definitions: {
      Response: {
        type: "object",
        properties: {
          code: { type: "number" },
          message: { type: "string" },
        },
      },
      ResponseWithTasks: {
        type: "object",
        properties: {
          code: { type: "number", example: 200 },
          message: { type: "string" },
          data: {
            type: "array",
            items: {
              $ref: "#/definitions/Task",
            },
          },
        },
      },
      ResponseDelete: {
        type: "object",
        properties: {
          code: { type: "number", example: 200 },
          message: { type: "string" },
          data: {
            type: "string",
          },
        },
      },
      Task: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Task id",
          },
          title: {
            type: "string",
            description: "Task title",
          },
          description: {
            type: "string",
            description: "Task description",
          },
          status: {
            type: "string",
            description: "Task status",
          },
        },
      },

      TaskWithoutId: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Task title",
          },
          description: {
            type: "string",
            description: "Task description",
          },
          status: {
            type: "string",
            description: "Task status",
          },
        },
      },
    },
  },
  apis: [`../routers/*.ts`, "./dist/routers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
