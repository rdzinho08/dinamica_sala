import { Router } from 'express';
import { usuarioController } from '../controller/usuarioController.js';

const router = Router();


router.get('/usuario', usuarioController.getAll);


router.post('/usuario/login', usuarioController.login);


router.post('/usuario', usuarioController.create);


router.get('/usuario/:id', usuarioController.getById);
router.put('/usuario/:id', usuarioController.update);
router.delete('/usuario/:id', usuarioController.delete);

export default router;