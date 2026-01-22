import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Predictions from './pages/Predictions';
import Market from './pages/Market';
import Portfolio from './pages/Portfolio';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/market" element={<Market />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/settings" element={<Settings />} />
          {/* Add other routes here as needed */}
          <Route path="*" element={<div style={{ color: 'white' }}>Page not found</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
