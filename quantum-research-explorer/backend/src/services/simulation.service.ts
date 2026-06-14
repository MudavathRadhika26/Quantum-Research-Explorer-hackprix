import { Molecule } from '../repositories/molecule.repository';

export interface SimulationStep {
  cycle: number;
  energy: number; // Hartree
  energyChange: number; // Hartree
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
  finalEnergy: number; // Hartree
  dipoleMoment: number; // Debye
  homoEnergy: number; // eV
  lumoEnergy: number; // eV
  homoLumoGap: number; // eV
  logs: string[];
}

export class SimulationService {
  async runSimulation(molecule: Molecule, functional: string = 'B3LYP', basisSet: string = '6-31G(d)'): Promise<SimulationResult> {
    // We simulate a Self-Consistent Field (SCF) optimization cycle
    const numCycles = Math.floor(Math.random() * 4) + 6; // 6 to 10 cycles
    const scfCycles: SimulationStep[] = [];
    
    // Starting energy estimation based on molecular weight
    // Standard Hartree energy scale: roughly -75H for H2O, -150H for Ethanol, -230H for Benzene
    const baseEnergy = -75.0 - (molecule.molecularWeight * 2.13);
    let currentEnergy = baseEnergy + 5.23; // initial guess error
    
    const logs: string[] = [];
    logs.push(`======================================================================`);
    logs.push(`               QUANTUM RESEARCH EXPLORER - SIMULATION ENGINE          `);
    logs.push(`        DFT Density Functional Theory Molecular Structure Optimizer   `);
    logs.push(`======================================================================`);
    logs.push(`Input Molecule: ${molecule.name} (${molecule.formula})`);
    logs.push(`IUPAC Chemical Name: ${molecule.iupacName}`);
    logs.push(`SMILES String: ${molecule.smiles}`);
    logs.push(`Functional Theory: ${functional}`);
    logs.push(`Basis Set Specification: ${basisSet}`);
    logs.push(`Number of electrons: ${Math.round(molecule.molecularWeight * 0.5 + 4)}`);
    logs.push(`Spin Multiplicity: 1 (Singlet state)`);
    logs.push(`Starting Geometry Optimization and SCF energy convergence check...`);
    logs.push(``);
    logs.push(`Cycle      Energy (Hartree)       Energy Change       RMS Density     Max Density`);
    logs.push(`---------------------------------------------------------------------------------`);

    let lastEnergy = 0;
    for (let i = 1; i <= numCycles; i++) {
      const scale = Math.pow(0.4, i - 1);
      const energyChange = -5.23 * scale + (Math.random() * 0.01 - 0.005) * scale;
      currentEnergy += energyChange;
      
      const rmsDensity = 0.08 * scale;
      const maxDensity = 0.15 * scale;
      
      scfCycles.push({
        cycle: i,
        energy: parseFloat(currentEnergy.toFixed(6)),
        energyChange: parseFloat(energyChange.toFixed(6)),
        rmsDensity: parseFloat(rmsDensity.toFixed(6)),
        maxDensity: parseFloat(maxDensity.toFixed(6))
      });
      
      logs.push(
        `${String(i).padEnd(10)}` +
        `${currentEnergy.toFixed(8).padEnd(23)}` +
        `${energyChange.toFixed(8).padEnd(20)}` +
        `${rmsDensity.toFixed(6).padEnd(16)}` +
        `${maxDensity.toFixed(6)}`
      );
      
      // Artificial short sleep is handled in the controller / frontend, we just generate all logs here
      lastEnergy = currentEnergy;
    }

    logs.push(`---------------------------------------------------------------------------------`);
    logs.push(`*** SCF energy convergence criterion met. Optimization complete. ***`);
    logs.push(``);
    logs.push(`Computing Molecular Orbitals and Dipole Moments...`);
    
    // Orbital assignments
    const homo = molecule.orbitalEnergies[2];
    const lumo = molecule.orbitalEnergies[3];
    const gap = molecule.homoLumoGap;

    logs.push(`Eigenvalues of core molecular orbitals (in eV):`);
    logs.push(`  Occupied Orbitals:`);
    logs.push(`    HOMO-2 : ${molecule.orbitalEnergies[0].toFixed(4)} eV`);
    logs.push(`    HOMO-1 : ${molecule.orbitalEnergies[1].toFixed(4)} eV`);
    logs.push(`    HOMO   : ${homo.toFixed(4)} eV  (Highest Occupied Molecular Orbital)`);
    logs.push(`  Virtual Orbitals:`);
    logs.push(`    LUMO   : ${lumo.toFixed(4)} eV  (Lowest Unoccupied Molecular Orbital)`);
    logs.push(`    LUMO+1 : ${molecule.orbitalEnergies[4].toFixed(4)} eV`);
    logs.push(``);
    logs.push(`Calculated HOMO-LUMO Energy Gap: ${gap.toFixed(2)} eV`);
    logs.push(`Calculated Dipole Moment vector: [${(molecule.dipoleMoment * 0.7).toFixed(3)}, ${(molecule.dipoleMoment * 0.5).toFixed(3)}, ${(molecule.dipoleMoment * 0.51).toFixed(3)}]`);
    logs.push(`Total Dipole Moment: ${molecule.dipoleMoment.toFixed(2)} Debye`);
    logs.push(`Final Energy of System: ${lastEnergy.toFixed(8)} Hartree`);
    logs.push(``);
    logs.push(`======================================================================`);
    logs.push(`               SIMULATION CONVERGED SUCCESSFULLY                      `);
    logs.push(`======================================================================`);

    return {
      moleculeId: molecule.id,
      moleculeName: molecule.name,
      functional,
      basisSet,
      scfCycles,
      converged: true,
      finalEnergy: parseFloat(lastEnergy.toFixed(6)),
      dipoleMoment: molecule.dipoleMoment,
      homoEnergy: homo,
      lumoEnergy: lumo,
      homoLumoGap: gap,
      logs
    };
  }
}
