import { Helmet } from 'react-helmet-async';

const CartPage = () => {
  return (
    <>
      <Helmet><title>Cart — VŌGN</title></Helmet>
      <div className="container section">
        <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-3)' }}>Cart</h2>
        <p className="text-muted text-sm">Route active — full page built in its phase.</p>
      </div>
    </>
  );
};

export default CartPage;
