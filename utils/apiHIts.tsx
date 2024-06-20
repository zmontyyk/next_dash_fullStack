"use server"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { cookies } from "next/headers";

export const hitDemo = async () => {
console.log('wrefeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!');

    const nextCookies = cookies();
    const nextAuthSessionToken = nextCookies.get("authjs.session-token");
    try {
        const response = await fetch(
            API_BASE_URL + `/api/feeds/posts?limit=15`,
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
