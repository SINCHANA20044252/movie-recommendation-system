export interface Movie {
  title: string;
  year: number;
  director: string;
  genre: string[];
  reason: string;
  matchScore: number;
  plot: string;
}

export type Algorithm = 'LSTM' | 'XGBoost';

export interface UserPreferences {
  selectedGenres: string[];
  mood: string;
  favoriteMovies: string[];
  algorithm: Algorithm;
}

export interface RecommendationResponse {
  analysis: string;
  recommendations: Movie[];
}

export enum AppState {
  LANDING = 'LANDING',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  ERROR = 'ERROR'
}

// Predefined lists for UI
export const GENRES = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", 
  "Documentary", "Drama", "Fantasy", "Horror", "Mystery", 
  "Romance", "Sci-Fi", "Thriller", "War", "Western", "Noir"
];

export const MOODS = [
  "Chill & Relaxed", "Mind-Bending", "Adrenaline Rush", 
  "Feel Good", "Dark & Gritty", "Emotional", "Educational",
  "Romantic", "Scary", "Inspiring"
];