import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; 


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password });
      if (response.data) {
        alert('Login Successful');
        window.location.href = '/';
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Error logging in');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
