// Control the functionality of the header for mobile displays.

import { Link } from 'react-router-dom';
import { useState } from 'react';

import kinoIcon from '../assets/kinoIcon.svg';
import kinoIconWide from '../assets/kino-logo-wide.svg';
import './HeaderMobile.styles.scss';
import NavMobile from './NavMobile';

export default function HeaderMobile() {
  // Control the state of the navigation when it's open, by default false.
  const [navOpen, setNavOpen] = useState(false);

  // Handle this when the hamburger icon is clicked.
  const hamburgerClickHandler = () => {
    // If the nav is already open, then setNavOpen to false to close it.
    if(navOpen){
      setNavOpen(false);
      // If the nav is not open, the setNavOpen to true to open it.
    }else{
      setNavOpen(true);
    }
  };

  // Control the state of Nav when the user selects a Link. Example, they click home, the nav panel will contract.
  const closeNavHandler = () => {
    setNavOpen(false);
  };

  return (
    <> 
    {/* Control whether the NavMobile component opens or closes, based on their attributes. */}
      <NavMobile open={navOpen} onClose={closeNavHandler}/>

      <header className="header-menu">
        {/* When the user clicks any of the nav button, then call the hamburgerClickHandler() */}
        <button className="hamburger-button" onClick={hamburgerClickHandler}>
          <div/>
          <div/>
          <div/>
        </button>

        <Link to="/">
          <img className="kino-logo-home-short" src={kinoIcon} alt="Return home." />
          <img className="kino-logo-home-wide" src={kinoIconWide} alt="Return home." />
        </Link>
      </header>
    </>
  )
}