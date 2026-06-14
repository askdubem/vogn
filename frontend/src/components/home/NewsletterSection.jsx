import { useState } from 'react';
import styles from './NewsletterSection.module.css';

const NewsletterSection = () => {
  const [email, setEmail]       = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Stay Connected</span>
          <h2 className={styles.title}>Get Early Access to New Drops</h2>
          <p className={styles.sub}>
            Be the first to know about new arrivals, exclusive offers, and VŌGN events.
            No spam — ever.
          </p>

          {submitted ? (
            <div className={styles.success}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <span>You're on the list! Watch your inbox.</span>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputWrap}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={styles.input}
                  required
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className={styles.btn}
                  disabled={loading}
                >
                  {loading ? (
                    <span className={styles.spinner} />
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              <p className={styles.privacy}>
                By subscribing you agree to our{' '}
                <a href="/privacy-policy">Privacy Policy</a>.
                Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>

        {/* Decorative element */}
        <div className={styles.deco} aria-hidden="true">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="rgba(247,225,215,0.15)" strokeWidth="1"/>
            <circle cx="100" cy="100" r="55" stroke="rgba(247,225,215,0.1)" strokeWidth="1"/>
            <circle cx="100" cy="100" r="30" fill="rgba(247,225,215,0.06)"/>
            <text x="100" y="110" textAnchor="middle" fontFamily="Georgia,serif" fontSize="36" fontWeight="700" fill="rgba(247,225,215,0.2)">V</text>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
