import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { formatPrice, discountPercent } from '../utils/formatPrice';
import { MOCK_PRODUCTS } from '../utils/mockData';
import ProductCard from '../components/product/ProductCard';
import styles from './Product.module.css';

const ProductPage = () => {
  const { slug }     = useParams();
  const { addItem }  = useCart();
  const navigate     = useNavigate();

  const product = MOCK_PRODUCTS.find(p => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize,  setSelectedSize]  = useState(null);
  const [quantity,      setQuantity]      = useState(1);
  const [adding,        setAdding]        = useState(false);
  const [sizeError,     setSizeError]     = useState(false);

  if (!product) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: 'var(--space-6)', display: 'inline-flex' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const { name, price, discountPrice, images, colors, sizes, description, category } = product;
  const pct = discountPercent(price, discountPrice);

  const related = MOCK_PRODUCTS.filter(p => p.category === category && p._id !== product._id).slice(0, 4);

  const handleAddToCart = () => {
    if (sizes?.length > 1 && sizes[0] !== 'One Size' && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    setAdding(true);
    addItem(product, quantity, selectedColor || colors?.[0], selectedSize || sizes?.[0]);
    setTimeout(() => setAdding(false), 1200);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <>
      <Helmet>
        <title>{name} — VŌGN</title>
        <meta name="description" content={`Buy ${name} from VŌGN. Premium fashion delivered across Nigeria.`} />
      </Helmet>

      <div className={styles.page}>
        <div className="container">

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/shop">Shop</Link>
            <span>/</span>
            <Link to={`/category/${category}`} style={{ textTransform: 'capitalize' }}>{category}</Link>
            <span>/</span>
            <span>{name}</span>
          </nav>

          <div className={styles.layout}>

            {/* ── Gallery ── */}
            <div className={styles.gallery}>
              <div className={styles.mainImage}>
                <img
                  src={images[selectedImage]}
                  alt={name}
                  className={styles.image}
                />
                {pct > 0 && <span className={styles.discountBadge}>-{pct}%</span>}
              </div>

              {images.length > 1 && (
                <div className={styles.thumbs}>
                  {images.map((img, i) => (
                    <button
                      key={i}
                      className={`${styles.thumb} ${i === selectedImage ? styles.thumbActive : ''}`}
                      onClick={() => setSelectedImage(i)}
                      aria-label={`Image ${i + 1}`}
                    >
                      <img src={img} alt={`${name} view ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Product Info ── */}
            <div className={styles.info}>
              <span className={styles.categoryTag}>{category}</span>
              <h1 className={styles.name}>{name}</h1>

              {/* Price */}
              <div className={styles.pricing}>
                {discountPrice ? (
                  <>
                    <span className={styles.salePrice}>{formatPrice(discountPrice)}</span>
                    <span className={styles.originalPrice}>{formatPrice(price)}</span>
                    <span className={styles.saveBadge}>Save {pct}%</span>
                  </>
                ) : (
                  <span className={styles.price}>{formatPrice(price)}</span>
                )}
              </div>

              <p className={styles.desc}>
                {description || `The ${name} is a premium piece from the VŌGN collection. Crafted with care for the modern Nigerian wardrobe — versatile, comfortable, and built to last.`}
              </p>

              {/* Color Selector */}
              {colors && colors.length > 0 && (
                <div className={styles.selectorGroup}>
                  <label className={styles.selectorLabel}>
                    Color
                    {selectedColor && <span className={styles.selectedVal}> — {selectedColor}</span>}
                  </label>
                  <div className={styles.colorSwatches}>
                    {colors.map((c, i) => (
                      <button
                        key={i}
                        className={`${styles.colorSwatch} ${selectedColor === c ? styles.colorSwatchActive : ''}`}
                        style={{ background: c }}
                        onClick={() => setSelectedColor(c)}
                        aria-label={`Color ${c}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {sizes && sizes.length > 0 && sizes[0] !== 'One Size' && (
                <div className={styles.selectorGroup}>
                  <label className={styles.selectorLabel}>
                    Size
                    {selectedSize && <span className={styles.selectedVal}> — {selectedSize}</span>}
                  </label>
                  <div className={styles.sizes}>
                    {sizes.map(s => (
                      <button
                        key={s}
                        className={`${styles.sizeBtn} ${selectedSize === s ? styles.sizeBtnActive : ''}`}
                        onClick={() => { setSelectedSize(s); setSizeError(false); }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {sizeError && <p className={styles.sizeError}>Please select a size</p>}
                </div>
              )}

              {/* Quantity */}
              <div className={styles.selectorGroup}>
                <label className={styles.selectorLabel}>Quantity</label>
                <div className={styles.quantityWrap}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >−</button>
                  <span className={styles.qtyValue}>{quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQuantity(q => q + 1)}
                    aria-label="Increase quantity"
                  >+</button>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <button
                  className={`btn btn-primary btn-lg ${styles.addBtn}`}
                  onClick={handleAddToCart}
                  disabled={adding}
                >
                  {adding ? '✓ Added to Cart!' : 'Add to Cart'}
                </button>
                <button
                  className={`btn btn-outline btn-lg ${styles.buyBtn}`}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>

              {/* Shipping note */}
              <div className={styles.shippingNote}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                <span>Free shipping on orders over ₦50,000 · Lagos delivery 1–2 days</span>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/2348021136693?text=Hi! I'm interested in ${encodeURIComponent(name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappCta}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Ask about this item on WhatsApp
              </a>
            </div>
          </div>

          {/* ── Related Products ── */}
          {related.length > 0 && (
            <div className={styles.related}>
              <h2 className={styles.relatedTitle}>You May Also Like</h2>
              <div className={styles.relatedGrid}>
                {related.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
