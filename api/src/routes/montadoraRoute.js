import express from 'express';
import * as montadora from '../controllers/montadoraController.js';

const router = express.Router();

router.get('/montadora/:id',montadora.consultarPorId);
router.get('/montadoras',montadora.consultarTodos);
router.post('/montadora',montadora.cadastrar);
router.delete('/montadora/:id',montadora.deletarPorId);

export default router;