import { Helmet } from 'react-helmet-async';
import { formatPrice } from '../../utils/formatPrice';
import { SHIPPING_LAGOS, SHIPPING_NATIONWIDE, FREE_SHIPPING_ABOVE } from '../../utils/constants';
import styles from './Policy.module.css';

const ShippingPolicyPage = () => (
  <>
    <Helmet><title>Shipping Policy — VŌGN</title></Helmet>
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Shipping</p>
          <h1 className={styles.title}>Shipping Policy</h1>
          <p className={styles.meta}>Last updated: January 2025</p>
        </div>
        <div className={styles.body}>

          {/* Shipping rates table */}
          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <h3>Lagos Delivery</h3>
              <p className={styles.price}>{formatPrice(SHIPPING_LAGOS)}</p>
              <p>Estimated 1–2 business days</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Nationwide Delivery</h3>
              <p className={styles.price}>{formatPrice(SHIPPING_NATIONWIDE)}</p>
              <p>Estimated 3–5 business days</p>
            </div>
            <div className={styles.infoCard} style={{ background: 'rgba(176,196,177,0.2)', borderColor: 'var(--ash-grey)' }}>
              <h3>Free Shipping</h3>
              <p className={styles.price}>₦0</p>
              <p>On orders above {formatPrice(FREE_SHIPPING_ABOVE)}</p>
            </div>
          </div>

          <section className={styles.section}>
            <h2>Processing Time</h2>
            <p>Orders are processed within 24 hours on business days (Monday–Friday). Orders placed on weekends or public holidays will be processed the next business day. You will receive an email confirmation once your order is dispatched.</p>
          </section>
          <section className={styles.section}>
            <h2>Delivery Areas</h2>
            <p>We currently deliver to all 36 states and the FCT in Nigeria. International shipping is not available at this time. For bulk or wholesale orders, please contact us directly via WhatsApp or email.</p>
          </section>
          <section className={styles.section}>
            <h2>Tracking Your Order</h2>
            <p>Once your order is dispatched, you will receive a tracking number via email or SMS. You can also check your order status by logging into your VŌGN account and visiting the Orders section.</p>
          </section>
          <section className={styles.section}>
            <h2>Failed Delivery</h2>
            <p>If delivery is unsuccessful due to an incorrect address or no one being available to receive the package, our courier will attempt redelivery. After two failed attempts, the package will be returned to us and you will be contacted to arrange redelivery (additional fee may apply).</p>
          </section>
          <section className={styles.section}>
            <h2>Contact Us</h2>
            <p>For shipping enquiries, contact us at <a href="mailto:hello@vogn.ng">hello@vogn.ng</a> or WhatsApp <a href="https://wa.me/2348021136693">+234 802 113 6693</a>.</p>
          </section>
        </div>
      </div>
    </div>
  </>
);

export default ShippingPolicyPage;
