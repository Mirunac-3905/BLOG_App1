
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';  // Importing Framer Motion
import '../CSS/Header.css';

const Header = () => {
  return (
    <div>
      <header 
        style={{ 
          position: 'fixed', 
          top: '0', 
          left: '0', 
          width: '100%', 
          backgroundColor: '#fff', 
          padding: '30px 20px', 
          zIndex: '1000', 
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1), 0 4px 15px rgba(135, 206, 235, 0.4)' 
        }}
      >
        <motion.div
          className="header-title"
          style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}
          initial={{ opacity: 0, x: -100 }}  // Initial state (out of view)
          animate={{ opacity: 1, x: 0 }}    // Final state (visible and in place)
          transition={{ duration: 1, ease: "easeOut" }}  // Animation properties
        >
          BlogVerse
        </motion.div>
        
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
          
            <li style={{ marginRight: '20px' }}><Link to="/CreateBlog">Create Blog</Link></li>
            <li style={{ marginRight: '20px' }}><Link to="/myBlogs">My Blogs</Link></li>
            <li><Link to="/Profile">Profile</Link></li>
            <li style={{ marginRight: '20px' }}><Link to="/subscribe">Subscribe</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
