import express from "express"
import { userRegisteration, userLogin } from "../controllers/userController.js";
 
const router = express.Router()

router.post("/signup", userRegisteration);
router.post("/login", userLogin);

// router.get("/user/notes", )

export default router; 