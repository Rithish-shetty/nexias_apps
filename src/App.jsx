import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll reveal
  const fadeRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('vis');
      }),
      { threshold: 0.1 }
    );
    fadeRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const fadeRef = (el) => { if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --bg: #09090b;
          --surface: #111114;
          --border: rgba(255,255,255,0.08);
          --accent: #22d3ee;
          --accent-dim: rgba(34,211,238,0.1);
          --text: #f4f4f5;
          --muted: #71717a;
          --muted2: #a1a1aa;
        }

        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .glow-1 {
          position: fixed; width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%);
          top: -220px; right: -220px; pointer-events: none; z-index: 0;
        }
        .glow-2 {
          position: fixed; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%);
          bottom: -100px; left: -200px; pointer-events: none; z-index: 0;
        }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 64px; padding: 0 2rem;
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(9,9,11,0.82);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 1.1rem;
          letter-spacing: -0.02em; color: var(--text);
          background: none; border: none; cursor: pointer;
        }
        .nav-logo span { color: var(--accent); }
        .nav-links { display: flex; gap: 2rem; align-items: center; }
        .nav-link {
          background: none; border: none;
          color: var(--muted2); font-size: 0.875rem;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--text); }
        .nav-cta {
          padding: 0.42rem 1rem;
          border: 1px solid rgba(34,211,238,0.4);
          border-radius: 6px;
          background: transparent;
          color: var(--accent);
          font-size: 0.8rem; font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: background 0.2s;
        }
        .nav-cta:hover { background: var(--accent-dim); }

        .ham {
          display: none; background: none; border: none;
          cursor: pointer; flex-direction: column; gap: 5px; padding: 4px;
        }
        .ham span { display: block; width: 20px; height: 1.5px; background: var(--text); }

        .mob-menu {
          position: fixed; top: 64px; left: 0; right: 0; z-index: 99;
          background: rgba(9,9,11,0.97); backdrop-filter: blur(16px);
          padding: 1.5rem 2rem; flex-direction: column; gap: 1.1rem;
          border-bottom: 1px solid var(--border);
        }
        .mob-menu.open { display: flex; }
        .mob-menu.closed { display: none; }
        .mob-link {
          background: none; border: none;
          color: var(--muted2); font-size: 1rem;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          text-align: left; transition: color 0.2s;
        }
        .mob-link:hover { color: var(--text); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 120px 2rem 80px; text-align: center;
          position: relative; z-index: 1;
        }
        .hero-inner { max-width: 680px; }

        .badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.32rem 0.85rem;
          border: 1px solid rgba(34,211,238,0.25);
          border-radius: 100px;
          background: rgba(34,211,238,0.05);
          font-size: 0.73rem; color: var(--accent);
          margin-bottom: 1.75rem;
          animation: fadeUp 0.5s 0.1s both;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); animation: blink 2s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }

        .hero h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.3rem, 6vw, 4rem);
          font-weight: 800; line-height: 1.1;
          letter-spacing: -0.03em; margin-bottom: 1.25rem;
          animation: fadeUp 0.5s 0.2s both;
        }
        .grad {
          background: linear-gradient(90deg, var(--accent) 0%, #818cf8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }

        .hero-desc {
          font-size: 1rem; color: var(--muted2); max-width: 480px;
          margin: 0 auto 2.5rem; line-height: 1.7;
          animation: fadeUp 0.5s 0.3s both;
        }

        .hero-btns {
          display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;
          animation: fadeUp 0.5s 0.4s both;
        }
        .btn-primary {
          padding: 0.7rem 1.7rem;
          background: var(--accent); color: #09090b;
          border: none; border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem; font-weight: 600;
          cursor: pointer; transition: opacity 0.2s;
          display: inline-flex; align-items: center; gap: 0.4rem;
        }
        .btn-primary:hover { opacity: 0.85; }
        .btn-ghost {
          padding: 0.7rem 1.7rem;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text); border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem; font-weight: 400;
          cursor: pointer; transition: border-color 0.2s, background 0.2s;
        }
        .btn-ghost:hover { border-color: var(--muted); background: rgba(255,255,255,0.03); }

        .scroll-cue {
          margin-top: 3.5rem; color: var(--muted);
          font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          animation: fadeUp 0.5s 0.6s both;
        }
        .scroll-line {
          width: 1px; height: 36px;
          background: linear-gradient(to bottom, var(--muted), transparent);
        }

        /* DIVIDER */
        .div { border: none; border-top: 1px solid var(--border); margin: 0; position: relative; z-index: 1; }

        /* SECTION */
        section { padding: 80px 2rem; position: relative; z-index: 1; }
        .container { max-width: 1060px; margin: 0 auto; }
        .sec-label {
          font-size: 0.7rem; font-weight: 500; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 0.6rem;
        }
        .sec-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700; letter-spacing: -0.02em; margin-bottom: 0.6rem;
        }
        .sec-sub { font-size: 0.9rem; color: var(--muted2); max-width: 440px; }

        /* SERVICES */
        #services { background: var(--surface); }
        .svc-header { margin-bottom: 2.5rem; }
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }
        .svc-card {
          border: 1px solid var(--border); border-radius: 12px;
          padding: 1.75rem; background: var(--bg);
          transition: border-color 0.25s, transform 0.25s;
        }
        .svc-card:hover { border-color: rgba(34,211,238,0.28); transform: translateY(-2px); }
        .svc-icon {
          width: 42px; height: 42px; border-radius: 10px;
          background: var(--accent-dim);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.1rem; color: var(--accent);
        }
        .svc-card h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1rem; font-weight: 700; margin-bottom: 0.45rem;
        }
        .svc-card p { font-size: 0.85rem; color: var(--muted2); margin-bottom: 1.1rem; }
        .tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
        .tag {
          padding: 0.2rem 0.6rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border); border-radius: 100px;
          font-size: 0.7rem; color: var(--muted2); font-family: monospace;
        }

        /* WORK */
        #work { background: var(--bg); }
        .work-header { margin-bottom: 2.5rem; }
        .proj-card {
          max-width: 580px;
          border: 1px solid var(--border); border-radius: 14px;
          overflow: hidden; background: var(--surface);
          transition: border-color 0.25s, transform 0.25s;
        }
        .proj-card:hover { border-color: rgba(34,211,238,0.28); transform: translateY(-3px); }
        .proj-top {
          height: 160px;
          background: linear-gradient(135deg, rgba(34,211,238,0.12), rgba(99,102,241,0.12));
          display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid var(--border); position: relative; overflow: hidden;
        }
        .proj-top::before {
          content: '';
          position: absolute; inset: 0;
          background:
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.03) 40px);
        }
        .app-icon {
          width: 66px; height: 66px; border-radius: 16px;
          background: linear-gradient(135deg, #0e7490, #3730a3);
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
          box-shadow: 0 16px 36px rgba(0,0,0,0.5); color: #fff;
        }
        .proj-body { padding: 1.6rem; }
        .proj-cat {
          font-size: 0.68rem; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--accent); font-weight: 500; margin-bottom: 0.35rem;
        }
        .proj-body h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem; font-weight: 700; margin-bottom: 0.45rem;
        }
        .proj-body p { font-size: 0.85rem; color: var(--muted2); margin-bottom: 1.4rem; }
        .tech-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1.5rem; }
        .tech-tag {
          padding: 0.22rem 0.6rem;
          background: rgba(34,211,238,0.05);
          border: 1px solid rgba(34,211,238,0.13);
          border-radius: 100px; font-size: 0.7rem;
          color: var(--muted2); font-family: monospace;
        }
        .soon-pill {
          display: inline-flex; align-items: center; gap: 0.35rem;
          padding: 0.35rem 0.8rem;
          background: rgba(251,191,36,0.07);
          border: 1px solid rgba(251,191,36,0.2);
          border-radius: 8px; font-size: 0.75rem; color: #fbbf24;
        }

        /* CONTACT */
        #contact { background: var(--surface); }
        .contact-wrap { max-width: 520px; }
        .contact-wrap h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700; letter-spacing: -0.02em; margin-bottom: 0.65rem;
        }
        .contact-wrap p { font-size: 0.9rem; color: var(--muted2); margin-bottom: 2rem; }
        .socials { display: flex; gap: 0.65rem; flex-wrap: wrap; }
        .soc-btn {
          padding: 0.6rem 1.1rem;
          border: 1px solid var(--border); border-radius: 8px;
          background: transparent; color: var(--muted2);
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
          cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.45rem;
          transition: all 0.2s;
        }
        .soc-btn:hover { border-color: var(--muted); color: var(--text); background: rgba(255,255,255,0.03); }

        /* FOOTER */
        .footer {
          padding: 1.75rem 2rem;
          border-top: 1px solid var(--border);
          background: var(--bg);
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;
          position: relative; z-index: 1;
        }
        .f-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 0.9rem; color: var(--text);
          background: none; border: none;
        }
        .f-logo span { color: var(--accent); }
        .footer p { font-size: 0.78rem; color: var(--muted); }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { opacity: 0; transform: translateY(18px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .fade-up.vis { opacity: 1; transform: translateY(0); }

        /* RESPONSIVE */
        @media (max-width: 767px) {
          .nav-links { display: none; }
          .ham { display: flex; }
          .nav { padding: 0 1.25rem; }
          section { padding: 60px 1.25rem; }
          .footer { flex-direction: column; text-align: center; }
        }
        @media (min-width: 768px) {
          .ham { display: none; }
        }
      `}</style>

      <div className="glow-1" />
      <div className="glow-2" />

      {/* NAV */}
      <nav className="nav">
        <button className="nav-logo" onClick={() => scrollTo('hero')}>
          nexias<span>_</span>dev
        </button>
        <div className="nav-links">
          <button className="nav-link" onClick={() => scrollTo('services')}>Services</button>
          <button className="nav-link" onClick={() => scrollTo('work')}>Work</button>
          <button className="nav-link" onClick={() => scrollTo('contact')}>Contact</button>
          <button className="nav-cta" onClick={() => scrollTo('contact')}>Let's Talk</button>
        </div>
        <button className="ham" onClick={() => setMobileMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mob-menu ${mobileMenuOpen ? 'open' : 'closed'}`}>
        <button className="mob-link" onClick={() => scrollTo('services')}>Services</button>
        <button className="mob-link" onClick={() => scrollTo('work')}>Work</button>
        <button className="mob-link" onClick={() => scrollTo('contact')}>Contact</button>
      </div>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-inner">
          <div className="badge">
            <span className="badge-dot" />
            Available for new projects
          </div>
          <h1>
            Building apps<br />
            <span className="grad">people actually use.</span>
          </h1>
          <p className="hero-desc">
            Mobile & web development — React Native, React, Node.js. From idea to launch, fast and clean.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo('work')}>
              View Work
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <button className="btn-ghost" onClick={() => scrollTo('contact')}>Start a Project</button>
          </div>
          <div className="scroll-cue">
            scroll
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      <hr className="div" />

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div className="svc-header fade-up" ref={fadeRef}>
            <div className="sec-label">What I Build</div>
            <h2 className="sec-title">Services</h2>
            <p className="sec-sub">Full-stack development focused on performance, quality, and clean code.</p>
          </div>
          <div className="svc-grid">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                ),
                title: 'Mobile Apps',
                desc: 'Production-grade Android apps built with React Native — smooth, fast, and user-friendly.',
                tags: ['React Native', 'Android'],
                delay: '0s',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                  </svg>
                ),
                title: 'Web Development',
                desc: 'Scalable websites built with modern tech — fast, clean, and maintainable.',
                tags: ['React', 'Next.js'],
                delay: '0.08s',
              },
            ].map((s, i) => (
              <div className="svc-card fade-up" ref={fadeRef} style={{ transitionDelay: s.delay }} key={i}>
                <div className="svc-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="tags">{s.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="div" />

      {/* WORK */}
      <section id="work">
        <div className="container">
          <div className="work-header fade-up" ref={fadeRef}>
            <div className="sec-label">Portfolio</div>
            <h2 className="sec-title">Recent Projects</h2>
            <p className="sec-sub">Apps I've built and shipped.</p>
          </div>
          <div className="proj-card fade-up" ref={fadeRef}>
            <div className="proj-top">
              <div className="app-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                  <path d="M12 8v4l3 1.5" />
                </svg>
              </div>
            </div>
            <div className="proj-body">
              <div className="proj-cat">Mobile App · Android</div>
              <h3>SmartLearn AI</h3>
              <p>An AI-powered learning app where users can chat with AI tutors, get personalized explanations, and access multiple learning features.</p>
              <div className="tech-tags">
                {['React Native', 'Node.js', 'Express.js', 'Redux Toolkit'].map(t => (
                  <span className="tech-tag" key={t}>{t}</span>
                ))}
              </div>
              <span className="soon-pill">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                Play Store — Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>

      <hr className="div" />

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="contact-wrap fade-up" ref={fadeRef}>
            <div className="sec-label">Get In Touch</div>
            <h2>Let's build something together.</h2>
            <p>Have an app idea or a project in mind? Reach out — I'll get back to you quickly.</p>
            <div className="socials">
              <a href="https://www.instagram.com/app_devv/?__pwa=1" target="_blank" rel="noreferrer" className="soc-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Instagram
              </a>
              <a href="https://www.linkedin.com/in/rithish-s-r-923576365/" target="_blank" rel="noreferrer" className="soc-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
              <a href="https://x.com/Nexias_apps" target="_blank" rel="noreferrer" className="soc-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 4l16 16M4 20L20 4" />
                </svg>
                X / Twitter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="f-logo">nexias<span>_</span>dev</div>
        <p>© 2026 Nexias Dev. All rights reserved.</p>
      </footer>
    </>
  );
}