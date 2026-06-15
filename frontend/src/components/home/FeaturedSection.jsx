import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import useProducts from '../../hooks/useProducts';
import styles from './FeaturedSection.module.css';

const FeaturedSection = () => {
  const { products, loading } = useProducts({ featured: true, limit: 4 });

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Featured Pieces</h2>
            <p className={styles.sub}>Hand-picked styles for the season.</p>
          </div>
          <Link to="/shop" className="btn btn-outline">View All</Link>
        </div>

        {loading ? (
          <div className={styles.grid}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton" style={{ aspectRatio: '3/4', borderRadius: 'var(--radius-lg)' }} />
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {products.slice(0, 4).map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;
