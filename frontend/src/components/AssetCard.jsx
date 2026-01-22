import React from 'react';
import './DashboardComponents.css';

const AssetCard = ({ portfolio }) => {
    const assets = portfolio?.assets || [];

    const colors = [
        { bg: 'rgba(99, 102, 241, 0.2)', fill: '#6366f1', glow: 'rgba(99, 102, 241, 0.4)' },
        { bg: 'rgba(16, 185, 129, 0.2)', fill: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
        { bg: 'rgba(245, 158, 11, 0.2)', fill: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
        { bg: 'rgba(239, 68, 68, 0.2)', fill: '#ef4444', glow: 'rgba(239, 68, 68, 0.4)' },
    ];

    return (
        <div className="asset-container">
            <div className="asset-header">
                <h3 className="asset-title">
                    <i className="bi bi-pie-chart-fill asset-title-icon"></i>
                    Your Assets
                </h3>
            </div>
            <div className="asset-card">
                {assets.length === 0 ? (
                    <div className="asset-empty">
                        <div className="asset-empty-icon">
                            <i className="bi bi-inbox"></i>
                        </div>
                        <p className="asset-empty-text">No assets in portfolio</p>
                        <button className="asset-empty-btn">
                            <i className="bi bi-plus-lg"></i>
                            Add Assets
                        </button>
                    </div>
                ) : (
                    <div className="asset-list">
                        {assets.map((asset, index) => {
                            const color = colors[index % colors.length];
                            return (
                                <div
                                    key={index}
                                    className="asset-item"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="asset-item-left">
                                        <div
                                            className="asset-icon"
                                            style={{ background: color.bg }}
                                        >
                                            <span style={{ color: color.fill }}>{asset.symbol.substring(0, 2)}</span>
                                        </div>
                                        <div className="asset-info">
                                            <span className="asset-symbol">{asset.symbol}</span>
                                            <span className="asset-alloc-text">{asset.allocation}% allocation</span>
                                        </div>
                                    </div>
                                    <div className="asset-bar-container">
                                        <div
                                            className="asset-bar-fill"
                                            style={{
                                                width: `${asset.allocation}%`,
                                                background: `linear-gradient(90deg, ${color.fill} 0%, ${color.glow} 100%)`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssetCard;
