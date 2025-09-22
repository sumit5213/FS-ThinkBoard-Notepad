import express from "express"
import { createNotes, deleteNotes, getAllNotes, getNoteById, updateNotes } from "../controllers/notesController.js"
import { verifyToken } from "../middlewares/authenticate.js"

const router = express.Router()


router.get("/", verifyToken, getAllNotes)
router.post("/create", verifyToken, createNotes);

router.get("/:id", verifyToken, getNoteById)
router.put("/:id", verifyToken, updateNotes)
router.delete("/:id", verifyToken, deleteNotes);


export default router   