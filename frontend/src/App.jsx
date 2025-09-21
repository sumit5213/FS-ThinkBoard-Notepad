import React from 'react'
import { Route, Routes, Router } from "react-router"
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import NoteDetailPage from './pages/NoteDetailPage'
import toast from "react-hot-toast"
import SignIn from './pages/SignIn'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className='relative h-full w-full bg-black'>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background: radial-gradient
                    (125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />

        <Route path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  )
}

export default App

