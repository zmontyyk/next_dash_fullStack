import React from "react";
import { getAllFollowers } from "@/utils/apiClient";
import Image from "next/image";
import { User } from "@/utils/definitions";
import Link from "next/link";

const UserLists = async () => {
    const response: any = await getAllFollowers();
    

    return (
        <React.Fragment>
            {response.followers.map((item: any, index: number) => {
                return (
                    <Link
                        href={`/dashboard/messages/${item._id}`}
                        key={index}
                    >
                        <div
                            key={index}
                            className="flex p-5"
                            style={{
                                boxShadow:
                                    "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                cursor: "pointer",
                            }}
                        >
                            <Image
                                src={`/profileAvtars/${item?.avatar !== "default" || !item?.avatar ? JSON.parse(item?.avatar) : "default"}.png`}
                                height={50}
                                width={50}
                                className="followersProfilePic"
                                alt="img"
                            />

                            <span className="profile-username capitalize">
                                {item.name}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </React.Fragment>
    );
};

export default UserLists;
