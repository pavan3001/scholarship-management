import React, { useRef, useEffect, useState } from 'react';
import "./homepage.css";
import axios from 'axios';

function HomePage() {
    const aboutUsRef = useRef(null);
    const [userName, setUserName] = useState('');

    // Scroll to AboutUs section if needed
    useEffect(() => {
        if (window.location.hash === '#aboutus') {
            aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // Retrieve user's name from local storage
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Get the userId from local storage
                const userId = localStorage.getItem('userId');
                
                // If userId exists, make the API request
                if (userId) {
                    const response = await axios.get(`http://localhost:8080/api/users/profile?userId=${userId}`);
                    setUserName(response.data.name);
                }
            } catch (error) {
                console.error("Error user name:", error);
            }
        };

        fetchProfileData();
    }, []);

    return (
        <div className="homepage">
            <div className="content-wrapper">

                <div className="content">
                    <h2>Welcome back {userName}!</h2>
                    <p>
                        This platform helps students find, apply for, and manage scholarships and financial aid.
                        You can sign up to track your application progress and receive updates on the latest financial aid opportunities.
                    </p>
                </div>
            </div>
            
        </div>
    );
}

export default HomePage;
