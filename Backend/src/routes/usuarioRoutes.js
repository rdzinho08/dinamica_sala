import { Router } from "express";
import { usuarioController } from "../controller/usuarioController.js";

const router = Router();

router.get('/usuario/login', usuarioController.getAll);
router.get('/usuario/:id', usuarioController.getById);
router.post('/usuario', usuarioController.create);
router.put('/usuario/:id', usuarioController.update);
router.delete('/usuario/:id', usuarioController.delete);

export default router;
