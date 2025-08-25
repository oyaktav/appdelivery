import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      icon: '🏠',
      label: 'Início',
      path: '/',
      active: location.pathname === '/'
    },
    {
      icon: '🍽️',
      label: 'Pedidos',
      path: '/orders',
      active: location.pathname === '/orders'
    },
    {
      icon: '❤️',
      label: 'Favoritos',
      path: '/favorites',
      active: location.pathname === '/favorites'
    },
    {
      icon: '💬',
      label: 'Mensagens',
      path: '/messages',
      active: location.pathname === '/messages'
    },
    {
      icon: '📋',
      label: 'Histórico',
      path: '/history',
      active: location.pathname === '/history'
    },
    {
      icon: '💳',
      label: 'Pagamentos',
      path: '/bills',
      active: location.pathname === '/bills'
    },
    {
      icon: '⚙️',
      label: 'Configurações',
      path: '/settings',
      active: location.pathname === '/settings'
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">GoMeal.</h1>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${item.active ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        {/* Removido o card de upgrade */}
      </div>
    </div>
  );
};

export default Sidebar;