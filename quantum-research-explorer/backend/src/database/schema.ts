import { getDatabase } from '../config/db';

export async function initDatabase(): Promise<void> {
  const db = await getDatabase();
  
  // Enable foreign keys
  await db.run('PRAGMA foreign_keys = ON;');
  
  // Create molecules table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS molecules (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      formula TEXT NOT NULL,
      iupac_name TEXT NOT NULL,
      molecular_weight REAL NOT NULL,
      smiles TEXT NOT NULL,
      homo_lumo_gap REAL NOT NULL,
      dipole_moment REAL NOT NULL,
      melting_point TEXT NOT NULL,
      boiling_point TEXT NOT NULL,
      orbital_energies TEXT NOT NULL, -- JSON stringified array of numbers
      description TEXT NOT NULL,
      svg_structure TEXT NOT NULL -- SVG string for simple structure rendering
    );
  `);
  
  // Create extractions table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS extractions (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      file_type TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      status TEXT NOT NULL, -- 'success', 'failed', 'processing'
      extracted_json TEXT,  -- JSON stringified extracted results
      created_at TEXT NOT NULL
    );
  `);
}
