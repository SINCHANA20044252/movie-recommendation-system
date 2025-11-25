import React, { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { AppState, UserPreferences } from './types';
import { Film, BrainCircuit } from 'lucide-react';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  const handleOnboardingComplete = (prefs: UserPreferences) => {
    setPreferences(prefs);
    setAppState(AppState.DASHBOARD);
  };

  const resetApp = () => {
    setPreferences(null);
    setAppState(AppState.LANDING);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-x-hidden selection:bg-indigo-500/30">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[128px]" />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-900/50 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={resetApp}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <BrainCircuit className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              CineMind
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-400">
            <span className="hover:text-white transition-colors cursor-pointer">How it works</span>
            <span className="hover:text-white transition-colors cursor-pointer">About</span>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {appState === AppState.LANDING && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 text-indigo-400 text-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Client-Side Neural Simulation
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Personalized Movie <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Recommendation System
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
              Get recommendations after selecting the genre. Choose between LSTM Sequential Learning or XGBoost Decision Trees to analyze your taste profile.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="px-8 h-14 text-lg rounded-full shadow-indigo-500/25"
                onClick={() => setAppState(AppState.ONBOARDING)}
              >
                Start Recommendation Engine
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 h-14 text-lg rounded-full border-slate-700 hover:bg-slate-800"
              >
                View Architecture
              </Button>
            </div>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
               {['LSTM Sequences', 'XGBoost Ranking', 'Feature Importance', 'Instant Results'].map((feat, i) => (
                 <div key={i} className="flex flex-col items-center gap-2">
                    <div className="h-1 w-12 bg-slate-800 rounded-full mb-2" />
                    <span className="text-sm font-mono text-slate-500 uppercase tracking-widest">{feat}</span>
                 </div>
               ))}
            </div>
          </div>
        )}

        {appState === AppState.ONBOARDING && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}

        {appState === AppState.DASHBOARD && preferences && (
          <Dashboard prefs={preferences} onReset={() => setAppState(AppState.LANDING)} />
        )}

      </main>

      <footer className="relative z-10 border-t border-white/5 py-8 mt-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-slate-500 text-sm">
          <p>© 2024 CineMind AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;