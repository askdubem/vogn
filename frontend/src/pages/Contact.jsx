import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import styles from './Contact.module.css';

const ContactPage = () => {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 900));
    setSent(true);
    setSending(false);
    toast.success('Message sent! We\'ll get back to you shortly.');
  };

  return (
    <>
      <Helmet><title>Contact — VŌGN</title></Helmet>
      <div className={styles.page}>
        <div className="container">
          <div className={styles.layout}>

            <div className={styles.info}>
              <p className={styles.eyebrow}>Get in Touch</p>
              <h1 className={styles.title}>We'd love to hear from you</h1>
              <p className={styles.sub}>Have a question, a custom order request, or just want to say hello? Reach us through any of the channels below.</p>

              <div className={styles.contacts}>
                <a href="https://wa.me/2348021136693" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                  <div className={styles.contactIcon} style={{ background: 'rgba(37,211,102,0.1)', color: '#25D366' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <p className={styles.contactLabel}>WhatsApp</p>
                    <p className={styles.contactVal}>+234 802 113 6693</p>
                  </div>
                </a>

                <a href="mailto:hello@vogn.ng" className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <p className={styles.contactLabel}>Email</p>
                    <p className={styles.contactVal}>hello@vogn.ng</p>
                  </div>
                </a>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div>
                    <p className={styles.contactLabel}>Business Hours</p>
                    <p className={styles.contactVal}>Mon–Sat: 9am – 6pm WAT</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formWrap}>
              {sent ? (
                <div className={styles.successState}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--ash-grey)" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                  <h2>Message sent!</h2>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label}>Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required className={styles.input} placeholder="Your name" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required className={styles.input} placeholder="you@email.com" />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Subject</label>
                    <input name="subject" value={form.subject} onChange={handleChange} className={styles.input} placeholder="Order enquiry, sizing, etc." />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required className={styles.input} rows={6} placeholder="Tell us how we can help..." />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={sending}>
                    {sending ? 'Sending...' : 'Send Message'}
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

export default ContactPage;
