import axios, {
  type AxiosResponse,
  type AxiosResponseHeaders,
  type RawAxiosResponseHeaders,
} from "axios";
import type iRequestResult from "@/interfaces/iRequestResult";
import { getSessionStorageJWT } from "@/webStorage/useSesstionStorage";

export async function postRequest<T, T2>(
  url: string,
  postValues: T2
): Promise<iRequestResult<T>> {
  return await axios
    .post(import.meta.env.VITE_BASE_URL + url, postValues, {
      headers: { Authorization: "Bearer " + getSessionStorageJWT() },
    })
    .then(requestResponseHandling<T>)
    .catch(requestErrorHandling<T>);
}

export async function getRequest<T>(url: string): Promise<iRequestResult<T>> {
  return await axios
    .get(import.meta.env.VITE_BASE_URL + url, {
      headers: { Authorization: "Bearer " + getSessionStorageJWT() },
    })
    .then(requestResponseHandling<T>)
    .catch(requestErrorHandling<T>);
}

function requestResponseHandling<T>(
  response: AxiosResponse<any, any>
): iRequestResult<T> {
  return {
    statusCode: response.status,
    statusText: response.statusText,
    headers: response.headers,
    result: response.data,
  };
}

function requestErrorHandling<T>(error: {
  response: {
    status: number;
    statusText: string;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  } | null;
  request: {
    status: number;
    statusText: string;
  };
}): iRequestResult<T> {
  if (error.response == null) {
    return {
      statusCode: error.request.status,
      statusText: error.request.statusText,
      headers: null,
      result: null,
    };
  } else {
    return {
      statusCode: error.response.status,
      statusText: error.response.statusText,
      headers: error.response.headers,
      result: null,
    };
  }
}
