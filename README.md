# API de Tareas

API de tareas construida con Node.js, TypeScript, Swagger y Firebase.

## Descripción

Esta API proporciona endpoints para administrar tareas. Permite crear, obtener, actualizar y eliminar tareas. Además, utiliza Firebase como base de datos.

## Tecnologías utilizadas

- Node.js
- TypeScript
- Swagger
- Firebase

## Instalación

1. Clona el repositorio: `git clone https://github.com/freddoOswaldo/test-atom.git`
2. Ingresa al directorio del proyecto: `cd test-atom`
3. Instala las dependencias: `npm install`

## Uso

1. Ejecuta la API: `npm run dev`
2. Abre tu navegador y ve a `http://localhost:3002`

## test

- Ejecuta los test: `npm run test`
- Revisa el coverage: `npm run coverage`

## Endpoints

### Obtener todas las tareas

GET v1/tasks

Devuelve todas las tareas almacenadas en la base de datos.

### Insertar una tarea

POST v1/tasks

Crea una nueva tarea. Los datos deben enviarse en el cuerpo de la solicitud en formato JSON.

### Actualizar una tarea existente

PUT v1/tasks/:taskId

Actualiza una tarea existente según el ID proporcionado. Los datos actualizados deben enviarse en el cuerpo de la solicitud en formato JSON.

### Eliminar una tarea

DELETE /tasks/:id

Elimina una tarea específica según el ID proporcionado.

### Documentación de la API (Swagger)

GET /api-docs

Devuelve la documentación interactiva de la API generada con Swagger.

## Contacto

Si tienes alguna pregunta, puedes contactarme a través de [freddyon18@gmail.com] o [https://www.linkedin.com/in/freddy-ayon-castillo/].
