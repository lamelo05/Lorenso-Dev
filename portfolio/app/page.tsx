'use client';

import styles from "./page.module.css";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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

    const elements = document.querySelectorAll(`.${styles.reveal}`);
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
          </div>
        </nav>

        <header className={styles.header}>
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

        <section id="projects" className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>Featured Projects</h2>
          <div className={styles.grid}>
            {/* Project 1 */}
            <div className={`${styles.card} glass glass-interactive ${styles.reveal}`}>
              <h3>AI Image Generator</h3>
              <p>A full-stack application leveraging diffusion models to generate high-quality images from text prompts.</p>
              <div className={styles.tags}>
                <span className={styles.tag}>Python</span>
                <span className={styles.tag}>FastAPI</span>
                <span className={styles.tag}>React</span>
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

        <section id="contact" className={styles.section} style={{ paddingBottom: '2rem' }}>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>Get in Touch</h2>
          <div className={`${styles.card} glass ${styles.reveal} ${styles.delay100}`} style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', alignItems: 'center' }}>
            <p>I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
            <a href="mailto:ramegah84@gmail.com" className={`${styles.cta} glass glass-interactive`} style={{ marginTop: '2rem', padding: '0.8rem 1.5rem' }}>
              Say Hello
            </a>
          </div>
        </section>

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
          © {new Date().getFullYear()} Lorenso. Engineered with Next.js.
        </footer>
      </div>
    </>
  );
}
