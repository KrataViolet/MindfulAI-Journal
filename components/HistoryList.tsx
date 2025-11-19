import React from 'react';
import { Trash2, Calendar, ArrowRight } from 'lucide-react';

export const HistoryList = ({ entries, onDelete }) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-3xl shadow-sm border border-gray-100 border-dashed">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-gray-300" />
        </div>
        <p className="text-gray-500 font-medium">No journal entries yet.</p>
        <p className="text-gray-400 text-sm mt-1">Start writing to build your personal history.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {entries.map((entry) => (
        <div key={entry.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          
          {/* Color Bar */}
          {entry.analysis && (
             <div className="h-2 w-full" style={{ backgroundColor: entry.analysis.colorHex }} />
          )}

          <div className="p-5 sm:p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                 <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    {new Date(entry.timestamp).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                 </span>
                 <div className="flex items-center text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs mr-2">
                        {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                 </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}
                className="text-gray-300 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100"
                title="Delete Entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="relative mb-6">
                <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap font-light line-clamp-4 group-hover:line-clamp-none transition-all">
                {entry.text}
                </p>
            </div>

            {entry.analysis && (
              <div className="bg-gray-50/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm" 
                    style={{ backgroundColor: entry.analysis.colorHex }}
                  >
                    {entry.analysis.sentimentScore}
                  </div>
                  <div>
                      <p className="font-semibold text-gray-800 text-sm">{entry.analysis.shortSummary}</p>
                      <div className="flex gap-1 mt-1">
                        {entry.analysis.emotionalTone.slice(0, 3).map((t, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wide bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-500">{t}</span>
                        ))}
                      </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
