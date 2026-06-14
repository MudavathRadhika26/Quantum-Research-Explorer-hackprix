import { Request, Response } from 'express';
import { SqliteMoleculeRepository } from '../repositories/molecule.repository';

const repo = new SqliteMoleculeRepository();

export async function getAllMolecules(req: Request, res: Response): Promise<void> {
  try {
    const list = await repo.findAll();
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch molecules' });
  }
}

export async function getMoleculeById(req: Request, res: Response): Promise<void> {
  try {
    const molecule = await repo.findById(req.params.id);
    if (!molecule) {
      res.status(404).json({ error: 'Molecule not found' });
      return;
    }
    res.json(molecule);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch molecule' });
  }
}

export async function searchMolecules(req: Request, res: Response): Promise<void> {
  try {
    const query = req.query.q as string;
    if (!query) {
      const list = await repo.findAll();
      res.json(list);
      return;
    }
    const results = await repo.search(query);
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to search molecules' });
  }
}

export async function createMolecule(req: Request, res: Response): Promise<void> {
  try {
    const {
      id, name, formula, iupacName, molecularWeight, smiles,
      homoLumoGap, dipoleMoment, meltingPoint, boilingPoint,
      orbitalEnergies, description, svgStructure
    } = req.body;

    if (!id || !name || !formula || !iupacName || !molecularWeight || !smiles || !orbitalEnergies) {
      res.status(400).json({ error: 'Missing required molecule parameters' });
      return;
    }

    const newMolecule = {
      id, name, formula, iupacName,
      molecularWeight: parseFloat(molecularWeight),
      smiles,
      homoLumoGap: parseFloat(homoLumoGap || 0),
      dipoleMoment: parseFloat(dipoleMoment || 0),
      meltingPoint: meltingPoint || 'N/A',
      boilingPoint: boilingPoint || 'N/A',
      orbitalEnergies: Array.isArray(orbitalEnergies) ? orbitalEnergies : JSON.parse(orbitalEnergies),
      description: description || '',
      svgStructure: svgStructure || ''
    };

    const created = await repo.create(newMolecule);
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create molecule' });
  }
}
