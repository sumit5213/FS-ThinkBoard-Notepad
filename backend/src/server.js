import express from "express"
import session from "express-session"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
<<<<<<< HEAD
import { fileURLToPath } from 'url'
import passport from "../config/passport.js"
=======
import passport from "../config/passport.js"    
import { fileURLToPath } from 'url'

>>>>>>> e2b074f (changes)

import notesRoutes from "./routes/notesRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/googleAuthRoute.js"
import "../config/passport.js"
import { connectDB } from "../config/db.js"
import rateLimiter from "./middlewares/rateLimiters.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
// Properly resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// MIDDLEWARES START 

// CORS configuration - works for both development and production
=======
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARES START 

// if (process.env.NODE_ENV !== "production") {
//     app.use(
//         cors({
//             origin: "http://localhost:5173",
//         })
//     );
// };

>>>>>>> e2b074f (changes)
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json())
app.use(rateLimiter) 

app.use(
    session({
        secret: process.env.SESSION_SECRET || "supersecret",
        resave: false,
<<<<<<< HEAD
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        },
=======
        saveUninitialized: false,   
        // cookie: {
        //     secure: process.env.NODE_ENV === "production",
        // },
>>>>>>> e2b074f (changes)
    })
);
 
app.use(passport.initialize());
<<<<<<< HEAD
// app.use(passport.session()); 
=======
app.use(passport.session()); 
>>>>>>> e2b074f (changes)

//MIDDLEWARES END
 

app.use("/api/user", userRoutes)
app.use("/api/notes", notesRoutes)
app.use("/api/auth", authRoutes)




if (process.env.NODE_ENV === "production") {
<<<<<<< HEAD
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    app.get("", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
=======
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
>>>>>>> e2b074f (changes)
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
<<<<<<< HEAD
        console.log(`Server is started on port ${PORT}`)
=======
        console.log("server is started")
>>>>>>> e2b074f (changes)
    })
})
