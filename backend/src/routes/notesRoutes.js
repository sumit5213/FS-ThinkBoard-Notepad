import express from "express"
import { createNotes, deleteNotes, getAllNotes, getNoteById, updateNotes } from "../controllers/notesController.js"
import { verifyToken } from "../middlewares/authenticate.js"

const router = express.Router()

// router.use(verifyToken);


// router.get("/" ,getAllNotes)

// router.get("/:id", getNoteById)

// router.post("/", createNotes)

// router.put("/:id",updateNotes)

// router.delete("/:id", deleteNotes)

router.route("/")
  .get(verifyToken, getAllNotes)
  .post(verifyToken, createNotes);

router.route("/:id")
  .get(verifyToken, getNoteById)
  .put(verifyToken, updateNotes)
  .delete(verifyToken, deleteNotes);


export default router   