import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css'; // Přejmenovaný CSS soubor pro Sidebar

function SideBar() {
  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        {/* ... vaše stávající odkazy ... */}

        {/* Sekce doporučených kanálů */}
        <div className="recommended-channels">
          <h2>Doporučené kanály</h2>
          <ul className="channels-list">
            {/* Příklad kanálu */}
            <li className="channel">
              <Link to="/channel/agraelus">
                <img src="agraelus-avatar.jpg" alt="Agraelus" />
                <span>Agraelus</span>
              </Link>
            </li>
            {/* Další kanály... */}
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export default SideBar;
