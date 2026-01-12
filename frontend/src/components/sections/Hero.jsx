import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Hero.css';

const Hero = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Local image path
  const profileImage = "/kaif_large.png";

  const handleDownloadCV = () => {
    setIsDownloading(true);
    
    try {
      const link = document.createElement('a');
      link.href = '/kaif_resume.pdf';
      link.download = 'Kaif_Resume.pdf';
      
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        setIsDownloading(false);
      }, 100);
      
    } catch (error) {
      console.error('Download error:', error);
      setIsDownloading(false);
      window.open('/kaif_resume.pdf', '_blank');
    }
  };

  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <section className="hero">
      <div className="container container-kaif">
        <div className="hero-content">
          {/* Left Side - Text Content */}
          <div className="hero-text">
            <div className="greeting">
              
              <span>Hi, I am</span>
            </div>
            
            <h1 className="hero-title">
              <span className="name-highlight">Kaif</span>
              <br />
              <span className="name-highlight">Web Developer</span>
            </h1>
            
            <p className="hero-description">
              I specialize in creating modern, responsive, and user-friendly web applications 
              using the latest technologies. With a focus on clean code and optimal performance, 
              I transform ideas into digital reality.
            </p>
            
            <div className="hero-buttons">
              <button 
                className={`btn btn-secondary ${isDownloading ? 'downloading' : ''}`} 
                onClick={handleDownloadCV}
                disabled={isDownloading}
                aria-label={isDownloading ? "Downloading CV" : "Download CV"}
              >
                {isDownloading ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spinner">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Downloading...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download CV
                  </>
                )}
              </button>
              
              <button className="btn btn-secondary" onClick={handleContactClick} aria-label="Contact Me">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Contact Me
              </button>
            </div>
          </div>
          
          {/* Right Side - Profile Image (Hidden on Mobile) */}
          <div className="hero-image">
            <div className="image-container">
              <img 
                src={profileImage} 
                alt="Kaif - Web Developer" 
                className="profile-image"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextElementSibling) {
                    e.target.nextElementSibling.style.display = 'flex';
                  }
                }}
              />
              
              {/* Image placeholder agar image load na ho to */}
              <div className="image-placeholder" style={{display: 'none'}}>
                <div className="placeholder-icon" aria-hidden="true">K</div>
                <span>Kaif</span>
              </div>
              
              <div className="image-frame" aria-hidden="true"></div>
              
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;