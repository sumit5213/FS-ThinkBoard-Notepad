import React from 'react';
import { Link } from 'react-router';
import { PlusIcon, LogOutIcon } from "lucide-react";
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { token, logout } = useAuth();  
    return (
        <header className='bg-base-300 border-b border-base-content/10'>
            <div className='mx-auto p-4 max-w-6xl'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>
                        ThinkBoard
                    </h1>
                    <div className='flex items-center gap-4'>
                        <Link to={"/create"} className="btn btn-primary">
                            <PlusIcon className="size-5" />
                            <span>New Note</span>
                        </Link>

                        {/* NEW: Conditionally render logout button */}
                        {token && (
                            <button onClick={logout} className="btn btn-ghost text-error">
                                <LogOutIcon className="size-5" />
                                <span>Logout</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;