import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import { BESTSELLER_PRODUCTS } from '../../utils/mockData';
import styles from './BestSellersSection.module.css';

const BestSellersSection = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="section-header">
          <h2>Bestsellers</h2>
          <p>The pieces everyone keeps coming back for.</p>
        </div>

        <div className={styles.grid}>
          {BESTSELLER_PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className={styles.cta}>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Shop All Bestsellers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
