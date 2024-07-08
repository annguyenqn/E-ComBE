export interface IResponse<T = unknown> {
  statusCode: number;
  message?: string;
  data?: T;
  errors?: unknown;
  timestamp?: string;
  path?: string;
  isSuccess: boolean;
}
