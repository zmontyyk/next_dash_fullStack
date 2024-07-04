const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const momnet = require("moment");

// Connect to MongoDB
mongoose.connect(
    "mongodb+srv://admin_ai:Admin1234@cluster0.tdzqajf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "next_full_stack",
    }
);

const MessageSchema = new mongoose.Schema({
    room: String,
    from: String,
    to: String,
    message: String,
    mediaLink: String,
    mediaName:String,
    lastSend: Number,
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    socket.on("join-room", async ({ room }) => {
        // Join the unique room
        socket.join(room);
        const messages = await Message.find({ room }).sort({ timestamp: 1 });
        socket.emit("previous-messages", messages);
    });

    socket.on("message", async ({ from, to, room, message,mediaLink,mediaName}) => {
        const     mes = new Message({
            room,
            from,
            to,
            message,
            mediaLink,
            mediaName,
            lastSend: momnet().unix(),
        });
        await mes.save();
        io.to(room).emit("msg-recieve", {
            from: from,
            to: to,
            message: message,
            mediaLink:mediaLink,
            mediaName:mediaName,
            lastSend: momnet().unix(),
        }); // Emit the message with sender info
    });

    socket.on("disconnect", () => {
        console.log("user disconnected:", socket.id);
    });
});

// const port = process.env.PORT || 5000;
server.listen(5000, () => {
    console.log(`Socket.io server running at http://localhost:${5000}`);
});
