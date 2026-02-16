
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { requirement: 'Accuracy', maturity: 4, difficulty: 7 },
  { requirement: 'Transparency', maturity: 5, difficulty: 5 },
  { requirement: 'Cybersecurity', maturity: 2, difficulty: 9 },
  { requirement: 'Governance', maturity: 6, difficulty: 3 },
  { requirement: 'Robustness', maturity: 3, difficulty: 8 },
  { requirement: 'Diversity', maturity: 4, difficulty: 6 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Risk Profile', value: 'High', color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'System Category', value: 'Annex I', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Gaps', value: '14', color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Days to Audit', value: '45', color: 'text-slate-600', bg: 'bg-slate-50' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-xl border border-slate-200 ${stat.bg}`}>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Compliance Maturity Radar</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="requirement" />
                <Radar name="Current Maturity" dataKey="maturity" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
                <Radar name="Perceived Difficulty" dataKey="difficulty" stroke="#94a3b8" fill="#cbd5e1" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Maturity vs. Difficulty Gap</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="requirement" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="maturity" name="Maturity (1-8)" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="difficulty" name="Difficulty (1-10)" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Active Compliance Alerts</h3>
        <div className="space-y-3">
          {[
            { msg: 'Article 12: Automated logging not verified for HR Module V2', severity: 'High' },
            { msg: 'Representativeness Ratio dropped below threshold in Training Set', severity: 'Critical' },
            { msg: 'Technical Documentation: Annex IV Section 3 requires update', severity: 'Medium' },
          ].map((alert, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border-l-4 border-red-500">
              <span className="text-sm font-medium text-slate-700">{alert.msg}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                alert.severity === 'Critical' ? 'bg-red-100 text-red-700' : 
                alert.severity === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
              }`}>{alert.severity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
