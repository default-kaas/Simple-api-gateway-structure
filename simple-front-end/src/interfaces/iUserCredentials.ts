import { z as zod } from "zod";

export const FormData = zod.object({
  userName: zod
    .string({ required_error: "Username is required" })
    .min(1, { message: "Username is required" }),
  password: zod
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

export type iUserCredentials = zod.infer<typeof FormData>;
