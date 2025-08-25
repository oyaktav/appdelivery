import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      icon: '🏠',
      label: 'Dashboard',
      path: '/',
      active: location.pathname === '/'
    },
    {
      icon: '🍽️',
      label: 'Food Order',
      path: '/orders',
      active: location.pathname === '/orders'
    },
    {
      icon: '❤️',
      label: 'Favorite',
      path: '/favorites',
      active: location.pathname === '/favorites'
    },
    {
      icon: '💬',
      label: 'Message',
      path: '/messages',
      active: location.pathname === '/messages'
    },
    {
      icon: '📋',
      label: 'Order History',
      path: '/history',
      active: location.pathname === '/history'
    },
    {
      icon: '💳',
      label: 'Bills',
      path: '/bills',
      active: location.pathname === '/bills'
    },
    {
      icon: '⚙️',
      label: 'Setting',
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
        <div className="upgrade-card">
          <div className="upgrade-content">
            <h3>Upgrade your Account to Get Free Voucher</h3>
            <button className="btn btn-primary upgrade-btn">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;