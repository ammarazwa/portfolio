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
    title: 'Naratrad',
    type: 'Website',
    role: 'Backend Engineer',
    href: '/works/naratrad',
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
  scrollable = false,
}: {
  src?: string
  label: string
  caption?: string
  className?: string
  scrollable?: boolean
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

export default function PanganesiaCaseStudy() {
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
            <span className="project-num">02 / 06</span>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <div className={`hero-kicker ${pixel.className}`}>PPL Course Project · 2026</div>
              <h1 className={`hero-title ${pixel.className}`}>PANGANESIA</h1>
              <p className="hero-sub">Web Platform for Food Diversification</p>
              <p className="hero-desc">
                Panganesia is a web-based platform designed to support food diversification
                in Indonesia — bringing together food education, local recipe discovery, and
                a marketplace for non-rice ingredients in one integrated system.
              </p>
              <div className="hero-tags">
                {['Next.js', 'React', 'Supabase', 'Prisma', 'Vercel'].map((t) => (
                  <span key={t} className={pixel.className}>{t}</span>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <ImageBlock
                src="/images/cover-page/panganesia.png"
                label="PANGANESIA"
                caption="main project preview"
                className="hero-image"
              />
            </div>
          </div>
        </header>

        {/* ── Overview strip ── */}
        <section className="overview-strip" aria-label="Project overview">
          {[
            { label: 'ROLE', val: 'Frontend Developer' },
            { label: 'DURATION', val: 'March - June 2026' },
            { label: 'TEAM', val: <ol><li>Senia Nur Hasanah (PM)</li><li>Ammara Azwadiena A. (FE)</li><li>Siti Aisyah N. (FE)</li><li>Raffanisa Z.K. (BE))</li></ol> },
            { label: 'TECH', val: 'Next.js · Supabase · Prisma · Vercel' },
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
                  A Course Project. But a Real Problem.
                </h2>
                <p>
                  Proyek Perangkat Lunak I (PPL) is a software engineering course at Teknik
                  Informatika Universitas Padjadjaran where student teams go through the full
                  cycle of building a software product — from problem framing and system design,
                  all the way through implementation and testing.
                </p>
                <p>
                  There is three constraint for this project:
                </p>
                  <ol style={{ marginLeft: '20px'}}>
                    <li>1. Must address a real problem by creating a solution that support the 17 Sustainable Development Goals (SDGs)</li>
                    <li>2. Implementation between these 3 options: web, mobile, or both</li>
                    <li>3. Must implement agile methodology</li>
                  </ol>
                <p>
                  The problem we landed on was food diversification. Data from BPS 2023 shows
                  that rice consumption per capita in Indonesia remains stubbornly dominant —
                  decade after decade. And this isn't just a preference problem. It's a
                  structural one.
                </p>
                <p>
                  Three gaps keep people locked into rice dependency. 
                </p>
                
                  <ol style={{ marginLeft: '20px'}}>
                    <li>1. Information gap: no centralized access to local non-rice food options, their nutrition, or how to prepare them.</li>
                    <li>2. Access gap: local products like cassava flour, mocaf, and corn rice have no dedicated digital channel.</li>
                    <li>3. Practice gap: no recipe guides built around local ingredients that make diversification feel practical, not abstract.</li>
                  </ol>
                <p>
                  Panganesia was designed to close all three — in one platform.
                </p>
              </div>
              <Note>
                Choosing a real problem over a safe one added pressure — we had to validate
                that the need actually existed before designing the solution. The BPS 2023
                rice consumption data gave us the anchor. Everything else followed from there.
              </Note>
            </div>
          </section>

          {/* 01 Discovery */}
          <section className="section" id="discovery">
            <div className={`section-label ${pixel.className}`}>01 — DISCOVERY</div>
            <h2 className={`section-title ${pixel.className}`}>
              Survey → Design Thinking → Feature Set
            </h2>
            <p>
              Before designing anything, we ran a Google Form survey with 30 respondents to
              understand actual behavior around food consumption and what users would need from
              a food-based application.
            </p>
            <p>
              Three findings shaped everything that came after. The majority of respondents eat
              rice as their staple food every single day — confirming that dependency is real,
              not assumed. Most respondents said they needed an application that provides
              information about non-rice local food. And when asked about features, respondents
              prioritized educational content, recipe discovery, and product access — in that
              order.
            </p>

            <ImageBlock
              src="/panganesia/survey.png"
              label="Survey Results"
              caption="konsumsi pangan · kebutuhan aplikasi · kebutuhan fitur"
              className="wide-placeholder"
            />

            <Note>
              30 respondents gave us directional signal, not census data. Self-selected sample
              means these are likely already health-aware users. For a real production context,
              I'd want a broader and more representative sample before committing to a feature
              set. For a course project timeline, it was enough to validate the core direction.
            </Note>

            <h3 className={`sub-heading ${pixel.className}`}>Design Thinking: Empathize → Define → Ideate → Prototype → Test</h3>
            <p>
              We used Design Thinking as the UI/UX methodology, mapping research findings to
              design decisions at each stage.
            </p>

            <div className="card-grid">
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Empathize</div>
                <p>Survey with 30 respondents to understand consumption patterns and unmet needs.</p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Define</div>
                <p>Two core problem statements: low diversification due to lack of information, and no integrated digital access to local food and recipes.</p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Ideate</div>
                <p>Panganesia as a platform combining education, recipe discovery, and marketplace — addressing all three gaps simultaneously.</p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Prototype</div>
                <p>User flow and wireframes covering Authentication, Landing Page, Homepage, Marketplace, Recipe, Cart, Checkout, and User Account.</p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Test</div>
                <p>Internal blackbox testing conducted after implementation, covering correct and incorrect scenarios for all core features.</p>
              </div>
            </div>

            <ImageBlock
              src="/panganesia/user-flow.png"
              label="User Flow"
              caption="full user flow diagram: authentication → education → marketplace → checkout"
              className="wide-placeholder"
            />
            <ImageBlock
              src="/panganesia/wireframes.png"
              label="Wireframes"
              caption="lo-fi wireframes: authentication · landing page · homepage · marketplace · recipe · cart"
              className="wide-placeholder"
              scrollable={true}
            />
          </section>

          {/* 02 Research */}
          <section className="section" id="research">
            <div className={`section-label ${pixel.className}`}>02 — RESEARCH</div>
            <h2 className={`section-title ${pixel.className}`}>
              Three Gaps. One Platform.
            </h2>
            <p>
              The problem framing started with a question: why hasn't food diversification
              moved, even with decades of policy attention? The answer wasn't motivation —
              it was infrastructure. Three structural gaps made rice the default.
            </p>

            <div className="persona-grid">
              <div className="persona-card">
                <div className={`persona-name ${pixel.className}`}>Gap 01</div>
                <div className={`persona-role ${pixel.className}`}>Information Gap</div>
                <div className="persona-pain">
                  <strong>Problem:</strong> No centralized, accessible knowledge about
                  local non-rice foods — their nutrition, cultural context, or how to cook them.
                </div>
                <div className="persona-gain">
                  <strong>Solution:</strong> Dashboard Edukasi Pangan — educational content
                  on local food diversity, built as a first-class feature, not a disclaimer.
                </div>
              </div>
              <div className="persona-card">
                <div className={`persona-name ${pixel.className}`}>Gap 02</div>
                <div className={`persona-role ${pixel.className}`}>Access Gap</div>
                <div className="persona-pain">
                  <strong>Problem:</strong> Local products like cassava flour, mocaf, and
                  corn rice have no dedicated digital distribution channel. They exist but
                  aren't findable.
                </div>
                <div className="persona-gain">
                  <strong>Solution:</strong> Marketplace — browse and purchase local food
                  products, with full cart and checkout flow.
                </div>
              </div>
              <div className="persona-card">
                <div className={`persona-name ${pixel.className}`}>Gap 03</div>
                <div className={`persona-role ${pixel.className}`}>Practice Gap</div>
                <div className="persona-pain">
                  <strong>Problem:</strong> No recipe guides built specifically around local
                  ingredients — making diversification feel abstract and impractical for daily
                  cooking.
                </div>
                <div className="persona-gain">
                  <strong>Solution:</strong> Smart Recipe — discovery built around non-rice
                  ingredients with full steps, ingredient lists, and save functionality.
                </div>
              </div>
            </div>

            <div className="callout">
              The three-gap framing wasn't just a problem statement — it became the product
              architecture. Each feature maps directly to one gap. Education closes the
              information gap. Marketplace closes the access gap. Smart Recipe closes the
              practice gap. Nothing in the feature set exists outside that structure.
            </div>
          </section>

          {/* 03 Crafting */}
          <section className="section" id="crafting">
            <div className={`section-label ${pixel.className}`}>03 — CRAFTING</div>
            <h2 className={`section-title ${pixel.className}`}>
              Every Screen Had Logic Behind It
            </h2>
            <p>
              As the frontend developer, my work covered the full user-facing layer of the
              application. This wasn't just layout — it was state management, API integration,
              auth flows, loading and error states, and making sure the UI responded correctly
              to every possible backend response.
            </p>

            <h3 className={`sub-heading ${pixel.className}`}>System Architecture: Three-Tier</h3>
            <p>
              Panganesia is built on a three-tier architecture: the client layer (Next.js
              frontend, browser), the application layer (Vercel serverless functions handling
              routing and logic), and the data layer (Supabase providing authentication via JWT
              and PostgreSQL via REST API, with Prisma as the ORM).
            </p>

            <ImageBlock
              src="/panganesia/deployment-diagram.png"
              label="Deployment Diagram"
              caption="three-tier architecture: Next.js → Vercel → Supabase"
              className="wide-placeholder"
            />

            <Note>
              We didn't start with Prisma. Mid-sprint, we hit Supabase's free-tier email
              sending limit — which broke part of our auth flow. Migrating to Supabase + Prisma
              was an unplanned infrastructure decision that added a week of work. Infrastructure
              constraints aren't something you think about at the start of a project — until
              they stop you cold in the middle of one. I now audit tool limits before depending
              on them.
            </Note>

            <h3 className={`sub-heading ${pixel.className}`}>Feature Prioritization: MVP 1 → 2 → 3</h3>
            <p>
              We used an MVP framework to sequence the build across three phases — shipping
              core value first, then adding transactional and engagement layers.
            </p>

            <div className="card-grid">
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>MVP 1 — Core</div>
                <p>User management (register, login, profile), Dashboard Edukasi Pangan, Smart Recipe, Marketplace display.</p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>MVP 2 — Transactional</div>
                <p>Cart, Checkout & Payment, Transaction History, Favorites (Recipe + Product), Admin management panel.</p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>MVP 3 — Post-Purchase</div>
                <p>Product reviews — requires purchase history data to be meaningful. Sequenced last by design.</p>
              </div>
            </div>

            <h3 className={`sub-heading ${pixel.className}`}>Key Screens I Built</h3>
            <p>
              Every screen below had engineering problems behind it — not just layout decisions.
            </p>

            <div className="ds-grid">
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Landing Page</span>
                <span className="ds-val">
                  Hero carousel with Framer Motion animations, auto-detect era on scroll,
                  educational content sections about local food diversity. First screen a
                  user sees — had to communicate the value proposition before they'd scroll.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Authentication</span>
                <span className="ds-val">
                  Login, Register, Forgot Password, Reset Password flows. Integrated with
                  Supabase Auth on the client side for session management, and server-side
                  role-based redirect (user vs admin) via auth callback.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Marketplace</span>
                <span className="ds-val">
                  Cart management and checkout flow with address input and payment method
                  selection. Every state (empty cart, loading, error, success) had to be
                  handled explicitly — not just the happy path.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Admin Panel</span>
                <span className="ds-val">
                  CRUD implementation to manage Panganesia's users, products, recipes, and
                  orders. Role-based access: admin sees this; regular users don't.
                </span>
              </div>
            </div>

            <ImageBlock
              src="/panganesia/hifi.png"
              label="Implemented UI"
              caption="landing page · auth · marketplace · recipe · cart · checkout · profile · admin"
              className="wide-placeholder"
              scrollable={true}
            />

            <div className="callout">
              Frontend is more technical than I expected going in. It's not just making things
              look good — it's state management, API integration, handling loading and error
              states, making sure the UI responds correctly to every possible backend response.
              Every page had logic behind it, not just layout. Building something that actually
              runs in a browser taught me that design and engineering are not separate things
              on the frontend.
            </div>
          </section>

          {/* 04 Challenge */}
          <section className="section">
            <div className={`section-label ${pixel.className}`}>04 — CHALLENGE</div>
            <h2 className={`section-title ${pixel.className}`}>
              When the Backend Goes Quiet
            </h2>

            <div className="challenge-block">
              <p>
                Our backend developer went MIA for stretches of the project. Not maliciously —
                schedules diverged, communication broke down. But the effect was the same:
                features I needed to build on the frontend had no API to call.
              </p>
              <p>
                I had three options each time: wait, build a workaround, or implement the
                backend myself. The last option meant learning enough about Supabase, Prisma,
                and the data layer to build what was needed — which wasn't in my original role.
              </p>
              <p>
                I ended up doing all three at different points. Waiting when the timeline allowed
                it. Workarounds when we had to ship. And a handful of backend implementations
                when the feature was critical and there was no other path.
              </p>
              <p>
                The blurriness of frontend and backend on a small team isn't a failure mode —
                it's a feature. But it requires understanding enough of the other side to
                function when roles don't cleanly hold.
              </p>
            </div>

            <h3 className={`sub-heading ${pixel.className}`}>The Supabase → Prisma Migration</h3>
            <p>
              We hit Supabase's free-tier email sending limit mid-sprint. This broke the
              password reset and email verification flow — which meant parts of authentication
              stopped working entirely. It wasn't a bug. It was an infrastructure constraint
              we hadn't planned for.
            </p>
            <p>
              Migrating to a Supabase + Prisma setup was a mid-sprint infrastructure decision
              nobody had anticipated. It meant re-learning parts of the database layer while
              still trying to ship features. It added a week of unplanned work at a point in
              the sprint when we couldn't afford it.
            </p>

            <div className="callout warning">
              Lesson learned: read the constraints of your tools before you depend on them.
              Supabase's free tier limits are documented — we just hadn't read that far.
              Infrastructure audits are now a sprint-zero concern for me, not cleanup.
            </div>

            <h3 className={`sub-heading ${pixel.className}`}>Git and the Codebase Language Debate</h3>
            <p>
              Two separate problems surfaced mid-project that looked small and weren't. First:
              merge conflicts and accidentally overwritten work from branching strategies nobody
              had aligned on at the start. Second: the codebase had drifted between Bahasa
              Indonesia and English for component names, variable names, and comments — across
              dozens of files — because nobody had decided which to use before writing code.
            </p>
            <p>
              Standardizing the language mid-project meant touching a large portion of the
              codebase at once. It sounds like a minor cleanup. It isn't, when you're also
              trying to ship MVP 2.
            </p>
          </section>

          {/* 05 Validation */}
          <section className="section" id="validation">
            <div className={`section-label ${pixel.className}`}>05 — VALIDATION</div>
            <h2 className={`section-title ${pixel.className}`}>
              Blackbox Testing: Every Feature, Both Paths
            </h2>
            <p>
              We conducted internal blackbox testing covering correct and incorrect scenarios
              for all core features. Each test case was designed to verify that the system
              behaves as expected under valid inputs and edge cases — not just the happy path.
            </p>
            <p>
              Test coverage included: Login (T001), Register (T002), Recipe (T003),
              Marketplace (T004), Cart (T005), Checkout (T006), and additional flows through
              admin and profile management.
            </p>
            <p>
              Every test case included input, expected output, actual output, and result — so
              failures could be diagnosed and fixed, not just recorded.
            </p>

            <ImageBlock
              src="/panganesia/blackbox.png"
              label="Blackbox Testing Table"
              caption="T001 Login · T002 Register · T003 Recipe · T004 Marketplace · T005 Cart · T006 Checkout"
              className="wide-placeholder"
            />

            <div className="callout">
              At the time of writing, external user testing (UT and user satisfaction test)
              has not yet been conducted. The evaluation section in the technical document is
              still being completed. This section will be updated with actual user feedback
              and quantitative results when external testing is done.
            </div>
          </section>

          {/* 06 Improvement */}
          <section className="section improvement-section">
            <div className={`section-label ${pixel.className}`}>06 — IMPROVEMENT</div>
            <h2 className={`section-title ${pixel.className}`}>Coming Soon</h2>
            <p>
              This section will be updated after external usability testing, user satisfaction
              measurement, and improvement planning are complete.
            </p>
          </section>

          {/* 07 Output */}
          <section className="section" id="output">
            <div className={`section-label ${pixel.className}`}>07 — OUTPUT</div>
            <h2 className={`section-title ${pixel.className}`}>
              Bridging the Gap Between People and Local Food
            </h2>
            <p>
              The final web application covers the complete user journey from education to
              purchase — closing all three gaps in a single, integrated platform.
            </p>

            <ImageBlock
              src="/panganesia/final-ui.png"
              label="Final UI"
              caption="landing · education · recipe · marketplace · cart · checkout · profile · admin"
              className="wide-placeholder"
              scrollable={true}
            />

            <div className="features-list">
              {[
                {
                  name: 'Dashboard Edukasi Pangan',
                  desc: 'Informational content about local food diversity, nutritional benefits, and why food diversification matters. Closes the information gap — exists because awareness has to come before behavior change.',
                },
                {
                  name: 'Smart Recipe',
                  desc: 'Recipe discovery built around non-rice local ingredients — cassava, sago, corn — with full ingredients and step-by-step instructions. Closes the practice gap — makes diversification feel cookable, not abstract.',
                },
                {
                  name: 'Marketplace',
                  desc: 'Browse and purchase local food products from a curated online storefront. Closes the access gap — products that exist but aren\'t findable, made findable.',
                },
                {
                  name: 'Cart & Checkout',
                  desc: 'Full transaction flow with address management and payment method selection. Every state — empty cart, loading, error, success — handled explicitly.',
                },
                {
                  name: 'Favorites',
                  desc: 'Save recipes and products for later access across sessions. Exists because discovery and intent don\'t always happen at the same moment.',
                },
                {
                  name: 'Transaction History',
                  desc: 'Complete purchase record per user, enabling review eligibility tracking. Foundation for MVP 3 reviews — can\'t review what you haven\'t bought.',
                },
                {
                  name: 'Admin Panel',
                  desc: 'Product, recipe, and user management for administrators. Role-based access via Supabase Auth JWT — admin users get this; regular users don\'t.',
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
              What Building Real Software Actually Feels Like
            </h2>
            <div className="reflection-grid">
              {[
                {
                  title: 'Frontend is genuinely technical',
                  body: 'Going in, I thought frontend would be the more accessible part of the stack. I was wrong. State management, API integration, auth flow, handling asynchronous data — every screen had engineering problems behind it. I left this project with real respect for frontend as a discipline.',
                },
                {
                  title: 'Infrastructure constraints will surprise you',
                  body: 'We hit Supabase\'s email limit mid-project and had to migrate part of our stack from pure Supabase to Supabase + Prisma. This wasn\'t in any sprint plan. It added a week of unplanned work. Learning to read the constraints of your tools before you depend on them is something I now do at the start of every project.',
                },
                {
                  title: 'Team collaboration is a skill, not a default',
                  body: 'Working in a team of five across different roles meant aligning on things that seem obvious until they aren\'t — like whether the codebase should be in Bahasa Indonesia or English. We standardized mid-project. Fixing inconsistent naming across dozens of components is not small work.',
                },
                {
                  title: 'Frontend and backend have to talk constantly',
                  body: 'When our backend developer went MIA, I had to understand enough of the backend to either wait, workaround, or implement it myself. Understanding how APIs work, what Supabase returns, how Prisma queries behave — these became survival skills. The line between frontend and backend blurs fast when the team is small.',
                },
                {
                  title: 'Learn Git properly before you need it',
                  body: 'Merge conflicts, overwritten work, branches that diverged too far before anyone noticed. Learning how to use Git correctly — branching strategy, commit messages, pull request reviews — is not optional on a team project. It\'s the foundation everything else sits on.',
                },
                {
                  title: 'Agile makes big things feel manageable',
                  body: 'Breaking work into sprints, estimating tasks, reviewing what we shipped — it made the project feel controllable instead of overwhelming. It also made blockers visible immediately, rather than letting problems accumulate silently until deadline week.',
                },
                {
                  title: 'Theory and practice are better together',
                  body: 'PPL isn\'t just a build project — it has lectures. Learning software engineering methodology formally, then applying it in the same semester, made every decision feel more deliberate. I understood why we were writing use case diagrams and DFDs, not just that we had to.',
                },
                {
                  title: 'Respecting everyone\'s time and role matters',
                  body: 'A team project is a collection of people with different priorities, paces, and opinions. Learning to voice disagreement constructively, to listen before deciding, and to honor other people\'s expertise — these aren\'t soft skills. They\'re the difference between a team that ships and one that falls apart.',
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
        /* ── Reset ── */
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html { scroll-behavior: smooth; }

        /* ── Tokens ── */
        :root {
          --bg:        #f4efe4;
          --surface:   #ffffff;
          --ink:       #171717;
          --ink-muted: #555555;
          --green:     #2e7d32;
          --green-light: #e8f5e9;
          --yellow:    #fff6a5;
          --dot-size:  18px;
          --shadow:    5px 5px 0 var(--ink);
          --shadow-lg: 6px 6px 0 var(--ink);
          --border:    2px solid var(--ink);
          --font-body: 'Courier New', 'Courier', monospace;
          --font-ui:   'Segoe UI', system-ui, sans-serif;
        }

        /* ── Base ── */
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
        ol {
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 700;
          line-height: 1.85;
          color: #222;
        }
        ol:last-child { margin-bottom: 10px; }
        li {
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 700;
          line-height: 1.85;
          color: #222;
        }
        li:last-child { margin-bottom: 10px; }

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
          margin-bottom: 0;
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
          color: var(--green);
          text-decoration: none;
        }
        .back-link a:hover { text-decoration: underline; }

        .project-num {
          font-family: var(--font-ui);
          font-size: 12px;
          font-style: italic;
          color: var(--green);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 52px;
          align-items: end;
        }

        .hero-kicker {
          color: var(--green);
          font-size: 8px;
          margin-bottom: 18px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hero-title {
          font-size: clamp(28px, 5vw, 48px);
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
          border-color: var(--green);
          color: var(--green);
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
          color: var(--green);
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
          border-bottom: 3px solid var(--green);
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
          color: var(--green);
          border-bottom-color: var(--green);
        }

        /* ── Body ── */
        .body-grid {
          display: flex;
          flex-direction: column;
          gap: 80px;
        }

        .section { scroll-margin-top: 135px; }
        .hero    { scroll-margin-top: 135px; }

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
          color: var(--green);
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
              rgba(46,125,50,0.04) 8px, rgba(46,125,50,0.04) 16px
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
        .info-card.accent { border-color: var(--green); }

        .card-title {
          font-size: 8px;
          color: var(--green);
          margin-bottom: 4px;
        }

        .info-card p { font-size: 11px; margin-bottom: 0; }

        /* ── Persona / Gap cards ── */
        .persona-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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
          color: var(--green);
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
          color: var(--green);
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
          background: var(--green-light);
          border-color: var(--green);
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
          color: var(--green);
          min-width: 180px;
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
          color: var(--green);
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

        .more-card span { font-size: 8px; color: var(--green); }
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
        /* ── Scrollable Image Block (FIXED) ── */
        .image-block.scrollable-block {
          display: block; 
          overflow: auto; 
          max-height: 500px; 
        }

        .image-block.scrollable-block img {
          width: 2000px; 
          height: auto;
          max-width: none; 
          display: block;
        }

        /* ── Custom Retro Scrollbar (Tetap Pakai Ini) ── */
        .image-block.scrollable-block::-webkit-scrollbar {
          width: 14px;
          height: 14px;
        }
        .image-block.scrollable-block::-webkit-scrollbar-track {
          background: var(--bg);
          border-left: 2px solid var(--ink);
          border-top: 2px solid var(--ink);
        }
        .image-block.scrollable-block::-webkit-scrollbar-thumb {
          background: var(--red);
          border: 2px solid var(--bg);
        }
        .image-block.scrollable-block::-webkit-scrollbar-corner {
          background: var(--bg);
          border-left: 2px solid var(--ink);
          border-top: 2px solid var(--ink);
        }
      `}</style>
    </main>
  )
}