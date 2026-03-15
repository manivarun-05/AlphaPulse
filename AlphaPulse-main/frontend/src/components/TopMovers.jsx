import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardComponents.css';
import StockModal from './StockModal';

const TopMovers = ({ movers }) => {
  const [selectedStock, setSelectedStock] = React.useState(null);
  const navigate = useNavigate();

  return (
    <div className="top-movers">
      <div className="top-movers__header">
        <h3 className="top-movers__title">
          <i className="bi bi-lightning-charge-fill top-movers__title-icon"></i>
          Top Movers
        </h3>
        <button
          className="top-movers__link"
          onClick={() => navigate('/market')}
        >
          View Market
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
      <div className="top-movers__grid">
        {movers.map((mover, index) => (
          <div
            key={index}
            className="mover-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="mover-card__header">
              <div className={`mover-card__symbol-icon ${mover.change >= 0 ? 'mover-card__symbol-icon--up' : 'mover-card__symbol-icon--down'}`}>
                {mover.symbol.substring(0, 2)}
              </div>
              <div className="mover-card__info">
                <span className="mover-card__symbol">{mover.symbol}</span>
                <span className="mover-card__company">{mover.name}</span>
              </div>
              <div className={`mover-card__badge ${mover.change >= 0 ? 'mover-card__badge--up' : 'mover-card__badge--down'}`}>
                <i className={`bi ${mover.change >= 0 ? 'bi-caret-up-fill' : 'bi-caret-down-fill'}`}></i>
                {Math.abs(mover.change).toFixed(2)}%
              </div>
            </div>
            <div className="mover-card__footer">
              <div className="mover-card__price">
                <span className="mover-card__price-label">Price</span>
                <span className="mover-card__price-value">${mover.price.toFixed(2)}</span>
              </div>
              <button
                className="mover-card__action"
                onClick={() => setSelectedStock(mover.symbol)}
                title="View Performance Graph"
              >
                <i className="bi bi-graph-up-arrow"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedStock && (
        <StockModal
          symbol={selectedStock}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  );
};

export default TopMovers;
