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
const StreamList = ({ onAdd, movies, onToggleWatched, onRateMovie }) => ( 
  <div> 
    <h1 style={{ marginBottom: '20px' }}>🎬 Movie Finder</h1> 
    <MovieSearch onAdd={onAdd} /> 
    {movies.length > 0 && ( 
      <div style={{ marginTop: '40px' }}> 
        <h2>📽️ Your Watchlist</h2> 
        <ul style={{ listStyle: 'none', padding: 0 }}> 
          {movies.map(movie => ( 
            <li key={movie.id} movie={movie} onToggleWatched={onToggleWatched} onRateMovie={onRateMovie} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}> 
              {movie.poster && ( 
                <img src={movie.poster} alt={movie.title} style={{ width: '80px', marginRight: '20px', borderRadius: '4px' }} /> 
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
                    />{' '}
                  </label>
                </div>
                <div>
                  Your Rating: {' '}
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                    key={star}
                    style={{
                      cursor: 'pointer',
                      color: star <= movie.userRating ? 'gold' : '#555',
                      fontSize: '20px'
                    }}
                    onClick={() => onRateMovie (movie.id, star)}
                    >
                      ★ 
                    </span>
                  ))}
                </div>
              </div> 
            </li> 
          ))} 
        </ul> 
      </div> 
    )} 
  </div> 
); 

function Home({ items, addItem, clearItems, toggleWatched, setUserRating }) { 
  return ( 
    <section> 
      <MovieSearch onAdd={addItem} /> 
      <button onClick={clearItems} style={{ marginBottom: '20px' }}>Clear All</button> 
      <ul style={{ padding: 0 }}> 
        {items.map((item) => ( 
          <li key={item.id} className="item-row"> 
            {item.poster && ( 
              <img 
                src={item.poster} 
                alt={item.title} 
                style={{ 
                  width: '80px', 
                  height: '120px', 
                  marginRight: '16px', 
                  borderRadius: '4px' 
                }} 
              /> 
            )} 
            <div style={{ flex: 1 }}> 
              <h3>{item.title}</h3> 
              <p>TMDb Rating: {item.tmdbRating} / 10</p> 
              <p> 
                Watched: <strong>{item.watched ? 'Yes' : 'No'}</strong> 
                <button 
                  onClick={() => toggleWatched(item.id)} 
                  style={{ marginLeft: '10px' }} 
                > 
                  Toggle 
                </button> 
              </p> 
              <div> 
                Your Rating: 
                {[1, 2, 3, 4, 5].map((star) => ( 
                  <span 
                    key={star} 
                    onClick={() => setUserRating(item.id, star)} 
                    style={{ 
                      cursor: 'pointer', 
                      color: item.userRating >= star ? '#fbbf24' : '#ccc', 
                      fontSize: '20px', 
                      marginLeft: '4px' 
                    }} 
                  > 
                    ★ 
                  </span> 
                ))} 
              </div> 
            </div> 
          </li> 
        ))} 
      </ul> 
      <p style={{ fontSize: '12px', marginTop: '40px' }}> 
        Movie data powered by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDb</a>. 
      </p> 
    </section> 
  ); 
} 
  
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
// Movie watched and user rating
  const toggleWatched = (id) => 
    setMovies(movies.map(movie => movie.id === id ? { ...movie, watched: !movie.watched } : movie)); 
  const setUserRating = (id, rating) => 
    setMovies(movies.map(movie => movie.id === id ? { ...movie, userRating: rating } : movie)); 
  
  return (
    <Router> 
      <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh' }}> 
        <Navigation /> 
        <Routes> 
          <Route path="/" element={<StreamList onAdd={handleAddMovie} movies={movies} onToggleWatched={toggleWatched} onRateMovie={setUserRating} />} /> 
          <Route path="/movies" element={<Movies />} /> 
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/about" element={<About />} /> 
        </Routes> 
      </div> 
    </Router> 
  ); 
} 
  
export default App; 