import express from  "express";
import multer from "multer"; 
import mongoose from "mongoose";    
import { registerValidation, loginValidation, postCreateValidation} from "./validations.js";
import  {UserController, PostController} from "./controllers/index.js";
import cors from 'cors'
import {handleValidationErrors, checkAuth} from "./utils/index.js";
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    throw new Error("MONGO_URI and JWT_SECRET environment variables are required");
}
const app = express();
const storage = multer.diskStorage({
    destination: (_,__, cb) => {
        cb(null, 'uploads/covers');
    },
    filename: (_,file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

app.use(express.json());
app.use(cors());
app.use('uploads/covers', express.static('uploads/covers'));
app.get("/health", (_req, res) => res.sendStatus(200));
app.post("/auth/login",  loginValidation, handleValidationErrors, UserController.login );
app.post("/auth/register",  registerValidation, handleValidationErrors, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/covers/${req.file.originalname}`,
    });
});
app.get("/posts",  PostController.getAll);
app.get("/tags",  PostController.getLastTags);
app.get("/posts/tags",  PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete("/posts/:id", checkAuth,  PostController.remove);
app.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

const start = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB ok");
    const port = process.env.PORT || 4444;
    app.listen(port, () => console.log(`Server listening on port ${port}`));
};

start().catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
});