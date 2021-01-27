import React from 'react';
import './Header.css';

const Header = (props) =>{

  return (
        <header className="header">
          <p className="header-title">MERN-sää</p>
          {props.children}
        </header>
     
      );
  

};

export default Header;

