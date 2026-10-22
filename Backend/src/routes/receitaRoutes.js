import { Router } from "express";
import { receitaController } from "../controller/receitaController.js";

const router = Router();

router.get('/receita', receitaController.getAll);
router.get('/receita/:id', receitaController.getById);
router.post('/receita', receitaController.create);
router.put('/receita/:id', receitaController.update);
router.delete('/receita/:id', receitaController.delete);

router.get('/receita/usuario/:id_usuario', receitaController.listarPorUsuario);

export default router;