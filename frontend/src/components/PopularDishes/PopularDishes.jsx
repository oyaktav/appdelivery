import React from 'react';
import { Link } from 'react-router-dom';
import DishCard from '../DishCard/DishCard';
import './PopularDishes.css';

const PopularDishes = ({ restaurants, addToCart }) => {
  return (
    <div className="popular-dishes-section">
      <div className="section-header">
        <h2>Restaurantes Populares</h2>
        <button className="view-all-btn">Ver todos</button>
      </div>
      
      <div className="restaurants-grid">
        {restaurants.slice(0, 6).map(restaurant => (
          <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`} className="restaurant-card">
            <div className="restaurant-image">
              <img 
                src={restaurant.image || 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'} 
                alt={restaurant.name}
              />
              <div className="restaurant-rating">
                <span>⭐ 4.7</span>
              </div>
            </div>
            <div className="restaurant-info">
              <h3 className="restaurant-name">{restaurant.name}</h3>
              <p className="restaurant-description">{restaurant.description}</p>
              <div className="restaurant-meta">
                <span className="delivery-time">🕒 {restaurant.delivery_time} min</span>
                <span className="delivery-fee">Grátis</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularDishes;