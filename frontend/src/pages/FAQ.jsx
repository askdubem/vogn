import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from './FAQ.module.css';

const FAQS = [
  { q: 'How long does delivery take?', c: 'Lagos deliveries take 1–2 business days. Deliveries to other states take 3–5 business days. Orders are processed within 24 hours on business days.' },
  { q: 'What are the shipping fees?', c: 'Lagos delivery costs ₦1,500. Nationwide delivery costs ₦3,500. Orders above ₦50,000 qualify for free shipping automatically.' },
  { q: 'What payment methods do you accept?', c: 'We accept card payments, bank transfers, and USSD via Paystack and Flutterwave. You can also place orders directly via WhatsApp.' },
  { q: 'Can I return or exchange an item?', c: 'Yes — we accept returns within 7 days of delivery for unworn, unwashed items with tags still attached. Sale items and accessories are final sale. See our Return Policy for full details.' },
  { q: 'How do I know what size to order?', c: 'Each product page includes size information. Our sizes run XS to XXL. If you\'re between sizes, we recommend sizing up. You can also WhatsApp us for sizing advice before ordering.' },
  { q: 'Do you ship outside Nigeria?', c: 'Not at the moment. We currently deliver to all 36 states and FCT within Nigeria. International shipping may be available in the future.' },
  { q: 'How do I track my order?', c: 'Once your order is dispatched, you\'ll receive a tracking number via email or SMS. You can also check your order status in the Orders section of your account.' },
  { q: 'Can I change or cancel my order?', c: 'Orders can be modified or cancelled within 2 hours of placement. After that, the order may already be processed. Contact us immediately via WhatsApp if you need to make changes.' },
  { q: 'Are your products authentic?', c: 'Absolutely. Every VŌGN product is designed and quality-checked by our team. We don\'t sell replicas or third-party brands — only original VŌGN pieces.' },
  { q: 'How do I care for my VŌGN items?', c: 'Care instructions are printed on each item\'s label. In general: cold machine wash, no bleach, hang dry or low tumble dry. Avoid ironing directly on prints or graphics.' },
];

const FAQItem = ({ q, c }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
      <button className={styles.question} onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{q}</span>
        <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && <p className={styles.answer}>{c}</p>}
    </div>
  );
};

const FAQPage = () => (
  <>
    <Helmet><title>FAQ — VŌGN</title></Helmet>
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.sub}>Everything you need to know about VŌGN. Can't find your answer? <Link to="/contact">Contact us</Link>.</p>
        </div>
        <div className={styles.list}>
          {FAQS.map((f, i) => <FAQItem key={i} {...f} />)}
        </div>
        <div className={styles.cta}>
          <p>Still have questions?</p>
          <a href="https://wa.me/2348021136693" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </>
);

export default FAQPage;
