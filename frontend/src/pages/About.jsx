import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const AboutPage = () => (
  <>
    <Helmet>
      <title>About — VŌGN</title>
      <meta name="description" content="VŌGN is a premium Lagos-based fashion brand crafting intentional clothing for the modern Nigerian." />
    </Helmet>
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>Our Story</p>
          <h1 className={styles.heroTitle}>Fashion with<br />Purpose</h1>
          <p className={styles.heroSub}>
            VŌGN was born in Lagos — a city of energy, contrast, and relentless style.
            We make clothing for people who move with intention.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.mission}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div>
              <h2 className={styles.sectionTitle}>What We Stand For</h2>
              <p className={styles.bodyText}>
                Every piece in the VŌGN collection is designed to last — not just in quality, but in relevance.
                We believe Nigerian fashion deserves global standards, and we build with that in mind.
              </p>
              <p className={styles.bodyText}>
                Our palette is drawn from the textures of Lagos: the warm dust of dry season,
                the grey of Lagos steel, the green of our landscapes. Understated. Intentional. Ours.
              </p>
            </div>
            <div className={styles.valuesGrid}>
              {[
                { title: 'Quality First',    desc: 'Every stitch, every material — selected with care.' },
                { title: 'Made for Lagos',   desc: 'Designed for the heat, the hustle, the streets.' },
                { title: 'Timeless Style',   desc: 'No fleeting trends. Only pieces you will wear for years.' },
                { title: 'Real Sizing',      desc: 'XS to XXL. Fashion for every body.' },
              ].map(v => (
                <div key={v.title} className={styles.valueCard}>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Ready to wear VŌGN?</h2>
          <p className={styles.ctaSub}>Explore our latest collection — crafted for Lagos life.</p>
          <div className={styles.ctaActions}>
            <Link to="/shop" className="btn btn-primary btn-lg">Shop the Collection</Link>
            <Link to="/contact" className="btn btn-outline btn-lg">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default AboutPage;
