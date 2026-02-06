import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to NeoterikHR Blog",
      "reviews": "Reviews",
      "categories": "Categories",
      "login": "Login",
      "register": "Register",
      "logout": "Logout",
      "read_more": "Read More",
      "pros": "Pros",
      "cons": "Cons",
      "rating": "Rating",
      "all_categories": "All Categories",
      "search_placeholder": "Search reviews...",
      "home": "Home",
      "about": "About",
      "contact": "Contact",
      "footer_text": "© 2026 NeoterikHR Blog. All rights reserved.",
      "affiliate_disclosure": "Disclosure: This post may contain affiliate links, meaning we get a commission if you decide to make a purchase through our links, at no cost to you.",
    }
  },
  vi: {
    translation: {
      "welcome": "Chào mừng đến với NeoterikHR Blog",
      "reviews": "Đánh giá",
      "categories": "Danh mục",
      "login": "Đăng nhập",
      "register": "Đăng ký",
      "logout": "Đăng xuất",
      "read_more": "Đọc thêm",
      "pros": "Ưu điểm",
      "cons": "Nhược điểm",
      "rating": "Đánh giá",
      "all_categories": "Tất cả danh mục",
      "search_placeholder": "Tìm kiếm đánh giá...",
      "home": "Trang chủ",
      "about": "Giới thiệu",
      "contact": "Liên hệ",
      "footer_text": "© 2026 NeoterikHR Blog. Bảo lưu mọi quyền.",
      "affiliate_disclosure": "Tiết lộ: Bài viết này có thể chứa các liên kết tiếp thị liên kết, nghĩa là chúng tôi sẽ nhận được hoa hồng nếu bạn quyết định mua hàng thông qua các liên kết của chúng tôi, mà không tốn thêm chi phí cho bạn.",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;