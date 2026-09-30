import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, ClipboardList, ShieldCheck, FileSearch, Clock } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import './HostDashboard.css';

const HostDashboard = () => {
  const stats = [
    { label: 'Pending Tests', value: '18', icon: <Activity size={20} />, color: 'var(--color-primary-500)' },
    { label: 'Reviewed Users', value: '56', icon: <Users size={20} />, color: 'var(--color-success)' },
    { label: 'Open Issues', value: '7', icon: <ShieldCheck size={20} />, color: 'var(--color-warning)' },
    { label: 'Avg Review Time', value: '4h 20m', icon: <Clock size={20} />, color: 'var(--color-cyan-500)' }
  ];

  const reviewQueue = [
    { id: 'R-1001', user: 'Plant Manager A', task: 'pH anomaly review', status: 'Pending' },
    { id: 'R-1002', user: 'Field Engineer B', task: 'TDS validation', status: 'In Review' },
    { id: 'R-1003', user: 'Analyst C', task: 'UV treatment approval', status: 'Completed' },
    { id: 'R-1004', user: 'Operator D', task: 'RO calibration check', status: 'Pending' }
  ];

  const userHistory = [
    { user: 'WellSite Alpha', activity: '12 analyses', lastActive: 'Today', status: 'Healthy' },
    { user: 'River Intake B', activity: '8 analyses', lastActive: 'Yesterday', status: 'Monitor' },
    { user: 'Plant C', activity: '20 analyses', lastActive: 'Today', status: 'Healthy' },
  ];

  return (
    <div className="host-dashboard page-transition">
      <header className="page-header host-header">
        <div>
          <h1 className="page-title">Host / Reviewer Portal</h1>
          <p className="page-subtitle">Manage test workflows, review user histories, and validate water treatment recommendations.</p>
        </div>
      </header>

      <div className="host-summary-cards">
        {stats.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12 }}
          >
            <GlassCard hover className="host-summary-card">
              <div className="summary-left">
                <div className="summary-icon" style={{ color: item.color, background: `${item.color}20` }}>
                  {item.icon}
                </div>
                <div>
                  <p>{item.label}</p>
                  <h3>{item.value}</h3>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="host-grid">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <GlassCard className="host-card large">
            <div className="host-card-head">
              <div>
                <h2>Latest Review Queue</h2>
                <p>Action items for current water sample reviews.</p>
              </div>
              <span className="tag tag-primary">Active</span>
            </div>
            <div className="host-table-wrapper">
              <table className="host-table">
                <thead>
                  <tr>
                    <th>Review ID</th>
                    <th>User</th>
                    <th>Task</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewQueue.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.user}</td>
                      <td>{item.task}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <GlassCard className="host-card">
            <div className="host-card-head">
              <div>
                <h2>User History Snapshot</h2>
                <p>Recent user activity and sample evaluation status.</p>
              </div>
              <span className="tag tag-secondary">Overview</span>
            </div>
            <div className="host-table-wrapper">
              <table className="host-table compact">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Activity</th>
                    <th>Last Active</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userHistory.map((item) => (
                    <tr key={item.user}>
                      <td>{item.user}</td>
                      <td>{item.activity}</td>
                      <td>{item.lastActive}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="host-actions-grid">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <GlassCard className="host-card small-card">
            <div className="host-card-head">
              <div>
                <h3>Testing & Validation</h3>
                <p>Run targeted checks across water quality modules.</p>
              </div>
              <FileSearch size={20} />
            </div>
            <ul>
              <li>Confirm treatment recommendations</li>
              <li>Validate sample values against regulatory thresholds</li>
              <li>Mark test runs as complete</li>
            </ul>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <GlassCard className="host-card small-card">
            <div className="host-card-head">
              <div>
                <h3>Reviewer Notes</h3>
                <p>Track important findings from recent analysis cycles.</p>
              </div>
              <ClipboardList size={20} />
            </div>
            <ul>
              <li>Target pH drift in River Intake B</li>
              <li>Assess seasonal turbidity decline</li>
              <li>Verify UV dosage recommendations</li>
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default HostDashboard;
