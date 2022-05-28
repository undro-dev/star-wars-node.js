const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { routerStarWarsFilm } = require("./routes/star-wars.route");
const { routerFavoriteFilms } = require("./routes/route.favorite-films");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(bodyParser.json());

app.use("/star-wars", routerStarWarsFilm);
app.use("/favorite-films", routerFavoriteFilms);

app.listen(3001);
