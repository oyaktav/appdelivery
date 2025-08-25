import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="payment-success-page">
      <div className="success-content">
        <div className="success-animation">
          <div className="success-icon">✓</div>
          <div className="success-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>
        
        <h1>Parabéns!</h1>
        <p>Seu pedido foi realizado com sucesso!</p>
        
        <div className="order-info">
          <div className="info-item">
            <span className="info-label">Tempo estimado</span>
            <span className="info-value">25-30 min</span>
          </div>
          <div className="info-item">
            <span className="info-label">Número do pedido</span>
            <span className="info-value">#12345</span>
          </div>
        </div>

        <div className="action-buttons">
          <button className="track-btn" onClick={() => navigate('/orders')}>
            Acompanhar Pedido
          </button>
          <button className="home-btn" onClick={() => navigate('/')}>
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;