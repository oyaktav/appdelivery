import React from 'react';
import './PromoBanner.css';

const PromoBanner = () => {
  return (
    <div className="promo-banner">
      <div className="promo-content">
        <div className="promo-text">
          <h2>Ganhe Cupons de Desconto de Até 20%</h2>
          <p>Peça agora e aproveite ofertas exclusivas nos seus restaurantes favoritos.</p>
        </div>
        <div className="promo-image">
          <img 
            src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1" 
            alt="Promoção de comida deliciosa" 
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