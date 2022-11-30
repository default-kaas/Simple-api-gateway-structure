import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";

export default interface iRequestResult<T> {
  statusCode: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders | null;
  result: T | null;
}
