import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate(); // Inicialize o hook

  const handleGetStarted = () => {
    navigate('/convert/images'); // Redirecione para a tela de conversão de imagens
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-indigo-600">{t.heroTitle}</h1>
      <p className="mt-4 text-lg text-gray-700">{t.heroSubtitle}</p>
      <button
        onClick={handleGetStarted} // Adicione o evento de clique
        className="mt-6 px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        {t.getStarted}
      </button>
    </div>
  );
};

export { HomePage };