import './WorkProcess.css';

const WorkProcess = () => {
  const processSteps = [
    {
      id: 1,
      number: "01",
      title: "Research",
      description: "Understanding project requirements, target audience, and market analysis",
      icon: "🔍",
      color: "#4299e1"
    },
    {
      id: 2,
      number: "02",
      title: "Analysis",
      description: "Planning architecture, technology stack, and creating project roadmap",
      icon: "📊",
      color: "#38b2ac"
    },
    {
      id: 3,
      number: "03",
      title: "Design",
      description: "Creating wireframes, prototypes, and UI/UX design mockups",
      icon: "🎨",
      color: "#9f7aea"
    },
    {
      id: 4,
      number: "04",
      title: "Launch",
      description: "Deployment, testing, and continuous improvement of the project",
      icon: "🚀",
      color: "#ed8936"
    }
  ];

  return (
    <section className="work-process">
      <div className="container">
        <div className="work-process-content">
          {/* Left Side - Description */}
          <div className="process-info">
            <div className="section-header">
              <span className="section-label">WORK PROCESS</span>
              <h2 className="section-title">
                My <span className="highlight">Workflow</span> For Success
              </h2>
            </div>
            
            <p className="process-description">
              I follow a structured approach to ensure every project is delivered 
              with excellence. From initial research to final deployment, 
              each step is carefully planned and executed.
            </p>
            
            <div className="process-features">
              <div className="feature">
                <div className="feature-icon">✅</div>
                <div className="feature-text">
                  <h4>Transparent Process</h4>
                  <p>Regular updates and clear communication at every stage</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature-icon">⚡</div>
                <div className="feature-text">
                  <h4>Fast Delivery</h4>
                  <p>Efficient workflow ensures timely project completion</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature-icon">🔄</div>
                <div className="feature-text">
                  <h4>Iterative Approach</h4>
                  <p>Continuous feedback and improvement cycles</p>
                </div>
              </div>
            </div>
            
            
          </div>
          
          {/* Right Side - Process Boxes */}
          <div className="process-steps">
            <div className="process-grid">
              {processSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className="process-card"
                  style={{ 
                    '--step-color': step.color,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="step-header">
                    <div className="step-number" style={{ backgroundColor: step.color }}>
                      {step.number}
                    </div>
                    <div className="step-icon">{step.icon}</div>
                  </div>
                  
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                  
                  <div className="step-connector">
                    <div className="connector-line"></div>
                    {index < processSteps.length - 1 && (
                      <div className="connector-arrow">→</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;