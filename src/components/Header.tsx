import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';  // Certifique-se de que a importação esteja correta

const Header: React.FC = () => {
  const { t, toggleLanguage, language } = useLanguage();  // 't' agora é um objeto, não uma função

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">{t.heroTitle}</h1>  {/* Acessando diretamente a chave do objeto */}

        {/* Botão de troca de idioma */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
        >
          {language === 'en' ? 'Português' : 'English'}  {/* Exibindo texto fixo para alternar entre os idiomas */}
          </button>
      </div>
    </header>
  );
};

export default Header;