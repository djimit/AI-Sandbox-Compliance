
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Icons } from './constants';
import Dashboard from './views/Dashboard';
import Checklist from './views/Checklist';
import Governance from './views/Governance';
import RiskManagement from './views/RiskManagement';
import DataGovernance from './views/DataGovernance';
import TechnicalDocs from './views/TechnicalDocs';
import Monitoring from './views/Monitoring';
import HMI from './views/HMI';
import Cybersecurity from './views/Cybersecurity';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: Icons.Dashboard },
    { path: '/checklist', label: 'Classification & Maturity', icon: Icons.Checklist },
    { path: '/governance', label: 'Accountability & QMS', icon: Icons.Governance },
    { path: '/risk', label: 'Risk Management', icon: Icons.Alert },
    { path: '/data', label: 'Data Governance', icon: Icons.Data },
    { path: '/docs', label: 'Technical Docs (Annex IV)', icon: Icons.Model },
    { path: '/security', label: 'Cybersecurity Matrix', icon: Icons.Security },
    { path: '/monitoring', label: 'Post-Market & Incident', icon: Icons.Monitoring },
    { path: '/hmi', label: 'Transparency & Oversight', icon: Icons.Alert },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto z-10 border-r border-slate-800">
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white tracking-tight">EuRAI <span className="text-blue-500">Comply</span></h1>
        <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-[0.2em]">Enterprise ALM Edition</p>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 ml-64 sticky top-0 z-20 backdrop-blur-md bg-white/80">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active System:</span>
           <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
             <option>Smart Insulin Pump AI (Annex I)</option>
             <option>HR Screening Tool (Annex III)</option>
             <option>Biometric ID Pilot</option>
           </select>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3 px-4 py-1.5 bg-green-50 rounded-full border border-green-100">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-green-700">Audit Ready: 74% Compliance</span>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition shadow-sm">
          Export Annex IV
        </button>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex bg-slate-50">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="ml-64 p-8 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/checklist" element={<Checklist />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/risk" element={<RiskManagement />} />
              <Route path="/data" element={<DataGovernance />} />
              <Route path="/docs" element={<TechnicalDocs />} />
              <Route path="/security" element={<Cybersecurity />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/hmi" element={<HMI />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
