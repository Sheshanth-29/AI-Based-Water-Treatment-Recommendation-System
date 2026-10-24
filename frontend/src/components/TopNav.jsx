import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Moon, 
  Sun, 
  Bell, 
  User, 
  Menu, 
  X, 
  Droplets, 
  LayoutDashboard, 
  History, 
  Sparkles, 
  Info, 
  ShieldCheck, 
  LogOut,
  ChevronRight,
  ArrowRightLeft
} from 'lucide-react';
import './TopNav.css';

const TopNav = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('selectedRole') || 'user');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Update role if changed elsewhere
  useEffect(() => {
    const savedRole = localStorage.getItem('selectedRole') || 'user';
    setRole(savedRole);
  }, [location.pathname]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleRole = () => {
    const newRole = role === 'host' ? 'user' : 'host';
    setRole(newRole);
    localStorage.setItem('selectedRole', newRole);
    if (newRole === 'host') {
      navigate('/host-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const navLinks = role === 'host' ? [
    { name: 'Host Portal', path: '/host-dashboard', icon: <ShieldCheck size={20} />, badge: 'Admin' },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Water Analysis', path: '/analysis', icon: <Droplets size={20} /> },
    { name: 'AI Insights', path: '/results', icon: <Sparkles size={20} /> },
    { name: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'About System', path: '/about', icon: <Info size={20} /> },
  ] : [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Water Analysis', path: '/analysis', icon: <Droplets size={20} /> },
    { name: 'AI Insights', path: '/results', icon: <Sparkles size={20} /> },
    { name: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'Host Portal', path: '/host-dashboard', icon: <ShieldCheck size={20} />, badge: 'Switch' },
    { name: 'About System', path: '/about', icon: <Info size={20} /> },
  ];

  return (
    <>
      <header className="topnav glass-card">
        {/* Mobile brand header */}
        <div className="topnav-brand" onClick={() => navigate('/dashboard')}>
          <Droplets className="logo-icon" size={24} />
          <span className="logo-text text-gradient">AquaAI</span>
          <span className="role-mini-badge">{role === 'host' ? 'Host' : 'User'}</span>
        </div>

        <div className="topnav-spacer"></div>

        <div className="topnav-actions">
          {/* Desktop Role Indicator */}
          <button 
            className="role-pill-btn desktop-only" 
            onClick={toggleRole} 
            title="Click to switch between User and Host mode"
          >
            <ArrowRightLeft size={14} />
            <span>Mode: <strong>{role === 'host' ? 'Host Reviewer' : 'Standard User'}</strong></span>
          </button>

          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Dark Mode" title="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button className="icon-btn desktop-only" aria-label="Notifications" title="Notifications">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>

          <div 
            className="profile-btn desktop-only" 
            onClick={() => navigate('/login')} 
            title="Switch Account / Sign in"
          >
            <User size={20} />
          </div>

          {/* Mobile hamburger menu button */}
          <button 
            className="icon-btn mobile-menu-toggle" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            title="Toggle Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-out Drawer */}
      <div 
        className={`mobile-drawer-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      >
        <div 
          className="mobile-drawer glass-card"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-drawer-header">
            <div className="drawer-logo" onClick={() => { setMenuOpen(false); navigate('/dashboard'); }}>
              <Droplets className="logo-icon" size={26} />
              <span className="logo-text text-gradient">AquaAI</span>
            </div>
            <button 
              className="icon-btn close-drawer-btn" 
              onClick={() => setMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mobile-role-card">
            <div className="mobile-role-info">
              <span className="role-label">Active Mode</span>
              <strong>{role === 'host' ? 'Host / Reviewer' : 'Standard User'}</strong>
            </div>
            <button className="mobile-switch-btn" onClick={toggleRole}>
              <ArrowRightLeft size={16} />
              <span>Switch to {role === 'host' ? 'User' : 'Host'}</span>
            </button>
          </div>

          <nav className="mobile-drawer-nav">
            <div className="nav-group-title">Navigation</div>
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <div className="nav-item-left">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {item.badge ? (
                  <span className="nav-item-badge">{item.badge}</span>
                ) : (
                  <ChevronRight size={16} className="nav-item-arrow" />
                )}
              </NavLink>
            ))}
          </nav>

          <div className="mobile-drawer-footer">
            <button 
              className="drawer-action-btn"
              onClick={() => { setMenuOpen(false); navigate('/analysis'); }}
            >
              <Droplets size={18} />
              <span>New Water Analysis</span>
            </button>

            <button 
              className="drawer-logout-btn"
              onClick={() => { setMenuOpen(false); navigate('/login'); }}
            >
              <LogOut size={16} />
              <span>Switch Account / Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
