import express from "express"
import session from "express-session"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url'
import passport from "../config/passport.js"

import notesRoutes from "./routes/notesRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/googleAuthRoute.js"
import "../config/passport.js"
import { connectDB } from "../config/db.js"
import rateLimiter from "./middlewares/rateLimiters.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

// Properly resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// MIDDLEWARES START 

// CORS configuration - works for both development and production
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
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        },
    })
);
 
app.use(passport.initialize());
app.use(passport.session()); 

//MIDDLEWARES END
 

app.use("/api/user", userRoutes)
app.use("/api/notes", notesRoutes)
app.use("/api/auth", authRoutes)




if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is started on port ${PORT}`)
    })
})
