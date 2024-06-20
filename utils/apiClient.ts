"use server";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { cookies } from "next/headers";

 const newUser = async <T>(credentials: FormData): Promise<T> => {
    try {
        const response = await fetch(API_BASE_URL + "api/users", {
            cache: "no-store",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: credentials.get("Name"),
                email: credentials.get("email"),
                password: credentials.get("password"),
                avatar: credentials.get("avatar"),
            }),
        });
        return await response.json();
    } catch (error) {
        console.error("GET request failed", error);
        throw error;
    }
};

 const updateUser = async <T>(
    userId: string,
    key: string,
    value: string
): Promise<T> => {
    try {
        const response = await fetch(API_BASE_URL + "api/users", {
            cache: "no-store",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                key,
                value,
            }),
        });
        return await response.json();
    } catch (error) {
        console.error("GET request failed", error);
        throw error;
    }
};

 const getUserPosts = async <T>(limit: number): Promise<T> => {
    const nextCookies = cookies();
    const nextAuthSessionToken = nextCookies.get("authjs.session-token");
    try {
        const response = await fetch(
            API_BASE_URL + `/api/feeds/posts?limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `authjs.session-token=${nextAuthSessionToken?.value}`,
                },
            }
        );
        return await response.json();
    } catch (error) {
        console.error("GET request failed", error);
        throw error;
    }
};


export   {
    newUser,
    updateUser,
    getUserPosts,
};