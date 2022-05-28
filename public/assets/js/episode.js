import renderActors from "./components/renderActors.js";
import { popupVideo } from "./components/popupVideo.js";
import { favorite } from "./components/favoriteFilms.js";

const LOADER = document.querySelector(".loader");

renderActors();
popupVideo();
favorite(".btn-like");

window.addEventListener("load", () => {
  LOADER.classList.add("disppear");
});
