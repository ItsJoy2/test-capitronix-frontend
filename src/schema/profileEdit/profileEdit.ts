import { z } from "zod";

export const profileEditSchema = z.object({
  name: z.string().nonempty({ message: "Please enter your name" }),
  mobile: z.string().optional(),
  address: z.string().nonempty(),
  image: z.string().optional(),
});

export const passwordResetSchema = z
  .object({
    old_password: z
      .string()
      .nonempty({ message: "Please enter your password" })
      .min(6, { message: "Password must be at least 6 characters" }),
    password: z
      .string()
      .nonempty({ message: "Please enter your password" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirm_password: z
      .string()
      .nonempty({ message: "Please confirm your password" }),
    referCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export const sendEmailSchema = z.object({
  email: z.string().email({ message: "Input valid email" }),
});
export const resetPasswordSchema = z
  .object({
    email: z.string().email({ message: "Input valid email" }),
    code: z.string().nonempty({ message: "Input valid code" }),
    password: z
      .string()
      .nonempty({ message: "Please enter your password" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirm_password: z
      .string()
      .nonempty({ message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });
