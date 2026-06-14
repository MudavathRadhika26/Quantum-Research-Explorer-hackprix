import { Router } from 'express';
import { getAllMolecules, getMoleculeById, searchMolecules, createMolecule } from '../controllers/molecule.controller';

const router = Router();

router.get('/', getAllMolecules);
router.get('/search', searchMolecules);
router.get('/:id', getMoleculeById);
router.post('/', createMolecule);

export default router;
