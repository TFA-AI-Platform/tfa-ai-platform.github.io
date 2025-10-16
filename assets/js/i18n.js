/**
 * i18n.js - Internationalization system for TFA AI Platform
 * Handles language switching and translation of page content
 */

(function() {
  'use strict';

  // Default language
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'tfa_language';

  // i18n object
  window.i18n = {
    currentLang: DEFAULT_LANG,
    translations: {},

    /**
     * Initialize i18n system
     */
    init: function() {
      // Load translations from global translations object
      if (window.translations) {
        this.translations = window.translations;
      } else {
        console.warn('Translations not loaded yet, retrying...');
        // Retry after a short delay
        setTimeout(() => this.init(), 100);
        return;
      }

      // Get saved language from localStorage or use default
      const savedLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
      this.setLanguage(savedLang, false);

      // Set up language switcher click handlers
      this.setupLanguageSwitcher();

      // Update language switcher display
      this.updateLanguageSwitcherDisplay();
    },

    /**
     * Get translation for a key
     * @param {string} key - Translation key (e.g., 'nav.home')
     * @param {string} defaultValue - Default value if translation not found
     * @returns {string} Translated text
     */
    t: function(key, defaultValue = '') {
      const lang = this.currentLang;
      
      if (this.translations[lang] && this.translations[lang][key]) {
        return this.translations[lang][key];
      }
      // Fallback to English if translation not found
      if (lang !== 'en' && this.translations['en'] && this.translations['en'][key]) {
        return this.translations['en'][key];
      }
      return defaultValue || key;
    },

    /**
     * Set current language and update page
     * @param {string} lang - Language code ('en' or 'ja')
     * @param {boolean} saveToStorage - Whether to save to localStorage
     */
    setLanguage: function(lang, saveToStorage = true) {
      if (!this.translations[lang]) {
        console.warn(`Language '${lang}' not found, using default`);
        lang = DEFAULT_LANG;
      }

      this.currentLang = lang;

      if (saveToStorage) {
        localStorage.setItem(STORAGE_KEY, lang);
      }

      // Update HTML lang attribute
      document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';

      // Translate all elements with data-i18n attribute
      this.translatePage();

      // Update language switcher display
      this.updateLanguageSwitcherDisplay();

      // Trigger custom event for other scripts
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
    },

    /**
     * Translate all elements on the page
     */
    translatePage: function() {
      const elements = document.querySelectorAll('[data-i18n]');
      
      elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = this.t(key);
        
        // Check if element has data-i18n-attr for attribute translation
        const attr = element.getAttribute('data-i18n-attr');
        if (attr) {
          element.setAttribute(attr, translation);
        } else {
          // Update text content
          element.textContent = translation;
        }
      });

      // Translate placeholders
      const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
      placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = this.t(key);
        element.setAttribute('placeholder', translation);
      });
    },

    /**
     * Setup language switcher click handlers
     */
    setupLanguageSwitcher: function() {
      // Handle language dropdown clicks
      document.addEventListener('click', (e) => {
        const langLink = e.target.closest('[data-lang]');
        if (langLink) {
          e.preventDefault();
          const lang = langLink.getAttribute('data-lang');
          this.setLanguage(lang);
        }
      });
    },

    /**
     * Update language switcher display
     */
    updateLanguageSwitcherDisplay: function() {
      const switcher = document.getElementById('language-switcher') || document.querySelector('.language-select .nav-link');
      if (switcher) {
        switcher.textContent = this.currentLang === 'ja' ? '日本語' : 'En';
      }

      // Update active state in dropdown
      const dropdownItems = document.querySelectorAll('.language-select .dropdown-item[data-lang]');
      dropdownItems.forEach(item => {
        const itemLang = item.getAttribute('data-lang');
        if (itemLang === this.currentLang) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    },

    /**
     * Get current language
     * @returns {string} Current language code
     */
    getCurrentLanguage: function() {
      return this.currentLang;
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.i18n.init());
  } else {
    window.i18n.init();
  }

})();

