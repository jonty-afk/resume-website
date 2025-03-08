import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Contact() {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const buildings = [];
    const numBuildings = 30;

    class Building {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.height = Math.random() * 200 + 50;
        this.width = Math.random() * 50 + 20;
        this.y = canvas.height - this.height;
      }
      draw() {
        ctx.strokeStyle = 'rgba(0, 230, 230, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
      }
    }

    for (let i = 0; i < numBuildings; i++) {
      buildings.push(new Building());
    }

    const globeRadius = 100;
    const globeX = canvas.width / 2;
    const globeY = canvas.height / 2 - 50;
    let globeAngle = 0;

    const markerLat = -41; 
    const markerLon = 174; 
    let markerPulse = 0.5;

    function animate() {
      ctx.fillStyle = 'rgba(10, 10, 26, 0.9)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      buildings.forEach(building => building.draw());


      ctx.beginPath();
      ctx.arc(globeX, globeY, globeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 230, 230, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      for (let i = -90; i <= 90; i += 30) {
        const latRad = (i * Math.PI) / 180;
        const r = globeRadius * Math.cos(latRad);
        const y = globeY + globeRadius * Math.sin(latRad);
        ctx.beginPath();
        ctx.arc(globeX, y, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 230, 230, 0.2)';
        ctx.stroke();
      }

      for (let i = 0; i < 360; i += 45) {
        const lonRad = (i * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(globeX, globeY - globeRadius);
        for (let lat = -90; lat <= 90; lat += 5) {
          const latRad = (lat * Math.PI) / 180;
          const r = globeRadius * Math.cos(latRad);
          const x = globeX + r * Math.sin(lonRad);
          const y = globeY + globeRadius * Math.sin(latRad);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(0, 230, 230, 0.2)';
        ctx.stroke();
      }

      globeAngle += 0.01;


      const latRad = (markerLat * Math.PI) / 180;
      const lonRad = (markerLon * Math.PI) / 180 + globeAngle;
      const r = globeRadius * Math.cos(latRad);
      const markerX = globeX + r * Math.sin(lonRad);
      const markerY = globeY + globeRadius * Math.sin(latRad);

      markerPulse += (Math.random() - 0.5) * 0.02;
      if (markerPulse > 1) markerPulse = 1;
      if (markerPulse < 0.5) markerPulse = 0.5;

      ctx.beginPath();
      ctx.arc(markerX, markerY, 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 51, 153, ${markerPulse})`;
      ctx.fill();

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
    <section className="contact" style={{ height: '100vh', overflow: 'hidden' }}>
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
        className="contact-content"
        variants={containerVariants}
        initial="hidden"
        animate={isLoading ? 'hidden' : 'visible'}
        style={{ zIndex: 2, textAlign: 'center', padding: '20px', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <motion.h1 variants={itemVariants} style={{ fontSize: '2.5em', marginBottom: '30px', fontFamily: 'Arial, sans-serif', textShadow: '0 0 15px #00e6e6', color: '#00e6e6' }}>
          Let’s Connect
        </motion.h1>
        <motion.div variants={itemVariants} className="contact-details" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ color: '#c0c0e0', fontSize: '1.2em', marginBottom: '20px', textShadow: '0 0 5px #00e6e6' }}>
          I’m eager to collaborate on innovative projects and explore new opportunities. Feel free to reach out!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <a href="tel:+64211759393" style={{ color: '#00e6e6', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.1em', textShadow: '0 0 5px #00e6e6' }}>
              <FaPhone size={20} /> +64 21 175 9393
            </a>
            <a href="mailto:jonty9696@gmail.com" style={{ color: '#00e6e6', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.1em', textShadow: '0 0 5px #00e6e6' }}>
              <FaEnvelope size={20} /> jonty9696@gmail.com
            </a>
          </div>
        </motion.div>
        <motion.p variants={itemVariants} style={{ color: '#ff3399', fontSize: '1.5em', marginTop: '30px', textShadow: '0 0 10px #ff3399', fontStyle: 'italic' }}>
          Let’s Build the Future Together!
        </motion.p>
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

export default Contact;