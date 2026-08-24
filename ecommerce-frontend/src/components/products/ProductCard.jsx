import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const isOutOfStock = product.stockQuantity <= 0;

  return (
    <div style={{
      backgroundColor: 'var(--surface-color)',
      borderRadius: 'var(--border-radius)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'var(--transition)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Image */}
      <Link to={`/products/${product.id}`} style={{ position: 'relative', overflow: 'hidden', height: '200px', backgroundColor: '#f1f5f9' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {isOutOfStock && (
          <span style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: 'var(--error-color)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            Out of Stock
          </span>
        )}
      </Link>

      {/* Content */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted-text-color)', textTransform: 'uppercase', fontWeight: 600 }}>
            {product.category}
          </span>
          <Link to={`/products/${product.id}`}>
            <h4 style={{ margin: '0.4rem 0', color: 'var(--text-color)', fontSize: '1rem', lineHeight: '1.4' }}>
              {product.name}
            </h4>
          </Link>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
            ${product.price.toFixed(2)}
          </span>
          
          <Button
            disabled={isOutOfStock}
            onClick={() => addToCart(product, 1)}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
          >
            <ShoppingCart size={16} /> Add
          </Button>
        </div>
      </div>
    </div>
  );
};