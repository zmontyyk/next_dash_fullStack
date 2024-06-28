"use client";
import React, { useEffect, useState } from "react";
import { IndividualPostByID } from "@/utils/apiClient";
import Image from "next/image";
import {
    HeartIcon,
    ChatBubbleBottomCenterIcon,
    PaperAirplaneIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

const IndividualPost = ({
    IndividualPostID,
    closeModal,
}: {
    IndividualPostID: string | null;
    closeModal: () => void;
}) => {
    const [post, setPost] = useState<any>();
    // const getPostById = async (IndividualPostID: string | null) => {
    //     const post = await IndividualPostByID(IndividualPostID);
    //     setPost(post);
    // };
    useEffect(() => {
        // getPostById(IndividualPostID);
    }, []);
    // console.log(post); v

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white"
                style={{ height: "80%", maxWidth: "80%" }}
            >
                <div className="w-2/3">
                    {/* <img
                        src="/mnt/data/image.png"
                        alt="Instagram post"
                        className="h-full w-full object-cover"
                    /> */}
                </div>
                <div className="flex w-1/3 flex-col">
                    <span className="closeModal" onClick={() => closeModal()}>
                        X
                    </span>
                    <div className="flex items-center border-b p-4">
                        {/* <img
                            src="profile_picture_url"
                            alt="profile"
                            className="mr-4 h-10 w-10 rounded-full"
                        /> */}
                        <span className="font-bold">leomessi</span>
                    </div>
                    <div className="border-b p-4">
                        <span className="mr-2 font-bold">leomessi</span> Primer
                        paso 🇦🇷
                    </div>
                    <div className="commentSection  flex-1 space-y-4 overflow-y-auto p-4">
                        <Comment
                            username="tntsportsar"
                            text="Qué placer es verte jugar, capitán 😍"
                        />
                        <Comment
                            username="martinpdisalvo"
                            text="DALEEEEEEEE jdjd wekjdwiejd weijdoiwejd"
                        />
                    </div>
                    <div className="flex items-center border-t p-4">
                        <span className="mr-4 h-6 w-6">
                            <HeartIcon />
                        </span>
                        <span className="mr-4 h-6 w-6">
                            <ChatBubbleBottomCenterIcon />
                        </span>
                        <span
                            className="mr-4 h-6 w-6"
                            style={{ transform: "rotate(317deg)" }}
                        >
                            <PaperAirplaneIcon />
                        </span>
                    </div>
                    <div className="border-t p-4">
                        Liked by <span className="font-bold">realsultan</span>{" "}
                        and 2,816,490 others
                    </div>
                    <div className="flex items-center border-t p-4">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-1 rounded border p-2"
                        />
                        <button className="ml-2 text-blue-500">Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Comment = ({ username, text }: any) => (
    <div className=" flex items-start space-x-2">
        <span className="font-bold">{username}</span>
        <span>{text}</span>
    </div>
);
export default IndividualPost;
