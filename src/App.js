import React from 'react';
import { HashRouter, Route, NavLink, Redirect } from 'react-router-dom';
import { Login } from './components/login.component.js';
import { JogList } from './components/jogList.component.js';
import { Info } from './components/info.component.js';
import { NothingHere } from './components/nothingHere.component.js';
import { MobileNavigation } from './mobileNavigation.modal.js';
import './App.css';
import { JOG_LIST_ROUTE, ROOT_ROUTE, INFO_ROUTE, CONTACT_US_ROUTE, TOKEN_LOCATION } from './contants.js';
import logo from './assets/logo.svg';
import filterIcon from './assets/filter.svg';
import activeFilterIcon from './assets/filter-active.svg';
import menuIcon from './assets/menu.png';
import menuIcon2x from './assets/menu@2x.png';
import menuIcon3x from './assets/menu@3x.png';


function App() {

  const [ filter, setFilter ] = React.useState(false);
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ mobileModal, showMobileModal ] = React.useState(false)

  React.useEffect(() => {
    setLoggedIn(!!localStorage.getItem(TOKEN_LOCATION));
  }, [])

  return (
    <React.Fragment>
      <header>
        <img src={logo} alt=''/>
        {loggedIn ?
          <>
          <div className='navigation-layout'>
            <HashRouter>
              <NavLink to={JOG_LIST_ROUTE} className='link' activeClassName='active-link'>JOGS</NavLink>
              <NavLink to={INFO_ROUTE} className='link' activeClassName='active-link'>INFO</NavLink>
              <NavLink to={CONTACT_US_ROUTE} className='link' activeClassName='active-link'>CONTACT US</NavLink>
            </HashRouter>
            <button className='filter-btn' onClick={() => setFilter(!filter)}>
              {filter ?
                <img src={activeFilterIcon} alt='Filter active'/> :
                <img src={filterIcon} alt='Filter'/>}
            </button>
            <button className='navigation-btn' onClick={() => showMobileModal(true)}>
              <img src={menuIcon} alt='Menu'
                srcSet={`${menuIcon}, ${menuIcon2x} 2x, ${menuIcon3x} 3x`}/>
            </button>
          </div>
          </>: null}
      </header>
      <main>
        <HashRouter>
        <Route exact path={ROOT_ROUTE}>
          {loggedIn ? <Redirect to={JOG_LIST_ROUTE}/> : <Login onLogin={setLoggedIn}/>}
        </Route>
        <Route path={JOG_LIST_ROUTE}>
          {loggedIn ? <JogList filter={filter}/> : <Redirect to={ROOT_ROUTE}/>}
        </Route>
        <Route path={INFO_ROUTE}>
          <Info/>
        </Route>
        <Route path={CONTACT_US_ROUTE}>
          <div className='contact-us-layout'>
            <NothingHere/>
          </div>
        </Route>
      </HashRouter>
      </main>
      {mobileModal ? <MobileNavigation cancel={() => showMobileModal(false)}/> : null}
    </React.Fragment>
  );
}

export default App;
