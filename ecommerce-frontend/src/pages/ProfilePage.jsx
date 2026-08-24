import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockOrders } from '../data/mockData';
import { Button } from '../components/common/Button';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { User, Package, Lock, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateUser, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateUser({ name, phone });
    setInfoMsg('Profile details updated successfully!');
    setTimeout(() => setInfoMsg(''), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordMsg('Password changed successfully (mocked).');
    setTimeout(() => setPasswordMsg(''), 3000);
  };

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>User Account</h1>
          <p style={{ color: 'var(--muted-text-color)' }}>Manage your personal details and view recent order history.</p>
        </div>
        <Button variant="danger" onClick={() => setShowLogoutConfirm(true)}>
          <LogOut size={16} /> Logout
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Profile Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <User size={20} color="var(--primary-color)" /> Personal Details
            </h3>
            {infoMsg && <div style={{ color: 'var(--success-color)', fontSize: '0.85rem', marginBottom: '1rem' }}>{infoMsg}</div>}
            
            <form onSubmit={handleUpdateProfile}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Email (Read-Only)</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: '#f1f5f9' }}
                />
              </div>

              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                />
              </div>

              <Button type="submit" style={{ width: '100%' }}>Save Changes</Button>
            </form>
          </div>

          <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <Lock size={20} color="var(--primary-color)" /> Change Password
            </h3>
            {passwordMsg && <div style={{ color: 'var(--success-color)', fontSize: '0.85rem', marginBottom: '1rem' }}>{passwordMsg}</div>}

            <form onSubmit={handlePasswordChange}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                />
              </div>

              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>New Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                />
              </div>

              <Button variant="outline" type="submit" style={{ width: '100%' }}>Update Password</Button>
            </form>
          </div>
        </div>

        {/* Order History */}
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', height: 'fit-content', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <Package size={20} color="var(--primary-color)" /> Order History
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mockOrders.map(order => (
              <div
                key={order.id}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '1rem',
                  backgroundColor: '#f8fafc'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
                  <span>{order.id}</span>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    backgroundColor: order.status === 'Delivered' ? '#dcfce7' : order.status === 'Cancelled' ? '#fee2e2' : '#fef3c7',
                    color: order.status === 'Delivered' ? 'var(--success-color)' : order.status === 'Cancelled' ? 'var(--error-color)' : 'var(--warning-color)'
                  }}>
                    {order.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--muted-text-color)', marginBottom: '0.5rem' }}>
                  Date: {order.date} • Items: {order.items.length}
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Total Paid:</span>
                  <span style={{ color: 'var(--primary-color)' }}>${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to end your current session?"
        onConfirm={() => {
          setShowLogoutConfirm(false);
          logout();
        }}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
};

export default ProfilePage;