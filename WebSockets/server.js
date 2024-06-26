const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin_ai:Admin1234@cluster0.tdzqajf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'next_full_stack',
});

const MessageSchema = new mongoose.Schema({
    room: String,
    userId: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', MessageSchema);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('joinRoom', async (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);

        // Send previous messages to the user
        const messages = await Message.find({ room }).sort({ timestamp: 1 });
        socket.emit('previousMessages', messages);
    });

    socket.on('message', async ({ room, message }) => {
        const msg = new Message({ room, userId: socket.id, message });
        await msg.save();
        io.to(room).emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });
});

// const port = process.env.PORT || 5000;
server.listen(5000, () => {
    console.log(`Socket.io server running at http://localhost:${5000}`);
});
