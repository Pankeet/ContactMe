import express from 'express';
import nodemailer from 'nodemailer';
import recruiter from '../model/recruiterInfo.js';
import dotenv from 'dotenv'
dotenv.config();
const RecruitRouter = express.Router();

RecruitRouter.post('/sendmail' , async (req , res) => {
    const { firstname , lastname , email , subject , message} = req.body;

    const findRecruiter = await recruiter.findOne({email});
    if(!findRecruiter){
        await recruiter.create({
            firstname , lastname , email
        })
    }

    const transporter = nodemailer.createTransport({
        service : 'gmail', 
        auth : {
        user : process.env.USER,
        pass : process.env.PASS
        }
    });

    const mailOptions = {
        from : process.env.USER,
        to : process.env.ME,
        subject : email + ' ' + subject,
        text : message
    };

    transporter.sendMail(mailOptions , (err , data) => {
        if(err){
            console.error('Failed to send', err);
            return res.status(500).json({
                error : err,
                message : "Something went wrong"
            })
        }
        else{
            return res.status(200).json({
                message : "Message Sent Successfully"
            });
        }
    })
})

export default RecruitRouter;