import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import { FEATURED_PRODUCTS } from '../../utils/mockData';
import styles from './FeaturedSection.module.css';

const FeaturedSection = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Featured Pieces</h2>
            <p className={styles.sub}>Hand-picked styles for the season.</p>
          </div>
          <Link to="/shop" className="btn btn-outline">
            View All
          </Link>
        </div>

        <div className={styles.grid}>
          {FEATURED_PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
