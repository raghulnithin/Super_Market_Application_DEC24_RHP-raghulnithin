import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaInfoCircle } from 'react-icons/fa';
import styles from './Navbar.module.css'; // Use your CSS module for styling

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">
            <FaShoppingCart style={{ marginRight: '4px' }} />
            Cart
          </Link>
        </li>
        <li>
          <Link to="/login">
            <FaUser style={{ marginRight: '4px' }} />
            Login
          </Link>
        </li>
        <li>
          <Link to="/details">
            <FaInfoCircle style={{ marginRight: '4px' }} />
            View Details
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
