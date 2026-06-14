import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './NotFound.module.css';

const NotFoundPage = () => (
  <>
    <Helmet><title>404 — Page Not Found · VŌGN</title></Helmet>
    <div className={styles.page}>
      <svg width="64" height="64" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="var(--dust-grey)"/>
        <text x="32" y="46" textAnchor="middle" fontFamily="Georgia,serif" fontSize="36" fontWeight="700" fill="var(--iron-grey)">V</text>
      </svg>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.msg}>This page doesn't exist</h2>
      <p className={styles.sub}>The page you're looking for may have moved or never existed.</p>
      <div className={styles.actions}>
        <Link to="/"     className="btn btn-primary btn-lg">Go Home</Link>
        <Link to="/shop" className="btn btn-outline btn-lg">Shop All</Link>
      </div>
    </div>
  </>
);

export default NotFoundPage;
