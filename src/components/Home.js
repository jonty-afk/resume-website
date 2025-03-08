import React, { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = '01JONTY';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(0);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 204, 0, 0.7)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5 + Math.random() * 0.5;
      }
    }

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home">
      <canvas ref={canvasRef} className="matrix-rain"></canvas>

      <div className="menu">
        <div className="menu-item">
          <Link to="/">Home</Link>
        </div>
        <div className="menu-item">
          <Link to="/about">About</Link>
        </div>
        <div className="menu-item">
          <Link to="/projects">Projects</Link>
        </div>
        <div className="menu-item">
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <div className="hero">
        <h1 className="title">Hi, I'm Jonty</h1>
        <span className="typed-text">Full-Stack Developer | Web3 Enthusiast</span>
        <div className="terminal-bio">
          <span className="bio-text">
            I’m a <span className="highlight">developer</span> who loves building <span className="highlight">cool</span>, <span className="highlight">efficient</span>, and <span className="highlight">scalable</span> <span className="highlight">web applications</span>. Whether it’s <span className="highlight">JavaScript</span>, <span className="highlight">React</span>, or diving into <span className="highlight">Web3</span>, I’m always exploring new ways to create <span className="highlight">better experiences</span>.

            <br />
            Check out my <span className="highlight">projects</span>—more are on the way!
            <span className="cursor"></span>
          </span>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="social-links">
            <a href="https://github.com/rishabh2496" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
            <a href="https://github.com/jonty-afk" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com/in/rishabhsharma" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Home;