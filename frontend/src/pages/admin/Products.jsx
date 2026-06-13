import { Helmet } from 'react-helmet-async';

const AdminProductsPage = () => {
  return (
    <>
      <Helmet><title>Admin Products — VŌGN</title></Helmet>
      <div className="container section">
        <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-3)' }}>Admin: Products</h2>
        <p className="text-muted text-sm">Admin page — built in Phase 25–27.</p>
      </div>
    </>
  );
};

export default AdminProductsPage;
