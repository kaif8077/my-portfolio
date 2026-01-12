import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import WorkProcess from '../components/sections/WorkProcess';
import ContactSection from '../components/sections/ContactSection';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <WorkProcess />
      <ContactSection />
    </div>
  );
};

export default Home;