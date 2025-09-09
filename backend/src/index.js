import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "../config/db.js"
import rateLimiter from "./middlewares/rateLimiters.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(rateLimiter)



app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(" server is started")
    })
})
