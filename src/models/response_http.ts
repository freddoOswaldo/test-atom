export interface ResponseHttp<T> {
  code: number;
  message: string;
  data?: T;
}
