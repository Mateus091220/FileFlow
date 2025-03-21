import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileUp, FileDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Ajustar as chaves para plural
const formatOptions = {
  images: ['PNG', 'JPEG', 'WEBP', 'GIF', 'SVG', 'TIFF', 'BMP', 'ICO', 'HEIC'],
  audio: ['MP3', 'WAV', 'OGG', 'M4A', 'FLAC', 'AAC', 'WMA', 'AIFF'], // Já está correto
  documents: ['PDF', 'DOCX', 'DOC', 'TXT', 'RTF', 'ODT', 'PAGES', 'EPUB', 'MOBI', 'FB2', 'HTML', 'MD'],
  video: ['MP4', 'AVI', 'MKV', 'MOV', 'WMV', 'FLV', 'WEBM', 'M4V', '3GP'], // Já está correto
  code: ['JSON', 'XML', 'YAML', 'CSV', 'SQL', 'HTML', 'JS', 'TS', 'PY', 'JAVA', 'CPP', 'CS'], // Já está correto
  spreadsheet: ['XLSX', 'XLS', 'CSV', 'ODS', 'NUMBERS', 'TSV'], // Já está correto
  archive: ['ZIP', 'RAR', '7Z', 'TAR', 'GZ', 'BZ2', 'XZ'], // Já está correto
} as const;

type FileType = keyof typeof formatOptions;
type FileStatus = 'idle' | 'converting' | 'done' | 'error';

export function ConvertPage() {
  const { type } = useParams<{ type: string }>();
  const { t } = useLanguage();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('');
  const [status, setStatus] = useState<FileStatus>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleConvert = () => {
    if (!selectedFile || !targetFormat) return;

    setStatus('converting');
    setTimeout(() => {
      try {
        const blob = new Blob([selectedFile], { type: `application/${targetFormat.toLowerCase()}` });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setStatus('done');
      } catch (error) {
        console.error('Conversion failed:', error);
        setStatus('error');
      }
    }, 2000);
  };

  useEffect(() => {
    if (status === 'done' && downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${selectedFile?.name.split('.')[0] || 'converted'}.${targetFormat.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return () => URL.revokeObjectURL(downloadUrl);
    }
  }, [status, downloadUrl, selectedFile, targetFormat]);

  const validType = type && type in formatOptions ? type as FileType : null;
  if (!validType) {
    return <div className="text-center text-red-600">{t.invalidConversionType || 'Invalid conversion type'}</div>;
  }

  const getTitle = () => {
    switch (validType) {
      case 'images': return t.images;
      case 'audio': return t.audio;
      case 'documents': return t.documents;
      case 'video': return t.video;
      case 'code': return t.code;
      case 'spreadsheet': return t.spreadsheet;
      case 'archive': return t.archive;
      default: return t.convert;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{getTitle()}</h1>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-input"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-input"
            className="cursor-pointer flex flex-col items-center"
          >
            <FileUp className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">{t.dragDrop}</p>
            <p className="text-sm text-gray-500">
              {selectedFile ? selectedFile.name : t.noFileSelected}
            </p>
          </label>
        </div>
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.convertTo}
            </label>
            <select
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value)}
            >
              <option value="">{t.selectFormat}</option>
              {formatOptions[validType].map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <button
              onClick={handleConvert}
              disabled={!selectedFile || !targetFormat || status === 'converting'}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'converting' ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">⏳</span> {t.converting}
                </span>
              ) : (
                t.convert
              )}
            </button>
          </div>
        </div>
        {status === 'done' && downloadUrl && (
          <div className="text-center mt-8">
            <FileDown className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-900">{t.conversionComplete}</p>
            <a
              href={downloadUrl}
              download={`${selectedFile?.name.split('.')[0] || 'converted'}.${targetFormat.toLowerCase()}`}
              className="mt-4 inline-block bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              ⬇️ {t.downloadFile}
            </a>
          </div>
        )}
        {status === 'error' && (
          <div className="text-center mt-8 text-red-600">
            <p>{t.conversionFailed || 'Conversion failed. Please try again.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}