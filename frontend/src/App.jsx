import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Predictions from './pages/Predictions';
import Market from './pages/Market';
import Portfolio from './pages/Portfolio';
import Settings from './pages/Settings';
import Login from './pages/Login';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/predictions" element={
            <ProtectedRoute>
              <Layout>
                <Predictions />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/market" element={
            <ProtectedRoute>
              <Layout>
                <Market />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/portfolio" element={
            <ProtectedRoute>
              <Layout>
                <Portfolio />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
