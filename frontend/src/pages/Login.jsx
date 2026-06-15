import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth';
import styles from './Auth.module.css';

const LoginPage = () => {
  const { login }    = useAuth();
  const navigate     = useNavigate();
  const location     = useLocation();
  const from         = location.state?.from?.pathname || '/';

  const [form, setForm]       = useState({ email: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email    = 'Valid email required';
    if (!form.password || form.password.length < 6)       e.password = 'Password must be at least 6 characters';
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
      const { data } = await authService.login(form);
      login(data);
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}!`);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Login — VŌGN</title></Helmet>
      <div className={styles.page}>
        <div className={styles.card}>

          <div className={styles.logoWrap}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <rect width="44" height="44" rx="10" fill="var(--iron-grey)"/>
              <text x="22" y="32" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fontWeight="700" fill="var(--powder-petal)">V</text>
            </svg>
          </div>

          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.sub}>Sign in to your VŌGN account</p>

          {errors.general && (
            <div className={styles.errorBanner}>{errors.general}</div>
          )}

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
              <div className={styles.labelRow}>
                <label className={styles.label} htmlFor="password">Password</label>
                <Link to="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
              </div>
              <input
                id="password" name="password" type="password"
                value={form.password} onChange={handleChange}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <button
              type="submit"
              className={`btn btn-primary btn-lg btn-full ${styles.submitBtn}`}
              disabled={loading}
            >
              {loading ? <span className={styles.spinner} /> : 'Sign In'}
            </button>
          </form>

          <p className={styles.switchText}>
            Don't have an account?{' '}
            <Link to="/register" className={styles.switchLink}>Create one</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
