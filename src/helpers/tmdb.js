import { API_KEY, API_URL, API_VERSION } from '../config/api';

// Build out the API URL fetching functionality. 

// Asynchronously, look for the passed path or searchParams.
export async function fetchAPI(path, searchParams = new URLSearchParams()) {
  const url = new URL(path, API_URL);
  url.pathname = `/${API_VERSION}${url.pathname}`;

  // Set the URL with the following search items.
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-CA');
  url.searchParams.set('page', 1);
  url.searchParams.set('region', 'CA');

  // Run a for loop that generates a properly formatted URL.
  for (const [key, value] of searchParams) {
    url.searchParams.set(key, value);
  }

  // Wait for the url to be made into a string, and for json to return an object.
  const response = await fetch(url.toString());
  const content = await response.json();
  
  return content;
}