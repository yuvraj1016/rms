import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv';

import connectDB from "./models/connectDb.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json({limit:"100mb"}))

app.get("/",(req,res)=>{
    res.status(200).json({message:"Hello Yuvi"});
})

app.use("/api/v1/user",userRoutes)

const startServer = async () => {
    try {
      connectDB(process.env.MONGODB_URL);
      app.listen(3001, () => console.log('Server started on port 3001'));
    } catch (error) {
      console.log(error);
    }
  };
  
startServer();