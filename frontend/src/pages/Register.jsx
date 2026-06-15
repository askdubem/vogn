import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth';
import styles from './Auth.module.css';

const RegisterPage = () => {
  const { login }    = useAuth();
  const navigate     = useNavigate();

  const [form, setForm]       = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                                  e.name     = 'Full name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))   e.email    = 'Valid email required';
    if (!form.phone || form.phone.length < 10)              e.phone    = 'Valid phone number required';
    if (!form.password || form.password.length < 6)         e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm)                     e.confirm  = 'Passwords do not match';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const { data } = await authService.register({
        name: form.name, email: form.email,
        phone: form.phone, password: form.password,
      });
      login(data);
      toast.success(`Welcome to VŌGN, ${data.user.name.split(' ')[0]}!`);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Create Account — VŌGN</title></Helmet>
      <div className={styles.page}>
        <div className={styles.card}>

          <div className={styles.logoWrap}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <rect width="44" height="44" rx="10" fill="var(--iron-grey)"/>
              <text x="22" y="32" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fontWeight="700" fill="var(--powder-petal)">V</text>
            </svg>
          </div>

          <h1 className={styles.title}>Create account</h1>
          <p className={styles.sub}>Join the VŌGN community</p>

          {errors.general && <div className={styles.errorBanner}>{errors.general}</div>}

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">Full Name</label>
              <input
                id="name" name="name" type="text"
                value={form.name} onChange={handleChange}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                placeholder="John Doe"
                autoComplete="name"
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                id="email" name="email" type="email"
                value={form.email} onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="you@email.com"
                autoComplete="email"
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="phone">Phone Number</label>
              <input
                id="phone" name="phone" type="tel"
                value={form.phone} onChange={handleChange}
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                placeholder="08012345678"
                autoComplete="tel"
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Password</label>
              <input
                id="password" name="password" type="password"
                value={form.password} onChange={handleChange}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm" name="confirm" type="password"
                value={form.confirm} onChange={handleChange}
                className={`${styles.input} ${errors.confirm ? styles.inputError : ''}`}
                placeholder="Repeat your password"
                autoComplete="new-password"
              />
              {errors.confirm && <span className={styles.error}>{errors.confirm}</span>}
            </div>

            <button
              type="submit"
              className={`btn btn-primary btn-lg btn-full ${styles.submitBtn}`}
              disabled={loading}
            >
              {loading ? <span className={styles.spinner} /> : 'Create Account'}
            </button>
          </form>

          <p className={styles.switchText}>
            Already have an account?{' '}
            <Link to="/login" className={styles.switchLink}>Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
