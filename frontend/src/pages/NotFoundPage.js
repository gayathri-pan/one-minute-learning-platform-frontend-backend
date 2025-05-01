import React from 'react';
import { Link } from 'react-router-dom';


const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <h2 style={styles.subtitle}>Page not found or access denied</h2>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '100px 20px'
  },
  title: {
    fontSize: '3rem',
    color: '#ff4d4f'
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#555',
    marginBottom: '20px'
  },
  message: {
    fontSize: '1.2rem',
    margin: '20px 0'
  },
  link: {
    fontSize: '1rem',
    color: '#1890ff',
    textDecoration: 'underline'
  }
};

export default NotFoundPage;
