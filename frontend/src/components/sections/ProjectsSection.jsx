import { useState } from 'react';
import './ProjectsSection.css';
import projectsData from '../../data/projectsData';

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Frontend', 'Full Stack', 'API Integration', 'Mobile App'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projectsData.slice(0, 3)
    : projectsData
        .filter(project => project.category === activeFilter)
        .slice(0, 3);

  return (
    <section className="projects-section">
      <div className="container">
        <div className="section-header">
          
          
            <h2 className="section-title">
              Featured<span className="highlight"> Projects</span>
            </h2>
            <p className="section-subtitle">
              Some of my recent work that I'm proud of
            </p>
          
          
          {/* Filter Tabs */}
          <div className="projects-filter">
            <div className="filter-container">
              {filters.map(filter => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            // Always show 3 cards, fill empty ones with placeholders if needed
            [...Array(3)].map((_, index) => {
              const project = filteredProjects[index];
              
              return project ? (
                <div key={project.id} className="project-card">
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-badge">{project.category}</div>
                  </div>
                  
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-technologies">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    
                    <div className="project-links">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link github"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        Code
                      </a>
                      
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link live"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                // Empty placeholder card to maintain grid size
                <div key={`empty-${index}`} className="project-card empty-card">
                  <div className="empty-image">
                    <div className="empty-icon">📂</div>
                  </div>
                  
                  <div className="empty-content">
                    <h3 className="empty-title">No Project</h3>
                    <p className="empty-description">No projects available in this category</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-projects">
              <p>No projects found in this category. Try another filter!</p>
            </div>
          )}
        </div>

        <div className="view-all">
          <a href="/projects" className="view-all-btn">
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;