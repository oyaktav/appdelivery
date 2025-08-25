import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = ({ cart, totalPrice, serviceFee, finalTotal, onPaymentComplete }) => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardForm, setCardForm] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const paymentMethods = [
    { id: 'cash', name: 'Dinheiro', icon: '💵' },
    { id: 'card', name: 'Cartão', icon: '💳' },
    { id: 'pix', name: 'PIX', icon: '📱' }
  ];

  const savedCards = [
    { id: 1, name: 'Master Card', number: '**** **** **** 4356', type: 'mastercard' },
    { id: 2, name: 'Visa Card', number: '**** **** **** 1234', type: 'visa' }
  ];

  const formatPrice = (price) => {
    return `R$ ${price.toFixed(2)}`;
  };

  const handleCardInputChange = (field, value) => {
    setCardForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePayment = () => {
    // Simular processamento do pagamento
    setTimeout(() => {
      onPaymentComplete();
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>Pagamento</h1>
      </div>

      <div className="payment-content">
        <div className="payment-methods">
          <h2>Método de Pagamento</h2>
          <div className="payment-options">
            {paymentMethods.map(method => (
              <button
                key={method.id}
                className={`payment-option ${selectedPayment === method.id ? 'active' : ''}`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <span className="payment-icon">{method.icon}</span>
                <span className="payment-name">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedPayment === 'card' && (
          <div className="card-section">
            <div className="saved-cards">
              <h3>Cartões Salvos</h3>
              {savedCards.map(card => (
                <div key={card.id} className="saved-card">
                  <div className="card-info">
                    <div className="card-type">
                      {card.type === 'mastercard' ? '🔴' : '🔵'}
                    </div>
                    <div className="card-details">
                      <div className="card-name">{card.name}</div>
                      <div className="card-number">{card.number}</div>
                    </div>
                  </div>
                  <input type="radio" name="selectedCard" defaultChecked={card.id === 1} />
                </div>
              ))}
            </div>

            <button 
              className="add-card-btn"
              onClick={() => setShowAddCard(!showAddCard)}
            >
              + Adicionar Cartão
            </button>

            {showAddCard && (
              <div className="add-card-form">
                <h3>Adicionar Novo Cartão</h3>
                <div className="form-group">
                  <label>Número do Cartão</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardForm.number}
                    onChange={(e) => handleCardInputChange('number', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Nome no Cartão</label>
                  <input
                    type="text"
                    placeholder="João Silva"
                    value={cardForm.name}
                    onChange={(e) => handleCardInputChange('name', e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Validade</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={cardForm.expiry}
                      onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardForm.cvv}
                      onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="order-summary">
          <h3>Resumo do Pedido</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.dish.id} className="summary-item">
                <span>{item.quantity}x {item.dish.name}</span>
                <span>{formatPrice(parseFloat(item.dish.price) * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="summary-row">
              <span>Taxa de Entrega</span>
              <span>{formatPrice(serviceFee)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Pagar {formatPrice(finalTotal)}
        </button>
      </div>
    </div>
  );
};

export default Payment;