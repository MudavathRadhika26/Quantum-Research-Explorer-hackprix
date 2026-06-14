export interface Molecule {
  id: string;
  name: string;
  formula: string;
  iupacName: string;
  molecularWeight: number;
  smiles: string;
  homoLumoGap: number;
  dipoleMoment: number;
  meltingPoint: string;
  boilingPoint: string;
  orbitalEnergies: number[];
  description: string;
  svgStructure: string;
}

export interface Extraction {
  id: string;
  filename: string;
  fileType: string;
  fileSize: number;
  status: 'success' | 'failed' | 'processing';
  extractedJson: string; // JSON string
  createdAt: string;
}

export interface SimulationStep {
  cycle: number;
  energy: number;
  energyChange: number;
  rmsDensity: number;
  maxDensity: number;
}

export interface SimulationResult {
  moleculeId: string;
  moleculeName: string;
  functional: string;
  basisSet: string;
  scfCycles: SimulationStep[];
  converged: boolean;
  finalEnergy: number;
  dipoleMoment: number;
  homoEnergy: number;
  lumoEnergy: number;
  homoLumoGap: number;
  logs: string[];
}
