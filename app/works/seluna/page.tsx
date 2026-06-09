'use client'

import { Press_Start_2P } from 'next/font/google'
import { useEffect, useState, type ReactNode } from 'react'

const pixel = Press_Start_2P({ weight: '400', subsets: ['latin'] })

const moreWorks = [
  {
    title: 'AddicX',
    type: 'UI/UX',
    role: 'UI/UX Designer',
    href: '/works/addicx',
  },
  {
    title: 'Zichara',
    type: 'AR App',
    role: 'Project Manager + QA',
    href: '/works/zichara',
  },
  {
    title: 'Naratrad',
    type: 'Website',
    role: 'Backend Engineer',
    href: '/works/naratrad',
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

export default function SelunaChaseStudy() {
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
            <span className="project-num">04 / 06</span>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <div className={`hero-kicker ${pixel.className}`}>Arkavidia 9.0 — UXVidia · 2024</div>
              <h1 className={`hero-title ${pixel.className}`}>SELUNA</h1>
              <p className="hero-sub">Mobile Safety Navigation Platform</p>
              <p className="hero-desc">
                Seluna is a mobile safety navigation platform designed to empower women and
                vulnerable individuals — by identifying the most secure transit routes, providing
                immediate access to emergency protocols, and fostering a protective community
                ecosystem for every journey.
              </p>
              <div className="hero-tags">
                {['Figma', 'UX Research', 'Prototyping', 'SDG 11'].map((t) => (
                  <span key={t} className={pixel.className}>{t}</span>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <ImageBlock
                src="/images/cover-page/seluna.png"
                label="SELUNA"
                caption="main project preview"
                className="hero-image"
              />
            </div>
          </div>
        </header>

        {/* ── Overview strip ── */}
        <section className="overview-strip" aria-label="Project overview">
          {[
            { label: 'ROLE', val: 'UI/UX Designer\n(Research, Ideation, Prototyping)' },
            { label: 'DURATION', val: '3 Weeks' },
            { label: 'TEAM', val: 'Clarisya Adeline\nMartha Meslina Florencia\nAmmara Azwadiena Alfiantie' },
            { label: 'SCORE', val: '65.30 / 100\n(Babak Penyisihan)' },
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
                  My First Ever UI/UX Competition.
                </h2>
                <p>
                  Arkavidia is one of the biggest technology events organized by students of Institut
                  Teknologi Bandung (ITB). UXVidia is its UI/UX design competition track, where
                  teams are challenged to design a digital solution around a given theme.
                </p>
                <p>
                  This was the first UI/UX competition I ever joined. I didn't know exactly what to
                  expect — and looking back, that showed in a lot of our decisions, both good and bad.
                </p>
                <p>
                  The problem we chose felt personal. Walking home alone at night, avoiding certain
                  streets, holding your phone tighter on public transport — these weren't hypothetical
                  scenarios for us. According to BPS 2023, there were 69,584 criminal cases in Indonesia,
                  mostly in urban areas. A KRPA survey found 93,960 sexual violence cases, with 23.7%
                  occurring in public spaces.
                </p>
                <p>
                  The numbers confirmed what we already felt: people — especially women — don't feel
                  safe getting from A to B. Existing navigation apps like Google Maps optimize for time
                  and distance. None of them optimize for safety.
                </p>
              </div>
              <Note>
                The competition brief: design a mobile application that addresses a real public
                safety problem, aligned with SDG 11: Sustainable Cities and Communities. The
                solution must be original, data-backed, and technically feasible.
              </Note>
            </div>
          </section>

          {/* 01 Discovery */}
          <section className="section" id="discovery">
            <div className={`section-label ${pixel.className}`}>01 — DISCOVERY</div>
            <h2 className={`section-title ${pixel.className}`}>
              User-Centered Design: Understand Before Building
            </h2>
            <p>
              We used a User-Centered Design methodology, starting with real people before jumping
              to any solutions. Our process followed: Understand → Specify → Design → Test → Iterate.
            </p>

            <ImageBlock
              src="/seluna/ucd-process.png"
              label="UCD Process"
              caption="understand → specify → design → test → iterate"
              className="wide-placeholder"
            />

            <h3 className={`sub-heading ${pixel.className}`}>User Interviews — 4 Participants</h3>
            <p>
              We interviewed four people from different backgrounds to understand their personal
              safety experiences during travel — what they feared, how they coped, and what they
              wished existed.
            </p>
            <p>
              The stories were specific and striking. One person, a driver, said they always had
              to be on high alert because of the nature of their job. Another — a woman who
              regularly traveled through poorly lit areas — said simply: "Sangat tidak aman,
              terutama di jalan sepi."
            </p>
            <p>
              What emerged wasn't just fear — it was the absence of infrastructure. People had
              developed their own workarounds: staying on the phone with a friend, avoiding certain
              routes entirely, carrying self-defense items. None of these were sustainable or
              reliable solutions.
            </p>

            <ImageBlock
              src="/seluna/interview-table.png"
              label="Interview Table"
              caption="4 participants: backgrounds, key fears, coping strategies"
              className="wide-placeholder"
            />

            <Note>
              Our interviews were conducted fairly informally, without a fully standardized script.
              This meant different participants received slightly different questions, which made
              synthesis harder. For a first competition, it worked — but I wish we had built a
              tighter interview guide beforehand. Consistent questions lead to more comparable,
              actionable insights.
            </Note>

            <h3 className={`sub-heading ${pixel.className}`}>Questionnaire — 80 Respondents</h3>
            <p>
              We distributed an online survey via Google Form to 80 respondents aged 15–45 from
              various provinces in Indonesia. The results were clear: 82.5% of respondents had
              experienced an unsafe situation during travel. And 62.5% said they sometimes felt
              unsafe when going out. The problem wasn't isolated — it was widespread and consistent
              across demographics.
            </p>

            <div className="stat-row">
              {[
                { val: '82.5%', desc: 'had experienced an unsafe situation during travel' },
                { val: '62.5%', desc: 'sometimes felt unsafe when going out' },
                { val: '80', desc: 'respondents across multiple provinces in Indonesia' },
              ].map((s) => (
                <div key={s.val} className="stat-card">
                  <span className={`stat-val ${pixel.className}`}>{s.val}</span>
                  <span className="stat-desc">{s.desc}</span>
                </div>
              ))}
            </div>

            <Note>
              80 respondents across multiple provinces gave us geographic breadth, but we didn't
              segment the data by city type, gender, or time of travel — dimensions that would've
              made the insights much richer. It's something I'd prioritize in future research.
            </Note>

            <h3 className={`sub-heading ${pixel.className}`}>Empathy Map</h3>
            <p>
              We synthesized our interview and survey data into an empathy map. The most recurring
              pain: not knowing which route is safe, combined with not having a fast way to ask for
              help. The gain users wanted most was confidence and control — not just safety features,
              but the feeling of not being alone.
            </p>

            <ImageBlock
              src="/seluna/empathy-map.png"
              label="Empathy Map"
              caption="think & feel · hear · see · say & do · pains · gains"
              className="wide-placeholder"
            />
          </section>

          {/* 02 Research */}
          <section className="section" id="research">
            <div className={`section-label ${pixel.className}`}>02 — RESEARCH</div>
            <h2 className={`section-title ${pixel.className}`}>
              Specify: From Insights to Design Direction
            </h2>

            <h3 className={`sub-heading ${pixel.className}`}>Two Personas, Two Entry Points</h3>
            <p>
              We created two personas representing our primary user segments — not just
              demographic profiles, but people with different relationships to fear and different
              practical needs when traveling.
            </p>

            <div className="persona-grid">
              <div className="persona-card">
                <div className={`persona-name ${pixel.className}`}>Rani, 21</div>
                <div className={`persona-role ${pixel.className}`}>College Student · Jatinangor</div>
                <div className="persona-pain">
                  <strong>Context:</strong> Often goes home late from campus activities, lives alone
                  in a boarding house, anxious about traveling solo at night.
                </div>
                <div className="persona-gain">
                  <strong>Pain:</strong> Not knowing which routes are safe, difficulty asking for
                  help quickly.
                </div>
                <div className="persona-gain">
                  <strong>Gain:</strong> Live location sharing, one-tap emergency button, community
                  safety reports.
                </div>
              </div>
              <div className="persona-card">
                <div className={`persona-name ${pixel.className}`}>Pak Doni, 35</div>
                <div className={`persona-role ${pixel.className}`}>Office Worker · Cimahi</div>
                <div className="persona-pain">
                  <strong>Context:</strong> Frequently works late or travels for business. Feels
                  unsafe walking from the bus stop home through dark areas.
                </div>
                <div className="persona-gain">
                  <strong>Pain:</strong> Poor lighting on routes home, uncertainty about where to
                  report suspicious activity.
                </div>
                <div className="persona-gain">
                  <strong>Gain:</strong> Panic button with live location to family, risk-analyzed
                  route navigation.
                </div>
              </div>
            </div>

            <Note>
              We chose personas that felt representative on the surface, but in hindsight they
              were both relatively similar in their core needs. We could've explored more edge
              cases — like someone with a disability navigating unsafe areas, or an elderly person
              unfamiliar with smartphone navigation. Designing for the extreme user often surfaces
              insights that benefit everyone.
            </Note>

            <ImageBlock
              src="/seluna/user-journey.png"
              label="User Journey — Rani"
              caption="anxiety → cautious curiosity → growing confidence → relief"
              className="wide-placeholder"
            />

            <h3 className={`sub-heading ${pixel.className}`}>Competitor Analysis</h3>
            <p>
              We analyzed three existing apps — Jagat, Google Maps, and Find My — to understand
              the current landscape. The gap was clear across all three: none of them addressed
              route safety as a primary metric. Jagat had strong social features but no safety
              routing. Google Maps had scale and accuracy but no danger zone data. Find My had
              real-time location tracking but was locked in Apple's ecosystem with no emergency
              features.
            </p>
            <p>
              Seluna's opportunity: be the first app that puts safety as the primary navigation
              metric, not a secondary filter.
            </p>

            <ImageBlock
              src="/seluna/competitor-analysis.png"
              label="Competitor Analysis"
              caption="Jagat · Google Maps · Find My — gap mapping"
              className="wide-placeholder"
            />

            <h3 className={`sub-heading ${pixel.className}`}>Urgent-Important Matrix & Feature Mapping</h3>
            <p>
              We used a prioritization matrix before designing anything. Urgent + Important:
              Safest Route, Location Sharing & Danger Alerts, Emergency Calls, Fake Call.
              Important but Not Urgent: Chatbot, IoT Integration, Community, Live Chat.
            </p>
            <p>
              Then we traced the line from root cause → sub-problem → feature for each:
            </p>

            <ImageBlock
              src="/seluna/urgent-important-matrix.png"
              label="Urgent-Important Matrix"
              caption="Prioritizing features based on urgency and importance"
              className="wide-placeholder"
            />

            <div className="features-list">
              {[
                { name: 'No safe route info', desc: '→ Safest Route feature' },
                { name: 'No companion while traveling alone', desc: '→ Fake Call + Chatbot (Lulu)' },
                { name: "Can't react fast in emergencies", desc: '→ SOS Button (always visible)' },
                { name: 'No community safety data', desc: '→ Community + Live Chat' },
              ].map((f) => (
                <div key={f.name} className="feature-item">
                  <span className={`feature-name ${pixel.className}`}>{f.name}</span>
                  <span className="feature-desc">{f.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 03 Crafting */}
          <section className="section" id="crafting">
            <div className={`section-label ${pixel.className}`}>03 — CRAFTING</div>
            <h2 className={`section-title ${pixel.className}`}>
              Design System: A Companion, Not a Warning Sign
            </h2>
            <p>
              We built Seluna's visual identity around Lulu — a friendly firefly mascot — to make
              the app feel approachable and warm, not clinical or fear-inducing. Safety apps can
              feel scary; we wanted Seluna to feel like a companion.
            </p>

            <div className="ds-grid">
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Typography</span>
                <span className="ds-val">
                  Lato Font. Clean, modern, highly legible at body sizes. Chosen for clarity in
                  high-stress moments when users need to read quickly.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Color Palette</span>
                <span className="ds-val">
                  Soft purples (#8690B4, #424962), warm pinks (#EC5865, #FF9898, #FDE3E3),
                  and bright teal (#00E1F4) for interactive elements. Light backgrounds
                  (#DCE3FF, #ECECEC) for breathing room. Max 4–5 active colors per screen.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Components</span>
                <span className="ds-val">
                  Navigation bar with SOS button always visible. Button hierarchy, selector
                  components for route options and emergency categories. Cognitive load was
                  the primary constraint on every component decision.
                </span>
              </div>
            </div>

            <Note>
              The decision to center our palette around pink and soft purple was made primarily
              for aesthetic reasons. But looking back, we didn't rigorously ask: does this color
              system communicate safety and urgency clearly to our actual target users? For someone
              in a genuinely dangerous situation, do those colors inspire confidence? Color in
              safety-critical apps should be chosen with function first, aesthetics second. This
              is something I carry forward into every design decision now.
            </Note>

            <ImageBlock
              src="/seluna/design-systems.png"
              label="Design System"
              caption="colors · typography · nav bar · buttons · selectors · Lulu mascot"
              className="wide-placeholder"
            />

            <h3 className={`sub-heading ${pixel.className}`}>Lo-Fi Wireframes</h3>
            <p>
              We started with lo-fi wireframes across all key screens: Sign Up & Login, Home,
              Safest Route, Community, Chatbot, SOS, Fake Calls, Leaderboard, Profile, Secondary
              Menu.
            </p>

            <Note>
              This is where things started to crack. We moved from lo-fi to hi-fi fairly quickly,
              and in doing so we carried forward some structural decisions that hadn't been fully
              validated. The architecture was already complex at the lo-fi stage — but because it
              looked manageable on paper, we didn't stop to question it. Lo-fi is the cheapest
              moment to be critical. We should've spent more time stress-testing the navigation
              structure before touching any visual design.
            </Note>

            <ImageBlock
              src="/seluna/lofi.png"
              label="Lo-Fi Wireframes"
              caption="home · safest route · SOS · community · fake call · profile"
              className="wide-placeholder"
            />

            <h3 className={`sub-heading ${pixel.className}`}>Hi-Fi Prototype</h3>
            <p>
              Key screens: Home (map + live friend locations + SOS button always visible), Safest
              Route (destination input → route options by safety level → active navigation),
              Chatbot — Lulu AI assistant, SOS Button (one-tap to 112, KPAI, damkar, closest
              friends, police), Community (local user reports + live chat), Fake Call
              (pre-scheduled callers + Lulu Shop for premium callers), Secondary Menu
              (Leaderboard, History, Settings), Profile.
            </p>

              <ImageBlock src="/seluna/hifi.png" label="Hi-Fi" caption="Figma screens: final visual implementation" />
          </section>

          {/* 04 Validation */}
          <section className="section" id="validation">
            <div className={`section-label ${pixel.className}`}>04 — VALIDATION</div>
            <h2 className={`section-title ${pixel.className}`}>
              Two Rounds of Testing. One Critical Redesign.
            </h2>
            <p>
              We ran two iterations of usability testing, each with 5 respondents. Methods used:
              NPS (Net Promoter Score), QPM (Quantitative Performance Measure), UEQ (User
              Experience Questionnaire), SEQ (Single Ease Question), and SUS (System Usability
              Scale).
            </p>

            <div className="card-grid">
              <div className="info-card accent-teal">
                <div className={`card-title ${pixel.className}`}>Iteration 1</div>
                <p>
                  NPS: 40% (above 30% benchmark). SEQ: 6.0 — barely above 5.5 benchmark.
                  SUS: 68.5 — right at the passing threshold. UEQ: most dimensions
                  Above Average, but Novelty dropped. QPM: Task 2 and Task 3 caused
                  friction (fake call, community navigation).
                </p>
              </div>
              <div className="info-card accent-teal">
                <div className={`card-title ${pixel.className}`}>Iteration 2</div>
                <p>
                  NPS: 40% — maintained. QPM: all 5 users completed all 5 tasks. SEQ: 6.8
                  — up from 6.0. SUS: 96 — a dramatic jump from 68.5. UEQ: all six
                  dimensions improved substantially across the board.
                </p>
              </div>
              <div className="info-card accent-teal">
                <div className={`card-title ${pixel.className}`}>Key Redesign</div>
                <p>
                  Fake Call feature rebuilt using the Law of Least Effort. Callers moved
                  to a horizontal strip. Lulu Shop introduced as a monetization layer.
                  Schedule functionality surfaced more prominently. One feature change →
                  SUS jumped 27.5 points.
                </p>
              </div>
            </div>

            <div className="image-grid">
              <ImageBlock src="/seluna/before.png" label="Before" caption="fake call: large grid, hidden schedule, unclear monetization" />
              <ImageBlock src="/seluna/after.png" label="After" caption="fake call: horizontal strip, Lulu Shop, prominent schedule" />
            </div>

            <Note>
              An SEQ of 6.0 and SUS of 68.5 passing "by the skin of our teeth" was a clear
              signal. The app worked — users could complete tasks — but it wasn't flowing the way
              a safety app needs to flow. In a real emergency situation, confusion is not
              acceptable. The feedback about "too many features" hit hard: we had been so excited
              about building everything that we forgot the user's cognitive load.
            </Note>

            <Note>
              The jump from SUS 68.5 to 96 is unusually large. Part of this is genuine
              improvement — we redesigned the fake call feature meaningfully. But smaller sample
              sizes (5 people per round) can produce volatile scores. The trend is real; the
              exact number should be taken with context. In future projects, I'd aim for at least
              8–10 participants per testing round for more stable results.
            </Note>

            <ImageBlock
              src='/seluna/testing.png'
              label="Testing Results"
              caption="SEQ · SUS · UEQ comparison: iteration 1 vs iteration 2"
              className="wide-placeholder"
            />
          </section>

          {/* 05 Output */}
          <section className="section" id="output">
            <div className={`section-label ${pixel.className}`}>05 — OUTPUT</div>
            <h2 className={`section-title ${pixel.className}`}>
              Navigate Safely. Travel Confidently.
            </h2>
            <p>
              The final prototype covers the complete journey from onboarding to safe arrival,
              with emergency support available at every step.
            </p>

            <ImageBlock
              src="/seluna/final-ui.png"
              label="Final UI"
              caption="home · safest route · SOS · fake call · community · chatbot"
              className="wide-placeholder"
            />

            <div className="features-list">
              {[
                {
                  name: 'Safest Route',
                  desc: 'Routes ranked by safety score using real-time data: street lighting levels, crowd density, and community reports. The core value proposition — choosing the safest path, not the fastest.',
                },
                {
                  name: 'SOS Button',
                  desc: 'Always visible in the navbar. One tap connects to 112, KPAI, damkar, closest friends, and police. Designed around the principle that in an emergency, the user should never have to think.',
                },
                {
                  name: 'Fake Call',
                  desc: 'Simulated incoming calls with schedulable timing and customizable callers. Provides psychological safety during travel — a low-tech solution for a deeply human fear of being alone and vulnerable.',
                },
                {
                  name: 'Chatbot (Lulu)',
                  desc: 'AI companion for route questions, FAQs, and situational guidance. Lulu is Seluna\'s firefly mascot — the visual representation of the app\'s core promise: you\'re not traveling alone.',
                },
                {
                  name: 'Community & Live Chat',
                  desc: 'Geo-based community for sharing real-time safety reports with nearby users. Turns individual fear into collective knowledge — the people around you become a safety network.',
                },
                {
                  name: 'Leaderboard',
                  desc: 'Gamification layer to incentivize users to contribute safety reports. Rewards engagement rather than just passive consumption.',
                },
                {
                  name: 'Live Friend Tracking',
                  desc: 'See where your friends are in real-time on the home map. Addresses the most common coping mechanism we found in research: staying on the phone with a friend.',
                },
              ].map((f) => (
                <div key={f.name} className="feature-item">
                  <span className={`feature-name ${pixel.className}`}>{f.name}</span>
                  <span className="feature-desc">{f.desc}</span>
                </div>
              ))}
            </div>

            <h3 className={`sub-heading ${pixel.className}`}>Competition Score Breakdown</h3>
            <div className="score-table">
              {[
                { criterion: 'Identifikasi Permasalahan dan Relevansi', score: '15.63', max: '25' },
                { criterion: 'Inovasi dan Orisinalitas', score: '12.50', max: '25' },
                { criterion: 'Metode Desain', score: '17.14', max: '20' },
                { criterion: 'Kelengkapan Sistematika dan Komunikasi', score: '20.00', max: '30' },
                { criterion: 'TOTAL', score: '65.30', max: '100' },
              ].map((row, i) => (
                <div key={row.criterion} className={`score-row ${i === 4 ? 'score-total' : ''}`}>
                  <span className="score-criterion">{row.criterion}</span>
                  <span className={`score-val ${pixel.className}`}>{row.score} / {row.max}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 06 Reflection */}
          <section className="section reflection-section" id="reflection">
            <div className={`section-label ${pixel.className}`}>06 — REFLECTION</div>
            <h2 className={`section-title ${pixel.className}`}>
              What Losing Taught Me More Than Winning Could
            </h2>
            <p>
              We didn't advance past the qualifying round. Total score: 65.30. And honestly —
              reading the judges' feedback, I understood why.
            </p>
            <div className="callout warning">
              "Explore lebih lanjut tentang design system yang baik untuk memastikan konsistensi
              elemen-elemen desain di seluruh aplikasi." — "Fokuskan desain interaksi pada
              pengalaman pengguna, bukan hanya fungsionalitas."
            </div>
            <div className="reflection-grid">
              {[
                {
                  title: 'We were too focused on design, not testing',
                  body: 'Usability testing was treated as a final validation step rather than an iterative tool. If we had tested earlier — even rough lo-fi — we would\'ve caught structural problems before they were baked into 30+ hi-fi screens.',
                },
                {
                  title: 'We jumped from ideation to creation too fast',
                  body: 'Features kept getting added after ideation was "done" — Lulu Shop, the leaderboard, secondary menu items. Each addition made sense in isolation. Collectively, they created a product that was overwhelming to navigate.',
                },
                {
                  title: 'The navigation was too complex',
                  body: 'The information architecture had too many layers. A user in a moment of stress shouldn\'t have to remember where the fake call feature lives. Safety apps need to be boringly simple to navigate.',
                },
                {
                  title: 'We didn\'t standardize our icons',
                  body: 'Different screens used different visual languages for similar functions. Users got confused because the visual cues were inconsistent. A basic design system principle we overlooked because we were excited about the aesthetics.',
                },
                {
                  title: 'Color and imagery were aesthetic, not purposeful',
                  body: 'We chose pinks and purples because we liked them. We didn\'t ask: does this palette communicate safety and trust to a 35-year-old man walking home in Cimahi? Does it communicate urgency clearly for a woman in a dangerous situation?',
                },
                {
                  title: 'We didn\'t document our process properly',
                  body: 'No consistent log of why we made each design decision. By the time we were writing the proposal, some reasoning lived only in our heads. If I had kept a design journal, the documentation would\'ve been sharper and the reflection easier.',
                },
              ].map((r) => (
                <div key={r.title} className="reflection-item">
                  <div className={`r-title ${pixel.className}`}>{r.title}</div>
                  <p>{r.body}</p>
                </div>
              ))}
            </div>
            <div className="callout" style={{ marginTop: '32px' }}>
              Seluna was a safe navigation app. In iteration 2, users gave it a 96 SUS score.
              The judges gave us 65.30. Both numbers taught me something different — and I needed
              both. This was my first competition. I came in excited about building something that
              looked great. I left understanding that great design isn't about how something looks
              — it's about how it works for the person who needs it most, in the moment they
              need it most.
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
          --red:       #EC5865 ;
          --red-light: #FDE3E3 ;
          --teal:      #00838f;
          --teal-light:#e0f7fa;
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

        .tab:hover    { background: #c0bdb4; }
        .active-tab   { background: #fff; border-color: #777 #fff #fff #777; }
        .start-tab    { min-width: 54px; font-style: normal; font-weight: 600; }
        .plus-tab     { min-width: 42px; font-size: 16px; padding-bottom: 2px; }

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
          color: var(--red);
          text-decoration: none;
        }
        .back-link a:hover { text-decoration: underline; }

        .project-num {
          font-family: var(--font-ui);
          font-size: 12px;
          font-style: italic;
          color: var(--red);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 52px;
          align-items: end;
        }

        .hero-kicker {
          color: var(--red);
          font-size: 8px;
          margin-bottom: 18px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hero-title {
          font-size: clamp(36px, 6vw, 80px);
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
          border-color: var(--red);
          color: var(--red);
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
          margin-bottom: 0;
          box-shadow: var(--shadow-lg);
        }

        .ov-item {
          padding: 24px 20px;
          border-right: var(--border);
        }
        .ov-item:last-child { border-right: none; }

        .ov-label {
          font-size: 7.5px;
          color: var(--red);
          margin-bottom: 10px;
        }

        .ov-val {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          line-height: 1.6;
          color: var(--ink);
        }

        /* ── Navbar ── */
        .case-navbar {
          position: sticky;
          top: 34px;
          z-index: 120;
          margin: 0 -72px 56px;
          padding: 32px 72px 0px 72px;
          display: flex;
          gap: 0;
          background: var(--bg);
          border-bottom: 3px solid var(--red);
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
          color: var(--red);
          border-bottom-color: var(--red);
        }

        /* ── Body grid ── */
        .body-grid {
          display: flex;
          flex-direction: column;
          gap: 80px;
        }

        .section { scroll-margin-top: 135px; }
        .hero     { scroll-margin-top: 135px; }

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
          color: var(--red);
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
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .image-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 32px;
          text-align: center;
          width: 100%;
          height: 100%;
          min-height: inherit;
          background:
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 8px,
              rgba(155,17,30,0.04) 8px,
              rgba(155,17,30,0.04) 16px
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

        .image-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 28px 0;
        }

        /* ── Stat row ── */
        .stat-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin: 28px 0;
        }

        .stat-card {
          background: var(--surface);
          border: var(--border);
          box-shadow: var(--shadow);
          padding: 22px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
        }

        .stat-val {
          font-size: clamp(18px, 3vw, 32px);
          color: var(--red);
          letter-spacing: -1px;
          line-height: 1;
        }

        .stat-desc {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          color: #444;
          line-height: 1.6;
        }

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

        .info-card.accent       { border-color: var(--red); }
        .info-card.accent-teal  { border-color: var(--teal); }

        .card-title {
          font-size: 8px;
          color: var(--red);
          margin-bottom: 4px;
        }

        .info-card.accent-teal .card-title { color: var(--teal); }

        .info-card p { font-size: 11px; margin-bottom: 0; }

        /* ── Personas ── */
        .persona-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
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
          color: var(--red);
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

        /* ── Design system grid ── */
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
          color: var(--red);
          min-width: 110px;
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
          color: var(--red);
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

        /* ── Score table ── */
        .score-table {
          display: flex;
          flex-direction: column;
          border: var(--border);
          background: var(--surface);
          box-shadow: var(--shadow);
          margin-top: 20px;
        }

        .score-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 22px;
          border-bottom: var(--border);
          gap: 16px;
        }
        .score-row:last-child { border-bottom: none; }

        .score-total {
          background: var(--red-light);
          border-top: 2px solid var(--red);
        }

        .score-criterion {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          color: #222;
          line-height: 1.5;
        }

        .score-val {
          font-size: 9px;
          color: var(--red);
          white-space: nowrap;
          flex-shrink: 0;
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
          background: var(--red-light);
          border-color: var(--red);
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
          margin: 20px 0;
        }

        .note-icon {
          font-size: 7.5px;
          font-family: var(--font-body);
          font-weight: 700;
          letter-spacing: 1px;
          color: #9a7c00;
          text-transform: uppercase;
        }

        /* ── Reflection ── */
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
          color: var(--red);
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

        .more-card span {
          font-size: 8px;
          color: var(--red);
        }

        .more-card strong {
          display: block;
          font-size: clamp(16px, 2vw, 22px);
          line-height: 1.2;
          font-weight: 400;
          letter-spacing: -1px;
        }

        .more-card p {
          font-size: 11px;
          color: #444;
          margin-bottom: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .page-wrap { padding: 40px 32px 90px; }

          .case-navbar {
            margin-left: -32px;
            margin-right: -32px;
          }

          .hero-grid,
          .section-layout { grid-template-columns: 1fr; }

          .overview-strip  { grid-template-columns: 1fr 1fr; }

          .card-grid,
          .stat-row,
          .persona-grid,
          .reflection-grid,
          .more-grid { grid-template-columns: 1fr; }

          .image-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .page-wrap { padding: 24px 16px 72px; }

          .tab-clock  { display: none; }
          .tab        { min-width: auto; padding: 0 8px; font-size: 9px; }
          .hero-title { letter-spacing: -1.5px; }

          .overview-strip  { grid-template-columns: 1fr; }

          .ov-item {
            border-right: none;
            border-bottom: var(--border);
          }
          .ov-item:last-child { border-bottom: none; }

          .ds-item,
          .feature-item,
          .score-row { flex-direction: column; gap: 6px; }

          .feature-name { min-width: unset; }

          .case-navbar {
            top: 34px;
            overflow-x: auto;
            flex-wrap: nowrap;
          }

          .reflection-section { padding: 24px 20px; }
        }
      `}</style>
    </main>
  )
}