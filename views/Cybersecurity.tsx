
import React, { useState, useMemo } from 'react';
import { SecurityAsset, SecurityActor, PermissionLevel } from '../types';

const INITIAL_ASSETS: SecurityAsset[] = [
  { id: 'a1', name: 'Model Weights (V2.1)', category: 'Model', riskLevel: 'Critical' },
  { id: 'a2', name: 'Training Datasets', category: 'Data', riskLevel: 'High' },
  { id: 'a3', name: 'Validation API Keys', category: 'Secret', riskLevel: 'Critical' },
  { id: 'a4', name: 'Raw Audit Logs', category: 'Infrastructure', riskLevel: 'Medium' },
  { id: 'a5', name: 'Model Architecture Source', category: 'Model', riskLevel: 'High' },
];

const INITIAL_ACTORS: SecurityActor[] = [
  { id: 'u1', name: 'Technical Architect', role: 'Engineering' },
  { id: 'u2', name: 'QA Lead', role: 'Testing' },
  { id: 'u3', name: 'Legal Officer', role: 'Compliance' },
  { id: 'u4', name: 'Data Scientist', role: 'Science' },
  { id: 'u5', name: 'External Auditor', role: 'Audit' },
];

const INITIAL_MATRIX: Record<string, Record<string, PermissionLevel>> = {
  'a1': { 'u1': 'Admin', 'u2': 'Read', 'u3': 'Denied', 'u4': 'Write', 'u5': 'Read' },
  'a2': { 'u1': 'Write', 'u2': 'Read', 'u3': 'Read', 'u4': 'Admin', 'u5': 'Read' },
  'a3': { 'u1': 'Admin', 'u2': 'Denied', 'u3': 'Denied', 'u4': 'Denied', 'u5': 'Denied' },
  'a4': { 'u1': 'Read', 'u2': 'Read', 'u3': 'Write', 'u4': 'Read', 'u5': 'Read' },
  'a5': { 'u1': 'Admin', 'u2': 'Read', 'u3': 'Denied', 'u4': 'Write', 'u5': 'Read' },
};

const PERMISSION_ORDER: PermissionLevel[] = ['Denied', 'Read', 'Write', 'Admin'];

const PERMISSION_COLORS: Record<PermissionLevel, string> = {
  'Admin': 'bg-red-50 text-red-700 border-red-200',
  'Write': 'bg-orange-50 text-orange-700 border-orange-200',
  'Read': 'bg-blue-50 text-blue-700 border-blue-200',
  'Denied': 'bg-slate-50 text-slate-400 border-slate-200',
};

interface Violation {
  assetId: string;
  actorId: string;
  message: string;
  severity: 'Critical' | 'High' | 'Warning';
  policyId: string;
  recommendation: PermissionLevel;
}

const POLICIES = [
  { id: 'P1', name: 'Secret Isolation', desc: 'Only Engineering roles can have Write/Admin on Secrets.' },
  { id: 'P2', name: 'Audit Integrity', desc: 'Audit/Compliance roles must be Read-only or Denied.' },
  { id: 'P3', name: 'Model Control', desc: 'Non-Engineering roles cannot have Admin on Models.' },
  { id: 'P4', name: 'Admin Scarcity', desc: 'Critical assets should not have more than 2 concurrent Admins.' }
];

const Cybersecurity: React.FC = () => {
  const [assets, setAssets] = useState<SecurityAsset[]>(INITIAL_ASSETS);
  const [actors, setActors] = useState<SecurityActor[]>(INITIAL_ACTORS);
  const [matrix, setMatrix] = useState(INITIAL_MATRIX);
  const [activePersonaId, setActivePersonaId] = useState<string>('u1');
  const [showPolicies, setShowPolicies] = useState(false);
  const [remediating, setRemediating] = useState(false);
  const [lastFixCount, setLastFixCount] = useState(0);
  
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetCategory, setNewAssetCategory] = useState<SecurityAsset['category']>('Data');

  const activePersona = useMemo(() => actors.find(a => a.id === activePersonaId), [actors, activePersonaId]);
  const isElevatedRole = activePersona?.role === 'Engineering' || activePersona?.role === 'Audit';

  const violations = useMemo(() => {
    const list: Violation[] = [];
    
    assets.forEach(asset => {
      let adminCount = 0;
      actors.forEach(actor => {
        const perm = matrix[asset.id]?.[actor.id] || 'Denied';
        if (perm === 'Admin') adminCount++;

        if (asset.category === 'Secret' && (perm === 'Write' || perm === 'Admin') && actor.role !== 'Engineering') {
          list.push({
            assetId: asset.id, actorId: actor.id, policyId: 'P1', severity: 'Critical',
            message: `Unprivileged write access to secret ${asset.name} by ${actor.name}.`,
            recommendation: 'Denied'
          });
        }

        if ((actor.role === 'Audit' || actor.role === 'Compliance') && (perm === 'Write' || perm === 'Admin')) {
          list.push({
            assetId: asset.id, actorId: actor.id, policyId: 'P2', severity: 'High',
            message: `Auditor role ${actor.name} has mutation rights on ${asset.name}.`,
            recommendation: 'Read'
          });
        }

        if (asset.category === 'Model' && perm === 'Admin' && actor.role !== 'Engineering') {
          list.push({
            assetId: asset.id, actorId: actor.id, policyId: 'P3', severity: 'High',
            message: `Non-Engineer admin detected for model weights: ${asset.name}.`,
            recommendation: 'Write'
          });
        }
      });

      if (asset.riskLevel === 'Critical' && adminCount > 1) {
        actors.forEach(actor => {
          if (matrix[asset.id]?.[actor.id] === 'Admin' && actor.id !== 'u1') {
            list.push({
              assetId: asset.id, actorId: actor.id, policyId: 'P4', severity: 'Warning',
              message: `Excessive admin privileges for critical resource ${asset.name}.`,
              recommendation: 'Write'
            });
          }
        });
      }
    });

    return list;
  }, [matrix, assets, actors]);

  const violationMap = useMemo(() => {
    const map: Record<string, Violation[]> = {};
    violations.forEach(v => {
      const key = `${v.assetId}-${v.actorId}`;
      if (!map[key]) map[key] = [];
      map[key].push(v);
    });
    return map;
  }, [violations]);

  const securityScore = useMemo(() => {
    const base = 100;
    const penalty = violations.reduce((acc, v) => acc + (v.severity === 'Critical' ? 10 : v.severity === 'High' ? 5 : 2), 0);
    return Math.max(0, base - penalty);
  }, [violations]);

  const updateAssetRiskLevel = (assetId: string, level: SecurityAsset['riskLevel']) => {
    if (!isElevatedRole) return;
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, riskLevel: level } : a));
  };

  const autoRemediate = async () => {
    if (!isElevatedRole || violations.length === 0) return;
    setRemediating(true);
    const count = violations.length;
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const nextMatrix = { ...matrix };
    violations.forEach(v => {
      if (!nextMatrix[v.assetId]) nextMatrix[v.assetId] = {};
      nextMatrix[v.assetId] = { ...nextMatrix[v.assetId], [v.actorId]: v.recommendation };
    });
    
    setMatrix(nextMatrix);
    setLastFixCount(count);
    setRemediating(false);
    setTimeout(() => setLastFixCount(0), 4000);
  };

  // Define remediate function to fix the "Cannot find name 'remediate'" error
  const remediate = (assetId: string, actorId: string, recommendation: PermissionLevel) => {
    if (!isElevatedRole) return;
    setMatrix(prev => ({
      ...prev,
      [assetId]: {
        ...(prev[assetId] || {}),
        [actorId]: recommendation
      }
    }));
  };

  const togglePermission = (assetId: string, actorId: string) => {
    if (!isElevatedRole) return;
    setMatrix(prev => {
      const current = prev[assetId]?.[actorId] || 'Denied';
      const next = PERMISSION_ORDER[(PERMISSION_ORDER.indexOf(current) + 1) % PERMISSION_ORDER.length];
      return { ...prev, [assetId]: { ...(prev[assetId] || {}), [actorId]: next } };
    });
  };

  const visibleActors = useMemo(() => isElevatedRole ? actors : actors.filter(a => a.id === activePersonaId), [actors, isElevatedRole, activePersonaId]);
  const visibleAssets = useMemo(() => isElevatedRole ? assets : assets.filter(asset => (matrix[asset.id]?.[activePersonaId] || 'Denied') !== 'Denied' || asset.riskLevel !== 'Critical'), [assets, isElevatedRole, matrix, activePersonaId]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h2 className="text-2xl font-bold text-slate-900">Cybersecurity Resilience Matrix</h2>
            <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Art. 15 Compliant</span>
          </div>
          <p className="text-slate-500 text-sm max-w-xl">
            Enforcing least-privilege access across high-risk model weights, secrets, and datasets.
          </p>
        </div>
        
        <div className="flex items-center space-x-8">
          {isElevatedRole && (
            <div className="flex flex-col items-center">
              <button 
                onClick={autoRemediate}
                disabled={remediating || violations.length === 0}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md group ${
                  violations.length > 0 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {remediating ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                )}
                <span>Auto-Remediate</span>
              </button>
              {lastFixCount > 0 && <p className="text-[9px] font-bold text-green-600 mt-2 uppercase animate-bounce">Fixed {lastFixCount} Risks</p>}
            </div>
          )}

          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Simulated User</p>
            <select 
              value={activePersonaId} 
              onChange={e => setActivePersonaId(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {actors.map(a => <option key={a.id} value={a.id}>{a.name} ({a.role})</option>)}
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Health Score</p>
              <p className={`text-3xl font-black ${securityScore > 85 ? 'text-green-600' : 'text-red-600'}`}>{securityScore}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Violation Watch Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 overflow-hidden relative">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center space-x-2">
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Active Violation Watch</span>
        </h3>
        {violations.length > 0 ? (
          <div className="flex overflow-x-auto pb-2 gap-4 no-scrollbar">
            {violations.map((v, i) => {
              const policy = POLICIES.find(p => p.id === v.policyId);
              return (
                <div key={i} className={`flex-shrink-0 w-64 p-4 rounded-xl border relative group transition-all hover:scale-105 cursor-default ${
                  v.severity === 'Critical' ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded border bg-white border-slate-200 uppercase">{v.severity}</span>
                    <span className="text-[10px] font-mono text-slate-400">[{v.policyId}]</span>
                  </div>
                  <p className="text-xs font-black text-slate-800 line-clamp-2 leading-tight mb-2">{v.message}</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase truncate">Recommendation: {v.recommendation}</p>

                  <div className="absolute z-[60] invisible group-hover:visible bg-slate-900 text-white p-4 rounded-xl shadow-2xl w-72 bottom-full mb-3 left-1/2 -translate-x-1/2 border border-slate-700 pointer-events-none transition-all duration-200">
                     <p className="font-black text-[10px] uppercase tracking-widest text-blue-400 mb-1">{policy?.name}</p>
                     <p className="text-[11px] leading-tight text-slate-300 mb-3">{policy?.desc}</p>
                     <div className="p-2 bg-slate-800 rounded-lg">
                        <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Recommended Remediation</p>
                        <p className="text-[10px] leading-tight text-slate-200 italic font-medium">Set the permission level to <span className="text-blue-400 font-black">"{v.recommendation}"</span> to restore compliance with the {policy?.name} policy.</p>
                     </div>
                     <div className="absolute w-3 h-3 bg-slate-900 rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2 border-b border-r border-slate-700"></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-4 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">No Active Policy Violations</div>
        )}
      </div>

      {/* Main Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Asset Access Controls</h3>
          <button onClick={() => setShowPolicies(!showPolicies)} className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">
            {showPolicies ? 'Hide Policies' : 'Review Security Policies'}
          </button>
        </div>

        {showPolicies && (
          <div className="bg-slate-900 text-slate-300 p-6 border-b border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2">
            {POLICIES.map(p => (
              <div key={p.id} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                <p className="text-[10px] font-bold text-blue-400 mb-1 uppercase tracking-widest">{p.id}: {p.name}</p>
                <p className="text-[11px] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-400 uppercase">Asset Object</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase text-center border-l border-slate-50">Risk Level</th>
                {visibleActors.map(actor => (
                  <th key={actor.id} className="p-4 text-xs font-bold text-slate-400 uppercase text-center border-l border-slate-50">
                    <div>{actor.name}</div>
                    <div className="text-[9px] font-medium text-slate-400 italic lowercase tracking-tight">{actor.role}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleAssets.map(asset => (
                <tr key={asset.id} className="hover:bg-slate-50/50 transition group">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${asset.riskLevel === 'Critical' ? 'bg-red-500 animate-pulse' : asset.riskLevel === 'High' ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
                      <span className="font-bold text-slate-700">{asset.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 uppercase font-mono tracking-tighter">{asset.category}</div>
                  </td>
                  <td className="p-4 border-l border-slate-50 text-center">
                    <select
                      value={asset.riskLevel}
                      disabled={!isElevatedRole}
                      onChange={(e) => updateAssetRiskLevel(asset.id, e.target.value as any)}
                      className="text-[10px] font-black px-2 py-1 rounded-md border border-slate-200 uppercase shadow-sm outline-none focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer hover:bg-slate-50"
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </td>
                  {visibleActors.map(actor => {
                    const perm = matrix[asset.id]?.[actor.id] || 'Denied';
                    const key = `${asset.id}-${actor.id}`;
                    const actorViolations = violationMap[key] || [];
                    const hasViolation = actorViolations.length > 0;
                    
                    return (
                      <td key={actor.id} className={`p-2 text-center border-l border-slate-50 relative group transition-all ${hasViolation ? 'bg-red-100/30' : ''}`}>
                        <button 
                          onClick={() => togglePermission(asset.id, actor.id)}
                          disabled={!isElevatedRole || remediating}
                          className={`w-24 py-2 rounded-md text-[10px] font-bold border shadow-sm transition-all hover:scale-[1.02] active:scale-95 ${PERMISSION_COLORS[perm]} ${hasViolation ? 'ring-2 ring-red-500 ring-offset-1' : ''}`}
                        >
                          {perm} {hasViolation && <span className="ml-1 text-red-600 font-black animate-pulse">!</span>}
                        </button>

                        {hasViolation && (
                          <div className="absolute z-50 invisible group-hover:visible bg-slate-900 text-white p-5 rounded-xl shadow-2xl -bottom-3 translate-y-full left-1/2 -translate-x-1/2 w-72 border border-slate-700 pointer-events-none text-left backdrop-blur-md bg-opacity-95 transition-all duration-200">
                            <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-700">
                              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                              <p className="font-black text-[10px] uppercase tracking-[0.2em] text-white">Compliance Alert</p>
                            </div>
                            <div className="space-y-4">
                              {actorViolations.map((v, i) => {
                                const policy = POLICIES.find(p => p.id === v.policyId);
                                return (
                                  <div key={i} className="space-y-2">
                                    <div>
                                      <p className="text-[10px] text-blue-400 font-black uppercase tracking-wider mb-0.5">[{v.policyId}] {policy?.name}</p>
                                      <p className="text-[11px] leading-tight font-medium text-white">{v.message}</p>
                                    </div>
                                    <div className="p-2 bg-slate-800 rounded border border-slate-700">
                                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Policy Explanation</p>
                                      <p className="text-[10px] leading-snug text-slate-300 italic">{policy?.desc}</p>
                                    </div>
                                    <div className="pt-2 flex justify-between items-center border-t border-slate-800">
                                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Remediation</span>
                                      <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm">
                                        Set to {v.recommendation}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="absolute w-3 h-3 bg-slate-900 rotate-45 -top-1.5 left-1/2 -translate-x-1/2 border-t border-l border-slate-700"></div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest">Active Compliance Log</h3>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-100 text-blue-700 uppercase">Resilience Mode: Enabled</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto max-h-48 space-y-3 scrollbar-thin">
            {violations.length > 0 ? violations.map((v, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 hover:border-red-200 transition-colors">
                <div className="flex space-x-3">
                  <span className="text-[10px] font-black text-red-500 uppercase mt-0.5">{v.policyId}</span>
                  <div>
                    <p className="text-xs text-slate-700 font-bold">{v.message}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tight mt-0.5">Rec: Change to {v.recommendation}</p>
                  </div>
                </div>
                <button 
                  onClick={() => remediate(v.assetId, v.actorId, v.recommendation)}
                  className="text-[10px] font-black bg-white border border-slate-300 px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm transition-all"
                >
                  Apply Fix
                </button>
              </div>
            )) : (
              <div className="h-full flex items-center justify-center text-slate-400 italic text-sm py-10">
                No compliance issues currently logged.
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl relative overflow-hidden group">
          <h3 className="font-bold text-lg mb-2 relative z-10 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>Zero-Trust Lockdown</span>
          </h3>
          <p className="text-xs text-slate-400 mb-6 relative z-10 leading-relaxed font-medium">Article 15 Resilience Protocol. Resets all non-compliant access to least-privilege state immediately.</p>
          <button 
            disabled={!isElevatedRole}
            onClick={autoRemediate}
            className={`w-full py-3 rounded-lg font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all relative z-10 ${
              isElevatedRole ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            Emergency Lockdown
          </button>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-gradient-to-br from-red-500 to-transparent -rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Cybersecurity;
