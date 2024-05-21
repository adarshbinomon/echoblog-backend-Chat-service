import { app } from "./app";
import connectDb from "./config/db";
import http from "http";
import socketConfig from "./socket/socket";
import { Server } from "socket.io";

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDb();
  } catch (error) {
    console.log("connection to database failed😢");
  }
};

const server = http.createServer(app);
export const io: Server = require("socket.io")(server, {
  cors: { origin: "*" },
});
socketConfig();

server.listen(port, () => {
  console.log(`Chat server started on port ${port}`);
});

start();
