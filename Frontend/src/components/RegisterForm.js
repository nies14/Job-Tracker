import React, { useState } from 'react';
import { register } from '../services/authService';

const RegisterForm = ({ onRegister, onClose, switchToLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await register(credentials.email, credentials.password);
      localStorage.setItem('token', response.token);
      onRegister(response.user);
      onClose();
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={credentials.confirmPassword}
          onChange={(e) => setCredentials({...credentials, confirmPassword: e.target.value})}
        />
        <button type="submit">Register</button>
      </form>
      <p className="auth-switch">
        Already have an account? <button onClick={switchToLogin}>Login</button>
      </p>
    </div>
  );
};

export default RegisterForm;
