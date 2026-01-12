import { useNavigate } from 'react-router-dom';
import './AboutSection.css';

const AboutSection = () => {
  const navigate = useNavigate();
  const profileImage = "/kaif_small.jpeg";
  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <section className="about-section">
      <div className="container">
        <div className="about-content">
          {/* Left Side - Image */}
          <div className="about-image">
            <img
              src={profileImage}
              alt="Mohammad Kaif"
              className="profile-image"
            />
          </div>

          {/* Right Side - About Content */}
          <div className="about-text">
            <div className="section-header">
              <h2 className="section-title">
                About <span className="highlight">Me</span>
              </h2>
            </div>

            <div className="about-description">
              <p>
                <strong>I'm Mohammad Kaif, a passionate Web Developer</strong> dedicated to
                creating beautiful, functional websites. I specialize in frontend development
                with modern technologies and love bringing creative ideas to life through clean,
                efficient code.
              </p>
            </div>

            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">⚛️</div>
                <div className="feature-content">
                  <h3>React Developer</h3>
                  <p>Building modern web apps with React.js</p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon">🚀</div>
                <div className="feature-content">
                  <h3>Fast & Optimized</h3>
                  <p>Creating high-performance websites</p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon">📱</div>
                <div className="feature-content">
                  <h3>Responsive Design</h3>
                  <p>Perfect display on all devices</p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon">💻</div>
                <div className="feature-content">
                  <h3>Clean Code</h3>
                  <p>Writing maintainable and scalable code</p>
                </div>
              </div>
            </div>

            <button className="learn-more-btn" onClick={handleLearnMore}>
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;