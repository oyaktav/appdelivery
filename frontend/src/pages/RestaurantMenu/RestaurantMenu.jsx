import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DishCard from '../../components/DishCard/DishCard';
import './RestaurantMenu.css';

const RestaurantMenu = ({ addToCart }) => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchRestaurantData();
  }, [id]);

  const fetchRestaurantData = async () => {
    try {
      setLoading(true);
      const [restaurantResponse, dishesResponse] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/restaurants/${id}/`),
        axios.get(`http://127.0.0.1:8000/api/restaurants/${id}/dishes/`)
      ]);
      
      setRestaurant(restaurantResponse.data);
      setDishes(dishesResponse.data.map(dish => ({
        ...dish,
        restaurantName: restaurantResponse.data.name
      })));
    } catch (error) {
      console.error('Erro ao buscar dados do restaurante:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUniqueCategories = () => {
    const categories = dishes.map(dish => dish.category);
    return ['all', ...new Set(categories)];
  };

  const filteredDishes = selectedCategory === 'all' 
    ? dishes 
    : dishes.filter(dish => dish.category === selectedCategory);

  const getCategoryDisplayName = (category) => {
    const categoryMap = {
      'all': 'Todos',
      'bakery': 'Padaria',
      'burger': 'Hambúrguer',
      'beverage': 'Bebidas',
      'chicken': 'Frango',
      'pizza': 'Pizza',
      'seafood': 'Frutos do Mar'
    };
    return categoryMap[category] || category;
  };

  const groupedDishes = () => {
    const groups = {};
    filteredDishes.forEach(dish => {
      const category = dish.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(dish);
    });
    return groups;
  };

  if (loading) {
    return <div className="loading">Carregando cardápio...</div>;
  }

  if (!restaurant) {
    return <div className="error">Restaurante não encontrado</div>;
  }

  return (
    <div className="restaurant-menu">
      <div className="restaurant-header">
        <button className="back-btn">
          <span>←</span>
        </button>
        <div className="restaurant-image">
          <img 
            src={restaurant.image || 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1'} 
            alt={restaurant.name}
          />
        </div>
        <div className="restaurant-info">
          <h1 className="restaurant-name">{restaurant.name}</h1>
          <div className="restaurant-rating">
            <span className="rating-stars">⭐ 4.7</span>
            <span className="rating-count">Free</span>
            <span className="delivery-time">🕒 {restaurant.delivery_time} min</span>
          </div>
        </div>
      </div>

      <div className="menu-categories">
        <div className="categories-scroll">
          {getUniqueCategories().map(category => (
            <button
              key={category}
              className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {getCategoryDisplayName(category)}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-content">
        {Object.entries(groupedDishes()).map(([category, categoryDishes]) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{getCategoryDisplayName(category)} ({categoryDishes.length})</h2>
            <div className="dishes-list">
              {categoryDishes.map(dish => (
                <div key={dish.id} className="dish-item">
                  <div className="dish-info">
                    <h3 className="dish-name">{dish.name}</h3>
                    <p className="dish-description">{dish.description}</p>
                    <div className="dish-price">R$ {parseFloat(dish.price).toFixed(2)}</div>
                  </div>
                  <div className="dish-image-container">
                    <img 
                      src={dish.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1'} 
                      alt={dish.name}
                      className="dish-image"
                    />
                    <button 
                      className="add-btn"
                      onClick={() => addToCart(dish, restaurant.name)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;