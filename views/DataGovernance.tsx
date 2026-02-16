
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const metrics = [
  { name: 'Representativeness', value: 92, status: 'Passed' },
  { name: 'Completeness', value: 98, status: 'Passed' },
  { name: 'Consistency', value: 85, status: 'Warning' },
  { name: 'Bias Offset', value: 12, status: 'Active' },
];

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444'];

const DataGovernance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-lg mb-4">Data Quality Engine</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-100 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-2">{m.name}</p>
                <p className="text-2xl font-bold text-slate-900">{m.value}%</p>
                <span className={`text-[10px] font-bold uppercase mt-2 inline-block ${
                  m.status === 'Passed' ? 'text-green-600' : m.status === 'Warning' ? 'text-orange-600' : 'text-blue-600'
                }`}>{m.status}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h4 className="text-sm font-bold text-slate-600 mb-4">Consistency Rule Violations</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 border border-red-100 bg-red-50 rounded text-xs">
                <span className="font-mono">Departure_Date &lt; Join_Date</span>
                <span className="font-bold text-red-600">42 Records</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-slate-100 bg-slate-50 rounded text-xs">
                <span className="font-mono">Age_at_Birth &lt; 12</span>
                <span className="font-bold text-slate-600">0 Records</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-lg mb-4">Bias Management</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <p className="text-xs font-bold text-blue-800 uppercase mb-2">Art 10(5) Exception</p>
              <p className="text-sm text-blue-700">
                Processing of <strong>special categories</strong> (Ethnicity) is currently active strictly for bias correction.
              </p>
              <div className="mt-4 flex space-x-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">View Audit Trail</button>
                <button className="bg-white text-blue-600 border border-blue-600 px-3 py-1 rounded text-xs font-bold">Disable</button>
              </div>
            </div>
            
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{v: 80}, {v: 20}]} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="v">
                    <Cell fill="#2563eb" />
                    <Cell fill="#e2e8f0" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs font-medium text-slate-500">Demographic Parity Index: 0.88</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <div className="flex justify-between mb-4">
          <h3 className="font-bold text-lg">Active Data Cards</h3>
          <button className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-sm font-bold">Export All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 font-bold text-slate-500 uppercase">Dataset ID</th>
                <th className="p-3 font-bold text-slate-500 uppercase">Scope</th>
                <th className="p-3 font-bold text-slate-500 uppercase">Provenance</th>
                <th className="p-3 font-bold text-slate-500 uppercase">Records</th>
                <th className="p-3 font-bold text-slate-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'HR_TRAIN_V1', scope: 'Historical Hiring 2018-2023', prov: 'Internal ERP', records: '45,200' },
                { id: 'MED_IMG_DIA', scope: 'MRI Scans / Neurology', prov: 'OpenSource Consortium', records: '1.2M' },
                { id: 'FIN_SCORE_A', scope: 'Credit Scores / SMEs', prov: 'Experian API', records: '98,000' },
              ].map((d, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-600">{d.id}</td>
                  <td className="p-3 text-slate-600">{d.scope}</td>
                  <td className="p-3 text-slate-600">{d.prov}</td>
                  <td className="p-3 text-slate-900 font-semibold">{d.records}</td>
                  <td className="p-3">
                    <button className="text-blue-600 font-bold hover:underline">View Card</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataGovernance;
