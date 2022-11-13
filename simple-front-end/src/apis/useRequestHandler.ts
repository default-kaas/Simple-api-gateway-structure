import { PermissionStatusEnumerator } from "@/enumerators/permissionStatusEnumerator";
import axios from "axios";
import { usePermissionStore } from "@/stores/usePermissionStore";

export async function authenticationRequest(
  userName: string,
  password: string
): Promise<void> {
  const permissionStore = usePermissionStore();
  permissionStore.SetLoading();
  const result = await axios.post<{ jwt: string }>(
    import.meta.env.VITE_BASE_URL + "/api/authenticate",
    {
      userName: userName,
      password: password,
    }
  );
  if (result.status == 200) {
    sessionStorage.setItem("jwt", result.data.jwt);
  } else {
    sessionStorage.removeItem("jwt");
  }
  permissionStore.ResetLoading();
}

export async function permissionRequest(
  url: string
): Promise<PermissionStatusEnumerator> {
  let result = 0;
  await axios
    .get(import.meta.env.VITE_BASE_URL + url, {
      headers: { Authorization: "Bearer " + sessionStorage.getItem("jwt") },
    })
    .then((res) => {
      result = res.status;
    })
    .catch((error: { response: { status: number } }) => {
      result = error.response.status;
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
