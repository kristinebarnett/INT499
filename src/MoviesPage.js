// MoviesPage.js 
import React from 'react'; 
import MovieSearch from './MovieSearch'; 
  
const MoviesPage = ({ onAdd, movies, onToggleWatched, onRateMovie, onDelete }) => ( 
  <div> 
    <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '20px' }}>🎬 Movie Finder</h1> 
  
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}> 
      <MovieSearch onAdd={onAdd} /> 
    </div> 
  
    {movies.length > 0 && ( 
      <div style={{ marginTop: '40px' }}> 
        <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>📽️ Your Watchlist</h3> 
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '20px', 
          padding: '0 40px', 
        }}> 
          {movies.map(movie => ( 
            <div key={movie.id} style={{ 
              display: 'flex', 
              backgroundColor: '#1e1e1e', 
              padding: '15px', 
              borderRadius: '8px', 
              alignItems: 'center' 
            }}> 
              {movie.poster && ( 
                <img src={movie.poster} alt={movie.title} 
                  style={{ width: '80px', marginRight: '20px', borderRadius: '4px' }} /> 
              )} 
              <div> 
                <strong>{movie.title}</strong> 
                <div style={{ fontSize: '0.9em', color: '#ccc' }}>TMDB Rating: {movie.tmdbRating}</div> 
                <div style={{ marginTop: '8px' }}> 
                  <label> 
                    Watched: 
                    <input 
                      type="checkbox" 
                      checked={movie.watched} 
                      onChange={() => onToggleWatched(movie.id)} 
                      style={{ marginLeft: '8px' }} 
                    /> 
                  </label> 
                </div> 
                <div style={{ marginTop: '8px' }}> 
                  Your Rating:{' '} 
                  {[1, 2, 3, 4, 5].map((star) => ( 
                    <span 
                      key={star} 
                      style={{ 
                        cursor: 'pointer', 
                        color: star <= movie.userRating ? 'gold' : '#555', 
                        fontSize: '20px' 
                      }} 
                      onClick={() => onRateMovie(movie.id, star)} 
                    > 
                      ★ 
                    </span> 
                  ))} 
                </div> 
                <button 
                  onClick={() => onDelete(movie.id)} 
                  style={{ 
                    marginTop: '10px', 
                    backgroundColor: '#ff4d4d', 
                    color: '#fff', 
                    border: 'none', 
                    padding: '6px 12px', 
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                  }} 
                > 
                  <i className="fas fa-trash-alt"></i> Delete 
                </button> 
              </div> 
            </div> 
          ))} 
        </div> 
      </div> 
    )} 
  </div> 
); 
  
export default MoviesPage; 