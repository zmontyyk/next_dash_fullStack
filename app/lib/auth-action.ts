'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import apiClient from '@/utils/apiClient';
import { unstable_noStore as noStore } from 'next/cache';
import { resetPassword } from './server-actions';
import { mailHandler } from './utils';


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

type TUser = {
    steps: number;
    error: string | null;
    success: string | null;
};

export const authResetPassword = async (
    prevState: TUser,
    formData: FormData,
): Promise<TUser> => {
    try {
        if (prevState.steps === 0) {
            const getUser: any = await resetPassword(
                formData.get('email') as string,
            );

            if (getUser.status === 201) {
                return {
                    steps: 1,
                    error: null,
                    success: getUser.success,
                };
            }
        }

        if (prevState.steps === 1) {
            console.log('step 1');
        }

        return {
            steps: 0,
            error: 'Something went wrong please try again',
            success: null,
        };
    } catch (error) {
        if (error instanceof AuthError) {
            return {
                steps: 0,
                error: error.message,
                success: null,
            };
        }
        throw error;
    }
};
