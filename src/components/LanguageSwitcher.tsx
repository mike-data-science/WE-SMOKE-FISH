'use client';

import { useLanguageStore, Language } from '../i18n/store';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="flex gap-2 bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-2xl">
      {(['ro', 'en', 'ru'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => toggleLanguage(lang)}
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all duration-300 ${
            language === lang
              ? 'bg-[#0033FF] text-white shadow-[0_0_10px_rgba(0,51,255,0.4)]'
              : 'text-white/50 hover:text-white hover:bg-white/10'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
