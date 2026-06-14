import styles from './BrandStripSection.module.css';

const perks = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    ),
    title: 'Free Shipping',
    desc: 'On orders above ₦50,000',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Secure Payments',
    desc: 'Paystack & Flutterwave',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Nationwide Delivery',
    desc: 'Lagos & all 36 states',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'Easy Returns',
    desc: '7-day hassle-free returns',
  },
];

const BrandStripSection = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {perks.map((perk, i) => (
            <div key={i} className={styles.perk}>
              <div className={styles.icon}>{perk.icon}</div>
              <div>
                <p className={styles.title}>{perk.title}</p>
                <p className={styles.desc}>{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStripSection;
