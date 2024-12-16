import React, { useState } from 'react';
import axios from 'axios';
import '../assets/static/Register.css';

const Register = ({isOpen, onClose}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", { username, password });
      setMessage(response.data.message);
      setError('');
      setUsername('');
      setPassword('');
    } catch (error) {
      setError("Registration failed. Please try again.");
      setMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">x</button>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="succes-message">{message}</p>}
        <div className="input-register">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
            required
          />
        <div className="input-register">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            required
          />
        </div>
        <button onClick={handleRegister} className="modal-login-button">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
