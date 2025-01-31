import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import blog from '../CSS/blog.webp';
import '../CSS/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  function getStarted(e) {
    e.preventDefault();
    navigate('/login');
  }

 
  return (
    <div className="index-page" style={{ position: 'relative' }}>
      <div 
        className="text-content"
        style={{ position: 'fixed', top: '20%', right: '0', padding: '100px' }}
      >
        <h1>Publish your passions, your way</h1>
        <p>Create a unique and beautiful blog easily.</p>
        <Link to="/login">
          <button className="get-started-button" onClick={getStarted}>Get Started</button>
        </Link>
      </div>
    
    </div>
  );
  
}

export default HomePage;
