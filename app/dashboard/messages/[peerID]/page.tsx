"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession, SessionContextValue } from "next-auth/react";
import { UserProfile } from "@/utils/definitions";
import { getUserById } from "@/utils/apiClient";

interface Message {
    from: string;
    msg: string;
}

const Page: React.FC = () => {
    const { peerID } = useParams<{ peerID: string }>();
    const session: any = useSession().data;
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const socketRef = useRef<Socket | null>(null);
    const [peerData, setPeerData] = useState<UserProfile>();

    // Unique room ID
    const room: string = [peerID, session?.user?._id].sort().join("-");

    const getPeerData = async () => {
        const { userById }: any = await getUserById(peerID);
        setPeerData(userById);
    };
    
    useEffect(() => {
        socketRef.current = io("http://localhost:5000");
        getPeerData();
        socketRef.current?.on("connect", () => {
            console.log("Connected with socket ID:", socketRef.current?.id);
        });

        socketRef.current?.emit("join-room", { room });

        socketRef.current?.on("msg-recieve", (data: any) => {
            console.log(data);
            setMessages((prev) => [...prev, data]);
        });

        socketRef.current?.on("previous-messages", (messages: Message[]) => {
            console.log(messages);
            setMessages(messages);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, [room]);

    const sendMessage = () => {
        if (input.trim() && socketRef.current) {
            socketRef.current.emit("message", {
                from: session?.user?._id,
                to: peerID,
                room,
                msg: input,
            });
            setInput("");
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>
                            {msg.from === session?.user?._id
                                ? "You"
                                : peerData?.name}
                        </strong>
                        {msg.msg}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        sendMessage();
                    }
                }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Page;
