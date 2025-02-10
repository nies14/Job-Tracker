import React, { useState } from 'react';
import { login } from '../services/authService';

const LoginForm = ({ onLogin, onClose, switchToRegister }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials.email, credentials.password);
      localStorage.setItem('token', response.token);
      onLogin(response.user);
      onClose();
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <p className="auth-switch">
        Don't have an account? <button onClick={switchToRegister}>Register</button>
      </p>
    </div>
  );
};

export default LoginForm;
