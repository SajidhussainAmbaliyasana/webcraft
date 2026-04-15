import express from "express";
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5050;
import connectDb from './config/db.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import helmet from "helmet";


//routes
import user from './routes/user.js';
import website from './routes/website.js';
import page from './routes/page.js';
import component from './routes/component.js';


app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({limit:"10kb"}))
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());



connectDb();


app.use('/api/user',user);
app.use('/api/website',website);
app.use('/api/pages',page);
app.use('/api/pages',component);


app.listen(port,()=>{
    console.log(`The server is running on http://localhost:${port}`);
    
})

