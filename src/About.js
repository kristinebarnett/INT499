// About.js 
import React from 'react'; 
  
const About = () => { 
  return ( 
    <div style={{ textAlign: 'center', marginTop: '60px' }}> 
      <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>📘 About Page</h2>  
      <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#888' }}> 
        This application is the best way to find new movies to watch, keep track of movies you want to watch, and watch the movies.
        The idea behind this app was to make it easier for people to remember what movies they liked, and which movies they watched. 
        We use a subscription series per person so they can choose which level they want and which one fits the best for them. 
        Our goal is to provide a easy to use application that users can use to find, watch, and track the movies they watch. 
        Welcome to our application, we hope you enjoy it! 
      </p> 
    </div> 
  ); 
}; 
  
export default About; 