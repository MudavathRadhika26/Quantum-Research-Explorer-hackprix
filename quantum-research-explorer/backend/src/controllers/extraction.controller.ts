import { Request, Response } from 'express';
import { ExtractionService } from '../services/extraction.service';

const service = new ExtractionService();

export async function getExtractionHistory(req: Request, res: Response): Promise<void> {
  try {
    const list = await service.getHistory();
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch history' });
  }
}

export async function clearExtractionHistory(req: Request, res: Response): Promise<void> {
  try {
    await service.clearHistory();
    res.json({ message: 'Extraction history cleared successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to clear history' });
  }
}

export async function runExtraction(req: Request, res: Response): Promise<void> {
  try {
    const { filename, fileType, fileSize, fileContent } = req.body;
    if (!filename || !fileType) {
      res.status(400).json({ error: 'Filename and fileType are required' });
      return;
    }
    const result = await service.extractData(filename, fileType, Number(fileSize || 0), fileContent);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to extract research data' });
  }
}
