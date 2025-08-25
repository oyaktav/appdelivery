import React from 'react';
import './RecentOrders.css';

const RecentOrders = ({ dishes, addToCart }) => {
  const formatPrice = (price) => {
    return `R$ ${parseFloat(price).toFixed(2)}`;
  };

  return (
    <div className="recent-orders-section">
      <div className="section-header">
        <h2>Recent Order</h2>
        <button className="view-all-btn">View all</button>
      </div>
      
      <div className="recent-orders-grid">
        {dishes.map(dish => (
          <div key={dish.id} className="recent-order-item">
            <div className="order-image">
              <img 
                src={dish.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1'} 
                alt={dish.name}
              />
            </div>
            <div className="order-details">
              <h4 className="order-name">{dish.name}</h4>
              <div className="order-price">{formatPrice(dish.price)}</div>
              <div className="order-meta">
                <span className="order-time">4.57 km • 21 min</span>
              </div>
            </div>
            <button 
              className="reorder-btn"
              onClick={() => addToCart(dish, dish.restaurantName)}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;