import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import appRoutes from './routes/appRoutes.js';


dotenv.config();
connectDB();

const app = express();

app.use(cors({ 
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/todos',appRoutes)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server started At port:${PORT}`)
})