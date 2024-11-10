// src/LandingPage.js
import React from 'react';

const LandingPage = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Welcome to Meal Prep Bot</h1>
                <p>Your personalized meal planning assistant</p>
                <button style={styles.button}>Get Started</button>
            </header>
            <section style={styles.features}>
                <h2>Why Use Meal Prep Bot?</h2>
                <ul>
                    <li>Personalized meal plans based on your goals</li>
                    <li>Automated grocery lists for convenience</li>
                    <li>Easy-to-follow cooking instructions</li>
                    <li>Save time and reach your health goals</li>
                </ul>
            </section>
            <footer style={styles.footer}>
                <p>&copy; 2024 Meal Prep Bot. All rights reserved.</p>
            </footer>
        </div>
    );
};

const styles = {
    container: { fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' },
    header: { padding: '50px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' },
    button: { padding: '10px 20px', marginTop: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    features: { margin: '20px 0' },
    footer: { padding: '20px', backgroundColor: '#f1f1f1', borderTop: '1px solid #ddd' },
};

export default LandingPage;