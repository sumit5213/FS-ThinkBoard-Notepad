import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router";
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import NoteDetailPage from './pages/NoteDetailPage';
import SignIn from './pages/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import { Toaster } from 'react-hot-toast'; // Good to have the Toaster here
import AuthCallback from './pages/AuthCallback';


function App() {
  return (
    <AuthProvider> {/* Wrap everything in the provider */}
      <div className='relative h-full w-full bg-black'>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
        <Toaster position="top-center" reverseOrder={false} />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<SignIn />} /> {/* For convenience */}

          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Protected Routes */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create" 
            element={
              <ProtectedRoute>
                <CreatePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/note/:id" 
            element={
              <ProtectedRoute>
                <NoteDetailPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;