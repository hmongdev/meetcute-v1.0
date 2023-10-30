// holds form schemas => more efficient, less clutter

import * as z from "zod"

// 1. shape of form using Zod schema
export const SignupValidation = z.object({
  name: z.string().min(2, { message: 'Too short' }),
  username: z.string().min(2).max(50),
  email: z.string().email(),
password: z.string().min(8, {message: 'Password Must Be At Least 8 Characters.'})
});
