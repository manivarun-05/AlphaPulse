import React, { useState, useEffect } from 'react';
import { getMarketOverview } from '../api/api';
import StockModal from '../components/StockModal';
import './Market.css';

const Market = () => {
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);

    useEffect(() => {
        const fetchMarket = async () => {
            setLoading(true);
            try {
                const data = await getMarketOverview();
                setMarketData(data);
            } catch (err) {
                console.error("Failed to fetch market data:", err);
                setError("Unable to load market data.");
            } finally {
                setLoading(false);
            }
        };

        fetchMarket();
    }, []);

    return (
        <div className="market-page">
            <header className="market-header">
                <div className="market-header__content">
                    <h1 className="market-title">Market Overview</h1>
                    <p className="market-subtitle">Real-time performance of top market movers.</p>
                </div>
                <button className="market-refresh-btn" onClick={() => window.location.reload()}>
                    <i className="bi bi-arrow-clockwise"></i>
                    Refresh
                </button>
            </header>

            {loading ? (
                <div className="market-loading">
                    <div className="market-spinner"></div>
                    <p>Scanning market...</p>
                </div>
            ) : error ? (
                <div className="market-error">
                    <i className="bi bi-exclamation-triangle"></i>
                    {error}
                </div>
            ) : (
                <div className="market-grid">
                    {marketData.map((stock) => (
                        <div
                            key={stock.symbol}
                            className="market-card"
                            onClick={() => setSelectedStock(stock.symbol)}
                        >
                            <div className="market-card__header">
                                <div className="market-card__icon">
                                    {stock.symbol.substring(0, 1)}
                                </div>
                                <div className="market-card__info">
                                    <h3 className="market-card__symbol">{stock.symbol}</h3>
                                    <span className="market-card__name">{stock.name}</span>
                                </div>
                                <div className={`market-card__change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                                </div>
                            </div>

                            <div className="market-card__price">
                                <span className="label">Current Price</span>
                                <span className="value">${stock.price.toFixed(2)}</span>
                            </div>

                            <div className="market-card__trend">
                                <span className={`trend-badge ${stock.trend === 'Bullish' ? 'bullish' : 'bearish'}`}>
                                    {stock.trend}
                                </span>
                                <span className="click-hint">Click for Chart <i className="bi bi-arrow-right"></i></span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedStock && (
                <StockModal
                    symbol={selectedStock}
                    onClose={() => setSelectedStock(null)}
                />
            )}
        </div>
    );
};

export default Market;
