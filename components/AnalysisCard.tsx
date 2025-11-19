import React from 'react';
import { Heart, CheckCircle, Sparkles, Quote } from 'lucide-react';

export const AnalysisCard = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in-up transition-all hover:shadow-2xl">
      
      {/* Decorative Background Blur */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 opacity-10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
        style={{ backgroundColor: analysis.colorHex }}
      />

      <div className="p-6 md:p-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
                <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg transform rotate-3"
                    style={{ backgroundColor: analysis.colorHex }}
                >
                    {analysis.sentimentScore}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{analysis.shortSummary}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {analysis.emotionalTone.map((tone, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                {tone}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Empathetic Response */}
        <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-50 mb-6">
            <div className="flex items-start gap-3">
                <Quote className="w-8 h-8 text-indigo-300 flex-shrink-0 -mt-1" />
                <p className="text-gray-700 leading-relaxed italic text-lg">
                    {analysis.empatheticResponse}
                </p>
            </div>
        </div>

        {/* Actionable Advice */}
        <div>
            <h4 className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                Suggested Actions
            </h4>
            <div className="grid gap-3">
                {analysis.actionableAdvice.map((advice, idx) => (
                <div key={idx} className="flex items-start p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{advice}</span>
                </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
