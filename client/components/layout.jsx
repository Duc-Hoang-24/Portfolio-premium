import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext.jsx';

const Layout = () => {
  const { auth, isAdmin, signout } = useAuth();
  const navigate = useNavigate();

  const handleSignout = () => {
    signout();
    navigate('/')
  }

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo-container">
          <Link to="/" className="custom-logo">
            <span className="clef-symbol">𝄞</span> ALAN
          </Link>
        </div>
        
        {/* Main site link scheme navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Me</Link>
          <Link to="/project">Projects</Link>
          <Link to="/education">Education</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact Me</Link>

          {auth ? (
            <div className="nav-auth">
              <span className="welcome-text">Welcome, <strong>{auth.user.name}</strong> ({isAdmin ? 'Admin' : 'User'})</span>
              <button className="signout-btn" onClick={handleSignout}>Sign Out</button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/signin">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </header>
      
      {/* Renders the matching active child route component */}
      <main className="content-view">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;