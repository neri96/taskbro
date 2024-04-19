import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";

import { Server } from "socket.io";

import auth from "./routes/auth.route";
import user from "./routes/user.route";
import project from "./routes/project.route";
import chat from "./routes/chat.route";
import notification from "./routes/notification.route";

dotenv.config();

const app: Application = express();

app.use(cookieParser());
app.use(
  cors({
    origin: (origin: any, callback) => {
      if ([process.env.CLIENT].indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use("/auth", auth);
app.use("/user", user);
app.use("/project", project);
app.use("/chat", chat);
app.use("/notification", notification);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("join", (chat) => {
    socket.join(chat);
  });

  socket.on("join_user", (id) => {
    socket.join(id);
  });

  socket.on("send", (data) => {
    socket.to(data.chat).emit("get_message", data);
  });

  socket.on("join_private", (chat) => {
    socket.join(chat);
  });

  socket.on("send_private", (data) => {
    socket.to(data.chat).emit("get_private_message", data);
    socket.to(data.to).emit("get_new_private_message", data);
  });
});

const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI as string);

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
