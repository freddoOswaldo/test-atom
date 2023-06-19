import { StatusTask } from "../enums/status_task";

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: StatusTask;
}
