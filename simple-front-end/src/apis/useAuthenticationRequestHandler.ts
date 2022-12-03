import type iAuthenticationResponse from "@/interfaces/iAuthenticationResponse";
import type { iUserCredentials } from "@/interfaces/iUserCredentials";
import { usePermissionStore } from "@/stores/usePermissionStore";
import { setSessionStorageAuthenticationResponse } from "@/webStorage/useSesstionStorage";
import { postRequest } from "./useRequestHandler";

export async function authenticationRequestCall(
  userCredentials: iUserCredentials
): Promise<void> {
  const permissionStore = usePermissionStore();
  permissionStore.SetLoading();
  await additionalLoadingTime();
  setSessionStorageAuthenticationResponse(
    await authenticationRequest(userCredentials)
  );
  permissionStore.ResetLoading();
}

/** This is added to show the loading animation */
async function additionalLoadingTime(): Promise<void> {
  if (import.meta.env.VITE_SHOWCASE_LOADING_ANIMATION ?? false)
    await new Promise((resolve) => setTimeout(resolve, 750));
}

async function authenticationRequest(
  userCredentials: iUserCredentials
): Promise<iAuthenticationResponse> {
  const result = await postRequest<{ jwt: string | null }, iUserCredentials>(
    "/api/authenticate",
    userCredentials
  );
  return {
    jwt: result.result != null ? result.result.jwt : null,
    status: result.statusCode,
  };
}
