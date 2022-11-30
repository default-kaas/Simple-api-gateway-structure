import { PermissionStatusEnumerator } from "@/enumerators/permissionStatusEnumerator";
import axios, {
  type AxiosResponse,
  type AxiosResponseHeaders,
  type RawAxiosResponseHeaders,
} from "axios";
import type iUserCredentials from "@/interfaces/iUserCredentials";
import type iAuthenticationResponse from "@/interfaces/iAuthenticationResponse";
import type iRequestResult from "@/interfaces/iRequestResult";
import { getSessionStorageJWT } from "@/webStorage/useSesstionStorage";

export async function authenticationRequest(
  userCredentials: iUserCredentials
): Promise<iAuthenticationResponse> {
  return await axios
    .post<iAuthenticationResponse>(
      import.meta.env.VITE_BASE_URL + "/api/authenticate",
      userCredentials
    )
    .then((response) => {
      return { jwt: response.data.jwt, status: response.status };
    })
    .catch(
      (error: {
        response: { status: number } | null;
        request: { status: number };
      }) => {
        if (error.response == null) {
          return { jwt: null, status: PermissionStatusEnumerator.unknown };
        } else {
          return { jwt: null, status: error.response.status };
        }
      }
    );
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
