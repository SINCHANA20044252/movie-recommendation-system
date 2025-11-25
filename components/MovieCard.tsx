import React from 'react';
import { Movie } from '../types';
import { ThumbsUp, ThumbsDown, Star, Film, Calendar, User } from 'lucide-react';
import { Button } from './Button';

interface MovieCardProps {
  movie: Movie;
  onLike: (movie: Movie) => void;
  onDislike: (movie: Movie) => void;
  index: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onLike, onDislike, index }) => {
  // Using picsum with a deterministic seed based on title length to keep it consistent but different per card
  // In a real app, this would be a TMDB image URL
  const seed = movie.title.length + movie.year;
  const placeholderImage = `https://picsum.photos/seed/${seed}/400/600`;

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 shadow-xl hover:shadow-indigo-500/10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Poster Image Area */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
        <img 
          src={placeholderImage} 
          alt={movie.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
        />
        <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
            <span className="text-xs font-bold text-indigo-400">{movie.matchScore}% Match</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 z-20 -mt-12">
        <h3 className="text-xl font-bold text-white leading-tight mb-1 drop-shadow-lg">{movie.title}</h3>
        
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1"><Calendar size={12} /> {movie.year}</span>
          <span className="flex items-center gap-1"><User size={12} /> {movie.director}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {movie.genre.map((g) => (
            <span key={g} className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] uppercase tracking-wider font-semibold">
              {g}
            </span>
          ))}
        </div>

        <div className="mb-4">
          <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed mb-2">{movie.plot}</p>
          <div className="p-3 bg-indigo-950/30 rounded-lg border border-indigo-500/20">
            <p className="text-xs text-indigo-200 italic">
              <span className="font-semibold text-indigo-400 not-italic">AI Insight: </span> 
              "{movie.reason}"
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4 border-t border-slate-800">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 hover:bg-green-500/20 hover:text-green-400"
            onClick={() => onLike(movie)}
          >
            <ThumbsUp size={16} className="mr-2" /> Seen / Like
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 hover:bg-red-500/20 hover:text-red-400"
            onClick={() => onDislike(movie)}
          >
            <ThumbsDown size={16} className="mr-2" /> Pass
          </Button>
        </div>
      </div>
    </div>
  );
};