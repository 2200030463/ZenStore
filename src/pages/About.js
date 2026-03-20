import React from "react";
import "./About.css";

function About() {
    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="about-overlay">
                    <h1>About Me</h1>
                    <p>Passionate Developer & Innovator</p>
                </div>
            </div>

            <div className="about-content">
                <section className="about-card intro-section">
                    <h2>Hello, I'm Gorrepati Sriram</h2>
                    <p className="about-bio">
                        I am a full-stack developer dedicated to building high-quality, professional e-commerce applications and modern web experiences.
                        With a focus on stunning design, clean code, and user-centric functionality, I strive to create products that people love to use.
                    </p>
                </section>

                <section className="about-card details-section">
                    <h3>Contact Details</h3>
                    <ul className="contact-list">
                        <li>
                            <span className="contact-icon">📞</span>
                            <strong>Phone:</strong> <a href="tel:+918688763435">8688763435</a>
                        </li>
                        <li>
                            <span className="contact-icon">✉️</span>
                            <strong>Email:</strong> <a href="mailto:sriramgorrepati620@gmail.com">sriramgorrepati620@gmail.com</a>
                        </li>
                    </ul>
                </section>

                <section className="about-card mission-section">
                    <h3>My Mission</h3>
                    <p>
                        To leverage modern technologies like React, Node.js, and advanced UI design principles to build dynamic and responsive applications that solve real-world problems.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default About;
