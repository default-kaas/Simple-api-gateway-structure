import { PermissionStatusEnumerator } from "@/enumerators/permissionStatusEnumerator";
import axios from "axios";
import { usePermissionStore } from "@/stores/usePermissionStore";

export async function authenticationRequest(
  userName: string,
  password: string
): Promise<void> {
  const permissionStore = usePermissionStore();
  permissionStore.SetLoading();
  const result = await axios
    .post<{ jwt: string | null; status: number }>(
      import.meta.env.VITE_BASE_URL + "/api/authenticate",
      {
        userName: userName,
        password: password,
      }
    )
    .then((response) => {
      return { jwt: response.data.jwt, status: response.status };
    })
    .catch((error: { response: { status: number } }) => {
      return { jwt: null, status: error.response.status };
    });
  if (result.status == 200) {
    sessionStorage.setItem("jwt", result.jwt ?? "");
  } else {
    sessionStorage.removeItem("jwt");
  }
  permissionStore.ResetLoading();
}

export async function permissionRequest(
  url: string
): Promise<PermissionStatusEnumerator> {
  const result = await axios
    .get(import.meta.env.VITE_BASE_URL + url, {
      headers: { Authorization: "Bearer " + sessionStorage.getItem("jwt") },
    })
    .then((res) => {
      return res.status;
    })
    .catch((error: { response: { status: number } }) => {
      return error.response.status;
    });
  return permissionStatus(result);
}

function permissionStatus(status: number): PermissionStatusEnumerator {
  switch (status) {
    case 200:
      return PermissionStatusEnumerator.ok;
    case 401:
      return PermissionStatusEnumerator.unauthorized;
    case 403:
      return PermissionStatusEnumerator.forbidden;
    default:
      return PermissionStatusEnumerator.unknown;
  }
}
