'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Press_Start_2P } from 'next/font/google'

const pixel = Press_Start_2P({ weight: '400', subsets: ['latin'] })

type Work = {
  slug: string; title: string; type: string; role: string
  year: string; description: string; image: string; tags: string[]; color: string
  github?: string;
  live?: string;
  figma?: string;
  file?: string;
  youtube?: string;
  play?: string;
}

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29.94 29.94 0 0 0 2.11 12a29.94 29.94 0 0 0 .46 5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)


const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
)

const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
)

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
    <path d="M2 12h20"/>
  </svg>
)

const WORKS: Work[] = [
  { slug: 'zichara', title: 'Zichara', type: 'IMK Course Project', role: 'Scrum Master & QA', year: '2026',
    description: 'An AR-based Mandarin literacy app where users scan real Hanzi cards, combine characters, and watch compound words come to life as 3D objects. Built with Unity + Vuforia for an HCI course at Unpad.',
    image: '/images/works/zichara.png', tags: ['AR', 'Unity', 'QA', 'Scrum'], color: '#ce93d8', file: 'https://drive.google.com/drive/folders/1ZVeFF5BHLPMYd9ZtNf7FNyeboJp5soqc', github: 'https://github.com/Kelompok-2-IMK/zichara' },
  { slug: 'panganesia', title: 'Panganesia', type: 'Software Engineering Course', role: 'Frontend Developer', year: '2026',
    description: 'A web platform tackling Indonesia\'s food diversification crisis — combining food education, local recipe discovery, and a marketplace for non-rice ingredients. Built with Next.js, Supabase, and Prisma.',
    image: '/images/works/panganesia.png', tags: ['Frontend', 'Next.js', 'Full Stack'], color: '#a5d6a7', live: 'https://panganesia.vercel.app', github: 'https://github.com/Kelompok-7-PPL-I/ppl-frontend' },
  { slug: 'safeena', title: 'Safeena Academy', type: 'First Internship', role: 'UI/UX Designer', year: '2026',
    description: 'My first real-client project — designing the full UI/UX for an Islamic education startup\'s company profile and internal dashboard. Bridging between stakeholders and developers across 3 months.',
    image: '/images/works/safeena.png', tags: ['UI/UX', 'Internship', 'Figma'], color: '#fff176', live: 'https://safeena-indonesia.com/', figma: 'https://www.figma.com/proto/P4xP7ut4z5QrCdBWhEPHXC/Safeena-Intern?node-id=225-3524&p=f&t=qUJwPrB6Jad8EOsU-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=225%3A3524&show-proto-sidebar=1' },
  { slug: 'naratrad', title: 'Naratrad', type: 'LIT Scholarship Final Project', role: 'Backend Lead', year: '2026',
    description: 'A stock portfolio tracker built for beginner investors who are lost in platforms that are too complex. Led backend development — API design, implementation, testing, and deployment with Spring Boot + PostgreSQL.',
    image: '/images/works/naratrad.png', tags: ['Backend', 'Spring Boot', 'Fintech'], color: '#f48fb1', live: 'https://naratrad.vercel.app', github: 'https://github.com/orgs/NaraStack/repositories', play:"https://canva.link/naratrad"},
  { slug: 'addicx', title: 'Addicx', type: 'GEMASTIK XVIII', role: 'UI/UX Designer', year: '2025',
    description: 'A national-level competition entry — an addiction recovery app for Indonesian youth tackling online gambling and smoking through AI mentorship, gamification, and a stigma-free community. SUS score: 76.',
    image: '/images/works/addicx.png', tags: ['UI/UX', 'Competition', 'Research'], color: '#80deea', figma:'https://www.figma.com/proto/qgzar1T7KzT0bhf9XK6AZo/Gemastik?node-id=2982-17581&t=lUKgyPthXwiv5z3e-1&starting-point-node-id=2982%3A17745&show-proto-sidebar=1'},
  { slug: 'seluna', title: 'Seluna', type: 'GEMASTIK Competition', role: 'UI/UX Designer', year: '2024',
    description: 'A mobile safety navigation platform designed for women and vulnerable individuals — featuring safe route mapping, SOS access, and a protective community ecosystem. Designed for GEMASTIK.',
    image: '/images/works/seluna.png', tags: ['UI Design', 'Competition', 'Safety'], color: '#ffcc80', figma: 'https://www.figma.com/proto/JvMTFzw8OcdHNpHPlAEOU9/SAFE-ROUTE?node-id=2448-2547&t=5FiRPWNG9AhMzt3b-1&show-proto-sidebar=1&starting-point-node-id=2448%3A2547'},
]

const NAV_H = 34       // px — matches .top-tabs height
const STEP_VH = 100    // each project = 100vh of scroll room

export default function SelectedWorksPage() {
  const spacerRef   = useRef<HTMLDivElement>(null)
  const panelRef    = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [inRange, setInRange]         = useState(false) // is the spacer in view?

  const activeWork   = WORKS[activeIndex]
  const progressPct  = ((activeIndex + 1) / WORKS.length) * 100

  const onScroll = useCallback(() => {
    const spacer = spacerRef.current
    if (!spacer) return

    const rect        = spacer.getBoundingClientRect()
    const spacerTop   = rect.top              // distance from viewport top to spacer top
    const spacerBot   = rect.bottom           // distance from viewport top to spacer bottom

    // Are we inside the spacer's scroll zone?
    const active = spacerTop <= NAV_H && spacerBot >= window.innerHeight
    setInRange(active)

    if (active) {
      // How far scrolled into the spacer (0 → 1)
      const scrolledIn  = NAV_H - spacerTop
      const totalScroll = spacer.offsetHeight - window.innerHeight + NAV_H
      const progress    = Math.min(1, Math.max(0, scrolledIn / totalScroll))
      const idx         = Math.min(WORKS.length - 1, Math.floor(progress * WORKS.length))
      setActiveIndex(idx)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [onScroll])

  // spacer height: enough room for every project step, minus one vh so the
  // last project shows fully before the panel disappears
  const spacerH = `${WORKS.length * STEP_VH}vh`

  return (
    <main className={`works-page ${pixel.className}`}>

      {/* ── FIXED NAV ── */}
      <nav className="top-tabs">
        <a href="/" className="tab start-tab">Start</a>
        <a href="/about"   className="tab">about</a>
        <a href="/works"   className="tab active-tab">works</a>
        <a href="/contact" className="tab">contact</a>
        <button className="tab plus-tab">+</button>
        <div className="tab-clock">
          <span>07/11/2003</span>
          <span>2:11 AM</span>
        </div>
      </nav>

      {/*
        SPACER — gives the page its scroll height.
        The fixed panel pins to the viewport while we're inside this div.
      */}
      <div ref={spacerRef} className="works-spacer" style={{ height: spacerH }} />

      {/*
        FIXED PANEL — always covers the viewport, but only shown while
        the spacer is the "active" scroll zone.
      */}
      {inRange && (
        <div
          ref={panelRef}
          className="works-panel"
          style={{ '--accent': activeWork.color } as CSSProperties}
        >
          {/* ── HEADER ── */}
          <header className="works-header">
            <div className="header-h1-wrap">
              <h1 className="header-h1">SELECTED<br />WORKS</h1>
            </div>
            <div className="header-desc-wrap">
              <p className="header-desc">
                featuring projects from 2021—2025, including internships,
                competitions, bootcamp projects, and group works.
              </p>
            </div>
            <div className="header-cats-wrap">
              <ul className="category-list">
                <li>UX DESIGN</li>
                <li>UI DESIGN</li>
                <li>RESEARCH</li>
                <li>WEB DEVELOPMENT</li>
              </ul>
            </div>
            <div className="header-stickers-wrap">
              <span className="sticker pink">scroll archive ✦</span>
              <span className="sticker yellow">6 selected files</span>
              <span className="red-star star-a">★</span>
              <span className="red-star star-b">✦</span>
            </div>
          </header>

          {/* ── WINDOWS ── */}
          <div className="works-content">
            {/* Preview */}
            <div className="preview-window">
              <div className="window-bar preview-bar">
                <span>PREVIEW</span><span>×</span>
              </div>
              <div className="preview-body">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeWork.slug + '-img'}
                    src={activeWork.image}
                    alt={activeWork.title}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                    exit={{    opacity: 0, y: -20, scale: 0.97 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    onError={e => { e.currentTarget.style.display = 'none' }}
                  />
                </AnimatePresence>
                <div className="fallback-label">{activeWork.title}</div>
              </div>
            </div>

            {/* Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWork.slug + '-detail'}
                className="detail-window"
                initial={{ opacity: 0, x: 32  }}
                animate={{ opacity: 1, x: 0   }}
                exit={{    opacity: 0, x: -32 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <div className="window-bar detail-bar">
                  <span>{activeWork.slug}.com</span><span>↗</span>
                </div>
                <div className="detail-body">
                  <div className="kicker">
                    <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                    <span>{String(WORKS.length).padStart(2, '0')}</span>
                  </div>
                  <h2 className="detail-h2">{activeWork.title}</h2>
                  <div className="meta-row">
                    <span>{activeWork.type}</span>
                    <span>{activeWork.role}</span>
                    <span>{activeWork.year}</span>
                  </div>
                  <p className="detail-p">{activeWork.description}</p>
                  <div className="tag-row">
                    {activeWork.tags.map(t => <span key={t}>{t}</span>)}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 14 }}>
                    <a href={`/works/${activeWork.slug}`} className="view-btn">Read More</a>
                    {activeWork.live && (
                      <a href={activeWork.live} target="_blank" rel="noopener noreferrer" className="view-btn">
                        <GlobeIcon /> Live Deployment
                      </a>
                    )}                    
                    {activeWork.github && <a href={activeWork.github} target="_blank" rel="noopener noreferrer" className="view-btn"><GitHubIcon /> Code</a>}
                    {activeWork.figma  && <a href={activeWork.figma}  target="_blank" rel="noopener noreferrer" className="view-btn">Figma</a>}
                    {activeWork.file && (
                      <a href={activeWork.file} target="_blank" rel="noopener noreferrer" className="view-btn">
                        <DocumentIcon /> Project File
                      </a>
                    )}
                    {activeWork.youtube && (
                    <div className="video-container">
                      <a href={activeWork.youtube} target="_blank" rel="noopener noreferrer" className="view-btn">
                        <YoutubeIcon /> Watch Demo
                      </a>
                    </div>
                  )}
                  {activeWork.play && (
                    <div className="video-container">
                      <a href={activeWork.play} target="_blank" rel="noopener noreferrer" className="view-btn">
                        <PlayIcon /> Presentation
                      </a>
                    </div>
                  )}
                  </div>    
                  </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── PROGRESS ── */}
          <footer className="progress-footer">
            <div className="progress-label">
              <span>{String(activeIndex + 1).padStart(2, '0')} / {String(WORKS.length).padStart(2, '0')}</span>
              <strong>{activeWork.title}</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </footer>
        </div>
      )}

      {/* ── AFTER WORKS — sits below the spacer in normal flow ── */}
      <section className="after-works">
        <h2>more files soon...</h2>
        <a href="/about">back to about</a>
      </section>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
          scroll-behavior: smooth;
        }

        .works-page {
          min-height: 100vh;
          background:
            radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px),
            #171717;
          background-size: 18px 18px;
          color: #f5f5f5;
        }

        /* ── NAV ── */
        .top-tabs {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 300;
          height: ${NAV_H}px;
          background: #d4d0c8;
          border-bottom: 2px solid #8d8d8d;
          display: flex;
          align-items: center;
          gap: 3px;
          padding: 0 8px;
          box-shadow: 0 2px 0 #fff;
        }
        .tab {
          height: 24px; min-width: 120px; padding: 0 14px;
          display: inline-flex; align-items: center; justify-content: center;
          text-decoration: none; color: #111; background: var(--xp);
          border: 1px solid; border-color: #fff #777 #777 #fff;
          font-family: 'Plus Jakarta Sans','Segoe UI',sans-serif;
          font-size: 13px; font-style: italic; cursor: default; white-space: nowrap;
          cursor: default; transition: background 0.1s;
        }
        .active-tab   { background: #fff; border-color: #777 #fff #fff #777; }
        .tab:hover { background: #c0bdb4; }
        .start-tab { min-width: 54px; font-style: normal; }
        .plus-tab  { min-width: 44px; font-size: 18px; padding-bottom: 3px; }
        .tab-clock {
          margin-left: auto; height: 24px; min-width: 140px; padding: 0 10px;
          display: flex; align-items: center; gap: 12px; background: #d4d0c8;
          border: 1px solid; border-color: #777 #fff #fff #777;
          font-family: 'Plus Jakarta Sans','Segoe UI',sans-serif;
          font-size: 13px; color: #111; font-style: italic;
        }

        /* ── SPACER — creates scroll distance, invisible ── */
        .works-spacer {
          /* height set inline */
          display: block;
          margin-top: ${NAV_H}px; /* push below fixed nav */
        }

        /* ── FIXED PANEL ── */
        .works-panel {
          position: fixed;
          top: ${NAV_H}px; left: 0; right: 0;
          height: calc(100vh - ${NAV_H}px);
          z-index: 100;
          display: flex;
          flex-direction: column;
          padding: 20px 72px 16px;
          background:
            radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px),
            #171717;
          background-size: 18px 18px;
        }

        /* ── HEADER ── */
        .works-header {
          display: flex;
          align-items: flex-start;
          gap: 28px;
          flex-shrink: 0;
          margin-bottom: 14px;
        }
        .header-h1-wrap   { flex: 0 0 auto; }
        .header-h1 {
          color: #fff;
          font-size: clamp(26px, 2.6vw, 46px);
          line-height: 0.95;
          font-weight: 400;
          letter-spacing: -3px;
          white-space: nowrap;
        }
        .header-desc-wrap { flex: 0 0 280px; }
        .header-desc {
          color: #fff; font-size: 10px; line-height: 1.7;
          font-family: 'Courier New', monospace; font-weight: 700;
          padding-top: 4px;
        }
        .header-cats-wrap { flex: 0 0 auto; }
        .category-list {
          list-style: none;
          padding-left: 18px; border-left: 2px solid #fff;
          display: flex; flex-direction: column; gap: 7px;
          color: #fff; font-size: 9px; line-height: 1.3; padding-top: 4px;
        }
        .header-stickers-wrap {
          position: relative; flex: 1; min-height: 80px;
        }
        .sticker {
          position: absolute; display: inline-block;
          color: #111; border: 2px solid rgba(0,0,0,0.18); border-radius: 12px;
          padding: 5px 12px;
          font-family: 'Comic Sans MS', cursive; font-size: 11px; font-weight: bold;
          box-shadow: 3px 3px 0 rgba(255,255,255,0.15); white-space: nowrap;
        }
        .pink   { top: 0;   left: 8px;   background: #f48fb1; transform: rotate(4deg);  }
        .yellow { top: 44px; left: 150px; background: #fff176; transform: rotate(-5deg); }
        .red-star { position: absolute; color: #e53935; pointer-events: none; }
        .star-a   { top: 68px; left: 76px;  font-size: 17px; transform: rotate(14deg); }
        .star-b   { top: 4px;  right: 12px; font-size: 14px; transform: rotate(-8deg); }

        /* ── WORKS CONTENT ── */
        .works-content {
          flex: 1 1 0;
          min-height: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: stretch;
        }

        /* ── WINDOWS ── */
        .preview-window,
        .detail-window {
          background: #f7f7f7; color: #111;
          border: 2px solid #111;
          box-shadow: 6px 6px 0 rgba(255,255,255,0.08);
          min-width: 0; min-height: 0;
          display: flex; flex-direction: column;
        }
        .preview-window { transform: rotate(-0.5deg); }
        .detail-window  { transform: rotate(0.4deg); }

        .window-bar {
          height: 28px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 12px; border-bottom: 2px solid #111;
          color: #111; font-size: 10px; text-transform: uppercase;
        }
        .preview-bar { background: var(--accent); }
        .detail-bar  { background: #d4d0c8; }

        /* preview fills remaining window height */
        .preview-body {
          position: relative;
          flex: 1 1 0; min-height: 0;
          background: #fff; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .preview-body img {
          position: relative; z-index: 2;
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .fallback-label {
          position: absolute; inset: 0; z-index: 1;
          display: flex; align-items: center; justify-content: center;
          color: #111; font-size: 20px; opacity: 0.12; text-align: center; padding: 24px;
        }

        /* detail body scrolls inside its window */
        .detail-body {
          position: relative;
          flex: 1 1 0; min-height: 0;
          padding: 18px 22px 20px;
          overflow-y: auto; overflow-x: hidden;
        }
        .kicker {
          position: absolute; top: 16px; right: 18px;
          display: flex; gap: 10px; color: var(--accent); font-size: 9px;
        }
        .detail-h2 {
          margin: 0 0 12px; color: #111;
          font-size: clamp(20px, 2.2vw, 38px);
          line-height: 1.05; text-transform: uppercase; font-weight: 400;
          letter-spacing: -2px; padding-right: 56px;
        }
        .meta-row {
          display: flex; flex-wrap: wrap; gap: 6px 14px; margin-bottom: 12px;
          color: #222; font-size: 9px; text-transform: uppercase;
        }
        .detail-p {
          margin: 0 0 12px; color: #111; font-size: 10px; line-height: 1.65;
          font-family: 'Courier New', monospace; font-weight: 700; max-width: 600px;
        }
        .tag-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .tag-row span {
          background: #e8e4dc; border: 2px solid #111;
          padding: 4px 7px; font-size: 8px; color: #111;
        }
        .view-btn {
          height: 36px;
          padding: 0 16px;
          display: inline-flex; align-items: center; justify-content: center;
          color: #111; text-decoration: none; background: #fff;
          border: 2px solid #111; border-radius: 10px; box-shadow: 4px 4px 0 #111;
          font-size: 10px; transition: transform 0.15s, box-shadow 0.15s;
        }
        .view-btn:hover { transform: translate(2px,2px); box-shadow: 2px 2px 0 #111; }

        /* ── PROGRESS ── */
        .progress-footer {
          flex-shrink: 0; margin-top: 12px;
          display: grid; grid-template-columns: 200px 1fr; gap: 18px; align-items: center;
        }
        .progress-label {
          display: flex; flex-direction: column; gap: 4px; color: #fff; font-size: 9px;
        }
        .progress-label strong { color: #fff; font-size: 9px; font-weight: 400; }
        .progress-track {
          height: 7px; border: 2px solid #fff; background: transparent; overflow: hidden;
        }
        .progress-fill { height: 100%; background: #fff; transition: width 0.3s ease; }

        /* ── AFTER WORKS ── */
        .after-works {
          /* sits below the spacer in normal document flow */
          min-height: 60vh;
          padding: 80px 72px;
          background: #e8e4dc; color: #111;
        }
        .after-works h2 {
          margin: 0 0 20px;
          font-size: clamp(24px, 3vw, 44px);
          line-height: 1.1; font-weight: 400;
        }
        .after-works a { color: #111; font-size: 11px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1280px) {
          .works-panel { padding: 16px 48px 14px; }
          .works-content { gap: 22px; }
          .header-desc-wrap { flex: 0 0 220px; }
        }
        @media (max-width: 1050px) {
          .works-panel { padding: 14px 32px 12px; }
          .works-header { flex-wrap: wrap; gap: 14px; }
          .header-stickers-wrap { display: none; }
          .header-h1 { font-size: 24px; }
          .works-content { grid-template-columns: 1fr; gap: 14px; }
          .detail-h2 { font-size: 20px; }
        }
        @media (max-width: 700px) {
          .tab-clock { display: none; }
          .tab { min-width: auto; padding: 0 8px; }
          .works-panel { padding: 12px 16px 10px; }
          .header-h1 { font-size: 20px; letter-spacing: -2px; }
          .header-desc-wrap { display: none; }
          .meta-row { flex-direction: column; gap: 4px; }
          .progress-footer { grid-template-columns: 1fr; }
          .detail-body { padding: 12px; }
        }
      `}</style>
    </main>
  )
}