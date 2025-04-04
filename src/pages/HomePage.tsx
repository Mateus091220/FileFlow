import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Footer from '../components/Footer';
import { 
  ImageIcon, MusicIcon, FileTextIcon, 
  VideoIcon, CodeIcon, TableIcon, 
  ArchiveIcon, ChevronRightIcon, GlobeIcon 
} from 'lucide-react';

const HomePage: React.FC = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const navigate = useNavigate();

  // Tipos de conversão disponíveis
  const conversionTypes = [
    { id: 'images', icon: <ImageIcon className="w-6 h-6" />, label: t.images },
    { id: 'audio', icon: <MusicIcon className="w-6 h-6" />, label: t.audio },
    { id: 'documents', icon: <FileTextIcon className="w-6 h-6" />, label: t.documents },
    { id: 'video', icon: <VideoIcon className="w-6 h-6" />, label: t.video },
    { id: 'code', icon: <CodeIcon className="w-6 h-6" />, label: t.code },
    { id: 'spreadsheet', icon: <TableIcon className="w-6 h-6" />, label: t.spreadsheet },
    { id: 'archive', icon: <ArchiveIcon className="w-6 h-6" />, label: t.archive },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 flex flex-col">
      {/* Header (sem Header.tsx agora) */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Botão de troca de idioma */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
          >
            <GlobeIcon className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Português' : 'English'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center flex-grow">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t.heroTitle}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t.heroSubtitle}
        </p>
        <button
          onClick={() => navigate('/convert/images')}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center mx-auto"
        >
          {t.getStarted} <ChevronRightIcon className="ml-2" />
        </button>
      </section>

      {/* Seção de Conversão */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          {t.supportedFormats}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {conversionTypes.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/convert/${item.id}`)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center"
            >
              <div className="bg-indigo-100 p-3 rounded-full mb-4">
                {item.icon}
              </div>
              <h3 className="font-medium text-gray-800">{item.label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Rodapé Importado */}
      <Footer />
      
    </div>
  );
};

export { HomePage };
