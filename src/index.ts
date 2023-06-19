import express from "express";
import routerTask from "./routers/tasks";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));

app.use("/", routerTask);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
