import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockProducts, mockCategories } from '../data/mockData';
import { ProductCard } from '../components/products/ProductCard';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [priceSort, setPriceSort] = useState('none');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter(p => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              p.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStock = inStockOnly ? p.stockQuantity > 0 : true;
        return matchesCategory && matchesSearch && matchesStock;
      })
      .sort((a, b) => {
        if (priceSort === 'low-high') return a.price - b.price;
        if (priceSort === 'high-low') return b.price - a.price;
        return 0;
      });
  }, [selectedCategory, searchTerm, priceSort, inStockOnly]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setPriceSort('none');
    setInStockOnly(false);
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Product Catalog</h1>

      {/* Filter Toolbar */}
      <div style={{
        backgroundColor: 'var(--surface-color)',
        padding: '1.2rem',
        borderRadius: 'var(--border-radius)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem'
      }}>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Filter by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', minWidth: '180px' }}
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
        >
          <option value="All">All Categories</option>
          {mockCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        {/* Price Sort */}
        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
        >
          <option value="none">Sort by Price</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>

        {/* In Stock Checkbox */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          In Stock Only
        </label>

        {/* Clear Filters */}
        <Button variant="outline" onClick={clearFilters} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
          Reset Filters
        </Button>
      </div>

      <p style={{ color: 'var(--muted-text-color)', marginBottom: '1rem', fontSize: '0.9rem' }}>
        Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} results
      </p>

      {/* Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No products match your criteria"
          message="Try changing the category or clearing your search keywords."
          actionText="Reset All Filters"
          actionLink="/products"
        />
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {filteredProducts.slice(0, visibleCount).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {visibleCount < filteredProducts.length && (
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Button onClick={() => setVisibleCount(prev => prev + 8)}>Load More Products</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;