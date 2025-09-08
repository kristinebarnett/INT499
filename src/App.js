// App.js 
import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import MovieSearch from './MovieSearch'; 
  
// Placeholder Components 
const Movies = () => <h2>Movies Page (Coming Week 4)</h2>; 
const Cart = () => <h2>Cart Page (Coming Week 4)</h2>; 
const About = () => <h2>About Page (Coming Week 5)</h2>; 
  
// Navigation Component 
const Navigation = () => ( 
  <nav style={{ marginBottom: '20px' }}> 
    <Link to="/" style={{ marginRight: '10px' }}>StreamList</Link> 
    <Link to="/movies" style={{ marginRight: '10px' }}>Movies</Link> 
    <Link to="/cart" style={{ marginRight: '10px' }}>Cart</Link> 
    <Link to="/about">About</Link> 
  </nav> 
); 
  
// StreamList Page (Homepage) 
const StreamList = ({ onAdd, movies, onToggleWatched, onRateMovie, onDelete }) => ( 
  <div> 
    {/* StreamList Title*/}
    <h1 style ={{ textAlign: 'center', fontSize: '3rem', marginBottom: '30px'}}>
      StreamList
    </h1>
    {/* Movie Finder Title*/}
    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '20px' }}>
      🎬 Movie Finder
    </h2>
    {/* Search Box*/} 
    <div style={{display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
    <MovieSearch onAdd={onAdd} /> 
    </div>
    {/* Watchlist Section*/}
    {movies.length > 0 && ( 
      <div style={{ marginTop: '40px' }}> 
        <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px'}}>
          📽️ Your Watchlist
          </h3>

          <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            padding: '0 40px',
          }} 
          >
          {movies.map(movie => ( 
            <div
            key={movie.id} 
            style={{ 
              display: 'flex',
              backgroundColor: '#1e1e1e',
              padding: '15px',
              borderRadius: '8px',
              alignItems: 'center'
              }}
              > 
              {movie.poster && ( 
                <img 
                src={movie.poster} 
                alt={movie.title} 
                style={{ width: '80px', marginRight: '20px', borderRadius: '4px' }}
                 /> 
              )} 
              <div> 
                <strong>{movie.title}</strong> 
                <div style={{ fontSize: '0.9em', color: '#ccc' }}>
                  TMDB Rating: {movie.tmdbRating}
                  </div> 
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
                <div style={{ marginTop: '8px'}}>
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
  
// Main App Component 
function App() { 
  const [movies, setMovies] = useState([]); 
  
  const handleAddMovie = (newMovie) => { 
    const movieWithExtras = { 
      ...newMovie, 
      watched: false, 
      userRating: 0 
    }; 
    setMovies((prevMovies) => [...prevMovies, movieWithExtras]); 
  }; 
  
  const toggleWatched = (id) => 
    setMovies(movies.map(movie => movie.id === id ? { ...movie, watched: !movie.watched } : movie)); 
  
  const setUserRating = (id, rating) => 
    setMovies(movies.map(movie => movie.id === id ? { ...movie, userRating: rating } : movie)); 
  
  const deleteMovie = (id) => 
    setMovies(movies.filter(movie => movie.id !== id)); 
  
  return ( 
    <Router> 
      <div style={{ 
        padding: '40px', 
        fontFamily: 'Arial, sans-serif', 
        backgroundColor: '#121212', 
        color: '#ffffff',
        minHeight: '100vh' 
      }}> 
        <Navigation /> 
        <Routes> 
          <Route 
            path="/" 
            element={ 
              <StreamList 
                onAdd={handleAddMovie} 
                movies={movies} 
                onToggleWatched={toggleWatched} 
                onRateMovie={setUserRating} 
                onDelete={deleteMovie} 
              /> 
            } 
          /> 
          <Route path="/movies" element={<Movies />} /> 
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/about" element={<About />} /> 
        </Routes> 
      </div> 
    </Router> 
  ); 
} 
  
export default App; 