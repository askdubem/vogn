import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice, discountPercent } from '../../utils/formatPrice';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [adding, setAdding]       = useState(false);
  const [imgError, setImgError]   = useState(false);
  const [hovered, setHovered]     = useState(false);

  const {
    _id, name, slug, price, discountPrice,
    images, colors, badge,
  } = product;

  const pct = discountPercent(price, discountPrice);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem(product, 1, colors?.[0] || null, null);
    setTimeout(() => setAdding(false), 1200);
  };

  return (
    <Link
      to={`/product/${slug}`}
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`View ${name}`}
    >
      {/* ── Image ── */}
      <div className={styles.imageWrap}>
        {!imgError ? (
          <img
            src={images?.[0]}
            alt={name}
            className={styles.image}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className={styles.imageFallback}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <span className={`${styles.badge} ${styles[`badge${badge.replace(' ','')}`]}`}>
            {badge}
          </span>
        )}

        {/* Discount % */}
        {pct > 0 && (
          <span className={styles.discount}>-{pct}%</span>
        )}

        {/* Add to Cart — appears on hover */}
        <button
          className={`${styles.addBtn} ${hovered ? styles.addBtnVisible : ''} ${adding ? styles.adding : ''}`}
          onClick={handleAddToCart}
          aria-label={`Add ${name} to cart`}
          tabIndex={hovered ? 0 : -1}
        >
          {adding ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              Added!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>

      {/* ── Info ── */}
      <div className={styles.info}>
        {/* Color swatches */}
        {colors && colors.length > 0 && (
          <div className={styles.swatches}>
            {colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                className={styles.swatch}
                style={{ background: c }}
                title={c}
              />
            ))}
            {colors.length > 4 && (
              <span className={styles.moreColors}>+{colors.length - 4}</span>
            )}
          </div>
        )}

        <h3 className={styles.name}>{name}</h3>

        <div className={styles.pricing}>
          {discountPrice ? (
            <>
              <span className={styles.salePrice}>{formatPrice(discountPrice)}</span>
              <span className={styles.originalPrice}>{formatPrice(price)}</span>
            </>
          ) : (
            <span className={styles.price}>{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
