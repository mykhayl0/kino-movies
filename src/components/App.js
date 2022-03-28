import "./App.styles.scss";
import { fetchAPI } from '../helpers/tmdb';
import { setConfig } from '../state/config/action-creators';
import { setGenres } from '../state/genres/action-creators';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import AppRouter from '../router/AppRouter';
import HeaderMobile from './HeaderMobile';
import MatchMedia from '../components/MatchMedia';
import NavDesktop from "./NavDesktop";

// App() will fetch the TMDB API configuration.
function App() {
  // Accessing the dispatch function.
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Going to the movie database to grab the API's configuration, and parsing into an object using json. Refresh whenever dispatch is called.
  useEffect(function() {
    const fetchConfig = async function(){
      // Run the loading animation.
      setLoading(true);
      
      // Wait until fetchAPI returns configration and the genre. Wait until both are completed. 
      const [config, { genres }] = await Promise.all([
        fetchAPI('configuration'),
        fetchAPI('genre/movie/list')
      ]);
      
      // Saving the config object as a payload in redux.
      dispatch(setConfig(config));
      dispatch(setGenres(genres));
      
      // Stop displaying the loading animation.
      setLoading(false);
    };

    // Running the fetchConfig() function.
    fetchConfig();
  }, [dispatch]);

  // If the page is still loading then don't return anything.
  if(loading) {
    return null;
  }
  
  return (
    <>
    {/* Using MatchMedia component, determine whether the HeaderMobile or or NavDesktop is displayed based on screen sizing.  */}
      <MatchMedia mediaQuery='(max-width: 899px)'>
        <HeaderMobile />
      </MatchMedia>

      <MatchMedia mediaQuery='(min-width: 900px)'>
        <NavDesktop />
      </MatchMedia>

      {/* Return the links from router. */}
      <div>
        <AppRouter />
      </div>
    </>
  );
}

export default App;
