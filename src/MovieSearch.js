import React, { useState, useEffect } from 'react'; 
  
function MovieSearch({ onAdd }) { 
  const [query, setQuery] = useState(''); 
  const [suggestions, setSuggestions] = useState([]); 
  
  useEffect(() => { 
    if (query.length < 2) { 
      setSuggestions([]); 
      return; 
    } 
  
    const fetchSuggestions = async () => { 
      const apiKey = '29fb921b66c65cf64bb69b8e8ff89ca9'; // Replace with your actual TMDB API key 
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US`; 
  
      try { 
        const res = await fetch(url); 
        const data = await res.json(); 
        setSuggestions(data.results.slice(0, 5)); 
      } catch (err) { 
        console.error('Error fetching movie suggestions:', err); 
      } 
    }; 
  
    fetchSuggestions(); 
  }, [query]); 
  
  const handleSelect = (movie) => { 
    const posterUrl = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
      : null; 
  
    const newMovie = { 
      id: movie.id, 
      title: movie.title, 
      poster: posterUrl, 
      tmdbRating: movie.vote_average, 
      watched: false, 
      userRating: 0, 
    }; 
  
    onAdd(newMovie); 
    setQuery(''); 
    setSuggestions([]); 
  }; 
  
  return ( 
    <div style={{ marginBottom: '20px', position: 'relative' }}> 
      <input 
        type="text" 
        placeholder="Search for movies..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        style={{ padding: '8px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }} 
      /> 
      {suggestions.length > 0 && ( 
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          marginTop: '8px', 
          background: '#1e1e1e', 
          color: '#ffffff', 
          border: '1px solid #ccc', 
          width: '300px', 
          position: 'absolute', 
          zIndex: 10, 
          borderRadius: '4px' 
        }}> 
          {suggestions.map((movie) => ( 
            <li 
              key={movie.id} 
              onClick={() => handleSelect(movie)} 
              style={{ 
                padding: '8px', 
                cursor: 'pointer', 
                borderBottom: '1px solid #333' 
              }} 
            > 
              {movie.title} 
            </li> 
          ))} 
        </ul> 
      )} 
    </div> 
  ); 
} 
  
export default MovieSearch; 