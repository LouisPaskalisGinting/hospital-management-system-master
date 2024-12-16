import React, { useState } from "react";
import axios from "axios";
import "../assets/static/Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserRepository } from "../data/repository/UserRepository";
import { firebaseAuth } from "..";

const Register = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userRepository = new UserRepository();

  const handleRegister = async () => {
    try {
      const user = await userRepository.getUserByEmail(email);
      console.log(user);
      if (user) {
        await createUserWithEmailAndPassword(firebaseAuth, email, password)
          .then(async (userCredential) => {
            const firebaseUser = userCredential.user;
            await userRepository.addUser({
              id: firebaseUser.uid,
              name: user.name,
              email: user.email,
              role: user.role,
              imageUrl: null,
            });
            await userRepository.deleteUser(user.id);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setError(errorMessage);
            // ..
          });
      } else {
        setError("User is not registered yet. Please contact the admin");
      }
    } catch (error) {
      setError("Invalid credentials or server error. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">
          x
        </button>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="succes-message">{message}</p>}
        <div className="input-register">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button onClick={handleRegister} className="modal-login-button">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;