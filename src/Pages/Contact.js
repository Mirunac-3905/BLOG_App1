import React from "react";
import "../CSS/Contact.css";

const Contact = () => {
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
    <section id="footer" className="footer-container">
      <div className="footer">
        <div className="brand">
          <h1>
            <span>M</span>iruna
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
    </section>
  );
};

export default Contact;
