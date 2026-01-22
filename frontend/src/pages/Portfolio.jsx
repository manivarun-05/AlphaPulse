import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getPortfolio } from '../api/api';
import './Portfolio.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            setLoading(true);
            try {
                const data = await getPortfolio();
                setPortfolio(data);
            } catch (err) {
                console.error("Failed to fetch portfolio:", err);
                setError("Failed to load portfolio data.");
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, []);

    const chartData = portfolio ? {
        labels: portfolio.assets.map(a => a.symbol),
        datasets: [
            {
                data: portfolio.assets.map(a => a.allocation),
                backgroundColor: [
                    '#6366f1', // Indigo
                    '#10b981', // Emerald
                    '#f59e0b', // Amber
                    '#ef4444', // Red
                    '#8b5cf6', // Violet
                    '#ec4899', // Pink
                    '#06b6d4', // Cyan
                ],
                borderWidth: 0,
                hoverOffset: 4
            },
        ],
    } : null;

    const chartOptions = {
        cutout: '70%',
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#9ca3af',
                    usePointStyle: true,
                    padding: 20,
                    font: { size: 12 }
                }
            }
        }
    };

    return (
        <div className="portfolio-page">
            <header className="portfolio-header">
                <div>
                    <h1 className="portfolio-title">Your Portfolio</h1>
                    <p className="portfolio-subtitle">Real-time asset tracking and performance</p>
                </div>
                <button className="portfolio-refresh-btn" onClick={() => window.location.reload()}>
                    <i className="bi bi-arrow-clockwise"></i> Refresh
                </button>
            </header>

            {loading ? (
                <div className="portfolio-loading">
                    <div className="portfolio-spinner"></div>
                    <p>Calculating valuations...</p>
                </div>
            ) : error ? (
                <div className="portfolio-error">
                    <i className="bi bi-exclamation-triangle"></i> {error}
                </div>
            ) : (
                <div className="portfolio-content">
                    {/* Summary Cards */}
                    <div className="portfolio-summary">
                        <div className="summary-card total-balance">
                            <span className="summary-label">Total Balance</span>
                            <span className="summary-value">${portfolio.total_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            <span className="summary-change">+2.4% this month</span>
                        </div>

                        <div className="summary-card total-profit">
                            <span className="summary-label">Total Profit/Loss</span>
                            <div className="profit-group">
                                <span className={`summary-value ${portfolio.total_profit >= 0 ? 'positive' : 'negative'}`}>
                                    {portfolio.total_profit >= 0 ? '+' : ''}${portfolio.total_profit.toLocaleString()}
                                </span>
                                <span className={`summary-badge ${portfolio.total_profit >= 0 ? 'positive' : 'negative'}`}>
                                    {portfolio.total_profit_percent}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="portfolio-main">
                        {/* Assets Table */}
                        <div className="assets-section">
                            <h3 className="section-title">Holdings</h3>
                            <div className="assets-table-container">
                                <table className="assets-table">
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th>Quantity</th>
                                            <th>Avg Price</th>
                                            <th>Current</th>
                                            <th>Value</th>
                                            <th>Profit/Loss</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {portfolio.assets.map((asset) => (
                                            <tr key={asset.symbol}>
                                                <td>
                                                    <div className="asset-cell">
                                                        <div className="asset-icon">{asset.symbol[0]}</div>
                                                        <span className="asset-symbol">{asset.symbol}</span>
                                                    </div>
                                                </td>
                                                <td>{asset.quantity}</td>
                                                <td>${asset.avg_price.toFixed(2)}</td>
                                                <td className="highlight-cell">${asset.current_price.toFixed(2)}</td>
                                                <td className="bold-cell">${asset.market_value.toLocaleString()}</td>
                                                <td>
                                                    <div className={`pl-cell ${asset.profit >= 0 ? 'positive' : 'negative'}`}>
                                                        <span>{asset.profit >= 0 ? '+' : ''}${asset.profit.toFixed(2)}</span>
                                                        <span className="pl-percent">({asset.profit_percent}%)</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Allocation Chart */}
                        <div className="allocation-section">
                            <h3 className="section-title">Allocation</h3>
                            <div className="chart-container">
                                <Doughnut data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolio;
