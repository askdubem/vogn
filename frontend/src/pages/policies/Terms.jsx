import { Helmet } from 'react-helmet-async';
import styles from './Policy.module.css';

const TermsPage = () => (
  <>
    <Helmet><title>Terms & Conditions — VŌGN</title></Helmet>
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.title}>Terms & Conditions</h1>
          <p className={styles.meta}>Last updated: January 2025</p>
        </div>
        <div className={styles.body}>
          <section className={styles.section}>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using the VŌGN website and purchasing our products, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
          </section>
          <section className={styles.section}>
            <h2>2. Products and Pricing</h2>
            <p>All prices are listed in Nigerian Naira (₦) and include applicable taxes. We reserve the right to modify prices at any time without prior notice. Product images are for illustrative purposes; slight colour variations may occur due to screen settings.</p>
          </section>
          <section className={styles.section}>
            <h2>3. Order Acceptance</h2>
            <p>Placing an order does not constitute a contract until we confirm and accept it. We reserve the right to refuse or cancel orders at our discretion, including cases of pricing errors, suspected fraud, or unavailability of stock.</p>
          </section>
          <section className={styles.section}>
            <h2>4. Payment</h2>
            <p>We accept payments via Paystack and Flutterwave. All transactions are processed securely. By providing payment details, you confirm that you are authorised to use the payment method.</p>
          </section>
          <section className={styles.section}>
            <h2>5. Intellectual Property</h2>
            <p>All content on this website, including text, images, logos, and designs, is the property of VŌGN and is protected by applicable intellectual property laws. You may not reproduce or distribute any content without our written permission.</p>
          </section>
          <section className={styles.section}>
            <h2>6. Limitation of Liability</h2>
            <p>VŌGN shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our liability is limited to the purchase price of the item(s) in question.</p>
          </section>
          <section className={styles.section}>
            <h2>7. Governing Law</h2>
            <p>These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be subject to the exclusive jurisdiction of Nigerian courts.</p>
          </section>
        </div>
      </div>
    </div>
  </>
);

export default TermsPage;
