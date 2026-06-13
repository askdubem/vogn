import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.css';

const MobileMenu = ({ isOpen, onClose, categories, user, onLogout }) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      {/* Drawer */}
      <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Navigation menu">

        {/* Header */}
        <div className={styles.header}>
          <Link to="/" className={styles.logo} onClick={onClose}>
            <svg width="28" height="28" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="7" fill="var(--iron-grey)" />
              <text x="16" y="23" textAnchor="middle" fontFamily="Georgia,serif" fontSize="18" fontWeight="700" fill="var(--powder-petal)">V</text>
            </svg>
            <span className={styles.wordmark}>VŌGN</span>
          </Link>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className={styles.nav}>
          <NavLink to="/"     className={styles.navItem} onClick={onClose}>Home</NavLink>
          <NavLink to="/shop" className={styles.navItem} onClick={onClose}>Shop All</NavLink>

          {/* Categories */}
          <div className={styles.categorySection}>
            <p className={styles.sectionLabel}>Categories</p>
            <div className={styles.categoryGrid}>
              {categories.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className={styles.categoryItem}
                  onClick={onClose}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/about"   className={styles.navItem} onClick={onClose}>About</NavLink>
          <NavLink to="/contact" className={styles.navItem} onClick={onClose}>Contact</NavLink>
          <NavLink to="/faq"     className={styles.navItem} onClick={onClose}>FAQ</NavLink>
        </nav>

        {/* Auth Section */}
        <div className={styles.authSection}>
          {user ? (
            <>
              <Link to="/profile" className={styles.authBtn} onClick={onClose}>My Profile</Link>
              <Link to="/orders"  className={styles.authBtn} onClick={onClose}>My Orders</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className={styles.authBtn} onClick={onClose}>Admin Dashboard</Link>
              )}
              <button onClick={() => { onLogout(); onClose(); }} className={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className="btn btn-primary btn-full" onClick={onClose}>Login</Link>
              <Link to="/register" className="btn btn-outline btn-full" onClick={onClose}
                style={{ marginTop: 'var(--space-3)' }}>
                Create Account
              </Link>
            </>
          )}
        </div>

      </div>
    </>
  );
};

export default MobileMenu;
