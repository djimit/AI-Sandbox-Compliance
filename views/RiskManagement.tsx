
import React, { useState, useMemo } from 'react';
import { RiskObject } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

const INITIAL_RISKS: RiskObject[] = [
  { risk_id: 'R1', category: 'Fundamental Rights', description: 'Model bias against geriatric demographics in dosage prediction.', probability_score: 2, impact_score: 5, residual_risk: 10 },
  { risk_id: 'R2', category: 'Safety', description: 'Sensor failure leading to erroneous high-confidence prediction.', probability_score: 3, impact_score: 5, residual_risk: 15 },
  { risk_id: 'R3', category: 'Environmental', description: 'Excessive computational resource usage in inference cycles.', probability_score: 1, impact_score: 2, residual_risk: 2 },
  { risk_id: 'R4', category: 'Governance', description: 'Lack of immutable logging for emergency override actions.', probability_score: 4, impact_score: 4, residual_risk: 16 },
];

const RiskManagement: React.FC = () => {
  const [risks, setRisks] = useState<RiskObject[]>(INITIAL_RISKS);
  const [riskAppetite, setRiskAppetite] = useState(12);

  const scatterData = useMemo(() => risks.map(r => ({
    x: r.probability_score,
    y: r.impact_score,
    z: r.residual_risk,
    name: r.risk_id,
    category: r.category
  })), [risks]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Article 9: Risk Management Engine</h2>
          <p className="text-slate-500 text-sm">Iterative identification and mitigation of systemic HRAIS risks.</p>
        </div>
        <div className="flex flex-col items-end">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Risk Appetite Threshold</label>
          <div className="flex items-center space-x-3">
             <input 
               type="range" min="1" max="25" value={riskAppetite} 
               onChange={(e) => setRiskAppetite(parseInt(e.target.value))}
               className="w-32 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
             />
             <span className="text-sm font-black text-slate-700">{riskAppetite}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Risk Heatmap (Prob x Impact)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="Probability" domain={[0, 6]} label={{ value: 'Probability', position: 'insideBottom', offset: -10 }} />
                <YAxis type="number" dataKey="y" name="Impact" domain={[0, 6]} label={{ value: 'Impact', angle: -90, position: 'insideLeft' }} />
                <ZAxis type="number" dataKey="z" range={[100, 1000]} name="Residual Risk" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Risks" data={scatterData} fill="#2563eb">
                  {scatterData.map((entry, index) => (
                    <circle key={`cell-${index}`} cx={0} cy={0} r={0} fill={entry.z > riskAppetite ? '#ef4444' : '#22c55e'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
             <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span>Above Appetite</span>
             </div>
             <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>Controlled</span>
             </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold mb-4">Threat Modeling Matrix</h3>
          <div className="flex-1 space-y-3 overflow-y-auto max-h-[320px] pr-2">
            {risks.map(risk => (
              <div key={risk.risk_id} className={`p-4 rounded-lg border-l-4 ${risk.residual_risk > riskAppetite ? 'bg-red-50 border-red-500' : 'bg-slate-50 border-slate-300'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{risk.category}</span>
                  <span className={`text-xs font-black ${risk.residual_risk > riskAppetite ? 'text-red-600' : 'text-slate-600'}`}>Score: {risk.residual_risk}</span>
                </div>
                <p className="text-sm font-bold text-slate-800 mb-2">{risk.description}</p>
                {risk.residual_risk > riskAppetite && (
                  <div className="flex items-center space-x-2 mt-3">
                     <button className="text-[10px] font-bold bg-white border border-red-200 text-red-600 px-3 py-1 rounded shadow-sm hover:bg-red-100 transition">Link Technical Measure</button>
                     <span className="text-[9px] text-red-400 uppercase font-black animate-pulse">Critical Mitigation Required</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-3 bg-slate-900 text-white rounded-lg font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition">
            Conduct New Threat Modeling Session
          </button>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg border border-slate-800">
         <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
           <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
           <span>Mitigation Workflow (Article 9.4)</span>
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
               <p className="text-[10px] font-bold text-blue-400 uppercase mb-2">Phase 1: Elimination</p>
               <p className="text-xs text-slate-300">Targeting root causes in design & development (e.g., stripping biased features).</p>
               <p className="mt-4 text-[10px] font-bold text-slate-500 uppercase">Status: 2 Measures Active</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
               <p className="text-[10px] font-bold text-orange-400 uppercase mb-2">Phase 2: Mitigation</p>
               <p className="text-xs text-slate-300">Technical measures to reduce residual risk (e.g., confidence score filters).</p>
               <p className="mt-4 text-[10px] font-bold text-slate-500 uppercase">Status: 5 Measures Active</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
               <p className="text-[10px] font-bold text-green-400 uppercase mb-2">Phase 3: Information</p>
               <p className="text-xs text-slate-300">Transparency and training for deployers (e.g., Annex IV Instructions).</p>
               <p className="mt-4 text-[10px] font-bold text-slate-500 uppercase">Status: 1 Measure Active</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default RiskManagement;
