import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <EmptyState
          title="Your Cart is Empty"
          message="Explore our collection and add your favorite tech items."
          actionText="Start Shopping"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Shopping Cart</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Cart Item List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.map(item => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--surface-color)',
                borderRadius: 'var(--border-radius)',
                padding: '1rem',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px' }} />
              
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>{item.name}</h4>
                <div style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>${item.price.toFixed(2)}</div>
              </div>

              {/* Quantity Changer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="number"
                  min="1"
                  max={item.stockQuantity}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1, item.stockQuantity)}
                  style={{ width: '55px', padding: '0.3rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>

              {/* Subtotal */}
              <div style={{ fontWeight: 600, minWidth: '70px', textAlign: 'right' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => setDeleteTargetId(item.id)}
                style={{ background: 'none', border: 'none', color: 'var(--error-color)', cursor: 'pointer', padding: '4px' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{
          backgroundColor: 'var(--surface-color)',
          borderRadius: 'var(--border-radius)',
          padding: '1.5rem',
          border: '1px solid var(--border-color)',
          height: 'fit-content',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--muted-text-color)' }}>
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--muted-text-color)' }}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
            <span>Total</span>
            <span style={{ color: 'var(--primary-color)' }}>${cartTotal.toFixed(2)}</span>
          </div>

          <Button onClick={() => navigate('/checkout')} style={{ width: '100%', padding: '0.8rem' }}>
            Proceed to Checkout
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Remove Product"
        message="Are you sure you want to remove this item from your shopping cart?"
        onConfirm={() => {
          removeFromCart(deleteTargetId);
          setDeleteTargetId(null);
        }}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default CartPage;