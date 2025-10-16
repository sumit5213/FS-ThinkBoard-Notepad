// import { useEffect } from 'react';
// import { useLocation } from 'react-router';
// import { useAuth } from '../context/AuthContext';
// import { LoaderIcon } from 'lucide-react';

// const AuthCallback = () => {
//     const location = useLocation();
//     const { login } = useAuth();

//     useEffect(() => {
//         // Parse the query parameters from the URL
//         const params = new URLSearchParams(location.search);
//         const token = params.get('token'); // Get the 'token' from "?token=..."

//         if (token) {
//             // If we have a token, use our login function from the context
//             login(token);
//         }
//         // The login function will automatically navigate to "/home"
        
//     }, [location, login]); // Effect runs when the component mounts or location changes

//     return (
//         <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
//             <LoaderIcon className="animate-spin size-10 mb-4" />
//             <p>Finalizing your login...</p>
//         </div>
//     );
// };

// export default AuthCallback;



import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { LoaderIcon } from 'lucide-react'; // Assuming you have lucide-react installed

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        // The useSearchParams hook directly gives us access to the URL's query string.
        const token = searchParams.get('token');

        if (token) {
            // Use the login function from your AuthContext to save the token.
            login(token);
            
            // Explicitly navigate to the home/dashboard page after a successful login.
            navigate('/home'); // or '/dashboard', or wherever you want users to land
        } else {
            // If no token is found, something went wrong. Redirect to the sign-in page.
            console.error("Google authentication failed: No token received.");
            navigate('/signin');
        }
    }, [searchParams, login, navigate]); // Dependencies for the effect

    // This is the content shown to the user while the effect is running.
    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
            <LoaderIcon className="animate-spin size-10 mb-4" />
            <p>Finalizing your login, please wait...</p>
        </div>
    );
};

export default AuthCallback;