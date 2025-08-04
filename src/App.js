import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import all components
import Navbar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import AdminDashboard from './components/AdminDashboard';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';

// Import styles
import './styles/App.css';

// Landing page component
const LandingPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? '/admin' : '/products'} replace />;
  }

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShopNetic</h1>
          <p>Your one-stop destination for amazing products</p>
          <div className="hero-actions">
            <a href="/register" className="btn btn-primary btn-large">
              Get Started
            </a>
            <a href="/login" className="btn btn-secondary btn-large">
              Sign In
            </a>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <div className="container">
          <h2>Why Choose ShopNetic?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🛍️</div>
              <h3>Wide Selection</h3>
              <p>Discover thousands of products across various categories</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast & Secure</h3>
              <p>Quick checkout process with secure payment options</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy to Use</h3>
              <p>Intuitive interface designed for the best user experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Layout
const AppLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/products" 
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 ShopNetic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Root App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
