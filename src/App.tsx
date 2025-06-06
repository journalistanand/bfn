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
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // This will be replaced with actual auth logic later
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
            {/* Public Routes */}
            <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/emergency" element={<EmergencyPage />} />
            </Route>

            {/* Restricted Public Routes (redirect if authenticated) */}
            <Route element={<PublicRoute isAuthenticated={isAuthenticated} restricted={true} />}>
              <Route path="/register" element={<DonorRegistrationPage />} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/request" element={<RequestBloodPage />} />
              <Route path="/find" element={<FindDonorsPage />} />
            </Route>
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