import {z} from 'zod';

export const userSignUpSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(6)
})

export const userSignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})