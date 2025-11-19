import React, { useState } from 'react';
import { Button } from './Button';
import { Sparkles, Send, Smile, Frown, Meh, CloudRain, Sun } from 'lucide-react';

export const JournalEditor = ({ onSubmit, isAnalyzing }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit();
    }
  };

  const appendEmoji = (emoji, label) => {
    const phrase = `I am feeling ${label}. `;
    setText((prev) => (prev ? prev + ' ' + phrase : phrase));
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 transition-all focus-within:shadow-xl">
      
      {/* Quick Emoji Selectors */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Quick Mood Check-in</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button onClick={() => appendEmoji('😊', 'happy')} className="flex items-center space-x-1 px-3 py-2 rounded-full bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors text-sm">
                <Smile size={16} /> <span>Happy</span>
            </button>
            <button onClick={() => appendEmoji('😔', 'sad')} className="flex items-center space-x-1 px-3 py-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-sm">
                <CloudRain size={16} /> <span>Sad</span>
            </button>
            <button onClick={() => appendEmoji('😐', 'neutral')} className="flex items-center space-x-1 px-3 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-sm">
                <Meh size={16} /> <span>Okay</span>
            </button>
            <button onClick={() => appendEmoji('😫', 'anxious')} className="flex items-center space-x-1 px-3 py-2 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-sm">
                <Frown size={16} /> <span>Anxious</span>
            </button>
             <button onClick={() => appendEmoji('😌', 'calm')} className="flex items-center space-x-1 px-3 py-2 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-sm">
                <Sun size={16} /> <span>Calm</span>
            </button>
        </div>
      </div>

      <div className="relative">
        <textarea
            id="journal-input"
            className="w-full min-h-[180px] p-4 text-gray-700 text-lg placeholder-gray-300 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-0 resize-y transition-all"
            placeholder="What's on your mind? Write freely..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isAnalyzing}
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-xs text-gray-400 hidden sm:block">
          <span className="font-medium">Pro tip:</span> Press <kbd className="font-sans bg-gray-100 px-1 rounded">Cmd + Enter</kbd> to submit
        </p>
        <Button 
          onClick={handleSubmit} 
          disabled={!text.trim() || isAnalyzing}
          isLoading={isAnalyzing}
          icon={isAnalyzing ? <Sparkles className="w-4 h-4" /> : <Send className="w-4 h-4" />}
          className="w-full sm:w-auto ml-auto"
        >
          {isAnalyzing ? 'Analyzing Thoughts...' : 'Analyze Entry'}
        </Button>
      </div>
    </div>
  );
};
