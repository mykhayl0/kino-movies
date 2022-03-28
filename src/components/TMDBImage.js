import useTMDBImage from '../hooks/useTMDBImage';

// Utilizing the useTMDBImage hook, a function that creates the image URL to be outputted inside the src.

export default function TMDBImage({ entity, type, ...props }) {
  const imgUrl = useTMDBImage({ entity, type });

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} src={imgUrl} loading='lazy'/>;
}
