import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/product/ProductCard';
import { MOCK_PRODUCTS } from '../utils/mockData';
import { CATEGORIES } from '../utils/constants';
import styles from './Shop.module.css';

const SORT_OPTIONS = [
  { value: 'newest',    label: 'Newest'         },
  { value: 'popular',   label: 'Most Popular'    },
  { value: 'price-asc', label: 'Price: Low–High' },
  { value: 'price-desc',label: 'Price: High–Low' },
];

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort]         = useState('newest');
  const [mobileFilters, setMobileFilters] = useState(false);

  const activeCategory = searchParams.get('category') || '';
  const searchQuery    = searchParams.get('search')   || '';

  const setCategory = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug) params.set('category', slug);
    else params.delete('category');
    params.delete('search');
    setSearchParams(params);
  };

  const filtered = useMemo(() => {
    let list = [...MOCK_PRODUCTS];

    if (activeCategory) list = list.filter(p => p.category === activeCategory);
    if (searchQuery)    list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sort) {
      case 'price-asc':  list.sort((a,b) => (a.discountPrice||a.price) - (b.discountPrice||b.price)); break;
      case 'price-desc': list.sort((a,b) => (b.discountPrice||b.price) - (a.discountPrice||a.price)); break;
      case 'popular':    list.sort((a,b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));    break;
      default: break;
    }
    return list;
  }, [activeCategory, searchQuery, sort]);

  const title = activeCategory
    ? CATEGORIES.find(c => c.slug === activeCategory)?.label || 'Shop'
    : searchQuery ? `Search: "${searchQuery}"` : 'All Products';

  return (
    <>
      <Helmet>
        <title>{title} — VŌGN</title>
        <meta name="description" content="Shop the full VŌGN collection — Caps, T-Shirts, Hoodies, Bags, Accessories and Jackets." />
      </Helmet>

      <div className={styles.page}>
        {/* ── Page Header ── */}
        <div className={styles.pageHeader}>
          <div className="container">
            <h1 className={styles.pageTitle}>{title}</h1>
            <p className={styles.count}>{filtered.length} item{filtered.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="container">
          <div className={styles.layout}>

            {/* ── Sidebar Filters ── */}
            <aside className={`${styles.sidebar} ${mobileFilters ? styles.sidebarOpen : ''}`}>
              <div className={styles.sidebarHeader}>
                <h3 className={styles.sidebarTitle}>Filter</h3>
                <button className={styles.closeFilters} onClick={() => setMobileFilters(false)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Category Filter */}
              <div className={styles.filterGroup}>
                <h4 className={styles.filterLabel}>Category</h4>
                <ul className={styles.filterList}>
                  <li>
                    <button
                      className={`${styles.filterItem} ${!activeCategory ? styles.filterItemActive : ''}`}
                      onClick={() => setCategory('')}
                    >
                      All
                    </button>
                  </li>
                  {CATEGORIES.map(cat => (
                    <li key={cat.slug}>
                      <button
                        className={`${styles.filterItem} ${activeCategory === cat.slug ? styles.filterItemActive : ''}`}
                        onClick={() => setCategory(cat.slug)}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Filter placeholder */}
              <div className={styles.filterGroup}>
                <h4 className={styles.filterLabel}>Availability</h4>
                <ul className={styles.filterList}>
                  <li><button className={`${styles.filterItem} ${styles.filterItemActive}`}>In Stock</button></li>
                </ul>
              </div>
            </aside>

            {/* Mobile filter overlay */}
            {mobileFilters && (
              <div className={styles.filterOverlay} onClick={() => setMobileFilters(false)} />
            )}

            {/* ── Product Grid ── */}
            <div className={styles.main}>
              {/* Toolbar */}
              <div className={styles.toolbar}>
                <button className={styles.filterToggle} onClick={() => setMobileFilters(true)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/>
                  </svg>
                  Filters
                </button>

                <div className={styles.sortWrap}>
                  <label htmlFor="sort" className={styles.sortLabel}>Sort by</label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className={styles.sortSelect}
                  >
                    {SORT_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid */}
              {filtered.length === 0 ? (
                <div className={styles.empty}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
                    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <p>No products found.</p>
                  <button className="btn btn-outline" onClick={() => setCategory('')}>Clear filters</button>
                </div>
              ) : (
                <div className={styles.grid}>
                  {filtered.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
