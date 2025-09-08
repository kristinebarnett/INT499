import React, { useState } from 'react'; 
  
function MovieSearch({ onAdd }) { 
  const [query, setQuery] = useState(''); 
  const [results, setResults] = useState([]); 
  const [searchSubmitted, setSearchSubmitted] = useState(false); 
  
  const handleSearch = async () => { 
    if (query.trim().length < 2) { 
      setResults([]); 
      return; 
    } 
  
    const apiKey = '29fb921b66c65cf64bb69b8e8ff89ca9'; 
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`; 
  
    try { 
      const res = await fetch(url); 
      const data = await res.json(); 
      setResults(data.results.slice(0, 5)); 
      setSearchSubmitted(true); 
    } catch (err) { 
      console.error('Error fetching movie data:', err); 
    } 
  }; 
  
  const handleAdd = (movie) => { 
    const posterUrl = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
      : null; 
  
    const newMovie = { 
      id: movie.id, 
      title: movie.title, 
      poster: posterUrl, 
      tmdbRating: movie.vote_average, 
      watched: false, 
      userRating: 0 
    }; 
  // Search
    onAdd(newMovie); 
    setQuery(''); 
    setResults([]); 
    setSearchSubmitted(false); 
  }; 
  // Edit search
  const handleEditSearch = () => { 
    setSearchSubmitted(false); 
  }; 
// Enter key to search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
  };
  
  return ( 
    <div style={{ marginBottom: '20px' }}> 
      {!searchSubmitted ? ( 
        <> 
          <input 
            type="text" 
            placeholder="Search for movies..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            onKeyDown={handleKeyDown}
            style={{ padding: '8px', width: '300px', marginRight: '10px' }} 
          /> 
          <button onClick={handleSearch} style={{ padding: '8px 12px' }}> 
            Submit 
          </button> 
        </> 
      ) : ( 
        <> 
          <button onClick={handleEditSearch} style={{ padding: '8px 12px', marginBottom: '10px' }}> 
            <i className="fas fa-edit"></i> Edit Search 
          </button> 
  
          {results.length > 0 && ( 
            <ul style={{ listStyle: 'none', padding: 0 }}> 
              {results.map((movie) => ( 
                <li key={movie.id} style={{ 
                  display: 'flex',
                  alignItems: 'center', 
                  marginBottom: '20px', 
                  backgroundColor: '#1e1e1e', 
                  padding: '10px', 
                  borderRadius: '8px' 
                }}> 
                  {movie.poster_path && ( 
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                      alt={movie.title} 
                      style={{ width: '80px', height: '120px', marginRight: '16px', borderRadius: '4px' }} 
                    /> 
                  )} 
                  <div style={{ flex: 1 }}> 
                    <h3 style={{ margin: 0 }}>{movie.title}</h3> 
                    <p style={{ margin: '4px 0', fontSize: '0.9em', color: '#ccc' }}> 
                      TMDb Rating: {movie.vote_average} / 10 
                    </p> 
                  </div> 
                  <button 
                    onClick={() => handleAdd(movie)} 
                    style={{ 
                      backgroundColor: '#4caf50', 
                      color: '#fff', 
                      border: 'none', 
                      padding: '8px 12px', 
                      borderRadius: '4px', 
                      cursor: 'pointer' 
                    }} 
                  > 
                    <i className="fas fa-plus"></i> Add 
                  </button> 
                </li> 
              ))} 
            </ul> 
          )} 
        </> 
      )} 
    </div> 
  ); 
} 
  
export default MovieSearch; 