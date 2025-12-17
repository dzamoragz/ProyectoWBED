import express from "express";
import { engine } from "express-handlebars";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

import videogameRoutes from "./routes/videogames.routes.js";
import { helpers } from "./helpers/handlebars-helpers.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(__dirname, "views"));

app.engine(".hbs", engine({
  defaultLayout: "main",
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  extname: ".hbs",
  helpers
}));

app.set("view engine", ".hbs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* ROUTES */
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/videojuego", videogameRoutes);


app.use(express.static(join(__dirname, "public")));

export default app;
