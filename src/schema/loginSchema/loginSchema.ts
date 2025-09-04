import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Input valid email" }),
  password: z.string().min(6, { message: "Input valid password" }),
});

export const registerSchema = z
  .object({
    name: z.string().nonempty({ message: "Please enter your name" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    mobile: z
      .string()
      .nonempty({ message: "Please enter your mobile number" }),
      // .regex(/^\d{8,20}$/, {
      //   message: "Mobile number must be between 10 to 15 digits",
      // }),
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
