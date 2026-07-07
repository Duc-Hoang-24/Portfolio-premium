// Component cataloging institutional accomplishments, timelines, and certificate goals
const Education = () => {
  const educationalMilestones = [
    {
      credential: "Advanced Diploma in Software Engineering Technology",
      institution: "Centennial College — Toronto, ON",
      timeline: "Jan 2025 — Present (Expected 2027)",
      context: "Core modules include Web Development (COMP229), Relational Database Architectures, Systems Administration, and Discrete Structures."
    },
    {
      credential: "High School Diploma",
      institution: "Secondary Institution Degree",
      timeline: "Graduated June 2024",
      context: "Concentrated on fundamental programming principles, algorithmic logic, and mathematical operations."
    }
  ];

  return (
    <div className="page-section academic-history">
      <h2>Education & Qualifications</h2>
      <div className="timeline-container">
        {educationalMilestones.map((edu, idx) => (
          <div key={idx} className="education-node">
            <span className="timestamp">{edu.timeline}</span>
            <h3>{edu.credential}</h3>
            <h4>{edu.institution}</h4>
            <p>{edu.context}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;