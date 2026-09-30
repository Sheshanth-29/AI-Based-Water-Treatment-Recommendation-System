import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import './App.css';

import LandingPage from './pages/LandingPage';
import UserLogin from './pages/UserLogin';
import Dashboard from './pages/Dashboard';
import HostDashboard from './pages/HostDashboard';
import WaterAnalysis from './pages/WaterAnalysis';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';

const AppLayout = () => {
  const renderWithLayout = (content) => (
    <>
      <Sidebar />
      <main className="main-content">
        <TopNav />
        {content}
      </main>
    </>
  );

  return (
    <>
      <div className="app-background">
        <div className="bubble" style={{ top: '10%', left: '20%', width: '300px', height: '300px' }}></div>
        <div className="bubble" style={{ top: '60%', right: '10%', width: '400px', height: '400px', animationDelay: '-5s' }}></div>
        <div className="bubble" style={{ top: '30%', left: '70%', width: '200px', height: '200px', animationDelay: '-10s' }}></div>
      </div>
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/dashboard" element={renderWithLayout(<Dashboard />)} />
        <Route path="/host-dashboard" element={renderWithLayout(<HostDashboard />)} />
        <Route path="/analysis" element={renderWithLayout(<WaterAnalysis />)} />
        <Route path="/results" element={renderWithLayout(<ResultsPage />)} />
        <Route path="/history" element={renderWithLayout(<HistoryPage />)} />
        <Route path="/about" element={renderWithLayout(<AboutPage />)} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
