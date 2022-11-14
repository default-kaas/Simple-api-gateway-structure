import { PermissionStatusEnumerator } from "@/enumerators/permissionStatusEnumerator";
import axios from "axios";
import { usePermissionStore } from "@/stores/usePermissionStore";
import type iUserCredentials from "@/interfaces/iUserCredentials";
import type iAuthenticationResponse from "@/interfaces/iAuthenticationResponse";

export async function authenticationRequestCall(
  userCredentials: iUserCredentials
): Promise<void> {
  const permissionStore = usePermissionStore();
  permissionStore.SetLoading();
  await additionalLoadingTime();
  localStorage(await authenticationRequest(userCredentials));
  permissionStore.ResetLoading();
}

export async function permissionRequest(
  url: string
): Promise<PermissionStatusEnumerator> {
  const result = await axios
    .get(import.meta.env.VITE_BASE_URL + url, {
      headers: { Authorization: "Bearer " + sessionStorage.getItem("jwt") },
    })
    .then((response) => {
      return response.status;
    })
    .catch((error: { response: { status: number } }) => {
      return error.response.status;
    });
  return permissionStatus(result);
}

function permissionStatus(status: number): PermissionStatusEnumerator {
  if ((<any>Object).values(PermissionStatusEnumerator).includes(status)) {
    return status;
  } else {
    return PermissionStatusEnumerator.unknown;
  }
}

/** This added to show the loading animation */
async function additionalLoadingTime(): Promise<void> {
  if (import.meta.env.VITE_SHOWCASE_LOADING_ANIMATION ?? false)
    await new Promise((resolve) => setTimeout(resolve, 750));
}

async function authenticationRequest(
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
    .catch((error: { response: { status: number } }) => {
      return { jwt: null, status: error.response.status };
    });
}

function localStorage(result: iAuthenticationResponse) {
  if (result.status == 200) {
    sessionStorage.setItem("jwt", result.jwt ?? "");
  } else {
    sessionStorage.removeItem("jwt");
  }
}
