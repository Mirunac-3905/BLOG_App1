import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext"; 
import '../CSS/Subscribe.css'; // Updated CSS for the combined component

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const { setUserInfo } = useContext(UserContext); 

  const handleSubscribe = async (e) => {
    e.preventDefault();
  
    if (!email.trim()) {
      alert("Please enter an email address!");
      return;
    }
  
    setUserInfo((prev) => ({
      ...prev,
      email, 
    }));
  
    try {
      const response = await fetch("http://localhost:4000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        alert("Subscription successful!");
        setEmail(""); // Clear the email field
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      alert("An error occurred while subscribing!");
    }
  };

  const socialLinks = [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61552554885790&mibextid=ZbWKwL",
      icon: "https://img.icons8.com/bubbles/100/000000/facebook-new.png",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/girl_miss_sweety?igsh=YXEycW0weGkzMW1z",
      icon: "https://img.icons8.com/bubbles/100/000000/instagram-new.png",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/miruna321",
      icon: "https://img.icons8.com/?size=100&id=108812&format=png&color=000000",
    },
  ];

  return (

    
    <div className="subscribe-contact-container">
      {/* Subscribe Section */}
      
      <div className="subscribe-container">
        <h2>Subscribe to our Blog</h2>
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Contact Section */}
      <div className="footer-container">
        <div className="footer">
          <div className="brand">
            <h1>
              <span>Get </span>in Touch
            </h1>
          </div>
          <h2>Empowering Your Digital Journey with Innovation</h2>
          <div className="social-icon">
            {socialLinks.map((link, index) => (
              <div className="social-item" key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <img src={link.icon} alt={link.platform} />
                </a>
              </div>
            ))}
          </div>
          <p>Copyright &copy; 2025 Miruna. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
