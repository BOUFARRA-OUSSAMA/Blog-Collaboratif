import React from 'react';

const FooterComponent = () => {
    return (
        <footer className="footer bg-dark text-white py-3">
            <div className="container d-flex justify-content-center">
                <span className="text-center">Your Company Name &copy; {new Date().getFullYear()}</span>
            </div>
        </footer>
    );
};

export default FooterComponent;
