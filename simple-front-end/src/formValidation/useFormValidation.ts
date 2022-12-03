import type { iUserCredentials } from "@/interfaces/iUserCredentials";
import { FormData } from "@/interfaces/iUserCredentials";
import type { SafeParseReturnType } from "zod";

export function useValidateLoginForm(userCredentials: iUserCredentials) {
  return useValidate(FormData, userCredentials);
}

function useValidate<T>(
  schema: {
    safeParse: (value: T) => SafeParseReturnType<T, any>;
  },
  value: T
) {
  const isValidData = schema.safeParse(value);
  return isValidData.success ? null : isValidData.error.format();
}
