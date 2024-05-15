import { Socket } from "socket.io";
import { io } from "../app";


const userSocketMap: Record<string, string> = {};

export const getRecieverSocketId = (recieverId: string): string | undefined => {
 return userSocketMap[recieverId];
};

const socketConfig=()=>{
  
  io?.on("connection", (socket: Socket) => {
    console.log("a user connected", socket.id);
  
    const userId: string | undefined = socket.handshake.query.userId as string;
    if (userId && userId !== "undefined") {
      userSocketMap[userId] = socket.id;
    }
  
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
      if (userId) {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
  });
 
  
}  
export default socketConfig
