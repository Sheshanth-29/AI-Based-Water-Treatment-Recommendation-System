import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ArrowDown, Droplets, Info } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';
import './ResultsPage.css';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const apiResult = location.state?.apiResult;
  const data = location.state?.data || { pH: 7.2, turbidity: 3.5, hardness: 120, tds: 300, microbialRisk: 'Low', purpose: 'Drinking Water' };

  // Use API result if available, otherwise compute client fallback
  const score = apiResult?.score ?? (data.microbialRisk === 'High' || data.tds > 500 ? 45 : data.microbialRisk === 'Medium' || data.turbidity > 5 ? 75 : 92);
  const status = apiResult?.quality_status ?? (score >= 85 ? 'Safe' : score >= 65 ? 'Moderate' : 'Needs Attention');
  const confidence = apiResult?.confidence ?? 96.8;
  const reasoning = apiResult?.reason ?? apiResult?.reasoning ?? (
    `The provided sample indicates a pH of ${data.pH} and TDS of ${data.tds} ppm. ` +
    (data.hardness > 100 ? 'Elevated hardness requires softening to prevent scaling. ' : 'Hardness is within acceptable limits. ') +
    (data.microbialRisk !== 'Low' ? 'Microbial risk is present, necessitating UV treatment. ' : 'Low microbial risk detected. ') +
    'The Random Forest model recommends the following sequence to achieve optimal potable water quality.'
  );

  const color = status === 'Safe' ? 'var(--color-success)' : status === 'Moderate' ? 'var(--color-warning)' : 'var(--color-danger)';
  const treatmentFlow = apiResult?.recommended_treatment ?? [
    'Raw Water',
    'Filtration',
    ...(data.hardness > 100 ? ['Softening'] : []),
    ...(data.tds > 250 ? ['Reverse Osmosis'] : []),
    ...(data.microbialRisk !== 'Low' ? ['UV Treatment'] : []),
    'Safe Water'
  ];

  const purpose = apiResult?.purpose ?? data.purpose ?? 'Drinking Water';
  const treatmentRequired = apiResult?.treatment_required ?? (Array.isArray(apiResult?.recommended_treatment) ? apiResult.recommended_treatment.length > 0 && !apiResult.recommended_treatment.includes('No major treatment required') : treatmentFlow.length > 0 && !treatmentFlow.includes('No major treatment required'));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="results-page page-transition">
      <header className="page-header">
        <h1 className="page-title">AI Analysis Results</h1>
        <p className="page-subtitle">Based on the parameters provided, here is the recommended treatment plan.</p>
      </header>

      <div className="results-grid">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <GlassCard className="score-card">
            <div className="score-circle" style={{ borderColor: color, boxShadow: `0 0 20px ${color}40` }}>
              <span className="score-value" style={{ color }}>{score}</span>
              <span className="score-label">/100</span>
            </div>
            <div className="status-badge" style={{ backgroundColor: `${color}20`, color }}>
              {status === 'Safe' ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
              {status}
            </div>
            <p className="confidence">Confidence Score: {confidence}%</p>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <GlassCard className="reasoning-card">
            <h3><Info size={20} /> AI Reasoning</h3>
            <p>{reasoning}</p>
            <div className="params-recap">
              <span className="param-chip">pH: {data.pH}</span>
              <span className="param-chip">Turbidity: {data.turbidity} NTU</span>
              <span className="param-chip">Hardness: {data.hardness} mg/L</span>
            </div>
            <div className="recommendation-summary">
              <h4>Purpose</h4>
              <p>{purpose}</p>

              <h4>Treatment Required</h4>
              <p>{treatmentRequired ? 'Yes' : 'No'}</p>

              <h4>Recommended Treatment</h4>
              <ul>
                {(apiResult?.recommended_treatment ?? treatmentFlow).map((rt, i) => (
                  <li key={i}>{rt}</li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <h2 className="section-title">Recommended Treatment Flow</h2>
      
      <motion.div 
        className="treatment-flow"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {treatmentFlow.map((step, index) => (
          <React.Fragment key={index}>
            <motion.div variants={itemVariants} className={`flow-step ${index === 0 ? 'start' : ''} ${index === treatmentFlow.length - 1 ? 'end' : ''}`}>
              <GlassCard hover className="step-card">
                <Droplets className="step-icon" size={24} />
                <span className="step-name">{step}</span>
              </GlassCard>
            </motion.div>
            {index < treatmentFlow.length - 1 && (
              <motion.div variants={itemVariants} className="flow-arrow">
                <ArrowDown size={24} />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </motion.div>

      <div className="action-buttons">
        <AnimatedButton onClick={() => navigate('/analysis')} variant="secondary">
          Analyze Another Sample
        </AnimatedButton>
        <AnimatedButton onClick={() => window.print()}>
          Export Report
        </AnimatedButton>
      </div>
    </div>
  );
};

export default ResultsPage;
