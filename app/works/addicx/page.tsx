'use client'

import { Press_Start_2P } from 'next/font/google'
import { useEffect, useState, type ReactNode } from 'react'

const pixel = Press_Start_2P({ weight: '400', subsets: ['latin'] })

const moreWorks = [
  { title: 'Zichara', type: 'AR Game', role: 'Project Manager + QA', href: '/works/zichara' },
  { title: 'Naratrad', type: 'Website', role: 'Backend Engineer', href: '/works/naratrad' },
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

export default function AddicXCaseStudy() {
  useEffect(() => {
    const sections = ['overview','background','discovery','research','crafting','validation','output','reflection']

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
            <span className="project-num">02 / 06</span>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <div className={`hero-kicker ${pixel.className}`}>GEMASTIK XVIII · UI/UX Division</div>
              <h1 className={`hero-title ${pixel.className}`}>AddicX</h1>
              <p className="hero-sub">Addiction Recovery App for Indonesian Youth</p>
              <p className="hero-desc">
                AddicX helps Indonesian youth break free from online gambling and smoking —
                through gamification, AI mentorship, and a stigma-free community. Built for
                GEMASTIK XVIII, Indonesia&apos;s most prestigious national ICT competition.
              </p>
              <div className="hero-tags">
                {['Figma', 'UX Research', 'Prototyping', 'Usability Testing'].map((t) => (
                  <span key={t} className={pixel.className}>{t}</span>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <ImageBlock
                src="/images/cover-page/addicx.png"
                label="AddicX"
                caption="main project preview"
                className="hero-image"
              />
            </div>
          </div>
        </header>

        {/* ── Overview strip ── */}
        <section className="overview-strip" aria-label="Project overview">
          {[
            { label: 'ROLE', val: 'UI/UX Designer\n(Research · Ideation · Prototyping)' },
            { label: 'DURATION', val: '1 Month' },
            { label: 'TEAM', val: 'Clarisya Adeline\nMartha Meslina Florencia\nAmmara Azwadiena' },
            { label: 'TOOLS', val: 'Figma · FigJam · Notion' },
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
                  National Competition. Blank Canvas.
                </h2>
                <p>
                  GEMASTIK — Pagelaran Mahasiswa Nasional Bidang Teknologi Informasi dan Komunikasi —
                  is the most prestigious national-level ICT competition for university students in
                  Indonesia, held by the Ministry of Education. I joined the UI/UX division (Division VI)
                  with a team of three, with a completely open brief: design a mobile application that
                  answers a real societal problem using information technology.
                </p>
                <p>
                  Three constraints were non-negotiable: the idea must be original (no reusing previous
                  entries), technically feasible, and aligned with the national theme of Kemandirian Bangsa.
                  Within those constraints, we were free to define both the problem and the solution.
                </p>
                <p>
                  We landed on addiction. Specifically, the two addictions quietly damaging Indonesian
                  teenagers&apos; futures: online gambling and smoking. Nearly 9 million Indonesians are
                  involved in online gambling, with 26% under 30. There are 70 million active smokers,
                  with teens making up the majority. We see this in our own circles — friends who want to
                  stop, but don&apos;t know how. Especially when professional treatment feels out of reach.
                </p>
                <p>
                  That reasoning became the foundation for AddicX: not just an app, but a recovery
                  companion that meets users where they actually are.
                </p>
              </div>
              <Note>
                The competition brief gave us total freedom, which was harder than a constrained prompt.
                Landing on addiction as the problem space was a personal decision as much as a strategic
                one — we saw the problem in our own circles, and that gave us a real reason to care about
                getting it right.
              </Note>
            </div>
          </section>

          {/* 01 Discovery */}
          <section className="section" id="discovery">
            <div className={`section-label ${pixel.className}`}>01 — DISCOVERY</div>
            <h2 className={`section-title ${pixel.className}`}>
              4C: Collect, Choose, Create, Commit
            </h2>
            <p>
              With a blank canvas, we needed a framework to think divergently before converging on a
              direction. We used the 4C framework — Collect insights first, Choose and cluster them,
              Create a direction, then Commit to what we were building.
            </p>

            <ImageBlock
              src="/addicx/4c-framework.png"
              label="4C Framework"
              caption="collect · choose · create · commit — ideation structure"
              className="wide-placeholder"
            />

            <h3 className={`sub-heading ${pixel.className}`}>Collect — Desk Research + Survey + Interview</h3>
            <p>
              We dove deep into existing data — reading reports from PPATK, Kemenkes, and SKI 2023
              to understand the scale of the problem. We then sent out an online survey to 100
              respondents aged 17–25 who had experienced addiction. The results were stark: 100% of
              respondents had failed at least once in their attempt to quit.
            </p>

            <ImageBlock
              src="/addicx/survey.png"
              label="Survey Results"
              caption="100 respondents aged 17–25 — key data visualizations"
              className="wide-placeholder"
            />

            <Note>
              Looking back, we jumped into research somewhat underprepared. We hadn&apos;t fully done our
              desk research before designing interview questions, which meant some questions weren&apos;t
              as sharp as they could&apos;ve been. Next time: solidify secondary research before talking to users.
            </Note>

            <h3 className={`sub-heading ${pixel.className}`}>Choose & Create — From Many Ideas to One Direction</h3>
            <p>
              After collecting data, we clustered insights into four main directions: social and mental
              support, gamification for motivation, overcoming stigma, and blocking triggers. We landed on
              an approach that combined all four — an ecosystem that tackled the problem from multiple
              angles simultaneously.
            </p>

            <ImageBlock
              src="/addicx/affinity-map.png"
              label="Affinity Diagram"
              caption="clustering from ideation sessions → converged direction"
              className="wide-placeholder"
            />

            <div className="challenge-block">
              <p style={{ marginBottom: 0 }}>
                <strong>Problem encountered:</strong> GEMASTIK has strict rules around originality.
                Mid-ideation, we had to revisit whether our core concept overlapped with previous entries.
                We consulted our advisor and did a deeper dive into what specifically differentiated our
                approach — combining AI, AR, IoT, and a community platform in a single recovery app,
                with this level of user-centeredness, hadn&apos;t been done before. We moved forward with confidence.
              </p>
            </div>

            <Note>
              This was honestly one of the scariest moments of the project. The idea of starting over
              mid-competition felt overwhelming. Looking back, questioning ourselves actually made the
              final concept stronger — it forced us to articulate why AddicX was different, not just assume it was.
            </Note>
          </section>

          {/* 02 Research */}
          <section className="section" id="research">
            <div className={`section-label ${pixel.className}`}>02 — RESEARCH</div>
            <h2 className={`section-title ${pixel.className}`}>
              Three Personas. One Underlying Need.
            </h2>
            <p>
              Before designing anything, we conducted 9 in-depth user interviews across different
              backgrounds — students, fresh graduates, workers, and former addicts. What struck us most
              wasn&apos;t the addiction itself — it was the shame around it. People knew they had a problem.
              They just didn&apos;t know where to go that wouldn&apos;t judge them.
            </p>

            <div className="quote-block">
              <blockquote>
                &ldquo;Ngerokok itu bukan cuma candu, tapi bagian dari identitas dan lingkungan. Gue butuh
                tempat buat lepasin stress yang lainnya.&rdquo;
              </blockquote>
              <cite>— Ardi, 23</cite>
              <blockquote style={{ marginTop: 16 }}>
                &ldquo;Awalnya iseng main slot karena gabut. Lama-lama jadi ngga bisa berhenti karena
                uangnya stuck di sana.&rdquo;
              </blockquote>
              <cite>— Keean, 20</cite>
            </div>

            <p>
              We synthesized interviews into an Empathy Map. One recurring pattern was clear: users
              weren&apos;t lacking willpower — they were lacking infrastructure. No progress tracking, no
              judgment-free support, no accessible alternatives when cravings hit.
            </p>

            <ImageBlock
            src="/addicx/empathy-map.png"
              label="Empathy Map"
              caption="synthesized from 9 in-depth user interviews"
              className="wide-placeholder"
            />

            <h3 className={`sub-heading ${pixel.className}`}>Define: Translating Insights into Problem Framing</h3>

            <div className="persona-grid">
              <div className="persona-card">
                <div className={`persona-name ${pixel.className}`}>Adit, 17</div>
                <div className={`persona-role ${pixel.className}`}>Student · Online Gambling</div>
                <div className="persona-pain">
                  <strong>Context:</strong> Hides his gambling from family. Started as entertainment,
                  now can&apos;t stop because money is always &ldquo;stuck&rdquo; in the system.
                </div>
                <div className="persona-gain">
                  <strong>Need:</strong> A judgment-free space to start over without confessing to
                  anyone — anonymity before accountability.
                </div>
              </div>
              <div className="persona-card">
                <div className={`persona-name ${pixel.className}`}>Karin, 20</div>
                <div className={`persona-role ${pixel.className}`}>College Student · Vaping</div>
                <div className="persona-pain">
                  <strong>Context:</strong> Has been vaping since high school. Relapses when stressed.
                  Knows it&apos;s bad but the social context makes it nearly impossible to quit.
                </div>
                <div className="persona-gain">
                  <strong>Need:</strong> Practical alternatives when cravings hit, not lectures.
                  Something that redirects, not shames.
                </div>
              </div>
              <div className="persona-card" style={{ gridColumn: '1 / -1' }}>
                <div className={`persona-name ${pixel.className}`}>Budi, 28</div>
                <div className={`persona-role ${pixel.className}`}>Freelancer · Double Addiction</div>
                <div className="persona-pain">
                  <strong>Context:</strong> Battling both gambling and smoking. Wants to recover for
                  his family. Has tried and failed multiple times — not from lack of will, but lack of a system.
                </div>
                <div className="persona-gain">
                  <strong>Need:</strong> A structured recovery journey with visible progress that
                  makes each small win feel real and worth protecting.
                </div>
              </div>
            </div>

            <div className="callout">
              Three personas with different triggers, different shame profiles, different support needs —
              but the same core gap: no infrastructure for recovery that meets them where they actually are.
              Users aren&apos;t lacking willpower. They&apos;re lacking environment.
            </div>

            <ImageBlock
              src="/addicx/user-journey.png"
              label="User Journey Map"
              caption="Budi's journey: awareness → onboarding → action → advocacy"
              className="wide-placeholder"
            />

            <Note>
              Building three personas for one product felt like a lot. But each represented a genuinely
              different relationship with addiction. Keeping all three helped us avoid designing only for
              the &ldquo;easy&rdquo; user.
            </Note>
          </section>

          {/* 03 Crafting */}
          <section className="section" id="crafting">
            <div className={`section-label ${pixel.className}`}>03 — CRAFTING</div>
            <h2 className={`section-title ${pixel.className}`}>
              Every Design Decision Has a Reason
            </h2>
            <p>
              The core design principle was <em>empathy first, aesthetics second</em> — every visual
              and interaction choice was filtered through what it feels like to use this app during a
              vulnerable moment.
            </p>

            <h3 className={`sub-heading ${pixel.className}`}>Ideation: How Might We</h3>

            <div className="card-grid">
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>HMW 01</div>
                <p>
                  How might we guide users through their first steps of recovery in a simple and
                  motivating way? → Onboarding flow + personalized recovery plan + daily missions.
                </p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>HMW 02</div>
                <p>
                  How might we provide a safe and anonymous environment for recovery without social
                  pressure? → Segmented community forum + anonymous entry + stigma-free language.
                </p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>HMW 03</div>
                <p>
                  How might we keep users engaged and motivated throughout their recovery journey?
                  → Streak system, XP, badges, leveling, and milestone celebrations.
                </p>
              </div>
            </div>

            <Note>
              The MoSCoW process was harder than it looked. Features we genuinely believed in —
              like the AR game for behavioral redirection — ended up in &ldquo;Won&apos;t Have Yet&rdquo; simply
              because of time constraints. A good lesson in shipping something complete rather than
              something ambitious but half-baked.
            </Note>

            <h3 className={`sub-heading ${pixel.className}`}>Design System: Why Purple, Why Montserrat?</h3>
            <div className="ds-grid">
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Purple #320C74</span>
                <span className="ds-val">
                  Purple sits between red (urgency) and blue (calm). We wanted AddicX to feel
                  motivating without being alarming, supportive without being cold. Every color
                  decision was run through a contrast checker for accessibility.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Montserrat</span>
                <span className="ds-val">
                  Geometric, high contrast, readable at small sizes. No italics to keep it sharp
                  on screen. Chosen because clinical apps often use ultra-light typefaces that feel cold.
                  Montserrat at medium weight feels grounded and confident — not sterile.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Color Constraint</span>
                <span className="ds-val">
                  Maximum 4–5 active colors per screen. Users of AddicX are often in vulnerable moments.
                  Visual noise compounds stress. Restraint is care.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Spacing: 8–40px</span>
                <span className="ds-val">
                  Room to breathe. Dense layouts that feel fine in casual apps become overwhelming
                  when the user&apos;s emotional state is already under pressure. Space is intentional.
                </span>
              </div>
            </div>

            <ImageBlock
             src="/addicx/design-system.png"
              label="Design System"
              caption="typography · color palette · component library"
              className="wide-placeholder"
            />

            <h3 className={`sub-heading ${pixel.className}`}>Lo-Fi to Hi-Fi</h3>
            <p>
              We started with wireframes to focus on structure and flow before touching any visuals.
              Architecture decisions had to be resolved first — how does onboarding personalize the
              recovery plan? Where does the AI mentor live? Those questions were cheapest to answer
              at the wireframe stage.
            </p>

            <div className="image-grid">
              <ImageBlock src="/addicx/lofi.png" label="Lo-Fi" caption="wireframes: user flow and screen architecture" />
              <ImageBlock src="/addicx/hifi.png" label="Hi-Fi" caption="Figma screens: final visual implementation" />
            </div>

            <Note>
              Moving from lo-fi to hi-fi exposed flow decisions that looked fine as wireframes but felt off
              once we added real content. The home screen became overwhelming with everything we&apos;d planned.
              The cheapest moment to be critical is before you&apos;ve invested in polish.
            </Note>
          </section>

          {/* 04 Validation */}
          <section className="section" id="validation">
            <div className={`section-label ${pixel.className}`}>04 — VALIDATION</div>
            <h2 className={`section-title ${pixel.className}`}>
              Three Rounds of Iteration, Real Evidence Each Time
            </h2>
            <p>
              We ran two rounds of usability testing: Heuristic Evaluation and formal Usability Testing
              using SEQ (Single Ease Question) and SUS (System Usability Scale). Target users: Indonesian
              youth aged 17–25 who had experienced or were currently experiencing addiction.
            </p>

            <div className="card-grid">
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Heuristic Eval</div>
                <p>
                  Most usability aspects were solid. The gap: onboarding questions weren&apos;t deep enough
                  to accurately capture addiction profile, risking inaccurate goal-setting downstream.
                  Fixed in Iteration 1→2.
                </p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>SEQ Results</div>
                <p>
                  8 task scenarios, scale 1–7. Average score: 6.3, above the 5.5 benchmark. Two scenarios
                  flagged: Mentor AI interaction (5.6) and completing a game (5.4). Both addressed in next iteration.
                </p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>SUS Score</div>
                <p>
                  76 after the third iteration — clearing the 68 benchmark and indicating good usability.
                  Three full rounds of design changes before landing on something we were proud of.
                </p>
              </div>
            </div>

            <ImageBlock
            src="/addicx/testing.png"
              label="Testing Results"
              caption="SEQ bar chart · SUS score table · heuristic evaluation summary"
              className="wide-placeholder"
            />

            <div className="features-list">
              {[
                {
                  name: 'Iteration 1 → 2',
                  desc: 'Deepened onboarding. Added targeted follow-up questions and restructured the flow so logic felt natural, not like a form. Fixed the accuracy gap in recovery plan personalization.',
                },
                {
                  name: 'Iteration 2 → 3',
                  desc: "Simplified the home screen. Stripped back quick access, simplified the navbar from 5 to 4 items, cleaned up progress bar hierarchy. Less visual noise for someone in a vulnerable moment.",
                },
                {
                  name: 'Light Mode + Navbar',
                  desc: "Added light mode — because not everyone uses dark mode, and inclusivity matters. The navbar was also simplified; removed an icon that was causing confusion about its function.",
                },
              ].map((f) => (
                <div key={f.name} className="feature-item">
                  <span className={`feature-name ${pixel.className}`}>{f.name}</span>
                  <span className="feature-desc">{f.desc}</span>
                </div>
              ))}
            </div>

            <Note>
              Running usability testing on addiction recovery meant some participants shared genuinely
              personal experiences. We should&apos;ve had a brief debrief at the end of each session — not just
              for data quality, but out of respect for what they shared.
            </Note>
          </section>

          {/* 05 Output */}
          <section className="section" id="output">
            <div className={`section-label ${pixel.className}`}>05 — OUTPUT</div>
            <h2 className={`section-title ${pixel.className}`}>
              A Recovery Companion That Meets You Where You Are
            </h2>
            <p>
              The final prototype covers the full user journey — from first download to 100 days of
              recovery. Every feature below exists for a reason.
            </p>

            <ImageBlock
              src="/addicx/final-ui.png"
              label="Final UI"
              caption="splash · onboarding · home · mentor · community · progress · game · diary"
              className="wide-placeholder"
            />

            <div className="features-list">
              {[
                {
                  name: 'AI Mentor',
                  desc: "A non-judgmental chatbot available 24/7, trained to respond with empathy, not pressure. Available the moment a craving hits, at 3am, without an appointment.",
                },
                {
                  name: 'Mentor Xpert',
                  desc: "Access to verified counselors for deeper sessions. A step up that doesn't require abandoning the app.",
                },
                {
                  name: 'Progress Tracker',
                  desc: 'Visual daily and weekly progress with milestone celebrations. Makes small wins visible and worth protecting, even on hard days.',
                },
                {
                  name: 'Community Forum',
                  desc: "Segmented by addiction type and interest. Anonymous entry lowers the barrier to joining. Judgment-free language enforced at the design level — not just the policy level.",
                },
                {
                  name: 'Gamification',
                  desc: "Streak system, XP points, badges, and leveling. Recovery needs to compete with the dopamine loop of addiction itself — gamification isn't decoration, it's the counter-mechanism.",
                },
                {
                  name: 'Alert Mode',
                  desc: "IoT-powered detection that blocks addictive triggers and redirects behavior in the moment. Highest-impact feature for users who identified environmental cues as their primary relapse trigger.",
                },
                {
                  name: 'Diary',
                  desc: 'A private space to process emotions and document the recovery journey. No AI reading it, no social visibility. Just a place to put things down.',
                },
              ].map((f) => (
                <div key={f.name} className="feature-item">
                  <span className={`feature-name ${pixel.className}`}>{f.name}</span>
                  <span className="feature-desc">{f.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 06 Reflection */}
          <section className="section reflection-section" id="reflection">
            <div className={`section-label ${pixel.className}`}>06 — REFLECTION</div>
            <h2 className={`section-title ${pixel.className}`}>
              What This Project Taught Me
            </h2>
            <p>
              This was the first time I worked on a project that wasn&apos;t just about making something look
              good — it was about making something that could genuinely change someone&apos;s trajectory. That
              weight pushed us to be more thorough, more honest with ourselves about what we knew and didn&apos;t know.
            </p>
            <div className="reflection-grid">
              {[
                {
                  title: 'Research preparation matters',
                  body: "We went into our first user interviews underprepared — questions weren't sharp enough, some sessions weren't documented properly. More structure upfront would've saved a lot of synthesis pain. Secondary research first. Then users.",
                },
                {
                  title: "Iteration isn't a sign of failure",
                  body: "Three rounds of design changes before landing on something we were proud of felt slow in the moment. But each iteration had a real reason — a user insight, a test result, an honest critique. That's the process working as it should.",
                },
                {
                  title: 'Design for the emotional context',
                  body: "Users of AddicX aren't browsing casually — they're often in their most vulnerable moments. Every decision, from color choices to the wording of a button, had to be filtered through that lens. It made me a more empathetic designer.",
                },
                {
                  title: 'Wearing many hats is uncomfortable and educational',
                  body: "With no dedicated researcher, we all had to step into roles we weren't fully trained for. That discomfort was also the most educational part of the whole project.",
                },
                {
                  title: 'Document the why as you go',
                  body: "Some of the reasoning behind design decisions ended up only in our heads, not on paper. Writing this case study was harder than it needed to be because of that. Document while it's fresh.",
                },
                {
                  title: "We didn't win. But we built something real.",
                  body: "GEMASTIK was deeply competitive. We didn't win. But we built something we're genuinely proud of — and learned more from this project than any class could've taught us.",
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
          --bg:        #f4efe4;
          --surface:   #ffffff;
          --ink:       #171717;
          --ink-muted: #555555;
          --accent:    #320C74;
          --accent-mid:#503682;
          --accent-light: #ede8f7;
          --yellow:    #fff6a5;
          --dot-size:  18px;
          --shadow:    5px 5px 0 var(--ink);
          --shadow-lg: 6px 6px 0 var(--ink);
          --border:    2px solid var(--ink);
          --font-body: 'Courier New', 'Courier', monospace;
          --font-ui:   'Segoe UI', system-ui, sans-serif;
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

        .page-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 56px 72px 120px;
        }

        /* ── Hero ── */
        .hero { padding-bottom: 52px; border-bottom: var(--border); margin-bottom: 0; }

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
          color: var(--accent);
          text-decoration: none;
        }
        .back-link a:hover { text-decoration: underline; }

        .project-num {
          font-family: var(--font-ui);
          font-size: 12px;
          font-style: italic;
          color: var(--accent);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 52px;
          align-items: end;
        }

        .hero-kicker {
          color: var(--accent);
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

        .hero-tags { display: flex; flex-wrap: wrap; gap: 10px; }

        .hero-tags span {
          background: var(--surface);
          border: var(--border);
          border-color: var(--accent);
          color: var(--accent);
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

        .ov-item { padding: 24px 20px; border-right: var(--border); }
        .ov-item:last-child { border-right: none; }
        .ov-label { font-size: 7.5px; color: var(--accent); margin-bottom: 10px; }
        .ov-val { font-family: var(--font-body); font-size: 11px; font-weight: 700; line-height: 1.6; }

        /* ── Sticky nav ── */
        .case-navbar {
          position: sticky;
          top: 34px;
          z-index: 120;
          margin: 0 -72px 56px;
          padding: 32px 72px 0 72px;
          display: flex;
          background: var(--bg);
          border-bottom: 3px solid var(--accent);
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
        .case-navbar a.active { opacity: 1; color: var(--accent); border-bottom-color: var(--accent); }

        /* ── Body ── */
        .body-grid { display: flex; flex-direction: column; gap: 80px; }
        .section { scroll-margin-top: 135px; }
        .hero    { scroll-margin-top: 135px; }

        .section-layout {
          display: grid;
          grid-template-columns: 1fr 260px;
          gap: 32px;
          align-items: start;
          margin-top: 24px;
        }

        .section-label { display: block; font-size: 7.5px; color: var(--accent); margin-bottom: 18px; letter-spacing: 0.5px; }

        .section-title {
          font-size: clamp(14px, 2vw, 22px);
          color: var(--ink);
          margin-bottom: 24px;
          line-height: 1.4;
          letter-spacing: -0.5px;
          font-weight: 400;
        }

        .sub-heading { font-size: 9.5px; color: var(--ink); margin: 36px 0 16px; font-weight: 400; }

        /* ── Quote block ── */
        .quote-block {
          border-left: 3px solid var(--accent);
          background: var(--accent-light);
          padding: 18px 22px;
          margin: 24px 0;
        }

        .quote-block blockquote {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          line-height: 1.8;
          color: #1a0a3a;
          font-style: italic;
        }

        .quote-block cite {
          display: block;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 700;
          color: var(--accent);
          margin-top: 6px;
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

        .image-block img { width: 100%; height: 100%; object-fit: cover; display: block; }

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
              rgba(50,12,116,0.04) 8px,
              rgba(50,12,116,0.04) 16px
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

        .image-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 28px 0; }

        /* ── Cards ── */
        .card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin: 28px 0; }

        .info-card {
          background: var(--surface);
          border: var(--border);
          box-shadow: var(--shadow);
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .info-card.accent { border-color: var(--accent); }
        .card-title { font-size: 8px; color: var(--accent); margin-bottom: 4px; }
        .info-card p { font-size: 11px; margin-bottom: 0; }

        /* ── Personas ── */
        .persona-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin: 28px 0; }

        .persona-card {
          background: var(--surface);
          border: var(--border);
          box-shadow: var(--shadow);
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .persona-name { font-size: 14px; letter-spacing: -1px; }
        .persona-role { font-size: 7.5px; color: var(--accent); margin-bottom: 4px; }
        .persona-pain, .persona-gain { font-family: var(--font-body); font-size: 11px; font-weight: 700; line-height: 1.7; }

        /* ── Design system ── */
        .ds-grid { display: flex; flex-direction: column; border: var(--border); background: var(--surface); box-shadow: var(--shadow); margin: 20px 0; }

        .ds-item { display: flex; gap: 24px; padding: 16px 20px; border-bottom: var(--border); }
        .ds-item:last-child { border-bottom: none; }
        .ds-key { font-size: 8px; color: var(--accent); min-width: 110px; flex-shrink: 0; padding-top: 2px; }
        .ds-val { font-family: var(--font-body); font-size: 11.5px; font-weight: 700; line-height: 1.7; }

        /* ── Callout / Note ── */
        .callout {
          background: var(--yellow);
          border: var(--border);
          box-shadow: var(--shadow);
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 11.5px;
          line-height: 1.8;
          padding: 18px 22px;
          margin: 28px 0;
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

        .note-icon { font-size: 7.5px; font-family: var(--font-body); font-weight: 700; letter-spacing: 1px; color: #9a7c00; text-transform: uppercase; }

        /* ── Challenge block ── */
        .challenge-block {
          background: var(--surface);
          border: var(--border);
          box-shadow: var(--shadow);
          padding: 28px;
          margin: 28px 0;
        }

        /* ── Features list ── */
        .features-list { display: flex; flex-direction: column; margin-top: 28px; margin-botton: 28px; border: var(--border); box-shadow: var(--shadow); background: var(--surface); }

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
        .more-card:hover { transform: translate(3px, 3px); box-shadow: 3px 3px 0 var(--ink); }
        .more-card span  { font-size: 8px; color: var(--accent); }
        .more-card strong { display: block; font-size: clamp(16px, 2vw, 22px); line-height: 1.2; font-weight: 400; letter-spacing: -1px; }
        .more-card p { font-size: 11px; color: #444; margin-bottom: 0; }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .page-wrap { padding: 40px 32px 90px; }
          .case-navbar { margin-left: -32px; margin-right: -32px; padding-left: 32px; padding-right: 32px; }
          .hero-grid, .section-layout { grid-template-columns: 1fr; }
          .overview-strip { grid-template-columns: 1fr 1fr; }
          .card-grid, .persona-grid, .reflection-grid, .more-grid { grid-template-columns: 1fr; }
          .image-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .page-wrap { padding: 24px 16px 72px; }
          .tab-clock { display: none; }
          .tab { min-width: auto; padding: 0 8px; font-size: 9px; }
          .overview-strip { grid-template-columns: 1fr; }
          .ov-item { border-right: none; border-bottom: var(--border); }
          .ov-item:last-child { border-bottom: none; }
          .ds-item, .feature-item { flex-direction: column; gap: 6px; }
          .feature-name { min-width: unset; }
          .reflection-section { padding: 24px 20px; }
        }
      `}</style>
    </main>
  )
}