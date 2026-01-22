import React, { useState, useEffect } from 'react';
import { getPrediction } from '../api/api';
import './Predictions.css';

const Predictions = () => {
    const [symbol, setSymbol] = useState('AAPL');
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const symbols = [
        { value: 'AAPL', label: 'Apple', icon: '🍎' },
        { value: 'GOOGL', label: 'Alphabet', icon: '🔍' },
        { value: 'MSFT', label: 'Microsoft', icon: '💻' },
        { value: 'AMZN', label: 'Amazon', icon: '📦' },
        { value: 'META', label: 'Meta', icon: '👥' },
    ];

    const fetchPrediction = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPrediction(symbol);
            setPrediction(data);
        } catch (err) {
            setError('Failed to fetch prediction. Make sure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrediction();
    }, [symbol]);

    return (
        <div className="predictions">
            <header className="predictions__header">
                <div className="predictions__badge">
                    <i className="bi bi-cpu-fill"></i>
                    AI Powered
                </div>
                <h1 className="predictions__title">Stock Predictions</h1>
                <p className="predictions__subtitle">ML-powered trend analysis using LSTM and XGBoost models.</p>
            </header>

            <div className="predictions__selector">
                <div className="predictions__selector-header">
                    <i className="bi bi-search"></i>
                    Select Stock
                </div>
                <div className="predictions__symbols">
                    {symbols.map((s) => (
                        <button
                            key={s.value}
                            className={`predictions__symbol-btn ${symbol === s.value ? 'predictions__symbol-btn--active' : ''}`}
                            onClick={() => setSymbol(s.value)}
                        >
                            <span className="predictions__symbol-icon">{s.icon}</span>
                            <span className="predictions__symbol-name">{s.value}</span>
                        </button>
                    ))}
                </div>
                <button
                    onClick={fetchPrediction}
                    className="predictions__refresh-btn"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <i className="bi bi-arrow-repeat predictions__spin"></i>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-lightning-charge-fill"></i>
                            Get Prediction for {symbol}
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="predictions__error">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    {error}
                </div>
            )}

            {prediction && !error && (
                <div className="predictions__result-card fade-in">
                    <div className="result-header">
                        <span className="result-symbol">{prediction.symbol || symbol}</span>
                        <span className="result-date">Prediction for next trading day</span>
                    </div>

                    <div className="result-grid">
                        <div className="result-item">
                            <span className="result-label">Current Price</span>
                            <span className="result-value">
                                ${prediction.current_price?.toFixed(2) || '---'}
                            </span>
                        </div>

                        <div className="result-item highlight">
                            <span className="result-label">Predicted Price</span>
                            <span className="result-value">
                                ${prediction.predicted_price?.toFixed(2) || '---'}
                            </span>
                        </div>

                        <div className="result-item">
                            <span className="result-label">Expected Change</span>
                            <span className={`result-value ${prediction.change_percent >= 0 ? 'positive' : 'negative'}`}>
                                {prediction.change_percent >= 0 ? '+' : ''}{prediction.change_percent}%
                            </span>
                        </div>

                        <div className="result-item">
                            <span className="result-label">Trend Signal</span>
                            <span className={`result-badge ${prediction.trend === 'Bullish' ? 'bullish' : prediction.trend === 'Bearish' ? 'bearish' : 'neutral'}`}>
                                {prediction.trend}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="predictions__models">
                <h3 className="predictions__models-title">
                    <i className="bi bi-diagram-3-fill"></i>
                    Our ML Models
                </h3>
                <div className="predictions__models-grid">
                    <div className="predictions__model-card">
                        <div className="predictions__model-icon predictions__model-icon--lstm">
                            <i className="bi bi-layers-fill"></i>
                        </div>
                        <h4 className="predictions__model-name">LSTM</h4>
                        <p className="predictions__model-desc">Deep learning for time-series forecasting with memory cells.</p>
                    </div>
                    <div className="predictions__model-card">
                        <div className="predictions__model-icon predictions__model-icon--xgb">
                            <i className="bi bi-tree-fill"></i>
                        </div>
                        <h4 className="predictions__model-name">XGBoost</h4>
                        <p className="predictions__model-desc">Gradient boosting for trend classification.</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Predictions;
