import { favorite } from "./favoriteFilms.js";
export default function sortFilms() {
  const BUTTON_SORTING = document.querySelector(".select");
  const WRAPPER_FILMS = document.querySelector(".wrapper-films");

  function toCreateFilmCard({ title, episode_id, release_date }, favoriteFilms) {
    let film = document.createElement("a");
    film.classList.add("film");
    film.href = `http://localhost:3001/star-wars/episode/${episode_id}`;

    let filmContent = document.createElement("div");
    filmContent.classList.add("film-content");

    let containerImg = document.createElement("div");
    containerImg.classList.add("container-img");

    let img = document.createElement("img");
    img.src = `../../assets/img/${episode_id}.png`;
    img.alt = `${title}`;

    containerImg.append(img);

    let filmDiscription = document.createElement("div");
    filmDiscription.classList.add("film-discription");

    let titleFilm = document.createElement("h6");
    titleFilm.textContent = title;

    let episode = document.createElement("p");
    episode.classList.add("episode");
    episode.textContent = `Episode number: ${episode_id}`;

    let release = document.createElement("p");
    release.classList.add("release");
    release.textContent = `Release date: ${release_date}`;

    let buttonLike = document.createElement("button");
    buttonLike.id = episode_id;

    favoriteFilms.includes(episode_id) == true ? (buttonLike.className = "button-like active") : buttonLike.classList.add("button-like");

    let spanLike = document.createElement("span");
    spanLike.classList.add("material-icons");
    spanLike.textContent = "star";

    buttonLike.append(spanLike);

    filmContent.append(containerImg);

    filmDiscription.append(titleFilm);
    filmDiscription.append(episode);
    filmDiscription.append(release);
    filmContent.append(filmDiscription);
    filmContent.append(buttonLike);
    film.append(filmContent);

    WRAPPER_FILMS.append(film);
  }
  async function getSortFilm() {
    let res = await axios.get("http://localhost:3001/star-wars/settings");
    let result = await res.data;
    return result;
  }
  async function getFavoriteFilms() {
    let res = await axios.get("http://localhost:3001/favorite-films");
    let result = await res.data;
    return result;
  }

  BUTTON_SORTING.addEventListener("change", async () => {
    let favoriteFilms = await getFavoriteFilms();
    favoriteFilms = favoriteFilms.map((film) => film.episode_id);
    await axios.post("http://localhost:3001/star-wars/settings", { kindSort: BUTTON_SORTING.value });
    Cookies.set("sort", BUTTON_SORTING.value);
    let films = await getSortFilm();
    WRAPPER_FILMS.innerHTML = "";

    films.forEach((film) => toCreateFilmCard(film, favoriteFilms));
    favorite(".button-like");
  });
}
