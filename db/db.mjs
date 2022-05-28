import { LowSync, JSONFileSync } from "lowdb";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const db = new LowSync(new JSONFileSync("./db.json"));

export function addFavoriteFilms(id) {
  db.read();
  db.data.favoriteFilms.push(id);
  db.write();
}
export function removeFavoriteFilms(id) {
  db.read();
  db.data.favoriteFilms = db.data.favoriteFilms.filter((item) => item.episode_id !== id);
  db.write();
}
export function getAll() {
  db.read();
  return db.data.favoriteFilms;
}
