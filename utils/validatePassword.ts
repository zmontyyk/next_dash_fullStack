import { z } from 'zod';

const validatePassword = z
    .object({
        password: z.string(),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });


export default validatePassword;
