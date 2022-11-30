import type iAuthenticationResponse from "@/interfaces/iAuthenticationResponse";

export function setSessionStorageAuthenticationResponse(
  result: iAuthenticationResponse
) {
  if (result.status == 200) {
    sessionStorage.setItem("jwt", result.jwt ?? "");
  } else {
    sessionStorage.removeItem("jwt");
  }
}

export function getSessionStorageJWT() {
  return sessionStorage.getItem("jwt");
}
