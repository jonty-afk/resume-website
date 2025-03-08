import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Project data with updated GitHub links and image paths
const projects = [
  {
    title: 'Zenith Flow',
    description: 'ZenithFlow is a platform on the Solana blockchain that rewards users with Solana tokens. It combines real-time data visualization with flow management, offering a smooth and engaging experience through modern web technologies.',
    demo: 'https://zenithflow.live',
    image: '/resume.png', // Path to image in public folder
  },
  {
    title: 'Symbio Engine',
    description: 'SymbioEngine is an innovative platform that integrates AI and human collaboration to create evolving digital creations. Powered by advanced algorithms and React, it offers a seamless, interactive experience with a focus on creativity and growth.',
    github: 'https://github.com/jonty-afk/symbioengine',
    demo: 'https://symbioengine.xyz',
    image: '/resume-1.png', // Path to image in public folder
  },
];

function Projects() {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Digital grid with pulsing nodes
    const nodes = 50;
    const nodesArray = [];

    class Node {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.pulse = Math.random() * 0.5 + 0.5;
      }
      update() {
        this.pulse += (Math.random() - 0.5) * 0.02;
        if (this.pulse > 1) this.pulse = 1;
        if (this.pulse < 0.5) this.pulse = 0.5;
      }
      draw() {
        ctx.fillStyle = `rgba(0, 230, 230, ${this.pulse})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < nodes; i++) {
      nodesArray.push(new Node());
    }

    function animate() {
      ctx.fillStyle = 'rgba(10, 10, 26, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 230, 230, 0.1)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw nodes
      nodesArray.forEach(node => {
        node.update();
        node.draw();
      });

      requestAnimationFrame(animate);
    }

    const loadingTimeout = setTimeout(() => setIsLoading(false), 2000);
    animate();

    return () => clearTimeout(loadingTimeout);
  }, []);

  // Animation variants
  const loadingVariants = {
    hidden: { width: '0%' },
    visible: { width: '100%', transition: { duration: 1.5, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };

  const timelineVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: { scaleY: 1, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  return (
    <section className="projects" style={{ height: '100vh', overflow: 'hidden' }}>
      <canvas ref={canvasRef} className="holo-canvas"></canvas>
      {isLoading && (
        <motion.div
          className="loading-bar"
          variants={loadingVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '0%',
            height: '10px',
            background: 'linear-gradient(to right, #00e6e6, #ff3399)',
            borderRadius: '5px',
            boxShadow: '0 0 15px #00e6e6',
            zIndex: 3,
          }}
        />
      )}
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

      <motion.div
        className="projects-content"
        variants={containerVariants}
        initial="hidden"
        animate={isLoading ? 'hidden' : 'visible'}
        style={{ zIndex: 2, textAlign: 'center', padding: '20px', position: 'relative', height: '100%' }}
      >
        <h1 style={{ fontSize: '2.5em', marginBottom: '40px', fontFamily: 'Arial, sans-serif', textShadow: '0 0 15px #00e6e6', color: '#00e6e6' }}>
          My Projects
        </h1>
        <motion.div className="timeline" variants={timelineVariants} style={{ position: 'relative', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
          <div className="timeline-line" style={{ zIndex: -1 }}></div>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              variants={itemVariants}
              style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <div className="timeline-content">
                <div className="project-panel">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-details">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-links">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub size={20} /> Code
                      </a>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt size={20} /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <p style={{ color: '#c0c0e0', fontSize: '1em', marginTop: '20px', textShadow: '0 0 5px #00e6e6' }}>
          I am currently working on additional exciting projects, which will be featured here upon completion.
        </p>
      </motion.div>

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

export default Projects;