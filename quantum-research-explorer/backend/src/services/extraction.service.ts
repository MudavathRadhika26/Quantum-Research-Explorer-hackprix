import { getDatabase } from '../config/db';
import { v4 as uuidv4 } from 'uuid'; // Wait, let's write a simple UUID generator to avoid dependency issue or install uuid.
// Actually, to avoid extra dependencies that might fail, we can write a simple random string generator or use crypto.randomUUID(). Node.js has crypto.randomUUID()!
import crypto from 'crypto';

export interface Extraction {
  id: string;
  filename: string;
  fileType: string;
  fileSize: number;
  status: 'success' | 'failed' | 'processing';
  extractedJson: string; // JSON string
  createdAt: string;
}

export class ExtractionService {
  async getHistory(): Promise<Extraction[]> {
    const db = await getDatabase();
    const rows = await db.all<any[]>('SELECT * FROM extractions ORDER BY created_at DESC');
    return rows.map(row => ({
      id: row.id,
      filename: row.filename,
      fileType: row.file_type,
      fileSize: row.file_size,
      status: row.status as any,
      extractedJson: row.extracted_json,
      createdAt: row.created_at
    }));
  }

  async clearHistory(): Promise<void> {
    const db = await getDatabase();
    await db.run('DELETE FROM extractions');
  }

  async extractData(filename: string, fileType: string, fileSize: number, fileContent?: string): Promise<Extraction> {
    const db = await getDatabase();
    const extractionId = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    
    // Simulate API delay (e.g. OCR scan or GPT-4 Vision call)
    // Here is where you would hook up the multimodal model:
    /*
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Extract structured chemical data as JSON with name, formula, molecular weight, IUPAC name, SMILES, and basic properties." },
              { type: "image_url", image_url: { url: `data:${fileType};base64,${fileBase64}` } }
            ]
          }
        ]
      });
    */

    let extractedData: any = {};
    let status: 'success' | 'failed' = 'success';

    // Build intelligent mock output depending on file properties or content
    const lowerFilename = filename.toLowerCase();
    const contentText = fileContent?.toLowerCase() || '';

    if (lowerFilename.includes('water') || contentText.includes('h2o') || contentText.includes('oxidane')) {
      extractedData = {
        molecule: 'Water',
        formula: 'H2O',
        iupacName: 'Oxidane',
        molecularWeight: 18.015,
        smiles: 'O',
        confidenceScore: 0.99,
        extractedProperties: {
          density: '1.00 g/cm³',
          meltingPoint: '0 °C',
          boilingPoint: '100 °C'
        },
        metadata: {
          ocrEngine: 'Tesseract OCR v5.0',
          llmParser: 'GPT-4 Vision (Simulated)',
          processingTimeMs: 1240
        }
      };
    } else if (lowerFilename.includes('caffeine') || contentText.includes('c8h10n4o2') || contentText.includes('trimethylpurine')) {
      extractedData = {
        molecule: 'Caffeine',
        formula: 'C8H10N4O2',
        iupacName: '1,3,7-Trimethylpurine-2,6-dione',
        molecularWeight: 194.19,
        smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C',
        confidenceScore: 0.96,
        extractedProperties: {
          density: '1.23 g/cm³',
          meltingPoint: '235 °C',
          boilingPoint: 'Decomposes'
        },
        metadata: {
          ocrEngine: 'Tesseract OCR v5.0',
          llmParser: 'GPT-4 Vision (Simulated)',
          processingTimeMs: 1850
        }
      };
    } else if (lowerFilename.includes('benzene') || contentText.includes('c6h6')) {
      extractedData = {
        molecule: 'Benzene',
        formula: 'C6H6',
        iupacName: 'Benzene',
        molecularWeight: 78.11,
        smiles: 'C1=CC=CC=C1',
        confidenceScore: 0.98,
        extractedProperties: {
          density: '0.876 g/cm³',
          meltingPoint: '5.53 °C',
          boilingPoint: '80.1 °C'
        },
        metadata: {
          ocrEngine: 'Tesseract OCR v5.0',
          llmParser: 'GPT-4 Vision (Simulated)',
          processingTimeMs: 1100
        }
      };
    } else {
      // Default / general scientific extraction mock
      extractedData = {
        molecule: 'Unknown Compound (Simulated Extract)',
        formula: 'CxHyOz (Estimated)',
        iupacName: 'Simulated IUPAC nomenclature',
        molecularWeight: Math.round((Math.random() * 200 + 50) * 100) / 100,
        smiles: 'C(=O)O...',
        confidenceScore: 0.75,
        extractedProperties: {
          density: 'Variable',
          meltingPoint: 'Pending verification',
          boilingPoint: 'Pending verification'
        },
        rawTextLinesExtracted: [
          'Found table with molecular weights',
          'Detected C-O single bonds, C=O double bonds',
          'IR absorption peaks matching alcohol functions'
        ],
        metadata: {
          ocrEngine: 'Tesseract OCR v5.0',
          llmParser: 'GPT-4 Vision (Simulated)',
          processingTimeMs: 2100
        }
      };
    }

    const extractedJson = JSON.stringify(extractedData, null, 2);

    await db.run(
      `INSERT INTO extractions (id, filename, file_type, file_size, status, extracted_json, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [extractionId, filename, fileType, fileSize, status, extractedJson, createdAt]
    );

    return {
      id: extractionId,
      filename,
      fileType,
      fileSize,
      status,
      extractedJson,
      createdAt
    };
  }
}
