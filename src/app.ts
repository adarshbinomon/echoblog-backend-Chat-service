import express from "express";
import cors from "cors";
import dependencies from "./config/dependencies";
import session, { MemoryStore, SessionOptions } from "express-session";
import dotenv from "dotenv";
import { routes } from "./router";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import socketConfig from "./socket/socket";
import { Dependencies } from "./utils/interfaces/dependencies.interface";
import morgan from "morgan";
dotenv.config();
const app =express()
const store = new MemoryStore();
declare module "express-session" {}


app.use(
  session({
    secret: process.env.SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 60 * 1000,
      httpOnly: true,
    },
    store: store,
  } as SessionOptions)
);
app.use(cookieParser());
// app.use(morgan('tiny'))
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
export const io: Server = require('socket.io')(8081, {
  cors: { origin: 'http://localhost:5173' }
});
socketConfig()
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes(dependencies as Dependencies));

export { app };
