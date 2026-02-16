
import React, { useState } from 'react';
import { MATURITY_LEVELS } from '../constants';
import { MaturityLevel } from '../types';

const requirements = [
  { id: 'R1', name: 'Accuracy', article: 'Art. 15', desc: 'Precision of predictions in real-world scenarios.' },
  { id: 'R2', name: 'Transparency', article: 'Art. 13', desc: 'System behavior is understandable by users.' },
  { id: 'R3', name: 'Cybersecurity', article: 'Art. 15', desc: 'Resilience against data poisoning and model theft.' },
  { id: 'R4', name: 'Data Governance', article: 'Art. 10', desc: 'Quality and representativeness of training data.' },
  { id: 'R5', name: 'Human Oversight', article: 'Art. 14', desc: 'Ability for humans to intervene or override.' },
  { id: 'R6', name: 'Explainability', article: 'Art. 13', desc: 'Natural language reasoning for decisions.' },
];

const Checklist: React.FC = () => {
  const [view, setView] = useState<'classification' | 'maturity'>('classification');
  const [isHighRisk, setIsHighRisk] = useState<boolean | null>(null);
  const [scores, setScores] = useState<Record<string, MaturityLevel>>(
    Object.fromEntries(requirements.map(r => [r.id, 'L1']))
  );

  const handleUpdate = (id: string, val: MaturityLevel) => {
    setScores(prev => ({ ...prev, [id]: val }));
  };

  const ClassificationEngine = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-slate-900 text-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Strategic Classification Engine</h2>
        <p className="text-slate-400 mb-8 max-w-2xl text-sm">
          Determine if your AI system qualifies as "High-Risk" under the EU AI Act (Annex I or Annex III criteria).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Q1: Product Safety (Annex I)</h3>
             <p className="text-sm text-slate-300">Is the AI system intended to be used as a safety component of a product, or is the AI system itself a product covered by Union legislation listed in Annex I?</p>
             <div className="flex space-x-3">
               <button onClick={() => setIsHighRisk(true)} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:border-blue-500 transition text-sm font-bold">YES</button>
               <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:border-blue-500 transition text-sm font-bold">NO</button>
             </div>
          </div>
          <div className="space-y-4">
             <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Q2: High-Risk Purpose (Annex III)</h3>
             <p className="text-sm text-slate-300">Does the system's intended purpose fall into categories like Biometrics, Critical Infrastructure, HR/Hiring, or Law Enforcement?</p>
             <div className="flex space-x-3">
               <button onClick={() => setIsHighRisk(true)} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:border-blue-500 transition text-sm font-bold">YES</button>
               <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:border-blue-500 transition text-sm font-bold">NO</button>
             </div>
          </div>
        </div>
      </div>

      {isHighRisk !== null && (
        <div className={`p-6 rounded-xl border-l-8 ${isHighRisk ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'} animate-in slide-in-from-top-4`}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className={`text-lg font-bold ${isHighRisk ? 'text-red-900' : 'text-green-900'}`}>
                {isHighRisk ? 'HRAIS Status Confirmed' : 'Low/Minimal Risk Detected'}
              </h3>
              <p className={`text-sm ${isHighRisk ? 'text-red-700' : 'text-green-700'}`}>
                {isHighRisk 
                  ? 'System must comply with Chapter III requirements (Articles 8-15).' 
                  : 'System is subject to transparency obligations (Article 52) but not full HRAIS ALM.'}
              </p>
            </div>
            {isHighRisk && (
              <button 
                onClick={() => setView('maturity')}
                className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition"
              >
                Start Maturity Audit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex space-x-4 mb-8">
        <button 
          onClick={() => setView('classification')} 
          className={`pb-2 px-1 text-sm font-bold transition-all ${view === 'classification' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          1. Classification Engine
        </button>
        <button 
          disabled={!isHighRisk}
          onClick={() => setView('maturity')} 
          className={`pb-2 px-1 text-sm font-bold transition-all ${!isHighRisk ? 'opacity-30 cursor-not-allowed' : ''} ${view === 'maturity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          2. Maturity Assessment
        </button>
      </div>

      {view === 'classification' ? (
        <ClassificationEngine />
      ) : (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h2 className="text-blue-800 font-bold mb-1">Maturity Assessment Tool</h2>
            <p className="text-blue-700 text-sm">
              Select the current maturity level for each requirement based on the Sandbox technical guide. 
              Your answers will automatically generate an <strong>Adaptation Plan</strong>.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Requirement</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Maturity Level</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {requirements.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 flex items-center space-x-2">
                        <span>{req.name}</span>
                        <span className="text-[10px] font-mono text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">{req.article}</span>
                      </div>
                      <div className="text-xs text-slate-500">{req.desc}</div>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={scores[req.id]} 
                        onChange={(e) => handleUpdate(req.id, e.target.value as MaturityLevel)}
                        className="w-full bg-slate-50 border border-slate-200 text-sm rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      >
                        {Object.entries(MATURITY_LEVELS).map(([k, v]) => (
                          <option key={k} value={k}>{v}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {parseInt(scores[req.id].slice(1)) >= 5 ? (
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Compliant</span>
                      ) : (
                        <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4">Maturity Adaptation Plan</h3>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="text-sm font-bold text-orange-800 flex items-center space-x-2">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                   <span>Adaptation Stage: Phase 2 (Intermediate)</span>
                </h4>
                <p className="text-xs text-orange-700 mt-1">
                  Cybersecurity and Human Oversight levels are below L5. 
                  Action Required: Document and implement automated incident detection and override triggers. Link these to Article 12 Log Retention schedules.
                </p>
              </div>
              <div className="flex space-x-3">
                 <button className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition shadow-lg">
                   Sync with QMS Status
                 </button>
                 <button className="flex-1 bg-white text-slate-900 border border-slate-300 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition">
                   Export Findings
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checklist;
