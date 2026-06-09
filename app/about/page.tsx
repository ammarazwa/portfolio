"use client";

import { useEffect, useState } from "react";
import { Press_Start_2P } from "next/font/google";

const pixel = Press_Start_2P({ weight: "400", subsets: ["latin"] });

const SKILLS = [
  { label: "JS", name: "JavaScript", color: "#f7df1e", text: "#333" },
  { label: "TS", name: "TypeScript", color: "#3178c6", text: "#fff" },
  { label: "Py", name: "Python", color: "#3776ab", text: "#fff" },
  { label: "Re", name: "React", color: "#61dafb", text: "#333" },
  { label: "Nx", name: "Next.js", color: "#111", text: "#fff" },
  { label: "Fi", name: "Figma", color: "#a259ff", text: "#fff" },
  { label: "DB", name: "PostgreSQL", color: "#336791", text: "#fff" },
  { label: "UI", name: "UI/UX", color: "#ff5fa2", text: "#fff" },
  { label: "Sp", name: "Spr. Boot", color: "#6aad3d", text: "#fff" },
  { label: "Tw", name: "Tailwind", color: "#38bdf8", text: "#fff" },
];

const SOCIALS = [
  {
    icon: "✉",
    label: "Email",
    value: "mara.azwa@gmail.com",
    href: "mailto:mara.azwa@gmail.com",
  },
  {
    icon: "in",
    label: "LinkedIn",
    value: "/in/ammara-azwadiena",
    href: "https://linkedin.com/in/ammara-azwadiena",
  },
  {
    icon: "GH",
    label: "GitHub",
    value: "ammarazwa",
    href: "https://github.com/ammarazwa",
  },
];

const XP = {
  bg: "#d4d0c8",
  font: "'Plus Jakarta Sans','Segoe UI',sans-serif",
};

// ── Clock — same as contact page ──
function Clock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
      setDate(now.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        marginLeft: "auto",
        height: 24,
        padding: "0 10px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: XP.bg,
        border: "1px solid",
        borderColor: "#777 #fff #fff #777",
        fontFamily: XP.font,
        fontSize: 13,
        fontStyle: "italic",
        color: "#111",
      }}
    >
      <span>{date}</span>
      <span>{time}</span>
    </div>
  );
}

function XPWindow({
  title,
  children,
  rotate = 0,
  style = {},
}: {
  title: string;
  children: React.ReactNode;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: XP.bg,
        border: "2px solid #fff",
        outline: "1px solid #848284",
        boxShadow: hov
          ? "7px 7px 0 rgba(0,0,0,0.35),0 0 0 1px #444"
          : "4px 4px 0 rgba(0,0,0,0.24),0 0 0 1px #555",
        borderRadius: "4px 4px 0 0",
        transform: `rotate(${hov ? rotate * 0.35 : rotate}deg) scale(${hov ? 1.02 : 1})`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        ...style,
      }}
    >
      <div
        style={{
          background: "linear-gradient(180deg,#1084d0 0%,#0a246a 100%)",
          borderRadius: "3px 3px 0 0",
          height: 26,
          padding: "0 5px 0 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          userSelect: "none",
        }}
      >
        <span
          className={pixel.className}
          style={{ fontSize: 9, color: "#fff", letterSpacing: 0.3, textTransform: "uppercase" }}
        >
          {title}
        </span>
        <div style={{ display: "flex", gap: 3 }}>
          {["_", "□", "×"].map((b) => (
            <button
              key={b}
              style={{
                width: 16, height: 14, padding: 0,
                background: XP.bg,
                border: "1px solid",
                borderColor: "#fff #777 #777 #fff",
                fontSize: 9, cursor: "default", lineHeight: 1,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Arial",
              }}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
      <div style={{ background: XP.bg }}>{children}</div>
    </div>
  );
}

function SkillBadge({ s }: { s: (typeof SKILLS)[0] }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", cursor: "default" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        style={{
          width: 42, height: 42, borderRadius: "50%",
          background: s.color, color: s.text,
          border: "2px solid rgba(255,255,255,0.6)",
          outline: "1px solid rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Arial,sans-serif", fontSize: 11, fontWeight: 900,
          textShadow: s.text === "#fff" ? "1px 1px 0 rgba(0,0,0,0.5)" : "none",
          boxShadow: hov
            ? "0 5px 0 rgba(0,0,0,0.3),inset 2px 2px 4px rgba(255,255,255,0.4)"
            : "inset 2px 2px 4px rgba(255,255,255,0.4),inset -2px -2px 3px rgba(0,0,0,0.2),1px 2px 0 rgba(0,0,0,0.2)",
          transform: hov ? "translateY(-5px) scale(1.1)" : "none",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}
      >
        {s.label}
      </div>

      {hov && (
        <div style={{
          position: "absolute", bottom: -26, left: "50%",
          transform: "translateX(-50%)",
          background: "#0a246a", color: "#fff",
          padding: "3px 8px",
          fontFamily: "Arial,sans-serif", fontSize: 10,
          whiteSpace: "nowrap", zIndex: 10,
          border: "1px solid #fff",
          boxShadow: "2px 2px 0 rgba(0,0,0,0.3)",
          pointerEvents: "none",
        }}>
          {s.name}
        </div>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow: hidden; }

        * {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cline x1='12' y1='2' x2='12' y2='22' stroke='black' stroke-width='2'/%3E%3Cline x1='2' y1='12' x2='22' y2='12' stroke='black' stroke-width='2'/%3E%3Ccircle cx='12' cy='12' r='3' fill='none' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E") 12 12, crosshair !important;
        }
        a {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l14 9-14 9V3z' fill='black' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E") 4 2, pointer !important;
        }

        .nt { transition: background 0.1s; }
        .nt:hover { background: #c0bdb4 !important; }
        .nt:active { border-color: #777 #fff #fff #777 !important; }

        .sr { transition: background 0.12s; }
        .sr:hover { background: #c0bdb4 !important; }

        .sn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .sn:hover { transform: rotate(-1.5deg) scale(1.05) !important; box-shadow: 5px 5px 0 rgba(0,0,0,0.25) !important; }

        .sc { transition: transform 0.2s ease; }
        .sc:hover { transform: rotate(0deg) scale(1.04) !important; }

        .stk { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .stk:hover { transform: rotate(0deg) scale(1.07) !important; box-shadow: 4px 4px 0 rgba(0,0,0,0.2) !important; }

        .red-star { color: #e53935; pointer-events: none; position: absolute; z-index: 1; }

        /* ── Navbar active tab — same logic as contact ── */
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
      `}</style>

      <main
        style={{
          width: "100vw", height: "100vh",
          background: "#e8e4dc",
          backgroundImage: "radial-gradient(circle,#b8b4ac 1px,transparent 1px)",
          backgroundSize: "18px 18px",
          color: "#0a0a0a",
          fontFamily: XP.font,
          overflow: "hidden",
        }}
      >
        {/* ── Navbar — identical structure to contact page ── */}
        <nav
          style={{
            position: "relative", zIndex: 200,
            height: 34,
            background: "#d4d0c8",
            borderBottom: "2px solid #8d8d8d",
            display: "flex", alignItems: "center", gap: 3,
            padding: "0 8px",
            boxShadow: "0 2px 0 #fff",
          }}
        >
          {[
            { label: "Start", cls: "tab start", href: "/" },
            { label: "about", cls: "tab active", href: "/about" },
            { label: "works", cls: "tab", href: "/works" },
            { label: "contact", cls: "tab", href: "/contact" },
          ].map((t) => (
            <a key={t.label} href={t.href} className={t.cls}>
              {t.label}
            </a>
          ))}
          <button className="tab plus">+</button>
          <Clock />
        </nav>

        <div
          style={{
            height: "calc(100vh - 34px)",
            display: "grid",
            gridTemplateColumns: "48% 52%",
            alignItems: "start",
          }}
        >
          <div style={{ padding: "44px 34px 70px 58px", position: "relative", zIndex: 2 }}>
            <div
              className={pixel.className}
              style={{ lineHeight: 1.1, userSelect: "none", marginBottom: 22, position: "relative", display: "inline-block" }}
            >
              <div style={{ fontSize: 38, color: "#0a0a0a", letterSpacing: -1 }}>about</div>
              <div style={{ fontSize: 62, color: "#0a0a0a", letterSpacing: -2, marginTop: 4 }}>me!</div>
              <span style={{ position: "absolute", top: -6, right: -30, fontSize: 22, color: "#e53935", transform: "rotate(12deg)", pointerEvents: "none" }}>★</span>
              <span style={{ position: "absolute", bottom: 10, right: -14, fontSize: 14, color: "#e53935", transform: "rotate(-8deg)", pointerEvents: "none" }}>✦</span>
            </div>

            <h1 className={pixel.className} style={{ margin: "0 0 18px", fontSize: 15, lineHeight: 1.7, color: "#9b008b", textDecoration: "underline", textUnderlineOffset: 6, textDecorationThickness: 2 }}>
              Ammara Azwadiena Alfiantie
            </h1>

            <p style={{ maxWidth: 430, margin: "0 0 28px", fontSize: 14, lineHeight: 1.72, color: "#222" }}>
              Hello! I'm Ammara, a third-year Informatics Engineering student who enjoys building digital products with a mix of clean interface design, practical development, and user-centered thinking.
              I love writing and exploring the intersection of impactful storytelling and technology. I see myself as a lifelong learner and a curious kid at heart. People descibe me as someone who loves to try new things, take risks, and grow through challenges.
            </p>

            <section style={{ marginBottom: 28 }}>
              <h2 className={pixel.className} style={{ margin: "0 0 16px", fontSize: 17, color: "#004fd1", textDecoration: "underline", textUnderlineOffset: 4, textDecorationThickness: 2 }}>
                SKILLS
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px 14px", maxWidth: 650 }}>
                {SKILLS.map((s) => <SkillBadge key={s.name} s={s} />)}
              </div>
            </section>

            <section>
              <h2 className={pixel.className} style={{ margin: "0 0 16px", fontSize: 17, color: "#004fd1", textDecoration: "underline", textUnderlineOffset: 4, textDecorationThickness: 2 }}>
                EDUCATION
              </h2>
              {[
                { year: "2023 — Present", place: "Universitas Padjadjaran", sub: "Informatics Engineering" },
                { year: "Current Focus", place: "Web Dev, UI/UX & AI-integrated products", sub: "Exploring design × code × data" },
              ].map((e) => (
                <div key={e.year} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, fontStyle: "italic" }}>{e.year}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginTop: 3 }}>{e.place}</div>
                  <div style={{ fontSize: 13, fontStyle: "italic", color: "#555", marginTop: 2 }}>{e.sub}</div>
                </div>
              ))}
            </section>
          </div>

          {/* Right column — unchanged */}
          <div style={{ position: "relative", height: "calc(100vh - 34px)", overflow: "hidden" }}>
            {[[18,370,13,-8],[46,520,15,10],[78,210,12,-12],[300,555,16,20],[425,470,11,-10],[520,160,14,8]].map(([t,l,sz,r],i) => (
              <div key={i} className="red-star" style={{ top: t, left: l, fontSize: sz, transform: `rotate(${r}deg)` }}>★</div>
            ))}

            <div className="stk" style={{ position: "absolute", top: 26, left: 78, zIndex: 7, background: "#f48fb1", border: "2px solid rgba(0,0,0,0.15)", borderRadius: 10, padding: "5px 13px", fontFamily: "'Comic Sans MS',cursive", fontSize: 11, fontWeight: "bold", transform: "rotate(3deg)", boxShadow: "2px 2px 0 rgba(0,0,0,0.12)" }}>
              open to work ✦
            </div>

            <div className="stk" style={{ position: "absolute", top: 30, left: 245, zIndex: 7, background: "#ffeb3b", border: "2px solid rgba(0,0,0,0.15)", borderRadius: 10, padding: "5px 12px", fontFamily: "'Comic Sans MS',cursive", fontSize: 11, fontWeight: "bold", transform: "rotate(-3deg)", boxShadow: "2px 2px 0 rgba(0,0,0,0.12)" }}>
              South Tangerang, Indonesia
            </div>

            <div style={{ position: "absolute", top: 92, left: 78, zIndex: 4 }}>
              <XPWindow title="MEET-AMMARA" rotate={-1.4} style={{ width: 260 }}>
                <div style={{ padding: 7 }}>
                  <div style={{ width: "100%", height: 300, border: "2px solid #8d8d8d", overflow: "hidden", background: "#cfcfcf" }}>
                    <img
                      src="/images/ammara-photo.jpg" alt="Ammara"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", filter: "contrast(1.05) saturate(0.9)" }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                        const p = (e.currentTarget as HTMLImageElement).parentElement!;
                        p.style.background = "linear-gradient(160deg,#c8a882,#7a5540)";
                        p.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-family:'Comic Sans MS',cursive;opacity:0.7;">ammara-photo.jpg</div>`;
                      }}
                    />
                  </div>
                </div>
              </XPWindow>
            </div>

            <div style={{ position: "absolute", top: 250, left: 300, zIndex: 5 }}>
              <XPWindow title="WARTAKEMA.EXE" rotate={2.1} style={{ width: 240 }}>
                <div style={{ padding: 7 }}>
                  <div style={{ width: "100%", height: 205, border: "2px solid #8d8d8d", overflow: "hidden", background: "#cfcfcf" }}>
                    <img
                      src="/images/wartakema.png" alt="Wartakema"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", filter: "contrast(1.05) saturate(0.9)" }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                        const p = (e.currentTarget as HTMLImageElement).parentElement!;
                        p.style.background = "linear-gradient(160deg,#7986cb,#3949ab)";
                        p.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-family:'Comic Sans MS',cursive;opacity:0.7;">wartakema.png</div>`;
                      }}
                    />
                  </div>
                </div>
              </XPWindow>
            </div>

            <div style={{ position: "absolute", top: 105, left: 480, zIndex: 6 }}>
              <XPWindow title="SOCIALS" rotate={1.1} style={{ width: 240 }}>
                <div style={{ padding: "10px 12px" }}>
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} className="sr" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, textDecoration: "none", color: "inherit", padding: "4px 6px", borderRadius: 2 }}>
                      <div style={{ width: 26, height: 26, flexShrink: 0, border: "2px solid #555", borderRadius: 3, background: "#e6e2d9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial,sans-serif", fontSize: 10, fontWeight: 900 }}>
                        {s.icon}
                      </div>
                      <div>
                        <div className={pixel.className} style={{ fontSize: 9, lineHeight: 1.5 }}>{s.label}</div>
                        <div className={pixel.className} style={{ fontSize: 7, color: "#444", lineHeight: 1.4 }}>{s.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </XPWindow>
            </div>

            <div className="sn" style={{ position: "absolute", top: 440, left: 86, zIndex: 5, width: 190, padding: "12px 14px", background: "#fff59d", border: "2px solid #d6b400", boxShadow: "3px 3px 0 rgba(0,0,0,0.18)", fontFamily: "'Comic Sans MS',cursive", fontSize: 12, lineHeight: 1.5, color: "#111", transform: "rotate(-4deg)", cursor: "default" }}>
              <strong style={{ display: "block", marginBottom: 5 }}>currently:</strong>
              building cute, useful, and thoughtful web experiences ✦
            </div>

            <div className="sc" style={{ position: "absolute", top: 495, left: 335, zIndex: 4, width: 220, padding: "12px 15px", background: "#fff", border: "2px dashed #0a246a", transform: "rotate(2deg)", cursor: "default" }}>
              <div className={pixel.className} style={{ fontSize: 8, color: "#0a246a", marginBottom: 6 }}>status:</div>
              <div className={pixel.className} style={{ fontSize: 10, color: "#0a0a0a", lineHeight: 1.45 }}>open to learn &amp; build ★</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}