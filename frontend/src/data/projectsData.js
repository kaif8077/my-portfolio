import elderlycare from './images/elderlycare.png';
import portfolio from './images/my_portfolio.png';


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
    title: "My Portfolio",
    description: "Personal portfolio showcasing projects, skills, experience, and contact details with a clean responsive design.",
    image: portfolio,
    technologies: ["React", "JavaScript",  "HTML5 & CSS3","Git & GitHub"],
    github: "https://github.com/kaif8077/my-portfolio",
    live: "https://my-portfolio-ten-wheat-68.vercel.app",
    category: "Frontend"
  },
  
];

export default projectsData;