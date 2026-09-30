import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, ShieldAlert, Compass, ShieldCheck } from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';
import GlassCard from '../components/GlassCard';
import './UserLogin.css';

const UserLogin = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.setItem('selectedRole', role);
  }, [role]);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('selectedRole', role);
    if (role === 'host') {
      navigate('/host-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-page unified-login">
      <div className="auth-grid">
        <div className="auth-side">
          <div className="auth-intro">
            <span className="tagline">Role selection</span>
            <h1>Choose a module</h1>
            <p>Select one of the two modules below, then sign in using the same screen.</p>
          </div>

          <div className="role-cards">
            <GlassCard
              className={`role-card ${role === 'user' ? 'selected' : ''}`}
              onClick={() => setRole('user')}
            >
              <div className="role-card-top">
                <div className="role-card-icon"><Compass size={24} /></div>
                <span className="role-tag">User</span>
              </div>
              <h2>User Explorer</h2>
              <p>Explore water analytics, AI recommendations, and sample history.</p>
            </GlassCard>

            <GlassCard
              className={`role-card ${role === 'host' ? 'selected' : ''}`}
              onClick={() => setRole('host')}
            >
              <div className="role-card-top">
                <div className="role-card-icon"><ShieldAlert size={24} /></div>
                <span className="role-tag">Host</span>
              </div>
              <h2>Host / Reviewer</h2>
              <p>Manage tests, review users, and validate treatment workflows.</p>
            </GlassCard>
          </div>
        </div>

        <GlassCard className="auth-panel">
          <div className="login-header">
            <div>
              <h2>{role === 'host' ? 'Host / Reviewer Login' : 'User Login'}</h2>
              <p>Sign in to continue to the correct dashboard.</p>
            </div>
            <span className="login-badge">{role === 'host' ? 'Reviewer' : 'User'}</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              {role === 'host' ? 'Username' : 'Email address'}
              <input
                type={role === 'host' ? 'text' : 'email'}
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={role === 'host' ? 'reviewer01' : 'you@example.com'}
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
              {role === 'host' ? 'Sign in as Host' : 'Sign in as User'}
            </AnimatedButton>
          </form>

          <div className="auth-support unified-support">
            <div className="support-row">
              <span className="support-icon"><ShieldCheck size={18} /></span>
              <div>
                <strong>Role-specific access</strong>
                <p>The right dashboard opens automatically after login.</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default UserLogin;
