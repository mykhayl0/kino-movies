import { useEffect, useMemo, useState } from 'react';

// A function to switch between components when a specific media query is reached.
export default function useMatchMedia(mediaQueryStr) {

  // Determine the size of the display. 
  const mediaQueryList = useMemo(() => window.matchMedia(mediaQueryStr), [mediaQueryStr]);
  // When the user reaches a specific display size, setHasMatch with the specific media query.
  const [hasMatch, setHasMatch] = useState(mediaQueryList.matches);

  // Run the mediaQueryChangeHandler() anytime the media query list changes.
  useEffect(() => {
    const mediaQueryChangeHandler = (event) => {
      setHasMatch(event.matches);
    };

    // Listen for media query changes.
    mediaQueryList.addEventListener('change', mediaQueryChangeHandler);

    // Stop listening for media query changes.
    return () => {
      mediaQueryList.removeEventListener('change', mediaQueryChangeHandler);
    };
  }, [mediaQueryList]);

  // Return true/false if the user display matches the set media query.
  return hasMatch;
}
