// Component showcasing specialized technical services with associated visual asset placeholders
const Services = () => {
  const serviceOfferings = [
    {
      title: "Full-Stack Web Development",
      description: "Building responsive, highly optimized, and interactive single-page applications using modern front-end frameworks like React and Vite alongside modular styling rules.",
      iconPlaceholder: "[ 🌐 Web Dev Icon ]"
    },
    {
      title: "Database Design & Normalization",
      description: "Architecting structured Oracle SQL relational schemas. Experienced in implementing strict integrity constraints, indexing, and executing advanced queries without redundant overhead.",
      iconPlaceholder: "[ 🗄️ Database Icon ]"
    },
    {
      title: "Backend Engineering & Systems Integration",
      description: "Developing robust object-oriented backend solutions in C# and Node.js. Configuring automated bash scripts, task management routines, and managing Linux-based server instances.",
      iconPlaceholder: "[ ⚙️ Backend Logic Icon ]"
    }
  ];

  return (
    <div className="page-section professional-services">
      <h2>Services I Offer</h2>
      <p className="services-intro">
        Leveraging clean development architectures to translate technical ideas into production-ready deployments.
      </p>
      
      <div className="projects-grid"> {/* Reuses the responsive grid layout CSS block */}
        {serviceOfferings.map((service, index) => (
          <div key={index} className="project-card">
            <div className="project-image-box" style={{ fontSize: '2rem' }}>
              {service.iconPlaceholder}
            </div>
            <h3>{service.title}</h3>
            <p style={{ color: '#475569', lineHeight: '1.5' }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;