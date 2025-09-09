import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import RateLimitUI from '../components/RateLimitUI';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';


function HomePage() {
    const [isRateLimit, setIsRateLimit] = useState(false);
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchNotes = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/notes/")
            console.log(res.data)
            setNotes(res.data)
            setIsRateLimit(false)
        } catch (error) {
            if (error.response.status === 429) {
                setIsRateLimit(true);
            }
            else toast.error("failed to load notes  ")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchNotes();
    }, [])

    return (
        <div className='min-h-screen'>
            <Navbar />
            {isRateLimit && <RateLimitUI />}

            <div className='max-w-7xl mx-auto p-5 mt-6'>
                {loading && (<div className='text-primary text-center py-10'> Loading Notes....</div>)}
                {notes.length===0 && !isRateLimit && <NotesNotFound/>}
                {notes.length>0 && !isRateLimit && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {notes.map(note=>(
                            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default HomePage
