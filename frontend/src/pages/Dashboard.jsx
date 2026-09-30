import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Droplet, ShieldAlert, ShieldCheck } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import GlassCard from '../components/GlassCard';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const summaryData = [
    { title: 'Total Analyses', value: '1,248', icon: <Activity size={24} />, color: 'var(--color-primary-500)' },
    { title: 'Safe Samples', value: '984', icon: <ShieldCheck size={24} />, color: 'var(--color-success)' },
    { title: 'Unsafe Samples', value: '264', icon: <ShieldAlert size={24} />, color: 'var(--color-danger)' },
    { title: 'Avg Quality Score', value: '86/100', icon: <Droplet size={24} />, color: 'var(--color-cyan-500)' }
  ];

  const qualityOverview = [
    { label: 'Current Water Index', value: '89/100', detail: 'Stable quality, trending upward' },
    { label: 'Alerts Today', value: '3', detail: 'pH and turbidity warnings' },
    { label: 'Recommended Action', value: 'RO + UV', detail: 'Balance filtration and disinfection' }
  ];

  const parameterData = [
    { name: 'pH', current: '7.2', ideal: '6.5 - 8.5', status: 'Normal' },
    { name: 'Turbidity', current: '3.5 NTU', ideal: '< 5 NTU', status: 'Good' },
    { name: 'Hardness', current: '120 mg/L', ideal: '0 - 150 mg/L', status: 'Moderate' },
    { name: 'TDS', current: '300 ppm', ideal: '< 500 ppm', status: 'Normal' },
    { name: 'Chlorine', current: '1.1 mg/L', ideal: '0.2 - 2 mg/L', status: 'Optimal' }
  ];

  const recommendedModules = [
    { title: 'Pre-filtration', value: '35%', description: 'Removes sediments and large particles.' },
    { title: 'Softening', value: '25%', description: 'Reduces scale-forming hardness.' },
    { title: 'Reverse Osmosis', value: '20%', description: 'High-purity water output.' },
    { title: 'UV Sterilization', value: '20%', description: 'Disinfection for microbial control.' }
  ];

  const recentSamples = [
    { id: '#A1024', parameter: 'pH', value: '7.2', score: '90', status: 'Safe' },
    { id: '#A1025', parameter: 'Turbidity', value: '5.8', score: '74', status: 'Warning' },
    { id: '#A1026', parameter: 'Hardness', value: '142', score: '82', status: 'Moderate' },
    { id: '#A1027', parameter: 'TDS', value: '320', score: '88', status: 'Safe' },
    { id: '#A1028', parameter: 'Chlorine', value: '0.7', score: '93', status: 'Safe' }
  ];

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Quality Score',
        data: [78, 82, 80, 85, 84, 88],
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.18)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
      }
    ]
  };

  const barChartData = {
    labels: ['pH', 'Turbidity', 'Hardness', 'TDS'],
    datasets: [
      {
        label: 'Average Values',
        data: [7.2, 3.5, 120, 300],
        backgroundColor: '#38bdf8',
        borderRadius: 6,
      }
    ]
  };

  const doughnutData = {
    labels: ['Filtration', 'Softening', 'RO', 'UV'],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: ['#0ea5e9', '#06b6d4', '#3b82f6', '#7dd3fc'],
        borderWidth: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: 'var(--text-muted)' }
      }
    },
    scales: {
      x: { grid: { color: 'var(--glass-border)' }, ticks: { color: 'var(--text-muted)' } },
      y: { grid: { color: 'var(--glass-border)' }, ticks: { color: 'var(--text-muted)' } }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: 'var(--text-muted)' } }
    }
  };

  return (
    <div className="dashboard page-transition">
      <header className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Detailed water quality metrics, current analysis, and treatment modules.</p>
        </div>
      </header>

      <div className="summary-cards">
        {summaryData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard hover className="summary-card">
              <div className="summary-icon" style={{ color: item.color, background: `${item.color}20` }}>
                {item.icon}
              </div>
              <div className="summary-info">
                <h3>{item.value}</h3>
                <p>{item.title}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <GlassCard className="module-card module-overview">
            <div className="module-header">
              <div>
                <h3>Water Quality Overview</h3>
                <p>Current system performance and recommended next steps.</p>
              </div>
              <span className="module-status">Stable</span>
            </div>

            <div className="overview-grid">
              {qualityOverview.map((item, index) => (
                <div className="overview-stat" key={index}>
                  <p>{item.label}</p>
                  <strong>{item.value}</strong>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>

            <div className="data-sheet-summary">
              <div>
                <p className="detail-label">Quality score</p>
                <h2>89 / 100</h2>
                <div className="progress-bar">
                  <div style={{ width: '89%' }}></div>
                </div>
              </div>
              <div>
                <p className="detail-label">Latest insight</p>
                <p>pH remains within range, but turbidity requires monitoring after seasonal runoff.</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <GlassCard className="module-card module-table">
            <div className="module-header">
              <div>
                <h3>Key Parameter Data Sheet</h3>
                <p>Detailed values, expected ranges, and status for each measured metric.</p>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="parameter-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Current</th>
                    <th>Ideal Range</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {parameterData.map((row) => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td>{row.current}</td>
                      <td>{row.ideal}</td>
                      <td><span className={`status-pill status-${row.status.toLowerCase()}`}>{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <GlassCard className="module-card">
            <div className="module-header">
              <div>
                <h3>Treatment Modules</h3>
                <p>Action modules that are currently recommended for the system.</p>
              </div>
            </div>

            <div className="module-list">
              {recommendedModules.map((item) => (
                <div className="module-item" key={item.title}>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <GlassCard className="module-card">
            <div className="module-header">
              <div>
                <h3>Recent Sample Insights</h3>
                <p>Latest analyzed samples with score and pass/fail status.</p>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="recent-table">
                <thead>
                  <tr>
                    <th>Sample</th>
                    <th>Metric</th>
                    <th>Value</th>
                    <th>Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSamples.map((sample) => (
                    <tr key={sample.id}>
                      <td>{sample.id}</td>
                      <td>{sample.parameter}</td>
                      <td>{sample.value}</td>
                      <td>{sample.score}</td>
                      <td><span className={`status-pill status-${sample.status.toLowerCase()}`}>{sample.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="charts-grid">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55 }}>
          <GlassCard className="chart-card large">
            <h3>Water Quality Trends</h3>
            <div className="chart-container">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.65 }}>
          <GlassCard className="chart-card">
            <h3>Parameter Averages</h3>
            <div className="chart-container">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.75 }}>
          <GlassCard className="chart-card">
            <h3>Treatment Distribution</h3>
            <div className="chart-container">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
