import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Target, Users } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import './AboutPage.css';

const AboutPage = () => {
  const techStack = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Flask', color: '#FFFFFF' },
    { name: 'Python', color: '#3776AB' },
    { name: 'Random Forest', color: '#10B981' },
    { name: 'MySQL', color: '#4479A1' },
    { name: 'Chart.js', color: '#FF6384' }
  ];

  const team = [
    { name: 'Alex Johnson', role: 'Lead AI Engineer', initial: 'A' },
    { name: 'Sam Smith', role: 'Frontend Developer', initial: 'S' },
    { name: 'Jordan Lee', role: 'Data Scientist', initial: 'J' },
    { name: 'Casey Davis', role: 'Backend Developer', initial: 'C' }
  ];

  return (
    <div className="about-page page-transition">
      <header className="page-header">
        <h1 className="page-title">About the Project</h1>
        <p className="page-subtitle">Learn more about the Intelligent Water Treatment Recommendation System.</p>
      </header>

      <div className="about-grid">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="about-card">
            <div className="about-icon"><Target size={32} /></div>
            <h2>Objectives</h2>
            <p>
              Our primary goal is to provide real-time, accurate water treatment recommendations 
              by analyzing key quality parameters. By leveraging machine learning, we aim to ensure 
              access to safe and clean water while optimizing the treatment processes.
            </p>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <GlassCard className="about-card">
            <div className="about-icon"><Layers size={32} /></div>
            <h2>Technology Stack</h2>
            <div className="tech-stack-container">
              {techStack.map((tech, index) => (
                <span key={index} className="tech-badge" style={{ borderLeftColor: tech.color }}>
                  {tech.name}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="section-title"><Users size={24} className="inline-icon" /> Team Members</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <GlassCard hover key={index} className="team-card">
              <div className="avatar">{member.initial}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
