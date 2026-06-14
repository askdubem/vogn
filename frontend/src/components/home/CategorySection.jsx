import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../utils/constants';
import styles from './CategorySection.module.css';

const categoryImages = {
  caps:        'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80',
  't-shirts':  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
  hoodies:     'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
  bags:        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
  accessories: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80',
  jackets:     'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
};

const CategorySection = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Find your style across our curated collections.</p>
        </div>

        <div className={styles.grid}>
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={`${styles.card} ${i === 0 ? styles.cardLarge : ''}`}
              aria-label={`Shop ${cat.label}`}
            >
              <img
                src={categoryImages[cat.slug]}
                alt={cat.label}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.overlay} aria-hidden="true" />
              <div className={styles.info}>
                <span className={styles.label}>{cat.label}</span>
                <span className={styles.arrow}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
