import React from 'react';
import '../../css/Menu.css'; 
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Menu = ({ isMenuOpen, toggleMenu, toggleFontSize, isIncreased, toggleTheme, isBlackAndWhite, toggleFontFamily, toggleHighlightLinks }) => {
  return (
    <div className="menu-container">
      <div className="icon-container" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      {isMenuOpen && (
        <div className="popup-menu">
          <ul>
            <li><button onClick={toggleFontSize}>{isIncreased ? 'Font Size' : 'Font Size'}</button></li>
            <li><button onClick={toggleTheme}>{isBlackAndWhite ? 'Theme' : 'Theme'}</button></li>
            <li><button onClick={toggleFontFamily}>Font</button></li>
            <li><button onClick={toggleHighlightLinks}>Links</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;