import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, isAdmin, logout, getUser } from '../auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>One Minute Learning</h2>
      <div style={styles.links}>
        <Link to="/HomePage" style={styles.link}>Home</Link>

        {isLoggedIn() && (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/ongoing" style={styles.link}>Ongoing</Link>
            <Link to="/completed" style={styles.link}>Completed</Link>
            {isAdmin() && <Link to="/admin" style={styles.link}>Admin</Link>}
            <span style={styles.user}>Hello, {user?.name || 'User'}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        )}

        {!isLoggedIn() && (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    background: 'linear-gradient(to right, #1e3c72, #2a5298)',
    color: 'white',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Segoe UI, sans-serif',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    margin: 0,
    fontSize: '22px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  links: {
    display: 'flex',
    gap: '18px',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#f1f1f1',
    fontSize: '16px',
    transition: 'color 0.3s',
  },
  user: {
    marginLeft: '10px',
    fontStyle: 'italic',
    color: '#d0d0d0',
    fontSize: '14px',
  },
  button: {
    padding: '6px 12px',
    borderRadius: '5px',
    border: '1px solid #61dafb',
    backgroundColor: 'transparent',
    color: '#61dafb',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  },
};

// Add hover styles using JavaScript (recommended to extract to CSS in real apps)
const links = ['a', 'button'];
links.forEach((tag) => {
  const styleSheet = document.styleSheets[0];
  if (styleSheet) {
    styleSheet.insertRule(
      `${tag}[style]:hover { color: #ffffff !important; background-color: rgba(255,255,255,0.1); }`,
      styleSheet.cssRules.length
    );
  }
});

export default Navbar;
