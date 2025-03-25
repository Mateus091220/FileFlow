import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileUp, FileDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Footer from '../components/Footer';
import Header from '../components/Header'; // Importe o Header

// Ajustar as chaves para plural
const formatOptions = {
  images: ['PNG', 'JPEG', 'WEBP', 'GIF', 'SVG', 'TIFF', 'BMP', 'ICO', 'HEIC'],
  audio: ['MP3', 'WAV', 'OGG', 'M4A', 'FLAC', 'AAC', 'WMA', 'AIFF'],
  documents: ['PDF', 'DOCX', 'DOC', 'TXT', 'RTF', 'ODT', 'PAGES', 'EPUB', 'MOBI', 'FB2', 'HTML', 'MD'],
  video: ['MP4', 'AVI', 'MKV', 'MOV', 'WMV', 'FLV', 'WEBM', 'M4V', '3GP'],
  code: ['JSON', 'XML', 'YAML', 'CSV', 'SQL', 'HTML', 'JS', 'TS', 'PY', 'JAVA', 'CPP', 'CS'],
  spreadsheet: ['XLSX', 'XLS', 'CSV', 'ODS', 'NUMBERS', 'TSV'],
  archive: ['ZIP', 'RAR', '7Z', 'TAR', 'GZ', 'BZ2', 'XZ'],
} as const;

type FileType = keyof typeof formatOptions;
type FileStatus = 'idle' | 'converting' | 'done' | 'error';

const isValidFileType = (file: File, type: FileType) => {
  const validExtensions = formatOptions[type].map(ext => ext.toLowerCase());
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  return fileExtension && validExtensions.includes(fileExtension);
};

export function ConvertPage() {
  const { type } = useParams<{ type: string }>();
  const { t } = useLanguage();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('');
  const [status, setStatus] = useState<FileStatus>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const validType = type && type in formatOptions ? type as FileType : null;

  if (!validType) {
    return <div className="text-center text-red-600">{t.invalidConversionType || 'Invalid conversion type'}</div>;
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && validType && isValidFileType(file, validType)) {
      setSelectedFile(file);
    } else {
      alert(t.invalidFileType || 'Invalid file type for this conversion.');
    }
  }, [t, validType]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validType && isValidFileType(file, validType)) {
      setSelectedFile(file);
    } else {
      alert(t.invalidFileType || 'Invalid file type for this conversion.');
    }
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
      {/* Adicionando o Header */}
      <Header />

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">{getTitle()}</h1>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-8 mb-4 md:mb-8 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input type="file" id="file-input" className="hidden" onChange={handleFileChange} />
          <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center">
            <FileUp className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mb-2 md:mb-4" />
            <p className="text-sm md:text-base text-gray-600 mb-1 md:mb-2">{t.dragDrop}</p>
            <p className="text-xs md:text-sm text-gray-500">{selectedFile ? selectedFile.name : t.noFileSelected}</p>
          </label>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-8">
          <div className="w-full md:flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">{t.convertTo}</label>
            <select
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm md:text-base"
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value)}
            >
              <option value="">{t.selectFormat}</option>
              {formatOptions[validType].map((format) => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>

          <div className="w-full md:flex-1">
            <button
              onClick={handleConvert}
              disabled={!selectedFile || !targetFormat || status === 'converting'}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
            >
              {status === 'converting' ? `⏳ ${t.converting}` : t.convert}
            </button>
          </div>
        </div>
      </div>

      {/* Rodapé presente em todas as páginas */}
      <Footer />
    </div>
  );
}
