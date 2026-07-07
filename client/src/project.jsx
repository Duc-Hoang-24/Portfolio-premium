// Component featuring descriptions of 3 notable past or current structural applications
const Project = () => {
  const personalProjects = [
    {
      title: "Drop-in at Cent Platform",
      role: "Lead Developer & Database Architect",
      outcome: "Designed an automated drop-in campus sports event tracking model, creating a unified user flow schema for rapid schedule registration.",
      imgPlaceholder: "[ Drop-in App Interface Graphic ]"
    },
    {
      title: "Generic Transaction Processor",
      role: "Backend C# Engineer",
      outcome: "Constructed an architecture processing complex linear data logs using custom delegates, LINQ structures, and granular exception checks.",
      imgPlaceholder: "[ C# Compilation Logs Graphic ]"
    },
    {
      title: "Toronto Urban Management Review",
      role: "Systems Research Analyst",
      outcome: "Formulated an annotated structural analysis and video presentation targeting municipal fund distribution patterns.",
      imgPlaceholder: "[ Budget Allocation Statistics Graphic ]"
    }
  ];

  return (
    <div className="page-section active-projects">
      <h2>Highlighted Projects</h2>
      <div className="projects-grid">
        {personalProjects.map((proj, idx) => (
          <div key={idx} className="project-card">
            <div className="project-image-box">{proj.imgPlaceholder}</div>
            <h3>{proj.title}</h3>
            <p><strong>Role:</strong> {proj.role}</p>
            <p>{proj.outcome}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;