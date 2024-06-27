"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession, SessionContextValue } from "next-auth/react";

interface ChatProps {
    room: string;
}

interface Message {
    userId: string;
    message: string;
}

const Page: React.FC = () => {
    const { peerID } = useParams<{ peerID: string }>();
    const { data: session } = useSession() as SessionContextValue;
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const socketRef = useRef<Socket | null>(null);

    // Unique room ID
    const room: string = [peerID, session?.user?.id].sort().join("-");

    useEffect(() => {
        socketRef.current = io("http://localhost:5000");

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
                from: session?.user?.id,
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
                        <strong>{msg.userId === session?.user?.id ? "You" : "Other user"}: </strong>
                        {msg.message}
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
