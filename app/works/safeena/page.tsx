'use client'

import { Press_Start_2P } from 'next/font/google'
import { useEffect, useState, type ReactNode } from 'react'

const pixel = Press_Start_2P({ weight: '400', subsets: ['latin'] })

const moreWorks = [
  {
    title: 'Zichara',
    type: 'Mobile App (AR)',
    role: 'Scrum Master & QA',
    href: '/works/zichara',
  },
  {
    title: 'Panganesia',
    type: 'Website',
    role: 'Frontend Developer',
    href: '/works/panganesia',
  },
  {
    title: 'Addicx',
    type: 'UI/UX',
    role: 'UI/UX Designer',
    href: '/works/addicx',
  },
]

function ImageBlock({
  src,
  label,
  caption,
  className = '',
}: {
  src?: string
  label: string
  caption?: string
  className?: string
}) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div className={`image-block ${className}`}>
      {src && !imgFailed ? (
        <img
          src={src}
          alt={label}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="image-placeholder">
          <span className="placeholder-label">{label}</span>
          {caption && <small>{caption}</small>}
        </div>
      )}
    </div>
  )
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="note" role="note">
      <span className="note-icon">NOTE</span>
      <div>{children}</div>
    </div>
  )
}

function Clock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }))
      setDate(
        now
          .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
          .replace(/\//g, '/')
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="tab-clock">
      <span>{date}</span>
      <span>{time}</span>
    </div>
  )
}

export default function SafeenaCaseStudy() {
  useEffect(() => {
    const sections = [
      'overview',
      'background',
      'discovery',
      'research',
      'crafting',
      'validation',
      'output',
      'reflection',
    ]

    const setActiveNav = () => {
      const offset = 150
      let currentSection = sections[0]

      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const sectionTop = el.offsetTop - offset
        if (window.scrollY >= sectionTop) {
          currentSection = id
        }
      })

      document.querySelectorAll('.case-navbar a').forEach((a) => {
        a.classList.toggle(
          'active',
          a.getAttribute('href') === `#${currentSection}`
        )
      })
    }

    setActiveNav()
    window.addEventListener('scroll', setActiveNav)
    window.addEventListener('resize', setActiveNav)
    return () => {
      window.removeEventListener('scroll', setActiveNav)
      window.removeEventListener('resize', setActiveNav)
    }
  }, [])

  return (
    <main>
      {/* ── Taskbar ── */}
      <nav className={`top-tabs ${pixel.className}`}>
        <a href="/" className="tab start-tab">Start</a>
        <a href="/about" className="tab">about</a>
        <a href="/works" className="tab active-tab">works</a>
        <a href="/contact" className="tab">contact</a>
        <button className="tab plus-tab" aria-label="New tab">+</button>
        <Clock />
      </nav>

      <div className="page-wrap">

        {/* ── Hero ── */}
        <header className="hero" id="overview">
          <div className="hero-meta">
            <span className="back-link">
              <a href="/works">← back to works</a>
            </span>
            <span className="project-num">03 / 06</span>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <div className={`hero-kicker ${pixel.className}`}>First Internship · 2026</div>
              <h1 className={`hero-title ${pixel.className}`}>SAFEENA<br />ACADEMY</h1>
              <p className="hero-sub">Company Profile & Dashboard · UI/UX Design</p>
              <p className="hero-desc">
                Designing the full UI/UX for an Islamic psychology-based education startup —
                from company profile to internal dashboard. My first time designing for a real
                client, with real stakeholders, real developers, and real constraints.
              </p>
              <div className="hero-tags">
                {['Figma', 'UI/UX', 'Design System', 'Internship'].map((t) => (
                  <span key={t} className={pixel.className}>{t}</span>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <ImageBlock
                src="/images/cover-page/safeena.png"
                label="SAFEENA"
                caption="main project preview"
                className="hero-image"
              />
            </div>
          </div>
        </header>

        {/* ── Overview strip ── */}
        <section className="overview-strip" aria-label="Project overview">
          {[
            { label: 'ROLE', val: 'UI/UX Designer' },
            { label: 'DURATION', val: '3 Months · 2026' },
            { label: 'COMPANY', val: 'Safeena Academy' },
            { label: 'TOOLS', val: 'Figma' },
          ].map((item) => (
            <div key={item.label} className="ov-item">
              <div className={`ov-label ${pixel.className}`}>{item.label}</div>
              <div className="ov-val">{item.val}</div>
            </div>
          ))}
        </section>

        {/* ── Sticky section nav ── */}
        <nav className="case-navbar" aria-label="Section navigation">
          {[
            { label: 'Overview',   id: 'overview'   },
            { label: 'Background', id: 'background' },
            { label: 'Discovery',  id: 'discovery'  },
            { label: 'Research',   id: 'research'   },
            { label: 'Crafting',   id: 'crafting'   },
            { label: 'Validation', id: 'validation' },
            { label: 'Output',     id: 'output'     },
            { label: 'Reflection', id: 'reflection' },
          ].map((s) => (
            <a key={s.id} href={`#${s.id}`}>{s.label}</a>
          ))}
        </nav>

        {/* ── Body ── */}
        <div className="body-grid">

          {/* 00 Background */}
          <section className="section" id="background">
            <div className={`section-label ${pixel.className}`}>00 — BACKGROUND</div>
            <div className="section-layout">
              <div>
                <h2 className={`section-title ${pixel.className}`}>
                  Memorization Isn't Learning. Neither Is Design Without Direction.
                </h2>
                <p>
                  My first internship. My first time designing for a real client — not a
                  competition brief, not a course assignment, but an actual startup with actual
                  stakeholders, actual developers, and actual constraints.
                </p>
                <p>
                  Safeena Academy is an Islamic psychology-based education startup focused on
                  holistic student development — blending Social Emotional Learning (SEL) with
                  academic growth across six areas: self-awareness, self-regulation,
                  decision-making, social awareness, relationship skills, and community
                  awareness.
                </p>
                <p>
                  They came in with a vision that was clear in spirit but hadn't yet been
                  translated into a digital product. The platform needed to communicate who they
                  are — an education startup rooted in Islamic values, focused on emotional and
                  social growth — while being functional enough for developers to build from and
                  intuitive enough for users to navigate.
                </p>
                <p>
                  My job was to make that translation happen.
                </p>
              </div>
              <Note>
                This wasn't a brief with predefined deliverables. The scope had to be defined
                as part of the work itself — which meant the first few weeks were less about
                designing and more about listening, asking, and understanding what "done"
                actually meant for this client.
              </Note>
            </div>
          </section>

          {/* 01 Discovery */}
          <section className="section" id="discovery">
            <div className={`section-label ${pixel.className}`}>01 — DISCOVERY</div>
            <h2 className={`section-title ${pixel.className}`}>
              Bridging Two Worlds
            </h2>
            <p>
              The core challenge here wasn't a design problem — it was a communication problem.
              I sat between two parties who spoke different languages: the company, with a clear
              sense of identity and vision, and the developers, who needed specifics, constraints,
              and deliverables.
            </p>
            <p>
              My first task was to close that gap. I ran requirement analysis sessions with the
              company — listening, asking clarifying questions, and pushing to understand not
              just what they wanted to build, but why. What did Safeena Academy actually stand
              for? What feeling should the platform give someone landing on it for the first time?
              What was non-negotiable, and what was open?
            </p>
            <p>
              From those sessions, I distilled the brief into a set of design requirements that
              developers could act on and that stayed true to the company's direction. That
              document became the foundation for everything that followed.
            </p>

            <ImageBlock
              src="/safeena/requirement-analysis.png"
              label="Requirement Analysis"
              caption="sessions with stakeholders → distilled design requirements"
              className="wide-placeholder"
            />

            <h3 className={`sub-heading ${pixel.className}`}>The Two Questions That Changed Everything</h3>
            <p>
              Early in the process I learned to ask the follow-up question — not just "what
              should this page include?" but "what should someone feel when they leave this
              page?" That shift changed the quality of the requirements I was able to produce,
              and by extension, the quality of the design.
            </p>
            <p>
              There's a difference between what a company says they want and what they actually
              need. Getting to the second required building enough trust that the client would
              answer honestly — and asking questions that made the implicit explicit.
            </p>

            <div className="callout">
              Being a bridge is harder than being a designer. The design work itself —
              choosing colors, building components, laying out screens — was the part I felt
              most prepared for. The in-between was harder: translating ambiguous direction
              into concrete requirements, managing expectations about feasibility, and knowing
              when to push back and when to defer.
            </div>
          </section>

          {/* 02 Research */}
          <section className="section" id="research">
            <div className={`section-label ${pixel.className}`}>02 — RESEARCH</div>
            <h2 className={`section-title ${pixel.className}`}>
              Understanding the Platform's Core
            </h2>
            <p>
              Safeena Academy's identity is specific: Islamic values, emotional safety, holistic
              education. The design couldn't just look clean — it had to feel safe, credible,
              and warm. Those aren't the same thing, and finding the visual language that
              carried all three required understanding the company deeply before touching any
              tool.
            </p>
            <p>
              I mapped out the platform's key user groups and what each needed from the same
              platform.
            </p>

            <div className="persona-grid">
            <div className="persona-card">
              <div className={`persona-name ${pixel.className}`}>Students</div>
              <div className={`persona-role ${pixel.className}`}>Curriculum Participant</div>
              <div className="persona-pain">
                <strong>Context:</strong> SMP–SMA students looking to develop social-emotional
                intelligence and spiritual growth. The platform needs to feel engaging and
                relevant — not like another academic obligation.
              </div>
              <div className="persona-gain">
                <strong>Need:</strong> A learning experience that feels safe and meaningful.
                Clear access to the 6 SEL competencies curriculum. A space that reflects
                their values — beriman, berakhlak mulia, dan peduli sosial.
              </div>
            </div>

            <div className="persona-card">
              <div className={`persona-name ${pixel.className}`}>Parents</div>
              <div className={`persona-role ${pixel.className}`}>Collaborative Partner</div>
              <div className="persona-pain">
                <strong>Context:</strong> Looking for an educational program they can trust
                for their child. The platform needs to communicate credibility, safety, and
                alignment with Islamic values — before they'll take the next step.
              </div>
              <div className="persona-gain">
                <strong>Need:</strong> A first impression that feels warm and trustworthy.
                Clear program information. Access to monitor their child's development
                progress without extra friction.
              </div>
            </div>

            <div className="persona-card">
              <div className={`persona-name ${pixel.className}`}>Teachers</div>
              <div className={`persona-role ${pixel.className}`}>Program Facilitator</div>
              <div className="persona-pain">
                <strong>Context:</strong> Frontline support for student wellbeing. Need
                practical tools and knowledge to recognize mental health signs, provide
                early intervention, and implement PSE curriculum in the classroom.
              </div>
              <div className="persona-gain">
                <strong>Need:</strong> A dashboard that's dense enough to be useful but
                organized enough to be scannable. Consistency across every action so
                nothing surprises them mid-session.
              </div>
            </div>
          </div>
          <Note>
            Three distinct customer groups, one platform. That tension shaped every
            decision in the design system — especially around tone, information density,
            and visual hierarchy. What feels engaging to a student is very different from
            what feels trustworthy to a parent or efficient to a teacher managing a classroom.
          </Note>
          </section>

          {/* 03 Crafting */}
          <section className="section" id="crafting">
            <div className={`section-label ${pixel.className}`}>03 — CRAFTING</div>
            <h2 className={`section-title ${pixel.className}`}>
              Translating Vision Into Design
            </h2>
            <p>
              The design system was the first thing I built — because without a shared visual
              language, every screen would pull in a different direction. Everything had to flow
              from Safeena Academy's existing brand, not from my personal preferences.
            </p>

            <h3 className={`sub-heading ${pixel.className}`}>Design System: Built Around Their Identity</h3>

            <div className="ds-grid">
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Color Palette</span>
                <span className="ds-val">
                  Blue as the primary anchor for trust and stability. Yellow as the accent
                  for warmth and approachability. White space used generously to prevent
                  the experience from feeling overwhelming — especially important for an
                  education platform targeting families.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Typography</span>
                <span className="ds-val">
                  Clean, readable, accessible at all sizes. Chosen to feel educational
                  without being cold. Every size decision tested against both desktop and
                  mobile to ensure legibility held across breakpoints.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Components</span>
                <span className="ds-val">
                  Cards, program listings, testimonial sections, dashboards, and a 404 page
                  — all designed to the same visual language, desktop and mobile. Every
                  component built to be handoff-ready: consistent naming, clear states,
                  no ambiguity for developers.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Design Filter</span>
                <span className="ds-val">
                  Every decision went through one question: does this reflect who Safeena
                  Academy is? The company had a strong sense of identity. My job wasn't to
                  impose a visual style — it was to find the design language that already
                  lived inside their direction and make it visible.
                </span>
              </div>
            </div>

            <ImageBlock
              src="/safeena/design-systems.png"
              label="Design System"
              caption="typography · color palette · component library"
              className="wide-placeholder"
            />

            <h3 className={`sub-heading ${pixel.className}`}>Scope: Landing Platform + Internal Dashboard</h3>
            <p>
              The full scope covered both the public-facing platform and the internal
              dashboard — desktop and mobile versions for each. That's four distinct
              contexts sharing one design system.
            </p>
            <p>
              Key screens for the landing platform: hero section, program overview, program
              detail pages, tutor profiles, live demo scheduling, testimonials, and impact
              metrics. Key screens for the dashboard: program management, user data, and
              engagement views.
            </p>

            <div className="card-grid">
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Landing Platform</div>
                <p>Company profile, program discovery, and enrollment. Designed for parents and students arriving for the first time — trust and clarity above everything.</p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Internal Dashboard</div>
                <p>Program and user management for administrators. Designed for speed and scan-ability — the people using this are working, not browsing.</p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Desktop + Mobile</div>
                <p>Both contexts designed for both breakpoints. Not responsive as an afterthought — mobile layouts were considered from the start, especially for the landing platform.</p>
              </div>
            </div>

            <ImageBlock
              src="/safeena/hifi.png"
              label="Hi-Fi Screens"
              caption="landing page · program pages · dashboard · mobile views"
              className="wide-placeholder"
            />

            <Note>
              Every design decision went through one filter: does this reflect who Safeena
              Academy is? The company had a strong sense of identity. My job wasn't to
              impose a visual style — it was to find the design language that already lived
              inside their direction and make it visible.
            </Note>

            <h3 className={`sub-heading ${pixel.className}`}>Designing With the Build in Mind</h3>
            <p>
              Every time I proposed something, I had to ask: can the developers actually build
              this? That question shaped decisions in ways I hadn't anticipated before. Some
              ideas that looked great in Figma had to be simplified or restructured because
              they would've been disproportionately complex to implement.
            </p>
            <p>
              Learning to design with the build in mind — not just the user — was one of the
              most practical things I took from this internship. Feasibility is a design
              constraint, not an afterthought.
            </p>
          </section>

          {/* 04 Challenge */}
          <section className="section">
            <div className={`section-label ${pixel.className}`}>04 — CHALLENGE</div>
            <h2 className={`section-title ${pixel.className}`}>
              Designing Within Someone Else's Identity
            </h2>

            <div className="challenge-block">
              <p>
                I came in with my own instincts about what looked good. Most of those instincts
                had to be set aside. Safeena Academy had a direction — values, tone, visual
                associations — and my job was to serve that direction, not express myself
                through it.
              </p>
              <p>
                That constraint was frustrating at first, and clarifying later. Good design for
                a client isn't about what you would do. It's about what fits them. The moment
                I stopped trying to push my own aesthetic and started asking "what would
                Safeena Academy do here?" — the decisions got easier.
              </p>
              <p>
                The identity constraint also became a quality filter. When something felt off,
                it wasn't just "I don't like this" — it was "this doesn't fit who they are."
                That's a more useful signal to work with, and a cleaner way to justify decisions
                to a client.
              </p>
            </div>

            <h3 className={`sub-heading ${pixel.className}`}>Timeline: Three Months, Full Platform Scope</h3>
            <p>
              This was the first time I designed an entire platform — landing pages, dashboards,
              mobile views, error states — from scratch for a real organization. The timeline
              was tight. Three months to cover both the public-facing platform and the internal
              dashboard, across two breakpoints.
            </p>
            <p>
              I learned to prioritize ruthlessly: which screens unblock the developers first,
              which decisions needed client sign-off before anything else could move, and where
              I could make a call independently versus where I needed alignment. That triage
              instinct is something I now bring into every project.
            </p>

            <div className="callout warning">
              The hardest moment: a component I'd designed looked great in Figma but was
              flagged by the developer as disproportionately complex to implement. I had to
              go back, redesign to the same intent with simpler structure, and re-present.
              That loop — design, feasibility check, revise — became a regular part of the
              process. I stopped treating it as a setback and started treating it as the work.
            </div>
          </section>

          {/* 05 Validation */}
          <section className="section" id="validation">
            <div className={`section-label ${pixel.className}`}>05 — VALIDATION</div>
            <h2 className={`section-title ${pixel.className}`}>
              Stakeholder Review + Developer Handoff
            </h2>
            <p>
              Validation for this project happened in two layers. The first was stakeholder
              review — presenting screens to the Safeena Academy team, incorporating feedback,
              and iterating until the design matched their intent. The second was developer
              review — making sure every deliverable was buildable, with no ambiguity in the
              specs.
            </p>
            <p>
              Every component was checked against two questions: does it reflect Safeena
              Academy's identity, and can a developer implement it without guessing? If the
              answer to either was unclear, the design wasn't done.
            </p>

            <div className="callout">
              Formal usability testing with end users was not conducted within the internship
              scope. This section will be updated if testing data becomes available after
              handoff and implementation.
            </div>
          </section>

          {/* 06 Improvement */}
          <section className="section improvement-section">
            <div className={`section-label ${pixel.className}`}>06 — IMPROVEMENT</div>
            <h2 className={`section-title ${pixel.className}`}>Coming Soon</h2>
            <p>
              This section will be updated after implementation, user feedback, and any
              post-launch iteration are complete.
            </p>
          </section>

          {/* 07 Output */}
          <section className="section" id="output">
            <div className={`section-label ${pixel.className}`}>07 — OUTPUT</div>
            <h2 className={`section-title ${pixel.className}`}>
              A Full Platform, Desktop and Mobile.
            </h2>
            <p>
              The final deliverable was a complete UI/UX design covering the end-to-end user
              experience — from first landing to program enrollment to internal dashboard
              management. All screens delivered in Figma, developer-ready.
            </p>

            <ImageBlock
              src="/safeena/final-ui.png"
              label="Final Design Showcase"
              caption="landing · program pages · tutor profiles · dashboard · mobile views · 404"
              className="wide-placeholder"
            />

            <div className="features-list">
              {[
                {
                  name: 'Landing Page',
                  desc: 'Hero section, program overview, testimonials, impact metrics, and team profiles. The first impression — designed to communicate credibility, warmth, and Islamic values before the user reads a single word.',
                },
                {
                  name: 'Program Pages',
                  desc: 'Detailed program information with enrollment pathways. Designed to answer the questions a parent would actually ask — what is this, who is it for, and how do we start?',
                },
                {
                  name: 'Tutor Profiles',
                  desc: 'Individual tutor pages with credentials and program associations. Trust is built through people — these pages exist because knowing who teaches matters as much as knowing what is taught.',
                },
                {
                  name: 'Live Demo Scheduling',
                  desc: 'Flow for booking a live demo session. Lowest friction possible: one clear action, minimal steps, no ambiguity about what happens next.',
                },
                {
                  name: 'Dashboard',
                  desc: 'Internal management view for program and user data. Designed for administrators who need to move fast — dense enough to be useful, organized enough to be scannable.',
                },
                {
                  name: '404 Page',
                  desc: 'On-brand error state, desktop and mobile variants. A small screen that most clients don\'t think about — included because every touchpoint is part of the identity.',
                },
              ].map((f) => (
                <div key={f.name} className="feature-item">
                  <span className={`feature-name ${pixel.className}`}>{f.name}</span>
                  <span className="feature-desc">{f.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 08 Reflection */}
          <section className="section reflection-section" id="reflection">
            <div className={`section-label ${pixel.className}`}>08 — REFLECTION</div>
            <h2 className={`section-title ${pixel.className}`}>
              What My First Real Client Taught Me
            </h2>
            <div className="reflection-grid">
              {[
                {
                  title: 'Being a bridge is harder than being a designer',
                  body: 'The design work itself — choosing colors, building components, laying out screens — was the part I felt most prepared for. What I wasn\'t prepared for was the in-between: translating ambiguous direction into concrete requirements, managing expectations, and knowing when to push back and when to defer.',
                },
                {
                  title: 'Learning to communicate with a client is its own skill',
                  body: 'There\'s a difference between what a company says they want and what they actually need. I learned to ask the follow-up question — not just "what should this page include?" but "what should someone feel when they leave this page?" That shift changed the quality of every requirement I produced.',
                },
                {
                  title: 'Designing within someone else\'s identity is a discipline',
                  body: 'I came in with my own instincts. Most of them had to be set aside. Safeena Academy had a direction — values, tone, visual associations — and my job was to serve that direction, not express myself through it. That constraint was frustrating at first, and clarifying later.',
                },
                {
                  title: 'Feasibility is a design constraint, not an afterthought',
                  body: 'Every time I proposed something, I had to ask: can the developers actually build this? Some ideas that looked great in Figma had to be simplified because they would\'ve been disproportionately complex to implement. Learning to design with the build in mind was one of the most practical things I took from this internship.',
                },
                {
                  title: 'Three months goes fast when the scope is full',
                  body: 'This was my first time designing an entire platform from scratch for a real organization. I learned to triage ruthlessly: which screens unblock developers first, which decisions need client sign-off before anything else can move, and where I could make a call independently versus where I needed alignment.',
                },
              ].map((r) => (
                <div key={r.title} className="reflection-item">
                  <div className={`r-title ${pixel.className}`}>{r.title}</div>
                  <p>{r.body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── More Works ── */}
        <section className="more-works">
          <div className="more-header">
            <span className={`section-label ${pixel.className}`}>MORE WORKS</span>
            <h2 className={`more-title ${pixel.className}`}>Explore Other Files</h2>
          </div>
          <div className="more-grid">
            {moreWorks.map((work) => (
              <a href={work.href} className="more-card" key={work.title}>
                <span className={pixel.className}>{work.type}</span>
                <strong className={pixel.className}>{work.title}</strong>
                <p>{work.role}</p>
              </a>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html { scroll-behavior: smooth; }

        :root {
          --bg:         #f4efe4;
          --surface:    #ffffff;
          --ink:        #171717;
          --ink-muted:  #555555;
          --blue:       #1565c0;
          --blue-light: #e3f0ff;
          --yellow:     #fff6a5;
          --dot-size:   18px;
          --shadow:     5px 5px 0 var(--ink);
          --shadow-lg:  6px 6px 0 var(--ink);
          --border:     2px solid var(--ink);
          --font-body:  'Courier New', 'Courier', monospace;
          --font-ui:    'Segoe UI', system-ui, sans-serif;
        }

        body {
          background: var(--bg);
          color: var(--ink);
        }

        main {
          min-height: 100vh;
          padding-top: 34px;
          background:
            radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px),
            var(--bg);
          background-size: var(--dot-size) var(--dot-size);
        }

        p {
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 700;
          line-height: 1.85;
          color: #222;
          margin-bottom: 14px;
        }
        p:last-child { margin-bottom: 0; }

        /* ── Taskbar ── */
        .top-tabs {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          height: 34px;
          background: #d4d0c8;
          border-bottom: 2px solid #8d8d8d;
          box-shadow: 0 2px 0 #ffffff;
          display: flex;
          align-items: center;
          gap: 3px;
          padding: 0 8px;
        }

        .tab {
          height: 24px;
          min-width: 100px;
          padding: 0 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: var(--ink);
          background: #d4d0c8;
          border: 1px solid;
          border-color: #fff #777 #777 #fff;
          font-family: var(--font-ui);
          font-size: 11px;
          font-style: italic;
          cursor: default;
          white-space: nowrap;
          transition: background 0.1s;
        }
        .tab:hover  { background: #c0bdb4; }
        .active-tab { background: #fff; border-color: #777 #fff #fff #777; }
        .start-tab  { min-width: 54px; font-style: normal; font-weight: 600; }
        .plus-tab   { min-width: 42px; font-size: 16px; padding-bottom: 2px; }

        .tab-clock {
          margin-left: auto;
          height: 24px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: #d4d0c8;
          border: 1px solid;
          border-color: #777 #fff #fff #777;
          font-family: var(--font-ui);
          font-size: 11px;
          font-style: italic;
          color: var(--ink);
        }

        /* ── Page wrap ── */
        .page-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 56px 72px 120px;
        }

        /* ── Hero ── */
        .hero {
          padding-bottom: 52px;
          border-bottom: var(--border);
          scroll-margin-top: 135px;
        }

        .hero-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .back-link a {
          font-family: var(--font-ui);
          font-size: 12px;
          font-style: italic;
          color: var(--blue);
          text-decoration: none;
        }
        .back-link a:hover { text-decoration: underline; }

        .project-num {
          font-family: var(--font-ui);
          font-size: 12px;
          font-style: italic;
          color: var(--blue);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 52px;
          align-items: end;
        }

        .hero-kicker {
          color: var(--blue);
          font-size: 8px;
          margin-bottom: 18px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hero-title {
          font-size: clamp(28px, 5vw, 70px);
          line-height: 1;
          letter-spacing: -3px;
          color: var(--ink);
          margin-bottom: 18px;
        }

        .hero-sub {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 700;
          color: #4b4b4b;
          margin-bottom: 20px;
        }

        .hero-desc {
          max-width: 460px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          line-height: 1.85;
          color: #222;
          margin-bottom: 28px;
        }

        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hero-tags span {
          background: var(--surface);
          border: var(--border);
          border-color: var(--blue);
          color: var(--blue);
          padding: 6px 10px;
          font-size: 7px;
          box-shadow: 3px 3px 0 var(--ink);
        }

        /* ── Overview strip ── */
        .overview-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: var(--border);
          border-top: none;
          background: var(--surface);
          box-shadow: var(--shadow-lg);
        }

        .ov-item {
          padding: 24px 20px;
          border-right: var(--border);
        }
        .ov-item:last-child { border-right: none; }

        .ov-label {
          font-size: 7.5px;
          color: var(--blue);
          margin-bottom: 10px;
        }

        .ov-val {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          line-height: 1.6;
          color: var(--ink);
        }

        /* ── Sticky nav ── */
        .case-navbar {
          position: sticky;
          top: 34px;
          z-index: 120;
          margin: 0 -72px 56px;
          padding: 32px 72px 0px 72px;
          display: flex;
          gap: 0;
          background: var(--bg);
          border-bottom: 3px solid var(--blue);
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .case-navbar::-webkit-scrollbar { display: none; }

        .case-navbar a {
          color: var(--ink);
          opacity: 0.45;
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 700;
          padding: 13px 20px;
          border-bottom: 3px solid transparent;
          white-space: nowrap;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: -3px;
          transition: opacity 0.1s, border-color 0.1s, color 0.1s;
        }
        .case-navbar a:hover { opacity: 0.75; }
        .case-navbar a.active {
          opacity: 1;
          color: var(--blue);
          border-bottom-color: var(--blue);
        }

        /* ── Body ── */
        .body-grid {
          display: flex;
          flex-direction: column;
          gap: 80px;
        }

        .section { scroll-margin-top: 135px; }

        .section-layout {
          display: grid;
          grid-template-columns: 1fr 260px;
          gap: 32px;
          align-items: start;
          margin-top: 24px;
        }

        .section-label {
          display: block;
          font-size: 7.5px;
          color: var(--blue);
          margin-bottom: 18px;
          letter-spacing: 0.5px;
        }

        .section-title {
          font-size: clamp(14px, 2vw, 22px);
          color: var(--ink);
          margin-bottom: 24px;
          line-height: 1.4;
          letter-spacing: -0.5px;
          font-weight: 400;
        }

        .sub-heading {
          font-size: 9.5px;
          color: var(--ink);
          margin: 36px 0 16px;
          letter-spacing: 0;
          font-weight: 400;
        }

        /* ── Image blocks ── */
        .image-block {
          position: relative;
          width: 100%;
          min-height: 260px;
          background: var(--surface);
          border: var(--border);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-block img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        .image-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 32px;
          text-align: center;
          width: 100%; height: 100%;
          min-height: inherit;
          background:
            repeating-linear-gradient(
              45deg,
              transparent, transparent 8px,
              rgba(21,101,192,0.04) 8px, rgba(21,101,192,0.04) 16px
            );
        }

        .placeholder-label {
          font-family: var(--font-body);
          font-size: clamp(14px, 2.5vw, 28px);
          font-weight: 700;
          color: var(--ink-muted);
          opacity: 0.5;
        }

        .image-placeholder small {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          color: var(--ink-muted);
          max-width: 480px;
          line-height: 1.6;
          opacity: 0.7;
        }

        .wide-placeholder { min-height: 300px; margin: 28px 0; }
        .hero-image       { min-height: 420px; }

        /* ── Cards ── */
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin: 28px 0;
        }

        .info-card {
          background: var(--surface);
          border: var(--border);
          box-shadow: var(--shadow);
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .info-card.accent { border-color: var(--blue); }

        .card-title {
          font-size: 8px;
          color: var(--blue);
          margin-bottom: 4px;
        }

        .info-card p { font-size: 11px; margin-bottom: 0; }

        /* ── Persona cards ── */
        .persona-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 18px;
          margin: 28px 0;
        }

        .persona-card {
          background: var(--surface);
          border: var(--border);
          box-shadow: var(--shadow);
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .persona-name {
          font-size: 14px;
          color: var(--ink);
          letter-spacing: -1px;
        }

        .persona-role {
          font-size: 7.5px;
          color: var(--blue);
          margin-bottom: 4px;
        }

        .persona-pain,
        .persona-gain {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          color: #222;
          line-height: 1.7;
        }

        /* ── DS grid ── */
        .ds-grid {
          display: flex;
          flex-direction: column;
          border: var(--border);
          background: var(--surface);
          box-shadow: var(--shadow);
          margin: 20px 0;
        }

        .ds-item {
          display: flex;
          gap: 24px;
          padding: 16px 20px;
          border-bottom: var(--border);
        }
        .ds-item:last-child { border-bottom: none; }

        .ds-key {
          font-size: 8px;
          color: var(--blue);
          min-width: 130px;
          flex-shrink: 0;
          padding-top: 2px;
        }

        .ds-val {
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 700;
          line-height: 1.7;
          color: #222;
        }

        /* ── Callout / Note ── */
        .callout {
          background: var(--yellow);
          border: var(--border);
          box-shadow: var(--shadow);
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 11.5px;
          line-height: 1.8;
          color: var(--ink);
          padding: 18px 22px;
          margin: 28px 0;
        }

        .callout.warning {
          background: var(--blue-light);
          border-color: var(--blue);
        }

        .note {
          border-left: 3px solid #c8a800;
          background: #fffbe6;
          padding: 12px 16px;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 11px;
          line-height: 1.75;
          color: #3a3520;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .note-icon {
          font-size: 7.5px;
          font-family: var(--font-body);
          font-weight: 700;
          letter-spacing: 1px;
          color: #9a7c00;
          text-transform: uppercase;
        }

        /* ── Challenge block ── */
        .challenge-block {
          background: var(--surface);
          border: var(--border);
          box-shadow: var(--shadow);
          padding: 28px;
          margin: 28px 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* ── Features list ── */
        .features-list {
          display: flex;
          flex-direction: column;
          margin-top: 28px;
          border: var(--border);
          box-shadow: var(--shadow);
          background: var(--surface);
        }

        .feature-item {
          display: flex;
          gap: 28px;
          padding: 18px 22px;
          border-bottom: var(--border);
          align-items: baseline;
        }
        .feature-item:last-child { border-bottom: none; }

        .feature-name {
          font-size: 8px;
          color: var(--blue);
          min-width: 160px;
          flex-shrink: 0;
          line-height: 1.6;
        }

        .feature-desc {
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 700;
          color: #222;
          line-height: 1.7;
        }

        /* ── Improvement / Reflection ── */
        .improvement-section,
        .reflection-section {
          background: var(--surface);
          border: var(--border);
          box-shadow: var(--shadow-lg);
          padding: 36px 40px;
        }

        .reflection-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 24px;
        }

        .reflection-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 18px;
          background: var(--bg);
          border: var(--border);
        }

        .r-title {
          font-size: 8px;
          color: var(--blue);
          line-height: 1.6;
        }

        .reflection-item p { font-size: 11px; }

        /* ── More works ── */
        .more-works {
          margin-top: 96px;
          padding-top: 44px;
          border-top: var(--border);
        }

        .more-header { margin-bottom: 28px; }

        .more-title {
          font-size: clamp(18px, 3vw, 36px);
          line-height: 1.15;
          margin-top: 14px;
          color: var(--ink);
          font-weight: 400;
          letter-spacing: -1px;
        }

        .more-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .more-card {
          min-height: 190px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: var(--ink);
          text-decoration: none;
          background: var(--surface);
          border: var(--border);
          box-shadow: var(--shadow-lg);
          transition: transform 0.12s, box-shadow 0.12s;
        }
        .more-card:hover {
          transform: translate(3px, 3px);
          box-shadow: 3px 3px 0 var(--ink);
        }

        .more-card span { font-size: 8px; color: var(--blue); }
        .more-card strong {
          display: block;
          font-size: clamp(16px, 2vw, 22px);
          line-height: 1.2;
          font-weight: 400;
          letter-spacing: -1px;
        }
        .more-card p { font-size: 11px; color: #444; margin-bottom: 0; }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .page-wrap { padding: 40px 32px 90px; }
          .case-navbar { margin-left: -32px; margin-right: -32px; }
          .hero-grid, .section-layout { grid-template-columns: 1fr; }
          .overview-strip { grid-template-columns: 1fr 1fr; }
          .card-grid, .persona-grid, .reflection-grid, .more-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .page-wrap { padding: 24px 16px 72px; }
          .tab-clock { display: none; }
          .tab { min-width: auto; padding: 0 8px; font-size: 9px; }
          .hero-title { letter-spacing: -1.5px; }
          .overview-strip { grid-template-columns: 1fr; }
          .ov-item { border-right: none; border-bottom: var(--border); }
          .ov-item:last-child { border-bottom: none; }
          .ds-item, .feature-item { flex-direction: column; gap: 6px; }
          .feature-name { min-width: unset; }
          .reflection-section, .improvement-section { padding: 24px 20px; }
        }
      `}</style>
    </main>
  )
}