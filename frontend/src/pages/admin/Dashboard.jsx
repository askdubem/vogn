import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { orderService } from '../../services/orders';
import { productService } from '../../services/products';
import { formatPrice } from '../../utils/formatPrice';
import styles from './Dashboard.module.css';

const StatCard = ({ label, value, icon, color }) => (
  <div className={styles.statCard}>
    <div className={styles.statIcon} style={{ background: color }}>{icon}</div>
    <div>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
    </div>
  </div>
);

const AdminDashboardPage = () => {
  const [stats,   setStats]   = useState({ orders: 0, revenue: 0, products: 0, pending: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          orderService.getAll({ limit: 5 }),
          productService.getAll({ limit: 1 }),
        ]);
        const orders = ordersRes.data.orders;
        const revenue = orders.reduce((s, o) => o.paymentStatus === 'paid' ? s + o.totalAmount : s, 0);
        const pending = orders.filter(o => o.status === 'pending').length;
        setStats({
          orders:   ordersRes.data.pagination?.total || orders.length,
          revenue,
          products: productsRes.data.pagination?.total || 0,
          pending,
        });
        setRecentOrders(orders);
      } catch { /* use zeros */ }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const STATUS_COLOR = { pending: '#856404', confirmed: '#0C5460', shipped: '#155724', delivered: '#155724', cancelled: '#721C24' };

  return (
    <>
      <Helmet><title>Dashboard — VŌGN Admin</title></Helmet>

      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSub}>Welcome back. Here's what's happening with VŌGN.</p>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <StatCard label="Total Orders"   value={loading ? '—' : stats.orders}           color="rgba(74,87,89,0.1)"   icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--iron-grey)" strokeWidth="2" strokeLinecap="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>} />
          <StatCard label="Revenue (Paid)" value={loading ? '—' : formatPrice(stats.revenue)} color="rgba(45,122,79,0.1)"  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>} />
          <StatCard label="Products"       value={loading ? '—' : stats.products}          color="rgba(42,96,144,0.1)"  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-info)" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>} />
          <StatCard label="Pending Orders" value={loading ? '—' : stats.pending}           color="rgba(184,112,32,0.1)" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} />
        </div>

        {/* Recent Orders */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Orders</h2>
            <Link to="/admin/orders" className="btn btn-outline btn-sm">View All</Link>
          </div>

          {loading ? (
            <div className={styles.tableWrap}>
              {[...Array(4)].map((_, i) => <div key={i} className={`skeleton ${styles.skRow}`} />)}
            </div>
          ) : recentOrders.length === 0 ? (
            <p className={styles.empty}>No orders yet.</p>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(o => (
                    <tr key={o._id}>
                      <td><span className={styles.orderNum}>{o.orderNumber}</span></td>
                      <td>{o.shippingAddress?.fullName || o.user?.name || 'Guest'}</td>
                      <td><strong>{formatPrice(o.totalAmount)}</strong></td>
                      <td>
                        <span className={styles.statusPill} style={{ color: STATUS_COLOR[o.status] || '#555' }}>
                          {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                        </span>
                      </td>
                      <td className={styles.dateCell}>
                        {new Date(o.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.quickActions}>
            <Link to="/admin/products" className={styles.actionCard}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              Add New Product
            </Link>
            <Link to="/admin/orders" className={styles.actionCard}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
              Manage Orders
            </Link>
            <Link to="/shop" className={styles.actionCard}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View Storefront
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
