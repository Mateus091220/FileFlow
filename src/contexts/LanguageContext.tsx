import React, { createContext, useContext, useState, ReactNode } from 'react';

const translations = {
  en: {
    title: 'FileFlow',
    subtitle: 'Convert your files effortlessly',
    heroTitle: 'Universal File Converter',
    heroSubtitle: 'Transform any file format with just a few clicks',
    getStarted: 'Get Started',
    features: 'Features',
    supportedFormats: 'Supported Formats',
    images: 'Images',
    audio: 'Audio',
    documents: 'Documents',
    video: 'Video',
    code: 'Code',
    spreadsheet: 'Spreadsheet',
    archive: 'Archive',
    dragDrop: 'Drag and drop your file here or click to browse',
    noFileSelected: 'No file selected',
    convertTo: 'Convert to:',
    selectFormat: 'Select format',
    converting: 'Converting...',
    convert: 'Convert',
    conversionComplete: 'Conversion complete! Your file is ready to download.',
    downloadFile: 'Download File',
    invalidConversionType: 'Invalid conversion type',
    conversionFailed: 'Conversion failed. Please try again.',
  },
  pt: {
    title: 'FileFlow',
    subtitle: 'Converta seus arquivos facilmente',
    heroTitle: 'Conversor Universal de Arquivos',
    heroSubtitle: 'Transforme qualquer formato de arquivo com apenas alguns cliques',
    getStarted: 'Começar',
    features: 'Funcionalidades',
    supportedFormats: 'Formatos Suportados',
    images: 'Imagens',
    audio: 'Áudio',
    documents: 'Documentos',
    video: 'Vídeo',
    code: 'Código',
    spreadsheet: 'Planilha',
    archive: 'Arquivo',
    dragDrop: 'Arraste e solte seu arquivo aqui ou clique para procurar',
    noFileSelected: 'Nenhum arquivo selecionado',
    convertTo: 'Converter para:',
    selectFormat: 'Selecione o formato',
    converting: 'Convertendo...',
    convert: 'Converter',
    conversionComplete: 'Conversão concluída! Seu arquivo está pronto para download.',
    downloadFile: 'Baixar Arquivo',
    invalidConversionType: 'Tipo de conversão inválido',
    conversionFailed: 'Falha na conversão. Por favor, tente novamente.',
  },
};

interface LanguageContextType {
  language: 'en' | 'pt';
  t: typeof translations['en'];
  setLanguage: (language: 'en' | 'pt') => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'pt'>('en');
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};