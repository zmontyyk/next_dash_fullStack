"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

function HeroSectiom({ totalPostCount }: { totalPostCount: number }) {
    const session: any = useSession().data;
    return (
        <div className="flex justify-between p-14">
            <div className="profile-header">
                <Image
                    src={`/profileAvtars/${session?.user?.avatar != "default" ? JSON.parse(session.user.avatar) : "default"}.png`}
                    height={100}
                    width={100}
                    className="profile-pic"
                    alt="img"
                />
                <div className="profile-info  p-5">
                    <div className="profile-username capitalize">
                        <h2>{session?.user?.name}</h2>
                    </div>
                    <div className="profile-stats ">
                        <span
                            style={{ color: "#262626" }}
                            className="font-medium tracking-tighter
                        "
                        >
                            {totalPostCount} posts
                        </span>
                        <span className="cursor-pointer font-medium tracking-tighter text-black">
                            {session?.user?.followers.length} followers
                        </span>
                        <span className="cursor-pointer font-medium tracking-tighter text-black">
                            {session?.user?.following.length} following
                        </span>
                    </div>
                    <h3>
                        <h2>@ {session?.user?.username}</h2>
                    </h3>

                    <p
                        style={{ color: "#979797" }}
                        className="text-wrap mt-2 text-ellipsis text-sm leading-4"
                    >
                        {session?.user?.bio}
                    </p>
                </div>
            </div>
            <div className="profile-details"></div>
        </div>
    );
}

export default HeroSectiom;
