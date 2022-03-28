import spinner from "../assets/kino-spinner.svg";
import "./Spinner.styles.scss";

// A Spinner function that outputs an animated svg. Accepts children that are custom messages for each page. (Ie. Loading Favourites, Loading Popular).

export default function Spinner({children}) {
  return (
    <>
      <div className="spinner-container">
        <img className="loading-spinner" src={spinner} alt="spinner"/>
        <h4 className="loading-message">{children}</h4>
      </div>
    </>
  );
}