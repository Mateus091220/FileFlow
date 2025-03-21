import React from 'react';
import { useLanguage } from '../contexts/LanguageContext'; // Verifique o caminho

const HomePage: React.FC = () => {
  const { t } = useLanguage(); // Deve funcionar se LanguageProvider estiver envolvendo

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-indigo-600">{t.heroTitle}</h1>
      <p className="mt-4 text-lg text-gray-700">{t.heroSubtitle}</p>
      <button className="mt-6 px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
        {t.getStarted}
      </button>
    </div>
  );
};

export { HomePage }; // Exportação nomeada