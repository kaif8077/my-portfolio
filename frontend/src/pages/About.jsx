import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* About Me Section */}
      <section className="about-hero">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">
              About <span className="highlight">Me</span>
            </h1>
            <p className="section-subtitle">
              I'm a passionate Full Stack Developer creating beautiful and functional web experiences
            </p>
          </div>
        </div>
      </section>

      {/* My Journey Section */}
      <section className="journey-section">
        <div className="container">
          <div className="journey-content">
            {/* Left Side - Text */}
            <div className="journey-text">
              <h2 className="journey-title">My <span className="highlight">Journey</span></h2>
              <p>
                I'm a passionate <strong>Full Stack Developer</strong> with a B.Tech degree from 
                MIT Moradabad, specializing in creating beautiful, functional, and 
                user-centered digital experiences. My journey into web development 
                started during my college days when I built my first website.
              </p>
              <p>
                Since then, I've had the privilege of working on various projects, 
                from small business websites to large-scale web applications. 
                I believe in writing clean, efficient code and creating products 
                that not only look great but also provide real value to users.
              </p>
              <p>
                My approach combines technical expertise with creative problem-solving, 
                always keeping user experience at the forefront of every decision.
              </p>
            </div>

            {/* Right Side - Image */}
            <div className="journey-image">
              <img 
                src="/kaif_large.png" 
                alt="Kaif - Web Developer" 
                className="journey-profile-pic"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="skills-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Technical <span className="highlight">Skills</span>
            </h2>
            <p className="section-subtitle">
              Technologies and tools I work with
            </p>
          </div>
          
          <div className="skills-grid">
            {/* Frontend Skills */}
            <div className="skill-category">
              <div className="category-header">
                <div className="category-icon">💻</div>
                <h3>Frontend Development</h3>
              </div>
              <div className="skills-list">
                <div className="skill-item">
                  <span className="skill-name">React.js</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '95%'}}></div>
                  </div>
                  <span className="skill-percent">95%</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">JavaScript (ES6+)</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '90%'}}></div>
                  </div>
                  <span className="skill-percent">90%</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">HTML5 & CSS3</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '98%'}}></div>
                  </div>
                  <span className="skill-percent">98%</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">TypeScript</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '80%'}}></div>
                  </div>
                  <span className="skill-percent">80%</span>
                </div>
              </div>
            </div>
            
            {/* Backend Skills */}
            <div className="skill-category">
              <div className="category-header">
                <div className="category-icon">⚙️</div>
                <h3>Backend Development</h3>
              </div>
              <div className="skills-list">
                <div className="skill-item">
                  <span className="skill-name">Node.js</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '85%'}}></div>
                  </div>
                  <span className="skill-percent">85%</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Express.js</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '88%'}}></div>
                  </div>
                  <span className="skill-percent">88%</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">MongoDB</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '82%'}}></div>
                  </div>
                  <span className="skill-percent">82%</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">REST APIs</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '90%'}}></div>
                  </div>
                  <span className="skill-percent">90%</span>
                </div>
              </div>
            </div>
            
            {/* Tools & Others */}
            <div className="skill-category">
              <div className="category-header">
                <div className="category-icon">🛠️</div>
                <h3>Tools & Others</h3>
              </div>
              <div className="skills-list">
                <div className="skill-item">
                  <span className="skill-name">Git & GitHub</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '92%'}}></div>
                  </div>
                  <span className="skill-percent">92%</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">VS Code</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '96%'}}></div>
                  </div>
                  <span className="skill-percent">96%</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Responsive Design</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '95%'}}></div>
                  </div>
                  <span className="skill-percent">95%</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Problem Solving</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '90%'}}></div>
                  </div>
                  <span className="skill-percent">90%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Education & <span className="highlight">Experience</span>
            </h2>
            <p className="section-subtitle">
              My academic background and professional journey
            </p>
          </div>
          
          <div className="timeline">
            {/* Education Timeline */}
            <div className="timeline-item">
              <div className="timeline-date">2025</div>
              <div className="timeline-content">
                <div className="timeline-icon">🎓</div>
                <h3>Bachelor of Technology (B.Tech)</h3>
                <p className="timeline-subtitle">MIT Moradabad</p>
                <p className="timeline-description">
                  Graduated with specialization in Computer Science. Completed multiple 
                  web development projects, participated in hackathons, and gained 
                  practical experience in full-stack development.
                </p>
                <div className="timeline-tags">
                  <span className="tag">Web Development</span>
                  <span className="tag">Software Engineering</span>
                  <span className="tag">Data Structures</span>
                </div>
              </div>
            </div>
            
            {/* Experience Timeline */}
            <div className="timeline-item">
              <div className="timeline-date">Present</div>
              <div className="timeline-content">
                <div className="timeline-icon">💼</div>
                <h3>Full Stack Developer</h3>
                <p className="timeline-subtitle">Freelance & Personal Projects</p>
                <p className="timeline-description">
                  Developed and deployed numerous web applications using modern technologies. 
                  Worked with clients to understand requirements and deliver scalable solutions.
                </p>
                <div className="timeline-tags">
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">MongoDB</span>
                  <span className="tag">REST APIs</span>
                </div>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">2025</div>
              <div className="timeline-content">
                <div className="timeline-icon">🚀</div>
                <h3>Web Development Intern</h3>
                <p className="timeline-subtitle">Ahmad Web Solution</p>
                <p className="timeline-description">
                  Assisted in developing responsive websites and web applications. 
                  Learned industry best practices and collaborated with senior developers.
                </p>
                <div className="timeline-tags">
                  <span className="tag">Frontend</span>
                  <span className="tag">Responsive Design</span>
                  <span className="tag">Team Collaboration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Qualities */}
      <section className="qualities-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Personal <span className="highlight">Qualities</span>
            </h2>
            <p className="section-subtitle">
              Beyond technical skills - what makes me a great team member
            </p>
          </div>
          
          <div className="qualities-grid">
            <div className="quality-card">
              <div className="quality-icon">💡</div>
              <h3>Problem Solver</h3>
              <p>I thrive on challenges and enjoy finding innovative solutions to complex problems.</p>
            </div>
            
            <div className="quality-card">
              <div className="quality-icon">📚</div>
              <h3>Continuous Learner</h3>
              <p>Always staying updated with the latest technologies and industry trends.</p>
            </div>
            
            <div className="quality-card">
              <div className="quality-icon">🎯</div>
              <h3>Detail-Oriented</h3>
              <p>Meticulous attention to detail in code, design, and project requirements.</p>
            </div>
            
            <div className="quality-card">
              <div className="quality-icon">🤝</div>
              <h3>Collaborative</h3>
              <p>Excellent team player with strong communication and interpersonal skills.</p>
            </div>
            
            <div className="quality-card">
              <div className="quality-icon">⏱️</div>
              <h3>Time Management</h3>
              <p>Skilled at prioritizing tasks and meeting deadlines efficiently.</p>
            </div>
            
            <div className="quality-card">
              <div className="quality-icon">✨</div>
              <h3>Creative Thinker</h3>
              <p>Bringing creative solutions to technical and design challenges.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;