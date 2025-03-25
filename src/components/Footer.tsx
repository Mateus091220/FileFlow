import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Tipos de conversão disponíveis
  const conversionTypes = [
    { id: 'images', label: t.images },
    { id: 'audio', label: t.audio },
    { id: 'documents', label: t.documents },
    { id: 'video', label: t.video },
    { id: 'code', label: t.code },
    { id: 'spreadsheet', label: t.spreadsheet },
    { id: 'archive', label: t.archive },
  ];

  return (
    <footer className="bg-white py-6 mt-12 shadow-inner">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <p>© {new Date().getFullYear()} FileFlow. {t.rightsReserved || 'All rights reserved.'}</p>

        {/* Lista de formatos de conversão */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">{t.supportedFormats}</h3>
          <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-indigo-600">
            {conversionTypes.map((item) => (
              <button 
                key={item.id} 
                onClick={() => navigate(`/convert/${item.id}`)}
                className="hover:underline"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
