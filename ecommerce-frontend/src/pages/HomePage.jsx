import React from 'react';
import { Link } from 'react-router-dom';
import { mockProducts, mockCategories } from '../data/mockData';
import { ProductCard } from '../components/products/ProductCard';
import { Button } from '../components/common/Button';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

const HomePage = () => {
  const featured = mockProducts.filter(p => p.isFeatured).slice(0, 4);
  const latest = mockProducts.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--primary-color)', color: '#fff', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>
            Next-Gen Hardware & Tech Gear
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Upgrade your setup with professional computing components, ergonomic keyboards, and high-performance audio.
          </p>
          <Link to="/products">
            <Button variant="secondary" style={{ padding: '0.8rem 1.6rem', fontSize: '1rem' }}>
              Explore Catalog <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Value Badges */}
      <section style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Truck color="var(--secondary-color)" /> <span>Fast Express Delivery</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ShieldCheck color="var(--secondary-color)" /> <span>2-Year Full Warranty</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <RefreshCw color="var(--secondary-color)" /> <span>30-Day Free Returns</span>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container" style={{ padding: '3rem 1rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Shop by Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {mockCategories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              style={{
                backgroundColor: 'var(--surface-color)',
                padding: '1.5rem 1rem',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--border-color)',
                textAlign: 'center',
                fontWeight: 600,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ padding: '0 1rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Featured Products</h2>
          <Link to="/products" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>View All →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section className="container" style={{ padding: '0 1rem 4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Latest Additions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {latest.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;