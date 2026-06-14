import { getDatabase } from '../config/db';

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

export interface IMoleculeRepository {
  findAll(): Promise<Molecule[]>;
  findById(id: string): Promise<Molecule | null>;
  search(query: string): Promise<Molecule[]>;
  create(molecule: Molecule): Promise<Molecule>;
}

// DbMolecule represents the raw database structure in SQLite
interface DbMolecule {
  id: string;
  name: string;
  formula: string;
  iupac_name: string;
  molecular_weight: number;
  smiles: string;
  homo_lumo_gap: number;
  dipole_moment: number;
  melting_point: string;
  boiling_point: string;
  orbital_energies: string; // JSON string
  description: string;
  svg_structure: string;
}

function mapDbToDomain(row: DbMolecule): Molecule {
  return {
    id: row.id,
    name: row.name,
    formula: row.formula,
    iupacName: row.iupac_name,
    molecularWeight: row.molecular_weight,
    smiles: row.smiles,
    homoLumoGap: row.homo_lumo_gap,
    dipoleMoment: row.dipole_moment,
    meltingPoint: row.melting_point,
    boilingPoint: row.boiling_point,
    orbitalEnergies: JSON.parse(row.orbital_energies),
    description: row.description,
    svgStructure: row.svg_structure
  };
}

export class SqliteMoleculeRepository implements IMoleculeRepository {
  async findAll(): Promise<Molecule[]> {
    const db = await getDatabase();
    const rows = await db.all<DbMolecule[]>('SELECT * FROM molecules');
    return rows.map(mapDbToDomain);
  }

  async findById(id: string): Promise<Molecule | null> {
    const db = await getDatabase();
    const row = await db.get<DbMolecule>('SELECT * FROM molecules WHERE id = ?', [id]);
    if (!row) return null;
    return mapDbToDomain(row);
  }

  async search(query: string): Promise<Molecule[]> {
    const db = await getDatabase();
    const cleanQuery = `%${query}%`;
    const rows = await db.all<DbMolecule[]>(
      `SELECT * FROM molecules 
       WHERE name LIKE ? 
          OR formula LIKE ? 
          OR iupac_name LIKE ? 
          OR smiles LIKE ?`,
      [cleanQuery, cleanQuery, cleanQuery, cleanQuery]
    );
    return rows.map(mapDbToDomain);
  }

  async create(molecule: Molecule): Promise<Molecule> {
    const db = await getDatabase();
    await db.run(
      `INSERT INTO molecules (
        id, name, formula, iupac_name, molecular_weight, smiles,
        homo_lumo_gap, dipole_moment, melting_point, boiling_point,
        orbital_energies, description, svg_structure
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        molecule.id,
        molecule.name,
        molecule.formula,
        molecule.iupacName,
        molecule.molecularWeight,
        molecule.smiles,
        molecule.homoLumoGap,
        molecule.dipoleMoment,
        molecule.meltingPoint,
        molecule.boilingPoint,
        JSON.stringify(molecule.orbitalEnergies),
        molecule.description,
        molecule.svgStructure
      ]
    );
    return molecule;
  }
}
