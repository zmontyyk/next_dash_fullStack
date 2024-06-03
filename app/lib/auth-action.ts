'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import apiClient from '@/utils/apiClient';
import { unstable_noStore as noStore } from 'next/cache';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export const authSingIn = async (
    prevState: string | undefined,
    formData: FormData,
) => {
    try {
        const response: {
            message: string;
            status: number;
        } = await apiClient.newUser(formData);

        console.log(response.status);

        if (response.status === 201) {
            await signIn('credentials', formData);
        }

        return response.message;
    } catch (error) {
        if (error instanceof AuthError) {
            return error.message;
        }
        throw error;
    }
};
