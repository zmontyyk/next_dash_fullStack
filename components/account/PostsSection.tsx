"use server";
import Cards from "@/Ui-resources/Cards";
// import { getUserPosts } from "@/app/lib/server-actions";
import apiClient from "@/utils/apiClient";
import styles from "@/app/dashboard/account/account.module.css";

export default async function PostsSection() {
    const responce = await apiClient.getUserPosts(15);
    console.log(responce);
    

    return (
        <>
            <div
                className="w-full"
                style={{ margin: "0px auto", maxWidth: "900px" }}
            >
                {/* <Cards initialPost={responce} /> */}
            </div>
        </>
    );
}