import React from 'react';
import './DashboardComponents.css';

const StatCard = ({ title, value, subValue, icon, trend, trendValue, isMoney = false }) => {
  const isPositive = trend === 'up';

  return (
    <div className="stat-card">
      <div className="stat-card__glow"></div>
      <div className="stat-card__content">
        <div className="stat-card__header">
          <span className="stat-card__title">{title}</span>
          {icon && (
            <div className="stat-card__icon">
              <i className={`bi ${icon}`}></i>
            </div>
          )}
        </div>
        <div className="stat-card__body">
          <div className="stat-card__value">
            {isMoney && <span className="stat-card__currency">$</span>}
            {value}
          </div>
          {subValue && <div className="stat-card__sub-value">{subValue}</div>}
          {trendValue && (
            <div className={`stat-card__trend ${isPositive ? 'stat-card__trend--up' : 'stat-card__trend--down'}`}>
              <i className={`bi ${isPositive ? 'bi-arrow-up-right' : 'bi-arrow-down-right'}`}></i>
              {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{trendValue}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
