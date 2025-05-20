import { createContext, useState, useContext, ReactNode } from 'react';
import englishTranslations from '../data/translations/en';
import nepaliTranslations from '../data/translations/np';

type Language = 'en' | 'np';
type Translations = typeof englishTranslations;

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const translations = language === 'en' ? englishTranslations : nepaliTranslations;
  
  const t = (key: keyof Translations) => {
    return translations[key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};