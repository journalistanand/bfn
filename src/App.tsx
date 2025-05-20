import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LanguageSelector from './components/common/LanguageSelector';
import HomePage from './pages/HomePage';
import DonorRegistrationPage from './pages/DonorRegistrationPage';
import RequestBloodPage from './pages/RequestBloodPage';
import FindDonorsPage from './pages/FindDonorsPage';
import EducationPage from './pages/EducationPage';
import EmergencyPage from './pages/EmergencyPage';
import DashboardPage from './pages/DashboardPage';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <LanguageProvider>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<DonorRegistrationPage />} />
            <Route path="/request" element={<RequestBloodPage />} />
            <Route path="/find" element={<FindDonorsPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        <div className="fixed bottom-4 right-4 z-50">
          <LanguageSelector />
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;