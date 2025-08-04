import React, { useState } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const [loading, setLoading] = useState(false);
  const { isAdmin } = useAuth();

  const addToCart = async () => {
    setLoading(true);
    try {
      await cartAPI.add(product._id, 1);
      alert('Product added to cart successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      {product.image && (
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
      )}
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
         <span className="product-price">₹{product.price}</span>

          <span className="product-stock">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <span className="product-category">{product.category}</span>
      </div>
      
      <div className="product-actions">
        {isAdmin ? (
          <>
            <button 
              onClick={() => onEdit(product)}
              className="btn btn-secondary"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(product._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </>
        ) : (
          <button 
            onClick={addToCart}
            disabled={loading || product.stock === 0}
            className="btn btn-primary"
          >
            {loading ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
