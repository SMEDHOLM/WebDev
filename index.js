import express from  "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";    
import {validationResult} from 'express-validator'
import { registerValidation } from "./validations/auth";


mongoose.connect("mongodb+srv://admin:admin@cluster0.xknsj14.mongodb.net/?appName=Cluster0").then(( ) => console.log('DB ok'))
.catch(() => console.log("DB error", err));
const app = express();

app.use(express.json());


app.post("/auth/register", registerValidation, (req, res)    => {
    const errors = validationResult(req) ;
    if (!errors.isEmpty()) { return res.status(400).json(errors.array())}
    res.json({
        success: true,
    });

    });
app.listen(4444, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log("Server OK");
});