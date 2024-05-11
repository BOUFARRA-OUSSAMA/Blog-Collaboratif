import React from 'react';
import '../App.css'

const FooterComponent = () => {
    return (
        <footer className="footer fixed-bottom">
            <div className="container d-flex justify-content-center">
                <span className="text-center">By: BAAKRIM Mohamed ALMahdy & TOUMI Fadwa &copy; {new Date().getFullYear()}</span>
            </div>
        </footer>
    );
};

export default FooterComponent;
