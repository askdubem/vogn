import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const quickLinks = [
  { label: 'Shop All',    to: '/shop'    },
  { label: 'About VŌGN', to: '/about'   },
  { label: 'Contact',     to: '/contact' },
  { label: 'FAQ',         to: '/faq'     },
];

const policyLinks = [
  { label: 'Privacy Policy',    to: '/privacy-policy'  },
  { label: 'Terms & Conditions',to: '/terms'           },
  { label: 'Shipping Policy',   to: '/shipping-policy' },
  { label: 'Refund Policy',     to: '/refund-policy'   },
];

const categoryLinks = [
  { label: 'Caps',        slug: 'caps'        },
  { label: 'T-Shirts',    slug: 't-shirts'    },
  { label: 'Hoodies',     slug: 'hoodies'     },
  { label: 'Bags',        slug: 'bags'        },
  { label: 'Accessories', slug: 'accessories' },
  { label: 'Jackets',     slug: 'jackets'     },
];

const socials = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/vogn.ng',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://tiktok.com/@vogn.ng',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.01a8.16 8.16 0 004.77 1.52V7.08a4.85 4.85 0 01-1-.39z"/>
      </svg>
    ),
  },
  {
    name: 'X',
    url: 'https://x.com/vogn_ng',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/vogn.ng',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
];

const Footer = () => {
  const handleNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      alert(`Thanks! ${email} has been added to the VŌGN list.`);
      e.target.reset();
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* ── Brand Column ── */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <svg width="36" height="36" viewBox="0 0 36 36">
              <rect width="36" height="36" rx="8" fill="var(--powder-petal)" />
              <text x="18" y="26" textAnchor="middle" fontFamily="Georgia,serif" fontSize="20" fontWeight="700" fill="var(--iron-grey)">V</text>
            </svg>
            <span className={styles.wordmark}>VŌGN</span>
          </Link>
          <p className={styles.tagline}>Lagos · Fashion</p>
          <p className={styles.desc}>
            Premium fashion for the modern Nigerian. Crafted with intention, worn with confidence.
          </p>

          {/* Social Links */}
          <div className={styles.socials}>
            {socials.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Shop Column ── */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Shop</h4>
          <ul className={styles.linkList}>
            {categoryLinks.map(c => (
              <li key={c.slug}>
                <Link to={`/category/${c.slug}`} className={styles.footerLink}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Quick Links Column ── */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Company</h4>
          <ul className={styles.linkList}>
            {quickLinks.map(l => (
              <li key={l.to}>
                <Link to={l.to} className={styles.footerLink}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <h4 className={styles.colTitle} style={{ marginTop: 'var(--space-6)' }}>Legal</h4>
          <ul className={styles.linkList}>
            {policyLinks.map(l => (
              <li key={l.to}>
                <Link to={l.to} className={styles.footerLink}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Newsletter Column ── */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Stay in the loop</h4>
          <p className={styles.newsletterDesc}>Get early access to new drops and exclusive offers.</p>
          <form className={styles.newsletterForm} onSubmit={handleNewsletter}>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className={styles.newsletterInput}
              required
            />
            <button type="submit" className={styles.newsletterBtn}>
              Subscribe
            </button>
          </form>

          <div className={styles.contact}>
            <h4 className={styles.colTitle} style={{ marginBottom: 'var(--space-3)' }}>Contact</h4>
            <a href="mailto:hello@vogn.ng" className={styles.footerLink}>hello@vogn.ng</a>
            <a href="https://wa.me/2348021136693" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
              WhatsApp: +234 802 113 6693
            </a>
          </div>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} VŌGN. All rights reserved.
          </p>
          <p className={styles.made}>
            Made with care in Lagos, Nigeria 🇳🇬
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
