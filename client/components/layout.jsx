import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
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