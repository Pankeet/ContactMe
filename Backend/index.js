import express from "express"; 
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import connectdb from './config/db.js';
import RecruitRouter from './controller/recruiter.js';
dotenv.config() ;

app.use(express.json()) ;
app.use(cors({origin : "*"})) ;

app.use('/api' , RecruitRouter);

app.listen(3000 , async () => {
    await connectdb();
    console.log("Server is Live");
});