import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { orderService } from '../../services/orders';
import { formatPrice } from '../../utils/formatPrice';
import styles from './AdminTable.module.css';

const STATUSES = ['pending','confirmed','processing','shipped','delivered','cancelled','refunded'];
const STATUS_COLORS = { pending:'#856404', confirmed:'#0C5460', processing:'#004085', shipped:'#155724', delivered:'#155724', cancelled:'#721C24', refunded:'#383D41' };

const AdminOrdersPage = () => {
  const [orders,   setOrders]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [filter,   setFilter]   = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await orderService.getAll({ limit: 100, ...(filter ? { status: filter } : {}) });
      setOrders(data.orders);
    } catch { toast.error('Failed to load orders'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [filter]);

  const handleStatusChange = async (id, status) => {
    setUpdating(id);
    try {
      await orderService.updateStatus(id, status);
      toast.success(`Order marked as ${status}`);
      load();
      if (selected?._id === id) setSelected(o => ({ ...o, status }));
    } catch { toast.error('Update failed'); }
    finally { setUpdating(null); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this order? This cannot be undone.')) return;
    try { await orderService.delete(id); toast.success('Order deleted'); load(); setSelected(null); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <>
      <Helmet><title>Orders — VŌGN Admin</title></Helmet>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Orders</h1>
            <p className={styles.pageSub}>{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)} className={styles.filterSelect}>
            <option value="">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>

        <div className={styles.splitLayout}>
          {/* Orders Table */}
          <div className={styles.tableSection}>
            {loading ? (
              <div className={styles.loadWrap}>{[...Array(5)].map((_,i) => <div key={i} className={`skeleton ${styles.skRow}`} />)}</div>
            ) : (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Payment</th><th>Date</th></tr></thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o._id} className={`${styles.clickRow} ${selected?._id === o._id ? styles.selectedRow : ''}`} onClick={() => setSelected(o)}>
                        <td><span className={styles.productSlug}>{o.orderNumber}</span></td>
                        <td>{o.shippingAddress?.fullName || 'Guest'}</td>
                        <td><strong>{formatPrice(o.totalAmount)}</strong></td>
                        <td><span className={styles.statusPill} style={{ color: STATUS_COLORS[o.status] }}>{o.status}</span></td>
                        <td><span className={o.paymentStatus === 'paid' ? styles.paidBadge : styles.unpaidBadge}>{o.paymentStatus}</span></td>
                        <td className={styles.dateCell}>{new Date(o.createdAt).toLocaleDateString('en-NG', { day:'numeric', month:'short' })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Order Detail Panel */}
          {selected && (
            <div className={styles.detailPanel}>
              <div className={styles.detailHeader}>
                <div>
                  <h3 className={styles.detailTitle}>{selected.orderNumber}</h3>
                  <p className={styles.detailSub}>{new Date(selected.createdAt).toLocaleDateString('en-NG', { day:'numeric', month:'long', year:'numeric' })}</p>
                </div>
                <button className={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
              </div>

              {/* Customer */}
              <div className={styles.detailSection}>
                <p className={styles.detailLabel}>Customer</p>
                <p className={styles.detailVal}>{selected.shippingAddress?.fullName}</p>
                <p className={styles.detailMuted}>{selected.shippingAddress?.email}</p>
                <p className={styles.detailMuted}>{selected.shippingAddress?.phone}</p>
                <p className={styles.detailMuted}>{selected.shippingAddress?.address}, {selected.shippingAddress?.state}</p>
              </div>

              {/* Items */}
              <div className={styles.detailSection}>
                <p className={styles.detailLabel}>Items</p>
                {selected.items.map((item, i) => (
                  <div key={i} className={styles.detailItem}>
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice((item.discountPrice || item.price) * item.quantity)}</span>
                  </div>
                ))}
                <div className={styles.detailItem} style={{ borderTop: '1px solid var(--color-border)', marginTop: 8, paddingTop: 8 }}>
                  <span>Shipping</span><span>{formatPrice(selected.shippingFee)}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>Total</strong><strong>{formatPrice(selected.totalAmount)}</strong>
                </div>
              </div>

              {/* Status Update */}
              <div className={styles.detailSection}>
                <p className={styles.detailLabel}>Update Status</p>
                <div className={styles.statusBtns}>
                  {STATUSES.map(s => (
                    <button
                      key={s}
                      className={`${styles.statusBtn} ${selected.status === s ? styles.statusBtnActive : ''}`}
                      onClick={() => handleStatusChange(selected._id, s)}
                      disabled={updating === selected._id}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button className={`btn btn-outline ${styles.deleteOrderBtn}`} onClick={() => handleDelete(selected._id)}>
                Delete Order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminOrdersPage;
