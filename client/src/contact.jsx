import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Handles capturing submission states via custom interactive fields and bouncing home
const Contact = () => {
  const navigate = useNavigate();
  
  // Local reactive component state variables mapping input parameters
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    emailAddress: '',
    messageText: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    
    // Log data entry state capture verification testing
    console.log("Captured Contact Ingestion Package:", formData);
    
    // Programmatic routing bouncing the end-user cleanly back to index view layout
    navigate('/');
  };

  return (
    <div className="page-section user-contact">
      <h2>Contact Me</h2>
      
      <div className="contact-layout">
        {/* Standard sidebar construct showing direct touchpoints */}
        <div className="info-panel">
          <h3>Get In Touch</h3>
          <p><strong>Email:</strong> info@alannugyen.dev</p>
          <p><strong>Location:</strong> Toronto, Ontario, Canada</p>
          <p>Feel free to reach out via the message intake pipeline regarding technical operations or consulting opportunities.</p>
        </div>

        {/* Short interactive entry tracking module */}
        <form className="interactive-form" onSubmit={handleFormSubmission}>
          <div className="form-group">
            <label>First Name</label>
            <input 
              type="text" name="firstName" required
              value={formData.firstName} onChange={handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input 
              type="text" name="lastName" required
              value={formData.lastName} onChange={handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input 
              type="tel" name="contactNumber" required
              value={formData.contactNumber} onChange={handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" name="emailAddress" required
              value={formData.emailAddress} onChange={handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea 
              name="messageText" rows="4" required
              value={formData.messageText} onChange={handleInputChange}
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;