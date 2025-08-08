import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Save to localStorage temporarily
      localStorage.setItem('signup_email', email);
      localStorage.setItem('signup_password', password);

      // Still send to API (temporary design)
      const response = await axios.post('http://localhost:5000/auth/register', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.message === 'User registered successfully') {
        alert('Signup successful! Redirecting to login.');
        navigate('/login');
      } else {
        setError(response.data.message || 'Signup failed');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Signup error');
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
