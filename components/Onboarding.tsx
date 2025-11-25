import React, { useState } from 'react';
import { GENRES, MOODS, UserPreferences, Algorithm } from '../types';
import { Button } from './Button';
import { Clapperboard, Sparkles, Heart, Network, GitBranch } from 'lucide-react';

interface OnboardingProps {
  onComplete: (prefs: UserPreferences) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [favoriteInput, setFavoriteInput] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm | null>(null);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      if (selectedGenres.length < 4) {
        setSelectedGenres([...selectedGenres, genre]);
      }
    }
  };

  const addFavorite = () => {
    if (favoriteInput.trim() && favorites.length < 3) {
      setFavorites([...favorites, favoriteInput.trim()]);
      setFavoriteInput("");
    }
  };

  const removeFavorite = (idx: number) => {
    setFavorites(favorites.filter((_, i) => i !== idx));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!selectedAlgorithm) return;
    
    onComplete({
      selectedGenres,
      mood: selectedMood,
      favoriteMovies: favorites,
      algorithm: selectedAlgorithm
    });
  };

  return (
    <div className="max-w-2xl mx-auto w-full glass-panel rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-indigo-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clapperboard size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Select Your Genres</h2>
            <p className="text-slate-400">Pick up to 4 genres you enjoy watching.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {GENRES.map(genre => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedGenres.includes(genre)
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleNext} disabled={selectedGenres.length === 0}>
              Next Step
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">What's the Vibe?</h2>
            <p className="text-slate-400">How are you feeling right now?</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {MOODS.map(mood => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`p-3 rounded-xl text-sm font-medium transition-all text-center border ${
                  selectedMood === mood
                    ? 'bg-pink-600/20 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                    : 'bg-slate-800/50 border-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={handleNext} disabled={!selectedMood}>Next Step</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
           <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Your Favorites</h2>
            <p className="text-slate-400">Name 1-3 movies you absolutely love to help us calibrate.</p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={favoriteInput}
                onChange={(e) => setFavoriteInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addFavorite()}
                placeholder="Type a movie title..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              />
              <Button onClick={addFavorite} disabled={!favoriteInput || favorites.length >= 3} variant="secondary">Add</Button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {favorites.map((fav, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-900/30 text-emerald-400 border border-emerald-500/20">
                  {fav}
                  <button onClick={() => removeFavorite(idx)} className="hover:text-emerald-200">
                    &times;
                  </button>
                </span>
              ))}
              {favorites.length === 0 && (
                <span className="text-slate-600 text-sm italic py-1.5">No favorites added yet.</span>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={handleNext} disabled={favorites.length === 0}>
              Next Step
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
           <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Network size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Select Model Architecture</h2>
            <p className="text-slate-400">Choose the machine learning algorithm to power your recommendations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedAlgorithm('LSTM')}
              className={`p-6 rounded-xl border text-left transition-all relative group overflow-hidden ${
                selectedAlgorithm === 'LSTM'
                  ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Network className={selectedAlgorithm === 'LSTM' ? "text-blue-400" : "text-slate-400"} />
                <span className={`text-lg font-bold ${selectedAlgorithm === 'LSTM' ? "text-white" : "text-slate-200"}`}>LSTM Network</span>
              </div>
              <p className="text-sm text-slate-400 mb-2">Long Short-Term Memory</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Best for finding patterns in sequential viewing habits. Detects mood transitions and narrative flows over time.
              </p>
              {selectedAlgorithm === 'LSTM' && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setSelectedAlgorithm('XGBoost')}
              className={`p-6 rounded-xl border text-left transition-all relative group overflow-hidden ${
                selectedAlgorithm === 'XGBoost'
                  ? 'bg-orange-600/20 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <GitBranch className={selectedAlgorithm === 'XGBoost' ? "text-orange-400" : "text-slate-400"} />
                <span className={`text-lg font-bold ${selectedAlgorithm === 'XGBoost' ? "text-white" : "text-slate-200"}`}>XGBoost</span>
              </div>
              <p className="text-sm text-slate-400 mb-2">eXtreme Gradient Boosting</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Best for high-precision matching based on weighted features like Director, Year, and specific Genre tags.
              </p>
              {selectedAlgorithm === 'XGBoost' && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              )}
            </button>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={() => setStep(3)}>Back</Button>
            <Button onClick={handleSubmit} disabled={!selectedAlgorithm} className="w-32">
              Start Engine
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};