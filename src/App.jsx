import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Github, Linkedin, Twitter, Mail, Code2, Zap, Shield, Menu, X, Instagram, LucideTwitter } from 'lucide-react';
import './App.css';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const services = [
    {
      icon: Code2,
      title: 'Mobile Apps',
      description: 'Production-grade Android apps that users love',
      tags: ['React Native']
    },
    {
      icon: Zap,
      title: 'Web Development',
      description: 'Lightning-fast, scalable web applications built with modern tech',
      tags: ['React', 'Next.js']
    },
  ];

  const projects = [
    {
      title: 'SmartLearn AI',
      category: 'Mobile App',
      description: 'User can chat with AI tutors and also it have multiple features',
      tech: ['React Native', 'Express js', 'Node js', 'Redux-toolkit'],
      color: 'cyan'
    },
  ];


  const getGradientColor = (color) => {
    const colors = {
      cyan: 'linear-gradient(135deg, rgb(6, 182, 212), rgb(59, 130, 246))',
      purple: 'linear-gradient(135deg, rgb(168, 85, 247), rgb(236, 72, 153))',
      green: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(16, 185, 129))',
      red: 'linear-gradient(135deg, rgb(239, 68, 68), rgb(249, 115, 22))'
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className="app-container">
      {/* Animated background
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div> */}

      {/* Content wrapper */}
      <div className="content-wrapper">
        {/* Navigation */}
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-brand">
              <div className="brand-text">Nexias_apps</div>
            </div>

            {/* Desktop Menu */}
            <div className="desktop-menu">
              <button onClick={() => scrollToSection('services')} className="nav-link">
                Services
              </button>
              <button onClick={() => scrollToSection('work')} className="nav-link">
                Work
              </button>
              <button onClick={() => scrollToSection('contact')} className="nav-link">
                Contact
              </button>
            </div>

            {/* Desktop CTA */}
            <button
              onClick={() => scrollToSection('contact')}
              className="cta-button desktop-only"
            >
              Let's Talk
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-button"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mobile-menu">
              <div className="mobile-menu-content">
                <button onClick={() => scrollToSection('services')} className="mobile-nav-link">
                  Services
                </button>
                <button onClick={() => scrollToSection('work')} className="mobile-nav-link">
                  Work
                </button>
                <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">
                  Contact
                </button>
                
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            {/* Badge */}
            <div className="hero-badge animate-fade-in">
              <div className="badge-dot"></div>
              <span>Available for projects</span>
            </div>

            {/* Main Heading */}
            <h1 className="hero-title animate-fade-in-delayed-1">
              <span className="title-white">Turn Ideas Into</span>
              <span className="title-gradient">Exceptional Apps</span>
            </h1>

            {/* Subheading */}
            <p className="hero-description animate-fade-in-delayed-2">
              Full-stack developer crafting beautiful mobile apps, lightning-fast web platforms, and scalable systems. From concept to launch in 3 months or less.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons animate-fade-in-delayed-3">
              <button
                onClick={() => scrollToSection('work')}
                className="btn btn-primary"
              >
                View My Work
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn btn-secondary"
              >
                Start a Project
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
              <ChevronDown size={24} />
            </div>
          </div>
        </section>



        {/* Services Section */}
        <section id="services" className="services-section">
          <div className="section-container">
            <div className="section-header animate-fade-in">
              <h2>What I Build</h2>
              <p>Specializing in full-stack development with a focus on user experience and scalability</p>
            </div>

            <div className="services-grid">
              {services.map((service, i) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={i}
                    className="service-card animate-fade-in"
                    style={{ animationDelay: `${0.1 * i}s` }}
                  >
                    <div className="service-icon">
                      <IconComponent size={32} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="tags">
                      {service.tags.map((tag, j) => (
                        <span key={j} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="work" className="portfolio-section">
          <div className="section-container">
            <div className="section-header animate-fade-in">
              <h2>Recent Projects</h2>
              <p>A selection of projects that showcase my ability to deliver high-quality, user-focused applications</p>
            </div>

            <div className="portfolio-grid">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="project-card animate-fade-in"
                  style={{ animationDelay: `${0.1 * i}s` }}
                >
                  <div className="project-gradient" style={{ background: getGradientColor(project.color) }}></div>
                  <div className="project-content">
                    <div className="project-header">
                      <div>
                        <span className="project-category">{project.category}</span>
                        <h3>{project.title}</h3>
                      </div>
                      <div className="project-badge" style={{ background: getGradientColor(project.color) }}></div>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="project-tech">
                      {project.tech.map((tech, j) => (
                        <span key={j} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="project-link">
                      <span>View Project</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="cta-section">
          <div className="cta-container">
            <h2 className="animate-fade-in">Ready to Build Something Great?</h2>
            <p className="animate-fade-in-delayed-1">
              Let's discuss your project and create something amazing together
            </p>
            <div className="social-links animate-fade-in-delayed-2">
              <a href="https://www.instagram.com/app_devv/?__pwa=1" target="_blank" rel="noopener noreferrer" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/rithish-s-r-923576365/" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href="https://x.com/Nexias_apps" target="_blank" rel="noopener noreferrer" className="social-link">
                <LucideTwitter size={20} />
              </a>
              <a href="" className="social-link">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-brand">
              <div className="brand-text">Nexias_apps</div>
            </div>
            <p>© 2026 Nexias Dev. All rights reserved.</p>
            <div className="footer-links">
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a href="#sitemap">Sitemap</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}