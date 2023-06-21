import express from "express";
import routerTask from "./routers/tasks";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import { onRequest } from "firebase-functions/v2/https";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/v1", routerTask);
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.LOCAL_PORT || 3000;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
}

export const api = onRequest(app);
export default app;
