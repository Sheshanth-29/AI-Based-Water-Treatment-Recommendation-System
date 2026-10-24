import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Droplets, History, Sparkles, Info, ShieldCheck } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const [role, setRole] = useState('user');
  const location = useLocation();

  useEffect(() => {
    const savedRole = localStorage.getItem('selectedRole');
    if (savedRole) {
      setRole(savedRole);
    }
  }, [location.pathname]);

  const navItems = role === 'host' ? [
    { name: 'Host Portal', shortName: 'Host', path: '/host-dashboard', icon: <ShieldCheck size={20} /> },
    { name: 'Dashboard', shortName: 'Home', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Water Analysis', shortName: 'Analyze', path: '/analysis', icon: <Droplets size={20} /> },
    { name: 'AI Insights', shortName: 'Insights', path: '/results', icon: <Sparkles size={20} /> },
    { name: 'History', shortName: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'About', shortName: 'About', path: '/about', icon: <Info size={20} /> },
  ] : [
    { name: 'Dashboard', shortName: 'Home', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Water Analysis', shortName: 'Analyze', path: '/analysis', icon: <Droplets size={20} /> },
    { name: 'AI Insights', shortName: 'Insights', path: '/results', icon: <Sparkles size={20} /> },
    { name: 'History', shortName: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'About', shortName: 'About', path: '/about', icon: <Info size={20} /> },
  ];

  return (
    <aside className="sidebar glass-card" aria-label="Main Navigation">
      <div className="sidebar-logo">
        <Droplets className="logo-icon" size={28} />
        <span className="logo-text text-gradient">AquaAI</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            title={item.name}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
            <span className="nav-short-text">{item.shortName}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
