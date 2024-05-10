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
            <li><button onClick={toggleFontSize}>{isIncreased ? 'Max' : 'Min'}</button></li>
            <li><button onClick={toggleTheme}>{isBlackAndWhite ? 'Dark' : 'Light'}</button></li>
            <li><button onClick={toggleFontFamily}>Dyslexia</button></li>
            <li><button onClick={toggleHighlightLinks}>Links</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;