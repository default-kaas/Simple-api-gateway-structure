import { PermissionStatusEnumerator } from "@/enumerators/permissionStatusEnumerator";
import { getRequest } from "@/apis/useRequestHandler";

export async function permissionRequest(
  url: string
): Promise<PermissionStatusEnumerator> {
  return permissionStatus((await getRequest<string>(url)).statusCode);
}

function permissionStatus(status: number): PermissionStatusEnumerator {
  if ((<any>Object).values(PermissionStatusEnumerator).includes(status)) {
    return status;
  } else {
    return PermissionStatusEnumerator.unknown;
  }
}
