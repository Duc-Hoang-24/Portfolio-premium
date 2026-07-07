import { useNavigate } from 'react-router-dom';

// Component displaying a clean welcome message, mission directive, and cross-navigation action
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page-section home-hero">
      <h1>Welcome to My Personal Portfolio</h1>
      
      <blockquote className="mission-statement">
        "Mission Statement: To engineer robust, intuitive software architectures and database configurations that simplify complex real-world data systems, merging rigorous logic with highly efficient execution."
      </blockquote>
      
      <p className="intro-text">
        Explore my qualifications, technical projects, and background in systems design.
      </p>
      
      {/* Interactive contextual router link button redirecting to About Me overview */}
      <button 
        className="action-btn" 
        onClick={() => navigate('/about')}
      >
        Learn More About Me
      </button>
    </div>
  );
};

export default Home;