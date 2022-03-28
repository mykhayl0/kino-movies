// Contents contain everything about the movie database.

import favouritesButton from '../assets/favourite-button-fill.svg';
import kinoApp from '../assets/kinoApp.svg';
import kinoLogoWide from '../assets/kino-logo-wide.svg';
import tmdbLogo from '../assets/tmdb-logo.svg';

import './AboutPage.styles.scss';

// A simple function with no programming or components. Talks about Kino.
export default function AboutPage() {
  return (
    <>
      <div className='about-header'>
        <h3>About K<span className='accent-yellow'>i</span>no</h3>
      </div>

      <div className='about-intro'>
        <h3>Our Goal Is Simple: Movies. That's It.</h3>
        <img src={kinoLogoWide} alt="Kino logo." />
        <p>It's in our name. Kino in the Russian language “кино” translates to “movie”. Our approach is simple: get you setup with a movie quickly. We are an online database related to films — including cast, movie synopsis, release dates, and TMDB ratings. No ad interference, no monthly subscriptions, a peace of mind in user privacy, and, just movies.</p>
      </div>

      <div className='about-money'>
        <h3>How do we make money?</h3>
        <p>A: Our revenue is supported by iOS and Android Kino app purchases. A one time payment to use our mobile platform for a lifetime. Thank you for supporting our developers!</p>
      </div>

      <div className='about-attribute'>
        <h3>The TMDB API</h3>
        <div className='tmdb-div'>
          <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
          <img src={tmdbLogo} alt="TMDB logo" />
        </div>
      </div>

      <div className='about-functionality'>
        <div className='about-favourites'>
          <h3>Save Your Favourite Movies.</h3>
          <img src={favouritesButton} alt="Favourites button." />
        </div>

        <div className='about-app'>
          <h3>Download The Kino App.</h3>
          <img src={kinoApp} alt="Kino App." />
        </div>

        <div className='about-email'>
          <h3>Get In Touch With Us.</h3>
          <a href="mailto: support@kinomovies.com">Email Us</a>
        </div>
      </div>
    </>
  );
}