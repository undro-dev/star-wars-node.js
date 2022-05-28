export function popupVideo() {
  const POPUP_VIDEO = document.querySelector(".popup-video");
  const TRIGGER = document.querySelector(".left-img-poster");
  const VIDEO = POPUP_VIDEO.querySelector("video");

  function openPopup(popup) {
    popup.classList.add("visible", "animate__backInUp");
  }

  function closePopup(e) {
    if (e.target.classList.contains("visible") || e.target.classList.contains("popup-close")) {
      POPUP_VIDEO.classList.remove("visible", "animate__backInUp");
      VIDEO.pause();
    }
  }
  TRIGGER.addEventListener("click", () => openPopup(POPUP_VIDEO));
  POPUP_VIDEO.addEventListener("click", (e) => closePopup(e));
}
