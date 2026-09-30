import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Users, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedButton from '../components/AnimatedButton';
import GlassCard from '../components/GlassCard';
import './HostLogin.css';

const HostLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/host-dashboard');
  };

  return (
    <div className="auth-page host-login">
      <div className="auth-panel">
        <GlassCard className="auth-card">
          <div className="auth-head">
            <div className="auth-icon host-icon">
              <ShieldAlert size={28} />
            </div>
            <div>
              <h1>Host / Reviewer Login</h1>
              <p>Manage tests, review user histories, and validate water treatment workflows.</p>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Username
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="reviewer01"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </label>
            <AnimatedButton type="submit" className="auth-submit">
              Enter Review Portal
            </AnimatedButton>
          </form>

          <div className="auth-support">
            <div>
              <Users size={18} />
              <span>Access user histories, sample queues, and analysis reviews.</span>
            </div>
            <div>
              <ClipboardList size={18} />
              <span>Coordinate lab testing and validate model recommendations.</span>
            </div>
          </div>

          <div className="auth-switch">
            <p>Want to explore as a normal user?</p>
            <AnimatedButton onClick={() => navigate('/login')} variant="secondary">
              User Login
            </AnimatedButton>
          </div>
        </GlassCard>
      </div>

      <section className="auth-features">
        <GlassCard className="feature-card">
          <h2>Reviewer tools included</h2>
          <ul>
            <li>Monitor pending water quality tests</li>
            <li>Inspect sample history for different users</li>
            <li>Approve recommended treatments and resolve issues</li>
            <li>Review system health and testing performance</li>
          </ul>
        </GlassCard>
      </section>
    </div>
  );
};

export default HostLogin;
