import express from 'express';
import cors from 'cors';
import moleculeRoutes from './routes/molecule.routes';
import extractionRoutes from './routes/extraction.routes';
import simulationRoutes from './routes/simulation.routes';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/molecules', moleculeRoutes);
app.use('/api/data', extractionRoutes);
app.use('/api/simulate', simulationRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

export default app;
