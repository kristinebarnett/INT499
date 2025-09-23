// App.js 
import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import CartProvider from './CartProvider'; 
import Dashboard from './Dashboard'; 
import MoviesPage from './MoviesPage'; 
import CartPage from './CartPage'; 
import About from './About';
import ProfileMenu from './ProfileMenu'; 
  
function App() { 
  const [movies, setMovies] = useState(() => { 
    const stored = localStorage.getItem('streamlist-movies'); 
    return stored ? JSON.parse(stored) : []; 
  }); 
  
  useEffect(() => { 
    localStorage.setItem('streamlist-movies', JSON.stringify(movies)); 
  }, [movies]); 
  
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
    <CartProvider> 
      <Router> 
        <div style={{ 
          padding: '40px', 
          fontFamily: 'Arial, sans-serif', 
          backgroundColor: '#121212', 
          color: '#ffffff', 
          minHeight: '100vh', 
          position: 'relative' 
        }}> 
          <nav style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}> 
            <div> 
              <Link to="/" style={{ marginRight: '10px' }}>Dashboard</Link> 
              <Link to="/movies" style={{ marginRight: '10px' }}>Movies</Link> 
              <Link to="/cart" style={{ marginRight: '10px' }}>Cart</Link> 
              <Link to="/about">About</Link> 
            </div> 
            <ProfileMenu /> 
          </nav> 
  
          <Routes> 
            <Route path="/" element={<Dashboard movies={movies} />} /> 
            <Route path="/movies" element={ 
              <MoviesPage 
                onAdd={handleAddMovie} 
                movies={movies} 
                onToggleWatched={toggleWatched} 
                onRateMovie={setUserRating} 
                onDelete={deleteMovie} 
              /> 
            } /> 
            <Route path="/cart" element={<CartPage />} /> 
            <Route path="/about" element={<About />} /> 
          </Routes> 
  
          <div style={{ position: 'absolute', bottom: '20px', right: '40px' }}> 
            <button style={{ marginRight: '10px' }}>Settings</button> 
            <button style={{ marginRight: '10px' }}>Feedback</button> 
            <button>Privacy & Compliance</button> 
          </div> 
        </div> 
      </Router> 
    </CartProvider> 
  ); 
} 
  
export default App; 