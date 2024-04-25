import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Logo from '../../media/logo.png';
import UserIcon from '../../media/user.png';
import SearchIcon from '../../media/magnifying-glass.png';

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand"><img src={Logo} alt="Logo" className="logo"></img></Link>
      
      <div className="navbar-search">
        <input type="text" className="search-input" placeholder="Vyhledat videa..."/>
        <Link to="/search" className="search-button"><img src={SearchIcon} height="20" width="20" alt="Search"/></Link>
      </div>

      <div className="navbar-links">
        <Link to="/services" className="nav-link login">Přihlásit se</Link>
        <Link to="/contact" className="nav-link register">Zaregistrovat</Link>
        <Link to="/about" className="nav-link nav-link--user-icon"><img src={UserIcon} alt="UserIcon" className="user-icon"></img></Link>
      </div>
    </nav>
  );
}

export default NavBar;
