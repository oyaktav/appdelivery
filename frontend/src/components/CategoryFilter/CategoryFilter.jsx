import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'bakery', name: 'Bakery', icon: '🧁' },
    { id: 'burger', name: 'Burger', icon: '🍔' },
    { id: 'beverage', name: 'Beverage', icon: '🥤' },
    { id: 'chicken', name: 'Chicken', icon: '🍗' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'seafood', name: 'Seafood', icon: '🦐' }
  ];

  return (
    <div className="category-section">
      <div className="section-header">
        <h2>Category</h2>
        <button className="view-all-btn">View all</button>
      </div>
      
      <div className="category-grid">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            <div className="category-icon">
              {category.icon}
            </div>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;