import React from 'react';
import './Notfound.css';

const NotFound = () => {
    

    return (
        <>
           
            <div className="navbar-gap"></div>

            <div className="not-found-container">
                <div className="not-found-content">
                    <div className="error-code">404</div>
                    <div className="error-message">Page Not Found</div>
                    <p className="error-description">
                        Oops! The page you're looking for seems to have wandered off into the digital void.
                        It might have been moved, deleted, or never existed in the first place.
                    </p>

                    
                </div>
            </div>
        </>
    );
};

export default NotFound;