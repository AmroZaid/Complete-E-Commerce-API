import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Shield, Search, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItemCount } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <header style={{ backgroundColor: 'var(--primary-color)', color: '#fff', position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-md)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '70px', gap: '1rem', flexWrap: 'wrap', padding: '0.5rem 1rem' }}>
        
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>
          <span style={{ color: 'var(--secondary-color)' }}>⚡</span> TechStore
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', flex: 1, minWidth: '220px', maxWidth: '400px' }}>
          <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 2.2rem 0.45rem 0.8rem',
                borderRadius: 'var(--border-radius)',
                border: 'none',
                outline: 'none',
                fontSize: '0.85rem'
              }}
            />
            <button type="submit" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer' }}>
              <Search size={16} />
            </button>
          </div>
        </form>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '0.9rem' }}>
          <Link to="/products" style={{ color: '#fff', fontWeight: 500 }}>Products</Link>
          
          {/* Cart Icon with Counter */}
          <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: '#fff' }}>
            <ShoppingCart size={20} />
            {totalItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                backgroundColor: 'var(--secondary-color)',
                color: '#000',
                borderRadius: '50%',
                padding: '2px 5px',
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}>
                {totalItemCount}
              </span>
            )}
          </Link>

          {/* User / Admin Links */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              {isAdmin && (
                <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '6px', color: 'var(--secondary-color)', fontWeight: 600, fontSize: '0.8rem' }}>
                  <Shield size={14} /> Admin
                </Link>
              )}
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fff' }}>
                <User size={16} /> {user.name.split(' ')[0]}
              </Link>
              <button onClick={logout} title="Logout" style={{ background: 'none', border: 'none', color: '#ff6b6b', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <Link to="/login" style={{ color: '#fff', fontWeight: 500 }}>Login</Link>
              <Link to="/register" style={{ backgroundColor: 'var(--secondary-color)', color: '#000', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;