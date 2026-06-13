import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import MobileMenu from './MobileMenu';
import styles from './Navbar.module.css';

const categories = [
  { label: 'Caps',        slug: 'caps'        },
  { label: 'T-Shirts',    slug: 't-shirts'    },
  { label: 'Hoodies',     slug: 'hoodies'     },
  { label: 'Bags',        slug: 'bags'        },
  { label: 'Accessories', slug: 'accessories' },
  { label: 'Jackets',     slug: 'jackets'     },
];

const Navbar = () => {
  const { totalItems }          = useCart();
  const { user, logout }        = useAuth();
  const navigate                = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchRef   = useRef(null);

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>

          {/* ── Logo ── */}
          <Link to="/" className={styles.logo}>
            <svg width="32" height="32" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="7" fill="var(--iron-grey)" />
              <text x="16" y="23" textAnchor="middle" fontFamily="Georgia,serif" fontSize="18" fontWeight="700" fill="var(--powder-petal)">V</text>
            </svg>
            <span className={styles.wordmark}>VŌGN</span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className={styles.desktopNav}>
            <NavLink to="/shop" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
              Shop
            </NavLink>

            {/* Categories Dropdown */}
            <div className={styles.dropdownWrap} ref={dropdownRef}>
              <button
                className={styles.link}
                onClick={() => setDropdown(p => !p)}
                aria-expanded={dropdown}
                aria-haspopup="true"
              >
                Categories
                <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: 4, transition: 'transform 0.2s', transform: dropdown ? 'rotate(180deg)' : 'rotate(0)' }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
              {dropdown && (
                <div className={styles.dropdown}>
                  {categories.map(cat => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className={styles.dropdownItem}
                      onClick={() => setDropdown(false)}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/about" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
              Contact
            </NavLink>
          </nav>

          {/* ── Right Actions ── */}
          <div className={styles.actions}>

            {/* Search */}
            <div className={styles.searchWrap} ref={searchRef}>
              <button
                className={styles.iconBtn}
                onClick={() => setSearchOpen(p => !p)}
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>
              {searchOpen && (
                <form className={styles.searchBox} onSubmit={handleSearch}>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search VŌGN..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                  <button type="submit" className={styles.searchSubmit} aria-label="Submit search">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </form>
              )}
            </div>

            {/* Auth */}
            {user ? (
              <div className={styles.dropdownWrap}>
                <button className={styles.iconBtn} aria-label="Account">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                </button>
                <div className={styles.dropdown} style={{ right: 0, left: 'auto', minWidth: 160 }}>
                  <Link to="/profile"  className={styles.dropdownItem}>My Profile</Link>
                  <Link to="/orders"   className={styles.dropdownItem}>My Orders</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className={styles.dropdownItem}>Admin Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutBtn}`}>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className={styles.iconBtn} aria-label="Login">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className={styles.cartBtn} aria-label={`Cart — ${totalItems} items`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems > 99 ? '99+' : totalItems}</span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span /><span /><span />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={categories}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;
