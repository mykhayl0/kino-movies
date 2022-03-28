// A set of functions that saves favourites into the browser local storage.

// Adds an id to local storage.
export const addToLocalStorage = (id) => {
  const storage = localStorage;

  // If the length of storage is 0, then set the item into the favourites section of local storage. Stringify the ID.
  if(storage.length === 0){
    storage.setItem("favourites", JSON.stringify([id]));
  }else{
    // Otherwise, if there's already stuff in local storage, then return a list of all the favourites or an empty array.
    const favouritesList = JSON.parse(storage.getItem("favourites")) || [];
    // Push the newly added id into the array.
    favouritesList.push(id);
    // Set the updated array into the favourites section of local storage.
    storage.setItem("favourites", JSON.stringify(favouritesList));
  }
}

// Remove a favourited item from local storage, taking in the movie id.
export const removeFromLocalStorage = (id) => {
  const storage = localStorage;

  // Get all the items from local storage inside favourites, or an empty array.
  const favouritesList = JSON.parse(storage.getItem("favourites")) || [];
  // If the id matches whats inside the pulled array, then splice it out.
  if(favouritesList.includes(id)){
    favouritesList.splice(favouritesList.indexOf(id), 1);
    // Set the new array to local storage, overriding the old value.
    storage.setItem("favourites", JSON.stringify(favouritesList));
  }
}

// Retrieve the favourite movies from local storage. 
export const getFavouriteMovies = () => {
  const storage = localStorage;

  // Retrieve the favourites section of local storage.
  const favouritesList = JSON.parse(storage.getItem("favourites")) || [];
  return favouritesList;
}