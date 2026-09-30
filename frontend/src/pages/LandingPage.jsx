import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedButton from '../components/AnimatedButton';
import GlassCard from '../components/GlassCard';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <Activity size={32} className="feature-icon" />, title: 'Real-time Analysis', desc: 'Instantly evaluate water quality parameters.' },
    { icon: <Cpu size={32} className="feature-icon" />, title: 'AI-Powered', desc: 'Advanced Random Forest model for accurate predictions.' },
    { icon: <ShieldCheck size={32} className="feature-icon" />, title: 'Safe Recommendations', desc: 'Trustworthy treatment steps to ensure safety.' }
  ];

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-logo">
          <Droplets className="logo-icon" size={32} />
          <span className="logo-text text-gradient">AquaAI</span>
        </div>
      </header>
      
      <main className="hero-section">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="badge">Next-Gen Water Treatment</div>
          <h1 className="hero-title">
            AI-Powered Water <br />
            <span className="text-gradient">Treatment Recommendation</span> System
          </h1>
          <p className="hero-subtitle">
            Intelligent recommendations using advanced water quality parameters. Ensure safe, clean, and sustainable water treatment with state-of-the-art AI.
          </p>
          <AnimatedButton onClick={() => navigate('/login')} className="hero-cta">
            <Droplets size={20} /> Start Exploring
          </AnimatedButton>
        </motion.div>
        
        <motion.div 
          className="hero-illustration"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="orb-container">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
            <div className="glass-mockup">
              <div className="mockup-header">
                <div className="dots"><span></span><span></span><span></span></div>
                <div className="mockup-title">AquaAI Analysis</div>
              </div>
              <div className="mockup-body">
                <div className="mockup-line w-full"></div>
                <div className="mockup-line w-3/4"></div>
                <div className="mockup-line w-1/2"></div>
                <div className="mockup-chart"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <section className="features-section">
        {features.map((feature, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
          >
            <GlassCard hover className="feature-card">
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </section>
      
      <footer className="landing-footer">
        <p>&copy; 2026 Intelligent Water Treatment Recommendation System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
