// Control the filter on the HomePage for mobile screens.

import "./FilterMobile.styles.scss";
import { filters } from '../config/filters';

// Pass filterValue and onFilterClick props to FilterMobile function.
export default function FilterMobile({ filterValue, onFilterClick }) {
  return (
    <>
      <div className="filter-btn-div">
        {/* Map out the filter options from the filter file in the config folder. */}
        {filters.map((filter) => {
          // If the filter matches the filterValue, then return a button with filter-btn-selected.
          if(filter === filterValue){
            return <button key={filter.endpoint} className="filter-btn filter-btn-selected">{filter.category}</button>;
          }

          // Otherose, return a regular button.
          return (
            <button
              key={filter.endpoint}
              className="filter-btn"
              onClick={(event) => onFilterClick(filter, event)}
            >
              {filter.category}
            </button>
          );
        })}
      </div>

      <div className="filter-circle-div">
        {/* Return a little circle for each filter item in filters. */}
        {filters.map((filter) => {
          // If the filter equals to the filterValue passed down from the prop, then colour the red circle.
          if(filter === filterValue){
            return <span key={filter.endpoint} className="filter-circle filter-circle-selected"></span>;
          }

          // Otherwise, just return a circle with no fill.
          return (
            <span key={filter.endpoint} className="filter-circle"></span>
          )
        })}
      </div>
    </>
  );
}