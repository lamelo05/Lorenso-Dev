'use client';

import styles from "./page.module.css";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Curly twisting scroll-indicator arrow
function ScrollArrow() {
  return (
    <div className={styles.scrollArrowWrapper}>
      <svg
        className={styles.scrollArrowSvg}
        viewBox="0 0 70 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left-to-down curly S-twist: starts upper-left, curves to lower-right */}
        <path
          className={styles.scrollArrowPath}
          d="M10 5 C10 30, 55 25, 45 50 C35 75, 10 68, 20 88"
          stroke="url(#arrowGradL)"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrowhead pointing down-right */}
        <path
          className={styles.scrollArrowPath}
          d="M10 80 L20 94 L32 82"
          stroke="url(#arrowGradL)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <defs>
          <linearGradient id="arrowGradL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = "Software & Machine Learning Engineer";
    let timer: ReturnType<typeof setTimeout>;
    
    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
      } else {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length - 1));
        }, 30);
      }
    } else {
      if (text === fullText) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length + 1));
        }, 100);
      }
    }
    
    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.active);
          // Optional: stop observing once revealed
          // observerRef.current?.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: "0px 0px -50px 0px" // Trigger slightly before crossing the bottom
    });

    const elements = document.querySelectorAll(`.${styles.reveal}, .${styles.scrollArrowWrapper}`);
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <div className={styles.background}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
      </div>

      <div className={styles.container}>
        <nav className={`${styles.navbar} glass`}>
          <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>Lorenso.DEV</div>
          <div className={styles.navLinks}>
            <Link href="#about" className={styles.navLink}>About</Link>
            <Link href="#projects" className={styles.navLink}>Projects</Link>
            <Link href="#technologies" className={styles.navLink}>Technologies</Link>
            <Link href="#contact" className={styles.navLink}>Contact</Link>
            <a href="https://github.com/lamelo05" target="_blank" rel="noopener noreferrer" className={styles.navLink}>GitHub</a>
          </div>
        </nav>

        <header className={styles.header}>
          <div className={styles.reveal}>
            <img 
              src="/hero-logo.png"
              alt="Hero Logo"
              style={{ borderRadius: '50px', marginBottom: '2rem', maxWidth: '100%', width: '400px' }}
              className={styles.bounce}
            />
          </div>
          <h1 className={`${styles.title} ${styles.reveal}`} style={{ minHeight: '1.2em' }}>
            {text}
            <span className={styles.blinkingCursor}>|</span>
          </h1>
          <p className={`${styles.subtitle} ${styles.reveal} ${styles.delay100}`}>
            Bridging the gap between scalable software architecture and advanced data-driven intelligence. I build things that make an impact.
          </p>
          <div className={`${styles.reveal} ${styles.delay200}`}>
            <Link href="#projects" className={`${styles.cta} glass glass-interactive`}>
              View My Work
            </Link>
          </div>
        </header>

        <ScrollArrow />

        <section id="about" className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>About Me</h2>
          <div className={`${styles.card} glass ${styles.reveal} ${styles.delay100}`} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p>
              I am a passionate software engineer specializing in both full-stack development and machine learning. I enjoy taking complex problems and building elegant, optimal solutions, whether that involves creating a robust backend service or training a predictive model.
            </p>
            <div className={styles.tags} style={{ marginTop: '2rem' }}>
              <span className={styles.tag}>Python</span>
              <span className={styles.tag}>TypeScript</span>
              <span className={styles.tag}>React / Next.js</span>
              <span className={styles.tag}>PyTorch / TensorFlow</span>
              <span className={styles.tag}>Node.js</span>
              <span className={styles.tag}>SQL / NoSQL</span>
              <span className={styles.tag}>AWS / Cloud</span>
            </div>
          </div>
        </section>

        <ScrollArrow />

        <section id="projects" className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>Featured Projects</h2>
          <div className={styles.grid}>
            {/* Project 1 */}
            <div className={`${styles.card} glass glass-interactive ${styles.reveal}`}>
              <h3>Sensitive</h3>
              <p>sensitive is a browser extension that shields your eye intensively from unwanted content on the internet</p>
              <div className={styles.tags}>
                <span className={styles.tag}>HTML</span>
                <span className={styles.tag}>CSS</span>
                <span className={styles.tag}>JavaScript</span>
                <span className={styles.tag}>Chrome API</span>
                <span className={styles.tag}>JSON</span>
                 <a href="https://github.com/lamelo05/Sensitive" target="_blank" rel="noopener noreferrer" className={`${styles.cta} glass glass-interactive`} style={{ marginTop: '2rem', padding: '0.8rem 1.5rem' }}>
              💬 Check it out on GitHub
            </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className={`${styles.card} glass glass-interactive ${styles.reveal} ${styles.delay100}`}>
              <h3>Predictive Analytic Dashboard</h3>
              <p>An enterprise dashboard integrating real-time data streams and predictive ML models for supply chain optimization.</p>
              <div className={styles.tags}>
                <span className={styles.tag}>Next.js</span>
                <span className={styles.tag}>TimeSeries</span>
                <span className={styles.tag}>PostgreSQL</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className={`${styles.card} glass glass-interactive ${styles.reveal} ${styles.delay200}`}>
              <h3>Scalable E-commerce API</h3>
              <p>A microservices-based API designed for high availability and low latency during peak traffic periods.</p>
              <div className={styles.tags}>
                <span className={styles.tag}>Node.js</span>
                <span className={styles.tag}>Redis</span>
                <span className={styles.tag}>Docker</span>
              </div>
            </div>
          </div>
        </section>

        <ScrollArrow />

        <section id="contact" className={styles.section} style={{ paddingBottom: '2rem' }}>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>Get in Touch</h2>
          <div className={`${styles.card} glass ${styles.reveal} ${styles.delay100}`} style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', alignItems: 'center' }}>
            <p>I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
            <a href="https://wa.me/+233260839456" target="_blank" rel="noopener noreferrer" className={`${styles.cta} glass glass-interactive`} style={{ marginTop: '2rem', padding: '0.8rem 1.5rem' }}>
              💬 Say Hello on WhatsApp
            </a>
          </div>
        </section>

        <ScrollArrow />

        <section id="technologies" className={`${styles.adArea} ${styles.reveal} ${styles.delay100}`}>
          <h3 className={styles.adTitle}>Technologies I Work With</h3>
          <div className={styles.adFlex}>
            <div className={styles.adItem}>
              <div className={styles.iconWrapper}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" />
              </div>
              <span className={styles.adText}>Python</span>
            </div>
            <div className={styles.adItem}>
              <div className={styles.iconWrapper}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" />
              </div>
              <span className={styles.adText}>TypeScript</span>
            </div>
            <div className={styles.adItem}>
              <div className={styles.iconWrapper}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" />
              </div>
              <span className={styles.adText}>React</span>
            </div>
            <div className={styles.adItem}>
              <div className={styles.iconWrapper}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js" style={{ filter: 'invert(1)' }} />
              </div>
              <span className={styles.adText}>Next.js</span>
            </div>
            <div className={styles.adItem}>
              <div className={styles.iconWrapper}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" alt="PyTorch" />
              </div>
              <span className={styles.adText}>PyTorch</span>
            </div>
            <div className={styles.adItem}>
              <div className={styles.iconWrapper}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" />
              </div>
              <span className={styles.adText}>TensorFlow</span>
            </div>
            <div className={styles.adItem}>
              <div className={styles.iconWrapper}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" />
              </div>
              <span className={styles.adText}>Node.js</span>
            </div>
            <div className={styles.adItem}>
              <div className={styles.iconWrapper}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" />
              </div>
              <span className={styles.adText}>SQL</span>
            </div>
            <div className={styles.adItem}>
              <div className={styles.iconWrapper}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS" style={{ filter: 'invert(1) brightness(2)' }} />
              </div>
              <span className={styles.adText}>AWS</span>
            </div>
          </div>
        </section>

        <footer className={`${styles.footer} ${styles.reveal} ${styles.delay200}`}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="https://github.com/Lamelo05" target="_blank" rel="noopener noreferrer" style={{ transition: 'opacity 0.2s', opacity: 0.8 }} onMouseOver={(e) => e.currentTarget.style.opacity = '1'} onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" style={{ width: '28px', height: '28px', filter: 'invert(1)' }} />
            </a>
          </div>
          © {new Date().getFullYear()} Lorenso. Engineered with Next.js.
        </footer>
      </div>
    </>
  );
}
