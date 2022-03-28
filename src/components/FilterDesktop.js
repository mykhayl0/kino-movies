// Control the filter on the Home Page for desktop screen sizes.

import './FilterDesktop.styles.scss';
import { filters } from '../config/filters';
import classNames from 'classnames';
import Overlay from './Overlay';
import sliderFilter from '../assets/slider-filter.svg';
import { useState } from 'react';

// Accept props of filterValue, onFilterClick, and any other values.
export default function FilterDesktop({ filterValue, onFilterClick, ...props }) {
  // Set the state of whether the dropdown of the filter is open or not. By default false.
  const [isOpen, setIsOpen] = useState(false);

  // When the filter is open, setIsOpen to the opposite value.
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div {...props} className={classNames('filter-desktop-container', isOpen && 'open', props.className)}>
      <h4 className='filter-desktop-current'>{filterValue.category}</h4>

      <div className='filter-desktop-action-wrapper'>
        <button className='filter-desktop-btn filter-desktop-toggle' onClick={toggleIsOpen}>
          <img className='filter-desktop-icon' src={sliderFilter}/> Filter
        </button>

        <ul className='filter-desktop-option-list'>
          {filters.map((filter) => {
            const isSelected = filter === filterValue;

            // When the filter is clicked, and if not selected, the run onFilterClick, and setIsOpen to false.
            const filterClickHandler = (event) => {
              if (!isSelected) {
                onFilterClick(filter, event);
              }

              setIsOpen(false);
            };

            return (
              <li key={filter.endpoint} className={classNames('filter-desktop-option-item', isSelected && 'selected')}>
                <button
                  className='filter-desktop-btn'
                  onClick={filterClickHandler}
                >
                  {filter.category}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
       {/* Utilizing the Overlay component to know whether the overlay should be toggled. */}
      <Overlay visible={isOpen} onClick={toggleIsOpen}/>
    </div>
  );
}
