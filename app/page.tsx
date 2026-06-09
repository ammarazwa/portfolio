'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useDragControls } from 'framer-motion'

type WindowId =
  | 'notepad'
  | 'documents'
  | 'warning'
  | 'terminal'
  | 'image'
  | 'likes'
  | 'paint'
  | 'audio'

type WindowState = {
  id: WindowId
  title: string
  icon: string
  x: number
  y: number
  zIndex: number
  minimized: boolean
  closed: boolean
}

type DesktopIconItem = {
  label: string
  icon: string
  href?: string
  type?: 'popup'
}

const PERSONAL_IMAGE = '/images/ammara-photo.png'
const BGM_AUDIO = '/audio/bgm.mp3'

const desktopIcons: DesktopIconItem[] = [
  { label: 'Notepad', icon: '/icons/notepad.png', type: 'popup' },
  { label: 'about me', icon: '/icons/about-txt.png', href: '/about' },
  { label: 'projects', icon: '/icons/selected-works.png', href: '/works' },
  { label: 'contact me', icon: '/icons/contact-phone.png', href: '/contact' },
  { label: 'my resume', icon: '/icons/cv-file.png', href: '/cv.pdf' },
]

const initialWindows: WindowState[] = [
  { id: 'documents', title: 'My Projects', icon: '/icons/my-documents.png', x: 280, y: 90, zIndex: 21, minimized: false, closed: false },
  { id: 'warning', title: 'Warning', icon: '/icons/alert.png', x: 860, y: 110, zIndex: 22, minimized: false, closed: false },
  { id: 'paint', title: 'Status - Paint', icon: '/icons/paint.png', x: 150, y: 315, zIndex: 23, minimized: false, closed: false },
  { id: 'likes', title: 'Open - My Documents', icon: '/icons/heart.png', x: 760, y: 440, zIndex: 25, minimized: false, closed: false },
  { id: 'audio', title: 'bgm.mp3 - Windows Media Player', icon: '/icons/audio.png', x: 1060, y: 445, zIndex: 26, minimized: false, closed: false },
  { id: 'terminal', title: 'My Skills', icon: '/icons/terminal.png', x: 305, y: 300, zIndex: 24, minimized: false, closed: false },
  { id: 'image', title: 'ammara-photo.jpg', icon: '/icons/image.png', x: 1140, y: 76, zIndex: 27, minimized: false, closed: false },
  { id: 'notepad', title: 'about_me.txt - Notepad', icon: '/icons/notepad.png', x: 505, y: 175, zIndex: 60, minimized: false, closed: false },
]

const skills = [
  'Java', 'Spring Boot', 'Angular', 'React.js', 'Next.js', 'TypeScript',
  'Python', 'PostgreSQL', 'Tailwind CSS', 'Figma', 'Git', 'GitHub',
  'REST API', 'Supabase', 'MySQL', 'Laravel Blade', 'PHP', 'Data Cleaning',
  'Data Visualization', 'Machine Learning Basics', 'UI/UX Design',
  'Wireframing', 'Prototyping', 'Functional Testing', 'Technical Documentation',
]

// Mobile window order — most important first
const mobileWindowOrder: WindowId[] = [
  'notepad', 'paint', 'terminal', 'documents', 'likes', 'warning', 'image', 'audio',
]

export default function HomePage() {
  const [topZ, setTopZ] = useState(70)
  const [windows, setWindows] = useState<WindowState[]>(initialWindows)
  const [mobileCollapsed, setMobileCollapsed] = useState<Set<WindowId>>(new Set())

  const focusWindow = (id: WindowId) => {
    const nextZ = topZ + 1
    setTopZ(nextZ)
    setWindows((prev) => prev.map((win) => (win.id === id ? { ...win, zIndex: nextZ } : win)))
  }

  const openAllPopups = () => {
    setTopZ(70)
    setWindows((prev) =>
      prev.map((win) => ({
        ...win,
        closed: false,
        minimized: false,
        zIndex: win.id === 'notepad' ? 80 : win.zIndex,
      }))
    )
  }

  const closeWindow = (id: WindowId) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, closed: true, minimized: false } : win))
    )
  }

  const minimizeWindow = (id: WindowId) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, minimized: true } : win))
    )
  }

  const restoreWindow = (id: WindowId) => {
    const nextZ = topZ + 1
    setTopZ(nextZ)
    setWindows((prev) =>
      prev.map((win) =>
        win.id === id ? { ...win, closed: false, minimized: false, zIndex: nextZ } : win
      )
    )
  }

  const toggleMobileCollapse = (id: WindowId) => {
    setMobileCollapsed((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const visibleWindows = windows.filter((win) => !win.closed && !win.minimized)
  const openedWindows = windows.filter((win) => !win.closed)

  // Mobile: get windows in defined order, excluding closed ones
  const mobileWindows = mobileWindowOrder
    .map((id) => windows.find((w) => w.id === id))
    .filter((w): w is WindowState => !!w && !w.closed)

  return (
    <main className="xp-desktop">

      {/* ── DESKTOP LAYOUT ── */}
      <div className="desktop-only">
        <div className="desktop-icons">
          {desktopIcons.map((item) => {
            if (item.type === 'popup') {
              return (
                <button key={item.label} className="desktop-icon" onClick={openAllPopups}>
                  <img src={item.icon} alt={item.label} className="desktop-icon-img" />
                  <span>{item.label}</span>
                </button>
              )
            }
            return (
              <a key={item.label} className="desktop-icon" href={item.href}>
                <img src={item.icon} alt={item.label} className="desktop-icon-img" />
                <span>{item.label}</span>
              </a>
            )
          })}
        </div>

        <section className="xp-window main-window">
          <div className="xp-titlebar">
            <div className="xp-title-left">
              <img src="/icons/selected-works.png" alt="" />
              <span>Portfolio - Windows Explorer</span>
            </div>
            <div className="xp-controls">
              <button aria-label="Minimize">_</button>
              <button aria-label="Maximize">□</button>
              <button aria-label="Close">×</button>
            </div>
          </div>
          <div className="xp-menubar">
            <span>File</span><span>Edit</span><span>View</span>
            <span>Favorites</span><span>Tools</span><span>Help</span>
          </div>
          <div className="xp-content">
            <div className="xp-inner">
              <p>Click Notepad to open my little desktop files...</p>
            </div>
          </div>
        </section>

        {visibleWindows.map((win) => (
          <DraggableWindow
            key={win.id}
            win={win}
            onFocus={focusWindow}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
          >
            <WindowContent id={win.id} />
          </DraggableWindow>
        ))}

        {/* Desktop taskbar */}
        <div className="xp-taskbar">
          <button className="xp-start">
            <span className="windows-logo">
              <span /><span /><span /><span />
            </span>
            <span>start</span>
          </button>
          <div className="taskbar-separator" />
          <button className="taskbar-app active">
            <img src="/icons/selected-works.png" alt="" />
            <span>Portfolio - Windows Explorer</span>
          </button>
          {openedWindows.map((win) => (
            <button
              key={win.id}
              className={win.minimized ? 'taskbar-app' : 'taskbar-app active'}
              onClick={() => restoreWindow(win.id)}
            >
              <img src={win.icon} alt="" />
              <span>{win.title}</span>
            </button>
          ))}
          <div className="taskbar-spacer" />
          <div className="xp-tray">
            <span className="tray-dot" />
            <span className="tray-text">EN</span>
            <span className="tray-time">10:24 PM</span>
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="mobile-only">
        {/* Mobile top bar */}
        <div className="mobile-topbar">
          <div className="mobile-topbar-left">
            <span className="windows-logo small">
              <span /><span /><span /><span />
            </span>
            <span className="mobile-topbar-title">ammara's portfolio</span>
          </div>
          <div className="mobile-topbar-right">
            <span className="tray-dot" />
          </div>
        </div>

        {/* Mobile icon strip */}
        <div className="mobile-icon-strip">
          {desktopIcons.map((item) => {
            if (item.type === 'popup') {
              return (
                <button key={item.label} className="mobile-icon" onClick={openAllPopups}>
                  <img src={item.icon} alt={item.label} />
                  <span>{item.label}</span>
                </button>
              )
            }
            return (
              <a key={item.label} className="mobile-icon" href={item.href}>
                <img src={item.icon} alt={item.label} />
                <span>{item.label}</span>
              </a>
            )
          })}
        </div>

        {/* Mobile windows as stacked cards */}
        <div className="mobile-windows">
          {mobileWindows.map((win) => (
            <div key={win.id} className="mobile-window xp-window">
              <div
                className="xp-titlebar mobile-titlebar"
                onClick={() => toggleMobileCollapse(win.id)}
              >
                <div className="xp-title-left">
                  <img src={win.icon} alt="" />
                  <span>{win.title}</span>
                </div>
                <div className="xp-controls">
                  <button
                    aria-label="Close"
                    onClick={(e) => { e.stopPropagation(); closeWindow(win.id) }}
                  >×</button>
                  <button aria-label="Toggle" onClick={(e) => { e.stopPropagation(); toggleMobileCollapse(win.id) }}>
                    {mobileCollapsed.has(win.id) ? '□' : '_'}
                  </button>
                </div>
              </div>
              {!mobileCollapsed.has(win.id) && (
                <div className="popup-content mobile-popup-content">
                  <WindowContent id={win.id} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile bottom nav */}
        <div className="mobile-taskbar">
          <button className="xp-start small">
            <span className="windows-logo small">
              <span /><span /><span /><span />
            </span>
            <span>start</span>
          </button>
          <div className="taskbar-separator" />
          <a href="/about" className="taskbar-app">
            <img src="/icons/about-txt.png" alt="" />
            <span>about</span>
          </a>
          <a href="/works" className="taskbar-app active">
            <img src="/icons/selected-works.png" alt="" />
            <span>works</span>
          </a>
          <a href="/contact" className="taskbar-app">
            <img src="/icons/contact-phone.png" alt="" />
            <span>contact</span>
          </a>
          <div className="taskbar-spacer" />
          <div className="xp-tray small">
            <span className="tray-dot" />
          </div>
        </div>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }

        /* ── SHOW/HIDE by breakpoint ── */
        .desktop-only { display: block; }
        .mobile-only  { display: none; }

        @media (max-width: 767px) {
          .desktop-only { display: none; }
          .mobile-only  { display: flex; flex-direction: column; min-height: 100vh; }
          html, body    { overflow: auto; }
        }

        /* ══════════════════════════════════════
           DESKTOP STYLES (unchanged)
        ══════════════════════════════════════ */
        .xp-desktop {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          font-family: Tahoma, "MS Sans Serif", Arial, sans-serif;
          background-image: url('/xp-grass.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        @media (min-width: 768px) {
          .xp-desktop { overflow: hidden; height: 100vh; }
          html, body   { overflow: hidden; }
        }

        .desktop-icons {
          position: absolute;
          top: 24px; left: 22px;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .desktop-icon {
          width: 88px;
          min-height: 76px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 5px;
          border: none;
          background: transparent;
          text-decoration: none;
          color: #fff;
          user-select: none;
          cursor: default;
          padding: 0;
          font-family: Tahoma, "MS Sans Serif", Arial, sans-serif;
        }

        .desktop-icon-img {
          width: 46px; height: 46px;
          object-fit: contain; display: block;
          filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.6));
        }

        .desktop-icon span {
          max-width: 84px;
          padding: 2px 4px;
          color: #fff;
          font-size: 11px;
          line-height: 1.2;
          text-align: center;
          text-shadow: 1px 1px 2px #000, -1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000;
        }

        .desktop-icon:hover span {
          background: rgba(49,106,197,0.92);
          outline: 1px dotted rgba(255,255,255,0.9);
        }

        .xp-window {
          background: #ece9d8;
          border: 2px solid #fff;
          outline: 1px solid #848284;
          box-shadow: 3px 3px 0 rgba(0,0,0,0.7);
          border-radius: 5px 5px 0 0;
          overflow: hidden;
        }

        .main-window {
          position: absolute;
          top: 90px; left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          width: min(760px, calc(100vw - 48px));
          min-height: 420px;
        }

        .xp-titlebar {
          height: 28px;
          padding: 3px 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(180deg, #0a246a 0%, #2f65b8 48%, #1f75d6 100%);
          color: #fff;
          font-size: 12px;
          font-weight: bold;
          text-shadow: 1px 1px 0 rgba(0,0,0,0.75);
          user-select: none;
          cursor: grab;
        }

        .xp-titlebar:active { cursor: grabbing; }

        .xp-title-left {
          display: flex; align-items: center; gap: 6px;
        }

        .xp-title-left img { width: 16px; height: 16px; object-fit: contain; }

        .xp-controls {
          display: flex; align-items: center; gap: 2px;
        }

        .xp-controls button {
          width: 20px; height: 18px; padding: 0;
          background: #ece9d8;
          border: 1px solid;
          border-color: #fff #848284 #848284 #fff;
          color: #111;
          font-family: Tahoma, "MS Sans Serif", Arial, sans-serif;
          font-size: 11px; font-weight: bold; line-height: 14px;
          cursor: default;
        }

        .xp-controls button:active { border-color: #848284 #fff #fff #848284; }

        .xp-menubar {
          height: 24px;
          display: flex; align-items: center; gap: 16px;
          padding: 0 9px;
          background: #ece9d8;
          border-bottom: 1px solid #b8b4a5;
          color: #111; font-size: 11px;
        }

        .xp-content { min-height: 368px; padding: 10px; background: #ece9d8; }

        .xp-inner {
          min-height: 348px; background: #fff;
          border: 1px inset #848284;
          display: flex; align-items: center; justify-content: center;
          color: #777; font-size: 12px;
        }

        .xp-inner p { margin: 0; }

        .popup-content { background: #ece9d8; padding: 10px; color: #111; font-size: 11px; }

        /* ── Window contents ── */
        .notepad-body {
          width: 520px; height: 390px;
          background: #fff;
          border: 1px inset #848284;
          padding: 20px;
          font-family: "Courier New", monospace;
          font-size: 15px; line-height: 1.85;
          white-space: pre-wrap;
          overflow-y: auto;
        }

        .notepad-heading {
          display: block; color: #b71c1c;
          font-size: 24px; line-height: 1.3;
          font-weight: bold; margin-bottom: 6px;
        }

        .notepad-blue { color: #1565c0; font-weight: bold; }

        .documents-body {
          width: 410px; background: #fff;
          border: 1px inset #848284; padding: 14px;
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .folder-item {
          min-height: 82px; color: #111; text-decoration: none;
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          text-align: center; font-size: 11px;
          padding: 6px; border-radius: 2px;
        }

        .folder-item:hover { background: #d6e8f7; }
        .folder-item img { width: 42px; height: 42px; object-fit: contain; }

        .warning-box {
          width: 320px; background: #ece9d8;
          padding: 14px; display: flex;
          gap: 12px; align-items: flex-start;
        }

        .warning-icon {
          width: 42px; height: 42px; border-radius: 50%;
          background: #f7d54a; border: 2px solid #9f7a00;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; font-weight: bold; color: #111; flex-shrink: 0;
        }

        .warning-text { font-size: 12px; line-height: 1.5; }
        .warning-text strong { display: block; margin-bottom: 6px; }

        .terminal-body {
          width: 440px; height: 260px;
          background: #000; color: #00ff41;
          padding: 10px;
          font-family: "Courier New", monospace;
          font-size: 12px; line-height: 1.7;
          border: 1px inset #848284;
          overflow-y: auto; overflow-x: hidden;
        }

        .terminal-body::-webkit-scrollbar,
        .notepad-body::-webkit-scrollbar { width: 14px; }

        .terminal-body::-webkit-scrollbar-track,
        .notepad-body::-webkit-scrollbar-track {
          background: #d4d0c8; border-left: 1px solid #848284;
        }

        .terminal-body::-webkit-scrollbar-thumb,
        .notepad-body::-webkit-scrollbar-thumb {
          background: #ece9d8; border: 1px solid;
          border-color: #fff #848284 #848284 #fff;
        }

        .terminal-muted { color: #8a8a8a; }
        .terminal-skill { color: #00ff41; }

        .image-body {
          width: 300px; background: #fff;
          border: 1px inset #848284; padding: 8px;
        }

        .image-body img {
          width: 100%; max-height: 430px;
          object-fit: cover; display: block;
          border: 1px solid #aaa;
        }

        .likes-body {
          width: 390px; background: #fff;
          border: 1px inset #848284; padding: 12px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .likes-body h3 { margin: 0 0 8px; font-size: 12px; letter-spacing: 1px; }
        .likes-body p  { margin: 0; line-height: 1.8; font-size: 11px; }
        .likes    { color: #23833a; }
        .dislikes { color: #b71c1c; }

        .paint-app {
          width: 520px; background: #cfcfd4;
          border: 1px solid #8d8d92; padding: 6px;
        }

        .paint-workspace {
          display: grid; grid-template-columns: 74px 1fr;
          gap: 8px; align-items: stretch;
        }

        .paint-toolbar {
          background: #d4d0c8;
          border: 1px solid; border-color: #fff #7f7f7f #7f7f7f #fff;
          padding: 4px; display: grid;
          grid-template-columns: 1fr 1fr; gap: 3px; align-content: start;
        }

        .paint-tool {
          width: 28px; height: 28px; background: #d4d0c8;
          border: 1px solid; border-color: #fff #7f7f7f #7f7f7f #fff;
          display: flex; align-items: center; justify-content: center;
          color: #111; font-size: 14px; line-height: 1;
        }

        .paint-tool span { transform: scale(0.95); }

        .paint-tool-preview {
          grid-column: 1 / -1; height: 58px; margin-top: 8px;
          background: #cfcbd1; border: 1px solid;
          border-color: #7f7f7f #fff #fff #7f7f7f;
        }

        .paint-canvas-wrap {
          background: #d4d0c8; border: 1px solid;
          border-color: #7f7f7f #fff #fff #7f7f7f; padding: 6px;
        }

        .paint-canvas {
          position: relative; background: #fff;
          min-height: 300px; border: 1px solid #9b9b9b;
          overflow: hidden; padding: 24px 20px;
        }

        .paint-hand-line {
          font-family: "Comic Sans MS", "Marker Felt", cursive;
          font-weight: bold; text-align: center; user-select: none;
        }

        .paint-line-open { color: #2f43ff; font-size: 52px; line-height: 1; margin-top: 18px; transform: rotate(-2deg); }
        .paint-line-work { color: #2f43ff; font-size: 54px; line-height: 1; margin-top: 4px; transform: rotate(1deg); }
        .paint-line-note { color: #ff2fcf; font-size: 24px; line-height: 1.25; margin-top: 30px; transform: rotate(-1deg); }

        .paint-line-open span:nth-child(odd),
        .paint-line-work span:nth-child(odd),
        .paint-line-note span:nth-child(odd) { display: inline-block; transform: rotate(-3deg) translateY(-1px); }

        .paint-line-open span:nth-child(even),
        .paint-line-work span:nth-child(even),
        .paint-line-note span:nth-child(even) { display: inline-block; transform: rotate(3deg) translateY(1px); }

        .paint-small-doodle { position: absolute; font-family: "Comic Sans MS", cursive; font-weight: bold; }
        .doodle-a { top: 18px; right: 30px; color: #39b54a; font-size: 28px; transform: rotate(8deg); }
        .doodle-b { bottom: 26px; left: 32px; color: #2f7ec1; font-size: 28px; transform: rotate(-8deg); }
        .doodle-c { bottom: 24px; right: 40px; color: #f59e0b; font-size: 30px; transform: rotate(10deg); }

        .paint-palette {
          margin-top: 8px; background: #d4d0c8;
          border: 1px solid; border-color: #fff #7f7f7f #7f7f7f #fff;
          padding: 4px 6px; display: flex; flex-wrap: wrap;
          align-items: center; gap: 3px;
        }

        .paint-color { width: 18px; height: 18px; border: 1px solid #4d4d4d; display: inline-block; }
        .paint-color.preview {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, #fff 0 50%, #ececec 50% 100%);
          margin-right: 8px;
        }

        .audio-player-body {
          width: 340px; background: #ece9d8;
          border: 1px inset #848284; padding: 14px;
        }

        .audio-now-playing {
          background: #fff; border: 1px inset #848284;
          padding: 12px; display: flex;
          align-items: center; gap: 12px; margin-bottom: 12px;
        }

        .audio-disc {
          width: 58px; height: 58px; border-radius: 50%;
          background:
            radial-gradient(circle at center, #ece9d8 0 11%, transparent 12%),
            conic-gradient(#8e8e8e, #fff, #6d6d6d, #fff, #8e8e8e);
          border: 2px solid #777; flex-shrink: 0;
        }

        .audio-meta { font-size: 12px; line-height: 1.5; }
        .audio-meta strong { display: block; color: #111; font-size: 13px; }
        .audio-meta span   { color: #555; }
        .audio-control     { width: 100%; }

        /* ── Desktop Taskbar ── */
        .xp-taskbar {
          position: fixed; left: 0; right: 0; bottom: 0;
          height: 34px; z-index: 9999;
          display: flex; align-items: center; gap: 4px; padding: 0 4px;
          background: linear-gradient(180deg, #2b71e6 0%, #2864d8 18%, #1d55c9 50%, #1745a8 100%);
          border-top: 1px solid rgba(255,255,255,0.45);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
          font-family: Tahoma, "MS Sans Serif", Arial, sans-serif;
        }

        .xp-start {
          height: 30px; min-width: 92px; padding: 0 15px 0 10px;
          display: flex; align-items: center; gap: 7px;
          border: none; border-radius: 0 14px 14px 0;
          background: linear-gradient(180deg, #77d15a 0%, #42a62a 45%, #257813 100%);
          color: #fff; font-size: 13px; font-weight: bold; font-style: italic;
          text-shadow: 1px 1px 1px rgba(0,0,0,0.7);
          box-shadow: inset 1px 1px 0 rgba(255,255,255,0.45), inset -1px -1px 0 rgba(0,0,0,0.35);
          cursor: default;
        }

        .xp-start.small { min-width: 70px; font-size: 11px; height: 26px; }

        .windows-logo {
          width: 18px; height: 18px;
          display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
          gap: 2px; transform: perspective(20px) rotateY(-12deg);
        }

        .windows-logo.small { width: 14px; height: 14px; }

        .windows-logo span:nth-child(1) { background: #f44336; }
        .windows-logo span:nth-child(2) { background: #4caf50; }
        .windows-logo span:nth-child(3) { background: #2196f3; }
        .windows-logo span:nth-child(4) { background: #ffeb3b; }

        .taskbar-separator {
          width: 1px; height: 24px; margin: 0 3px;
          background: rgba(255,255,255,0.22);
          box-shadow: 1px 0 0 rgba(0,0,0,0.2);
        }

        .taskbar-app {
          height: 26px; width: 155px; padding: 0 9px;
          display: flex; align-items: center; gap: 7px;
          background: linear-gradient(180deg, rgba(100,151,232,0.95) 0%, rgba(49,105,207,0.95) 100%);
          border: 1px solid;
          border-color: rgba(255,255,255,0.45) rgba(0,0,0,0.35) rgba(0,0,0,0.35) rgba(255,255,255,0.45);
          color: #fff;
          font-family: Tahoma, "MS Sans Serif", Arial, sans-serif;
          font-size: 11px; text-align: left; text-decoration: none;
          box-shadow: inset 1px 1px 2px rgba(255,255,255,0.18);
          cursor: default;
        }

        .taskbar-app.active {
          background: linear-gradient(180deg, #3d7ee8 0%, #245cc8 100%);
          box-shadow: inset 1px 1px 2px rgba(0,0,0,0.25), inset -1px -1px 1px rgba(255,255,255,0.12);
        }

        .taskbar-app img { width: 16px; height: 16px; object-fit: contain; flex-shrink: 0; }

        .taskbar-app span {
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        .taskbar-spacer { flex: 1; }

        .xp-tray {
          height: 28px; min-width: 120px; padding: 0 10px;
          display: flex; align-items: center; justify-content: flex-end; gap: 8px;
          background: linear-gradient(180deg, #18a3ee 0%, #0d8bd8 100%);
          border-left: 1px solid rgba(255,255,255,0.38);
          box-shadow: inset 1px 0 0 rgba(255,255,255,0.18);
          color: #fff; font-size: 11px;
          text-shadow: 1px 1px 1px rgba(0,0,0,0.45);
        }

        .xp-tray.small { min-width: 32px; padding: 0 8px; }

        .tray-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: #6aff6a; border: 1px solid rgba(0,0,0,0.35);
          box-shadow: inset 1px 1px 0 rgba(255,255,255,0.6);
        }

        .tray-text  { font-size: 11px; }
        .tray-time  { font-size: 11px; white-space: nowrap; }

        /* ══════════════════════════════════════
           MOBILE STYLES
        ══════════════════════════════════════ */
        .mobile-only {
          background-image: url('/xp-grass.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        /* Mobile top bar */
        .mobile-topbar {
          position: sticky; top: 0; z-index: 100;
          height: 34px; padding: 0 12px;
          display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(180deg, #0a246a 0%, #2f65b8 48%, #1f75d6 100%);
          border-bottom: 2px solid #0a246a;
        }

        .mobile-topbar-left {
          display: flex; align-items: center; gap: 8px;
        }

        .mobile-topbar-title {
          color: #fff; font-size: 12px; font-weight: bold;
          font-style: italic; font-family: Tahoma, sans-serif;
          text-shadow: 1px 1px 0 rgba(0,0,0,0.6);
        }

        .mobile-topbar-right {
          display: flex; align-items: center; gap: 8px;
        }

        /* Mobile icon strip */
        .mobile-icon-strip {
          display: flex; gap: 6px;
          padding: 10px 12px;
          overflow-x: auto; scrollbar-width: none;
          background: rgba(0,0,0,0.25);
          backdrop-filter: blur(2px);
          border-bottom: 1px solid rgba(255,255,255,0.15);
        }

        .mobile-icon-strip::-webkit-scrollbar { display: none; }

        .mobile-icon {
          min-width: 60px; padding: 6px 4px;
          display: flex; flex-direction: column;
          align-items: center; gap: 4px;
          border: none; background: transparent;
          text-decoration: none; cursor: default;
          flex-shrink: 0;
        }

        .mobile-icon img {
          width: 36px; height: 36px; object-fit: contain;
          filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.6));
        }

        .mobile-icon span {
          color: #fff; font-size: 10px; line-height: 1.2;
          text-align: center; white-space: nowrap;
          font-family: Tahoma, sans-serif;
          text-shadow: 1px 1px 2px #000, -1px 1px 2px #000;
        }

        /* Mobile windows */
        .mobile-windows {
          flex: 1;
          display: flex; flex-direction: column; gap: 12px;
          padding: 12px 12px 12px;
          overflow-y: auto;
        }

        .mobile-window {
          width: 100% !important;
          border-radius: 5px 5px 0 0;
          box-shadow: 3px 3px 0 rgba(0,0,0,0.5);
        }

        .mobile-titlebar {
          cursor: pointer !important;
        }

        .mobile-popup-content {
          padding: 8px;
          overflow-x: auto;
        }

        /* Make window contents fluid on mobile */
        .mobile-popup-content .notepad-body,
        .mobile-popup-content .terminal-body,
        .mobile-popup-content .documents-body,
        .mobile-popup-content .warning-box,
        .mobile-popup-content .likes-body,
        .mobile-popup-content .audio-player-body,
        .mobile-popup-content .image-body,
        .mobile-popup-content .paint-app {
          width: 100% !important;
          max-width: 100%;
        }

        .mobile-popup-content .notepad-body {
          height: 280px; font-size: 13px;
        }

        .mobile-popup-content .terminal-body {
          height: 220px; font-size: 11px;
        }

        .mobile-popup-content .documents-body {
          grid-template-columns: repeat(3, 1fr);
        }

        .mobile-popup-content .paint-app {
          overflow-x: auto;
        }

        .mobile-popup-content .paint-canvas {
          min-height: 220px;
        }

        .mobile-popup-content .paint-line-open { font-size: 36px; }
        .mobile-popup-content .paint-line-work { font-size: 38px; }
        .mobile-popup-content .paint-line-note { font-size: 18px; }

        .mobile-popup-content .likes-body {
          grid-template-columns: 1fr 1fr;
        }

        .mobile-popup-content .audio-control {
          width: 100%;
        }

        .mobile-popup-content .image-body img {
          max-height: 280px;
        }

        /* Mobile taskbar */
        .mobile-taskbar {
          position: sticky; bottom: 0; z-index: 100;
          height: 40px; padding: 0 4px;
          display: flex; align-items: center; gap: 3px;
          background: linear-gradient(180deg, #2b71e6 0%, #2864d8 18%, #1d55c9 50%, #1745a8 100%);
          border-top: 1px solid rgba(255,255,255,0.45);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
          font-family: Tahoma, "MS Sans Serif", Arial, sans-serif;
        }

        .mobile-taskbar .taskbar-app {
          width: auto; flex: 1;
          height: 30px; padding: 0 6px;
          font-size: 10px; justify-content: center;
        }

        .mobile-taskbar .taskbar-app span {
          display: block;
        }
      `}</style>
    </main>
  )
}

function DraggableWindow({
  win, onFocus, onClose, onMinimize, children,
}: {
  win: WindowState
  onFocus: (id: WindowId) => void
  onClose: (id: WindowId) => void
  onMinimize: (id: WindowId) => void
  children: ReactNode
}) {
  const controls = useDragControls()

  return (
    <motion.section
      className="xp-window"
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      initial={{ x: win.x, y: win.y, opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.16 }}
      onPointerDown={() => onFocus(win.id)}
      style={{ position: 'absolute', zIndex: win.zIndex }}
    >
      <div
        className="xp-titlebar"
        onPointerDown={(e) => {
          const target = e.target as HTMLElement
          if (target.closest('.xp-controls')) return
          onFocus(win.id)
          controls.start(e)
        }}
      >
        <div className="xp-title-left">
          <img src={win.icon} alt="" />
          <span>{win.title}</span>
        </div>
        <div className="xp-controls">
          <button aria-label="Minimize" onClick={(e) => { e.stopPropagation(); onMinimize(win.id) }}>_</button>
          <button aria-label="Maximize">□</button>
          <button aria-label="Close" onClick={(e) => { e.stopPropagation(); onClose(win.id) }}>×</button>
        </div>
      </div>
      <div className="xp-menubar">
        <span>File</span><span>Edit</span><span>View</span><span>Help</span>
      </div>
      <div className="popup-content"><WindowContent id={win.id} /></div>
    </motion.section>
  )
}

function WindowContent({ id }: { id: WindowId }) {
  if (id === 'notepad') {
    return (
      <div className="notepad-body">
        <span className="notepad-heading">hi, i'm ammara —</span>
        an informatics student who enjoys building web products, designing clean
        interfaces, and turning ideas into usable digital experiences.
        {'\n\n'}
        currently exploring full-stack development, UI/UX, and AI-powered systems.
        {'\n\n'}
        <span className="notepad-blue">designer who can code.</span>
        {'\n'}
        <span className="notepad-blue">developer who cares about users. ★</span>
      </div>
    )
  }

  if (id === 'documents') {
    return (
      <div className="documents-body">
        <a className="folder-item" href="/works">
          <img src="/icons/selected-works.png" alt="" /><span>Zichara</span>
        </a>
        <a className="folder-item" href="/works/naratrad">
          <img src="/icons/selected-works.png" alt="" /><span>Naratrad</span>
        </a>
        <a className="folder-item" href="/works/safeena">
          <img src="/icons/selected-works.png" alt="" /><span>Safeena Academy</span>
        </a>
        <a className="folder-item" href="/works/addicx">
          <img src="/icons/selected-works.png" alt="" /><span>Addicx</span>
        </a>
        <a className="folder-item" href="/works/zichara">
          <img src="/icons/selected-works.png" alt="" /><span>Zichara</span>
        </a>
        <a className="folder-item" href="/works/seluna">
          <img src="/icons/selected-works.png" alt="" /><span>Seluna</span>
        </a>
      </div>
    )
  }

  if (id === 'warning') {
    return (
      <div className="warning-box">
        <img src="/icons/alert.png" alt="Warning" style={{ width: '32px', height: '32px' }} />
        <div className="warning-text">
          <strong>tiny reminder:</strong>
          Good design is not only about how it looks, but how gently it helps people move.
        </div>
      </div>
    )
  }

  if (id === 'terminal') {
    return (
      <div className="terminal-body">
        <span className="terminal-muted">C:\ammara&gt;</span> skills --all<br /><br />
        {skills.map((skill) => (
          <div key={skill}>
            <span className="terminal-muted">- </span>
            <span className="terminal-skill">{skill}</span>
          </div>
        ))}
        <br />
        <span className="terminal-muted">C:\ammara&gt;</span>{' '}
        <span className="terminal-skill">_</span>
      </div>
    )
  }

  if (id === 'image') {
    return (
      <div className="image-body">
        <img src={PERSONAL_IMAGE} alt="Ammara" />
      </div>
    )
  }

  if (id === 'likes') {
    return (
      <div className="likes-body">
        <div>
          <h3 className="likes">LIKES</h3>
          <p>— books</p><p>— sleep</p><p>— cat</p>
          <p>— wind & sun</p><p>— coffee</p>
          <p>— vitamin sea</p><p>— history</p>
        </div>
        <div>
          <h3 className="dislikes">DISLIKES</h3>
          <p>— super crowded places</p><p>— full storage</p>
          <p>— late to meetings</p><p>— provocative</p><p>— mango</p>
        </div>
      </div>
    )
  }

  if (id === 'audio') {
    return (
      <div className="audio-player-body">
        <div className="audio-now-playing">
          <div className="audio-disc" />
          <div className="audio-meta">
            <strong>bgm.mp3</strong>
            <span>Now playing: portfolio soundtrack</span>
          </div>
        </div>
        <audio className="audio-control" controls loop src={BGM_AUDIO}>
          Your browser does not support the audio element.
        </audio>
      </div>
    )
  }

  return (
    <div className="paint-app">
      <div className="paint-workspace">
        <div className="paint-toolbar">
          {['✂','⬚','⌫','🪣','🖌','◯','✏','▥','／','∿','▭','⬭'].map((tool, i) => (
            <div key={i} className="paint-tool"><span>{tool}</span></div>
          ))}
          <div className="paint-tool-preview" />
        </div>
        <div className="paint-canvas-wrap">
          <div className="paint-canvas">
            <div className="paint-small-doodle doodle-a">★</div>
            <div className="paint-hand-line paint-line-open">
              {'OPEN'.split('').map((char, i) => <span key={`open-${i}`}>{char}</span>)}
            </div>
            <div className="paint-hand-line paint-line-work">
              {'TO WORK'.split('').map((char, i) => <span key={`work-${i}`}>{char === ' ' ? '\u00A0' : char}</span>)}
            </div>
            <div className="paint-hand-line paint-line-note">
              {'(read cv for more info)'.split('').map((char, i) => <span key={`note-${i}`}>{char === ' ' ? '\u00A0' : char}</span>)}
            </div>
            <div className="paint-small-doodle doodle-b">↗</div>
            <div className="paint-small-doodle doodle-c">✿</div>
          </div>
        </div>
      </div>
      <div className="paint-palette">
        <div className="paint-color preview" />
        {['#000000','#7f7f7f','#7a0000','#7a6a00','#007000','#007a7a','#00007a','#7a007a',
          '#7b7562','#003f3f','#2f7ec1','#0a246a','#0b45ff','#6b3f2b','#ffffff','#8b4a2f',
          '#ff2f2f','#fff133','#66ff66','#66ffff','#3a59ff','#ff3aff','#f3efc7','#c9ffd2',
          '#c8f7ff','#c4cbff','#ff6ca8','#ff9b66'].map((color, i) => (
          <span key={i} className="paint-color" style={{ background: color }} />
        ))}
      </div>
    </div>
  )
}