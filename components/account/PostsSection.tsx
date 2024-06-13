"use server";
import Cards from "@/Ui-resources/Cards";
import { getUserPosts } from "@/app/lib/server-actions";
import styles from "@/app/dashboard/account/account.module.css";

export default async function PostsSection() {
    const posts = await getUserPosts();

    return (
        <>
            <div
                className="w-full"
                style={{ margin: "0px auto", maxWidth: "900px" }}
            >
                <Cards items={posts} />
            </div>
        </>
    );
}