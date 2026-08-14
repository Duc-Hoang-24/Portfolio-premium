import profileImg from './assets/profile.jpg'; // <-- 1. Import your image from assets

// Component aggregating identification profiles, short career bio, and resume download pathing
const About = () => {
  return (
    <div className="page-section explicit-about">
      <h2>About Me</h2>
      
      <div className="profile-wrapper">
        {/* 2. Replaced the old text placeholder box with the real interactive image tag */}
        <div className="profile-image-container">
          <img 
            src={profileImg} 
            alt="Duc Hoang Nguyen (Alan) Professional Headshot" 
            className="profile-photo"
          />
        </div>
        
        <div className="bio-details">
          <h3>Duc Hoang Nguyen (Alan)</h3>
          <p>
            I am an analytical and detail-oriented Software Engineering student currently studying in Toronto. 
            I specialize in structuring backend business logic, writing modular C# components, and designing secure relational database systems. 
            My technical focus centers around translating client requirements into cleanly running applications. Beyond coding, I practice the violin, which keeps my analytical focus razor-sharp.
          </p>
          
          <a 
            href="/Duc-Hoang-Nguyen-CV.pdf" 
            target="_blank" 
            rel="noreferrer" 
            className="download-link"
          >
            View My Resume (PDF)
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;