// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 定義翻譯資源
const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        menu: "Menu",
        delivery: "Delivery",
        contact: "Contact Us",
        login: "Login",
        signup: "Sign up",
        logout: "Logout",
        profile: "My Profile",
        admin: "Admin",
        cart: "My Cart"
      },
      hero: {
        title: "Delicious Food",
        subtitle: "Best food in town"
      }
    }
  },
  zh: {
    translation: {
      nav: {
        home: "首頁",
        about: "關於我們",
        menu: "美味菜單",
        delivery: "外送服務",
        contact: "聯絡我們",
        login: "登入",
        signup: "註冊",
        logout: "登出",
        profile: "個人檔案",
        admin: "管理後台",
        cart: "我的購物車"
      },
      hero: {
        title: "美味饗宴",
        subtitle: "全城最棒的美食"
      }
    }
  },
  ja: { translation: { nav: { home: "ホーム", about: "概要", menu: "メニュー", delivery: "配達", contact: "お問い合わせ", login: "ログイン", signup: "登録", logout: "ログアウト", profile: "プロフィール", admin: "管理", cart: "カート" } } },
  ko: { translation: { nav: { home: "홈", about: "소개", menu: "메뉴", delivery: "배달", contact: "문의하기", login: "로그인", signup: "가입하기", logout: "로그아웃", profile: "프로필", admin: "관리자", cart: "장바구니" } } },
  fr: { translation: { nav: { home: "Accueil", about: "À propos", menu: "Menu", delivery: "Livraison", contact: "Contact", login: "Connexion", signup: "S'inscrire", logout: "Déconnexion", profile: "Profil", admin: "Admin", cart: "Panier" } } },
  es: { translation: { nav: { home: "Inicio", about: "Nosotros", menu: "Menú", delivery: "Entrega", contact: "Contacto", login: "Acceso", signup: "Registrarse", logout: "Salir", profile: "Perfil", admin: "Admin", cart: "Carrito" } } },
  pt: { translation: { nav: { home: "Início", about: "Sobre", menu: "Cardápio", delivery: "Entrega", contact: "Contato", login: "Entrar", signup: "Inscrever-se", logout: "Sair", profile: "Perfil", admin: "Admin", cart: "Carrinho" } } },
  ru: { translation: { nav: { home: "Главная", about: "О нас", menu: "Меню", delivery: "Доставка", contact: "Контакты", login: "Войти", signup: "Регистрация", logout: "Выйти", profile: "Профиль", admin: "Админ", cart: "Корзина" } } }
};

i18n
  .use(LanguageDetector) // 自動偵測瀏覽器語言
  .use(initReactI18next) // 初始化 react-i18next
  .init({
    resources,
    fallbackLng: 'en', // 如果偵測不到語言，預設用英文
    interpolation: {
      escapeValue: false // React 已經有防 XSS，不需要 escape
    }
  });

export default i18n;