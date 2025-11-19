import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const AnalyticsChart = ({ entries }) => {
  // Prepare data: Sort by date ascending and format for chart
  const data = [...entries]
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(entry => ({
      date: new Date(entry.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      fullDate: new Date(entry.timestamp).toLocaleString(),
      sentiment: entry.analysis?.sentimentScore || 0,
      summary: entry.analysis?.shortSummary || 'No Analysis',
      color: entry.analysis?.colorHex || '#6366f1'
    }));

  if (data.length < 2) {
    return (
       <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-dashed border-gray-200 text-gray-400 p-6 text-center">
         <p>Not enough data yet.</p>
         <p className="text-sm mt-2">Write at least 2 journal entries to unlock your mood trends.</p>
       </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-end mb-8">
        <div>
            <h3 className="text-xl font-bold text-gray-800">Emotional Flow</h3>
            <p className="text-sm text-gray-500 mt-1">Visualizing your sentiment over time</p>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8' }} 
              dy={10}
              minTickGap={30}
            />
            <YAxis 
              domain={[0, 10]} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            <Area 
              type="monotone" 
              dataKey="sentiment" 
              stroke="#6366f1" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorSentiment)" 
              animationDuration={1500}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
