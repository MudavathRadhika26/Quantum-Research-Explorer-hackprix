import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileUploader } from '../components/FileUploader';
import { JSONViewer } from '../components/JSONViewer';
import { Extraction } from '../types';
import { FileText, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react';

export const UploadExtract: React.FC = () => {
  const { extractions, uploadAndExtract, clearHistory, viewMoleculeDetails, molecules } = useApp();
  const [activeExtraction, setActiveExtraction] = useState<Extraction | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleExtractionStart = () => {
    setErrorMsg(null);
    setActiveExtraction(null);
  };

  const handleExtractionSuccess = (result: Extraction) => {
    setActiveExtraction(result);
    setErrorMsg(null);
  };

  const handleExtractionError = (err: string) => {
    setErrorMsg(err);
    setActiveExtraction(null);
  };

  // Find if extracted molecule exists in our explorer directory database
  const getLinkedExplorerId = (extractedJsonStr: string): string | null => {
    try {
      const parsed = JSON.parse(extractedJsonStr);
      const molName = parsed.molecule?.toLowerCase();
      if (!molName) return null;
      const found = molecules.find((m) => m.name.toLowerCase() === molName);
      return found ? found.id : null;
    } catch {
      return null;
    }
  };

  const currentExtractedData = activeExtraction || (extractions.length > 0 ? extractions[0] : null);
  const linkedId = currentExtractedData ? getLinkedExplorerId(currentExtractedData.extractedJson) : null;

  return (
    <div className="flex flex-col gap-8" id="upload-extract-page">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-850 dark:text-slate-50 tracking-tight">
          Multimodal Research File Ingestion
        </h1>
        <p className="text-sm text-slate-550 dark:text-slate-400 mt-1 max-w-2xl">
          Upload literature PDFs, analytical CSV tables, structure scans, or lab txt logs.
          Our OCR model structures text coordinates and compound metadata into standard JSON formats.
        </p>
      </div>

      {/* Main split screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Upload dropzone (Left) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <FileUploader
            onExtractionStart={handleExtractionStart}
            onExtractionSuccess={handleExtractionSuccess}
            onExtractionError={handleExtractionError}
            uploadAndExtract={uploadAndExtract}
          />

          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 text-rose-650 dark:text-rose-455 text-sm">
              {errorMsg}
            </div>
          )}

          {/* Seed compound references for testing */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Demo Test Suggestions
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              To trigger intelligent mock parsing, try renaming your file or entering text containing:
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-2xs font-semibold">
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 rounded border border-slate-200 dark:border-slate-700">
                caffeine_report.pdf
              </span>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 rounded border border-slate-200 dark:border-slate-700">
                water_assay.csv
              </span>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 rounded border border-slate-200 dark:border-slate-700">
                benzene_bond.png
              </span>
            </div>
          </div>
        </div>

        {/* View JSON Panel (Right) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {currentExtractedData ? (
            <div className="flex flex-col gap-4">
              <JSONViewer
                data={currentExtractedData.extractedJson}
                title={`Ingestion Log: ${currentExtractedData.filename}`}
                filename={`${currentExtractedData.filename.split('.')[0]}_struct.json`}
              />

              {linkedId && (
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-950/25 flex items-center justify-between text-xs sm:text-sm text-emerald-750 dark:text-emerald-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-550 shrink-0" />
                    <span>Identified matching compound in Quantum Database!</span>
                  </div>
                  <button
                    onClick={() => viewMoleculeDetails(linkedId)}
                    className="flex items-center gap-1 text-xs font-extrabold uppercase text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
                  >
                    <span>Run Simulation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full flex items-center justify-center border border-dashed border-slate-350 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 rounded-2xl h-[350px] text-center p-6">
              <div>
                <FileText className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto stroke-1" />
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-350 mt-3">
                  Awaiting File Submission
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Upload a document to extract structured physical coordinates and JSON profiles.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History table */}
      {extractions.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3.5 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-850 dark:text-slate-100">
                Extraction Queue History
              </h3>
              <p className="text-xs text-slate-450">Review logs and reload JSON files in the scanner view.</p>
            </div>
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-rose-250 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 hover:text-rose-600 rounded-lg text-xs font-bold transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-2xs">
                  <th className="py-2.5 px-3">Filename</th>
                  <th className="py-2.5 px-3">File Size</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Ingested At</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {extractions.map((ext) => (
                  <tr 
                    key={ext.id}
                    className={`hover:bg-slate-50/50 dark:hover:bg-slate-950/20 cursor-pointer ${
                      activeExtraction?.id === ext.id || (!activeExtraction && extractions[0].id === ext.id)
                        ? 'bg-teal-50/20 dark:bg-teal-950/10'
                        : ''
                    }`}
                    onClick={() => setActiveExtraction(ext)}
                  >
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                      {ext.filename}
                    </td>
                    <td className="py-3.5 px-3 text-slate-550 dark:text-slate-400 font-mono">
                      {(ext.fileSize / 1024).toFixed(1)} KB
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {ext.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 font-mono text-2xs">
                      {new Date(ext.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveExtraction(ext);
                        }}
                        className="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
