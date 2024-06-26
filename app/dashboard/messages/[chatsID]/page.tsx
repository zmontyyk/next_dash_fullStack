"use client";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ChatProps {
    room: string;
}

interface Message {
    userId: string;
    message: string;
}

const page: React.FC<ChatProps> = ({ room }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io("http://localhost:5000");

        socketRef.current.on("connect", () => {
            console.log("Connected with socket ID:", socketRef.current?.id);
            socketRef.current?.emit("joinRoom", room);
        });

        socketRef.current.on("message", (message: Message) => {
            console.log(message);

            setMessages((preval) => [...preval, message]);
        });
        socketRef.current.on("previousMessages", (message: Message) => {
            console.log(message);

            setMessages((preval) => [...preval, ...(message as any)]);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, [room]);

    const sendMessage = () => {
        if (input.trim() && socketRef.current) {
            socketRef.current.emit("message", {
                room,
                message: input,
            });
            setInput("");
        }
    };
    console.log(messages);

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>
                            {msg.userId === socketRef.current?.id
                                ? "You"
                                : msg.userId}
                            :
                        </strong>{" "}
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

export default page;
