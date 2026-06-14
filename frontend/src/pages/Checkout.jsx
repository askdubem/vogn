import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { SHIPPING_LAGOS, SHIPPING_NATIONWIDE, FREE_SHIPPING_ABOVE } from '../utils/constants';
import styles from './Checkout.module.css';

const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
  'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba',
  'Yobe','Zamfara',
];

const CheckoutPage = () => {
  const { items, totalPrice, totalItems } = useCart();

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', address: '',
    state: '', country: 'Nigeria',
  });
  const [errors, setErrors] = useState({});

  const isLagos   = form.state === 'Lagos';
  const shipping  = totalPrice >= FREE_SHIPPING_ABOVE ? 0
    : isLagos ? SHIPPING_LAGOS : form.state ? SHIPPING_NATIONWIDE : SHIPPING_LAGOS;
  const grandTotal = totalPrice + shipping;

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())  e.fullName = 'Full name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Valid phone number required';
    if (!form.address.trim()) e.address = 'Delivery address is required';
    if (!form.state)          e.state   = 'Please select your state';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e_ = validate();
    if (Object.keys(e_).length) { setErrors(e_); return; }
    // Payment integration in Phase 29
    alert('Proceeding to payment... (Phase 29: Paystack integration)');
  };

  return (
    <>
      <Helmet><title>Checkout — VŌGN</title></Helmet>

      <div className={styles.page}>
        <div className="container">
          <h1 className={styles.title}>Checkout</h1>

          <div className={styles.layout}>

            {/* ── Form ── */}
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Delivery Information</h2>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName" name="fullName" type="text"
                    value={form.fullName} onChange={handleChange}
                    className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">Email *</label>
                    <input
                      id="email" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      placeholder="you@email.com"
                    />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      placeholder="08012345678"
                    />
                    {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="address">Delivery Address *</label>
                  <input
                    id="address" name="address" type="text"
                    value={form.address} onChange={handleChange}
                    className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
                    placeholder="12 Broad Street, Victoria Island"
                  />
                  {errors.address && <span className={styles.error}>{errors.address}</span>}
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="state">State *</label>
                    <select
                      id="state" name="state"
                      value={form.state} onChange={handleChange}
                      className={`${styles.input} ${styles.select} ${errors.state ? styles.inputError : ''}`}
                    >
                      <option value="">Select state</option>
                      {NIGERIAN_STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && <span className={styles.error}>{errors.state}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="country">Country</label>
                    <input
                      id="country" name="country" type="text"
                      value={form.country} readOnly
                      className={`${styles.input} ${styles.inputReadonly}`}
                    />
                  </div>
                </div>
              </section>

              <button type="submit" className="btn btn-primary btn-lg btn-full">
                Proceed to Payment
              </button>

              <p className={styles.secureNote}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Your information is secure. Payment powered by Paystack.
              </p>
            </form>

            {/* ── Order Summary ── */}
            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryItems}>
                {items.map((item, i) => (
                  <div key={i} className={styles.summaryItem}>
                    <div className={styles.summaryItemImg}>
                      <img src={item.images?.[0]} alt={item.name} />
                      <span className={styles.summaryQty}>{item.quantity}</span>
                    </div>
                    <div className={styles.summaryItemInfo}>
                      <p className={styles.summaryItemName}>{item.name}</p>
                      {item.selectedSize && item.selectedSize !== 'One Size' && (
                        <p className={styles.summaryItemMeta}>Size: {item.selectedSize}</p>
                      )}
                    </div>
                    <span className={styles.summaryItemPrice}>
                      {formatPrice((item.discountPrice || item.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.summaryTotals}>
                <div className={styles.summaryRow}>
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping {form.state ? `(${form.state})` : ''}</span>
                  <span>
                    {shipping === 0
                      ? <span style={{ color: 'var(--color-success)' }}>Free</span>
                      : formatPrice(shipping)}
                  </span>
                </div>
                {!form.state && (
                  <p className={styles.shippingNote}>Select your state to see exact shipping cost</p>
                )}
                <div className={`${styles.summaryRow} ${styles.grandTotal}`}>
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
