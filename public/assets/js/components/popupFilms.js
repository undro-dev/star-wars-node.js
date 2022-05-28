export function popup() {
  const BTN_POPUP = document.querySelector(".btn-favourite-basket");
  const POPUP = document.getElementById("popup-pets");
  const POPUP_CONTENT = POPUP.querySelector(".popup-content-films");

  async function getFavoriteFilms() {
    let res = await axios.get("http://localhost:3001/favorite-films");
    let result = await res.data;
    return result;
  }

  function openPopup(popup) {
    POPUP_CONTENT.innerHTML = "";
    renderFavoriteFilms();
    popup.classList.add("visible", "animate__backInUp");
  }
  function closePopup(e) {
    if (e.target.classList.contains("visible") || e.target.classList.contains("popup-close"))
      POPUP.classList.remove("visible", "animate__backInUp");
  }
  async function renderFavoriteFilms() {
    let films = await getFavoriteFilms();
    films.forEach((item) => renderCard(item));
  }

  function renderCard({ title, episode_id, release_date, opening_crawl }) {
    let film = document.createElement("a");
    film.classList.add("popup-content-item");
    film.href = `http://localhost:3001/star-wars/episode/${episode_id}`;

    let img = document.createElement("img");
    img.src = `../assets/img/${episode_id}.png`;
    img.alt = `${title}`;

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

    let descriptionTxt = document.createElement("p");
    descriptionTxt.classList.add("discription");
    descriptionTxt.textContent = opening_crawl;

    film.append(img);
    filmDiscription.append(titleFilm);
    filmDiscription.append(episode);
    filmDiscription.append(release);
    filmDiscription.append(descriptionTxt);
    film.append(filmDiscription);

    POPUP_CONTENT.append(film);
  }

  BTN_POPUP.addEventListener("click", () => openPopup(POPUP));
  POPUP.addEventListener("click", (e) => closePopup(e));
}
