import React from 'react';
import './Header.css';

const Header = ({ user, searchTerm, onSearchChange }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="greeting">
            <h2>Hello, {user.name}</h2>
          </div>
        </div>

        <div className="header-center">
          <div className="search-container">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="What do you want eat today..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="header-actions">
            <button className="notification-btn">
              <span className="notification-icon">🔔</span>
            </button>
            
            <button className="settings-btn">
              <span className="settings-icon">⚙️</span>
            </button>

            <div className="user-profile">
              <div className="user-avatar">
                <img 
                  src={user.avatar} 
                  alt="User Avatar" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;