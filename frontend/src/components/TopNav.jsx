import React, { useEffect, useState } from 'react';
import { Moon, Sun, Bell, User } from 'lucide-react';
import './TopNav.css';

const TopNav = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="topnav glass-card">
      <div className="topnav-spacer"></div>
      <div className="topnav-actions">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Dark Mode">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <div className="profile-btn">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
