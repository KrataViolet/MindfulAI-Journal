import React, { useState, useEffect } from 'react';
import { JournalEditor } from './components/JournalEditor';
import { AnalysisCard } from './components/AnalysisCard';
import { HistoryList } from './components/HistoryList';
import { AnalyticsChart } from './components/AnalyticsChart';
import { Button } from './components/Button';
import { analyzeMood } from './services/geminiService';
import { ViewState } from './types';
import { BookOpen, LineChart, PenTool, BrainCircuit, Moon, Download, Trash2 } from 'lucide-react';

const App = () => {
  const [entries, setEntries] = useState([]);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [view, setView] = useState(ViewState.HOME);
  const [bgColor, setBgColor] = useState('#f9fafb'); // Default gray-50

  // Load from local storage
  useEffect(() => {
    const savedEntries = localStorage.getItem('mindfulAI_entries');
    if (savedEntries) {
      try {
        const parsed = JSON.parse(savedEntries);
        setEntries(parsed);
        // Set background based on most recent entry
        if (parsed.length > 0 && parsed[0].analysis?.colorHex) {
            setBgColor(parsed[0].analysis.colorHex);
        }
      } catch (e) {
        console.error("Failed to parse entries", e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('mindfulAI_entries', JSON.stringify(entries));
  }, [entries]);

  // Smooth background transition
  useEffect(() => {
    document.body.style.transition = 'background-color 1.5s ease';
    // Blend the analyzed color with white to make it subtle for the background
    document.body.style.backgroundColor = bgColor === '#f9fafb' ? '#f9fafb' : `${bgColor}20`; // 20 is hex transparency (~12%)
  }, [bgColor]);

  const handleAnalyze = async (text) => {
    setIsAnalyzing(true);
    setCurrentAnalysis(null);
    
    try {
      const analysis = await analyzeMood(text);
      setCurrentAnalysis(analysis);
      if (analysis.colorHex) {
          setBgColor(analysis.colorHex);
      }
      
      const newEntry = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        text,
        analysis
      };
      
      setEntries(prev => [newEntry, ...prev]);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Sorry, we couldn't analyze your mood right now. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `mindful_journal_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen text-gray-800 font-sans pb-20 transition-colors duration-1000">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => setView(ViewState.HOME)}>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              MindfulAI
            </span>
          </div>

          <nav className="flex space-x-1 bg-gray-100/80 p-1.5 rounded-xl">
            {[
                { id: ViewState.HOME, icon: <PenTool className="w-4 h-4" />, label: 'Journal' },
                { id: ViewState.HISTORY, icon: <BookOpen className="w-4 h-4" />, label: 'History' },
                { id: ViewState.ANALYTICS, icon: <LineChart className="w-4 h-4" />, label: 'Trends' }
            ].map((item) => (
                <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                    view === item.id 
                    ? 'bg-white text-indigo-600 shadow-md transform scale-105' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
                >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
                </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-12">
        
        {/* HOME VIEW */}
        {view === ViewState.HOME && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                How are you <span className="text-indigo-600">feeling</span>?
              </h1>
              <p className="text-lg text-gray-500 max-w-lg mx-auto">
                Reflect on your day. Let AI help you understand your emotions and find clarity.
              </p>
            </div>

            <JournalEditor onSubmit={handleAnalyze} isAnalyzing={isAnalyzing} />

            {currentAnalysis && (
              <div className="mt-10 animate-fade-in-up">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Insights for You</h2>
                    <span className="text-xs font-medium px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">Just now</span>
                </div>
                <AnalysisCard analysis={currentAnalysis} />
                <div className="mt-8 flex justify-center">
                  <Button variant="secondary" onClick={() => { setCurrentAnalysis(null); setView(ViewState.HISTORY); }}>
                    Save & View History
                  </Button>
                </div>
              </div>
            )}
            
            {/* Feature Highlights */}
            {!currentAnalysis && !isAnalyzing && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 opacity-70 hover:opacity-100 transition-opacity duration-500">
                {[
                    { icon: <BrainCircuit />, color: 'text-blue-500', bg: 'bg-blue-50', title: 'AI Analysis', desc: 'Deep emotional understanding' },
                    { icon: <Moon />, color: 'text-purple-500', bg: 'bg-purple-50', title: 'Empathy', desc: 'Kind, psychological support' },
                    { icon: <LineChart />, color: 'text-green-500', bg: 'bg-green-50', title: 'Trends', desc: 'Visualize your mood journey' }
                ].map((f, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/50 transition-colors">
                        <div className={`${f.bg} ${f.color} p-3 rounded-2xl mb-3`}>{f.icon}</div>
                        <h3 className="font-bold text-gray-800">{f.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
                    </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HISTORY VIEW */}
        {view === ViewState.HISTORY && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Journal History</h2>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={handleExport} icon={<Download className="w-4 h-4" />} className="text-sm px-3">
                        Export Data
                    </Button>
                </div>
            </div>
            <HistoryList entries={entries} onDelete={handleDelete} />
          </div>
        )}

        {/* ANALYTICS VIEW */}
        {view === ViewState.ANALYTICS && (
          <div className="animate-fade-in space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">Emotional Wellness</h2>
            </div>
            
            <AnalyticsChart entries={entries} />
            
            {/* Detailed Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Entries', value: entries.length, color: 'text-indigo-600' },
                    { label: 'Avg Mood Score', value: entries.length > 0 ? (entries.reduce((acc, curr) => acc + (curr.analysis?.sentimentScore || 0), 0) / entries.length).toFixed(1) : '-', color: 'text-emerald-600' },
                    { label: 'Great Days', value: entries.filter(e => (e.analysis?.sentimentScore || 0) >= 8).length, color: 'text-blue-500' },
                    { label: 'Challenging Days', value: entries.filter(e => (e.analysis?.sentimentScore || 0) <= 4).length, color: 'text-orange-500' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                        <span className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</span>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                    </div>
                ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
