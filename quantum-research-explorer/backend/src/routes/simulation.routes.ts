import { Router, Request, Response } from 'express';
import { SimulationService } from '../services/simulation.service';
import { SqliteMoleculeRepository } from '../repositories/molecule.repository';

const router = Router();
const simService = new SimulationService();
const molRepo = new SqliteMoleculeRepository();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { moleculeId, functional, basisSet } = req.body;
    if (!moleculeId) {
      res.status(400).json({ error: 'moleculeId is required' });
      return;
    }

    const molecule = await molRepo.findById(moleculeId);
    if (!molecule) {
      res.status(404).json({ error: 'Molecule not found' });
      return;
    }

    const result = await simService.runSimulation(
      molecule,
      functional || 'B3LYP',
      basisSet || '6-31G(d)'
    );
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Simulation execution failed' });
  }
});

export default router;
