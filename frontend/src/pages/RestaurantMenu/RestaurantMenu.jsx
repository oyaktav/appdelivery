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

  if (loading) {
    return <div className="loading">Carregando cardápio...</div>;
  }

  if (!restaurant) {
    return <div className="error">Restaurante não encontrado</div>;
  }

  return (
    <div className="restaurant-menu">
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">Início</Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">{restaurant.name}</span>
      </div>

      <div className="restaurant-header">
        <div className="restaurant-image">
          <img 
            src={restaurant.image || 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1'} 
            alt={restaurant.name}
          />
        </div>
        <div className="restaurant-info">
          <h1 className="restaurant-name">{restaurant.name}</h1>
          <p className="restaurant-description">{restaurant.description}</p>
          <div className="restaurant-meta">
            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <span>{restaurant.address || 'Endereço não informado'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">⏱️</span>
              <span>{restaurant.delivery_time} min</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">⭐</span>
              <span>4.8 (120+ avaliações)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-header">
          <h2>Cardápio</h2>
          <div className="category-filters">
            {getUniqueCategories().map(category => (
              <button
                key={category}
                className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {getCategoryDisplayName(category)}
              </button>
            ))}
          </div>
        </div>

        {filteredDishes.length === 0 ? (
          <div className="no-dishes">
            <p>Nenhum prato encontrado nesta categoria.</p>
          </div>
        ) : (
          <div className="dishes-grid">
            {filteredDishes.map(dish => (
              <DishCard
                key={dish.id}
                dish={dish}
                onAddToCart={() => addToCart(dish, restaurant.name)}
                showDiscount={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;