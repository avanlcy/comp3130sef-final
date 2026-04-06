import { Language } from '../models/Language';

const translations = {
  // Main page
  appTitle: { en: 'COMP3130SEF School Finder', zh: 'COMP3130SEF 香港學校' },
  searchPlaceholder: { en: 'Search schools...', zh: '搜尋學校...' },
  updateSchools: { en: 'Update Schools', zh: '更新學校' },
  sortName: { en: 'Name', zh: '名稱' },
  sortDistrict: { en: 'District', zh: '分區' },
  sortCategory: { en: 'Category', zh: '類別' },
  favourites: { en: 'Favourites', zh: '收藏' },

  // Language labels
  langEn: { en: 'ENG', zh: 'ENG' },
  langZh: { en: '中文', zh: '中文' },

  // Detail page
  details: { en: 'Details', zh: '詳情' },
  back: { en: 'Back', zh: '返回' },
  addToFavourites: { en: 'Add to Favourites', zh: '加入收藏' },
  removeFromFavourites: { en: 'Remove from Favourites', zh: '移除收藏' },
  location: { en: 'Location', zh: '位置' },
  copyCoords: { en: 'Copy Coords', zh: '複製座標' },
  copied: { en: 'Copied', zh: '已複製' },

  // Detail row labels
  schoolNo: { en: 'School No.', zh: '學校編號' },
  category: { en: 'Category', zh: '類別' },
  address: { en: 'Address', zh: '地址' },
  district: { en: 'District', zh: '分區' },
  schoolLevel: { en: 'School Level', zh: '學校類型' },
  financeType: { en: 'Finance Type', zh: '資助種類' },
  session: { en: 'Session', zh: '授課時間' },
  gender: { en: 'Gender', zh: '學生性別' },
  religion: { en: 'Religion', zh: '宗教' },
  telephone: { en: 'Telephone', zh: '電話' },
  fax: { en: 'Fax', zh: '傳真' },
  website: { en: 'Website', zh: '網頁' },

  // Language change page
  languages: { en: 'Languages', zh: '語言' },
} as const;

type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, language: Language): string {
  return translations[key][language];
}
