import { Helmet } from 'react-helmet-async';

const AdminDashboardPage = () => {
  return (
    <>
      <Helmet><title>Admin Dashboard — VŌGN</title></Helmet>
      <div className="container section">
        <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-3)' }}>Admin: Dashboard</h2>
        <p className="text-muted text-sm">Admin page — built in Phase 25–27.</p>
      </div>
    </>
  );
};

export default AdminDashboardPage;
