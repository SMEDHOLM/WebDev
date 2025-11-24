import express from  "express";
import multer from "multer"; 
import mongoose from "mongoose";    
import { registerValidation, loginValidation, postCreateValidation} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
mongoose.connect("mongodb+srv://admin:admin@cluster0.xknsj14.mongodb.net/blog?appName=Cluster0").then(( ) => console.log('DB ok'))
.catch(() => console.log("DB error", err));
const app = express();
const storage = multer.diskStorage({
    destination: (_,__, cb) => {
        cb(null, 'uploads');
    },
    filename: (_,file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.post("/auth/login",  loginValidation, handleValidationErrors, UserController.login );
app.post("/auth/register",  registerValidation, handleValidationErrors, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});
app.get("/posts",  PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth,  PostController.remove);
app.patch("/posts/:id", checkAuth, postCreateValidation, PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log("Server OK");
});