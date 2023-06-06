export interface IError {
  message: string;
  status: number;
  stack: string;
}

export interface INote {
  key: string;
  title: string;
  body: string;
}
