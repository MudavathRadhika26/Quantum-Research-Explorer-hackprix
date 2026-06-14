import React from 'react';
import { CopyButton } from './CopyButton';
import { DownloadButton } from './DownloadButton';

interface JSONViewerProps {
  data: string | object;
  title?: string;
  filename?: string;
}

export const JSONViewer: React.FC<JSONViewerProps> = ({ data, title = 'Extracted Chemistry Schema', filename = 'compound_extract.json' }) => {
  const jsonString = typeof data === 'string' ? data : JSON.stringify(data, null, 2);

  // Simple syntax highlighter for JSON strings
  const getHighlightedJSON = (json: string) => {
    const escaped = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    return escaped.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = 'text-amber-500 dark:text-amber-400'; // number
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'text-teal-600 dark:text-teal-400 font-medium'; // key
          } else {
            cls = 'text-emerald-600 dark:text-emerald-400'; // string
          }
        } else if (/true|false/.test(match)) {
          cls = 'text-rose-500 dark:text-rose-400'; // boolean
        } else if (/null/.test(match)) {
          cls = 'text-slate-400 dark:text-slate-500'; // null
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  };

  return (
    <div className="w-full flex flex-col h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-xl" id="json-viewer-container">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/70">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
          <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-400 font-mono">
            {title}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={jsonString} label="Copy JSON" />
          <DownloadButton content={jsonString} filename={filename} label="Download JSON" />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-5 font-mono text-sm leading-relaxed max-h-[500px]">
        <pre 
          className="whitespace-pre-wrap break-all select-text"
          dangerouslySetInnerHTML={{ __html: getHighlightedJSON(jsonString) }}
        />
      </div>
    </div>
  );
};
