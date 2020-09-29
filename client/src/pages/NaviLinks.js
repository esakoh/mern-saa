//headerin linkit

import React from 'react';
import { NavLink} from 'react-router-dom';
import Header from './Header';

import './NaviLinks.css';


const NaviLinks = () => {
    return ( 
      
      <Header>
    <ul className="nav-links">
    <li>
      
           <NavLink to="/" activeStyle={{textDecoration: "underline"}} exact>PÄIVÄN SÄÄ</NavLink>
           </li><li>
           <NavLink to="/five/" activeStyle={{textDecoration: "underline"}}>VIIDEN PÄIVÄN ENNUSTE</NavLink>     
           </li><li>
           <NavLink to="/history/" activeStyle={{textDecoration: "underline"}}>SÄÄHISTORIA</NavLink>
           </li>
        
    
    </ul>
    </Header>
    );
   
   }


export default NaviLinks;