import { Helmet } from 'react-helmet-async';
import styles from './Policy.module.css';

const RefundPolicyPage = () => (
  <>
    <Helmet><title>Return & Refund Policy — VŌGN</title></Helmet>
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Returns</p>
          <h1 className={styles.title}>Return & Refund Policy</h1>
          <p className={styles.meta}>Last updated: January 2025</p>
        </div>
        <div className={styles.body}>
          <section className={styles.section}>
            <h2>Return Window</h2>
            <p>We accept returns within 7 days of delivery for items that are unworn, unwashed, and in their original condition with all tags attached. Sale items and accessories are final sale and cannot be returned.</p>
          </section>
          <section className={styles.section}>
            <h2>Eligible Items</h2>
            <p>To be eligible for a return, your item must be in the same condition as received — unworn, unwashed, with tags still attached, and in the original packaging. Items that show signs of wear, washing, or alteration will not be accepted.</p>
          </section>
          <section className={styles.section}>
            <h2>Non-Returnable Items</h2>
            <ul className={styles.list}>
              <li>Sale or discounted items</li>
              <li>Accessories (scarves, bags, caps)</li>
              <li>Items marked as final sale</li>
              <li>Items without original tags</li>
              <li>Items damaged due to misuse</li>
            </ul>
          </section>
          <section className={styles.section}>
            <h2>How to Initiate a Return</h2>
            <p>To start a return, contact us within 7 days of receiving your order via:</p>
            <ul className={styles.list}>
              <li>Email: <a href="mailto:hello@vogn.ng">hello@vogn.ng</a></li>
              <li>WhatsApp: <a href="https://wa.me/2348021136693">+234 802 113 6693</a></li>
            </ul>
            <p>Include your order number, the item(s) you wish to return, and the reason for the return. We will provide instructions for sending the item back.</p>
          </section>
          <section className={styles.section}>
            <h2>Refund Process</h2>
            <p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, refunds are processed within 5–7 business days to your original payment method. Shipping costs are non-refundable.</p>
          </section>
          <section className={styles.section}>
            <h2>Exchanges</h2>
            <p>We offer exchanges for a different size or colour of the same item, subject to availability. To request an exchange, follow the same process as a return and specify the item you'd like instead.</p>
          </section>
          <section className={styles.section}>
            <h2>Damaged or Wrong Items</h2>
            <p>If you receive a damaged or incorrect item, please contact us immediately with photos of the item. We will arrange for a replacement or full refund at no additional cost to you.</p>
          </section>
        </div>
      </div>
    </div>
  </>
);

export default RefundPolicyPage;
