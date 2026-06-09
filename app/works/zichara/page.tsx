'use client'

import { Press_Start_2P } from 'next/font/google'
import { useEffect, useState, type ReactNode } from 'react'

const pixel = Press_Start_2P({ weight: '400', subsets: ['latin'] })

const moreWorks = [
  {
    title: 'Naratrad',
    type: 'Website',
    role: 'Backend Engineer',
    href: '/works/naratrad',
  },
  {
    title: 'Panganesia',
    type: 'Website',
    role: 'Frontend Developer',
    href: '/works/panganesia',
  },
  {
    title: 'Seluna',
    type: 'UI/UX',
    role: 'UI Designer',
    href: '/works/seluna',
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
    <div className={`image-block ${className} ${scrollable ? 'scrollable-block' : ''}`}>
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
    <div className="note" role="note" style={{ margin: '2rem 0' }}>
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
        now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
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

export default function ZicharaCaseStudy() {
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
            <span className="project-num">05 / 06</span>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <div className={`hero-kicker ${pixel.className}`}>IMK Course Project · 2026</div>
              <h1 className={`hero-title ${pixel.className}`}>ZICHARA</h1>
              <p className="hero-sub">AR-Based Mandarin Literacy App</p>
              <p className="hero-desc">
                Zichara is an AR-based Mandarin literacy app that transforms Hanzi learning into a
                physical discovery experience — where users scan real cards, combine characters, and
                watch compound words come to life as 3D objects.
              </p>
              <div className="hero-tags">
                {['Unity', 'Vuforia', 'Blender', 'Figma'].map((t) => (
                  <span key={t} className={pixel.className}>{t}</span>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <ImageBlock
                src="/images/cover-page/zichara.png"
                label="ZICHARA"
                caption="main project preview"
                className="hero-image"
              />
            </div>
          </div>
        </header>

        {/* ── Overview strip ── */}
        <section className="overview-strip" aria-label="Project overview">
          {[
            { label: 'ROLE', val: 'Scrum Master + QA' },
            { label: 'DURATION', val: 'Even Semester 2025/2026' },
            { label: 'TEAM', val: <ol><li>Ammara Azwadiena A. (PM)</li><li>Martha Meslina F. (Unity dev)</li><li>Aidan Ismail (Unity Dev)</li><li>Senia Nur Hasanah (3D Designer)</li><li>Siti Eko Putri A. (3D Designer)</li></ol> },
            { label: 'TECH', val: 'Unity · Vuforia · Blender · Figma' },
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
            { label: 'Background',  id: 'background'  },
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
                  What If Learning a New Language Felt Like Playing?
                </h2>
                <p>
                  IMK (Interaksi Manusia dan Komputer) is a Human-Computer Interaction course at
                  Teknik Informatika Universitas Padjadjaran where student teams design and build
                  an interactive application from scratch — covering user research, system design,
                  implementation, and testing.
                </p>
                <p>
                  Two constraints were non-negotiable from the start: the project had to address at
                  least one UN Sustainable Development Goal, and the implementation had to use Unity
                  with either VR or AR. Within those constraints, we were free to define both the
                  problem and the solution ourselves — which meant the harder work was finding a
                  problem worth solving.
                </p>
                <p>
                  We landed on Mandarin literacy. The SDG anchor was SDG 4 (Quality Education),
                  specifically target 4.6: improving access to effective literacy tools. The
                  problem itself was concrete — conventional Hanzi learning through rote
                  memorization and static flashcards strips characters of context. Learners
                  accumulate symbols without understanding what they're built from, or how two
                  characters can combine into an entirely new meaning.
                </p>
                <p>
                  Between VR and AR, we chose AR deliberately. VR places users inside a fully
                  virtual environment, which introduces orientation overhead before learning even
                  begins. AR overlays digital content onto the physical world, keeping the user
                  grounded. For a literacy app targeting beginners — where the content itself is
                  already cognitively demanding — reducing the medium's cognitive load mattered.
                  AR lets a physical card serve as an anchor: something tangible to hold and
                  position, with meaning layered on top.
                </p>
                <p>
                  That reasoning became the foundation for Zichara's core mechanic: scan a real
                  card, watch the character come to life. Physical and digital reinforce each
                  other rather than compete.
                </p>
              </div>
              <Note>
                The SDG and Unity AR/VR requirements weren't limitations — they shaped the
                solution. Choosing AR over VR came down to cognitive load: AR keeps learners
                grounded in the physical world, reducing orientation overhead so attention can
                stay on the language itself.
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
              With AR as the medium and Mandarin literacy as the problem space, we needed a
              framework to think divergently before converging on a direction. We used the 4C
              framework — Collect insights first, Choose and cluster them, Create a direction,
              then Commit to what we were building.
            </p>

            <img
              src="/zichara/4c-framework.svg"
              alt="4C Framework"
              className="wide-placeholder"
            />

            <h3 className={`sub-heading ${pixel.className}`}>Collect — Market Research + Competitive Benchmarking</h3>
            <p>
              Before building anything, we mapped the EdTech landscape and AR's potential as a
              learning medium. Then we ran competitive benchmarking against the three most-used
              Mandarin learning apps: Duolingo, HelloChinese, and Skritter. Each succeeds in its
              own lane — Duolingo for habit formation, HelloChinese for curriculum structure,
              Skritter for stroke practice.
            </p>
            <p>
              The gap was consistent across all three: none of them gave learners a way to
              physically engage with the characters they were studying. You could see a character,
              tap it, move on. But you couldn't hold it, build it from its parts, or feel it
              come together into something new.
            </p>

            <ImageBlock
              src="/zichara/market-research.png"
              label="Market Research"
              caption="Industry Overview, SWOT, & Competitor Analysis (Scroll to explore)"
              className="wide-placeholder"
              scrollable={true} 
            />

            <h3 className={`sub-heading ${pixel.className}`}>Choose & Create — From Research to Direction</h3>
            <p>
              Four design directions emerged from benchmarking: stroke-based learning, tangible
              interaction, contextual discovery, and compound character logic. We clustered them,
              weighted each against our user research, and converged on an approach that combined
              all four — not just one feature, but an ecosystem.
            </p>

            <ImageBlock
              src="/zichara/affinity-diagram.png"
              label="Affinity Diagram"
              caption="clustering from ideation sessions → converged direction"
              className="wide-placeholder"
            />

            <Note>
              We could have been more methodical here. We went with discussion and gut, which
              worked — but a structured decision matrix would have made the reasoning easier to
              trace later.
            </Note>

            <h3 className={`sub-heading ${pixel.className}`}>Commit — What We Were Building</h3>
            <p>
              With direction clear, we committed to Zichara: an AR-based Mandarin literacy app
              for beginner learners. Four core pillars: Discovery Learning through physical card
              scanning, Stroke Animation for writing mechanics, Card Combination to reveal compound
              word logic, and a Legends collection that grows as users explore.
            </p>
          </section>

          {/* 02 Research */}
          <section className="section" id="research">
            <div className={`section-label ${pixel.className}`}>02 — RESEARCH</div>
            <h2 className={`section-title ${pixel.className}`}>
              Two Personas, One Underlying Need
            </h2>
            <p>
              Before designing anything, we conducted market research and built user personas
              grounded in demographic and psychographic data — not hypothetical users, but
              representative ones.
            </p>

            <div className="persona-grid">
              <div className="persona-card">
                <div className={`persona-name ${pixel.className}`}>Budi, 10</div>
                <div className={`persona-role ${pixel.className}`}>Elementary Student</div>
                <div className="persona-pain">
                  <strong>Context:</strong> Tech-savvy, motivated by games, finds conventional
                  Mandarin study tedious — it feels like extra homework rather than something
                  worth doing.
                </div>
                <div className="persona-gain">
                  <strong>Need:</strong> Learning that rewards curiosity and makes progress
                  feel visible — not a grade on paper, but something he can see and collect.
                </div>
              </div>
              <div className="persona-card">
                <div className={`persona-name ${pixel.className}`}>Andi, 25</div>
                <div className={`persona-role ${pixel.className}`}>Young Professional</div>
                <div className="persona-pain">
                  <strong>Context:</strong> Wants to learn Mandarin for work but has no time
                  for formal classes. Hanzi characters feel abstract and disconnected from
                  meaning.
                </div>
                <div className="persona-gain">
                  <strong>Need:</strong> A visual, efficient method that fits into short
                  sessions — not drilling, but contextual understanding that sticks.
                </div>
              </div>
            </div>

            <div className="callout">
              Two personas with different ages, contexts, and relationships with failure — but
              the same core need: learning that feels like exploration, not obligation. The
              biggest barrier to Hanzi literacy isn't motivation. It's the absence of an
              environment that makes characters feel real and meaningful. Learners know the
              symbol. They don't feel what it means.
            </div>

            <ImageBlock
              src="/zichara/user-persona.png"
              label="Persona Cards"
              caption="full persona documentation: Budi + Andi"
              className="wide-placeholder"
              scrollable={true}
            />

            <Note>
              Keeping both personas meant designing for two different cognitive loads, two
              contexts of use, and two different relationships with failure. It was easy to
              default to the simpler user. Staying honest about both made the design stronger —
              and directly led to the split between Story Mode (structured, guided) and
              Freeplay Mode (open, self-directed).
            </Note>
          </section>

          {/* 03 Crafting */}
          <section className="section" id="crafting">
            <div className={`section-label ${pixel.className}`}>03 — CRAFTING</div>
            <h2 className={`section-title ${pixel.className}`}>
              Every Design Decision Has a Reason
            </h2>
            <p>
              The core design principle was <em>Play to Visualize</em> — every mechanic exists
              to make abstract characters concrete. Every decision was derived explicitly from
              that principle.
            </p>

            <h3 className={`sub-heading ${pixel.className}`}>Game Design: Story Mode and Freeplay</h3>
            <p>
              Story Mode follows Chichi's journey across four progressive levels — preparing for
              departure, buying a train ticket, finding grandmother a gift, arriving at her house.
              Each level contains 2–3 missions where users scan physical Hanzi marker cards to
              unlock 3D objects. The everyday setting wasn't a creative choice — it was a
              curriculum decision. Grounding the story in daily life ensured the vocabulary was
              practical: transportation (火车 / train), household objects (书包 / backpack), food
              (面包 / bread).
            </p>
            <p>
              Freeplay Mode removes the narrative constraints entirely, letting users scan any of
              the 21 available marker cards freely. Every character discovered saves automatically
              to Legends — an in-app encyclopedia showing the character, pinyin, meaning, and
              stroke animation.
            </p>

            <div className="card-grid">
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Story Mode</div>
                <p>
                  Four progressive narrative levels following Chichi's journey. Each level has
                  2-3 AR scanning missions. Designed for users like Budi — who need structure
                  and a clear goal to stay engaged.
                </p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Card Combination</div>
                <p>
                  火 (fire) + 车 (vehicle) = 3D train. 手 (hand) + 机 (machine) = 3D phone.
                  This is where the "aha moment" lives — users realize Hanzi isn't a list
                  of symbols to memorize, it's a system of meanings you can build from.
                </p>
              </div>
              <div className="info-card accent">
                <div className={`card-title ${pixel.className}`}>Freeplay Mode</div>
                <p>
                  Open exploration across all 21 marker cards without narrative constraints.
                  Every character found is saved to Legends. Designed for users like Andi —
                  who want independent exploration without following a narrative.
                </p>
              </div>
            </div>

            <ImageBlock
              src="/zichara/core-loop.png"
              label="Core Loop"
              caption="gameplay flow: scan → discover → combine → collect"
              className="wide-placeholder"
            />

            <Note>
              The card combination mechanic required the most design iteration. Early versions
              felt either too obvious or too opaque. Getting the balance right — where users
              feel clever when they discover a combination rather than confused — turned out
              to be a design problem as much as a technical one.
            </Note>

            <h3 className={`sub-heading ${pixel.className}`}>Design System: Why Deep Red, Why Fangsong?</h3>
            <p>
              Both the color and typography choices were functional decisions, not aesthetic ones.
            </p>
            <div className="ds-grid">
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Deep Red #800000</span>
                <span className="ds-val">
                  Chosen for its direct cultural association with Chinese aesthetics — the color
                  of celebration, luck, and Chinese visual identity. Not about looking striking,
                  but about making the context immediately legible: this is a Mandarin learning
                  experience, not a generic language app.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Poppins</span>
                <span className="ds-val">
                  Used for UI elements and English text for its clean, geometric shapes that contrast 
                  well with the complexity of Hanzi characters. Not a decorative choice — it was about 
                  maximizing readability and visual hierarchy.
                </span>
              </div>
              <div className="ds-item">
                <span className={`ds-key ${pixel.className}`}>Color Constraint</span>
                <span className="ds-val">
                  Maximum 4-5 active colors per screen. Not an aesthetic rule — a cognitive one.
                  Too many colors on an AR screen compete with the 3D objects appearing in
                  camera space, pulling attention away from the content that matters.
                </span>
              </div>
            </div>

            <img
              src="/zichara/design-system.png"
              alt="Design System"
              style={{ width: '70%', height: 'auto', margin: '2rem 0', justifySelf: 'center' }}
            />

            <h3 className={`sub-heading ${pixel.className}`}>Lo-Fi to Hi-Fi: Structure Before Visual</h3>
            <p>
              We started with wireframes because there were architecture decisions that had to be
              resolved before touching visuals: how does the flow from scan to Legends work?
              Where does level lock/unlock happen? How do Freeplay and Story Mode share the same
              collection data? Those questions were cheapest to answer at the wireframe stage.
            </p>
              <img 
              src="/zichara/lofi.png"
              alt="Lo-Fi" 
              style={{ width: '70%', height: 'auto', margin: '2rem 0', justifySelf: 'center' }}
              />
              <br />
              <img 
                src="/zichara/hifi.png"
                alt="Hi-Fi"
              />

            <Note>
              Moving from lo-fi to hi-fi and straight into Unity compressed the iteration window.
              Some decisions that looked fine as wireframes felt off once real assets were in the
              engine. Lo-fi is the cheapest moment to be critical — we should have stress-tested
              the navigation structure more before committing to implementation.
            </Note>

            <h3 className={`sub-heading ${pixel.className}`}>3D Asset Creation</h3>
            <p>
              Each Hanzi character was modeled in Blender as a 3D extruded text object using
              Adobe Fangsong Std R — preserving the visual weight of traditional brushwork.
              Compound word objects (书包, 面包, 火车, and 12 others) were fully modeled using box
              modeling and sculpting: subdivision surfaces, Bezier curves for organic shapes,
              and procedural textures for surface variation. Stroke animation was implemented
              in Unity using the Line Renderer component, with each stroke defined as a
              coordinate sequence and animated in writing order.
            </p>

            <ImageBlock
              src="/zichara/3d-assets.png"
              label="3D Assets"
              caption="Blender renders: Hanzi characters + compound word objects"
              className="wide-placeholder img-medium"
            />
          </section>

          {/* 04 Challenge */}
          <section className="section">
            <div className={`section-label ${pixel.className}`}>04 — CHALLENGE</div>
            <h2 className={`section-title ${pixel.className}`}>
              The Biggest Call I Made as PM
            </h2>

            <div className="challenge-block">
              <p>
                Stroke animation was one of the most critical mechanics in the app — the way
                users understand stroke order and character structure, not just shape. When the
                Blender-to-Unity animation pipeline failed, it wasn't a minor bug. It was a
                direct threat to one of Zichara's core value propositions.
              </p>
              <p>
                The problem: animations built in Blender couldn't be transferred to Unity
                correctly. FBX export dropped animation data entirely, and no quick fix was
                available. We were mid-sprint, and the feature was already marked "done" in
                the task tracker.
              </p>
              <p>
                As PM, I had three options: cut the feature, build a simplified version (static
                stroke sequence images), or rebuild the animations natively in Unity. The first
                sacrificed educational value. The second significantly reduced quality. I chose
                the third — which meant resetting work we thought was complete.
              </p>
              <p>
                We consulted our lecturer and rebuilt using Unity's Line Renderer: each stroke
                defined as a coordinate sequence, animated in correct writing order. It worked —
                but it required reshuffling the timeline and redistributing work across the team.
              </p>
            </div>

            <h3 className={`sub-heading ${pixel.className}`}>Card Combination: A Technical Problem That Was Also a Design Problem</h3>
            <p>
              The card combination mechanic sounds simple: scan two cards simultaneously, spawn
              one 3D object. The implementation was far more complex. Vuforia has no native way
              to detect "two markers active simultaneously → produce a specific output." We had
              to build a recipe system from scratch using 2–3 scripts working together: one for
              active marker detection, one for matching combinations against a recipe list, one
              for spawning the result object.
            </p>
            <p>
              Every combination (火 + 车, 手 + 机, etc.) had to be defined and manually assigned
              in Unity's Inspector. With 21 markers and multiple valid combinations, this became
              highly error-prone — and more complex still at the level gating layer, where
              certain combinations only unlock at specific levels.
            </p>

            <div className="callout warning">
              Lesson learned: FBX file sizes too large for GitHub meant every team member had
              to manually reassign game objects every time they cloned or pulled a fresh copy
              of the project. A repo hygiene problem caught at the 75% sprint mark, not sprint
              zero. I now treat file and asset management as a sprint-zero concern, not cleanup.
            </div>
          </section>

          {/* 05 Validation */}
          <section className="section" id="validation">
            <div className={`section-label ${pixel.className}`}>05 — VALIDATION</div>
            <h2 className={`section-title ${pixel.className}`}>
              Testing Is Thinking in Failure Modes
            </h2>
            <p>
              As QA on this project, I was responsible for designing and executing the blackbox
              testing phase. Not "try every feature and see what breaks" — every scenario was
              designed around a specific question: what happens when a user does this in an
              unexpected way?
            </p>
            <p>
              Scenarios covered: single card scan (valid and invalid markers), multi-card
              combination (valid combinations, combinations with no recipe, more than two cards
              active simultaneously), stroke animation trigger, level progression (locked before
              mission completion, unlocked immediately after), and Legends collection (characters
              persisting after app restart).
            </p>
            <p>
              Testing AR is different from testing screen-based apps: lighting conditions, camera
              angle, and distance from marker all affect Vuforia detection. We had to define and
              document testing conditions explicitly to make results reproducible.
            </p>
            {/* <ImageBlock
              label="Test Matrix"
              caption="blackbox testing table: scenario · input · expected output · result"
              className="wide-placeholder"
            /> */}
            <div className="callout">
              External usability testing has not yet been conducted at the time of writing.
              This section will be updated with user feedback and quantitative data when
              external testing is complete.
            </div>
          </section>

          {/* 06 Improvement */}
          <section className="section improvement-section">
            <div className={`section-label ${pixel.className}`}>06 — IMPROVEMENT</div>
            <h2 className={`section-title ${pixel.className}`}>Coming Soon</h2>
            <p>
              This section will be updated after external usability testing, additional
              iteration, and improvement planning are complete.
            </p>
          </section>

          {/* 07 Output */}
          <section className="section" id="output">
            <div className={`section-label ${pixel.className}`}>07 — OUTPUT</div>
            <h2 className={`section-title ${pixel.className}`}>
              Explore Hanzi Vocabulary Through Your Phone
            </h2>
            <p>
              The final application covers the complete learning journey — from first scan to a
              completed Legends collection. Every feature below exists for a reason.
            </p>
            <ImageBlock
              src="/zichara/final-ui.png"
              label="Final UI"
              className="wide-placeholder"
            />
            <div className="features-list">
              {[
                {
                  name: 'Story Mode',
                  desc: 'Four narrative levels guiding users through Chichi\'s journey, each with 2–3 AR scanning missions. Exists because beginner users need structure and context before they can learn independently.',
                },
                {
                  name: 'Freeplay Mode',
                  desc: 'Open exploration across all 21 Hanzi marker cards without narrative constraints. Exists because more independent users don\'t need guidance — they need space to experiment.',
                },
                {
                  name: 'Card Combination',
                  desc: 'Scan two or three cards simultaneously to surface compound word 3D objects. The core mechanic that makes users understand the logic of Hanzi formation rather than just memorizing symbols.',
                },
                {
                  name: 'Stroke Animation',
                  desc: 'Visual stroke order for every character, animated on single card scan. Stroke order isn\'t decorative — it\'s the correct way to write the character, and important for muscle memory.',
                },
                {
                  name: 'Legends',
                  desc: 'Personal collection of every character discovered, with pinyin, meaning, and animation replay. A personal encyclopedia that grows with the user\'s exploration.',
                },
                {
                  name: 'Progressive Unlock',
                  desc: 'Level access tied to mission completion, with clear visual lock/unlock feedback. Prevents cognitive overload while giving users a concrete, visible sense of progress.',
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
              What Being PM on a Technical Project Actually Feels Like
            </h2>
            <div className="reflection-grid">
              {[
                {
                  title: 'Managing a timeline is harder than it looks',
                  body: 'Early on, meetings ran long without producing decisions. I learned the difference between a meeting that discusses and a meeting that decides — and started structuring every session around a specific question that needed an answer before we left the room. That shift changed how the team moved.',
                },
                {
                  title: 'A PM on a technical project needs to understand the pipeline',
                  body: 'I wasn\'t the one implementing Unity and Blender, but I had to understand enough of the pipeline to track progress, flag blockers, and make scope calls. The first few weeks felt like everyone was fighting the engine. Once the mental model clicked, velocity picked up. Budget extra time at the start of any project involving a new tool.',
                },
                {
                  title: 'Know when to step in and when to step back',
                  body: 'When rebuilding stroke animations turned into a bottleneck for the 3D designer, I stepped in to help redistribute work. But I also had to resist the instinct to micromanage every technical decision. My job was to protect the team\'s capacity and keep the critical path clear — not to solve every problem myself.',
                },
                {
                  title: 'A feature isn\'t done when it works in the demo',
                  body: 'Stroke animation was marked done in the task tracker — until we discovered the Blender-to-Unity pipeline didn\'t work. QA taught me not to declare done before edge cases and failure modes have been explicitly tested. A feature is done when it handles everything that could go wrong.',
                },
                {
                  title: 'Assets should follow the story, not the other way around',
                  body: 'We locked the Hanzi character set before the storyboard was written. The narrative ended up bending to fit the assets rather than the assets serving the story. That\'s a sequencing mistake I own as PM. Next time: the story leads, the asset list follows.',
                },
                {
                  title: 'Repo hygiene is a sprint-zero concern, not afterthought',
                  body: 'FBX files too large for GitHub meant every team member had to manually reassign game objects on every fresh clone. A problem that should have been caught at the asset creation stage, not at the 75% sprint mark. The cost was time and friction that didn\'t need to exist.',
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
          --red:       #9b111e;
          --red-light: #ffe0e3;
          --yellow:    #fff6a5;
          --dot-size:  18px;
          --shadow:    5px 5px 0 var(--ink);
          --shadow-lg: 6px 6px 0 var(--ink);
          --border:    2px solid var(--ink);
          --radius:    0px;
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

        .case-navbar {
        position: sticky;
        top: 34px;
        z-index: 120;
        margin: 0 -72px 56px;
        padding:32px 72px 0px 72px;
        display: flex;
        gap: 0;
        background: var(--bg);
        border-bottom: 3px solid var(--red);
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        }

        .case-navbar::-webkit-scrollbar {
            display: none;
            }

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

        .section {
        scroll-margin-top: 135px;
        }

        .hero {
        scroll-margin-top: 135px;
        }

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

        .wide-placeholder { width: 100%; height: auto; min-height: 320px; justify-self: center; }
        .img-medium       { width: 70%; height: auto; min-height: 300px; justify-self: center; }
        .hero-image       { min-height: 420px; }

        .image-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 28px 0;
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

        .info-card.accent { border-color: var(--red); }

        .card-title {
          font-size: 8px;
          color: var(--red);
          margin-bottom: 4px;
        }

        .info-card p {
          font-size: 11px;
          margin-bottom: 0;
        }

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

        /* ── Improvement / Reflection special wrappers ── */
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
          .page-wrap {
            padding: 40px 32px 90px;
          }

          .case-navbar {
            margin-left: -32px;
            margin-right: -32px;
          }

          .hero-grid,
          .section-layout {
            grid-template-columns: 1fr;
          }

          .overview-strip {
            grid-template-columns: 1fr 1fr;
          }

          .card-grid,
          .persona-grid,
          .reflection-grid,
          .more-grid {
            grid-template-columns: 1fr;
          }

          .image-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .page-wrap { padding: 24px 16px 72px; }

          .tab-clock  { display: none; }
          .tab        { min-width: auto; padding: 0 8px; font-size: 9px; }

          .hero-title { letter-spacing: -1.5px; }

          .overview-strip {
            grid-template-columns: 1fr;
          }

          .ov-item {
            border-right: none;
            border-bottom: var(--border);
          }
          .ov-item:last-child { border-bottom: none; }

          .ds-item,
          .feature-item {
            flex-direction: column;
            gap: 6px;
          }

          .feature-name { min-width: unset; }

          .case-navbar {
            top: 34px;
            overflow-x: auto;
            flex-wrap: nowrap;
          }

          .reflection-section,
          .improvement-section {
            padding: 24px 20px;
          }
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