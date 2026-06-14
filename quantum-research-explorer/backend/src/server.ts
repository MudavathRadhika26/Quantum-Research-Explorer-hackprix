import app from './app';
import { initDatabase } from './database/schema';
import { seedDatabase } from './database/seed';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('Initializing database schema...');
    await initDatabase();
    
    console.log('Seeding database with molecules...');
    await seedDatabase();
    
    app.listen(PORT, () => {
      console.log(`===================================================`);
      console.log(` Quantum Research Explorer Backend running on:      `);
      console.log(` http://localhost:${PORT}                           `);
      console.log(`===================================================`);
    });
  } catch (error) {
    console.error('Fatal: Failed to start Quantum Research Explorer Server:', error);
    process.exit(1);
  }
}

startServer();
