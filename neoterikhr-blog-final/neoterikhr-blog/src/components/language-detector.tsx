"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function LanguageDetector() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        
        // Automatically set language based on country
        if (data.country_code === 'VN') {
          i18n.changeLanguage('vi');
        } else if (data.country_code === 'FR') {
          i18n.changeLanguage('fr'); // Example for other languages if added
        } else {
          i18n.changeLanguage('en');
        }
      } catch (error) {
        i18n.changeLanguage('en'); // Fallback to English
      }
    };

    detectLanguage();
  }, [i18n]);

  return null;
}