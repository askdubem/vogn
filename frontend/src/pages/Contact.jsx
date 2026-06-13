import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
  return (
    <>
      <Helmet><title>Contact — VŌGN</title></Helmet>
      <div className="container section">
        <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-3)' }}>Contact</h2>
        <p className="text-muted text-sm">Route active — full page built in its phase.</p>
      </div>
    </>
  );
};

export default ContactPage;
