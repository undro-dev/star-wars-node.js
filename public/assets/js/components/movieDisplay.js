export default function movieDisplay() {
  const BUTTONS_DISPLAY = document.querySelectorAll(".btn-view-page");
  const WRAPPER_FILMS = document.querySelector(".wrapper-films");

  const deleteActiveClass = (coll, className) => {
    coll.forEach((item) => item.classList.remove(className));
  };

  const deleteClassForWrapperFilms = (block, className1, className2, key) => {
    if (key === true) {
      block.classList.remove(className1);
      block.classList.add(className2);
    } else {
      block.classList.remove(className2);
      block.classList.add(className1);
    }
  };

  const changeSettings = (button, targetActiveClass, displayView) => {
    button.classList.add(targetActiveClass);
    if (button.classList.contains(displayView) && button.classList.contains(targetActiveClass)) {
      Cookies.set("display", "block");
      deleteClassForWrapperFilms(WRAPPER_FILMS, "table", "block", true);
    } else {
      Cookies.set("display", "table");
      deleteClassForWrapperFilms(WRAPPER_FILMS, "table", "block");
    }
  };
  const renderFilms = (buttons) => {
    if (Cookies.get("display") == undefined) Cookies.set("display", "block");
    Cookies.get("display") == "block" ? buttons[0].classList.add("active") : buttons[1].classList.add("active");

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        deleteActiveClass(buttons, "active");
        changeSettings(e.target, "active", "block");
      });
    });
  };

  renderFilms(BUTTONS_DISPLAY);
}
