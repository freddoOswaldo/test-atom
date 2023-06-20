import { StatusTask } from "../enums/status_task";

export const isValidStatus = (status: string) => {
  return Object.values(StatusTask).includes(status as StatusTask);
};
