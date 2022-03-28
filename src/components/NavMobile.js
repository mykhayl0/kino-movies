// NavMobile controls the navigation panel on mobile devices.

import './NavMobile.styles.scss';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import aboutIcon from '../assets/aboutIcon.svg';
import favouritesIcon from '../assets/favouritesIcon.svg';
import homeIcon from '../assets/homeIcon.svg';
import kinoLogoWide from '../assets/kino-logo-wide.svg';
import xIcon from '../assets/x-circle.svg';
import Overlay from './Overlay';

// NavMobile accepts two params open & onClose. 
export default function NavMobile({ open, onClose }) {
  // Return the current URL of the browser.
  const location = useLocation();

  // Run whenever open is passed. 
  useEffect(() => {
    // If the NavMobile is open, add the class to the body of no-overflow.
    if(open){
      document.body.classList.add('no-overflow');
      // Otherwise, remove the class of no-overflow.
    }else{
      document.body.classList.remove('no-overflow');
    }
  },[open]);

  return (
    <>
    {/* If the the NavPanel is open, the pass a className of open, otherwise, keep the same. */}
      <div className={open ? 'nav-panel open' : 'nav-panel'}>
        <div>
          <div className='close-button'>
            {/* Listen to any clicks on the close button, and pass the onClose param. */}
            <button onClick={onClose} className="x-icon"><img src={xIcon} alt="Close panel."/></button>
          </div>

          <nav className='nav-wrapper'>
            <div className='nav-icons'>
              {/* When onClick = onClose, then send the user to the home page. Set the a tag with class name selected. */}
              <Link
                onClick={onClose}
                className={location.pathname === '/' ? 'selected' : undefined}
                to="/"
              >
                <img src={homeIcon} alt="Return home."/> Home
              </Link>
            </div>

            <div className='nav-icons'>
              {/* When onClick = onClose, then send the user to the favourites page. Set the a tag with class name selected. */}
              <Link
                onClick={onClose}
                className={location.pathname === '/favourites' ? 'selected' : undefined}
                to="/favourites"
              >
                <img src={favouritesIcon} alt="Favourites page." /> Favourites
              </Link>
            </div>

            <div className='nav-icons'>
              {/* When onClick = onClose, then send the user to the about page. Set the a tag with class name selected. */}
              <Link
                onClick={onClose}
                className={location.pathname === '/about' ? 'selected' : undefined}
                to="/about"
              >
                <img src={aboutIcon} alt="About page." />  About Kino
              </Link>
            </div>
          </nav>
        </div>

        <div className='logo-wide'>
          <img src={kinoLogoWide} alt="Kino Logo wide." />
        </div>
      </div>
      {/* Control when the overlay is visible, when open is passed into the NavMobile function. */}
      <Overlay visible={open} />
    </>
  );
}
