import React, { useState, useEffect } from 'react';
import { cartAPI } from '../services/api';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.get();
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      alert('Error loading cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating({ ...updating, [productId]: true });
    try {
      await cartAPI.update(productId, newQuantity);
      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating quantity');
    } finally {
      setUpdating({ ...updating, [productId]: false });
    }
  };

  const removeFromCart = async (productId) => {
    if (window.confirm('Remove this item from cart?')) {
      try {
        await cartAPI.remove(productId);
        fetchCart();
      } catch (error) {
        alert(error.response?.data?.message || 'Error removing item');
      }
    }
  };

  const handleCheckout = async () => {
    if (window.confirm(`Proceed with checkout for ₹${cart.total.toFixed(2)}?`)) {
      try {
        await cartAPI.clear();
        alert('Order placed successfully! 🎉');
        fetchCart();
      } catch (error) {
        alert('Error processing order');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      
      {cart && cart.products.length > 0 ? (
        <div className="cart-content">
          <div className="cart-items">
            {cart.products.map(item => (
              <div key={item._id} className="cart-item">
                <div className="item-image">
                  {item.productId.image ? (
                    <img src={item.productId.image} alt={item.productId.name} />
                  ) : (
                    <div className="placeholder-image">📦</div>
                  )}
                </div>
                
                <div className="item-details">
                  <h3>{item.productId.name}</h3>
                  <p className="item-price">₹{item.price.toFixed(2)} each</p>


                </div>
                
                <div className="item-quantity">
                  <button 
                    onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                    disabled={updating[item.productId._id] || item.quantity <= 1}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                    disabled={updating[item.productId._id]}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <div className="item-total">
                 <p>₹{(item.price * item.quantity).toFixed(2)}</p>

                </div>
                
                <div className="item-actions">
                  <button 
                    onClick={() => removeFromCart(item.productId._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-line">
                <span>Items ({cart.products.reduce((sum, item) => sum + item.quantity, 0)})</span>
               <span>₹{cart.total.toFixed(2)}</span>

              </div>
              <div className="summary-line total">
                <span>Total</span>
                <span>₹{cart.total.toFixed(2)}</span>

              </div>
              <button 
                onClick={handleCheckout}
                className="btn btn-primary btn-large"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <a href="/products" className="btn btn-primary">
            Continue Shopping
          </a>
        </div>
      )}
    </div>
  );
};

export default Cart;
