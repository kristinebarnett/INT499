// Dashboard.js 
import React from 'react'; 
  
const Dashboard = ({ movies }) => { 
  const watched = movies.filter(m => m.watched); 
  const genres = {}; 
  
  watched.forEach(movie => { 
    (movie.genres || []).forEach(genre => { 
      if (!genres[genre]) genres[genre] = { count: 0 }; 
      genres[genre].count += 1; 
    }); 
  }); 
  
  return ( 
    <div> 
        <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '30px' }}>StreamList</h1> 
      <h2 style={{ fontSize: '2.5rem' }}>Dashboard</h2> 
      <p>Welcome Back!</p> 
      <p>Your Subscription: <strong>Premium</strong> | Next billing date: <strong>Sept 30, 2025</strong></p> 
  
      <h2>Recently Watched</h2> 
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}> 
        {watched.map(movie => ( 
          movie.poster && <img key={movie.id} src={movie.poster} alt={movie.title} style={{ width: '100px' }} /> 
        ))} 
      </div> 
  
      <h2>Recommended For You</h2> 
      <p>(Coming Soon: Based on watched genres)</p> 
  
      <h2>Your Watchlists</h2> 
      <ul> 
        {Object.entries(genres).map(([genre, data]) => ( 
          <li key={genre}>{genre}: {data.count} watched</li> 
        ))} 
      </ul> 
    </div> 
  ); 
}; 
  
export default Dashboard; 