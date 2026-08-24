import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--primary-hover)', color: '#fff', padding: '2.5rem 0 1.5rem', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
        <div>
          <h3 style={{ color: 'var(--secondary-color)', marginBottom: '0.8rem' }}>⚡ TechStore</h3>
          <p style={{ color: 'var(--muted-text-color)', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Your leading provider for premium tech accessories, computing components, and smart gear.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '0.8rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', lineHeight: '2', fontSize: '0.9rem', color: 'var(--muted-text-color)' }}>
            <li><a href="/products" style={{ color: 'inherit' }}>All Products</a></li>
            <li><a href="/cart" style={{ color: 'inherit' }}>Shopping Cart</a></li>
            <li><a href="/login" style={{ color: 'inherit' }}>Account Login</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '0.8rem' }}>Contact & Info</h4>
          <p style={{ color: 'var(--muted-text-color)', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Amman, Jordan<br />
            Batman Technology Training<br />
            Built with React & Vite
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '2rem', paddingTop: '1rem', fontSize: '0.85rem', color: 'var(--muted-text-color)' }}>
        © 2026 TechStore. Mock UI Environment - Task 4.
      </div>
    </footer>
  );
};

export default Footer;