import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth';
import styles from './Profile.module.css';

const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
  'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba',
  'Yobe','Zamfara',
];

const ProfilePage = () => {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({
    name:    user?.name    || '',
    phone:   user?.phone   || '',
    street:  user?.address?.street  || '',
    state:   user?.address?.state   || '',
    country: user?.address?.country || 'Nigeria',
  });
  const [pwForm, setPwForm]   = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [saving, setSaving]   = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [tab, setTab]         = useState('profile');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handlePwChange = (e) => setPwForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await authService.updateMe({
        name:  form.name,
        phone: form.phone,
        address: { street: form.street, state: form.state, country: form.country },
      });
      updateUser(data.user);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirm) { toast.error('Passwords do not match'); return; }
    if (pwForm.newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setSavingPw(true);
    try {
      await authService.changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword:     pwForm.newPassword,
      });
      toast.success('Password changed!');
      setPwForm({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setSavingPw(false);
    }
  };

  return (
    <>
      <Helmet><title>My Profile — VŌGN</title></Helmet>
      <div className={styles.page}>
        <div className="container">
          <h1 className={styles.title}>My Account</h1>

          <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.avatar}>
                <span>{user?.name?.[0]?.toUpperCase() || 'U'}</span>
              </div>
              <p className={styles.userName}>{user?.name}</p>
              <p className={styles.userEmail}>{user?.email}</p>

              <nav className={styles.nav}>
                {['profile', 'password'].map(t => (
                  <button
                    key={t}
                    className={`${styles.navItem} ${tab === t ? styles.navItemActive : ''}`}
                    onClick={() => setTab(t)}
                  >
                    {t === 'profile' ? 'Profile Details' : 'Change Password'}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className={styles.content}>
              {tab === 'profile' && (
                <form onSubmit={handleSaveProfile} className={styles.form}>
                  <h2 className={styles.sectionTitle}>Profile Details</h2>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label}>Full Name</label>
                      <input name="name" value={form.name} onChange={handleChange} className={styles.input} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className={styles.input} placeholder="08012345678" />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Email (cannot change)</label>
                    <input value={user?.email} readOnly className={`${styles.input} ${styles.inputReadonly}`} />
                  </div>

                  <h3 className={styles.subSection}>Delivery Address</h3>

                  <div className={styles.field}>
                    <label className={styles.label}>Street Address</label>
                    <input name="street" value={form.street} onChange={handleChange} className={styles.input} placeholder="12 Broad Street, Victoria Island" />
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label}>State</label>
                      <select name="state" value={form.state} onChange={handleChange} className={`${styles.input} ${styles.select}`}>
                        <option value="">Select state</option>
                        {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Country</label>
                      <input value="Nigeria" readOnly className={`${styles.input} ${styles.inputReadonly}`} />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              )}

              {tab === 'password' && (
                <form onSubmit={handleChangePassword} className={styles.form}>
                  <h2 className={styles.sectionTitle}>Change Password</h2>

                  {['currentPassword', 'newPassword', 'confirm'].map(f => (
                    <div key={f} className={styles.field}>
                      <label className={styles.label}>
                        {f === 'currentPassword' ? 'Current Password' : f === 'newPassword' ? 'New Password' : 'Confirm New Password'}
                      </label>
                      <input
                        name={f} type="password"
                        value={pwForm[f]} onChange={handlePwChange}
                        className={styles.input}
                        placeholder="••••••••"
                      />
                    </div>
                  ))}

                  <button type="submit" className="btn btn-primary" disabled={savingPw}>
                    {savingPw ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
