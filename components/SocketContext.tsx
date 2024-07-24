"use client";
import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { recieveMessage } from "@/utils/definitions";

interface ISocketContext {
    socket: Socket | null;
    messages: recieveMessage[];
}

const SocketContext = createContext<ISocketContext>({
    socket: null,
    messages: [],
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<recieveMessage[]>([]);

    useEffect(() => {
        const newSocket = io("http://localhost:5000");

        newSocket.on("connect", () => {
            console.log("Connected with socket ID:", newSocket.id);
        });

        newSocket.on("msg-recieve", (data: recieveMessage) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, messages }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
