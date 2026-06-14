import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

let dbInstance: Database | null = null;

export async function getDatabase(): Promise<Database> {
  if (dbInstance) {
    return dbInstance;
  }
  
  const dbPath = path.resolve(__dirname, '../../database.sqlite');
  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  
  return dbInstance;
}
