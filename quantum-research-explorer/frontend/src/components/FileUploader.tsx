import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, AlertCircle, RefreshCw } from 'lucide-react';
import { Extraction } from '../types';

interface FileUploaderProps {
  onExtractionSuccess: (extraction: Extraction) => void;
  onExtractionStart: () => void;
  onExtractionError: (error: string) => void;
  uploadAndExtract: (filename: string, fileType: string, fileSize: number, fileContent?: string) => Promise<Extraction>;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onExtractionSuccess,
  onExtractionStart,
  onExtractionError,
  uploadAndExtract
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = [
    'application/pdf',
    'text/csv',
    'text/plain',
    'image/png',
    'image/jpeg',
    'image/jpg'
  ];

  const processFile = async (file: File) => {
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.pdf')) {
      onExtractionError('Invalid file type. Please upload a PDF, CSV, image, or text file.');
      return;
    }

    setLoading(true);
    setFileName(file.name);
    onExtractionStart();

    try {
      let content: string | undefined = undefined;
      
      // If text-based file, read it as text
      if (file.type === 'text/plain' || file.type === 'text/csv' || file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
        content = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve((e.target?.result as string) || '');
          reader.readAsText(file);
        });
      }

      // Simulate network / model analysis lag (1.5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const result = await uploadAndExtract(
        file.name,
        file.type || 'application/octet-stream',
        file.size,
        content
      );

      onExtractionSuccess(result);
    } catch (err: any) {
      console.error('File parsing failed:', err);
      onExtractionError(err.message || 'Analysis failed. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full" id="file-uploader-wrapper">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative w-full rounded-2xl border-2 border-dashed p-10 flex flex-col items-center justify-center transition-all duration-300 ${
          isDragActive
            ? 'border-teal-500 bg-teal-50/30 dark:bg-teal-950/20 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50'
        } ${loading ? 'pointer-events-none' : 'cursor-pointer hover:border-slate-400 dark:hover:border-slate-700'}`}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.csv,.png,.jpg,.jpeg,.txt"
          onChange={handleFileChange}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Outer spinning ring */}
              <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-teal-500 dark:border-t-teal-400 animate-spin"></div>
              <FileText className="w-6 h-6 text-teal-500 dark:text-teal-400" />
            </div>
            
            {/* Holographic scanner effect line */}
            <div className="scanner-line !w-1/2 left-1/4 mt-12"></div>
            
            <h3 className="mt-8 font-semibold text-slate-800 dark:text-slate-200 animate-pulse">
              AI Document Scanning...
            </h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              Extracting structured chemical JSON for {fileName}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-full text-teal-600 dark:text-teal-400 mb-4 transition-transform duration-300 group-hover:scale-110">
              <UploadCloud className="w-10 h-10" />
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Drag & Drop Research File
            </h3>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              Upload PDF, CSV, PNG, JPG, or TXT. Our model will structure coordinates, IUPAC details, and molecular physical parameters.
            </p>
            <div className="mt-6 flex gap-2">
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                PDF
              </span>
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                CSV
              </span>
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                PNG/JPG
              </span>
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                TXT
              </span>
            </div>
            <button className="mt-6 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-850 dark:hover:bg-slate-700 transition-colors shadow-md">
              Select File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
