import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import useProducts from '../../hooks/useProducts';
import styles from './BestSellersSection.module.css';

const BestSellersSection = () => {
  const { products, loading } = useProducts({ bestseller: true, limit: 4 });

  return (
    <section className={styles.section}>
      <div className="container">
        <div className="section-header">
          <h2>Bestsellers</h2>
          <p>The pieces everyone keeps coming back for.</p>
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

        <div className={styles.cta}>
          <Link to="/shop" className="btn btn-primary btn-lg">Shop All Bestsellers</Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
