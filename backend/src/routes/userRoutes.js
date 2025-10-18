import express from "express"
import { userRegisteration, userLogin, loginAndSignup } from "../controllers/userController.js";
 
const router = express.Router()

// router.post("/signup", userRegisteration);
// router.post("/login", userLogin);

router.post("/login", loginAndSignup)

// router.get("/user/notes", )

export default router; 