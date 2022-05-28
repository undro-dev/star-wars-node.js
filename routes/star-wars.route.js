const express = require("express");
const router = express.Router();
const axios = require("axios");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const LINKS_ON_FILMS = require("./static-resources");
const URL_IMAGE_WIKI = "https://star--wars.herokuapp.com/people";

let settings;
let currentFilm;
let linksOnActors;
let allFilmsStarWars;
let db;
router.use(cookieParser());

(async () => {
  db = await import("../db/db.mjs");
})();

(async () => {
  let res = await axios.get("https://swapi.py4e.com/api/films/");
  allFilmsStarWars = await res.data.results;
  return allFilmsStarWars;
})();

router.get("/", (request, response) => {
  let likeFilms = db.getAll();
  likeFilms = likeFilms.map((film) => film.episode_id);

  hbs.registerHelper("getTime", function (id) {
    if (likeFilms.includes(id)) return "button-like active";
    return "button-like";
  });

  response.render("index", {
    allFilms: sortFilms(request.cookies.sort),
    display: request.cookies.display || "block",
  });
});

router.post("/settings", (request, response) => {
  settings = request.body;
  response.send("ok");
});

function sortFilms(settings) {
  switch (settings) {
    case "Episode number top":
      allFilmsStarWars.sort((a, b) => a["episode_id"] - b["episode_id"]);
      break;
    case "Episode number bottom":
      allFilmsStarWars.sort((a, b) => a["episode_id"] - b["episode_id"]).reverse();
      break;
    case "Release date bottom":
      allFilmsStarWars.sort((a, b) => Number(a["release_date"].slice(0, 4)) - Number(b["release_date"].slice(0, 4))).reverse();
      break;
    case "Release date top":
      allFilmsStarWars.sort((a, b) => Number(a["release_date"].slice(0, 4)) - Number(b["release_date"].slice(0, 4)));
      break;
  }
  return allFilmsStarWars;
}

router.get("/actors", (request, response) => {
  response.json(linksOnActors);
});

router.get("/settings", (request, response) => {
  let result = sortFilms(settings.kindSort);
  response.json(result);
});
router.use("/episode/:id", (request, response, next) => {
  const { id } = request.params;

  currentFilm = allFilmsStarWars.filter((item) => item.episode_id == id)[0];
  currentFilm["film-online"] = LINKS_ON_FILMS[id - 1];

  let actors = currentFilm.characters.slice();

  linksOnActors = actors.map((item) => URL_IMAGE_WIKI + item.match(/\/\d+/g).join(""));
  next();
});

router.get("/episode/:id", (request, response) => {
  let likeFilms = db.getAll();
  likeFilms = likeFilms.map((film) => film.episode_id);

  hbs.registerHelper("getActiveClass", function (id) {
    if (likeFilms.includes(id)) return "btn-like active";
    return "btn-like";
  });

  let requests = linksOnActors.slice(0, 10).map((item) => axios.get(item));

  Promise.all(requests)
    .then((responses) => responses.map((item) => item.data))
    .then((actors) => {
      response.render("episode", {
        episode: currentFilm,
        allActors: actors,
      });
    });
});

module.exports = { routerStarWarsFilm: router, allFilms: allFilmsStarWars };
