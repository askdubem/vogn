import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

const slides = [
  {
    id: 1,
    heading: 'Dress the\nStreets of Lagos',
    sub: 'Premium fashion for the modern Nigerian.',
    cta: 'Shop the Collection',
    ctaLink: '/shop',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&q=80',
    badge: 'New Season',
  },
  {
    id: 2,
    heading: 'Defined by\nDetail',
    sub: 'Every piece crafted with intention.',
    cta: 'Explore Jackets',
    ctaLink: '/category/jackets',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80',
    badge: 'Outerwear',
  },
  {
    id: 3,
    heading: 'Carry What\nMatters',
    sub: 'Bags built for Lagos life.',
    cta: 'Shop Bags',
    ctaLink: '/category/bags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1400&q=80',
    badge: 'Bags & Accessories',
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 600);
  };

  const slide = slides[current];

  return (
    <section className={styles.hero} aria-label="Featured collection">
      {/* Background Image */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`${styles.bg} ${i === current ? styles.bgActive : ''}`}
          style={{ backgroundImage: `url(${s.image})` }}
          aria-hidden="true"
        />
      ))}

      {/* Overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Content */}
      <div className={`${styles.content} ${animating ? styles.contentAnim : ''}`}>
        <span className={styles.badge}>{slide.badge}</span>
        <h1 className={styles.heading}>
          {slide.heading.split('\n').map((line, i) => (
            <span key={i} className={styles.headingLine}>{line}</span>
          ))}
        </h1>
        <p className={styles.sub}>{slide.sub}</p>
        <div className={styles.actions}>
          <Link to={slide.ctaLink} className={`btn btn-primary btn-lg ${styles.ctaBtn}`}>
            {slide.cta}
          </Link>
          <Link to="/shop" className={`btn btn-outline btn-lg ${styles.secondaryBtn}`}>
            View All
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className={styles.dots} role="tablist" aria-label="Slide navigation">
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
