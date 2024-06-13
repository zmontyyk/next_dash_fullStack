"use client";
import React from "react";
import styles from "@/app/dashboard/account/account.module.css";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

function Cards({ items }: any) {
    const params = useSearchParams();
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

            <div className="bg-white">
                <div className={styles.posts + " grid grid-cols-1 gap-y-10 "}>
                    {items.map((item: any) => {
                        return (
                            <div key={item._id.toString()}>
                                <div className={styles.postCrads}>
                                    <img src={item.image} alt={item.image} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Cards;
