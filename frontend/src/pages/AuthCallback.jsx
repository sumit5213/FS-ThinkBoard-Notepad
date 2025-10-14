import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { LoaderIcon } from 'lucide-react';

const AuthCallback = () => {
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        // Parse the query parameters from the URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token'); // Get the 'token' from "?token=..."

        if (token) {
            // If we have a token, use our login function from the context
            login(token);
        }
        // The login function will automatically navigate to "/home"
        
    }, [location, login]); // Effect runs when the component mounts or location changes

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
            <LoaderIcon className="animate-spin size-10 mb-4" />
            <p>Finalizing your login...</p>
        </div>
    );
};

export default AuthCallback;