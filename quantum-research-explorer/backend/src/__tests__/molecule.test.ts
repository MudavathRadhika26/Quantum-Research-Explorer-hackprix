import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app';
import { initDatabase } from '../database/schema';
import { seedDatabase } from '../database/seed';

describe('Quantum Research Explorer Backend API Tests', () => {
  beforeAll(async () => {
    // Set up database and seed values before testing
    await initDatabase();
    await seedDatabase();
  });

  it('should respond to health check', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('should retrieve list of molecules', async () => {
    const res = await request(app).get('/api/molecules');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('formula');
  });

  it('should retrieve a specific molecule by ID', async () => {
    const res = await request(app).get('/api/molecules/water');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('water');
    expect(res.body.name).toBe('Water');
    expect(res.body.formula).toBe('H2O');
  });

  it('should fail to find non-existent molecule', async () => {
    const res = await request(app).get('/api/molecules/nonexistent');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should run simulated extraction', async () => {
    const mockFile = {
      filename: 'caffeine_structure.png',
      fileType: 'image/png',
      fileSize: 10245
    };
    
    const res = await request(app)
      .post('/api/data/extract')
      .send(mockFile);
      
    expect(res.status).toBe(201);
    expect(res.body.filename).toBe(mockFile.filename);
    expect(res.body.status).toBe('success');
    expect(res.body.extractedJson).toBeDefined();
    
    const json = JSON.parse(res.body.extractedJson);
    expect(json.molecule).toBe('Caffeine');
    expect(json.formula).toBe('C8H10N4O2');
  });

  it('should run a molecule simulation', async () => {
    const res = await request(app)
      .post('/api/simulate')
      .send({
        moleculeId: 'water',
        functional: 'B3LYP',
        basisSet: '6-31G(d)'
      });
      
    expect(res.status).toBe(200);
    expect(res.body.moleculeId).toBe('water');
    expect(res.body.converged).toBe(true);
    expect(res.body.logs.length).toBeGreaterThan(0);
    expect(res.body.scfCycles.length).toBeGreaterThan(0);
  });
});
