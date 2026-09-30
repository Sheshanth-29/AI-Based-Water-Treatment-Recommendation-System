import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Droplets, History, Sparkles, Info, ShieldCheck } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const [role, setRole] = useState('user');

  useEffect(() => {
    const savedRole = localStorage.getItem('selectedRole');
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const navItems = role === 'host' ? [
    { name: 'Host Dashboard', path: '/host-dashboard', icon: <ShieldCheck size={20} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Water Analysis', path: '/analysis', icon: <Droplets size={20} /> },
    { name: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'AI Insights', path: '/results', icon: <Sparkles size={20} /> },
    { name: 'About', path: '/about', icon: <Info size={20} /> },
  ] : [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Water Analysis', path: '/analysis', icon: <Droplets size={20} /> },
    { name: 'AI Insights', path: '/results', icon: <Sparkles size={20} /> },
    { name: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'About', path: '/about', icon: <Info size={20} /> },
  ];

  return (
    <div className="sidebar glass-card">
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
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
