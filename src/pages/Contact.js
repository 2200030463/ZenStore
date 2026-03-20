import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields!");
            return;
        }

        // Simulate API call
        setTimeout(() => {
            toast.success("Thank you! Your message has been sent successfully.");
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1000);
    };

    return (
        <div className="contact-page-container">
            <div className="contact-header">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you. Please fill out this form or reach out to us using the details below.</p>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="info-card">
                        <span className="info-icon">📍</span>
                        <h3>Our Address</h3>
                        <p>123 Fashion Street, Zen District</p>
                        <p>Tech City, TC 560001</p>
                    </div>
                    <div className="info-card">
                        <span className="info-icon">📞</span>
                        <h3>Phone Number</h3>
                        <p>+91 98765 43210</p>
                        <p>Mon-Sat (9am - 6pm)</p>
                    </div>
                    <div className="info-card">
                        <span className="info-icon">✉️</span>
                        <h3>Email Address</h3>
                        <p>support@zenstore.com</p>
                        <p>help@zenstore.com</p>
                    </div>
                </div>

                <div className="contact-form-container">
                    <h2>Send us a Message</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="How can we help?"
                            />
                        </div>
                        <div className="form-group">
                            <label>Message *</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write your message here..."
                                rows="5"
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-btn">SEND MESSAGE</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
