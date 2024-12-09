import React, { useRef, useEffect } from 'react';
import "./homepage.css"; // Import your CSS file
import AboutUs from './AboutUs';

function HomePage() {
    const aboutUsRef = useRef(null);

    // Scroll to AboutUs section if needed
    useEffect(() => {
        if (window.location.hash === '#aboutus') {
            aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div className="homepage">
            <div className="content-wrapper">

                <div className="content">
                    <h2>Welcome to the Scholarship and Financial Aid Platform</h2>
                    <p>
                        This platform helps students find, apply for, and manage scholarships and financial aid.
                        You can sign up to track your application progress and receive updates on the latest financial aid opportunities.
                    </p>
                </div>
            </div>

            {/* Add an ID to AboutUs section */}
            <div ref={aboutUsRef}>
                <AboutUs />
            </div>
        </div>
    );
}

export default HomePage;
