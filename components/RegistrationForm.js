import { useState } from 'react';

const RegistrationForm = ({ onSuccess, onFailure }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        onSuccess(); // Call onSuccess callback provided by parent component
      } else {
        const errorData = await response.json();
        onFailure(errorData); // Call onFailure callback provided by parent component with error data
      }
    } catch (error) {
      console.error('Error registering user:', error);
      onFailure({ message: 'An unexpected error occurred' }); // Call onFailure with a generic error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>Register</button>
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default RegistrationForm;
