// NavDesktop controls the navigation panel on mobile devices.

import { Link, useLocation } from 'react-router-dom';

import './NavDesktop.styles.scss';
import kinoIconWide from '../assets/kino-logo-wide-no-space.svg';

export default function NavDesktop() {
  // Return the current page URL.
  const location = useLocation();
  return (
    <>
      <nav className='nav-wrapper-desktop'>
        <div className='nav-icons-desktop'>
          {/* When the user clicks on Home, then send the user to home. Set the a tag to selected. */}
          <Link
            className={location.pathname === '/' ? 'selected' : undefined}
            to="/"
          >Home
          </Link>

          <Link
            // When the user clicks on Favourites, then send the user to the favourites page. Set the a tag to selected.
            className={location.pathname === '/favourites' ? 'selected' : undefined}
            to="/favourites"
          >Favourites
          </Link>

          <Link
          // When the user clicks on About, then send the user to the about page. Set the a tag to selected.
            className={location.pathname === '/about' ? 'selected' : undefined}
            to="/about"
          >About
          </Link>
        </div>

        <Link 
          to="/"
          className='desktop-logo'>
          <img className="kino-logo-home-wide" src={kinoIconWide} alt="Return home." />
        </Link>
      </nav>
    </>
  )
}