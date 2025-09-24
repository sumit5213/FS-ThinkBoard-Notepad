import React from 'react'
import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { formatDate } from '../lib/utils'
import axiosInstance from "../lib/axios"
import axios from "axios"
import toast from 'react-hot-toast'

function NoteCard({ note, setNotes }) {

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please add a title or content");
            return;
        }

        setSaving(true);

        try {
            const payload = { title: note.title, content: note.content };
            await axiosInstance.put(`/notes/${id}`, payload);
            toast.success("Note updated successfully");
            navigate("/home");
        } catch (error) {
            console.log("Error saving the note:", error);
            toast.error("Failed to update note");
        } finally {
            setSaving(false);
        }
    }

    const handleDelete = async (e, id) => {
        e.preventDefault()
        if (!window.confirm("Are you sure want to delete the note")) return

        try {
            await axiosInstance.delete(`/notes/${id}`)
            setNotes(prev => prev.filter(note => note._id !== id))
            toast.success("Note deleted successfully")
        } catch (error) {
            console.log("Error in handleDelete", error)
            toast.error("Failed to delete the note")
        }
    }

    return (
        <Link to={`/note/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary">
            <div className='card-body'>
                <h3 className='card-title text-base-content'>{note.title}</h3>
                <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-sm text-base-content/60'>
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className='flex items-center gap-4'>
                        <button>
                        {<PenSquareIcon className=" size-4" onClick={handleUpdate} />}
                        </button>
                        <button className='btn btn-ghost btn-xs text-error'>
                            <Trash2Icon className=" size-4" onClick={(e) => handleDelete(e, note._id)} />
                        </button>
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default NoteCard
