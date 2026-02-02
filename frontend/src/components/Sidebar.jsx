import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, onToggle, isMobileOpen, onMobileClose }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = (e) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to logout?")) {
            logout();
            navigate('/login');
        }
    };

    const navItems = [
        { name: 'Dashboard', path: '/', icon: 'bi-grid-1x2-fill' },
        { name: 'Predictions', path: '/predictions', icon: 'bi-cpu-fill' },
        { name: 'Market', path: '/market', icon: 'bi-graph-up-arrow' },
        { name: 'Portfolio', path: '/portfolio', icon: 'bi-wallet2' },
    ];

    return (
        <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''} ${isMobileOpen ? 'sidebar--mobile-open' : ''}`}>
            {/* Toggle Button */}
            <button className="sidebar__toggle" onClick={onToggle} aria-label="Toggle sidebar">
                <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
            </button>

            {/* Logo */}
            <div className="sidebar__logo" onClick={() => navigate('/')}>
                <div className="sidebar__logo-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 13.5L7 13.5L9 5L13 19L15 13.5L21 13.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="21" cy="13.5" r="1.5" fill="currentColor" />
                    </svg>
                </div>
                <span className="sidebar__logo-text">Alpha<span className="text-highlight">Pulse</span></span>
            </div>

            {/* Navigation */}
            <nav className="sidebar__nav">
                {navItems.map((item, index) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                        }
                        onClick={onMobileClose}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div className="sidebar__link-icon">
                            <i className={`bi ${item.icon}`}></i>
                        </div>
                        <span className="sidebar__link-text">{item.name}</span>
                        <div className="sidebar__link-indicator"></div>

                        {/* Tooltip for collapsed state */}
                        <div className="sidebar__tooltip">{item.name}</div>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom section */}
            <div className="sidebar__footer">
                <div className="sidebar__user" onClick={() => navigate('/settings')} title="Go to Settings">
                    <div className="sidebar__user-avatar">
                        <span>{user?.name?.charAt(0) || 'A'}</span>
                    </div>
                    <div className="sidebar__user-info">
                        <span className="sidebar__user-name">{user?.name || 'Alpha Trader'}</span>
                        <span className="sidebar__user-email">{user?.email || 'User'}</span>
                    </div>
                    <button className="sidebar__logout" aria-label="Logout" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
