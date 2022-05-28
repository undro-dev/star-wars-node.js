const express = require("express");
const axios = require("axios");
const router = express.Router();

let allFilms;
let db;

(async () => {
  db = await import("../db/db.mjs");
})();

(async () => {
  let res = await axios.get("https://swapi.py4e.com/api/films/");
  allFilms = await res.data.results;
  return allFilms;
})();

router.post("/add", (request, response) => {
  let film = allFilms.find((film) => film.episode_id == request.body.favorite);
  db.addFavoriteFilms(film);
  response.send("ok");
});

router.post("/remove", (request, response) => {
  db.removeFavoriteFilms(+request.body.favorite);
  response.send("ok");
});

router.get("/", (request, response) => {
  let likeFilms = db.getAll();
  response.json(likeFilms);
});

module.exports = { routerFavoriteFilms: router };
