// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  // 🇺🇸 英文 (English)
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
      menu: {
        title: "Our Menu",
        subtitle: "Explore our carefully crafted menu, featuring fresh ingredients.",
        cat: { all: "All", breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", desserts: "Desserts", drinks: "Drinks" },
        view: "View Detail",
        no_item: "No items found in this category."
      },
      cart: {
        title: "Shopping Cart",
        empty: "Your Cart is Empty",
        browse: "Browse Menu",
        subtotal: "Subtotal",
        fee: "Delivery Fee",
        total: "Total",
        method: "Payment Method",
        checkout: "Checkout Now",
        login_alert: "Please login first!",
        sent: "Order sent!"
      },
      profile: {
        title: "My Profile",
        email: "Email Account",
        name: "Display Name",
        phone: "Phone Number",
        addr: "Delivery Address",
        save: "Save Changes",
        success: "Profile updated successfully!"
      }
    }
  },

  // 🇹🇼 繁體中文 (Traditional Chinese)
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
      menu: {
        title: "精選菜單",
        subtitle: "探索我們精心製作的菜單，採用新鮮食材。",
        cat: { all: "全部", breakfast: "早餐", lunch: "午餐", dinner: "晚餐", desserts: "甜點", drinks: "飲料" },
        view: "查看詳情",
        no_item: "此分類暫無商品。"
      },
      cart: {
        title: "購物車",
        empty: "購物車是空的",
        browse: "瀏覽菜單",
        subtotal: "小計",
        fee: "運費",
        total: "總計",
        method: "付款方式",
        checkout: "前往結帳",
        login_alert: "請先登入！",
        sent: "訂單已送出！"
      },
      profile: {
        title: "個人檔案",
        email: "帳號信箱",
        name: "顯示名稱",
        phone: "手機號碼",
        addr: "外送地址",
        save: "儲存變更",
        success: "個人資料更新成功！"
      }
    }
  },

  // 🇯🇵 日文 (Japanese)
  ja: {
    translation: {
      nav: {
        home: "ホーム",
        about: "概要",
        menu: "メニュー",
        delivery: "配達",
        contact: "お問い合わせ",
        login: "ログイン",
        signup: "登録",
        logout: "ログアウト",
        profile: "プロフィール",
        admin: "管理",
        cart: "カート"
      },
      menu: {
        title: "メニュー",
        subtitle: "新鮮な食材を使用したこだわりのメニューをご覧ください。",
        cat: { all: "すべて", breakfast: "朝食", lunch: "昼食", dinner: "夕食", desserts: "デザート", drinks: "飲み物" },
        view: "詳細を見る",
        no_item: "このカテゴリには商品がありません。"
      },
      cart: {
        title: "ショッピングカート",
        empty: "カートは空です",
        browse: "メニューを見る",
        subtotal: "小計",
        fee: "配送料",
        total: "合計",
        method: "支払方法",
        checkout: "購入手続きへ",
        login_alert: "先にログインしてください！",
        sent: "注文が送信されました！"
      },
      profile: {
        title: "プロフィール",
        email: "メールアドレス",
        name: "表示名",
        phone: "電話番号",
        addr: "配送先住所",
        save: "変更を保存",
        success: "プロフィールを更新しました！"
      }
    }
  },

  // 🇰🇷 韓文 (Korean)
  ko: {
    translation: {
      nav: {
        home: "홈",
        about: "소개",
        menu: "메뉴",
        delivery: "배달",
        contact: "문의하기",
        login: "로그인",
        signup: "가입하기",
        logout: "로그아웃",
        profile: "프로필",
        admin: "관리자",
        cart: "장바구니"
      },
      menu: {
        title: "메뉴",
        subtitle: "신선한 재료로 만든 메뉴를 즐겨보세요.",
        cat: { all: "전체", breakfast: "아침", lunch: "점심", dinner: "저녁", desserts: "디저트", drinks: "음료" },
        view: "상세 보기",
        no_item: "이 카테고리에는 상품이 없습니다."
      },
      cart: {
        title: "장바구니",
        empty: "장바구니가 비어 있습니다",
        browse: "메뉴 보기",
        subtotal: "소계",
        fee: "배달비",
        total: "합계",
        method: "결제 방법",
        checkout: "결제하기",
        login_alert: "먼저 로그인해주세요!",
        sent: "주문이 완료되었습니다!"
      },
      profile: {
        title: "내 프로필",
        email: "이메일 계정",
        name: "이름",
        phone: "전화번호",
        addr: "배송지 주소",
        save: "저장하기",
        success: "프로필이 업데이트되었습니다!"
      }
    }
  },

  // 🇫🇷 法文 (French)
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        about: "À propos",
        menu: "Menu",
        delivery: "Livraison",
        contact: "Contact",
        login: "Connexion",
        signup: "S'inscrire",
        logout: "Déconnexion",
        profile: "Profil",
        admin: "Admin",
        cart: "Panier"
      },
      menu: {
        title: "Notre Menu",
        subtitle: "Découvrez notre menu soigneusement élaboré avec des produits frais.",
        cat: { all: "Tout", breakfast: "Petit-déjeuner", lunch: "Déjeuner", dinner: "Dîner", desserts: "Desserts", drinks: "Boissons" },
        view: "Voir les détails",
        no_item: "Aucun article trouvé."
      },
      cart: {
        title: "Votre Panier",
        empty: "Votre panier est vide",
        browse: "Voir le menu",
        subtotal: "Sous-total",
        fee: "Frais de livraison",
        total: "Total",
        method: "Moyen de paiement",
        checkout: "Commander",
        login_alert: "Veuillez vous connecter !",
        sent: "Commande envoyée !"
      },
      profile: {
        title: "Mon Profil",
        email: "Email",
        name: "Nom d'affichage",
        phone: "Téléphone",
        addr: "Adresse de livraison",
        save: "Enregistrer",
        success: "Profil mis à jour !"
      }
    }
  },

  // 🇪🇸 西班牙文 (Spanish)
  es: {
    translation: {
      nav: {
        home: "Inicio",
        about: "Nosotros",
        menu: "Menú",
        delivery: "Entrega",
        contact: "Contacto",
        login: "Acceso",
        signup: "Registrarse",
        logout: "Salir",
        profile: "Perfil",
        admin: "Admin",
        cart: "Carrito"
      },
      menu: {
        title: "Nuestro Menú",
        subtitle: "Explore nuestro menú elaborado con ingredientes frescos.",
        cat: { all: "Todo", breakfast: "Desayuno", lunch: "Almuerzo", dinner: "Cena", desserts: "Postres", drinks: "Bebidas" },
        view: "Ver detalles",
        no_item: "No se encontraron artículos."
      },
      cart: {
        title: "Carrito de Compras",
        empty: "Tu carrito está vacío",
        browse: "Ver menú",
        subtotal: "Subtotal",
        fee: "Envío",
        total: "Total",
        method: "Método de pago",
        checkout: "Pagar ahora",
        login_alert: "¡Por favor inicia sesión!",
        sent: "¡Pedido enviado!"
      },
      profile: {
        title: "Mi Perfil",
        email: "Correo",
        name: "Nombre",
        phone: "Teléfono",
        addr: "Dirección",
        save: "Guardar",
        success: "¡Perfil actualizado!"
      }
    }
  },

  // 🇵🇹 葡萄牙文 (Portuguese)
  pt: {
    translation: {
      nav: {
        home: "Início",
        about: "Sobre",
        menu: "Cardápio",
        delivery: "Entrega",
        contact: "Contato",
        login: "Entrar",
        signup: "Inscrever-se",
        logout: "Sair",
        profile: "Perfil",
        admin: "Admin",
        cart: "Carrinho"
      },
      menu: {
        title: "Nosso Cardápio",
        subtitle: "Explore nosso cardápio feito com ingredientes frescos.",
        cat: { all: "Tudo", breakfast: "Café da manhã", lunch: "Almoço", dinner: "Jantar", desserts: "Sobremesas", drinks: "Bebidas" },
        view: "Ver detalhes",
        no_item: "Nenhum item encontrado."
      },
      cart: {
        title: "Carrinho de Compras",
        empty: "Seu carrinho está vazio",
        browse: "Ver cardápio",
        subtotal: "Subtotal",
        fee: "Entrega",
        total: "Total",
        method: "Método de pagamento",
        checkout: "Finalizar Compra",
        login_alert: "Faça login primeiro!",
        sent: "Pedido enviado!"
      },
      profile: {
        title: "Meu Perfil",
        email: "Email",
        name: "Nome",
        phone: "Telefone",
        addr: "Endereço",
        save: "Salvar",
        success: "Perfil atualizado!"
      }
    }
  },

  // 🇷🇺 俄文 (Russian)
  ru: {
    translation: {
      nav: {
        home: "Главная",
        about: "О нас",
        menu: "Меню",
        delivery: "Доставка",
        contact: "Контакты",
        login: "Войти",
        signup: "Регистрация",
        logout: "Выйти",
        profile: "Профиль",
        admin: "Админ",
        cart: "Корзина"
      },
      menu: {
        title: "Наше Меню",
        subtitle: "Откройте для себя наше меню из свежих продуктов.",
        cat: { all: "Все", breakfast: "Завтрак", lunch: "Обед", dinner: "Ужин", desserts: "Десерты", drinks: "Напитки" },
        view: "Подробнее",
        no_item: "Товары не найдены."
      },
      cart: {
        title: "Корзина",
        empty: "Ваша корзина пуста",
        browse: "Смотреть меню",
        subtotal: "Подытог",
        fee: "Доставка",
        total: "Итого",
        method: "Способ оплаты",
        checkout: "Оформить заказ",
        login_alert: "Пожалуйста, войдите!",
        sent: "Заказ отправлен!"
      },
      profile: {
        title: "Мой Профиль",
        email: "Email",
        name: "Имя",
        phone: "Телефон",
        addr: "Адрес доставки",
        save: "Сохранить",
        success: "Профиль обновлен!"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // 預設語言
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;