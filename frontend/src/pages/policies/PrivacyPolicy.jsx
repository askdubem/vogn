import { Helmet } from 'react-helmet-async';
import styles from './Policy.module.css';

const PrivacyPolicyPage = () => (
  <>
    <Helmet><title>Privacy Policy — VŌGN</title></Helmet>
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.meta}>Last updated: January 2025</p>
        </div>
        <div className={styles.body}>
          <section className={styles.section}>
            <h2>1. Information We Collect</h2>
            <p>When you shop at VŌGN, we collect information you provide directly to us, including your name, email address, phone number, delivery address, and payment information. We also automatically collect certain information about your device and how you interact with our website.</p>
          </section>
          <section className={styles.section}>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to process your orders, send order confirmations and shipping updates, respond to your questions and provide customer support, send promotional communications (with your consent), and improve our website and services.</p>
          </section>
          <section className={styles.section}>
            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.</p>
          </section>
          <section className={styles.section}>
            <h2>4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information. Payment processing is handled by Paystack and Flutterwave, which are PCI-DSS compliant. We never store your card details on our servers.</p>
          </section>
          <section className={styles.section}>
            <h2>5. Cookies</h2>
            <p>We use cookies to enhance your browsing experience, remember your cart contents, and analyse site traffic. You can control cookie settings through your browser preferences.</p>
          </section>
          <section className={styles.section}>
            <h2>6. Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information at any time. To exercise these rights, contact us at <a href="mailto:hello@vogn.ng">hello@vogn.ng</a>.</p>
          </section>
          <section className={styles.section}>
            <h2>7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:hello@vogn.ng">hello@vogn.ng</a> or via WhatsApp at +234 802 113 6693.</p>
          </section>
        </div>
      </div>
    </div>
  </>
);

export default PrivacyPolicyPage;
