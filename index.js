import express from "express";
import { roomsRouter } from "./routes/rooms.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const PORT = process.env.PORT; // heroku will auto assign available port
// const PORT = 8000;

app.use(express.json()); //every request in the app body is parsed as json
//express.json() - inbuilt middleware

app.get('/',(request,response)=>{
  response.send("Home");
})

app.use("/rooms", roomsRouter);

app.listen(PORT, () => console.log("App is started", PORT));
