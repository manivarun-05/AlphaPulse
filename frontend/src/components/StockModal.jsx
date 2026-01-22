import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getStockHistory } from '../api/api';
import './StockModal.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const StockModal = ({ symbol, onClose }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getStockHistory(symbol);
                if (data.error) throw new Error(data.error);

                setChartData({
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Stock Price',
                            data: data.prices,
                            fill: true,
                            backgroundColor: (context) => {
                                const ctx = context.chart.ctx;
                                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                                gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)'); // Primary color
                                gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
                                return gradient;
                            },
                            borderColor: '#6366f1',
                            borderWidth: 2,
                            pointRadius: 0, // Clean line
                            pointHoverRadius: 6,
                            tension: 0.4, // Smooth curve
                        },
                    ],
                });
            } catch (err) {
                console.error(err);
                setError("Failed to load historical data.");
            } finally {
                setLoading(false);
            }
        };

        if (symbol) {
            fetchData();
        }
    }, [symbol]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(21, 26, 35, 0.9)',
                titleColor: '#9ca3af',
                bodyColor: '#f9fafb',
                titleFont: { size: 12 },
                bodyFont: { size: 14, weight: 'bold' },
                padding: 12,
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                callbacks: {
                    label: (context) => `$${context.parsed.y.toFixed(2)}`
                }
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#6b7280',
                    maxTicksLimit: 6,
                },
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#6b7280',
                    callback: (value) => `$${value}`,
                },
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    return (
        <div className="stock-modal-overlay" onClick={onClose}>
            <div className="stock-modal" onClick={(e) => e.stopPropagation()}>
                <div className="stock-modal__header">
                    <div className="stock-modal__title-group">
                        <h2 className="stock-modal__title">{symbol}</h2>
                        <span className="stock-modal__subtitle">Historical Performance (3 Months)</span>
                    </div>
                    <button className="stock-modal__close" onClick={onClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="stock-modal__content">
                    {loading && (
                        <div className="stock-modal__loading">
                            <div className="stock-modal__spinner"></div>
                            <p>Fetching market data...</p>
                        </div>
                    )}

                    {error && (
                        <div className="stock-modal__error">
                            <i className="bi bi-exclamation-circle"></i>
                            {error}
                        </div>
                    )}

                    {!loading && !error && chartData && (
                        <div className="stock-modal__chart-container">
                            <Line options={options} data={chartData} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StockModal;
