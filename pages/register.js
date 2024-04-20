// pages/register.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import RegistrationForm from '../components/RegistrationForm';

const Register = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistrationSuccess = () => {
    router.push('/login'); // Redirect to login page after successful registration
  };

  const handleRegistrationFailure = (error) => {
    setErrorMessage(error.message || 'Registration failed');
  };

  return (
    <div>
      <h1>Register</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <RegistrationForm onSuccess={handleRegistrationSuccess} onFailure={handleRegistrationFailure} />
    </div>
  );
};

export default Register;
