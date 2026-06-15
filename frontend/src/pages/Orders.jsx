import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { orderService } from '../services/orders';
import { formatPrice } from '../utils/formatPrice';
import styles from './Orders.module.css';

const STATUS_COLORS = {
  pending:    { bg: '#FFF3CD', color: '#856404' },
  confirmed:  { bg: '#D1ECF1', color: '#0C5460' },
  processing: { bg: '#CCE5FF', color: '#004085' },
  shipped:    { bg: '#D4EDDA', color: '#155724' },
  delivered:  { bg: '#D4EDDA', color: '#155724' },
  cancelled:  { bg: '#F8D7DA', color: '#721C24' },
  refunded:   { bg: '#E2E3E5', color: '#383D41' },
};

const OrdersPage = () => {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await orderService.getAll();
        setOrders(data.orders);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return (
    <div className={styles.loading}>
      {[...Array(3)].map((_, i) => <div key={i} className={`skeleton ${styles.skeleton}`} />)}
    </div>
  );

  return (
    <>
      <Helmet><title>My Orders — VŌGN</title></Helmet>
      <div className={styles.page}>
        <div className="container">
          <h1 className={styles.title}>My Orders</h1>

          {error && <div className={styles.error}>{error}</div>}

          {orders.length === 0 ? (
            <div className={styles.empty}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
              </svg>
              <h2>No orders yet</h2>
              <p>Your order history will appear here.</p>
              <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
            </div>
          ) : (
            <div className={styles.list}>
              {orders.map(order => {
                const sc = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
                return (
                  <div key={order._id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div>
                        <p className={styles.orderNumber}>{order.orderNumber}</p>
                        <p className={styles.orderDate}>
                          {new Date(order.createdAt).toLocaleDateString('en-NG', {
                            day: 'numeric', month: 'long', year: 'numeric',
                          })}
                        </p>
                      </div>
                      <span className={styles.statusBadge} style={{ background: sc.bg, color: sc.color }}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    <div className={styles.orderItems}>
                      {order.items.slice(0, 3).map((item, i) => (
                        <div key={i} className={styles.orderItem}>
                          <div className={styles.itemImg}>
                            {item.image && <img src={item.image} alt={item.name} />}
                          </div>
                          <div className={styles.itemInfo}>
                            <p className={styles.itemName}>{item.name}</p>
                            <p className={styles.itemMeta}>
                              Qty: {item.quantity}
                              {item.selectedSize && ` · Size: ${item.selectedSize}`}
                            </p>
                          </div>
                          <p className={styles.itemPrice}>{formatPrice((item.discountPrice || item.price) * item.quantity)}</p>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <p className={styles.moreItems}>+{order.items.length - 3} more item{order.items.length - 3 > 1 ? 's' : ''}</p>
                      )}
                    </div>

                    <div className={styles.orderFooter}>
                      <p className={styles.totalLabel}>
                        Total: <strong>{formatPrice(order.totalAmount)}</strong>
                      </p>
                      <span className={`${styles.payBadge} ${order.paymentStatus === 'paid' ? styles.payBadgePaid : ''}`}>
                        {order.paymentStatus === 'paid' ? '✓ Paid' : 'Unpaid'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
