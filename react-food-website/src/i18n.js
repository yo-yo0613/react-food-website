import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ==========================================
// 🛒 21 項商品翻譯資料庫 (8國語言完整版)
// ==========================================
const productDocs = {
  // 🇺🇸 English
  en: {
    1: { title: "Breakfast Special", desc: "Fresh eggs, bacon, toast, and seasonal fruits." },
    2: { title: "Sweet Pancakes", desc: "Fluffy pancakes served with honey and fresh berries." },
    3: { title: "French Toast", desc: "Classic french toast with powdered sugar and syrup." },
    4: { title: "Morning Bagel", desc: "Toasted bagel with cream cheese and smoked salmon." },
    5: { title: "Omelette Delight", desc: "Three-egg omelette with cheese, ham, and peppers." },
    6: { title: "Lunch Combo", desc: "Grilled chicken salad served with daily soup." },
    7: { title: "Fresh Salad", desc: "Mixed greens with organic vegetables and house dressing." },
    8: { title: "Club Sandwich", desc: "Triple-decker sandwich with turkey, bacon, and lettuce." },
    9: { title: "Vegan Wrap", desc: "Tortilla wrap filled with hummus, avocado, and veggies." },
    10: { title: "Chicken Pesto", desc: "Grilled chicken breast with basil pesto sauce." },
    11: { title: "Dinner Delight", desc: "Premium steak cooked to perfection with roasted veggies." },
    12: { title: "Seafood Pasta", desc: "Creamy alfredo pasta with shrimp and scallops." },
    13: { title: "BBQ Ribs", desc: "Slow-cooked pork ribs with homemade BBQ sauce." },
    14: { title: "Grilled Salmon", desc: "Fresh salmon fillet with lemon butter glaze." },
    15: { title: "Mushroom Risotto", desc: "Italian rice dish cooked with wild mushrooms and parmesan." },
    16: { title: "HodDessert", desc: "Our signature dessert with fresh cream and fruits." },
    17: { title: "Chocolate Cake", desc: "Rich and moist chocolate cake with ganache." },
    18: { title: "Lemon Tart", desc: "Zesty lemon curd in a buttery pastry shell." },
    19: { title: "Fruit Smoothie", desc: "Blend of mango, strawberry, and banana." },
    20: { title: "Iced Coffee", desc: "Cold brew coffee with a splash of milk." },
    21: { title: "Green Tea", desc: "Premium Japanese matcha green tea." }
  },
  // 🇹🇼 Traditional Chinese
  zh: {
    1: { title: "招牌早餐特餐", desc: "新鮮雞蛋、培根、烤吐司搭配當季水果。" },
    2: { title: "甜蜜鬆餅", desc: "鬆軟的鬆餅，淋上蜂蜜並搭配新鮮莓果。" },
    3: { title: "法式吐司", desc: "經典法式吐司，撒上糖粉並淋上糖漿。" },
    4: { title: "晨間貝果", desc: "烤貝果搭配奶油乳酪與煙燻鮭魚。" },
    5: { title: "歐姆蛋悅", desc: "三顆蛋製成的歐姆蛋，內餡有起司、火腿和甜椒。" },
    6: { title: "午餐組合", desc: "烤雞肉沙拉搭配每日例湯。" },
    7: { title: "新鮮沙拉", desc: "混合生菜搭配有機蔬菜與特製醬料。" },
    8: { title: "總匯三明治", desc: "三層三明治，夾有火雞肉、培根和生菜。" },
    9: { title: "素食捲餅", desc: "墨西哥捲餅，內餡有鷹嘴豆泥、酪梨和蔬菜。" },
    10: { title: "青醬雞肉", desc: "烤雞胸肉搭配羅勒青醬。" },
    11: { title: "晚餐饗宴", desc: "頂級牛排烹調至完美熟度，搭配烤蔬菜。" },
    12: { title: "海鮮義大利麵", desc: "奶油白醬義大利麵，搭配鮮蝦與干貝。" },
    13: { title: "BBQ 豬肋排", desc: "慢火烤製的豬肋排，刷上自製烤肉醬。" },
    14: { title: "烤鮭魚", desc: "新鮮鮭魚排，淋上檸檬奶油醬。" },
    15: { title: "蘑菇燉飯", desc: "義式燉飯，與野生蘑菇和帕瑪森起司一同烹煮。" },
    16: { title: "招牌甜點 (HodDessert)", desc: "我們的招牌甜點，搭配鮮奶油與水果。" },
    17: { title: "巧克力蛋糕", desc: "濃郁濕潤的巧克力蛋糕，搭配甘納許。" },
    18: { title: "檸檬塔", desc: "酥脆塔皮內填滿酸甜檸檬凝乳。" },
    19: { title: "水果冰沙", desc: "芒果、草莓與香蕉的混合冰沙。" },
    20: { title: "冰咖啡", desc: "冷萃咖啡加入少許牛奶。" },
    21: { title: "日式綠茶", desc: "頂級日式抹茶綠茶。" }
  },
  // 🇯🇵 Japanese
  ja: {
    1: { title: "朝食スペシャル", desc: "新鮮な卵、ベーコン、トースト、季節のフルーツ。" },
    2: { title: "スイートパンケーキ", desc: "蜂蜜と新鮮なベリーを添えたふわふわのパンケーキ。" },
    3: { title: "フレンチトースト", desc: "粉砂糖とシロップをかけたクラシックなフレンチトースト。" },
    4: { title: "モーニングベーグル", desc: "クリームチーズとスモークサーモンを挟んだトーストベーグル。" },
    5: { title: "オムレツ・デライト", desc: "チーズ、ハム、ピーマン入りの3卵オムレツ。" },
    6: { title: "ランチセット", desc: "グリルチキンサラダと日替わりスープのセット。" },
    7: { title: "フレッシュサラダ", desc: "有機野菜と特製ドレッシングのミックスグリーン。" },
    8: { title: "クラブサンドイッチ", desc: "七面鳥、ベーコン、レタスを挟んだ3段重ねのサンドイッチ。" },
    9: { title: "ヴィーガンラップ", desc: "フムス、アボカド、野菜を詰めたトルティーヤラップ。" },
    10: { title: "チキンジェノベーゼ", desc: "バジルペーストソースをかけたグリルチキン。" },
    11: { title: "ディナーデライト", desc: "完璧に焼き上げたプレミアムステーキとロースト野菜。" },
    12: { title: "シーフードパスタ", desc: "エビとホタテのクリーミーなアルフレッドパスタ。" },
    13: { title: "BBQリブ", desc: "自家製BBQソースでじっくり調理したポークリブ。" },
    14: { title: "サーモンのグリル", desc: "レモンバターソースをかけた新鮮なサーモンフィレ。" },
    15: { title: "キノコのリゾット", desc: "野生のキノコとパルメザンチーズを使ったイタリアンライス料理。" },
    16: { title: "Hodデザート", desc: "生クリームとフルーツを添えた特製デザート。" },
    17: { title: "チョコレートケーキ", desc: "ガナッシュを使った濃厚でしっとりとしたチョコレートケーキ。" },
    18: { title: "レモンタルト", desc: "バター風味のタルト生地に甘酸っぱいレモンカードを詰めました。" },
    19: { title: "フルーツスムージー", desc: "マンゴー、イチゴ、バナナのブレンド。" },
    20: { title: "アイスコーヒー", desc: "ミルクを少々加えたコールドブリューコーヒー。" },
    21: { title: "抹茶", desc: "最高級の日本産抹茶。" }
  },
  // 🇰🇷 Korean
  ko: {
    1: { title: "아침 스페셜", desc: "신선한 계란, 베이컨, 토스트 및 제철 과일." },
    2: { title: "달콤한 팬케이크", desc: "꿀과 신선한 베리를 곁들인 폭신한 팬케이크." },
    3: { title: "프렌치 토스트", desc: "슈가 파우더와 시럽을 곁들인 클래식 프렌치 토스트." },
    4: { title: "모닝 베이글", desc: "크림 치즈와 훈제 연어를 곁들인 구운 베이글." },
    5: { title: "오믈렛 딜라이트", desc: "치즈, 햄, 피망을 넣은 계란 3개 오믈렛." },
    6: { title: "점심 콤보", desc: "오늘의 수프와 함께 제공되는 그릴 치킨 샐러드." },
    7: { title: "신선한 샐러드", desc: "유기농 채소와 하우스 드레싱을 곁들인 믹스 그린." },
    8: { title: "클럽 샌드위치", desc: "칠면조, 베이컨, 양상추가 들어간 3단 샌드위치." },
    9: { title: "비건 랩", desc: "후무스, 아보카도, 야채로 채운 또띠아 랩." },
    10: { title: "치킨 페스토", desc: "바질 페스토 소스를 곁들인 그릴 닭가슴살." },
    11: { title: "디너 딜라이트", desc: "구운 야채와 함께 완벽하게 조리된 프리미엄 스테이크." },
    12: { title: "해산물 파스타", desc: "새우와 관자를 넣은 크리미 알프레도 파스타." },
    13: { title: "BBQ 립", desc: "수제 BBQ 소스로 천천히 조리한 돼지 갈비." },
    14: { title: "연어 구이", desc: "레몬 버터 글레이즈를 곁들인 신선한 연어 필레." },
    15: { title: "버섯 리조또", desc: "야생 버섯과 파마산 치즈로 요리한 이탈리아 쌀 요리." },
    16: { title: "Hod 디저트", desc: "신선한 크림과 과일을 곁들인 시그니처 디저트." },
    17: { title: "초콜릿 케이크", desc: "가나슈를 곁들인 진하고 촉촉한 초콜릿 케이크." },
    18: { title: "레몬 타르트", desc: "버터 페이스트리 쉘에 상큼한 레몬 커드를 채운 타르트." },
    19: { title: "과일 스무디", desc: "망고, 딸기, 바나나를 섞은 스무디." },
    20: { title: "아이스 커피", desc: "우유를 약간 넣은 콜드 브루 커피." },
    21: { title: "녹차", desc: "프리미엄 일본 말차 녹차." }
  },
  // 🇫🇷 French
  fr: {
    1: { title: "Spécial Petit-déjeuner", desc: "Œufs frais, bacon, pain grillé et fruits de saison." },
    2: { title: "Pancakes Sucrés", desc: "Pancakes moelleux servis avec du miel et des baies fraîches." },
    3: { title: "Pain Perdu", desc: "Pain perdu classique avec sucre glace et sirop." },
    4: { title: "Bagel du Matin", desc: "Bagel grillé avec fromage à la crème et saumon fumé." },
    5: { title: "Délice d'Omelette", desc: "Omelette de trois œufs avec fromage, jambon et poivrons." },
    6: { title: "Combo Déjeuner", desc: "Salade de poulet grillé servie avec la soupe du jour." },
    7: { title: "Salade Fraîche", desc: "Mélange de légumes verts biologiques et vinaigrette maison." },
    8: { title: "Club Sandwich", desc: "Sandwich à trois étages avec dinde, bacon et laitue." },
    9: { title: "Wrap Végétalien", desc: "Tortilla remplie de houmous, avocat et légumes." },
    10: { title: "Poulet Pesto", desc: "Poitrine de poulet grillée avec sauce pesto au basilic." },
    11: { title: "Délice du Dîner", desc: "Steak premium cuit à la perfection avec légumes rôtis." },
    12: { title: "Pâtes aux Fruits de Mer", desc: "Pâtes crémeuses Alfredo avec crevettes et pétoncles." },
    13: { title: "Travers de Porc BBQ", desc: "Travers de porc mijotés avec sauce BBQ maison." },
    14: { title: "Saumon Grillé", desc: "Filet de saumon frais avec glaçage au beurre citronné." },
    15: { title: "Risotto aux Champignons", desc: "Plat de riz italien cuisiné avec des champignons sauvages et du parmesan." },
    16: { title: "Dessert Hod", desc: "Notre dessert signature avec crème fraîche et fruits." },
    17: { title: "Gâteau au Chocolat", desc: "Gâteau au chocolat riche et moelleux avec ganache." },
    18: { title: "Tarte au Citron", desc: "Crème de citron acidulée dans une pâte sablée au beurre." },
    19: { title: "Smoothie aux Fruits", desc: "Mélange de mangue, fraise et banane." },
    20: { title: "Café Glacé", desc: "Café infusé à froid avec un soupçon de lait." },
    21: { title: "Thé Vert", desc: "Thé vert matcha japonais premium." }
  },
  // 🇪🇸 Spanish
  es: {
    1: { title: "Especial de Desayuno", desc: "Huevos frescos, tocino, pan tostado y frutas de temporada." },
    2: { title: "Panqueques Dulces", desc: "Panqueques esponjosos servidos con miel y bayas frescas." },
    3: { title: "Tostada Francesa", desc: "Tostada francesa clásica con azúcar glas y jarabe." },
    4: { title: "Bagel Matutino", desc: "Bagel tostado con queso crema y salmón ahumado." },
    5: { title: "Delicia de Tortilla", desc: "Tortilla de tres huevos con queso, jamón y pimientos." },
    6: { title: "Combo de Almuerzo", desc: "Ensalada de pollo a la parrilla servida con sopa del día." },
    7: { title: "Ensalada Fresca", desc: "Mezcla de verduras orgánicas y aderezo de la casa." },
    8: { title: "Sándwich Club", desc: "Sándwich de tres pisos con pavo, tocino y lechuga." },
    9: { title: "Wrap Vegano", desc: "Tortilla rellena de hummus, aguacate y verduras." },
    10: { title: "Pollo al Pesto", desc: "Pechuga de pollo a la parrilla con salsa pesto de albahaca." },
    11: { title: "Delicia de Cena", desc: "Bistec premium cocinado a la perfección con verduras asadas." },
    12: { title: "Pasta de Mariscos", desc: "Pasta cremosa Alfredo con camarones y vieiras." },
    13: { title: "Costillas BBQ", desc: "Costillas de cerdo cocidas a fuego lento con salsa BBQ casera." },
    14: { title: "Salmón a la Parrilla", desc: "Filete de salmón fresco con glaseado de mantequilla de limón." },
    15: { title: "Risotto de Champiñones", desc: "Plato de arroz italiano cocinado con champiñones silvestres y parmesano." },
    16: { title: "Postre Hod", desc: "Nuestro postre exclusivo con crema fresca y frutas." },
    17: { title: "Pastel de Chocolate", desc: "Pastel de chocolate rico y húmedo con ganache." },
    18: { title: "Tarta de Limón", desc: "Cuajada de limón ácida en una base de masa de mantequilla." },
    19: { title: "Batido de Frutas", desc: "Mezcla de mango, fresa y plátano." },
    20: { title: "Café Helado", desc: "Café preparado en frío con un toque de leche." },
    21: { title: "Té Verde", desc: "Té verde matcha japonés premium." }
  },
  // 🇵🇹 Portuguese
  pt: {
    1: { title: "Especial de Café da Manhã", desc: "Ovos frescos, bacon, torradas e frutas da estação." },
    2: { title: "Panquecas Doces", desc: "Panquecas fofas servidas com mel e frutas vermelhas frescas." },
    3: { title: "Rabanada", desc: "Rabanada clássica com açúcar de confeiteiro e calda." },
    4: { title: "Bagel Matinal", desc: "Bagel torrado com cream cheese e salmão defumado." },
    5: { title: "Delícia de Omelete", desc: "Omelete de três ovos com queijo, presunto e pimentão." },
    6: { title: "Combo de Almoço", desc: "Salada de frango grelhado servida com sopa do dia." },
    7: { title: "Salada Fresca", desc: "Mix de folhas verdes orgânicas e molho da casa." },
    8: { title: "Club Sandwich", desc: "Sanduíche de três camadas com peru, bacon e alface." },
    9: { title: "Wrap Vegano", desc: "Tortilha recheada com homus, abacate e vegetais." },
    10: { title: "Frango ao Pesto", desc: "Peito de frango grelhado com molho pesto de manjericão." },
    11: { title: "Delícia de Jantar", desc: "Bife premium grelhado à perfeição com vegetais assados." },
    12: { title: "Massa com Frutos do Mar", desc: "Massa Alfredo cremosa com camarão e vieiras." },
    13: { title: "Costelinha BBQ", desc: "Costelinha de porco cozida lentamente com molho barbecue caseiro." },
    14: { title: "Salmão Grelhado", desc: "Filé de salmão fresco com cobertura de manteiga de limão." },
    15: { title: "Risoto de Cogumelos", desc: "Prato de arroz italiano cozido com cogumelos selvagens e parmesão." },
    16: { title: "Sobremesa Hod", desc: "Nossa sobremesa exclusiva com creme fresco e frutas." },
    17: { title: "Bolo de Chocolate", desc: "Bolo de chocolate rico e úmido com ganache." },
    18: { title: "Torta de Limão", desc: "Creme de limão azedinho em uma base de massa amanteigada." },
    19: { title: "Smoothie de Frutas", desc: "Mistura de manga, morango e banana." },
    20: { title: "Café Gelado", desc: "Café extraído a frio com um toque de leite." },
    21: { title: "Chá Verde", desc: "Chá verde matcha japonês premium." }
  },
  // 🇷🇺 Russian
  ru: {
    1: { title: "Завтрак Спешл", desc: "Свежие яйца, бекон, тосты и сезонные фрукты." },
    2: { title: "Сладкие Блины", desc: "Пышные блины с медом и свежими ягодами." },
    3: { title: "Французский Тост", desc: "Классический французский тост с сахарной пудрой и сиропом." },
    4: { title: "Утренний Бейгл", desc: "Поджаренный бейгл со сливочным сыром и копченым лососем." },
    5: { title: "Омлет Восторг", desc: "Омлет из трех яиц с сыром, ветчиной и перцем." },
    6: { title: "Обед Комбо", desc: "Салат с курицей-гриль и супом дня." },
    7: { title: "Свежий Салат", desc: "Смесь органической зелени с фирменной заправкой." },
    8: { title: "Клубный Сэндвич", desc: "Трехслойный сэндвич с индейкой, беконом и салатом." },
    9: { title: "Веганский Ролл", desc: "Тортилья с хумусом, авокадо и овощами." },
    10: { title: "Курица Песто", desc: "Куриная грудка-гриль с соусом песто из базилика." },
    11: { title: "Ужин Восторг", desc: "Премиальный стейк, приготовленный до совершенства, с запеченными овощами." },
    12: { title: "Паста с Морепродуктами", desc: "Сливочная паста Альфредо с креветками и морскими гребешками." },
    13: { title: "Ребрышки BBQ", desc: "Свиные ребрышки медленного приготовления с домашним соусом барбекю." },
    14: { title: "Лосось на Гриле", desc: "Филе свежего лосося с лимонно-масляной глазурью." },
    15: { title: "Грибное Ризотто", desc: "Итальянское блюдо из риса с лесными грибами и пармезаном." },
    16: { title: "Десерт Hod", desc: "Наш фирменный десерт со свежими сливками и фруктами." },
    17: { title: "Шоколадный Торт", desc: "Насыщенный и влажный шоколадный торт с ганашем." },
    18: { title: "Лимонный Тарт", desc: "Пикантный лимонный крем в песочной корзинке." },
    19: { title: "Фруктовый Смузи", desc: "Смесь манго, клубники и банана." },
    20: { title: "Холодный Кофе", desc: "Кофе холодного заваривания с добавлением молока." },
    21: { title: "Зеленый Чай", desc: "Премиальный японский чай матча." }
  }
};

// ==========================================
// 🌐 UI 介面翻譯資料庫
// ==========================================
const resources = {
  // 🇺🇸 English
  en: {
    translation: {
      nav: { home: "Home", about: "About", menu: "Menu", delivery: "Delivery", contact: "Contact Us", login: "Login", signup: "Sign up", logout: "Logout", profile: "My Profile", admin: "Admin", cart: "My Cart" },
      menu: { title: "Our Menu", subtitle: "Explore our carefully crafted menu, featuring fresh ingredients.", cat: { all: "All", breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", desserts: "Desserts", drinks: "Drinks" }, view: "View Detail", no_item: "No items found in this category." },
      detail: { back: "Back to Menu", about: "About this item", reviews: "reviews", order: "Order Now", added: "Added to cart" },
      cart: { title: "Shopping Cart", empty: "Your Cart is Empty", browse: "Browse Menu", subtotal: "Subtotal", fee: "Delivery Fee", total: "Total", method: "Payment Method", checkout: "Checkout Now", login_alert: "Please login first!", sent: "Order sent!" },
      profile: { title: "My Profile", email: "Email Account", name: "Display Name", phone: "Phone Number", addr: "Delivery Address", save: "Save Changes", success: "Profile updated successfully!" },
      products: productDocs.en
    }
  },

  // 🇹🇼 Traditional Chinese
  zh: {
    translation: {
      nav: { home: "首頁", about: "關於我們", menu: "美味菜單", delivery: "外送服務", contact: "聯絡我們", login: "登入", signup: "註冊", logout: "登出", profile: "個人檔案", admin: "管理後台", cart: "我的購物車" },
      menu: { title: "精選菜單", subtitle: "探索我們精心製作的菜單，採用新鮮食材。", cat: { all: "全部", breakfast: "早餐", lunch: "午餐", dinner: "晚餐", desserts: "甜點", drinks: "飲料" }, view: "查看詳情", no_item: "此分類暫無商品。" },
      detail: { back: "返回菜單", about: "關於這道料理", reviews: "則評論", order: "立即點餐", added: "已加入購物車" },
      cart: { title: "購物車", empty: "購物車是空的", browse: "瀏覽菜單", subtotal: "小計", fee: "運費", total: "總計", method: "付款方式", checkout: "前往結帳", login_alert: "請先登入！", sent: "訂單已送出！" },
      profile: { title: "個人檔案", email: "帳號信箱", name: "顯示名稱", phone: "手機號碼", addr: "外送地址", save: "儲存變更", success: "更新成功！" },
      products: productDocs.zh
    }
  },

  // 🇯🇵 Japanese
  ja: {
    translation: {
      nav: { home: "ホーム", about: "概要", menu: "メニュー", delivery: "配達", contact: "お問い合わせ", login: "ログイン", signup: "登録", logout: "ログアウト", profile: "プロフィール", admin: "管理", cart: "カート" },
      menu: { title: "メニュー", subtitle: "新鮮な食材を使用したこだわりのメニューをご覧ください。", cat: { all: "すべて", breakfast: "朝食", lunch: "昼食", dinner: "夕食", desserts: "デザート", drinks: "飲み物" }, view: "詳細を見る", no_item: "このカテゴリには商品がありません。" },
      detail: { back: "メニューに戻る", about: "この料理について", reviews: "レビュー", order: "注文する", added: "カートに追加しました" },
      cart: { title: "ショッピングカート", empty: "カートは空です", browse: "メニューを見る", subtotal: "小計", fee: "配送料", total: "合計", method: "支払方法", checkout: "購入手続きへ", login_alert: "先にログインしてください！", sent: "注文が送信されました！" },
      profile: { title: "プロフィール", email: "メールアドレス", name: "表示名", phone: "電話番号", addr: "配送先住所", save: "変更を保存", success: "プロフィールを更新しました！" },
      products: productDocs.ja
    }
  },

  // 🇰🇷 Korean
  ko: {
    translation: {
      nav: { home: "홈", about: "소개", menu: "메뉴", delivery: "배달", contact: "문의하기", login: "로그인", signup: "가입하기", logout: "로그아웃", profile: "프로필", admin: "관리자", cart: "장바구니" },
      menu: { title: "메뉴", subtitle: "신선한 재료로 만든 메뉴를 즐겨보세요.", cat: { all: "전체", breakfast: "아침", lunch: "점심", dinner: "저녁", desserts: "디저트", drinks: "음료" }, view: "상세 보기", no_item: "이 카테고리에는 상품이 없습니다." },
      detail: { back: "메뉴로 돌아가기", about: "이 메뉴 정보", reviews: "리뷰", order: "주문하기", added: "장바구니에 추가됨" },
      cart: { title: "장바구니", empty: "장바구니가 비어 있습니다", browse: "메뉴 보기", subtotal: "소계", fee: "배달비", total: "합계", method: "결제 방법", checkout: "결제하기", login_alert: "먼저 로그인해주세요!", sent: "주문이 완료되었습니다!" },
      profile: { title: "내 프로필", email: "이메일 계정", name: "이름", phone: "전화번호", addr: "배송지 주소", save: "저장하기", success: "프로필이 업데이트되었습니다!" },
      products: productDocs.ko
    }
  },

  // 🇫🇷 French
  fr: {
    translation: {
      nav: { home: "Accueil", about: "À propos", menu: "Menu", delivery: "Livraison", contact: "Contact", login: "Connexion", signup: "S'inscrire", logout: "Déconnexion", profile: "Profil", admin: "Admin", cart: "Panier" },
      menu: { title: "Notre Menu", subtitle: "Découvrez notre menu soigneusement élaboré avec des produits frais.", cat: { all: "Tout", breakfast: "Petit-déjeuner", lunch: "Déjeuner", dinner: "Dîner", desserts: "Desserts", drinks: "Boissons" }, view: "Voir les détails", no_item: "Aucun article trouvé." },
      detail: { back: "Retour au menu", about: "À propos de cet article", reviews: "avis", order: "Commander", added: "Ajouté au panier" },
      cart: { title: "Votre Panier", empty: "Votre panier est vide", browse: "Voir le menu", subtotal: "Sous-total", fee: "Frais de livraison", total: "Total", method: "Moyen de paiement", checkout: "Commander", login_alert: "Veuillez vous connecter !", sent: "Commande envoyée !" },
      profile: { title: "Mon Profil", email: "Email", name: "Nom", phone: "Téléphone", addr: "Adresse", save: "Enregistrer", success: "Profil mis à jour !" },
      products: productDocs.fr
    }
  },

  // 🇪🇸 Spanish
  es: {
    translation: {
      nav: { home: "Inicio", about: "Nosotros", menu: "Menú", delivery: "Entrega", contact: "Contacto", login: "Acceso", signup: "Registrarse", logout: "Salir", profile: "Perfil", admin: "Admin", cart: "Carrito" },
      menu: { title: "Nuestro Menú", subtitle: "Explore nuestro menú elaborado con ingredientes frescos.", cat: { all: "Todo", breakfast: "Desayuno", lunch: "Almuerzo", dinner: "Cena", desserts: "Postres", drinks: "Bebidas" }, view: "Ver detalles", no_item: "No se encontraron artículos." },
      detail: { back: "Volver al menú", about: "Sobre este artículo", reviews: "reseñas", order: "Ordenar ahora", added: "Añadido al carrito" },
      cart: { title: "Carrito de Compras", empty: "Tu carrito está vacío", browse: "Ver menú", subtotal: "Subtotal", fee: "Envío", total: "Total", method: "Método de pago", checkout: "Pagar ahora", login_alert: "¡Por favor inicia sesión!", sent: "¡Pedido enviado!" },
      profile: { title: "Mi Perfil", email: "Correo", name: "Nombre", phone: "Teléfono", addr: "Dirección", save: "Guardar", success: "¡Perfil actualizado!" },
      products: productDocs.es
    }
  },

  // 🇵🇹 Portuguese
  pt: {
    translation: {
      nav: { home: "Início", about: "Sobre", menu: "Cardápio", delivery: "Entrega", contact: "Contato", login: "Entrar", signup: "Inscrever-se", logout: "Sair", profile: "Perfil", admin: "Admin", cart: "Carrinho" },
      menu: { title: "Nosso Cardápio", subtitle: "Explore nosso cardápio feito com ingredientes frescos.", cat: { all: "Tudo", breakfast: "Café da manhã", lunch: "Almoço", dinner: "Jantar", desserts: "Sobremesas", drinks: "Bebidas" }, view: "Ver detalhes", no_item: "Nenhum item encontrado." },
      detail: { back: "Voltar ao menu", about: "Sobre este item", reviews: "avaliações", order: "Pedir agora", added: "Adicionado ao carrinho" },
      cart: { title: "Carrinho de Compras", empty: "Seu carrinho está vazio", browse: "Ver cardápio", subtotal: "Subtotal", fee: "Entrega", total: "Total", method: "Método de pagamento", checkout: "Finalizar Compra", login_alert: "Faça login primeiro!", sent: "Pedido enviado!" },
      profile: { title: "Meu Perfil", email: "Email", name: "Nome", phone: "Telefone", addr: "Endereço", save: "Salvar", success: "Perfil atualizado!" },
      products: productDocs.pt
    }
  },

  // 🇷🇺 Russian
  ru: {
    translation: {
      nav: { home: "Главная", about: "О нас", menu: "Меню", delivery: "Доставка", contact: "Контакты", login: "Войти", signup: "Регистрация", logout: "Выйти", profile: "Профиль", admin: "Админ", cart: "Корзина" },
      menu: { title: "Наше Меню", subtitle: "Откройте для себя наше меню из свежих продуктов.", cat: { all: "Все", breakfast: "Завтрак", lunch: "Обед", dinner: "Ужин", desserts: "Десерты", drinks: "Напитки" }, view: "Подробнее", no_item: "Товары не найдены." },
      detail: { back: "Назад в меню", about: "Об этом блюде", reviews: "отзывов", order: "Заказать", added: "Добавлено в корзину" },
      cart: { title: "Корзина", empty: "Ваша корзина пуста", browse: "Смотреть меню", subtotal: "Подытог", fee: "Доставка", total: "Итого", method: "Способ оплаты", checkout: "Оформить заказ", login_alert: "Пожалуйста, войдите!", sent: "Заказ отправлен!" },
      profile: { title: "Мой Профиль", email: "Email", name: "Имя", phone: "Телефон", addr: "Адрес доставки", save: "Сохранить", success: "Профиль обновлен!" },
      products: productDocs.ru
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