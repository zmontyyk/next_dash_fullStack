"use client";
import { useParams } from "next/navigation";
import React, { use, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession, SessionContextValue } from "next-auth/react";
import { UserProfile } from "@/utils/definitions";
import { getUserById } from "@/utils/apiClient";
import "../chat.css";
import moment from "moment";
import UploadFile from "@/components/UploadFile";
import {
    ref,
    uploadBytes,
    listAll,
    getStorage,
    getDownloadURL,
} from "firebase/storage";
import { storage } from "@/utils/firebaseCloud";
import Image from "next/image";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { useSocket } from "@/components/SocketContext";

interface Message {
    from: string;
    to: string;
    message: string;
    mediaLink: string;
    lastSend: number;
    _id: string;
    mediaName: string;
}

const Page: React.FC = () => {
    const { peerID } = useParams<{ peerID: string }>();
    const session: any = useSession().data;
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    // const socketRef = useRef<Socket | null>(null);
    const [peerData, setPeerData] = useState<UserProfile>();
    const [mediaDownloadProgress, setMediaDownloadProgress] = useState<{
        status: boolean;
        id: string;
    }>({
        status: false,
        id: "",
    });
    const { socket } = useSocket();

    // Unique room ID
    const room: string = [peerID, session?.user?._id].sort().join("-");
    
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Function to scroll to the bottom
    const scrollToBottom = () => {
        chatEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getPeerData = async () => {
        const { userById }: any = await getUserById(peerID);
        setPeerData(userById);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        getPeerData();
        // socketRef.current = io("http://localhost:5000");
        // socket?.on("connect", () => {
        //     console.log("Connected with socket ID:", socket?.id);
        // });

        socket?.emit("join-room", { room });

        socket?.on("msg-recieve", (data: any) => {
            setMessages((prev) => [...prev, data]);
        });

        socket?.on("previous-messages", (messages: Message[]) => {
            setMessages(messages);
        });

        return () => {
            socket?.off("previous-messages");
          };
    }, [room,socket]);

    const uploadFile = async (
        e: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        const files: any = e?.target?.files;
        if (files === null || files === undefined) return;

        const mediaRef = ref(
            storage,
            `/media/${files[0]?.name + (1000 + Math.random() * 9000).toFixed(0)}`
        );

        await uploadBytes(mediaRef, files[0]);

        const url = await getDownloadURL(mediaRef);

        if (socket) {
            socket.emit("message", {
                from: session?.user?._id,
                to: peerID,
                room,
                message: input,
                mediaLink: url,
                mediaName: files[0]?.name,
            });
        }
    };

    async function downloadFile(
        fileUrl: string,
        _id: string,
        mediaName: string
    ) {
        try {
            setMediaDownloadProgress({
                status: true,
                id: _id,
            });
            const response = await fetch(fileUrl, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();

            // Create a URL for the blob
            const blobUrl = window.URL.createObjectURL(blob);

            // Create a link element
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `${mediaName}.png`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Revoke the object URL to free up memory
            window.URL.revokeObjectURL(blobUrl);
            setMediaDownloadProgress({
                status: false,
                id: "",
            });
        } catch (error) {
            setMediaDownloadProgress({
                status: true,
                id: "",
            });
            console.error("Error downloading file:", error);
            // Handle the error (e.g., display an error message to the user)
        }
    }

    const sendMessage = () => {
        if (input.trim() && socket) {
            socket.emit("message", {
                from: session?.user?._id,
                to: peerID,
                room,
                message: input,
            });
            setInput("");
        }
    };

    return (
        <div>
            <div>
                <section className="msger">
                    <header className="msger-header">
                        <div className="msger-header-title"></div>
                        <div className="msger-header-options"></div>
                    </header>

                    <main className="msger-chat">
                        {messages.map((msg, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {msg.from === session?.user?._id ? (
                                        <div className="msg right-msg">
                                            <div
                                                className="msg-img"
                                                style={{
                                                    backgroundImage: `url(/profileAvtars/${session?.user?.avatar}.png)`,
                                                }}
                                            ></div>

                                            <div className="msg-bubble">
                                                <div className="msg-info">
                                                    <div className="msg-info-name">
                                                        {session?.user?.name}
                                                    </div>
                                                    <div className="msg-info-time">
                                                        {moment
                                                            .unix(msg?.lastSend)
                                                            .format("HH:mm")}
                                                    </div>
                                                </div>

                                                <div className="msg-text">
                                                    {msg.message}
                                                    {msg.mediaLink ? (
                                                        <>
                                                            <Image
                                                                src={
                                                                    msg.mediaLink
                                                                }
                                                                alt="media"
                                                                width={200}
                                                                height={200}
                                                            />
                                                            <ArrowDownTrayIcon
                                                                onClick={() =>
                                                                    downloadFile(
                                                                        msg.mediaLink,
                                                                        msg._id,
                                                                        msg.mediaName
                                                                    )
                                                                }
                                                                height={20}
                                                                width={20}
                                                                color="white"
                                                                className="downloadIcon mb-1"
                                                            />
                                                            {mediaDownloadProgress.status &&
                                                            mediaDownloadProgress.id ===
                                                                msg._id ? (
                                                                <div className="loader  "></div>
                                                            ) : null}
                                                        </>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="msg left-msg">
                                            <div
                                                className="msg-img"
                                                style={{
                                                    backgroundImage: `url(/profileAvtars/${peerData?.avatar}.png)`,
                                                }}
                                            ></div>

                                            <div className="msg-bubble">
                                                <div className="msg-info">
                                                    <div className="msg-info-name">
                                                        {peerData?.name}
                                                    </div>
                                                    <div className="msg-info-time">
                                                        {moment
                                                            .unix(msg?.lastSend)
                                                            .format("HH:mm")}
                                                    </div>
                                                </div>

                                                <div className="msg-text">
                                                    {msg.message}
                                                    {msg.mediaLink ? (
                                                        <>
                                                            <Image
                                                                src={
                                                                    msg.mediaLink
                                                                }
                                                                alt="media"
                                                                width={200}
                                                                height={200}
                                                            />
                                                            <ArrowDownTrayIcon
                                                                onClick={() =>
                                                                    downloadFile(
                                                                        msg.mediaLink,
                                                                        msg._id,
                                                                        msg.mediaName
                                                                    )
                                                                }
                                                                height={20}
                                                                width={20}
                                                                color="black"
                                                                className="downloadIcon mb-1"
                                                            />
                                                            {mediaDownloadProgress.status &&
                                                            mediaDownloadProgress.id ===
                                                                msg._id ? (
                                                                <div className="loader  "></div>
                                                            ) : null}
                                                        </>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                        {messages.length && peerData ? null : (
                            <div className="chatSpinner"></div>
                        )}
                        <div ref={chatEndRef} />
                    </main>
                    <div className="msger-inputarea">
                        <UploadFile uploadFile={uploadFile} />
                        <input
                            style={{ width: "100%" }}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                        />

                        <button
                            onClick={() => sendMessage()}
                            className="msger-send-btn"
                        >
                            Send
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Page;
