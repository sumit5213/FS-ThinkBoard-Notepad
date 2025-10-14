import express from "express"
import session from "express-session"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import passport from "passport"

import notesRoutes from "./routes/notesRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/googleAuthRoute.js"
import "../config/passport.js"
import { connectDB } from "../config/db.js"
import rateLimiter from "./middlewares/rateLimiters.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


// MIDDLEWARES START

if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
};

app.use(express.json())
app.use(rateLimiter)

app.use(
    session({
        secret: process.env.SESSION_SECRET || "supersecret",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session()); 

//MIDDLEWARES END
 

app.use("/api/user", userRoutes)
app.use("/api/notes", notesRoutes)
app.use("/api/auth", authRoutes)




if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server is started")
    })
})
