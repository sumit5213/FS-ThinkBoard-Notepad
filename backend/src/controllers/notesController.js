import Note from "../models/noteModel.js"

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note)
    } catch (error) {
        console.error("Error while fetching the note", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error while fetching the notes", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function createNotes(req, res) {
    try {
        const { title, content } = req.body
        const note = new Note({ title, content })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.error("Error while creating the notes", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function updateNotes(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note updated succesffuly" });
    } catch (error) {
        console.error("Error while updating the notes", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function deleteNotes(req, res) {
    try {
        // const { title, content } = req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted succesffuly" });
    } catch (error) {
        console.error("Error while deleting the note", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}