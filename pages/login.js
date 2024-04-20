// pages/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSuccess = () => {
    router.push('/dashboard'); // Redirect to dashboard after successful login
  };

  const handleLoginFailure = (error) => {
    setErrorMessage(error.message || 'Login failed');
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <LoginForm onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
    </div>
  );
};

export default Login;
