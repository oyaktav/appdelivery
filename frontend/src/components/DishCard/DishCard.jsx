import React, { useState } from 'react';
import './DishCard.css';

const DishCard = ({ dish, onAddToCart, showDiscount = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ⭐
      </span>
    ));
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="dish-card">
      {showDiscount && (
        <div className="discount-badge">15% OFF</div>
      )}
      
      <div className="dish-image-container">
        <img 
          src={dish.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'} 
          alt={dish.name}
          className="dish-image"
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="dish-content">
        <div className="dish-rating">
          <div className="stars">
            {renderStars()}
          </div>
        </div>
        
        <h3 className="dish-name">{dish.name}</h3>
        <p className="dish-restaurant">{dish.restaurantName}</p>
        
        <div className="dish-footer">
          <div className="dish-price">
            <span className="currency">R$</span>
            <span className="amount">{parseFloat(dish.price).toFixed(2)}</span>
          </div>
          
          <button className="add-to-cart-btn" onClick={onAddToCart}>
            <span className="cart-icon">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;