import React, { useEffect, useState } from 'react';
import supabase from '../helper/supabaseClient';
import { Navigate } from 'react-router';

function Wrapper({ children }) {
    const [authenticated, setAuthenticated] = useState(false); // State that tracks if the user is logged in
    const [loading, setLoading] = useState(true); // State that tracks  if the session check is complete

    useEffect(() => {
        // Fetch current session form Supabase
        const getSession = async () => {
            const {
                data: { session }
            } = await supabase.auth.getSession();

            setAuthenticated(!!session); // Set authenticated to true if session exists
            setLoading(false); //  Stop loading after session check is completed
        };
        getSession();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    } else {
        if (authenticated) {
            return <>{children}</>; // If authenticated, render protected content
        }
        return <Navigate to="/login" />;
    }
}
export default Wrapper;
