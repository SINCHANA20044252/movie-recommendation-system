import React, { useState, useEffect } from 'react';
import { RecommendationResponse, UserPreferences, Movie } from '../types';
import { getRecommendations } from '../services/geminiService';
import { MovieCard } from './MovieCard';
import { Button } from './Button';
import { RefreshCw, Filter } from 'lucide-react';

interface DashboardProps {
  prefs: UserPreferences;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ prefs, onReset }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [likedHistory, setLikedHistory] = useState<string[]>([]);
  const [dislikedHistory, setDislikedHistory] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getRecommendations(prefs, likedHistory, dislikedHistory);
      setData(result);
    } catch (err) {
      setError("An error occurred during the simulation process. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLike = (movie: Movie) => {
    setLikedHistory(prev => [...prev, movie.title]);
  };

  const handleDislike = (movie: Movie) => {
    setDislikedHistory(prev => [...prev, movie.title]);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
        <div className="relative w-24 h-24">
            <div className={`absolute inset-0 rounded-full border-t-4 ${prefs.algorithm === 'LSTM' ? 'border-blue-500' : 'border-orange-500'} animate-spin`}></div>
            <div className="absolute inset-2 rounded-full border-r-4 border-indigo-500 animate-spin animation-delay-200"></div>
            <div className="absolute inset-4 rounded-full border-b-4 border-purple-500 animate-spin animation-delay-500"></div>
        </div>
        <div>
            <h3 className="text-xl font-semibold text-white">Running {prefs.algorithm} Simulation...</h3>
            <p className="text-slate-400 mt-2 max-w-md mx-auto">
                {prefs.algorithm === 'LSTM' 
                  ? "Analyzing temporal sequences and updating hidden states for sequential prediction."
                  : "Calculating gradient descent steps and minimizing loss function across decision trees."}
            </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 glass-panel rounded-xl max-w-md mx-auto mt-10">
        <div className="text-red-400 mb-4 text-xl font-bold">Calculation Error</div>
        <p className="text-slate-300 mb-6">{error}</p>
        <Button onClick={fetchRecommendations}>Retry Sequence</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header / Analysis Panel */}
      <div className={`glass-panel rounded-2xl p-6 border-l-4 ${prefs.algorithm === 'LSTM' ? 'border-blue-500' : 'border-orange-500'}`}>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <SparklesIcon /> Personalized Recommendations
                </h2>
                <span className={`px-2 py-1 rounded text-xs font-bold border ${
                prefs.algorithm === 'LSTM' 
                    ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' 
                    : 'bg-orange-900/30 text-orange-400 border-orange-500/30'
                }`}>
                {prefs.algorithm} ACTIVE
                </span>
            </div>
            <p className="text-slate-400 text-sm ml-8">
                Personalized movie recommendation system by asking the genre of the movie.
            </p>
          </div>
          
          <div className="flex gap-2 shrink-0 self-start lg:self-center ml-8 lg:ml-0">
             <Button variant="outline" size="sm" onClick={onReset}>
                <Filter size={14} className="mr-2" /> New Profile
             </Button>
             <Button variant="secondary" size="sm" onClick={fetchRecommendations}>
                <RefreshCw size={14} className="mr-2" /> Refine & Reload
             </Button>
          </div>
        </div>
        
        <div className="h-px bg-white/10 my-4" />
        
        <p className="text-slate-300 leading-relaxed text-lg font-light">
          {data?.analysis}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.recommendations.map((movie, idx) => (
          <MovieCard 
            key={`${movie.title}-${idx}`} 
            movie={movie} 
            index={idx}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        ))}
      </div>
      
      {/* Bottom Action */}
      <div className="flex justify-center py-8">
        <Button 
            size="lg" 
            className="group px-8 rounded-full" 
            onClick={fetchRecommendations}
        >
            <RefreshCw className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Generate New Batch
        </Button>
      </div>
    </div>
  );
};

const SparklesIcon = () => (
  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 3.214L13 21l-2.286-6.857L5 12l5.714-3.214z" />
  </svg>
);