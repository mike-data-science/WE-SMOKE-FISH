import { useLanguageStore } from '../i18n/store';
import { en } from '../i18n/dictionaries/en';
import { ro } from '../i18n/dictionaries/ro';
import { ru } from '../i18n/dictionaries/ru';

const dictionaries = {
  en,
  ro,
  ru,
};

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);
  const dict = dictionaries[language] || dictionaries['ro'];

  const t = (key: string, variables?: Record<string, string | number>) => {
    const keys = key.split('.');
    let value: any = dict;

    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }

    let text = value || key; // Fallback to key if missing

    if (variables && typeof text === 'string') {
      Object.keys(variables).forEach((v) => {
        text = text.replace(new RegExp(`{${v}}`, 'g'), String(variables[v]));
      });
    }

    return text as string;
  };

  return { t, language };
}
