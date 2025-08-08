import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  // Get stored credentials from localStorage
  const storedEmail = localStorage.getItem('signup_email');
  const storedPassword = localStorage.getItem('signup_password');

  if (email === storedEmail && password === storedPassword) {
    // ✅ Navigate immediately
    localStorage.setItem('auth_token', 'dummy_token');
    navigate('/dashboard');

    // ✅ Send placeholder API call (doesn’t affect login flow)
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log('API login response (placeholder):', response.data);
    } catch (error: unknown) {
      console.warn('API login failed (but ignoring since login is local):', error);
    }
  } else {
    setError('Invalid credentials. Please check your email and password.');
  }
};


  return (
    <>
      <header className="navbar">
        <div className="logo">AaraDen</div>
        <nav>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      <div className="container">
        <div className="left-panel">
          <img src="https://dyte.io/favicon.ico" alt="Dyte Logo" style={{ width: "40px", marginBottom: "20px" }} />
          <h1>dyte</h1>
          <ul>
            <li>Integrate in just 15 minutes.</li>
            <li>Theme it according to your brand.</li>
            <li>Plugins to boost in-call engagement.</li>
            <li>Quality reports & 24×7 support.</li>
            <li>Simple pricing – pay as you go.</li>
          </ul>
          <a className="btn" href="#">Get your free 10,000 minutes today!</a>
          <div className="backed-by">
            Backed by,<br />
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Y_Combinator_logo.svg" alt="Y Combinator" />
            <img src="https://surgeahead.com/images/logo.svg" alt="Surge" />
            <img src="https://nexusvp.com/wp-content/uploads/2021/08/logo.svg" alt="Nexus" />
          </div>
        </div>

        <div className="right-panel">
          <div className="login-box">
            <h2>Log in to Dev Portal</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="human@earth.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="It's your secret"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Log In</button>
            </form>
            {error && <p className="error">{error}</p>}
            <div className="footer-links">
              <a href="#">Forgot password?</a>
              <a href="/signup">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
