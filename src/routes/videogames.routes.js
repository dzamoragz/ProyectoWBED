import { Router } from "express";
import {
  listVideojuegos,
  showAddForm,
  addVideojuego,
  showEditForm,
  updateVideojuego,
  deleteVideojuego
} from "../controllers/videojuegos.controller.js";

const router = Router();

router.get("/list", listVideojuegos);

router.get("/add", showAddForm);
router.post("/add", addVideojuego);

router.get("/edit/:idjuegos", showEditForm);
router.post("/edit/:idjuegos", updateVideojuego);

router.get("/delete/:id", deleteVideojuego);

export default router;
