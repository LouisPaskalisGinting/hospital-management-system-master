import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/static/Login.css'; 
import img from '../assets/img/logoklinik.png';
import Register from './Register';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Invalid credentials or server error. Please try again.');
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={img} alt="Logo" />
      </div>
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            className="login-input"
            required
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="login-input"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleLogin} className="login-button">Sign in</button>
        <p className="register-link">
          Don't have an account? <button onClick={toggleModal} className="register-button">Sign Up</button>
        </p>
      </div>

      <Register isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default Login;
