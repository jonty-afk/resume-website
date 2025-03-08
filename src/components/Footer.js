import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="footer"
    >
      <div className="footer-content">
        <p>&copy; 2025 Rishabh Sharma</p>
        <div className="social-links">
          <motion.a
            href="https://github.com/rishabh2496"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#00ff00' }}
          >
            <FaGithub size={24} />
          </motion.a>
          <motion.a
            href="https://github.com/jonty-afk"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#00ff00' }}
          >
            <FaGithub size={24} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/rishabhsharma" // Replace with your real LinkedIn
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#00ff00' }}
          >
            <FaLinkedin size={24} />
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;