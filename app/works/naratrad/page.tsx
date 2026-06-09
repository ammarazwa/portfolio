'use client'

import { Press_Start_2P } from 'next/font/google'
import { useEffect, useState, type ReactNode } from 'react'

const pixel = Press_Start_2P({ weight: '400', subsets: ['latin'] })

const moreWorks = [
  { title: 'AddicX', type: 'UI/UX', role: 'UI/UX Designer', href: '/works/addicx' },
  { title: 'Zichara', type: 'AR Game', role: 'Project Manager + QA', href: '/works/zichara' },
  { title: 'Seluna', type: 'UI/UX', role: 'UI Designer', href: '/works/seluna' },
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
        <img src={src} alt={label} onError={() => setImgFailed(true)} />
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
      setDate(now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }))
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

export default function NaraTradCaseStudy() {
  useEffect(() => {
    const sections = ['overview','background','discovery','define','team','tech','development','testing','output','reflection']

    const setActiveNav = () => {
      const offset = 150
      let currentSection = sections[0]
      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        if (window.scrollY >= el.offsetTop - offset) currentSection = id
      })
      document.querySelectorAll('.case-navbar a').forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === `#${currentSection}`)
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
            <span className="back-link"><a href="/works">← back to works</a></span>
            <span className="project-num">03 / 06</span>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <div className={`hero-kicker ${pixel.className}`}>LIT Scholarship · Full Stack Development Track</div>
              <h1 className={`hero-title ${pixel.className}`}>NaraTrad</h1>
              <p className="hero-sub">Stock Portfolio Tracker for Beginner Investors</p>
              <p className="hero-desc">
                NaraTrad is a stock portfolio tracking web app that helps beginner to intermediate
                investors monitor their assets simply, intuitively, and in real-time — built
                end-to-end with Angular, Spring Boot, and PostgreSQL.
              </p>
              <div className="hero-tags">
                {['Spring Boot', 'Angular', 'PostgreSQL', 'REST API', 'JUnit'].map((t) => (
                  <span key={t} className={pixel.className}>{t}</span>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <ImageBlock
                src="/images/cover-page/naratrad.png"
                label="NaraTrad"
                caption="main project preview"
                className="hero-image"
              />
            </div>
          </div>
        </header>

        {/* ── Overview strip ── */}
        <section className="overview-strip" aria-label="Project overview">
          {[
            { label: 'ROLE', val: 'Back-end Lead\n(API Design · Implementation\nTesting · Deployment)' },
            { label: 'DURATION', val: '1 Track Program\n(2025)' },
            { label: 'TEAM', val: 'Ammara Azwa\nLysandra Velyca\nMathilda Dellanova' },
            { label: 'TECH', val: 'Java Spring Boot · Angular\nPostgreSQL · Supabase\nVercel · Railway' },
          ].map((item) => (
            <div key={item.label} className="ov-item">
              <div className={`ov-label ${pixel.className}`}>{item.label}</div>
              <div className="ov-val" style={{ whiteSpace: 'pre-line' }}>{item.val}</div>
            </div>
          ))}
        </section>

        {/* ── Sticky section nav ── */}
        <nav className="case-navbar" aria-label="Section navigation">
          {[
            { label: 'Overview',    id: 'overview'     },
            { label: 'Background',  id: 'background'   },
            { label: 'Discovery',   id: 'discovery'    },
            { label: 'Define',      id: 'define'       },
            { label: 'Team',        id: 'team'         },
            { label: 'Tech Stack',  id: 'tech'         },
            { label: 'Development', id: 'development'  },
            { label: 'Testing',     id: 'testing'      },
            { label: 'Output',      id: 'output'       },
            { label: 'Reflection',  id: 'reflection'   },
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
                  LIT Scholarship. Full Stack. From Zero.
                </h2>
                <p>
                  LIT Scholarship is an intensive scholarship program focused on developing
                  Indonesia&apos;s young tech talent. The Full Stack Development Track challenged
                  every participant to build a real application from scratch all the way to
                  deployment — not just an exercise, but a product that actually runs on the internet.
                </p>
                <p>
                  Four constraints were non-negotiable: the app had to be end-to-end from design
                  to production, had to use the track&apos;s designated stack (Java Spring Boot + Angular),
                  had to go through a QA process with documented testing, and had to be delivered
                  sprint-based, agile.
                </p>
                <p>
                  Many beginner investors in Indonesia — including students and fresh graduates —
                  are starting to explore stock investing, but don&apos;t have tools simple enough to
                  actually understand. Existing platforms are mostly too complex, too focused on
                  trading and advanced analytics.
                </p>
                <p>
                  NaraTrad was born from a simple question: what if there was a tracker you could
                  use without having to be an expert first? &ldquo;Nara&rdquo; comes from Sanskrit meaning
                  &ldquo;wise&rdquo; or &ldquo;knowledgeable person.&rdquo; NaraTrad = Wise Trading for Everyone.
                </p>
              </div>
              <Note>
                This was my first project that was genuinely end-to-end — from writing the first
                line of code locally to having it live and accessible to anyone through a browser.
                That hits differently. There&apos;s a different kind of responsibility when something
                is actually deployed, not just running on localhost.
              </Note>
            </div>
          </section>

          {/* 01 Discovery */}
          <section className="section" id="discovery">
            <div className={`section-label ${pixel.className}`}>01 — DISCOVERY</div>
            <h2 className={`section-title ${pixel.className}`}>
              Understanding the Problem Before Building the Solution
            </h2>
            <p>
              Before writing a single line of code, we needed to understand who would be using
              NaraTrad and what they actually needed. Target user: beginner to intermediate investors
              who currently rely on manual spreadsheets or platforms that are too complex for their needs.
            </p>

            <div className="card-grid">
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Pain Point 01</div>
                <p>
                  Existing platforms are too focused on advanced trading features and complex analytics
                  — overwhelming for users who just want to know how their portfolio is doing.
                </p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Pain Point 02</div>
                <p>
                  No simple, visual way to monitor overall portfolio composition at a glance. The
                  information is there, but buried under layers users don&apos;t need.
                </p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Pain Point 03</div>
                <p>
                  Wishlist or watchlist features are often buried under irrelevant functionality —
                  a core need for beginners who want to monitor before they buy.
                </p>
              </div>
            </div>

            <div className="callout">
              From here, we set our direction: NaraTrad should be a tracker, not a trading platform.
              Simple, clean, and immediately usable — without requiring users to be experts first.
            </div>

            {/* <ImageBlock
              label="Problem Framing"
              caption="user need mapping · problem space definition"
              className="wide-placeholder"
            /> */}
          </section>

          {/* 02 Define */}
          <section className="section" id="define">
            <div className={`section-label ${pixel.className}`}>02 — DEFINE</div>
            <h2 className={`section-title ${pixel.className}`}>
              What Exactly Are We Building?
            </h2>
            <p>
              With a clear problem space, we concretely defined the product scope. The temptation to
              add &ldquo;cool&rdquo; features like advanced analytics or price notifications was always there.
              Staying disciplined enough to ask &ldquo;does our user actually need this?&rdquo; is what kept us focused.
            </p>

            <div className="features-list">
              {[
                {
                  name: 'Secure Authentication',
                  desc: 'Safe login and registration system. Non-negotiable foundation — without it, there is no personal portfolio.',
                },
                {
                  name: 'Real-Time Dashboard',
                  desc: 'Portfolio overview that updates live using real stock price data. The core value proposition — see the whole picture at a glance.',
                },
                {
                  name: 'Portfolio Tracking',
                  desc: 'Management of owned stock assets — add, edit, and monitor. The primary use case for the target user.',
                },
                {
                  name: 'Stock Wishlist',
                  desc: 'A list of stocks to monitor before buying. Critical for beginner investors in research mode, not yet in buying mode.',
                },
                {
                  name: 'Account Management',
                  desc: 'Profile and preference management. Keeps the experience personal and owned.',
                },
                {
                  name: 'Admin Dashboard',
                  desc: 'System administration panel for back-end management. Required for operational control post-deployment.',
                },
              ].map((f) => (
                <div key={f.name} className="feature-item">
                  <span className={`feature-name ${pixel.className}`}>{f.name}</span>
                  <span className="feature-desc">{f.desc}</span>
                </div>
              ))}
            </div>

            <ImageBlock
              src="/naratrad/project-overview.png"
              label="Feature Overview"
              caption="defined scope · early wireframes"
              className="wide-placeholder"
            />

            <Note>
              At this stage we realized how critical it is to define scope tightly from the start.
              Scope creep in a sprint-based timeline doesn&apos;t just slow delivery — it fragments focus
              and forces trade-offs that hurt the core features.
            </Note>
          </section>

          {/* 03 Team */}
          <section className="section" id="team">
            <div className={`section-label ${pixel.className}`}>03 — TEAM & WORKFLOW</div>
            <h2 className={`section-title ${pixel.className}`}>
              How We Structured Ownership and Moved Fast
            </h2>
            <p>
              Three people. Clear role ownership. Shared accountability on full-stack features.
            </p>

            <div className="team-grid">
              <div className="team-card me">
                <div className={`team-name ${pixel.className}`}>Ammara A.</div>
                <div className={`team-role ${pixel.className}`}>Back-end Lead</div>
                <ul className="team-list">
                  <li>API Design & Implementation</li>
                  <li>Auth, Admin Dashboard, Portfolio Management (BE)</li>
                  <li>Back-end Testing & Deployment</li>
                </ul>
              </div>
              <div className="team-card">
                <div className={`team-name ${pixel.className}`}>Mathilda D.</div>
                <div className={`team-role ${pixel.className}`}>Project Manager</div>
                <ul className="team-list">
                  <li>Environment Setup & Configuration</li>
                  <li>System & Prototype Design</li>
                  <li>Front-end Testing & Deployment</li>
                </ul>
              </div>
              <div className="team-card">
                <div className={`team-name ${pixel.className}`}>Lysandra V.</div>
                <div className={`team-role ${pixel.className}`}>Front-end Lead</div>
                <ul className="team-list">
                  <li>Component Architecture</li>
                  <li>Auth, Admin Dashboard, Portfolio Management (FE)</li>
                  <li>Front-end Testing & Deployment</li>
                </ul>
              </div>
            </div>

            <div className="callout">
              User Dashboard, Account Management, and Stock Wishlist were built as full-stack
              shared ownership across the team — no single person owned the full feature,
              which forced constant communication and made integration smoother.
            </div>

            <h3 className={`sub-heading ${pixel.className}`}>Workflow: Agile Scrum</h3>
            <div className="ds-grid">
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Sprint Cycle</span>
                <span className="ds-val">
                  Sprint Planning → Sprint Development → Sprint Review → Sprint Retrospective.
                  Every sprint produced a concrete deliverable, not abstract progress.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Git Strategy</span>
                <span className="ds-val">
                  GitHub Projects for task management. Branch per feature. Git Issues tied to
                  feature branches. Pull Requests mandatory before merging to the development
                  branch — nothing went to main without sign-off.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Communication</span>
                <span className="ds-val">
                  Daily standups via Discord/WhatsApp. Progress sync every day. Mentors: Kak
                  Galang Kerta, Kak Rifai Martin, Kak Abdurrachman Mappuji, Rob Ross.
                </span>
              </div>
            </div>

            <ImageBlock
              src="/naratrad/github-projects.png"
              label="GitHub Projects"
              caption="task board · branch structure · PR workflow"
              className="wide-placeholder"
            />
          </section>

          {/* 04 Tech Stack */}
          <section className="section" id="tech">
            <div className={`section-label ${pixel.className}`}>04 — TECH STACK</div>
            <h2 className={`section-title ${pixel.className}`}>
              The Architecture We Chose and Why
            </h2>

            <ImageBlock
              src="/naratrad/architecture.png"
              label="Architecture Diagram"
              caption="Frontend ↔ REST API ↔ Backend ↔ Database"
              className="wide-placeholder"
            />

            <div className="stack-grid">
              <div className="stack-layer">
                <div className={`stack-title ${pixel.className}`}>Front-end</div>
                <div className="stack-items">
                  <div className="stack-item">
                    <span className={`stack-key ${pixel.className}`}>Angular 17.x</span>
                    <span className="stack-val">TypeScript-first framework — enforces strong typing across the entire front-end, which made cross-layer API contracts much less error-prone.</span>
                  </div>
                  <div className="stack-item">
                    <span className={`stack-key ${pixel.className}`}>Angular Material</span>
                    <span className="stack-val">UI component library + Custom CSS. Gave us a consistent, accessible component baseline without building from scratch under a sprint deadline.</span>
                  </div>
                  <div className="stack-item">
                    <span className={`stack-key ${pixel.className}`}>Figma</span>
                    <span className="stack-val">Design tool for prototyping before implementation. Resolved layout decisions cheaply before touching Angular.</span>
                  </div>
                </div>
              </div>

              <div className="stack-layer">
                <div className={`stack-title ${pixel.className}`}>Back-end</div>
                <div className="stack-items">
                  <div className="stack-item">
                    <span className={`stack-key ${pixel.className}`}>Java Spring Boot 4.x</span>
                    <span className="stack-val">RESTful API server. Chosen by the track — but the structured, opinionated framework forced good practices: service layers, dependency injection, clear separation of concerns.</span>
                  </div>
                  <div className="stack-item">
                    <span className={`stack-key ${pixel.className}`}>Finnhub API</span>
                    <span className="stack-val">Real-time stock price data. Integration required normalization, appropriate caching, and consistent display logic — not just a simple API call.</span>
                  </div>
                  <div className="stack-item">
                    <span className={`stack-key ${pixel.className}`}>Mailtrap</span>
                    <span className="stack-val">Email service for account management flows. Safe email testing during development — no risk of sending to real inboxes.</span>
                  </div>
                </div>
              </div>

              <div className="stack-layer">
                <div className={`stack-title ${pixel.className}`}>Database</div>
                <div className="stack-items">
                  <div className="stack-item">
                    <span className={`stack-key ${pixel.className}`}>H2 (Dev)</span>
                    <span className="stack-val">In-memory database for local development. Fast iteration without touching production data.</span>
                  </div>
                  <div className="stack-item">
                    <span className={`stack-key ${pixel.className}`}>PostgreSQL (Prod)</span>
                    <span className="stack-val">Hosted on Supabase — separated from the back-end layer, making the database independently manageable and monitorable.</span>
                  </div>
                </div>
              </div>

              <div className="stack-layer">
                <div className={`stack-title ${pixel.className}`}>Deployment</div>
                <div className="stack-items">
                  <div className="stack-item">
                    <span className={`stack-key ${pixel.className}`}>Vercel</span>
                    <span className="stack-val">Front-end deployment. Connect GitHub repo, configure build command — every push to main auto-deploys. Seamless.</span>
                  </div>
                  <div className="stack-item">
                    <span className={`stack-key ${pixel.className}`}>Railway</span>
                    <span className="stack-val">Back-end deployment. Runs on a credit system — not a flat subscription. Service goes down if credits aren&apos;t topped up. Important lesson in understanding billing models before committing to a platform.</span>
                  </div>
                </div>
              </div>
            </div>

            <Note>
              Choosing Railway for back-end deployment felt straightforward at first. But Railway
              runs on a credit system — there&apos;s a usage limit that needs to be monitored regularly.
              Going forward, using Docker for the build would likely be a better approach — more
              portable and less tied to any single platform&apos;s constraints.
            </Note>
          </section>

          {/* 05 Development */}
          <section className="section" id="development">
            <div className={`section-label ${pixel.className}`}>05 — DEVELOPMENT</div>
            <h2 className={`section-title ${pixel.className}`}>
              From Blueprints to Running Code
            </h2>
            <p>
              Every feature had its own branch, was developed, reviewed via Pull Request, then
              merged to the development branch only after passing team code review. Nothing went
              directly to main without sign-off.
            </p>

            <div className="challenge-block">
              <div className={`challenge-title ${pixel.className}`}>Finnhub API Integration</div>
              <p>
                One of the biggest technical challenges was integrating real-time stock data from
                Finnhub. It wasn&apos;t just a matter of calling an API — data had to be normalized,
                cached appropriately, and displayed consistently across the dashboard. Every layer
                of the back-end had to handle the data contract cleanly so the front-end could
                trust what it received.
              </p>
            </div>

            <div className="challenge-block">
              <div className={`challenge-title ${pixel.className}`}>Dual Database Strategy</div>
              <p>
                Using H2 during development meant we could iterate quickly without worrying about
                corrupting production data. When ready for production, all migrations were run against
                PostgreSQL on Supabase. The discipline of keeping these environments separate was
                something I didn&apos;t fully appreciate until we hit our first migration issue.
              </p>
            </div>

            <div className="challenge-block">
              <div className={`challenge-title ${pixel.className}`}>Email Service via Mailtrap</div>
              <p>
                For account management features involving email notifications, we used Mailtrap to
                safely test email flows without sending to real inboxes during development. A small
                decision that saved us from some potentially embarrassing test emails landing in
                real accounts.
              </p>
            </div>

            <ImageBlock
             src="/naratrad/api-docs.png"
              label="Swagger API Docs"
              caption="API documentation · Postman collection"
              className="wide-placeholder"
            />
          </section>

          {/* 06 Testing */}
          <section className="section" id="testing">
            <div className={`section-label ${pixel.className}`}>06 — TESTING & QA</div>
            <h2 className={`section-title ${pixel.className}`}>
              No Feature Ships Without Being Tested
            </h2>
            <p>
              We set a standard: every feature going into the development branch had to have
              adequate test coverage. Not just manual — automated, documented, and reproducible.
            </p>

            <div className="card-grid">
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>JUnit — Back-end</div>
                <p>
                  Unit tests written for every service layer — ensuring business logic behaved as
                  expected before any API was exposed to the front-end. When a regression appeared,
                  existing tests caught it immediately. Testing isn&apos;t overhead. It&apos;s proof.
                </p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Jasmine + Karma — Front-end</div>
                <p>
                  Component testing to ensure UI interactions remained consistent — especially for
                  complex components like the dashboard and portfolio views where data rendering
                  had to be reliable.
                </p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Postman + Swagger</div>
                <p>
                  Before the front-end consumed any API, every endpoint was manually tested through
                  Postman. Swagger served as always-up-to-date API documentation that could be
                  executed directly — the single source of truth for the team.
                </p>
              </div>
            </div>

            <ImageBlock
              src="/naratrad/testing-junits.png"
              label="JUnit Test Results"
              caption="unit test coverage report · service layer validation"
              className="wide-placeholder"
            />

            <Note>
              JUnit changed how I think about code. Before this, testing felt like extra work. After
              writing unit tests for every service, I realized: testing isn&apos;t overhead — it&apos;s how
              we prove that our code actually does what we think it does. And when a bug appeared
              in the next iteration, the existing tests were what saved us.
            </Note>
          </section>

          {/* 07 Output */}
          <section className="section" id="output">
            <div className={`section-label ${pixel.className}`}>07 — OUTPUT</div>
            <h2 className={`section-title ${pixel.className}`}>
              NaraTrad — A Simple, Real Portfolio Tracker
            </h2>
            <p>
              The final product is a web application accessible on both desktop and mobile, with a
              complete feature set from authentication to portfolio management. Live and running.
            </p>

            <div className="live-link-block">
              <span className={`live-label ${pixel.className}`}>🌐 LIVE</span>
              <a href="https://nara-trad-fe.vercel.app" target="_blank" rel="noopener noreferrer" className="live-url">
                nara-trad-fe.vercel.app
              </a>
            </div>

              <ImageBlock src="/images/cover-page/Naratrad.png" label="Outputs" caption="Outputs" />

            <div className="features-list">
              {[
                {
                  name: 'Secure Auth',
                  desc: 'Registration, login, and safe session management. The foundation everything else depends on.',
                },
                {
                  name: 'Real-Time Dashboard',
                  desc: 'Portfolio overview with live stock price data from Finnhub. The core value proposition — see the whole picture at a glance.',
                },
                {
                  name: 'Portfolio Management',
                  desc: 'Add, edit, and monitor owned stocks. The primary use case, executed cleanly.',
                },
                {
                  name: 'Stock Wishlist',
                  desc: 'Save stocks to watch before buying. Built for the research phase, not just the ownership phase.',
                },
                {
                  name: 'Account Management',
                  desc: 'Manage profile and account preferences. Keeps the experience personal.',
                },
                {
                  name: 'Admin Dashboard',
                  desc: 'Administration panel for system management. Required for sustainable post-deployment operations.',
                },
                {
                  name: 'Responsive Design',
                  desc: 'Accessible and comfortable on both desktop and mobile. No feature locked to a screen size.',
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
              How I&apos;m Starting to Think as an Engineer
            </h2>
            <p>
              This isn&apos;t just about NaraTrad. It&apos;s about what changed in how I reason about
              systems, responsibility, and what it actually means for something to be &ldquo;done.&rdquo;
            </p>
            <div className="reflection-grid">
              {[
                {
                  title: 'Being back-end means understanding the whole system',
                  body: "Back-end isn't just writing endpoints. I needed to have a complete picture of how the entire system works — from an incoming request, through the processing layers, all the way back to the front-end. That requires logical, systems-level thinking, and I wasn't fully prepared for it at the start. But that's exactly what made the learning process meaningful.",
                },
                {
                  title: 'JUnit changed how I think about code',
                  body: "Before this, testing felt like extra work. After writing unit tests for every service, I realized: testing isn't overhead — it's how we prove that our code actually does what we think it does. And when a bug appeared in the next iteration, the existing tests were what saved us.",
                },
                {
                  title: 'Understand your deployment platform before committing',
                  body: "Railway runs on credits, not a flat plan. If the credits run out, the service goes down. Lesson learned: always understand the billing model before committing. And in the future, using Docker for the build would probably be the smarter move — more portable, less dependent on any one platform's quirks.",
                },
                {
                  title: "Don't be embarrassed to ask your mentors",
                  body: "There were several points in development where I stayed stuck longer than necessary because I was hesitant to ask for help. But that's literally what mentors are there for. When I finally did ask, the solution was almost always simpler than I'd imagined. Pride isn't productivity.",
                },
                {
                  title: 'A simple project can be an incredible teacher',
                  body: "NaraTrad isn't complex in terms of features. But precisely because it was simple, I could focus on truly understanding the fundamentals — how the service layer works, how a request flows from the front-end to the database and back, what a healthy deployment pipeline actually looks like. Complexity hides the fundamentals.",
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
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        :root {
          --bg:          #f4efe4;
          --surface:     #ffffff;
          --ink:         #171717;
          --ink-muted:   #555555;
          --accent:      #0f5c3a;
          --accent-mid:  #1a7a4f;
          --accent-light:#e6f4ee;
          --yellow:      #fff6a5;
          --dot-size:    18px;
          --shadow:      5px 5px 0 var(--ink);
          --shadow-lg:   6px 6px 0 var(--ink);
          --border:      2px solid var(--ink);
          --font-body:   'Courier New', 'Courier', monospace;
          --font-ui:     'Segoe UI', system-ui, sans-serif;
        }

        body { background: var(--bg); color: var(--ink); }

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
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 200; height: 34px;
          background: #d4d0c8;
          border-bottom: 2px solid #8d8d8d;
          box-shadow: 0 2px 0 #ffffff;
          display: flex; align-items: center;
          gap: 3px; padding: 0 8px;
        }

        .tab {
          height: 24px; min-width: 100px; padding: 0 12px;
          display: inline-flex; align-items: center; justify-content: center;
          text-decoration: none; color: var(--ink); background: #d4d0c8;
          border: 1px solid; border-color: #fff #777 #777 #fff;
          font-family: var(--font-ui); font-size: 11px; font-style: italic;
          cursor: default; white-space: nowrap; transition: background 0.1s;
        }
        .tab:hover  { background: #c0bdb4; }
        .active-tab { background: #fff; border-color: #777 #fff #fff #777; }
        .start-tab  { min-width: 54px; font-style: normal; font-weight: 600; }
        .plus-tab   { min-width: 42px; font-size: 16px; padding-bottom: 2px; }

        .tab-clock {
          margin-left: auto; height: 24px; padding: 0 10px;
          display: flex; align-items: center; gap: 12px;
          background: #d4d0c8; border: 1px solid;
          border-color: #777 #fff #fff #777;
          font-family: var(--font-ui); font-size: 11px;
          font-style: italic; color: var(--ink);
        }

        .page-wrap { max-width: 1180px; margin: 0 auto; padding: 56px 72px 120px; }

        /* ── Hero ── */
        .hero { padding-bottom: 52px; border-bottom: var(--border); }

        .hero-meta {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 28px;
        }

        .back-link a {
          font-family: var(--font-ui); font-size: 12px;
          font-style: italic; color: var(--accent); text-decoration: none;
        }
        .back-link a:hover { text-decoration: underline; }

        .project-num { font-family: var(--font-ui); font-size: 12px; font-style: italic; color: var(--accent); }

        .hero-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 52px; align-items: end; }

        .hero-kicker { color: var(--accent); font-size: 8px; margin-bottom: 18px; text-transform: uppercase; letter-spacing: 0.5px; }

        .hero-title {
          font-size: clamp(36px, 6vw, 80px);
          line-height: 1; letter-spacing: -3px;
          color: var(--ink); margin-bottom: 18px;
        }

        .hero-sub { font-family: var(--font-body); font-size: 13px; font-weight: 700; color: #4b4b4b; margin-bottom: 20px; }

        .hero-desc { max-width: 460px; font-family: var(--font-body); font-size: 12px; font-weight: 700; line-height: 1.85; color: #222; margin-bottom: 28px; }

        .hero-tags { display: flex; flex-wrap: wrap; gap: 10px; }

        .hero-tags span {
          background: var(--surface); border: var(--border);
          border-color: var(--accent); color: var(--accent);
          padding: 6px 10px; font-size: 7px;
          box-shadow: 3px 3px 0 var(--ink);
        }

        /* ── Overview strip ── */
        .overview-strip {
          display: grid; grid-template-columns: repeat(4, 1fr);
          border: var(--border); border-top: none;
          background: var(--surface); box-shadow: var(--shadow-lg);
        }

        .ov-item { padding: 24px 20px; border-right: var(--border); }
        .ov-item:last-child { border-right: none; }
        .ov-label { font-size: 7.5px; color: var(--accent); margin-bottom: 10px; }
        .ov-val { font-family: var(--font-body); font-size: 11px; font-weight: 700; line-height: 1.6; }

        /* ── Sticky nav ── */
        .case-navbar {
          position: sticky; top: 34px; z-index: 120;
          margin: 0 -72px 56px; padding: 32px 72px 0 72px;
          display: flex; background: var(--bg);
          border-bottom: 3px solid var(--accent);
          overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none;
        }
        .case-navbar::-webkit-scrollbar { display: none; }

        .case-navbar a {
          color: var(--ink); opacity: 0.45; text-decoration: none;
          font-family: var(--font-body); font-size: 10px; font-weight: 700;
          padding: 13px 20px; border-bottom: 3px solid transparent;
          white-space: nowrap; letter-spacing: 0.8px; text-transform: uppercase;
          margin-bottom: -3px; transition: opacity 0.1s, border-color 0.1s, color 0.1s;
        }
        .case-navbar a:hover { opacity: 0.75; }
        .case-navbar a.active { opacity: 1; color: var(--accent); border-bottom-color: var(--accent); }

        /* ── Body ── */
        .body-grid { display: flex; flex-direction: column; gap: 80px; }
        .section { scroll-margin-top: 135px; }
        .hero    { scroll-margin-top: 135px; }

        .section-layout { display: grid; grid-template-columns: 1fr 260px; gap: 32px; align-items: start; margin-top: 24px; }

        .section-label { display: block; font-size: 7.5px; color: var(--accent); margin-bottom: 18px; letter-spacing: 0.5px; }

        .section-title { font-size: clamp(14px, 2vw, 22px); color: var(--ink); margin-bottom: 24px; line-height: 1.4; letter-spacing: -0.5px; font-weight: 400; }

        .sub-heading { font-size: 9.5px; color: var(--ink); margin: 36px 0 16px; font-weight: 400; }

        /* ── Team grid ── */
        .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin: 28px 0; }

        .team-card {
          background: var(--surface); border: var(--border); box-shadow: var(--shadow);
          padding: 26px; display: flex; flex-direction: column; gap: 10px;
        }
        .team-card.me { border-color: var(--accent); }

        .team-name { font-size: 11px; letter-spacing: -0.5px; }
        .team-role { font-size: 7.5px; color: var(--accent); margin-bottom: 6px; }

        .team-list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 6px;
        }

        .team-list li {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          color: #333; line-height: 1.6; padding-left: 12px; position: relative;
        }
        .team-list li::before { content: '—'; position: absolute; left: 0; color: var(--accent); }

        /* ── Stack grid ── */
        .stack-grid { display: flex; flex-direction: column; gap: 28px; margin-top: 28px; margin-bottom: 28px; }

        .stack-layer {
          border: var(--border); background: var(--surface); box-shadow: var(--shadow);
        }

        .stack-title {
          font-size: 8px; color: var(--surface); background: var(--accent);
          padding: 10px 20px; letter-spacing: 0.5px;
        }

        .stack-items { display: flex; flex-direction: column; }

        .stack-item { display: flex; gap: 24px; padding: 14px 20px; border-bottom: var(--border); }
        .stack-item:last-child { border-bottom: none; }

        .stack-key { font-size: 8px; color: var(--accent); min-width: 130px; flex-shrink: 0; padding-top: 2px; }
        .stack-val { font-family: var(--font-body); font-size: 11px; font-weight: 700; line-height: 1.7; color: #222; }

        /* ── Challenge block ── */
        .challenge-block {
          background: var(--surface); border: var(--border); box-shadow: var(--shadow);
          padding: 24px 28px; margin: 20px 0;
          display: flex; flex-direction: column; gap: 12px;
        }

        .challenge-title { font-size: 8px; color: var(--accent); }

        /* ── Live link ── */
        .live-link-block {
          display: inline-flex; align-items: center; gap: 16px;
          border: var(--border); border-color: var(--accent);
          background: var(--accent-light); padding: 14px 20px;
          box-shadow: var(--shadow); margin-bottom: 28px;
        }

        .live-label { font-size: 8px; color: var(--accent); }

        .live-url {
          font-family: var(--font-body); font-size: 12px; font-weight: 700;
          color: var(--accent); text-decoration: underline;
        }
        .live-url:hover { opacity: 0.75; }

        /* ── Image blocks ── */
        .image-block {
          position: relative; width: 100%; min-height: 260px;
          background: var(--surface); border: var(--border); box-shadow: var(--shadow-lg);
          overflow: hidden; display: flex; align-items: center; justify-content: center;
        }

        .image-block img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .image-placeholder {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 14px; padding: 32px; text-align: center;
          width: 100%; height: 100%; min-height: inherit;
          background: repeating-linear-gradient(
            45deg, transparent, transparent 8px,
            rgba(15,92,58,0.04) 8px, rgba(15,92,58,0.04) 16px
          );
        }

        .placeholder-label { font-family: var(--font-body); font-size: clamp(14px, 2.5vw, 28px); font-weight: 700; color: var(--ink-muted); opacity: 0.5; }

        .image-placeholder small { font-family: var(--font-body); font-size: 11px; font-weight: 700; color: var(--ink-muted); max-width: 480px; line-height: 1.6; opacity: 0.7; }

        .wide-placeholder { min-height: 300px; margin: 28px 0; }
        .hero-image       { min-height: 420px; }

        .image-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 28px 0; }

        /* ── Cards ── */
        .card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin: 28px 0; }

        .info-card { background: var(--surface); border: var(--border); box-shadow: var(--shadow); padding: 22px; display: flex; flex-direction: column; gap: 10px; }
        .info-card.accent { border-color: var(--accent); }
        .card-title { font-size: 8px; color: var(--accent); margin-bottom: 4px; }
        .info-card p { font-size: 11px; margin-bottom: 0; }

        /* ── Design system ── */
        .ds-grid { display: flex; flex-direction: column; border: var(--border); background: var(--surface); box-shadow: var(--shadow); margin: 20px 0; }
        .ds-item { display: flex; gap: 24px; padding: 16px 20px; border-bottom: var(--border); }
        .ds-item:last-child { border-bottom: none; }
        .ds-key { font-size: 8px; color: var(--accent); min-width: 110px; flex-shrink: 0; padding-top: 2px; }
        .ds-val { font-family: var(--font-body); font-size: 11.5px; font-weight: 700; line-height: 1.7; }

        /* ── Callout / Note ── */
        .callout { background: var(--yellow); border: var(--border); box-shadow: var(--shadow); font-family: var(--font-body); font-weight: 700; font-size: 11.5px; line-height: 1.8; padding: 18px 22px; margin: 28px 0; }

        .note { border-left: 3px solid #c8a800; background: #fffbe6; padding: 12px 16px; font-family: var(--font-body); font-weight: 700; font-size: 11px; line-height: 1.75; color: #3a3520; display: flex; flex-direction: column; gap: 4px; }

        .note-icon { font-size: 7.5px; font-family: var(--font-body); font-weight: 700; letter-spacing: 1px; color: #9a7c00; text-transform: uppercase; }

        /* ── Features list ── */
        .features-list { display: flex; flex-direction: column; margin-top: 28px; border: var(--border); box-shadow: var(--shadow); background: var(--surface); }
        .feature-item { display: flex; gap: 28px; padding: 18px 22px; border-bottom: var(--border); align-items: baseline; }
        .feature-item:last-child { border-bottom: none; }
        .feature-name { font-size: 8px; color: var(--accent); min-width: 160px; flex-shrink: 0; line-height: 1.6; }
        .feature-desc { font-family: var(--font-body); font-size: 11.5px; font-weight: 700; line-height: 1.7; }

        /* ── Reflection ── */
        .reflection-section { background: var(--surface); border: var(--border); box-shadow: var(--shadow-lg); padding: 36px 40px; }
        .reflection-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 24px; }
        .reflection-item { display: flex; flex-direction: column; gap: 12px; padding: 18px; background: var(--bg); border: var(--border); }
        .r-title { font-size: 8px; color: var(--accent); line-height: 1.6; }
        .reflection-item p { font-size: 11px; }

        /* ── More works ── */
        .more-works { margin-top: 96px; padding-top: 44px; border-top: var(--border); }
        .more-header { margin-bottom: 28px; }
        .more-title { font-size: clamp(18px, 3vw, 36px); line-height: 1.15; margin-top: 14px; font-weight: 400; letter-spacing: -1px; }
        .more-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }

        .more-card { min-height: 190px; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; color: var(--ink); text-decoration: none; background: var(--surface); border: var(--border); box-shadow: var(--shadow-lg); transition: transform 0.12s, box-shadow 0.12s; }
        .more-card:hover { transform: translate(3px, 3px); box-shadow: 3px 3px 0 var(--ink); }
        .more-card span { font-size: 8px; color: var(--accent); }
        .more-card strong { display: block; font-size: clamp(16px, 2vw, 22px); line-height: 1.2; font-weight: 400; letter-spacing: -1px; }
        .more-card p { font-size: 11px; color: #444; margin-bottom: 0; }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .page-wrap { padding: 40px 32px 90px; }
          .case-navbar { margin-left: -32px; margin-right: -32px; padding-left: 32px; padding-right: 32px; }
          .hero-grid, .section-layout { grid-template-columns: 1fr; }
          .overview-strip { grid-template-columns: 1fr 1fr; }
          .card-grid, .team-grid, .reflection-grid, .more-grid { grid-template-columns: 1fr; }
          .image-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .page-wrap { padding: 24px 16px 72px; }
          .tab-clock { display: none; }
          .tab { min-width: auto; padding: 0 8px; font-size: 9px; }
          .overview-strip { grid-template-columns: 1fr; }
          .ov-item { border-right: none; border-bottom: var(--border); }
          .ov-item:last-child { border-bottom: none; }
          .feature-item, .stack-item, .ds-item { flex-direction: column; gap: 6px; }
          .feature-name, .stack-key, .ds-key { min-width: unset; }
          .reflection-section { padding: 24px 20px; }
        }
      `}</style>
    </main>
  )
}