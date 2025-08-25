import React from 'react';
import DishCard from '../DishCard/DishCard';
import './PopularDishes.css';

const PopularDishes = ({ dishes, addToCart }) => {
  return (
    <div className="popular-dishes-section">
      <div className="section-header">
        <h2>Popular Dishes</h2>
        <button className="view-all-btn">View all</button>
      </div>
      
      <div className="dishes-grid">
        {dishes.map(dish => (
          <DishCard
            key={dish.id}
            dish={dish}
            onAddToCart={() => addToCart(dish, dish.restaurantName)}
            showDiscount={true}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularDishes;