import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';
import './HistoryPage.css';

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for history table
  const historyData = [
    { id: 'ANL-001', date: '2026-08-05', source: 'Plant A - Intake', score: 92, status: 'Safe' },
    { id: 'ANL-002', date: '2026-08-04', source: 'Plant B - Intake', score: 75, status: 'Moderate' },
    { id: 'ANL-003', date: '2026-08-03', source: 'River Source C', score: 45, status: 'Needs Attention' },
    { id: 'ANL-004', date: '2026-08-02', source: 'Plant A - Treated', score: 98, status: 'Safe' },
    { id: 'ANL-005', date: '2026-08-01', source: 'Well 4', score: 85, status: 'Safe' },
  ];

  const filteredData = historyData.filter(item => 
    item.source.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Safe': return 'var(--color-success)';
      case 'Moderate': return 'var(--color-warning)';
      case 'Needs Attention': return 'var(--color-danger)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="history-page page-transition">
      <header className="page-header">
        <h1 className="page-title">Analysis History</h1>
        <p className="page-subtitle">Review past water quality analyses and recommended treatments.</p>
      </header>

      <GlassCard className="table-card">
        <div className="table-toolbar">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by ID or Source..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <AnimatedButton variant="secondary" className="icon-btn-text">
              <Filter size={18} /> Filter
            </AnimatedButton>
            <AnimatedButton variant="secondary" className="icon-btn-text">
              <Download size={18} /> Export
            </AnimatedButton>
          </div>
        </div>

        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Analysis ID</th>
                <th>Date</th>
                <th>Water Source</th>
                <th>Quality Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <motion.tr 
                  key={row.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="fw-600">{row.id}</td>
                  <td>{row.date}</td>
                  <td>{row.source}</td>
                  <td>
                    <div className="score-bar-container">
                      <div 
                        className="score-bar" 
                        style={{ 
                          width: `${row.score}%`, 
                          backgroundColor: getStatusColor(row.status) 
                        }}
                      ></div>
                      <span>{row.score}/100</span>
                    </div>
                  </td>
                  <td>
                    <span 
                      className="status-chip"
                      style={{ 
                        color: getStatusColor(row.status),
                        backgroundColor: `${getStatusColor(row.status)}20`
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button className="view-btn">View Details</button>
                  </td>
                </motion.tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="6" className="no-data">No records found matching "{searchTerm}"</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default HistoryPage;
