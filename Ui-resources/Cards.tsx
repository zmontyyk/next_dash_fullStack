"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/dashboard/account/account.module.css";
import { useSearchParams } from "next/navigation";
import Spinner from "./Spinner";
import Link from "next/link";
import { getUserPosts } from "@/app/lib/server-actions";

function Cards({ initialPost }: { initialPost: any }) {
    const params = useSearchParams();
    const [postsData, setPostsData] = useState(initialPost);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMorePosts = async () => {
       
    };

    return (
        <>
            <div className={styles.tags}>
                <Link
                    className={
                        params.get("tag") === "posts"
                            ? "active-text"
                            : "ig-secondary-text"
                    }
                    href={"/dashboard/account?tag=posts"}
                >
                    <span>POSTS</span>
                </Link>
                <Link
                    className={
                        params.get("tag") === "tagged"
                            ? "active-text"
                            : "ig-secondary-text"
                    }
                    href={"/dashboard/account?tag=tagged"}
                >
                    <span>TAGGED</span>
                </Link>
            </div>

            <div className="bg-white text-center">
                <div
                    className={styles.posts + " ppx grid grid-cols-1 gap-y-10"}
                >
                    {postsData.posts.map((item: any) => {
                        return (
                            <div key={item._id.toString()}>
                                <div className={styles.postCrads}>
                                    <img src={item.image} alt={item.image} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {loading && <Spinner height={20} width={20} />}
                {!loading && hasMore && (
                    <button
                        onClick={() => loadMorePosts()}
                        className="rounded border border-gray-400 bg-white px-4 py-0 font-semibold text-gray-700 shadow hover:bg-gray-100"
                    >
                        Load more
                    </button>
                )}
            </div>
        </>
    );
}

export default Cards;
