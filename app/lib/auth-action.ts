"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import apiClient from "@/utils/apiClient";
import { unstable_noStore as noStore } from "next/cache";
import { resetPassword, verifyOtpHandler } from "./server-actions";
import { mailHandler } from "./utils";
import { z } from "zod";
import validatePassword from "@/utils/validatePassword";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}

export const authSingIn = async (
    prevState: string | undefined,
    formData: FormData
) => {
    try {
        const response: {
            message: string;
            status: number;
        } = await apiClient.newUser(formData);

        if (response.status === 201) {
            await signIn("credentials", formData);
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
    email: string | null;
    userId: string | null;
    isPasswordUpadted: boolean;
};

export const authResetPassword = async (
    prevState: TUser,
    formData: FormData
): Promise<TUser> => {
    try {
        if (prevState.steps === 0) {
            const getUser: any = await resetPassword(
                formData.get("email") as string
            );

            prevState.email = formData.get("email") as string;
            prevState.userId = getUser.id;
            if (getUser.status === 201) {
                return {
                    ...prevState,
                    steps: 1,
                    success: getUser.success,
                };
            }
        }

        if (prevState.steps === 1) {
            // otp from client
            const otp = formData.getAll("otp").join("");

            // verifying otp
            const verifyOtp = await verifyOtpHandler(
                otp,
                prevState.email as string
            );

            if (verifyOtp?.status === 201) {
                return {
                    ...prevState,
                    steps: 2,
                    success: verifyOtp.success,
                };
            }

            return {
                ...prevState,
                steps: 1,
                error: verifyOtp?.error as string,
                success: null,
            };
        }

        if (prevState.steps === 2) {
            const password = {
                password: formData.get("password"),
                confirmPassword: formData.get("rePassword"),
            };
            // checking if otp is vaild
            const isvaild: any = validatePassword.safeParse(password);

            // changing password
            if (isvaild.success) {
                const isPasswordUpadted: {
                    status: number;
                    messsage: string;
                } = await apiClient.updateUser(
                    prevState.userId as string,
                    "password",
                    formData.get("password") as string
                );

                if (isPasswordUpadted.status === 201) {
                    return {
                        ...prevState,
                        steps: 0,
                        success: "password updated successfully",
                        error: null,
                        isPasswordUpadted: true,
                    };
                }

                return {
                    ...prevState,
                    steps: 2,
                    error: isPasswordUpadted.messsage,
                };
            }

            return {
                ...prevState,
                steps: 2,
                error: "Passwords don't match",
            };
        }

        return {
            steps: 0,
            error: "Something went wrong please try again",
            success: null,
            email: null,
            userId: null,
            isPasswordUpadted: false,
        };
    } catch (error) {
        if (error instanceof AuthError) {
            return {
                steps: 0,
                error: error.message,
                success: null,
                email: null,
                userId: null,
                isPasswordUpadted: false,
            };
        }
        throw error;
    }
};

export const getMorePosts = async (limit:number) => {
    try {
        const response = await apiClient.getUserPosts(limit);    
        return response;
    } catch (error) {
        return error
    }
   
};
