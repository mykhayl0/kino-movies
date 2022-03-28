import { Link } from "react-router-dom";

// If the user accesses an unknown URL, then return a simple message, and a Link router back to the home page.
export default function PageDoesNotExist() {
  return (
    <div>
      <p>The page you're trying to reach is not available.</p>
      <Link className='return-home' to="/">Return to the home page.</Link>
    </div>
  );
}