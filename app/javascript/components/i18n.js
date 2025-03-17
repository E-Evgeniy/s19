import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
            description: {
                analys: 'Анализ',
                test: 'Тест',
                exit: 'ВЫХОД',
                load_data: 'Загрузка данных',
                main_page: 'Главная страница',
                add_files: 'Добавьте файлы для анализа',
                result: 'Результат',
                name_pairs: 'Валютные пары',
                name_pairs_new: 'Добавить валютную пару',
                name_pair: 'Наименование валютной пары',
                name_pair_enter: 'Введите наименование валютной пары',
                multiplier: 'Множитель',
                multiplier_enter: 'Введите множитель',
                add: 'Добавить',
                pair_duplicate: 'Пара уже существует',
                action: 'Действия',
                item_name_enter0: 'Начните вводить имя',

                exams: 'Экзамены',
                multiplication_table: 'Таблица умножения',
                send: 'Отправить на проверку',
                result_enter: 'Введите результат',
                example: 'Пример',
                
              }
        }
      }
    }
  });

export default i18n;