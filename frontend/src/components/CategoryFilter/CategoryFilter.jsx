import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'Todos', icon: '🍽️' },
    { id: 'bakery', name: 'Padaria', icon: '🧁' },
    { id: 'burger', name: 'Hambúrguer', icon: '🍔' },
    { id: 'beverage', name: 'Bebidas', icon: '🥤' },
    { id: 'chicken', name: 'Frango', icon: '🍗' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'seafood', name: 'Frutos do Mar', icon: '🦐' }
  ];

  return (
    <div className="category-section">
      <div className="section-header">
        <h2>Categorias</h2>
        <button className="view-all-btn">Ver todos</button>
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