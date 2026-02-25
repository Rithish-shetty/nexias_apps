import { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const refs = useRef([]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.07 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const r = (el) => { if (el && !refs.current.includes(el)) refs.current.push(el); };

  return (
    <div className="app">

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? ' nav-scrolled' : ''}`}>
        <button className="logo" onClick={() => scrollTo('hero')}>
          Nexias<span>Dev</span>
        </button>
        <div className="nav-links">
          <button onClick={() => scrollTo('services')}>Services</button>
          <button onClick={() => scrollTo('work')}>Work</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
          <button className="nav-cta" onClick={() => scrollTo('contact')}>Let's Talk →</button>
        </div>
        <button className="ham" onClick={() => setMenuOpen(o => !o)} aria-label="menu">
          <span className={menuOpen ? 'open' : ''} /><span className={menuOpen ? 'open' : ''} /><span className={menuOpen ? 'open' : ''} />
        </button>
      </nav>

      {menuOpen && (
        <div className="mob-menu">
          <button onClick={() => scrollTo('services')}>Services</button>
          <button onClick={() => scrollTo('work')}>Work</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        {/* Background texture */}
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-blob b1" />
          <div className="hero-blob b2" />
        </div>

        <div className="hero-inner">
          <div className="hero-left">
            <div className="available"><span className="dot" />Open to new projects</div>
            <h1>
              Mobile apps &amp;<br />
              websites that<br />
              <span className="hero-em">grow businesses.</span>
            </h1>
            <p className="hero-sub">
              I'm Rithish — a full-stack developer based in India. I design and build
              fast, clean mobile apps and websites that help businesses reach more customers.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => scrollTo('work')}>
                See My Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('contact')}>Start a Project</button>
            </div>
            <div className="hero-trusted">
              <span className="trusted-label">Built with</span>
              <div className="tech-pills">
                {['React Native', 'React', 'Next.js', 'Node.js'].map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="phone-wrap">
              <div className="phone-shadow" />
              <div className="phone-mock">
                <div className="phone-pill" />
                <div className="phone-screen">
                  <div className="screen-bar">
                    <div className="screen-avatar">AI</div>
                    <div>
                      <p className="screen-name">SmartLearn AI</p>
                      <p className="screen-status">● Online</p>
                    </div>
                  </div>
                  <div className="chat-area">
                    <div className="bubble bubble-ai">
                      <span className="bubble-label">AI Tutor</span>
                      <p>Hey! What would you like to learn today? 👋</p>
                    </div>
                    <div className="bubble bubble-user">
                      <p>Explain Newton's laws</p>
                    </div>
                    <div className="bubble bubble-ai">
                      <span className="bubble-label">AI Tutor</span>
                      <p>Newton's First Law: an object stays at rest unless a force acts on it...</p>
                    </div>
                    <div className="bubble bubble-ai typing">
                      <span /><span /><span />
                    </div>
                  </div>
                  <div className="chat-input">
                    <span>Ask anything...</span>
                    <div className="send-btn">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="float-card fc-1">
                <span className="fc-icon">📱</span>
                <div>
                  <p className="fc-title">Mobile First</p>
                  <p className="fc-sub">React Native</p>
                </div>
              </div>
              <div className="float-card fc-2">
                <span className="fc-icon">⚡</span>
                <div>
                  <p className="fc-title">Fast Delivery</p>
                  <p className="fc-sub">3 months or less</p>
                </div>
              </div>
              <div className="float-card fc-3">
                <div className="fc-stars">★★★★★</div>
                <p className="fc-sub">Client satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {['Mobile Apps', 'Web Development', 'React Native', 'Next.js', 'Node.js', 'UI Design', 'API Integration', 'Play Store', 'Full Stack', 'Mobile Apps', 'Web Development', 'React Native', 'Next.js', 'Node.js', 'UI Design', 'API Integration', 'Play Store', 'Full Stack'].map((t, i) => (
              <span key={i}>{t} <em>·</em></span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section">
        <div className="container">
          <div className="section-head reveal" ref={r}>
            <div className="section-label">Services</div>
            <h2>Two things. Done exceptionally well.</h2>
            <p className="section-sub">I focus only on mobile apps and websites — deep expertise, not a jack of all trades.</p>
          </div>

          <div className="services-grid">
            {/* Mobile */}
            <div className="svc-card svc-dark reveal" ref={r}>
              <div className="svc-card-top">
                <span className="svc-num">01</span>
                <span className="svc-badge">Most Popular</span>
              </div>
              <div className="svc-icon-lg">📱</div>
              <h3>Mobile App Development</h3>
              <p>Android apps built with React Native — smooth, native-feeling, and ready for the Play Store. I handle design, development, and backend integration.</p>
              <ul className="svc-list">
                <li>Custom UI & UX design</li>
                <li>Offline support</li>
                <li>Push notifications</li>
                <li>API & backend integration</li>
                <li>Play Store submission</li>
              </ul>
              <div className="tags">
                <span>React Native</span><span>Android</span><span>Redux Toolkit</span><span>Node.js</span>
              </div>
            </div>

            {/* Web */}
            <div className="svc-card svc-light reveal" ref={r} style={{ transitionDelay: '0.1s' }}>
              <div className="svc-card-top">
                <span className="svc-num">02</span>
              </div>
              <div className="svc-icon-lg">🌐</div>
              <h3>Website Development</h3>
              <p>Modern, fast websites and web apps built with React and Next.js. From portfolios to full web platforms — clean design and great performance.</p>
              <ul className="svc-list">
                <li>Responsive on all devices</li>
                <li>Fast load times & SEO ready</li>
                <li>Custom animations</li>
                <li>CMS integration</li>
                <li>Hosting & deployment</li>
              </ul>
              <div className="tags">
                <span>React</span><span>Next.js</span><span>Tailwind CSS</span><span>Node.js</span>
              </div>
            </div>
          </div>

          {/* Process strip */}
          <div className="process-strip reveal" ref={r}>
            <p className="process-title">How I work</p>
            <div className="process-steps">
              {['Understand your idea', 'Plan & propose', 'Design & build', 'Test & refine', 'Launch & support'].map((s, i) => (
                <div className="process-step" key={i}>
                  <div className="ps-num">{i + 1}</div>
                  <p>{s}</p>
                  {i < 4 && <div className="ps-arrow">→</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" className="section section-tinted">
        <div className="container">
          <div className="section-head reveal" ref={r}>
            <div className="section-label">Work</div>
            <h2>Recent projects</h2>
            <p className="section-sub">Apps and sites I've designed and built end-to-end.</p>
          </div>

          <div className="project-feature reveal" ref={r}>
            <div className="pf-left">
              <div className="pf-meta">
                <span className="proj-type">📱 Mobile App · Android</span>
                <span className="proj-status">Play Store — Coming Soon</span>
              </div>
              <h3>SmartLearn AI</h3>
              <p>
                An AI-powered learning app where students can chat with AI tutors,
                get instant explanations, quiz themselves, and track their progress —
                all in one place. Built completely end-to-end, from mobile UI to backend API.
              </p>

              <div className="pf-highlights">
                <div className="pf-hl">
                  <div className="pf-hl-icon">🤖</div>
                  <div>
                    <p className="pf-hl-title">AI Chat Tutors</p>
                    <p className="pf-hl-sub">Get explanations on any topic</p>
                  </div>
                </div>
                <div className="pf-hl">
                  <div className="pf-hl-icon">📚</div>
                  <div>
                    <p className="pf-hl-title">Multiple Learning Modes</p>
                    <p className="pf-hl-sub">Study, quiz, practice</p>
                  </div>
                </div>
                <div className="pf-hl">
                  <div className="pf-hl-icon">📊</div>
                  <div>
                    <p className="pf-hl-title">Progress Tracking</p>
                    <p className="pf-hl-sub">See how far you've come</p>
                  </div>
                </div>
              </div>

              <div className="tags" style={{ marginTop: '1.5rem' }}>
                <span>React Native</span>
                <span>Node.js</span>
                <span>Express.js</span>
                <span>Redux Toolkit</span>
              </div>
            </div>

            <div className="pf-right">
              <div className="phone-mock phone-sm">
                <div className="phone-pill" />
                <div className="phone-screen">
                  <div className="screen-bar">
                    <div className="screen-avatar">AI</div>
                    <div>
                      <p className="screen-name">SmartLearn AI</p>
                      <p className="screen-status">● Online</p>
                    </div>
                  </div>
                  <div className="chat-area">
                    <div className="bubble bubble-ai">
                      <span className="bubble-label">AI Tutor</span>
                      <p>What subject would you like help with?</p>
                    </div>
                    <div className="bubble bubble-user"><p>Help me with Maths</p></div>
                    <div className="bubble bubble-ai">
                      <span className="bubble-label">AI Tutor</span>
                      <p>Great! Which topic — Algebra, Geometry, or Calculus?</p>
                    </div>
                  </div>
                  <div className="chat-input">
                    <span>Ask anything...</span>
                    <div className="send-btn">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More coming */}
          <div className="more-card reveal" ref={r}>
            <div className="more-left">
              <div className="more-dots"><span /><span /><span /></div>
              <div>
                <h4>More projects in the works</h4>
                <p>New apps and sites are being built. Yours could be next.</p>
              </div>
            </div>
            <button className="btn-primary" onClick={() => scrollTo('contact')}>
              Start Your Project →
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div className="container">
          <div className="about-wrap">
            <div className="about-left reveal" ref={r}>
              <div className="section-label">About</div>
              <h2>Who you're working with</h2>
              <p>
                I'm Rithish, a self-driven developer from India who loves building
                real products. I work closely with clients to understand their goals —
                not just the tech requirements — and build accordingly.
              </p>
              <p>
                Clear communication. Realistic timelines. Clean code.
                Whether you're a startup or a solo founder, I treat your
                project like it matters — because it does.
              </p>

              <div className="about-socials">
                <a href="https://www.instagram.com/app_devv/" target="_blank" rel="noreferrer" className="about-soc">Instagram ↗</a>
                <a href="https://www.linkedin.com/in/rithish-s-r-923576365/" target="_blank" rel="noreferrer" className="about-soc">LinkedIn ↗</a>
                <a href="https://x.com/Nexias_apps" target="_blank" rel="noreferrer" className="about-soc">Twitter ↗</a>
              </div>
            </div>

            <div className="about-right">
              <div className="stats-grid reveal" ref={r}>
                {[
                  { n: '3+', l: 'Years of experience', icon: '🗓' },
                  { n: '100%', l: 'Project ownership', icon: '🎯' },
                  { n: '24h', l: 'Average reply time', icon: '⚡' },
                  { n: '∞', l: 'Cups of coffee', icon: '☕' },
                ].map((s, i) => (
                  <div className="stat-box" key={i} ref={r}>
                    <span className="stat-icon">{s.icon}</span>
                    <span className="stat-n">{s.n}</span>
                    <span className="stat-l">{s.l}</span>
                  </div>
                ))}
              </div>

              <div className="why-box reveal" ref={r}>
                <h4>Why clients choose me</h4>
                <div className="why-grid">
                  {[
                    { icon: '🔒', t: 'Full ownership', s: 'One dev, end-to-end' },
                    { icon: '💬', t: 'Clear comms', s: 'Regular updates' },
                    { icon: '⏱', t: 'On time', s: 'Realistic timelines' },
                    { icon: '🧹', t: 'Clean code', s: 'Easy to maintain' },
                    { icon: '🚀', t: 'Fast delivery', s: '3 months or less' },
                    { icon: '🛠', t: 'Post-launch support', s: 'I don\'t disappear' },
                  ].map((w, i) => (
                    <div className="why-item" key={i}>
                      <span className="why-icon">{w.icon}</span>
                      <div>
                        <p className="why-title">{w.t}</p>
                        <p className="why-sub">{w.s}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section section-tinted">
        <div className="container">
          <div className="contact-wrap">
            <div className="contact-left reveal" ref={r}>
              <div className="section-label">Contact</div>
              <h2>Let's build something<br />great together.</h2>
              <p>
                Have a project in mind? Tell me about your idea and I'll
                get back to you within 24 hours — no pressure, just a conversation.
              </p>

              <div className="contact-steps">
                {[
                  'Reach out on any platform below',
                  'We discuss your project & goals',
                  'I send a proposal & timeline',
                  'We build & launch together',
                ].map((s, i) => (
                  <div className="cs-row" key={i}>
                    <div className="cs-num">{i + 1}</div>
                    <p>{s}</p>
                  </div>
                ))}
              </div>

              <div className="socials">
                <a href="https://www.instagram.com/app_devv/" target="_blank" rel="noreferrer">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  Instagram
                </a>
                <a href="https://www.linkedin.com/in/rithish-s-r-923576365/" target="_blank" rel="noreferrer">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
                <a href="https://x.com/Nexias_apps" target="_blank" rel="noreferrer">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4l16 16M4 20L20 4"/></svg>
                  X / Twitter
                </a>
              </div>
            </div>

            <div className="contact-right reveal" ref={r} style={{ transitionDelay: '0.12s' }}>
              <div className="contact-card">
                <div className="contact-card-header">
                  <span className="cc-emoji">👋</span>
                  <div>
                    <h4>Start a conversation</h4>
                    <p>I reply within 24 hours</p>
                  </div>
                </div>
                <div className="cc-divider" />
                <div className="cc-info-rows">
                  <div className="cc-row">
                    <span className="cc-row-icon">📍</span>
                    <div>
                      <p className="cc-row-label">Location</p>
                      <p className="cc-row-val">India (works worldwide)</p>
                    </div>
                  </div>
                  <div className="cc-row">
                    <span className="cc-row-icon">🕐</span>
                    <div>
                      <p className="cc-row-label">Availability</p>
                      <p className="cc-row-val">Open to new projects</p>
                    </div>
                  </div>
                  <div className="cc-row">
                    <span className="cc-row-icon">💼</span>
                    <div>
                      <p className="cc-row-label">Project types</p>
                      <p className="cc-row-val">Mobile apps & websites</p>
                    </div>
                  </div>
                  <div className="cc-row">
                    <span className="cc-row-icon">⏱</span>
                    <div>
                      <p className="cc-row-label">Typical timeline</p>
                      <p className="cc-row-val">1 – 3 months</p>
                    </div>
                  </div>
                </div>
                <button className="btn-primary cc-cta" onClick={() => window.open('https://www.instagram.com/app_devv/', '_blank')}>
                  Message on Instagram →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <button className="logo" onClick={() => scrollTo('hero')}>Nexias<span>Dev</span></button>
          <p>© 2026 Nexias Dev · Built with React</p>
          <div className="footer-links">
            <a href="https://www.instagram.com/app_devv/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/in/rithish-s-r-923576365/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://x.com/Nexias_apps" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
