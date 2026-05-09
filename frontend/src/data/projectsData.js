import elderlycare from './images/elderlycare.png';
import portfolio from './images/my_portfolio.png';
import prescripto from './images/prescripto.png';
import aiiemail from './images/ai-email-assistant.png';
import github from './images/githubexplorer.png';

const projectsData = [
  {
    id: 1,
    title: "Elderly Care",
    description: "A digital elderly care solution providing QR-based medical profiles, emergency alerts, real-time assistance, and fast caregiver access.",
    image: elderlycare,
    technologies: ["React", "JavaScript", "Node.js", "MongoDB"],
    github: "https://github.com/kaif8077/elderly-care",
    live: "https://kaif8077-elderly-care.vercel.app",
    category: "Full Stack"
  },

  {
    id: 2,
    title: "Prescripto",
    description: "A full-stack doctor appointment booking platform that allows patients to browse doctors, book appointments, and manage schedules online.",
    image: prescripto,
    technologies: ["React", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/kaif8077/Prescripto",
    live: "https://prescripto-theta-pied.vercel.app/",
    category: "Full Stack"
  },

  {
    id: 3,
    title: "GitHub Explorer",
    description: "A frontend application to explore GitHub profiles, repositories, and user details with a clean and responsive UI.",
    image: github,
    technologies: ["React", "JavaScript", "GitHub API", "CSS3"],
    github: "https://github.com/kaif8077/github-explorer",
    live: "https://github-explorer-brown-ten.vercel.app/",
    category: "Frontend"
  },

  {
    id: 4,
    title: "AI Email Assistant",
    description: "An AI-powered email assistant that helps generate professional email replies and smart responses using AI integration.",
    image: aiiemail,
    technologies: ["React", "JavaScript", "AI Integration", "Node.js"],
    github: "https://github.com/kaif8077/ai-gmail-assistant",
    live: "",
    category: "API Integration"
  },

  {
    id: 5,
    title: "My Portfolio",
    description: "Personal portfolio showcasing projects, skills, experience, and contact details with a clean responsive design.",
    image: portfolio,
    technologies: ["React", "JavaScript", "HTML5 & CSS3", "Git & GitHub"],
    github: "https://github.com/kaif8077/my-portfolio",
    live: "https://my-portfolio-ten-wheat-68.vercel.app",
    category: "Frontend"
  }
];

export default projectsData;