
import React from 'react';

const roles = [
  { title: 'Legal Compliance Officer', desc: 'Strategy for regulatory compliance and fundamental rights.', icon: '⚖️', assigned: 'Elena Martinez' },
  { title: 'Technical Architect', desc: 'Systematic design techniques and architecture oversight.', icon: '🏗️', assigned: 'Carlos Ruiz' },
  { title: 'QA & Red Team Lead', desc: 'Testing, validation, and vulnerability assessments.', icon: '🛡️', assigned: 'Sarah Johnson' },
  { title: 'Data Governance Lead', desc: 'Provenance, scope, and characteristics of datasets.', icon: '📊', assigned: 'Miguel Angel' },
];

const Governance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold">Accountability Framework</h2>
          <p className="text-slate-500">Assign specific responsibilities to meet EU AI Act governance requirements.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
          Assign New Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition group">
            <div className="flex justify-between mb-4">
              <span className="text-3xl">{role.icon}</span>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">Active</span>
            </div>
            <h3 className="font-bold text-lg mb-1">{role.title}</h3>
            <p className="text-slate-500 text-sm mb-4">{role.desc}</p>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                  {role.assigned.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-sm font-medium text-slate-700">{role.assigned}</span>
              </div>
              <button className="text-blue-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition">Modify</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4">Document Retention Policy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">Type</p>
            <p className="font-semibold text-white">Log Records (Art. 12)</p>
            <p className="text-sm text-slate-400">Continuous logs of system outputs and inputs.</p>
          </div>
          <div className="space-y-2">
            <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">Standard Period</p>
            <p className="font-semibold text-green-400">6 Months</p>
            <p className="text-sm text-slate-400">Default Sandbox retention requirement.</p>
          </div>
          <div className="space-y-2">
            <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">Extended Period</p>
            <p className="font-semibold text-orange-400">5-10 Years</p>
            <p className="text-sm text-slate-400">Required for specific medical/financial sectors.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;
