'use client'

import { Press_Start_2P } from 'next/font/google'
import { useEffect, useState } from 'react'

const pixel = Press_Start_2P({ weight: '400', subsets: ['latin'] })

// SVG Icons — matching about page social icon style
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
)

const contacts = [
  { label: 'EMAIL', value: 'mara.azwa@gmail.com', href: 'mailto:mara.azwa@gmail.com', Icon: EmailIcon },
  { label: 'LINKEDIN', value: '/in/ammara-azwadiena', href: 'https://linkedin.com/in/ammara-azwadiena', Icon: LinkedInIcon },
  { label: 'GITHUB', value: 'ammarazwa', href: 'https://github.com/ammarazwa', Icon: GitHubIcon },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

const XP = {
  bg: '#d4d0c8',
  font: "'Plus Jakarta Sans','Segoe UI',sans-serif",
}

function Clock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }))
      setDate(now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div style={{
      marginLeft: 'auto', height: 24, padding: '0 10px',
      display: 'flex', alignItems: 'center', gap: 12,
      background: XP.bg, border: '1px solid', borderColor: '#777 #fff #fff #777',
      fontFamily: XP.font, fontSize: 13, fontStyle: 'italic',
    }}>
      <span>{date}</span><span>{time}</span>
    </div>
  )
}

function XPWindow({ title, children, rotate = 0, style = {} }: {
  title: string; children: React.ReactNode; rotate?: number; style?: React.CSSProperties
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: XP.bg,
        border: '2px solid #fff',
        outline: '1px solid #848284',
        boxShadow: hov ? '7px 7px 0 rgba(0,0,0,0.35)' : '4px 4px 0 rgba(0,0,0,0.24)',
        borderRadius: '4px 4px 0 0',
        transform: `rotate(${hov ? rotate * 0.4 : rotate}deg) scale(${hov ? 1.02 : 1})`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        ...style,
      }}
    >
      <div style={{
        background: 'linear-gradient(180deg,#1084d0 0%,#0a246a 100%)',
        borderRadius: '3px 3px 0 0',
        height: 26, padding: '0 5px 0 8px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        userSelect: 'none',
      }}>
        <span className={pixel.className} style={{ fontSize: 9, color: '#fff', letterSpacing: 0.3, textTransform: 'uppercase' }}>
          {title}
        </span>
        <div style={{ display: 'flex', gap: 3 }}>
          {['_','□','×'].map(b => (
            <button key={b} style={{
              width: 16, height: 14, padding: 0, background: XP.bg,
              border: '1px solid', borderColor: '#fff #777 #777 #fff',
              fontSize: 9, cursor: 'default', lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Arial',
            }}>{b}</button>
          ))}
        </div>
      </div>
      <div style={{ background: XP.bg }}>{children}</div>
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [state, setState] = useState<FormState>('idle')
  const [focused, setFocused] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) return
    setState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setState('success'); setForm({ name: '', email: '', subject: '', message: '' }) }
      else setState('error')
    } catch { setState('error') }
  }

  return (
    <main>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap');

        :root {
          --bg: #e8e4dc;
          --ink: #0a0a0a;
          --red: #e53935;
          --blue: #0a246a;
          --font: 'Plus Jakarta Sans','Segoe UI',sans-serif;
          --mono: 'Courier New', monospace;
          --xp: #d4d0c8;
        }

        body { background: var(--bg); color: var(--ink); font-family: var(--font); }

        main {
          min-height: 100vh;
          padding-top: 34px;
          background: var(--bg);
          background-image: radial-gradient(circle, #b8b4ac 1px, transparent 1px);
          background-size: 18px 18px;
        }

        /* ── Taskbar: identical to about page ── */
        .taskbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 34px;
          background: var(--xp);
          border-bottom: 2px solid #8d8d8d;
          box-shadow: 0 2px 0 #fff;
          display: flex; align-items: center; gap: 3px; padding: 0 8px;
        }

        .tab {
          height: 24px; min-width: 120px; padding: 0 14px;
          display: inline-flex; align-items: center; justify-content: center;
          text-decoration: none; color: #111; background: var(--xp);
          border: 1px solid; border-color: #fff #777 #777 #fff;
          font-family: var(--font); font-size: 13px; font-style: italic;
          cursor: default; transition: background 0.1s;
        }
        .tab:hover { background: #c0bdb4; }
        .tab.active { background: #fff; border-color: #777 #fff #fff #777; }
        .tab.start  { min-width: 52px; font-style: normal; font-weight: 700; }
        .tab.plus   { min-width: 40px; font-size: 18px; padding-bottom: 3px; }

        /* ── Page ── */
        .page {
          max-width: 1160px; margin: 0 auto;
          padding: 48px 56px 100px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 0;
        }

        /* ── LEFT COLUMN: header + socials ── */
        .col-left {
          padding-right: 40px;
          display: flex; flex-direction: column;
          gap: 0;
        }

        /* Big editorial header — newspaper masthead style */
        .masthead {
          padding: 32px 0 24px;
          border-bottom: 4px double #0a0a0a;
          margin-bottom: 0;
        }

        .masthead-kicker {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 10px;
        }

        .kicker-rule { flex: 1; height: 2px; background: var(--ink); }

        .kicker-text {
          font-family: var(--mono);
          font-size: 9px; font-weight: 700; letter-spacing: 2px;
          color: var(--ink); white-space: nowrap;
        }

        .masthead h1 {
          font-family: var(--font);
          font-size: clamp(44px, 7vw, 80px);
          font-weight: 800; line-height: 0.95;
          letter-spacing: -3px;
          color: var(--ink);
          margin-bottom: 14px;
          position: relative;
          display: inline-block;
        }

        .masthead h1 .accent { color: var(--red); }

        /* little decorative stars like about page */
        .star-red { color: var(--red); pointer-events: none; }

        .masthead-sub {
          font-size: 13px; line-height: 1.7; color: #444;
          max-width: 380px; margin-top: 12px;
          border-left: 3px solid var(--red);
          padding-left: 12px;
        }

        /* ── Newspaper columns: socials block ── */
        .socials-section {
          padding: 20px 0;
          border-bottom: 2px solid var(--ink);
        }

        .section-header {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 16px;
        }

        .section-rule { flex: 1; height: 1px; background: #bbb; }

        .section-label {
          font-family: var(--mono);
          font-size: 8px; font-weight: 700; letter-spacing: 2px;
          color: #666; white-space: nowrap; text-transform: uppercase;
        }

        /* Socials: newspaper classified ad style */
        .socials-grid {
          display: flex; flex-direction: column; gap: 0;
        }

        .social-row {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 0; border-bottom: 1px solid #ccc;
          text-decoration: none; color: var(--ink);
          position: relative; overflow: hidden;
          transition: background 0.1s;
        }
        .social-row:last-child { border-bottom: none; }

        .social-row:hover { background: #d4e4f4; }
        .social-row:hover .social-icon { color: var(--blue); }
        .social-row:hover .social-label { color: var(--blue); }

        .social-icon {
          width: 32px; height: 32px;
          border: 2px solid #555; background: #e6e2d9;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: var(--ink);
          transition: color 0.15s, background 0.15s;
        }
        .social-row:hover .social-icon { background: #c8d8f0; }

        .social-text { flex: 1; min-width: 0; }

        .social-label {
          display: block; font-size: 9px; font-weight: 700;
          letter-spacing: 1px; color: #666; font-family: var(--mono);
          margin-bottom: 2px; transition: color 0.15s;
        }

        .social-value {
          display: block; font-size: 12px; font-weight: 700;
          color: var(--ink);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .social-arrow {
          font-size: 16px; color: #aaa; flex-shrink: 0;
          font-family: var(--mono);
        }

        /* Available pill — sticky note style like about page */
        .sticky-available {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 18px;
          padding: 8px 14px;
          background: #fff59d;
          border: 2px solid #d6b400;
          box-shadow: 3px 3px 0 rgba(0,0,0,0.15);
          font-family: 'Comic Sans MS', cursive;
          font-size: 12px; font-weight: 700;
          color: #111;
          transform: rotate(-1.5deg);
          width: fit-content;
        }

        .avail-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #2e7d32;
          box-shadow: 0 0 4px #2e7d32;
          animation: pulse-dot 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-dot {
          0%,100% { opacity:1; } 50% { opacity: 0.3; }
        }

        /* ── RIGHT COLUMN: XP form window ── */
        .col-right {
          padding-left: 8px;
        }

        /* form inside xp window */
        .form-inner { padding: 18px 20px 22px; }

        .form-from-to {
          display: flex; flex-direction: column; gap: 4px;
          margin-bottom: 16px;
          padding: 8px 10px;
          background: #c8c4bc;
          border: 1px solid; border-color: #777 #fff #fff #777;
          font-size: 11px; font-family: var(--mono); color: #333;
        }

        .form-addr-row { display: flex; gap: 8px; }
        .form-addr-key { color: #666; font-size: 10px; font-weight: 700; width: 24px; }
        .form-addr-val { color: var(--blue); font-weight: 700; }

        .field {
          display: flex; flex-direction: column; gap: 6px;
          padding: 12px 0;
          border-bottom: 1px solid #b0aca4;
        }
        .field:last-of-type { border-bottom: none; }

        .field-label {
          font-size: 7px; letter-spacing: 1px; color: #666;
          display: flex; align-items: center; gap: 4px;
        }
        .field-label.active { color: var(--blue); }

        .req { color: var(--red); }

        input, textarea {
          font-family: var(--mono);
          font-size: 12px; color: var(--ink);
          background: #f0ece4;
          border: 1px solid; border-color: #777 #fff #fff #777;
          outline: none; resize: none; width: 100%;
          padding: 5px 7px; line-height: 1.55;
          caret-color: var(--blue);
        }
        input:focus, textarea:focus {
          background: #fff;
          border-color: #0a246a #b0b0b0 #b0b0b0 #0a246a;
        }
        input::placeholder, textarea::placeholder {
          color: #999; font-style: italic;
        }

        textarea { min-height: 100px; }

        .form-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 14px; margin-top: 6px;
          border-top: 1px solid #b0aca4;
          gap: 10px; flex-wrap: wrap;
        }

        .form-note {
          font-family: var(--mono); font-size: 8px; color: #999;
          letter-spacing: 0.5px;
        }

        .send-btn {
          font-family: var(--mono); font-size: 10px; font-weight: 700;
          padding: 6px 14px;
          background: var(--xp); color: var(--ink);
          border: 2px solid; border-color: #fff #777 #777 #fff;
          cursor: pointer; letter-spacing: 0.5px;
          box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .send-btn:hover:not(:disabled) {
          transform: translate(2px, 2px); box-shadow: 0 0 0 rgba(0,0,0,0.2);
        }
        .send-btn:active:not(:disabled) {
          border-color: #777 #fff #fff #777;
        }
        .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .feedback {
          margin-top: 10px; padding: 8px 10px;
          font-family: var(--mono); font-size: 10px; font-weight: 700;
          border: 1px solid; line-height: 1.6;
        }
        .feedback-ok { background: #d4edda; border-color: #2e7d32; color: #2e7d32; }
        .feedback-err { background: #fde8e8; border-color: #c62828; color: #c62828; }

        /* ── Decorative elements ── */
        /* Newspaper headline strip between columns */
        .divider-col {
          position: absolute; left: 50%; top: 80px; bottom: 60px;
          width: 1px; background: #bbb;
          transform: translateX(-50%);
        }

        /* Zine-style cutout note below form */
        .zine-note {
          margin-top: 14px;
          padding: 10px 12px;
          background: #f48fb1;
          border: 2px solid rgba(0,0,0,0.12);
          border-radius: 8px;
          font-family: 'Comic Sans MS', cursive;
          font-size: 11px; font-weight: 700;
          color: #111; line-height: 1.5;
          transform: rotate(1.2deg);
          box-shadow: 2px 2px 0 rgba(0,0,0,0.12);
          width: fit-content;
          max-width: 240px;
        }

        /* Red stars scattered */
        .deco-star {
          color: var(--red); pointer-events: none;
          position: absolute; z-index: 1;
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .page { grid-template-columns: 1fr; padding: 32px 28px 80px; }
          .col-left { padding-right: 0; border-right: none; border-bottom: 2px solid var(--ink); padding-bottom: 32px; margin-bottom: 32px; }
          .col-right { padding-left: 0; }
        }

        @media (max-width: 560px) {
          .page { padding: 20px 16px 60px; }
          .tab { min-width: auto; padding: 0 8px; font-size: 11px; }
          .masthead h1 { font-size: 42px; }
        }
      `}</style>

      {/* ── Taskbar — same as about page ── */}
      <nav className="taskbar">
        {[
          { label: 'Start', cls: 'tab start', href: '/' },
          { label: 'about', cls: 'tab', href: '/about' },
          { label: 'works', cls: 'tab', href: '/works' },
          { label: 'contact', cls: 'tab active', href: '/contact' },
        ].map(t => (
          <a key={t.label} href={t.href} className={t.cls}>{t.label}</a>
        ))}
        <button suppressHydrationWarning className="tab plus">+</button>
        <Clock />
      </nav>

      {/* ── Page body ── */}
      <div className="page" style={{ position: 'relative' }}>

        {/* ── LEFT: header + socials ── */}
        <div className="col-left" style={{ borderRight: '2px solid #0a0a0a' }}>

          {/* Masthead / newspaper header */}
          <div className="masthead">
            <div className="masthead-kicker">
              <div className="kicker-rule" />
              <span className="kicker-text">// CONTACT.EXE — TRANSMISSION OPEN</span>
              <div className="kicker-rule" />
            </div>

            <h1 style={{ position: 'relative' }}>
              Let&apos;s make<br /><span className="accent">something.</span>
              <span style={{ position: 'absolute', top: -8, right: -24, fontSize: 22, color: '#e53935', transform: 'rotate(12deg)' }}>★</span>
              <span style={{ position: 'absolute', bottom: 8, right: -10, fontSize: 13, color: '#e53935', transform: 'rotate(-8deg)' }}>✦</span>
            </h1>

            <p className="masthead-sub">
              Open to collaborations, freelance projects &amp; conversations worth having.
              Drop a message — I&apos;ll get back to you.
            </p>
          </div>

          {/* Socials as newspaper classifieds */}
          <div className="socials-section">
            <div className="section-header">
              <span className="section-label">Find me at</span>
              <div className="section-rule" />
            </div>

            <div className="socials-grid">
              {contacts.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="social-row"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <div className="social-icon"><Icon /></div>
                  <div className="social-text">
                    <span className="social-label">{label}</span>
                    <span className="social-value">{value}</span>
                  </div>
                  <span className="social-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Sticky note — available */}
          <div className="sticky-available">
            <div className="avail-dot" />
            currently available ✦
          </div>
        </div>

        {/* ── RIGHT: XP window form ── */}
        <div className="col-right" style={{ paddingLeft: 32, paddingTop: 32 }}>

          {/* Decorative stars */}
          {[[18, 8, 14, 10], [70, 52, 11, -8], [300, 12, 13, 15]].map(([t, l, sz, r], i) => (
            <span key={i} className="deco-star" style={{ top: t, left: l, fontSize: sz, transform: `rotate(${r}deg)` }}>★</span>
          ))}

          <XPWindow title="NEW-MESSAGE.EXE" rotate={0.6} style={{ width: '100%' }}>
            <div className="form-inner">

              {/* To/From header bar like email client */}
              <div className="form-from-to">
                <div className="form-addr-row">
                  <span className="form-addr-key">To:</span>
                  <span className="form-addr-val">mara.azwa@gmail.com</span>
                </div>
                <div className="form-addr-row">
                  <span className="form-addr-key">CC:</span>
                  <span style={{ color: '#999', fontSize: 10, fontFamily: 'var(--mono)' }}>—</span>
                </div>
              </div>

              {/* Fields */}
              {(['name','email','subject'] as const).map(field => (
                <div key={field} className="field">
                  <label className={`field-label ${pixel.className} ${focused === field ? 'active' : ''}`} htmlFor={field}>
                    {field.toUpperCase()} <span className="req">*</span>
                  </label>
                  <input
                    id={field} name={field}
                    type={field === 'email' ? 'email' : 'text'}
                    placeholder={
                      field === 'name' ? 'Name to reply to' :
                      field === 'email' ? 'Your email address' :
                      'One-line summary'
                    }
                    value={form[field]}
                    onChange={handleChange}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    autoComplete={field}
                  />
                </div>
              ))}

              <div className="field">
                <label className={`field-label ${pixel.className} ${focused === 'message' ? 'active' : ''}`} htmlFor="message">
                  MESSAGE <span className="req">*</span>
                </label>
                <textarea
                  id="message" name="message"
                  placeholder="What are you working on?"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <div className="form-footer">
                <span className="form-note">Powered by Resend</span>
                <button
                  className={`send-btn ${pixel.className}`}
                  onClick={handleSubmit}
                  disabled={state === 'loading'}
                >
                  {state === 'loading' ? 'Sending...' : 'Send Message →'}
                </button>
              </div>

              {state === 'success' && (
                <div className={`feedback feedback-ok ${pixel.className}`}>
                  ✓ Message sent! I&apos;ll get back to you soon.
                </div>
              )}
              {state === 'error' && (
                <div className={`feedback feedback-err ${pixel.className}`}>
                  ✕ Something went wrong. Try emailing directly.
                </div>
              )}
            </div>
          </XPWindow>

          {/* Pink sticky note below form */}
          <div className="zine-note" style={{ marginLeft: 'auto', marginRight: 12 }}>
            response time: usually within 24–48h ✦
          </div>
        </div>
      </div>
    </main>
  )
}