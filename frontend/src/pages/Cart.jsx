import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { SHIPPING_LAGOS, FREE_SHIPPING_ABOVE } from '../utils/constants';
import styles from './Cart.module.css';

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const shipping     = totalPrice >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_LAGOS;
  const grandTotal   = totalPrice + shipping;
  const freeShipLeft = FREE_SHIPPING_ABOVE - totalPrice;

  if (items.length === 0) {
    return (
      <>
        <Helmet><title>Cart — VŌGN</title></Helmet>
        <div className={styles.empty}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="btn btn-primary btn-lg">Start Shopping</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Cart ({totalItems}) — VŌGN</title></Helmet>

      <div className={styles.page}>
        <div className="container">
          <h1 className={styles.title}>Your Cart <span className={styles.count}>({totalItems})</span></h1>

          {/* Free shipping progress */}
          {freeShipLeft > 0 && (
            <div className={styles.freeShipBanner}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              Add <strong>{formatPrice(freeShipLeft)}</strong> more for free shipping!
            </div>
          )}

          <div className={styles.layout}>

            {/* ── Cart Items ── */}
            <div className={styles.items}>
              {items.map((item, idx) => (
                <div key={`${item._id}-${item.selectedColor}-${item.selectedSize}-${idx}`} className={styles.item}>
                  <Link to={`/product/${item.slug}`} className={styles.itemImage}>
                    <img src={item.images?.[0]} alt={item.name} />
                  </Link>

                  <div className={styles.itemInfo}>
                    <Link to={`/product/${item.slug}`} className={styles.itemName}>{item.name}</Link>
                    <div className={styles.itemMeta}>
                      {item.selectedColor && (
                        <span className={styles.metaTag}>
                          <span className={styles.metaSwatch} style={{ background: item.selectedColor }} />
                        </span>
                      )}
                      {item.selectedSize && item.selectedSize !== 'One Size' && (
                        <span className={styles.metaTag}>Size: {item.selectedSize}</span>
                      )}
                    </div>

                    <div className={styles.itemBottom}>
                      {/* Quantity control */}
                      <div className={styles.qtyWrap}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item._id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                          aria-label="Decrease"
                        >−</button>
                        <span className={styles.qtyVal}>{item.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item._id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                          aria-label="Increase"
                        >+</button>
                      </div>

                      <span className={styles.itemPrice}>
                        {formatPrice((item.discountPrice || item.price) * item.quantity)}
                      </span>

                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item._id, item.selectedColor, item.selectedSize)}
                        aria-label="Remove item"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className={styles.cartActions}>
                <Link to="/shop" className="btn btn-ghost">← Continue Shopping</Link>
                <button className={`btn btn-ghost ${styles.clearBtn}`} onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>

            {/* ── Order Summary ── */}
            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping (Lagos)</span>
                  <span>{shipping === 0 ? <span style={{ color: 'var(--color-success)' }}>Free</span> : formatPrice(shipping)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                className="btn btn-primary btn-lg btn-full"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>

              <div className={styles.secureNote}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Secure checkout · Paystack & Flutterwave
              </div>

              {/* WhatsApp Order Option */}
              <a
                href="https://wa.me/2348021136693?text=Hi! I'd like to place an order"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappOrder}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Or order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
