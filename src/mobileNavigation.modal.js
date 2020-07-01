import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import './mobileNavigation.modal.css';
import { JOG_LIST_ROUTE, INFO_ROUTE, CONTACT_US_ROUTE } from './contants';
import logo from './assets/logo.png';
import logoX2 from './assets/logo@2x.png';
import logoX3 from './assets/logo@3x.png';
import cancelIcon from './assets/cancel-grey.svg';

export const MobileNavigation = ({ cancel }) => (
  <div className='mobile-modal-layout'>
    <div className='mobile-modal-header'>
      <img className='modal-logo' src={logo} alt='' srcSet={`${logo}, ${logoX2} 2x, ${logoX3} 3x`}/>
      <button className='mobile-cancel-btn' onClick={cancel}>
        <img src={cancelIcon} alt='X'/>
      </button>
    </div>
    <div className='mobile-routes-list' onClick={cancel}>
      <HashRouter>
        <NavLink className='mobile-link'
          activeClassName='active-mobile-link'
          to={JOG_LIST_ROUTE}>JOGS</NavLink>
        <NavLink className='mobile-link'
          activeClassName='active-mobile-link'
          to={INFO_ROUTE}>INFO</NavLink>
        <NavLink className='mobile-link'
          activeClassName='active-mobile-link'
          to={CONTACT_US_ROUTE}>CONTACT US</NavLink>
      </HashRouter>
    </div>
  </div>
);