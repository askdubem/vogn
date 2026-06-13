import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  return (
    <>
      <Helmet><title>About — VŌGN</title></Helmet>
      <div className="container section">
        <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-3)' }}>About</h2>
        <p className="text-muted text-sm">Route active — full page built in its phase.</p>
      </div>
    </>
  );
};

export default AboutPage;
