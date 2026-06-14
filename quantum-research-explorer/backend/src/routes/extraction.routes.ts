import { Router } from 'express';
import { getExtractionHistory, clearExtractionHistory, runExtraction } from '../controllers/extraction.controller';

const router = Router();

router.get('/history', getExtractionHistory);
router.delete('/history', clearExtractionHistory);
router.post('/extract', runExtraction);

export default router;
