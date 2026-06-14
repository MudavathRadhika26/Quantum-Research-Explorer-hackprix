import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';

interface DownloadButtonProps {
  content: string;
  filename: string;
  label?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ content, filename, label }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    try {
      setDownloading(true);
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setTimeout(() => setDownloading(false), 2000);
    } catch (err) {
      console.error('Failed to download file', err);
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-150 active:scale-95 shadow-sm"
      id={`download-btn-${filename}`}
    >
      {downloading ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-emerald-600 dark:text-emerald-400">Downloaded!</span>
        </>
      ) : (
        <>
          <Download className="w-3.5 h-3.5 text-slate-400" />
          <span>{label || 'Download'}</span>
        </>
      )}
    </button>
  );
};
