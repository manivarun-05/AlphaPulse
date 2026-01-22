import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, onToggle, isMobileOpen, onMobileClose }) => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to logout?")) {
            window.location.reload(); // Simulate logout
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
            <div className="sidebar__logo">
                <div className="sidebar__logo-icon">
                    <span>α</span>
                </div>
                <span className="sidebar__logo-text">AlphaPulse</span>
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
                        <span>M</span>
                    </div>
                    <div className="sidebar__user-info">
                        <span className="sidebar__user-name">Manivarun</span>
                        <span className="sidebar__user-email">Pro Trader</span>
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
