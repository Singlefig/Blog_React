import React from "react";
import './Footer.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="divider" />
            <p>Copyright {new Date().getFullYear()} - Singlefig</p>
        </footer>
    );
};