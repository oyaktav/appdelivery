import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import RestaurantMenu from './pages/RestaurantMenu/RestaurantMenu';
import Payment from './pages/Payment/Payment';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
import OrderSidebar from './components/OrderSidebar/OrderSidebar';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isOrderSidebarOpen, setIsOrderSidebarOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [user] = useState({
    name: 'Patrícia',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    balance: 12000
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/restaurants/');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Erro ao buscar restaurantes:', error);
    }
  };

  const addToCart = (dish, restaurantName) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.dish.id === dish.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.dish.id === dish.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { dish, quantity: 1, restaurantName }];
    });
  };

  const updateQuantity = (dishId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.dish.id === dishId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (dishId) => {
    setCart(prevCart => prevCart.filter(item => item.dish.id !== dishId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleOrderSidebar = () => {
    setIsOrderSidebarOpen(!isOrderSidebarOpen);
  };

  const handleCheckout = () => {
    setIsOrderSidebarOpen(false);
    window.location.href = '/payment';
  };

  const handlePaymentComplete = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.dish.price) * item.quantity), 0);
  };

  const getServiceFee = () => {
    return getTotalPrice() * 0.1; // 10% service fee
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getServiceFee();
  };

  return (
    <Router>
      <div className="app">
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header 
            user={user}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <div className="content-wrapper">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Dashboard 
                    restaurants={restaurants}
                    searchTerm={searchTerm}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    addToCart={addToCart}
                  />
                } 
              />
              <Route 
                path="/restaurant/:id" 
                element={
                  <RestaurantMenu 
                    addToCart={addToCart}
                  />
                } 
              />
              <Route 
                path="/payment" 
                element={
                  <Payment 
                    cart={cart}
                    totalPrice={getTotalPrice()}
                    serviceFee={getServiceFee()}
                    finalTotal={getFinalTotal()}
                    onPaymentComplete={handlePaymentComplete}
                  />
                } 
              />
              <Route 
                path="/payment-success" 
                element={<PaymentSuccess />} 
              />
            </Routes>
          </div>
        </div>
        <OrderSidebar
          isOpen={isOrderSidebarOpen}
          onToggle={toggleOrderSidebar}
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          totalPrice={getTotalPrice()}
          serviceFee={getServiceFee()}
          finalTotal={getFinalTotal()}
          userBalance={user.balance}
          onCheckout={handleCheckout}
        />
        <OrderSidebar
    </Router>
  )
  );
}

export default App;