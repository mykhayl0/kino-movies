import { Routes, Route } from 'react-router-dom';

import HomePage from "../pages/HomePage";
import FavouritesPage from "../pages/FavouritesPage";
import AboutPage from '../pages/AboutPage';
import SingleMoviePage from '../pages/SingleMoviePage';

// Routes the user accordingly, with the appropriate components.

export default function AppRouter(){
  return(
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="favourites" element={<FavouritesPage/>} />
        <Route path="about" element={<AboutPage/>} />
        <Route path="movie/:id" element={<SingleMoviePage/>} />
      </Routes>
  );
}