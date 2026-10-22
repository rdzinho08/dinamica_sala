import { Router } from "express";
import { favoritoController } from "../controller/favoritoController.js";

const router = Router();

router.post('/favoritos', favoritoController.toggleFavorito);
router.get('/favoritos/usuario/:id_usuario', favoritoController.listarFavoritoUsuario);

export default router;