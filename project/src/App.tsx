import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ConvertPage } from './pages/ConvertPage';

function App() {
  console.log('App renderizado');
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/convert/:type" element={<ConvertPage />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;