
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

const TechnicalDocs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [docContent, setDocContent] = useState<string | null>(null);

  const generateDoc = async () => {
    setLoading(true);
    try {
      const systemInfo = {
        name: "Smart Insulin Pump AI",
        purpose: "Real-time glucose prediction and insulin dosage calculation",
        architecture: "Recurrent Neural Network (LSTM)",
        deployment: "Embedded medical hardware",
        article: "Annex IV, Section 3"
      };
      const result = await geminiService.generateTechnicalDoc(systemInfo);
      setDocContent(result || "Failed to generate.");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-8 rounded-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Annex IV Technical Documentation</h2>
          <p className="text-slate-400 max-w-2xl mb-6">
            Auto-compile the Master Document required for conformity assessment. 
            This module pulls data from your QMS, Data Governance, and Audit logs.
          </p>
          <button 
            onClick={generateDoc}
            disabled={loading}
            className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Compiling Master Document...' : 'Generate New Revision'}
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-full opacity-10 flex items-center justify-center">
          <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Sections</h4>
          <ul className="space-y-3">
            {['1. General System Overview', '2. Elements of Design', '3. Model Architecture', '4. Computational Resources', '5. Trade-off Analysis'].map((s, i) => (
              <li key={i} className="flex items-center space-x-3 text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer">
                <span className="w-4 h-4 border border-slate-300 rounded flex items-center justify-center text-[10px] font-bold">✔</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col min-h-[500px]">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-600">Revision History: v2.4.1 (Last updated 2 days ago)</span>
            <div className="flex space-x-2">
              <button className="text-xs font-bold text-blue-600 hover:underline">Download PDF</button>
              <button className="text-xs font-bold text-blue-600 hover:underline">Share Link</button>
            </div>
          </div>
          <div className="p-8 prose prose-slate max-w-none flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="animate-pulse">Consulting Gemini AI Regulatory Engine...</p>
              </div>
            ) : docContent ? (
              <div className="whitespace-pre-wrap font-serif text-slate-800 leading-relaxed">
                {docContent}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 italic">
                No content generated for this revision. Click 'Generate' to start.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDocs;
