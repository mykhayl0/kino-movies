import useMatchMedia from '../hooks/useMatchMedia';

// Control which component is returned when a media query is reached.

export default function MatchMedia({ mediaQuery, children }) {
  const hasMatch = useMatchMedia(mediaQuery);

  if (!hasMatch) {
    return null;
  }

  return <>{children}</>;
}
