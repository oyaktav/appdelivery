import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PromoBanner from '../../components/PromoBanner/PromoBanner';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import PopularDishes from '../../components/PopularDishes/PopularDishes';
import RecentOrders from '../../components/RecentOrders/RecentOrders';
import './Dashboard.css';

const Dashboard = ({ restaurants, searchTerm, selectedCategory, onCategoryChange, addToCart }) => {
  const [allDishes, setAllDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllDishes();
  }, [restaurants]);

  const fetchAllDishes = async () => {
    try {
      setLoading(true);
      const allDishesData = [];
      
      for (const restaurant of restaurants) {
        const response = await axios.get(`http://127.0.0.1:8000/api/restaurants/${restaurant.id}/dishes/`);
        const dishesWithRestaurant = response.data.map(dish => ({
          ...dish,
          restaurantName: restaurant.name,
          restaurantId: restaurant.id
        }));
        allDishesData.push(...dishesWithRestaurant);
      }
      
      setAllDishes(allDishesData);
    } catch (error) {
      console.error('Erro ao buscar pratos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDishes = allDishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dish.restaurantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dish.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const popularDishes = filteredDishes.slice(0, 6);
  const recentDishes = filteredDishes.slice(-6);

  if (loading) {
    return <div className="loading">Loading delicious food...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <PromoBanner />
        
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
        
        <PopularDishes 
          dishes={popularDishes}
          addToCart={addToCart}
        />
        
        <RecentOrders 
          dishes={recentDishes}
          addToCart={addToCart}
        />
      </div>
    </div>
  );
};

export default Dashboard;