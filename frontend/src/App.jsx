function App() {
  return (
    <main style={{ padding: 'var(--space-16) var(--space-6)', maxWidth: '800px', margin: '0 auto' }}>

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
        <svg width="56" height="56" viewBox="0 0 56 56" style={{ margin: '0 auto var(--space-4)' }}>
          <rect width="56" height="56" rx="12" fill="var(--iron-grey)"/>
          <text x="28" y="41" textAnchor="middle" fontFamily="Georgia,serif" fontSize="32" fontWeight="700" fill="var(--powder-petal)">V</text>
        </svg>
        <h1 className="brand-wordmark">VŌGN</h1>
        <p className="brand-tagline" style={{ marginTop: 'var(--space-1)' }}>Lagos · Fashion</p>
        <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
          Phase 3 complete — Design System loaded
        </p>
      </div>

      {/* Color Palette */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <p className="text-xs tracking-widest text-uppercase text-muted" style={{ marginBottom: 'var(--space-4)' }}>Brand Palette</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)' }}>
          {[
            { name: 'Powder Petal', val: '#F7E1D7', bg: '#F7E1D7', text: '#4A5759' },
            { name: 'Dust Grey',   val: '#DEDBD2', bg: '#DEDBD2', text: '#4A5759' },
            { name: 'Ash Grey',    val: '#B0C4B1', bg: '#B0C4B1', text: '#4A5759' },
            { name: 'Iron Grey',   val: '#4A5759', bg: '#4A5759', text: '#F7E1D7' },
          ].map(c => (
            <div key={c.name} style={{ background: c.bg, borderRadius: 'var(--radius-lg)', padding: 'var(--space-6) var(--space-4)', color: c.text }}>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, marginBottom: '4px' }}>{c.name}</p>
              <p style={{ fontSize: 'var(--text-xs)', opacity: 0.7 }}>{c.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <p className="text-xs tracking-widest text-uppercase text-muted" style={{ marginBottom: 'var(--space-4)' }}>Typography</p>
        <div style={{ background: 'var(--dust-grey)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)' }}>
          <h1 style={{ marginBottom: 'var(--space-2)' }}>The Future of Fashion</h1>
          <h3 style={{ marginBottom: 'var(--space-4)' }}>Premium Streetwear, Lagos</h3>
          <p style={{ color: 'var(--color-text-light)', marginBottom: 'var(--space-2)' }}>
            Body text — Inter Regular. Clean, modern, easy to read across all devices.
          </p>
          <p className="text-sm text-muted">Caption text — smaller supporting copy</p>
        </div>
      </section>

      {/* Buttons */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <p className="text-xs tracking-widest text-uppercase text-muted" style={{ marginBottom: 'var(--space-4)' }}>Buttons</p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <button className="btn btn-primary">Shop Now</button>
          <button className="btn btn-outline">View All</button>
          <button className="btn btn-ghost">Learn More</button>
          <button className="btn btn-primary btn-sm">Add to Cart</button>
          <button className="btn btn-primary btn-lg">Checkout</button>
        </div>
      </section>

      {/* Badges */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <p className="text-xs tracking-widest text-uppercase text-muted" style={{ marginBottom: 'var(--space-4)' }}>Badges</p>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <span className="badge">New</span>
          <span className="badge badge-sale">Sale</span>
          <span className="badge badge-new">Trending</span>
          <span className="badge badge-hot">Hot</span>
        </div>
      </section>

      {/* Animations */}
      <section>
        <p className="text-xs tracking-widest text-uppercase text-muted" style={{ marginBottom: 'var(--space-4)' }}>Hover Effects</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          {['Lift', 'Scale', 'Image Zoom'].map(label => (
            <div
              key={label}
              className={`hover-${label === 'Lift' ? 'lift' : label === 'Scale' ? 'scale' : 'lift'}`}
              style={{
                background: 'var(--dust-grey)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-8)',
                textAlign: 'center',
                fontSize: 'var(--text-sm)',
                cursor: 'pointer',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

export default App;
