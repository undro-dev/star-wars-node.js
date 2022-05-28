export default function renderActors() {
  const WRAPPER_ACTORS = document.querySelector(".wrapper-actors");
  const LOAD_MORE_ACTORS = document.querySelector(".load-actors");
  let notesOnClick = 10;
  let count = 1;

  async function getActors() {
    let res = await axios.get("http://localhost:3001/star-wars/actors");
    let result = res.data;
    return result;
  }

  function createActorCard({ name, image, wiki }) {
    let actorItem = document.createElement("div");
    actorItem.classList.add("actor-item");

    let nameActor = document.createElement("h6");
    nameActor.textContent = name;

    let wrapperImage = document.createElement("div");
    wrapperImage.classList.add("wrapper-img");

    let photoActor = document.createElement("img");
    photoActor.classList.add("actor-item-img");
    photoActor.dataset.src = image;
    photoActor.src = image;
    wrapperImage.append(photoActor);

    let linkOnWik = document.createElement("a");
    linkOnWik.classList.add("link-actor");
    linkOnWik.textContent = "about";
    linkOnWik.target = "_blank";
    linkOnWik.href = wiki;

    actorItem.append(nameActor);
    actorItem.append(wrapperImage);
    actorItem.append(linkOnWik);

    WRAPPER_ACTORS.append(actorItem);
  }
  async function render() {
    LOAD_MORE_ACTORS.querySelector("img").classList.add("visible");

    let actors = await getActors();

    if (WRAPPER_ACTORS.children.length === actors.length) {
      LOAD_MORE_ACTORS.style.opacity = "0.2";
      LOAD_MORE_ACTORS.disabled = "disabled";
    }

    let start = (count - 1) * notesOnClick;
    let end = start + notesOnClick;
    let notes = actors.splice(notesOnClick).slice(start, end);

    let requests = notes.map(async (item) => await axios.get(item));

    Promise.all(requests)
      .then((responses) => responses.map((item) => item.data))
      .then((actors) => actors.forEach((element) => createActorCard(element)));
    count++;

    LOAD_MORE_ACTORS.querySelector("img").classList.remove("visible");
  }

  LOAD_MORE_ACTORS.addEventListener("click", () => render());
}
