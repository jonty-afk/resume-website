import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function About() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const storyText = "Hey, I’m Jonty! I’m a passionate developer who thrives on building innovative and efficient solutions. JavaScript has been my go-to language since I first got into coding, and I’ve been pushing my skills ever since. I use React to create dynamic, interactive web experiences and explore Web3 and blockchain to develop secure, cutting-edge systems. Lately, I’ve been diving into AI to tackle complex challenges and using TypeScript to keep my code structured and scalable Beyond coding, I love sci-fi movies and enjoy solving tough problems. Let’s build something amazing together!";
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Web3', level: 70 },
    { name: 'Blockchain', level: 65 },
    { name: 'AI', level: 60 },
    { name: 'TypeScript', level: 75 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.length = 10 + Math.random() * 20;
        this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) {
          this.x = 0;
          this.speedX *= -0.8;
        } else if (this.x > canvas.width) {
          this.x = canvas.width;
          this.speedX *= -0.8;
        }
        if (this.y < 0) {
          this.y = 0;
          this.speedY *= -0.8;
        } else if (this.y > canvas.height) {
          this.y = canvas.height;
          this.speedY *= -0.8;
        }
      }

      draw() {
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.speedX * this.length, this.y + this.speedY * this.length);
        ctx.stroke();
      }
    }

    for (let i = 0; i < 150; i++) {
      particlesRef.current.push(new Particle());
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update();
        particlesRef.current[i].draw();
      }

      requestAnimationFrame(animate);
    }
    animate();

    const handleMouseMove = (e) => {
      const dx = e.clientX - canvas.width / 2;
      const dy = e.clientY - canvas.height / 2;
      particlesRef.current.forEach(particle => {
        const angle = Math.atan2(dy, dx);
        particle.speedX += Math.cos(angle) * 0.03; // Slower influence
        particle.speedY += Math.sin(angle) * 0.03;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation variants for staggered content reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
        delayChildren: 0.3,  // Initial delay before starting
      },
    },
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="about">
      <canvas ref={canvasRef} className="holo-canvas"></canvas>

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
        className="about-content"
        style={{ zIndex: 2, textAlign: 'center', padding: '20px' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} style={{ color: '#c0c0e0', fontSize: '2.5em', marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>
          About Jonty
        </motion.h1>
        <motion.p variants={itemVariants} style={{ maxWidth: '700px', margin: '0 auto 20px', lineHeight: '1.8', fontFamily: 'Arial, sans-serif', color: '#c0c0e0' }}>
          {storyText}
        </motion.p>
        <motion.h2 variants={itemVariants} style={{ color: '#c0c0e0', fontSize: '1.8em', marginBottom: '15px', fontFamily: 'Arial, sans-serif' }}>
          Skill Levels
        </motion.h2>
        <motion.div variants={itemVariants} className="skill-bars" style={{ maxWidth: '700px', margin: '0 auto' }}>
          {skills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontFamily: 'Arial, sans-serif', color: '#c0c0e0' }}>{skill.name}</span>
                <span style={{ fontFamily: 'Arial, sans-serif', color: '#c0c0e0' }}>{skill.level}%</span>
              </div>
              <div style={{ width: '100%', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '5px', overflow: 'hidden' }}>
                <div
                  className="skill-bar-fill"
                  style={{
                    width: `${skill.level}%`,
                    height: '20px',
                    background: 'linear-gradient(45deg, #00cc00, #00e6e6)',
                    transition: 'width 0.5s ease',
                  }}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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

export default About;