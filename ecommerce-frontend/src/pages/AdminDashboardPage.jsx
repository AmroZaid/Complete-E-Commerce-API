import React, { useState } from 'react';
import { mockProducts, mockOrders, mockCategories } from '../data/mockData';
import { Button } from '../components/common/Button';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Users, Package, ShoppingBag, DollarSign, Plus, EyeOff, CheckCircle } from 'lucide-react';

const AdminDashboardPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [selectedTab, setSelectedTab] = useState('products');
  const [deactivateTarget, setDeactivateTarget] = useState(null);
  const [newProductModal, setNewProductModal] = useState(false);

  const [newProd, setNewProd] = useState({
    name: '',
    category: mockCategories[0],
    price: '',
    stockQuantity: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&q=80'
  });

  const totalSales = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, o) => acc + o.total, 0);

  const handleToggleActive = () => {
    if (!deactivateTarget) return;
    setProducts(prev => prev.map(p => p.id === deactivateTarget.id ? { ...p, isActive: !p.isActive } : p));
    setDeactivateTarget(null);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      name: newProd.name,
      category: newProd.category,
      price: parseFloat(newProd.price) || 0,
      stockQuantity: parseInt(newProd.stockQuantity) || 0,
      description: newProd.description,
      image: newProd.image,
      isActive: true
    };
    setProducts([created, ...products]);
    setNewProductModal(false);
    setNewProd({ name: '', category: mockCategories[0], price: '', stockQuantity: '', description: '', image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&q=80' });
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Admin Control Panel</h1>
          <p style={{ color: 'var(--muted-text-color)' }}>Store metrics, catalog management, and customer order processing.</p>
        </div>
        <Button onClick={() => setNewProductModal(true)}>
          <Plus size={18} /> Add New Product
        </Button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.2rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7' }}><DollarSign size={24} /></div>
          <div><div style={{ fontSize: '0.8rem', color: 'var(--muted-text-color)' }}>Total Revenue</div><div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>${totalSales.toFixed(2)}</div></div>
        </div>
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.2rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#d97706' }}><ShoppingBag size={24} /></div>
          <div><div style={{ fontSize: '0.8rem', color: 'var(--muted-text-color)' }}>Total Orders</div><div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{orders.length}</div></div>
        </div>
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.2rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a' }}><Package size={24} /></div>
          <div><div style={{ fontSize: '0.8rem', color: 'var(--muted-text-color)' }}>Total Products</div><div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{products.length}</div></div>
        </div>
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.2rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#9333ea' }}><Users size={24} /></div>
          <div><div style={{ fontSize: '0.8rem', color: 'var(--muted-text-color)' }}>Registered Users</div><div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>24</div></div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid var(--border-color)', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setSelectedTab('products')}
          style={{ padding: '0.6rem 1.2rem', background: 'none', border: 'none', fontWeight: 600, borderBottom: selectedTab === 'products' ? '3px solid var(--primary-color)' : 'none', color: selectedTab === 'products' ? 'var(--primary-color)' : 'var(--muted-text-color)', cursor: 'pointer' }}
        >
          Product Management ({products.length})
        </button>
        <button
          onClick={() => setSelectedTab('orders')}
          style={{ padding: '0.6rem 1.2rem', background: 'none', border: 'none', fontWeight: 600, borderBottom: selectedTab === 'orders' ? '3px solid var(--primary-color)' : 'none', color: selectedTab === 'orders' ? 'var(--primary-color)' : 'var(--muted-text-color)', cursor: 'pointer' }}
        >
          Customer Orders ({orders.length})
        </button>
      </div>

      {/* Products Table */}
      {selectedTab === 'products' && (
        <div style={{ backgroundColor: 'var(--surface-color)', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1rem' }}>Product</th>
                <th style={{ padding: '1rem' }}>Category</th>
                <th style={{ padding: '1rem' }}>Price</th>
                <th style={{ padding: '1rem' }}>Stock</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)', opacity: p.isActive ? 1 : 0.5 }}>
                  <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                    <span style={{ fontWeight: 600 }}>{p.name}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>{p.category}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>${p.price.toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>{p.stockQuantity} units</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: p.isActive ? '#dcfce7' : '#fee2e2', color: p.isActive ? 'var(--success-color)' : 'var(--error-color)' }}>
                      {p.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <Button
                      variant={p.isActive ? "danger" : "outline"}
                      onClick={() => setDeactivateTarget(p)}
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                    >
                      {p.isActive ? <EyeOff size={14} /> : <CheckCircle size={14} />} {p.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Table */}
      {selectedTab === 'orders' && (
        <div style={{ backgroundColor: 'var(--surface-color)', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1rem' }}>Order ID</th>
                <th style={{ padding: '1rem' }}>Date</th>
                <th style={{ padding: '1rem' }}>Total Amount</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{o.id}</td>
                  <td style={{ padding: '1rem', color: 'var(--muted-text-color)' }}>{o.date}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>${o.total.toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: o.status === 'Delivered' ? '#dcfce7' : o.status === 'Cancelled' ? '#fee2e2' : '#fef3c7', color: o.status === 'Delivered' ? 'var(--success-color)' : o.status === 'Cancelled' ? 'var(--error-color)' : 'var(--warning-color)' }}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      style={{ padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Modal */}
      {newProductModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: 'var(--border-radius)', maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '1rem' }}>Add New Product</h2>
            <form onSubmit={handleCreateProduct}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Product Title</label>
                <input required type="text" value={newProd.name} onChange={(e) => setNewProd({ ...newProd, name: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Category</label>
                <select value={newProd.category} onChange={(e) => setNewProd({ ...newProd, category: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  {mockCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Price ($)</label>
                  <input required type="number" step="0.01" value={newProd.price} onChange={(e) => setNewProd({ ...newProd, price: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Stock Qty</label>
                  <input required type="number" value={newProd.stockQuantity} onChange={(e) => setNewProd({ ...newProd, stockQuantity: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                </div>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Description</label>
                <textarea rows="3" required value={newProd.description} onChange={(e) => setNewProd({ ...newProd, description: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
                <Button variant="outline" onClick={() => setNewProductModal(false)}>Cancel</Button>
                <Button type="submit">Create Product</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deactivate Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!deactivateTarget}
        title={deactivateTarget?.isActive ? "Deactivate Product" : "Activate Product"}
        message={`Are you sure you want to change the active visibility for "${deactivateTarget?.name}"?`}
        onConfirm={handleToggleActive}
        onCancel={() => setDeactivateTarget(null)}
      />
    </div>
  );
};

export default AdminDashboardPage;