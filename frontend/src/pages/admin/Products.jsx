import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { productService } from '../../services/products';
import { categoryService } from '../../services/categories';
import { formatPrice } from '../../utils/formatPrice';
import styles from './AdminTable.module.css';

const SIZES = ['XS','S','M','L','XL','XXL','One Size'];
const EMPTY_FORM = { name:'', slug:'', price:'', discountPrice:'', category:'', description:'', stock:'', sizes:[], colors:'', isFeatured:false, isBestseller:false, badge:'', isActive:true };

const AdminProductsPage = () => {
  const [products,    setProducts]    = useState([]);
  const [categories,  setCategories]  = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [showForm,    setShowForm]    = useState(false);
  const [editing,     setEditing]     = useState(null);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [saving,      setSaving]      = useState(false);
  const [deleting,    setDeleting]    = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([productService.getAll({ limit: 50 }), categoryService.getAll()]);
      setProducts(pRes.data.products);
      setCategories(cRes.data.categories);
    } catch { toast.error('Failed to load products'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setShowForm(true); };
  const openEdit   = (p)  => {
    setEditing(p._id);
    setForm({
      name: p.name, slug: p.slug, price: p.price, discountPrice: p.discountPrice || '',
      category: p.category?._id || '', description: p.description || '',
      stock: p.stock, sizes: p.sizes || [], colors: (p.colors || []).join(', '),
      isFeatured: p.isFeatured, isBestseller: p.isBestseller,
      badge: p.badge || '', isActive: p.isActive,
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleSize = (s) => setForm(f => ({
    ...f, sizes: f.sizes.includes(s) ? f.sizes.filter(x => x !== s) : [...f.sizes, s],
  }));

  const autoSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price:         Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
        stock:         Number(form.stock),
        colors:        form.colors.split(',').map(c => c.trim()).filter(Boolean),
        badge:         form.badge || null,
      };
      if (editing) { await productService.update(editing, payload); toast.success('Product updated!'); }
      else         { await productService.create(payload);          toast.success('Product created!'); }
      setShowForm(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    setDeleting(id);
    try { await productService.delete(id); toast.success('Product deleted'); load(); }
    catch { toast.error('Delete failed'); }
    finally { setDeleting(null); }
  };

  return (
    <>
      <Helmet><title>Products — VŌGN Admin</title></Helmet>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Products</h1>
            <p className={styles.pageSub}>{products.length} product{products.length !== 1 ? 's' : ''}</p>
          </div>
          <button className="btn btn-primary" onClick={openCreate}>+ Add Product</button>
        </div>

        {loading ? (
          <div className={styles.loadWrap}>{[...Array(5)].map((_,i) => <div key={i} className={`skeleton ${styles.skRow}`} />)}</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td>
                      <div className={styles.productCell}>
                        {p.images?.[0] && <img src={p.images[0]} alt={p.name} className={styles.productThumb} />}
                        <div>
                          <p className={styles.productName}>{p.name}</p>
                          <p className={styles.productSlug}>{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td>{p.category?.name || '—'}</td>
                    <td>
                      {p.discountPrice
                        ? <><span className={styles.salePrice}>{formatPrice(p.discountPrice)}</span> <span className={styles.origPrice}>{formatPrice(p.price)}</span></>
                        : formatPrice(p.price)}
                    </td>
                    <td><span className={p.stock < 5 ? styles.lowStock : ''}>{p.stock}</span></td>
                    <td>
                      <span className={`${styles.statusDot} ${p.isActive ? styles.active : styles.inactive}`}>
                        {p.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.editBtn} onClick={() => openEdit(p)}>Edit</button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(p._id)} disabled={deleting === p._id}>
                          {deleting === p._id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>{editing ? 'Edit Product' : 'Add Product'}</h2>
                <button className={styles.closeBtn} onClick={() => setShowForm(false)}>✕</button>
              </div>
              <form onSubmit={handleSubmit} className={styles.modalForm}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label>Name *</label>
                    <input name="name" value={form.name} required onChange={e => { handleChange(e); setForm(f => ({ ...f, slug: autoSlug(e.target.value) })); }} className={styles.input} />
                  </div>
                  <div className={styles.field}>
                    <label>Slug *</label>
                    <input name="slug" value={form.slug} required onChange={handleChange} className={styles.input} />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label>Price (₦) *</label>
                    <input name="price" type="number" value={form.price} required onChange={handleChange} className={styles.input} min="0" />
                  </div>
                  <div className={styles.field}>
                    <label>Discount Price (₦)</label>
                    <input name="discountPrice" type="number" value={form.discountPrice} onChange={handleChange} className={styles.input} min="0" />
                  </div>
                  <div className={styles.field}>
                    <label>Stock *</label>
                    <input name="stock" type="number" value={form.stock} required onChange={handleChange} className={styles.input} min="0" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Category *</label>
                  <select name="category" value={form.category} required onChange={handleChange} className={styles.input}>
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>

                <div className={styles.field}>
                  <label>Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} className={styles.input} rows={3} />
                </div>

                <div className={styles.field}>
                  <label>Sizes</label>
                  <div className={styles.sizeCheckboxes}>
                    {SIZES.map(s => (
                      <label key={s} className={styles.checkLabel}>
                        <input type="checkbox" checked={form.sizes.includes(s)} onChange={() => toggleSize(s)} />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Colors (comma-separated hex, e.g. #1a1a1a, #ffffff)</label>
                  <input name="colors" value={form.colors} onChange={handleChange} className={styles.input} placeholder="#1a1a1a, #ffffff, #4A5759" />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label>Badge</label>
                    <select name="badge" value={form.badge} onChange={handleChange} className={styles.input}>
                      <option value="">None</option>
                      <option>New</option><option>Sale</option><option>Bestseller</option><option>Hot</option>
                    </select>
                  </div>
                </div>

                <div className={styles.checkboxRow}>
                  {[['isFeatured','Featured'], ['isBestseller','Bestseller'], ['isActive','Active']].map(([n, l]) => (
                    <label key={n} className={styles.checkLabel}>
                      <input type="checkbox" name={n} checked={form[n]} onChange={handleChange} />
                      {l}
                    </label>
                  ))}
                </div>

                <div className={styles.modalFooter}>
                  <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Product'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProductsPage;
