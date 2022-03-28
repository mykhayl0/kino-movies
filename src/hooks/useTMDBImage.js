import { useSelector } from 'react-redux';

// The useTMDBImage hook receives a set of options params, where it will build out an API call URL to 
// return a specific type of image (headshot of cast, movie poster, or large banner.)
export default function useTMDBImage(options) {
  // Read the redux store state for all the images.
  const imgsConfig = useSelector((state) => state.config.images);

  // If the options was not defined, then return nothing.
  if (options === undefined) {
    return '';
  }

  // Options can receive one of the two: entity(either cast, movie poster, or large banner) or type(either credits or movie)

  const { entity, type } = options;

  // Build out the url needed to access that API call.
  const baseURL = imgsConfig.base_url;
  const imgSizes = imgsConfig[`${type}_sizes`];
  const imgSize = imgSizes[imgSizes.length - 1];
  const imgPath = entity[`${type}_path`];

  // Return the premade URL.
  return `${baseURL}${imgSize}/${imgPath}`;
}
