import { z } from "zod";

export const activationSchema = z.object({
  code: z.string().nonempty({ message: "Please enter activation code" }),
});
