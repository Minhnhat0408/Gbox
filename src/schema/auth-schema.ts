import * as z from "zod";
export const SignUpSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email.",
    }),
    password: z
      .string().regex(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"),
        {
          message:
            "Password must be strong (Ex:12abC@dg).",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

 export const SignInSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  }); 