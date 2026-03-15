import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import TopMovers from '../components/TopMovers';
import AssetCard from '../components/AssetCard';
import { getPortfolio } from '../api/api';
import './Dashboard.css';

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  const quotes = [
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "In investing, what is comfortable is rarely profitable.",
    "Be fearful when others are greedy and greedy when others are fearful.",
    "The stock market is a device for transferring money from the impatient to the patient.",
    "Know what you own, and know why you own it.",
    "Investing should be more like watching paint dry or watching grass grow.",
    "Don't look for the needle in the haystack. Just buy the haystack.",
    "An investment in knowledge pays the best interest.",
    "The individual investor should act consistently as an investor and not as a speculator.",
    "Buy when everyone else is selling and hold until everyone else is buying."
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    // Randomize initial quote
    setCurrentQuoteIndex(Math.floor(Math.random() * quotes.length));

    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 60000); // 1 minute

    return () => clearInterval(quoteInterval);
  }, []);

  const moversData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.50, change: 2.15 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 182.23, change: 0.90 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 436.04, change: -1.60 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 167.38, change: -0.68 },
  ];

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio();
        setPortfolio(data);
      } catch (err) {
        console.error('Failed to fetch portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const totalValue = portfolio?.total_value || 0;
  const assetsCount = portfolio?.assets?.length || 0;

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__quote-container">
          <i className="bi bi-lightning-charge-fill dashboard__quote-icon"></i>
          <span className="dashboard__quote-text">{quotes[currentQuoteIndex]}</span>
        </div>
        <h1 className="dashboard__title">Dashboard</h1>
        <p className="dashboard__subtitle">Welcome back, here is your market overview.</p>
      </header>

      <div className="dashboard__stats">
        <StatCard
          title="Total Balance"
          value={loading ? '...' : totalValue.toLocaleString()}
          subValue="Available equity"
          icon="bi-wallet2"
          isMoney={true}
        />
        <StatCard
          title="Total Profit/Loss"
          value="+0.00"
          subValue="This month"
          icon="bi-graph-up-arrow"
          trend="up"
          trendValue="0.00%"
        />
        <StatCard
          title="Holdings"
          value={loading ? '...' : assetsCount}
          subValue="Active assets"
          icon="bi-collection"
        />
      </div>

      <div className="dashboard__content">
        <div className="dashboard__main">
          <TopMovers movers={moversData} />
        </div>
        <div className="dashboard__side">
          <AssetCard portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
};

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
}

export default Dashboard;
