import { Movie, RecommendationResponse, UserPreferences } from "../types";

// Local Mock Database
const MOVIE_DATABASE = [
  { title: "Inception", year: 2010, director: "Christopher Nolan", genre: ["Sci-Fi", "Thriller", "Action"], plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O." },
  { title: "The Grand Budapest Hotel", year: 2014, director: "Wes Anderson", genre: ["Comedy", "Drama"], plot: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge." },
  { title: "Interstellar", year: 2014, director: "Christopher Nolan", genre: ["Sci-Fi", "Drama", "Adventure"], plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
  { title: "Parasite", year: 2019, director: "Bong Joon Ho", genre: ["Thriller", "Drama", "Comedy"], plot: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan." },
  { title: "The Dark Knight", year: 2008, director: "Christopher Nolan", genre: ["Action", "Crime", "Drama"], plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice." },
  { title: "Spirited Away", year: 2001, director: "Hayao Miyazaki", genre: ["Animation", "Adventure", "Fantasy"], plot: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts." },
  { title: "Pulp Fiction", year: 1994, director: "Quentin Tarantino", genre: ["Crime", "Drama"], plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption." },
  { title: "The Matrix", year: 1999, director: "Lana Wachowski", genre: ["Sci-Fi", "Action"], plot: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence." },
  { title: "Goodfellas", year: 1990, director: "Martin Scorsese", genre: ["Biography", "Crime", "Drama"], plot: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito." },
  { title: "Seven", year: 1995, director: "David Fincher", genre: ["Crime", "Drama", "Mystery"], plot: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives." },
  { title: "Gladiator", year: 2000, director: "Ridley Scott", genre: ["Action", "Adventure", "Drama"], plot: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery." },
  { title: "Her", year: 2013, director: "Spike Jonze", genre: ["Drama", "Romance", "Sci-Fi"], plot: "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need." },
  { title: "La La Land", year: 2016, director: "Damien Chazelle", genre: ["Comedy", "Drama", "Musical"], plot: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future." },
  { title: "Get Out", year: 2017, director: "Jordan Peele", genre: ["Horror", "Mystery", "Thriller"], plot: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point." },
  { title: "Blade Runner 2049", year: 2017, director: "Denis Villeneuve", genre: ["Sci-Fi", "Drama", "Action"], plot: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years." },
  { title: "Mad Max: Fury Road", year: 2015, director: "George Miller", genre: ["Action", "Adventure", "Sci-Fi"], plot: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max." },
  { title: "Whiplash", year: 2014, director: "Damien Chazelle", genre: ["Drama", "Music"], plot: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential." },
  { title: "Arrival", year: 2016, director: "Denis Villeneuve", genre: ["Drama", "Sci-Fi", "Mystery"], plot: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world." },
  { title: "Coco", year: 2017, director: "Lee Unkrich", genre: ["Animation", "Adventure", "Family"], plot: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer." },
  { title: "Dune", year: 2021, director: "Denis Villeneuve", genre: ["Sci-Fi", "Adventure"], plot: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future." },
  { title: "Everything Everywhere All At Once", year: 2022, director: "Daniels", genre: ["Action", "Adventure", "Comedy"], plot: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save the existence by exploring other universes and connecting with the lives she could have led." },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004, director: "Michel Gondry", genre: ["Drama", "Romance", "Sci-Fi"], plot: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories." },
  { title: "The Silence of the Lambs", year: 1991, director: "Jonathan Demme", genre: ["Crime", "Drama", "Thriller"], plot: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims." },
  { title: "Shutter Island", year: 2010, director: "Martin Scorsese", genre: ["Mystery", "Thriller"], plot: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane." },
  { title: "Knives Out", year: 2019, director: "Rian Johnson", genre: ["Comedy", "Crime", "Drama"], plot: "A detective investigates the death of a patriarch of an eccentric, combative family." }
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateLSTMReason = (movie: any, mood: string) => {
  const templates = [
    `Temporal sequence match: High probability following user's affinity for ${movie.genre[0]}.`,
    `Hidden state activation: Narrative structure aligns with 'Mood:${mood}' vector.`,
    `RNN Memory Gate: Retained context from recent inputs favors ${movie.director} style.`,
    `Sequence Prediction: 89% likelihood of engagement based on time-series analysis.`,
    `Long-term dependency found: Thematic elements correlate with user history t-1.`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
};

const generateXGBoostReason = (movie: any, score: number) => {
  const templates = [
    `Feature Importance > 0.8: Genre='${movie.genre[0]}' dominated the decision tree split.`,
    `Gradient Boost: Positive gain on Director='${movie.director}' node.`,
    `Ensemble Vote: 95% of trees classified this as a positive match.`,
    `Leaf Node 42: Matched on features [Genre, Year, PlotKeywords].`,
    `Hyperparameter Match: Loss function minimized for this candidate.`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
};

export const getRecommendations = async (
  prefs: UserPreferences,
  likedMovies: string[],
  dislikedMovies: string[]
): Promise<RecommendationResponse> => {
  
  // Simulate network latency for "calculation"
  await sleep(1500);

  // 1. Filter out seen movies
  let candidates = MOVIE_DATABASE.filter(m => 
    !likedMovies.includes(m.title) && 
    !dislikedMovies.includes(m.title) &&
    !prefs.favoriteMovies.some(fav => fav.toLowerCase() === m.title.toLowerCase())
  );

  // 2. Score candidates based on user preferences
  const scoredCandidates = candidates.map(movie => {
    let score = 0;
    
    // Genre Match
    const genreMatches = movie.genre.filter(g => prefs.selectedGenres.includes(g)).length;
    score += genreMatches * 20;

    // Random noise to simulate "AI discovery"
    score += Math.random() * 15;

    return { ...movie, rawScore: score };
  });

  // 3. Sort based on Algorithm
  scoredCandidates.sort((a, b) => b.rawScore - a.rawScore);

  // Take top 6
  const topPicks = scoredCandidates.slice(0, 6);

  // 4. Format Output based on Algorithm
  const recommendations = topPicks.map(movie => {
    let reason = "";
    let matchScore = Math.min(99, Math.floor(70 + movie.rawScore + (Math.random() * 10)));

    if (prefs.algorithm === 'LSTM') {
      reason = generateLSTMReason(movie, prefs.mood);
    } else {
      reason = generateXGBoostReason(movie, movie.rawScore);
    }

    return {
      title: movie.title,
      year: movie.year,
      director: movie.director,
      genre: movie.genre,
      reason,
      matchScore,
      plot: movie.plot
    };
  });

  // 5. Generate Analysis Text
  let analysis = "";
  if (prefs.algorithm === 'LSTM') {
    analysis = `RNN Architecture Initialized. Processing user preference sequence [${prefs.selectedGenres.join(', ')}] with hidden state set to Mood:${prefs.mood}. The model has identified a temporal pattern favoring ${recommendations[0]?.genre[0] || 'diverse'} narratives. Backpropagation through time suggests the following sequence minimizes viewer churn.`;
  } else {
    analysis = `XGBoost Ensemble Loaded. Training features: Genres=[${prefs.selectedGenres.join(', ')}], Mood=${prefs.mood}. Boosting iterations completed (n=100). Feature importance analysis indicates high weight on '${recommendations[0]?.director || 'Director'}' and '${recommendations[0]?.genre[0]}' attributes. The following candidates achieved the highest predicted probability scores in the validation set.`;
  }

  return {
    analysis,
    recommendations
  };
};