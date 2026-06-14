import { getDatabase } from '../config/db';

export async function seedDatabase(): Promise<void> {
  const db = await getDatabase();
  
  const count = await db.get<{ count: number }>('SELECT COUNT(*) as count FROM molecules');
  
  if (count && count.count > 0) {
    // Already seeded
    return;
  }
  
  const molecules = [
    {
      id: 'water',
      name: 'Water',
      formula: 'H2O',
      iupac_name: 'Oxidane',
      molecular_weight: 18.015,
      smiles: 'O',
      homo_lumo_gap: 9.3, // eV
      dipole_moment: 1.85, // Debye
      melting_point: '0 °C',
      boiling_point: '100 °C',
      orbital_energies: JSON.stringify([-13.2, -11.8, -10.2, -0.9, 0.8]), // HOMO-2, HOMO-1, HOMO, LUMO, LUMO+1
      description: 'Water is a polar inorganic compound that is a tasteless and odorless liquid at room temperature. It is the main constituent of Earth\'s hydrosphere and the fluids of all known living organisms, where it acts as a solvent.',
      svg_structure: `<svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="40" r="14" fill="#EF4444" stroke="#B91C1C" stroke-width="2" />
        <text x="50" y="44" font-family="sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">O</text>
        <line x1="38" y1="52" x2="28" y2="65" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
        <circle cx="24" cy="70" r="10" fill="#E2E8F0" stroke="#475569" stroke-width="2" />
        <text x="24" y="74" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1E293B" text-anchor="middle">H</text>
        <line x1="62" y1="52" x2="72" y2="65" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
        <circle cx="76" cy="70" r="10" fill="#E2E8F0" stroke="#475569" stroke-width="2" />
        <text x="76" y="74" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1E293B" text-anchor="middle">H</text>
      </svg>`
    },
    {
      id: 'carbon_dioxide',
      name: 'Carbon Dioxide',
      formula: 'CO2',
      iupac_name: 'Carbon dioxide',
      molecular_weight: 44.009,
      smiles: 'O=C=O',
      homo_lumo_gap: 10.8, // eV
      dipole_moment: 0.0, // Debye (symmetric)
      melting_point: '-78.5 °C (sublimes)',
      boiling_point: '-56.6 °C (at 5.1 atm)',
      orbital_energies: JSON.stringify([-15.6, -14.1, -13.8, -3.0, -1.2]),
      description: 'Carbon dioxide is an acidic colorless gas with a density about 53% higher than that of dry air. A carbon dioxide molecule consists of a carbon atom covalently double bonded to two oxygen atoms.',
      svg_structure: `<svg viewBox="0 0 160 80" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="40" r="14" fill="#1E293B" stroke="#0F172A" stroke-width="2" />
        <text x="80" y="44" font-family="sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">C</text>
        
        <line x1="42" y1="36" x2="62" y2="36" stroke="#94A3B8" stroke-width="2.5" />
        <line x1="42" y1="44" x2="62" y2="44" stroke="#94A3B8" stroke-width="2.5" />
        <circle cx="28" cy="40" r="14" fill="#EF4444" stroke="#B91C1C" stroke-width="2" />
        <text x="28" y="44" font-family="sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">O</text>
        
        <line x1="98" y1="36" x2="118" y2="36" stroke="#94A3B8" stroke-width="2.5" />
        <line x1="98" y1="44" x2="118" y2="44" stroke="#94A3B8" stroke-width="2.5" />
        <circle cx="132" cy="40" r="14" fill="#EF4444" stroke="#B91C1C" stroke-width="2" />
        <text x="132" y="44" font-family="sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">O</text>
      </svg>`
    },
    {
      id: 'benzene',
      name: 'Benzene',
      formula: 'C6H6',
      iupac_name: 'Benzene',
      molecular_weight: 78.11,
      smiles: 'C1=CC=CC=C1',
      homo_lumo_gap: 5.0, // eV
      dipole_moment: 0.0, // Debye
      melting_point: '5.53 °C',
      boiling_point: '80.1 °C',
      orbital_energies: JSON.stringify([-9.2, -9.2, -6.7, -1.7, -0.2]),
      description: 'Benzene is an organic chemical compound with the chemical formula C6H6. The benzene molecule is composed of six carbon atoms joined in a planar ring with one hydrogen atom attached to each.',
      svg_structure: `<svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <polygon points="60,20 95,40 95,80 60,100 25,80 25,40" fill="none" stroke="#1E293B" stroke-width="3" />
        <polygon points="60,26 90,44 90,76 60,94 30,76 30,44" fill="none" stroke="#64748B" stroke-dasharray="6,4" stroke-width="1.5" />
        <!-- Atoms at vertices -->
        <circle cx="60" cy="20" r="5" fill="#1E293B" />
        <circle cx="95" cy="40" r="5" fill="#1E293B" />
        <circle cx="95" cy="80" r="5" fill="#1E293B" />
        <circle cx="60" cy="100" r="5" fill="#1E293B" />
        <circle cx="25" cy="80" r="5" fill="#1E293B" />
        <circle cx="25" cy="40" r="5" fill="#1E293B" />
        <!-- Outer Hydrogens -->
        <line x1="60" y1="20" x2="60" y2="5" stroke="#94A3B8" stroke-width="2" />
        <circle cx="60" cy="5" r="4.5" fill="#E2E8F0" stroke="#475569" stroke-width="1" />
        
        <line x1="95" y1="40" x2="108" y2="32.5" stroke="#94A3B8" stroke-width="2" />
        <circle cx="108" cy="32.5" r="4.5" fill="#E2E8F0" stroke="#475569" stroke-width="1" />
        
        <line x1="95" y1="80" x2="108" y2="87.5" stroke="#94A3B8" stroke-width="2" />
        <circle cx="108" cy="87.5" r="4.5" fill="#E2E8F0" stroke="#475569" stroke-width="1" />
        
        <line x1="60" y1="100" x2="60" y2="115" stroke="#94A3B8" stroke-width="2" />
        <circle cx="60" cy="115" r="4.5" fill="#E2E8F0" stroke="#475569" stroke-width="1" />
        
        <line x1="25" y1="80" x2="12" y2="87.5" stroke="#94A3B8" stroke-width="2" />
        <circle cx="12" cy="87.5" r="4.5" fill="#E2E8F0" stroke="#475569" stroke-width="1" />
        
        <line x1="25" y1="40" x2="12" y2="32.5" stroke="#94A3B8" stroke-width="2" />
        <circle cx="12" cy="32.5" r="4.5" fill="#E2E8F0" stroke="#475569" stroke-width="1" />
      </svg>`
    },
    {
      id: 'caffeine',
      name: 'Caffeine',
      formula: 'C8H10N4O2',
      iupac_name: '1,3,7-Trimethylpurine-2,6-dione',
      molecular_weight: 194.19,
      smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C',
      homo_lumo_gap: 4.2, // eV
      dipole_moment: 3.64, // Debye
      melting_point: '235 °C',
      boiling_point: 'Decomposes',
      orbital_energies: JSON.stringify([-8.4, -7.9, -6.1, -1.9, -0.8]),
      description: 'Caffeine is a central nervous system stimulant of the methylxanthine class. It is the world\'s most widely consumed psychoactive drug. Unlike highly regulated psychoactive substances, it is legal and unregulated in nearly all parts of the world.',
      svg_structure: `<svg viewBox="0 0 150 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Purine Ring system -->
        <!-- 6-membered ring -->
        <polygon points="50,30 80,45 80,80 50,95 20,80 20,45" fill="none" stroke="#1E293B" stroke-width="3" />
        <!-- 5-membered ring fused -->
        <polygon points="80,45 110,35 125,62.5 110,90 80,80" fill="none" stroke="#1E293B" stroke-width="3" />
        <!-- Carbonyl O at 6 (top) -->
        <line x1="50" y1="30" x2="50" y2="10" stroke="#EF4444" stroke-width="2.5" />
        <line x1="53" y1="30" x2="53" y2="10" stroke="#EF4444" stroke-width="2.5" />
        <circle cx="51.5" cy="8" r="6" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5" />
        <!-- Carbonyl O at 2 (bottom left-ish) -->
        <line x1="15" y1="83" x2="-2" y2="93" stroke="#EF4444" stroke-width="2.5" />
        <line x1="17" y1="80" x2="0" y2="90" stroke="#EF4444" stroke-width="2.5" />
        <circle cx="-1" cy="91.5" r="6" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5" />
        <!-- Nitrogens & Methyls -->
        <!-- N1 -->
        <circle cx="20" cy="45" r="7" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5" />
        <text x="20" y="48.5" font-family="sans-serif" font-size="9" fill="white" font-weight="bold" text-anchor="middle">N</text>
        <line x1="13" y1="41.5" x2="0" y2="35" stroke="#94A3B8" stroke-width="2" />
        <circle cx="0" cy="35" r="5" fill="#1E293B" />
        <!-- N3 -->
        <circle cx="20" cy="80" r="7" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5" />
        <text x="20" y="83.5" font-family="sans-serif" font-size="9" fill="white" font-weight="bold" text-anchor="middle">N</text>
        <line x1="13" y1="83.5" x2="0" y2="90" stroke="#94A3B8" stroke-width="2" />
        <!-- N7 -->
        <circle cx="110" cy="35" r="7" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5" />
        <text x="110" y="38.5" font-family="sans-serif" font-size="9" fill="white" font-weight="bold" text-anchor="middle">N</text>
        <line x1="110" y1="28" x2="110" y2="12" stroke="#94A3B8" stroke-width="2" />
        <circle cx="110" cy="8" r="5" fill="#1E293B" />
        <!-- N9 -->
        <circle cx="110" cy="90" r="7" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5" />
        <text x="110" y="93.5" font-family="sans-serif" font-size="9" fill="white" font-weight="bold" text-anchor="middle">N</text>
        <line x1="115" y1="95.5" x2="128" y2="105" stroke="#94A3B8" stroke-width="2" />
        <circle cx="130" cy="106.5" r="5" fill="#1E293B" />
      </svg>`
    },
    {
      id: 'aspirin',
      name: 'Aspirin',
      formula: 'C9H8O4',
      iupac_name: '2-Acetyloxybenzoic acid',
      molecular_weight: 180.157,
      smiles: 'CC(=O)OC1=CC=CC=C1C(=O)O',
      homo_lumo_gap: 4.8, // eV
      dipole_moment: 5.62, // Debye
      melting_point: '136 °C',
      boiling_point: '140 °C (decomposes)',
      orbital_energies: JSON.stringify([-8.9, -8.3, -6.5, -1.7, -0.6]),
      description: 'Aspirin, also known as acetylsalicylic acid, is a nonsteroidal anti-inflammatory drug used to reduce pain, fever, and/or inflammation, and as an antithrombotic.',
      svg_structure: `<svg viewBox="0 0 150 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Benzene Ring -->
        <polygon points="50,30 80,45 80,80 50,95 20,80 20,45" fill="none" stroke="#1E293B" stroke-width="3" />
        <!-- Ester branch at C2 -->
        <line x1="80" y1="45" x2="105" y2="35" stroke="#94A3B8" stroke-width="2.5" />
        <circle cx="109" cy="33.5" r="7" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5" />
        <text x="109" y="37" font-family="sans-serif" font-size="9" fill="white" font-weight="bold" text-anchor="middle">O</text>
        
        <line x1="116" y1="33.5" x2="131" y2="43" stroke="#94A3B8" stroke-width="2" />
        <circle cx="134" cy="45" r="5" fill="#1E293B" /> <!-- Carbon -->
        <!-- Carbonyl O -->
        <line x1="131" y1="43" x2="131" y2="60" stroke="#EF4444" stroke-width="2" />
        <circle cx="131" cy="63" r="5" fill="#EF4444" stroke="#B91C1C" stroke-width="1" />
        <!-- Acetyl CH3 -->
        <line x1="134" y1="45" x2="147" y2="37" stroke="#94A3B8" stroke-width="2" />
        
        <!-- Carboxylic Acid branch at C1 -->
        <line x1="80" y1="80" x2="105" y2="92" stroke="#94A3B8" stroke-width="2.5" />
        <circle cx="109" cy="94" r="5" fill="#1E293B" /> <!-- Carbon -->
        <!-- double bond O -->
        <line x1="107" y1="94" x2="107" y2="109" stroke="#EF4444" stroke-width="2" />
        <circle cx="107" cy="112" r="5" fill="#EF4444" />
        <!-- Single bond OH -->
        <line x1="113" y1="94" x2="128" y2="87" stroke="#94A3B8" stroke-width="2" />
        <circle cx="132" cy="85" r="7" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5" />
        <text x="132" y="88.5" font-family="sans-serif" font-size="8" fill="white" font-weight="bold" text-anchor="middle">OH</text>
      </svg>`
    },
    {
      id: 'ethanol',
      name: 'Ethanol',
      formula: 'C2H5OH',
      iupac_name: 'Ethanol',
      molecular_weight: 46.07,
      smiles: 'CCO',
      homo_lumo_gap: 8.7, // eV
      dipole_moment: 1.69, // Debye
      melting_point: '-114.1 °C',
      boiling_point: '78.37 °C',
      orbital_energies: JSON.stringify([-12.8, -11.4, -9.8, -1.1, 0.9]),
      description: 'Ethanol is an organic chemical compound. It is a simple alcohol with the chemical formula C2H5OH. Ethanol is a volatile, flammable, colorless liquid with a characteristic wine-like odor and pungent taste.',
      svg_structure: `<svg viewBox="0 0 120 70" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- C1 -->
        <circle cx="25" cy="45" r="10" fill="#1E293B" stroke="#0F172A" stroke-width="2" />
        <text x="25" y="49" font-family="sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">C</text>
        <line x1="35" y1="45" x2="55" y2="25" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
        <!-- C2 -->
        <circle cx="60" cy="20" r="10" fill="#1E293B" stroke="#0F172A" stroke-width="2" />
        <text x="60" y="24" font-family="sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">C</text>
        <line x1="70" y1="20" x2="90" y2="35" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
        <!-- O -->
        <circle cx="98" cy="42" r="10" fill="#EF4444" stroke="#B91C1C" stroke-width="2" />
        <text x="98" y="46" font-family="sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">O</text>
        <!-- H of OH -->
        <line x1="108" y1="42" x2="116" y2="42" stroke="#94A3B8" stroke-width="2" />
        <circle cx="120" cy="42" r="6" fill="#E2E8F0" stroke="#475569" stroke-width="1.5" />
        <text x="120" y="45" font-family="sans-serif" font-size="8" font-weight="bold" fill="#1E293B" text-anchor="middle">H</text>
      </svg>`
    }
  ];
  
  for (const mol of molecules) {
    await db.run(`
      INSERT INTO molecules (
        id, name, formula, iupac_name, molecular_weight, smiles, 
        homo_lumo_gap, dipole_moment, melting_point, boiling_point, 
        orbital_energies, description, svg_structure
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      mol.id, mol.name, mol.formula, mol.iupac_name, mol.molecular_weight, mol.smiles,
      mol.homo_lumo_gap, mol.dipole_moment, mol.melting_point, mol.boiling_point,
      mol.orbital_energies, mol.description, mol.svg_structure
    ]);
  }
}
