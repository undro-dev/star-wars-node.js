import movieDisplay from "./components/movieDisplay.js";
import sortFilms from "./components/sort.js";
import { favorite } from "./components/favoriteFilms.js";
import { popup } from "./components/popupFilms.js";
sortFilms();
movieDisplay();
favorite(".button-like");
popup();
