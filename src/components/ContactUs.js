import React, { useState, useRef } from 'react';
import './contactus.css'; // Import the CSS file for styling
import emailjs from 'emailjs-com';

function ContactUs() {
    const [showPopup, setShowPopup] = useState(false); // State to handle pop-up visibility
    const form = useRef(); // Reference to the form element

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form from reloading the page

        emailjs
            .sendForm('service_baiipz6', 'template_7nrpvtq', form.current, 'cTiE-zS_LAKX7C4ZU')
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                }
            );

        // Reset the form fields
        event.target.reset();

        // Show the pop-up
        setShowPopup(true);

        // Close the pop-up after 5 seconds
        setTimeout(() => {
            setShowPopup(false);
        }, 5000);
    };

    const closePopup = () => {
        setShowPopup(false); // Close the pop-up manually
    };

    return (
        <div className="contactus">
            <div className="contactus-container">
                <h2>Contact Us</h2>
                <p>If you have any questions, feel free to reach out to us. We're here to help!</p>

                <div className="contact-info">
                    <p>
                        <strong>Email:</strong>{' '}
                        <a href="mailto:kolipakulapavan123@gmail.com">kolipakulapavan123@gmail.com</a>
                    </p>
                    <p><strong>Phone:</strong> +1-234-567-890</p>
                    <p><strong>Address:</strong> 123 Scholarship St, Education City, USA</p>
                </div>

                <form ref={form} className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name:</label>
                        <input type="text" id="name" name="user_name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Your Email:</label>
                        <input type="email" id="email" name="user_email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" className="submit-button">Send Message</button>
                </form>

                {/* Pop-up for success message */}
                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <p>Your message has been sent successfully!</p>
                            <button onClick={closePopup} className="popup-close">Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContactUs;
