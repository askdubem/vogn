import { Helmet } from 'react-helmet-async';

const RegisterPage = () => {
  return (
    <>
      <Helmet><title>Register — VŌGN</title></Helmet>
      <div className="container section">
        <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-3)' }}>Register</h2>
        <p className="text-muted text-sm">Route active — full page built in its phase.</p>
      </div>
    </>
  );
};

export default RegisterPage;
