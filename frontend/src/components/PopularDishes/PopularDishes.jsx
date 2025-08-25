import React from 'react';
import DishCard from '../DishCard/DishCard';
import './PopularDishes.css';

const PopularDishes = ({ dishes, addToCart }) => {
  return (
    <div className="popular-dishes-section">
      <div className="section-header">
        <h2>Restaurantes Populares</h2>
        <button className="view-all-btn">Ver todos</button>
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