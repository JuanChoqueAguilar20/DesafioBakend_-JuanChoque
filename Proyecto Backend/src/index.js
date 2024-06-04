import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js"
import hotelsRouter from "./routes/hotels.routes.js"
import roomsRouter from "./routes/rooms.routes.js"
import usersouter from "./routes/users.routes.js"

//envio de cookie par la verificacion isAdmin
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

//conexion a mongo
const connect = async() => {
try{
    await mongoose.connect(process.env.MONGO);
    console.log("connected to MONGODB");
} catch (error){
    throw error
}
};

mongoose.connection.on("disconnect", () => {
    console.log("momgo desconectado");
});

//midlewares
app.use(cookieParser())

app.use((err, req, res, next) =>{
    console.log("hello  from middleware")
    next()
})

app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/hotels", hotelsRouter)
app.use("/api/rooms", roomsRouter)
app.use("/api/users", usersouter)


app.listen(8080, () =>{
    connect()
    console.log(`te conectaste al puerto`);
})
