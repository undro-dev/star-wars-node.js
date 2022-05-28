export function favorite(items) {
  const BUTTONS_FAVORITE = document.querySelectorAll(items);

  function addFilmInFavorite(button) {
    axios.post("http://localhost:3001/favorite-films/add", { favorite: button.id });
    button.classList.add("active");
  }
  function removeFilmInFavorite(button) {
    axios.post("http://localhost:3001/favorite-films/remove", { favorite: button.id });
    button.classList.remove("active");
  }

  BUTTONS_FAVORITE.forEach((item) => {
    let target;
    item.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.tagName == "SPAN" ? (target = e.target.parentElement) : (target = e.target);
      target.classList.contains("active") == true ? removeFilmInFavorite(target) : addFilmInFavorite(target);
    });
  });
}
