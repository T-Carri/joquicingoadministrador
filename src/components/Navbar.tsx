import  { useState } from 'react';
import './Navbar.css';
import { FiSearch, FiBell, FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle">
          <FiMenu size={24} />
        </button>
        <h2 className="page-title">Dashboard</h2>
      </div>
      <div className={`navbar-search ${searchOpen ? 'open' : ''}`}>
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="navbar-right">
        <button className="search-toggle" onClick={() => setSearchOpen(!searchOpen)}>
          <FiSearch size={20} />
        </button>
        <button className="notification">
          <FiBell size={20} />
          <span className="badge">3</span>
        </button>
        <div className="user-avatar">
          <span>AD</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;