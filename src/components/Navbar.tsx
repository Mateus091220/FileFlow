import { NavLink } from 'react-router-dom';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type FileType = 'images' | 'audio' | 'video' | 'documents' | 'code' | 'spreadsheet' | 'archive';

export function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();

  const fileTypes = ['images', 'audio', 'video', 'documents', 'code', 'spreadsheet', 'archive'] as const;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-indigo-600">{t.title}</span>
          </NavLink>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              {fileTypes.map((type) => (
                <NavLink
                  key={type}
                  to={`/convert/${type}`}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'
                    }`
                  }
                >
                  {t[type]}
                </NavLink>
              ))}
            </div>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <Languages className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}