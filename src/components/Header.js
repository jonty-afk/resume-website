import React from 'react';
import { NavLink } from 'react-router-dom'; // Replace Link with NavLink
import { motion } from 'framer-motion';

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Rishabh Sharma</h1>
      <nav>
        <NavLink to="/" exact activeClassName="active">Home</NavLink>
        <NavLink to="/about" activeClassName="active">About</NavLink>
        <NavLink to="/projects" activeClassName="active">Projects</NavLink>
        <NavLink to="/contact" activeClassName="active">Contact</NavLink>
      </nav>
    </motion.header>
  );
}

export default Header;