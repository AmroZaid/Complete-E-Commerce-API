import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/products/ProductCard';
import { Button } from '../components/common/Button';
import { ShoppingCart, Check, AlertCircle } from 'lucide-react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const product = mockProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <Link to="/products"><Button style={{ marginTop: '1rem' }}>Back to Products</Button></Link>
      </div>
    );
  }

  const isOutOfStock = product.stockQuantity <= 0;
  const relatedProducts = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        {/* Product Image */}
        <div style={{ borderRadius: 'var(--border-radius)', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: '#f8fafc' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '380px', objectFit: 'cover' }} />
        </div>

        {/* Details Column */}
        <div>
          <span style={{ textTransform: 'uppercase', color: 'var(--secondary-color)', fontWeight: 700, fontSize: '0.85rem' }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '2rem', margin: '0.5rem 0 1rem' }}>{product.name}</h1>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '1rem' }}>
            ${product.price.toFixed(2)}
          </div>
          <p style={{ color: 'var(--muted-text-color)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {product.description}
          </p>

          {/* Stock Status */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {isOutOfStock ? (
              <span style={{ color: 'var(--error-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertCircle size={18} /> Currently Out of Stock
              </span>
            ) : (
              <span style={{ color: 'var(--success-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={18} /> In Stock ({product.stockQuantity} units available)
              </span>
            )}
          </div>

          {/* Quantity and Actions */}
          {!isOutOfStock && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <label style={{ fontWeight: 600 }}>Qty:</label>
              <input
                type="number"
                min="1"
                max={product.stockQuantity}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(parseInt(e.target.value) || 1, product.stockQuantity)))}
                style={{ width: '65px', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              />
              <Button onClick={handleAdd} style={{ padding: '0.7rem 1.5rem' }}>
                <ShoppingCart size={18} /> Add to Cart
              </Button>
            </div>
          )}

          {addedSuccess && (
            <div style={{ backgroundColor: '#dcfce7', color: 'var(--success-color)', padding: '0.8rem', borderRadius: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={18} /> Successfully added {quantity} item(s) to your cart!
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Similar Items in {product.category}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;