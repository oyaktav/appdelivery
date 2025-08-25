import React from 'react';
import './OrderSidebar.css';

const OrderSidebar = ({ 
  isOpen, 
  onToggle, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  totalPrice, 
  serviceFee, 
  finalTotal, 
  userBalance,
  onCheckout 
}) => {
  const formatPrice = (price) => {
    return `R$ ${price.toFixed(2)}`;
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        className={`order-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
      >
        <span className="toggle-icon">🛒</span>
        <span className="toggle-text">Carrinho</span>
        {cart.length > 0 && (
          <span className="cart-count">{cart.length}</span>
        )}
      </button>

      {/* Sidebar */}
      <div className={`order-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="order-sidebar-header">
          <div className="sidebar-title">
            <h3>Carrinho</h3>
            <button className="close-btn" onClick={onToggle}>×</button>
          </div>
        </div>

        <div className="order-menu-section">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>Seu carrinho está vazio</p>
              <span>Adicione itens para começar</span>
            </div>
          ) : (
            <div className="order-items">
              {cart.map((item) => (
                <div key={item.dish.id} className="order-item">
                  <div className="item-image">
                    <img 
                      src={item.dish.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1'} 
                      alt={item.dish.name} 
                    />
                  </div>
                  <div className="item-details">
                    <h4>{item.dish.name}</h4>
                    <div className="item-price">
                      {formatPrice(parseFloat(item.dish.price))}
                    </div>
                  </div>
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn minus"
                      onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn plus"
                      onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <>
            <div className="order-summary">
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

            <div className="checkout-section">
              <button className="checkout-btn" onClick={onCheckout}>
                Finalizar Pedido • {formatPrice(finalTotal)}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Overlay */}
      {isOpen && <div className="order-sidebar-overlay" onClick={onToggle}></div>}
    </>
  );
};

export default OrderSidebar;