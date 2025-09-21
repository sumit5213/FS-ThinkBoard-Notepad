import express from "express"
import {googleLogin, googleCallback, logout} from "../controllers/googleAuthController.js"

const router = express.Router()

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
router.get("/logout", logout);


export default router; 
