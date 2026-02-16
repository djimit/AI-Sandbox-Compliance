
import React, { useState, useEffect } from 'react';

const HMI: React.FC = () => {
  const [simulatorActive, setSimulatorActive] = useState(false);
  const [attentionScore, setAttentionScore] = useState(94);
  const [lastIncident, setLastIncident] = useState<string | null>(null);

  const toggleSimulator = () => {
    setSimulatorActive(!simulatorActive);
    if (!simulatorActive) {
      // Logic for simulator activation
      setTimeout(() => {
        setAttentionScore(prev => Math.max(0, prev - Math.floor(Math.random() * 20)));
        setLastIncident(new Date().toLocaleTimeString());
      }, 5000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-bold">Transparency Lab (Articles 13 & 14)</h2>
            <p className="text-slate-500 text-sm">Ensuring system interpretability and human-in-the-loop vigilance.</p>
         </div>
         <div className="flex space-x-2">
            <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">LIME/SHAP Active</span>
            <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Counterfactuals Enabled</span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg flex items-center space-x-2">
               <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
               <span>Interpretability Dashboard</span>
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase">Case: #INS-GLUC-882</span>
          </div>
          
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h4 className="text-[10px] font-bold text-blue-800 uppercase mb-2 tracking-widest">Natural Language Output (Non-Expert)</h4>
              <p className="text-sm text-slate-700 leading-relaxed font-medium italic">
                "The system has predicted a sharp glucose decline in the next 15 minutes primarily because of the high carbohydrate intake reported at 14:00 combined with the increased physical activity detected via accelerometer."
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Local Feature Importance (Expert)</h4>
              {[
                { label: 'Delta Glucose (5m)', weight: 0.85, status: 'Critical' },
                { label: 'Active Insulin (IOB)', weight: 0.42, status: 'High' },
                { label: 'Heart Rate Variability', weight: 0.15, status: 'Normal' },
              ].map((w, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>{w.label}</span>
                    <span className="text-blue-600">+{Math.round(w.weight * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: `${w.weight * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                 <span className="font-bold text-slate-900">Counterfactual:</span>
                 <p>"The system would have maintained current basal dose if HR was 5bpm lower."</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center space-x-2">
               <svg className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
               <span>Human Oversight Controls</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-bold text-slate-800 text-sm italic">Forced Error Training Mode</p>
                    {simulatorActive && <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>}
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Vigilance Testing Protocol (Art. 14.4)</p>
                </div>
                <button 
                  onClick={toggleSimulator}
                  className={`w-12 h-6 rounded-full relative transition-colors ${simulatorActive ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${simulatorActive ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="p-4 border-2 border-red-500 bg-red-50/50 rounded-xl flex flex-col items-center">
                <p className="text-[10px] font-bold text-red-600 uppercase mb-4 tracking-[0.2em]">Emergency Stop Button</p>
                <button className="w-full bg-red-600 text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-red-200 hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                  <span>STOP SYSTEM</span>
                </button>
              </div>

              <div className="p-4 bg-slate-900 text-white rounded-xl shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                   <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h4 className="text-[10px] font-bold text-blue-400 uppercase mb-3 tracking-widest relative z-10">Automation Bias Guard</h4>
                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Supervisor Vigilance Score</span>
                    <span className={`font-black ${attentionScore > 80 ? 'text-green-400' : 'text-orange-400'}`}>{attentionScore}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Last Simulated Error Corrected</span>
                    <span className="text-slate-200 font-mono text-xs">{lastIncident || 'No data'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm mb-4 uppercase tracking-widest text-slate-400">Manual Oversight Feedback</h3>
            <textarea 
              className="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Record any human supervisor observations or deviations for Article 12 audit trails..."
            ></textarea>
            <button className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition">
              Commit to Immutable Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HMI;
