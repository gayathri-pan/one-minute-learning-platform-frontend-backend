import React from 'react';
import SignupForm from '../components/SignupForm';  // Import SignupForm component

const SignupPage = () => {
  return (
    <div style={styles.page}>
      <h1>Signup Page</h1>
      <SignupForm />  {/* Render the SignupForm component here */}
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '0 20px',
  },
};

export default SignupPage;
