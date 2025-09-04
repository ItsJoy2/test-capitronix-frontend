import { z } from "zod";

export const kycSchema = z.object({
  front_image: z.string(),
  back_image: z.string(),
  selfie_image: z.string(),
});
