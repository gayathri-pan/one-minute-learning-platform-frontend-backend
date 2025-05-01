import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const [user, setUser] = useState(null); // State to hold logged-in user

  return (
    <div>
      <LoginForm setUser={setUser} />
    </div>
  );
};

export default LoginPage;
