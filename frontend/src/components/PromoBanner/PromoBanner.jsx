import React from 'react';
import './PromoBanner.css';

const PromoBanner = () => {
  return (
    <div className="promo-banner">
      <div className="promo-content">
        <div className="promo-text">
          <h2>Get Discount Voucher Up To 20%</h2>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="promo-image">
          <img 
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1" 
            alt="Delicious food promotion" 
          />
          <div className="promo-decoration">
            <span className="decoration-emoji">🎉</span>
            <span className="decoration-emoji">🍔</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;