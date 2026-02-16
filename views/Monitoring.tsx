
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const driftData = [
  { time: '00:00', accuracy: 98, drift: 0.02 },
  { time: '04:00', accuracy: 97, drift: 0.04 },
  { time: '08:00', accuracy: 96, drift: 0.08 },
  { time: '12:00', accuracy: 92, drift: 0.15 },
  { time: '16:00', accuracy: 91, drift: 0.18 },
  { time: '20:00', accuracy: 94, drift: 0.12 },
  { time: '24:00', accuracy: 95, drift: 0.10 },
];

const Monitoring: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-lg mb-4">Real-time Robustness Monitor</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={driftData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#2563eb" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="drift" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Model Drift Threshold: 0.20</span>
            <span className="text-green-600">Current Status: Stable</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-lg mb-4">Anomaly Detection</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-red-700">ALERT: High Prediction Frequency</span>
                <span className="text-xs text-red-500">2h ago</span>
              </div>
              <p className="text-sm text-red-800">
                Insulin Pump predicting dosage 50x above normal frequency range for User #8821.
              </p>
              <div className="mt-3">
                <button className="bg-red-600 text-white px-4 py-1.5 rounded text-xs font-bold shadow-sm">Initiate Serious Incident Report</button>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <p className="text-xs font-bold text-slate-500 mb-1 tracking-widest uppercase">Cybersecurity Asset Matrix</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Model Weights Access</span>
                <span className="text-blue-600">Least Privilege Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg">Article 12 Record Keeping (Automatic Logs)</h3>
          <div className="flex space-x-2">
            <input type="text" placeholder="Filter by Actor..." className="text-xs border rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-blue-500" />
            <button className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold">Download CSV</button>
          </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 font-bold text-slate-500 uppercase text-[10px] tracking-widest">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Actor</th>
              <th className="p-4">Input ID</th>
              <th className="p-4">Model Ver</th>
              <th className="p-4">Output (Prediction)</th>
              <th className="p-4">Energy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-xs">
            {[
              { time: '2024-05-20 10:22:01', actor: 'Sys-Embed-01', input: 'VEC-991', ver: '2.1.0', out: '1.2u Insulin', energy: '0.04Wh' },
              { time: '2024-05-20 10:22:05', actor: 'HR-Portal-02', input: 'USR-772', ver: '3.0.4', out: 'Score: 0.88', energy: '1.12Wh' },
              { time: '2024-05-20 10:22:12', actor: 'Sys-Embed-01', input: 'VEC-992', ver: '2.1.0', out: '0.8u Insulin', energy: '0.04Wh' },
            ].map((log, i) => (
              <tr key={i} className="hover:bg-slate-50 transition">
                <td className="p-4 text-slate-500">{log.time}</td>
                <td className="p-4 text-slate-900 font-bold">{log.actor}</td>
                <td className="p-4 text-blue-600">{log.input}</td>
                <td className="p-4">{log.ver}</td>
                <td className="p-4 font-bold text-slate-700">{log.out}</td>
                <td className="p-4 text-green-600">{log.energy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Monitoring;
