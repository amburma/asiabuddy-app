
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const BANGKOK_TRANSLATIONS: any = {
  english: {
    overview: 'The City of Angels, where ancient shrines meet ultra-modernity in a vibrant sensory landscape.',
    mustVisit: [
      {
        title: 'The Grand Palace',
        description: 'The spectacular ceremonial home of Thai Kings and the Temple of the Emerald Buddha.',
        etiquette: 'Strict: Shoulders and knees must be covered. No sandals without straps.'
      },
      {
        title: 'National Museum Bangkok',
        description: 'The largest museum in Southeast Asia, showcasing Thai art and history.'
      },
      {
        title: 'Siam Square',
        description: 'The heartbeat of Bangkok youth culture and fashion.'
      }
    ],
    dining: [
      {
        title: 'Jay Fai',
        description: 'World-famous Michelin-starred crab meat omelet cooked over charcoal.'
      },
      {
        title: 'Or Tor Kor Market',
        description: 'Upscale fresh market known for the highest quality agricultural products.'
      }
    ],
    otherExperiences: [
      {
        title: 'Jodd Fairs',
        description: 'A trendy night market popular for street food and vintage fashion.'
      },
      {
        title: 'Chao Phraya Express Boat',
        description: 'Experience the river life and beat the traffic like a local.'
      }
    ],
    uniqueActivities: [
      {
        title: 'Blue Elephant Cooking School',
        description: 'Learn the secrets of Royal Thai cuisine in a historic setting.'
      },
      {
        title: 'Hidden Bangkok Canal Tour',
        description: 'Explore the quiet backwaters and traditional wooden houses.'
      }
    ],
    hiddenGems: [
      {
        title: 'Wat Sam Phran',
        description: 'A 17-story pink tower with a massive dragon spiraling around it.',
        etiquette: 'Quiet contemplation requested.'
      },
      {
        title: 'Baan Silapin (Artist House)',
        description: 'A century-old house turned into a gallery and puppet theater.'
      }
    ]
  },
  thai: {
    overview: 'กรุงเทพมหานคร เมืองหลวงของไทยที่ซึ่งวัดวาอารามเก่าแก่มาบรรจบกับความทันสมัยในภูมิทัศน์ที่เปี่ยมไปด้วยพลัง',
    mustVisit: [
      {
        title: 'พระบรมมหาราชวัง และวัดพระแก้ว',
        description: 'พระราชวังที่สวยงามและเป็นที่ประดิษฐานของพระแก้วมรกต',
        etiquette: 'การแต่งกาย: ต้องสวมเสื้อมีแขนและกางเกงหรือกระโปรงยาวคลุมเข่า ห้ามสวมรองเท้าแตะที่ไม่มีสายรัด'
      },
      {
        title: 'พิพิธภัณฑสถานแห่งชาติ พระนคร',
        description: 'พิพิธภัณฑ์ที่ใหญ่ที่สุดในเอเชียตะวันออกเฉียงใต้ รวบรวมศิลปะและประวัติศาสตร์ไทย'
      },
      {
        title: 'สยามสแควร์',
        description: 'ศูนย์กลางแฟชั่นและวัฒนธรรมสมัยใหม่ของวัยรุ่นกรุงเทพฯ'
      }
    ],
    dining: [
      {
        title: 'ร้านเจ๊ไฝ',
        description: 'ไข่เจียวปูชื่อดังระดับมิชลินที่ปรุงด้วยเตาถ่าน'
      },
      {
        title: 'ตลาด อ.ต.ก.',
        description: 'ตลาดสดระดับพรีเมียมที่รักษาระดับคุณภาพสินค้าเกษตรสูงสุด'
      }
    ],
    otherExperiences: [
      {
        title: 'จ๊อดแฟร์',
        description: 'ตลาดนัดกลางคืนยอดนิยมสำหรับสตรีทฟู้ดและแฟชั่นวินเทจ'
      },
      {
        title: 'เรือด่วนเจ้าพระยา',
        description: 'สัมผัสวิถีชีวิตริมน้ำและเลี่ยงรถตู้ด้วยการนั่งเรือด่วน'
      }
    ],
    uniqueActivities: [
      {
        title: 'โรงเรียนสอนทำอาหารบลูเอเลเฟ่นท์',
        description: 'เรียนรู้เคล็ดลับการทำอาหารไทยตำรับชาววังในบรรยากาศคลาสสิก'
      },
      {
        title: 'ทัวร์คลองกรุงเทพฯ',
        description: 'สำรวจวิถีชีวิตริมคลองที่เงียบสงบและบ้านไม้โบราณ'
      }
    ],
    hiddenGems: [
      {
        title: 'วัดสามพราน (วัดมังกร)',
        description: 'ตึกสีชมพูสูง 17 ชั้นที่มีมังกรยักษ์พันรอบตัวตึก',
        etiquette: 'โปรดสำรวจด้วยความสงบ'
      },
      {
        title: 'บ้านศิลปิน คลองบางหลวง',
        description: 'บ้านไม้เก่าแก่อายุกว่าร้อยปีที่กลายเป็นแกลเลอรีและโรงละครหุ่นละครเล็ก'
      }
    ]
  },
  spanish: {
    overview: 'La Ciudad de los Ángeles, donde los templos antiguos se encuentran con la ultramodernidad en un vibrante paisaje sensorial.',
    mustVisit: [
      {
        title: 'El Gran Palacio',
        description: 'La espectacular casa ceremonial de los reyes tailandeses y el Templo del Buda de Esmeralda.',
        etiquette: 'Etiqueta: Estricta: los hombros y las rodillas deben estar cubiertos. No se permiten sandalias sin correas.'
      },
      {
        title: 'Museo Nacional de Bangkok',
        description: 'El museo más grande del sudeste asiático, que muestra el arte y la historia tailandeses.'
      },
      {
        title: 'Siam Square',
        description: 'El corazón de la cultura juvenil y la moda de Bangkok.'
      }
    ],
    dining: [
      {
        title: 'Jay Fai',
        description: 'La mundialmente famosa tortilla de carne de cangrejo con estrella Michelin cocinada al carbón.'
      },
      {
        title: 'Mercado Or Tor Kor',
        description: 'Mercado de productos frescos de lujo conocido por sus productos agrícolas de la más alta calidad.'
      }
    ],
    otherExperiences: [
      {
        title: 'Jodd Fairs',
        description: 'Un moderno mercado nocturno popular por su comida callejera y moda vintage.'
      },
      {
        title: 'Barco expreso del río Chao Phraya',
        description: 'Experimente la vida del río y evite el tráfico como un local.'
      }
    ],
    uniqueActivities: [
      {
        title: 'Escuela de cocina Blue Elephant',
        description: 'Aprenda los secretos de la cocina real tailandesa en un entorno histórico.'
      },
      {
        title: 'Tour por los canales ocultos de Bangkok',
        description: 'Explore los remansos tranquilos y las casas tradicionales de madera.'
      }
    ],
    hiddenGems: [
      {
        title: 'Wat Sam Phran',
        description: 'Una torre rosa de 17 pisos con un enorme dragón en espiral a su alrededor.',
        etiquette: 'Se solicita contemplación silenciosa.'
      },
      {
        title: 'Baan Silapin (Casa del Artista)',
        description: 'Una casa centenaria convertida en galería y teatro de marionetas.'
      }
    ]
  },
  french: {
    overview: 'La Cité des Anges, où les sanctuaires anciens rencontrent l\'ultra-modernité dans un paysage sensoriel dynamique.',
    mustVisit: [
      {
        title: 'Le Grand Palais',
        description: 'La demeure cérémonielle spectaculaire des rois thaïlandais et le temple du Bouddha d\'Émeraude.',
        etiquette: 'Étiquette : Stricte : les épaules et les genoux doivent être couverts. Pas de sandales sans sangles.'
      },
      {
        title: 'Musée National de Bangkok',
        description: 'Le plus grand musée d\'Asie du Sud-Est, présentant l\'art et l\'histoire de la Thaïlande.'
      },
      {
        title: 'Siam Square',
        description: 'Le cœur de la culture de la jeunesse et de la mode de Bangkok.'
      }
    ],
    dining: [
      {
        title: 'Jay Fai',
        description: 'Célèbre omelette au crabe étoilée au Michelin, cuite au charbon de bois.'
      },
      {
        title: 'Marché Or Tor Kor',
        description: 'Marché de produits frais haut de gamme connu pour ses produits agricoles de la plus haute qualité.'
      }
    ],
    otherExperiences: [
      {
        title: 'Jodd Fairs',
        description: 'Un marché nocturne branché populaire pour sa cuisine de rue et sa mode vintage.'
      },
      {
        title: 'Bateau express Chao Phraya',
        description: 'Découvrez la vie du fleuve et évitez le trafic comme un local.'
      }
    ],
    uniqueActivities: [
      {
        title: 'École de cuisine Blue Elephant',
        description: 'Apprenez les secrets de la cuisine royale thaïlandaise dans un cadre historique.'
      },
      {
        title: 'Visite des canaux cachés de Bangkok',
        description: 'Explorez les backwaters tranquilles et les maisons traditionnelles en bois.'
      }
    ],
    hiddenGems: [
      {
        title: 'Wat Sam Phran',
        description: 'Une tour rose de 17 étages avec un énorme dragon enroulé autour d\'elle.',
        etiquette: 'Contemplation silencieuse demandée.'
      },
      {
        title: 'Baan Silapin (Maison de l\'Artiste)',
        description: 'Une maison centenaire transformée en galerie et théâtre de marionnettes.'
      }
    ]
  },
  russian: {
    overview: 'Город Ангелов, где древние святыни встречаются с ультрасовременностью в ярком сенсорном ландшафте.',
    mustVisit: [
      {
        title: 'Большой дворец',
        description: 'Захватывающий церемониальный дом тайских королей и Храм Изумрудного Будды.',
        etiquette: 'Этикет: Строго: Плечи и колени должны быть закрыты. Никаких сандалий без ремешков.'
      },
      {
        title: 'Национальный музей Бангкока',
        description: 'Крупнейший музей в Юго-Восточной Азии, представляющий тайское искусство и историю.'
      },
      {
        title: 'Площадь Сиам',
        description: 'Сердце молодежной культуры и моды Бангкока.'
      }
    ],
    dining: [
      {
        title: 'Джей Фай (Jay Fai)',
        description: 'Всемирно известный омлет с крабовым мясом, отмеченный звездой Мишлен, приготовленный на углях.'
      },
      {
        title: 'Рынок Ор Тор Кор',
        description: 'Элитный рынок свежих продуктов, известный высочайшим качеством сельскохозяйственной продукции.'
      }
    ],
    otherExperiences: [
      {
        title: 'Джодд Фэйрс (Jodd Fairs)',
        description: 'Модный ночной рынок, популярный благодаря уличной еде и винтажной моде.'
      },
      {
        title: 'Экспресс-лодка по реке Чаупхрая',
        description: 'Почувствуйте жизнь реки и избавьтесь от пробок как местный житель.'
      }
    ],
    uniqueActivities: [
      {
        title: 'Кулинарная школа Blue Elephant',
        description: 'Узнайте секреты королевской тайской кухни в исторической обстановке.'
      },
      {
        title: 'Тур по скрытым каналам Бангкока',
        description: 'Исследуйте тихие заводи и традиционные деревянные дома.'
      }
    ],
    hiddenGems: [
      {
        title: 'Ват Сам Пхран',
        description: '17-этажная розовая башня с массивным драконом, обвивающим ее.',
        etiquette: 'Просьба к тихому созерцанию.'
      },
      {
        title: 'Баан Силапин (Дом художника)',
        description: 'Столетний дом, превращенный в галерею и театр кукол.'
      }
    ]
  },
  chinese: {
    overview: '天使之城，古老的寺庙与超现代的景观在充满活力的感官世界中交织。',
    mustVisit: [
      {
        title: '大皇宫',
        description: '泰国国王壮丽的礼仪居所和玉佛寺。',
        etiquette: '礼仪：严格：必须遮住肩膀和膝盖。禁止穿无带凉鞋。'
      },
      {
        title: '曼谷国家博物馆',
        description: '东南亚最大的博物馆，展示泰国艺术和历史。'
      },
      {
        title: '暹罗广场',
        description: '曼谷青年文化和时尚的中心。'
      }
    ],
    dining: [
      {
        title: '痣姐热炒 (Jay Fai)',
        description: '享誉世界的米其林星级炭火蟹肉煎蛋。'
      },
      {
        title: '安多哥市场 (Or Tor Kor Market)',
        description: '以最高品质农产品闻名的高档鲜食市场。'
      }
    ],
    otherExperiences: [
      {
        title: '乔德夜市 (Jodd Fairs)',
        description: '深受时尚人士喜爱的夜市，主打街头美食和复古时尚。'
      },
      {
        title: '昭披耶快船',
        description: '像当地人一样体验河流生活，避开交通拥堵。'
      }
    ],
    uniqueActivities: [
      {
        title: '蓝象烹饪学校',
        description: '在历史悠久的环境中学习皇家泰国菜的秘密。'
      },
      {
        title: '曼谷隐秘运河之旅',
        description: '探索安静的死水回流和传统的木屋。'
      }
    ],
    hiddenGems: [
      {
        title: '三攀蟠龍寺 (Wat Sam Phran)',
        description: '一座 17 层楼高的粉色塔楼，周围环绕着一条巨大的巨龙。',
        etiquette: '请保持安静思考。'
      },
      {
        title: '艺术家之家 (Baan Silapin)',
        description: '一座拥有百年历史的房屋，现已改建为画廊和木偶剧院。'
      }
    ]
  },
  japanese: {
    overview: '天使の都。活気に満ちた感覚的な風景の中で、古代の寺院と超現代性が融合しています。',
    mustVisit: [
      {
        title: '大宮殿 (グランドパレス)',
        description: 'タイの王室の壮麗な儀式の場であり、エメラルド寺院でもあります。',
        etiquette: 'マナー：厳守：肩と膝を隠す必要があります。ストラップのないサンダルは禁止です。'
      },
      {
        title: 'バンコク国立博物館',
        description: '東南アジア最大の博物館で、タイの美術と歴史を展示しています。'
      },
      {
        title: 'サイアム・スクエア',
        description: 'バンコクの若者文化とファッションの鼓動地。'
      }
    ],
    dining: [
      {
        title: 'ジェイ・ファイ (Jay Fai)',
        description: '炭火で調理された、世界的に有名なミシュラン星付きの蟹肉オムレツ。'
      },
      {
        title: 'オートーコー市場',
        description: '最高品質の農産物で知られる高級な生鮮市場。'
      }
    ],
    otherExperiences: [
      {
        title: 'ジョッド・フェア (Jodd Fairs)',
        description: 'ストリートフードやヴィンテージファッションで人気のトレンディなナイトマーケット。'
      },
      {
        title: 'チャオプラヤー・エクスプレス・ボート',
        description: '地元の人のように川の生活を体験し、渋滞を避けましょう。'
      }
    ],
    uniqueActivities: [
      {
        title: 'ブルーエレファント料理学校',
        description: '歴史的な環境でロイヤルタイ料理の秘密を学びましょう。'
      },
      {
        title: 'バンコクの隠れた運河ツアー',
        description: '静かな水辺と伝統的な木造住宅を探索しましょう。'
      }
    ],
    hiddenGems: [
      {
        title: 'ワット・サム・プラン',
        description: '巨大な龍が巻き付いた17階建てのピンクの塔。',
        etiquette: '静かな瞑想をお願いします。'
      },
      {
        title: 'バーン・シラピン (アーティストハウス)',
        description: '築100年の家を改装したギャラリー兼人形劇場。'
      }
    ]
  },
  korean: {
    overview: '고대 사원과 초현대성이 공존하는 활기찬 감각적 풍경의 천사의 도시.',
    mustVisit: [
      {
        title: '방콕 왕궁',
        description: '태국 국왕들의 화려한 의례용 거처이자 에메랄드 불상 사원.',
        etiquette: '에티켓: 엄격함: 어깨와 무릎을 가려야 합니다. 스트랩 없는 샌들은 금지됩니다.'
      },
      {
        title: '방콕 국립 박물관',
        description: '태국 예술과 역사를 보여주는 동남아시아 최대 규모의 박물관.'
      },
      {
        title: '시암 스퀘어',
        description: '방콕 청년 문화와 패션의 심장부.'
      }
    ],
    dining: [
      {
        title: '제이 파이 (Jay Fai)',
        description: '숯불로 요리한 세계적으로 유명한 미슐랭 스타 게살 오믈렛.'
      },
      {
        title: '어 떠 거 시장 (Or Tor Kor Market)',
        description: '최고 품질의 농산물로 유명한 고급 신선 시장.'
      }
    ],
    otherExperiences: [
      {
        title: '조드 페어 (Jodd Fairs)',
        description: '길거리 음식과 빈티지 패션으로 인기 있는 트렌디한 야시장.'
      },
      {
        title: '짜오프라야 익스프레스 보트',
        description: '현지인처럼 강변의 삶을 체험하고 교통 체증을 피하세요.'
      }
    ],
    uniqueActivities: [
      {
        title: '블루 엘리펀트 쿠킹 스쿨',
        description: '역사적인 장소에서 태국 왕실 요리의 비결을 배워보세요.'
      },
      {
        title: '숨겨진 방콕 운河 투어',
        description: '조용한 수로와 전통 목조 주택을 탐험하세요.'
      }
    ],
    hiddenGems: [
      {
        title: '왓 삼 프란',
        description: '거대한 용이 휘감고 있는 17층 높이의 분홍색 타워.',
        etiquette: '조용한 관람을 부탁드립니다.'
      },
      {
        title: '반 실라핀 (아티스트 하우스)',
        description: '갤러리와 인형 극장으로 변신한 100년 된 가옥.'
      }
    ]
  },
  myanmar: {
    overview: 'ရှေးဟောင်းကိန်းဝပ်ရာ နေရာများနှင့် ခေတ်မီဆန်းသစ်မှုများ ပေါင်းစပ်ထားသော နတ်မင်းကြီးများ၏ မြို့တော်။',
    mustVisit: [
      {
        title: 'ဂရန်းပဲလေ့စ် (နန်းတော်)',
        description: 'ထိုင်းဘုရင်များ၏ သမိုင်းဝင်နန်းတော်နှင့် မြရုပ်ပွားတော် ကိန်းဝပ်ရာနေရာ။',
        etiquette: 'တင်းကြပ်သည်- ပုခုံးနှင့် ဒူးများကို ဖုံးအုပ်ထားရမည်။ ကြိုးမပါသော ဖိနပ်များ မစီးရ။'
      },
      {
        title: 'ဘန်ကောက် အမျိုးသားပြတိုက်',
        description: 'အရှေ့တောင်အာရှတွင် အကြီးဆုံးပြတိုက်ဖြစ်ပြီး ထိုင်းအနုပညာနှင့် သမိုင်းကို ပြသထားသည်။'
      },
      {
        title: 'Siam Square',
        description: 'ဘန်ကောက်လူငယ်ယဉ်ကျေးမှုနှင့် ဖက်ရှင်၏ ဗဟိုချက်။'
      }
    ],
    dining: [
      {
        title: 'ကျေးဖိုင် (Jay Fai)',
        description: 'မီးသွေးဖြင့်ချက်ပြုတ်ထားသော ကမ္ဘာကျော် မစ်ရှီလင်းကြယ်ပွင့်ရ ဂဏန်းဥမုန့်။'
      },
      {
        title: 'အောတောကော စျေး (Or Tor Kor)',
        description: 'အရည်အသွေးမြင့် စိုက်ပျိုးရေးထွက်ကုန်များကြောင့် လူသိများသော အဆင့်မြင့်စျေး။'
      }
    ],
    otherExperiences: [
      {
        title: 'Jodd Fairs',
        description: 'လမ်းဘေးစာနှင့် ဖက်ရှင်များကြောင့် လူကြိုက်များသော ခေတ်မီညစျေး။'
      },
      {
        title: 'ကျောက်ဖယား အမြန်လှေ',
        description: 'မြစ်ကမ်းဘေးလူနေမှုကို တွေ့ကြုံခံစားပြီး ဒေသခံများကဲ့သို့ ခရီးသွားပါ။'
      }
    ],
    uniqueActivities: [
      {
        title: 'Blue Elephant ဟင်းချက်သင်တန်း',
        description: 'သမိုင်းဝင်နေရာတစ်ခုတွင် ထိုင်းတော်ဝင်ဟင်းလျาများ၏ လျှို့ဝှက်ချက်များကို လေ့လာပါ။'
      },
      {
        title: 'ဘန်ကောက် တူးမြောင်းခရီးစဉ်',
        description: 'ငြိမ်သက်သော ရေလမ်းကြောင်းများနှင့် ရိုးရာသစ်သားအိမ်များကို စူးစမ်းပါ။'
      }
    ],
    hiddenGems: [
      {
        title: 'ဝပ်ဆမ်ဖရန် (နဂါးဘုရား)',
        description: 'နဂါးကြီးပတ်ခွေထားသော ၁၇ ထပ်ရှိ ပန်းရောင်မျှော်စင်။',
        etiquette: 'ငြိမ်သက်စွာ လေ့လာရန် မေတ္တာရပ်ခံသည်။'
      },
      {
        title: 'အနုပညာရှင်အိမ် (Artist House)',
        description: 'နှစ်ပေါင်းတစ်ရာသက်တမ်းရှိ အိမ်ဟောင်းတစ်ခုဖြစ်ပြီး ယခု ပြခန်းနှင့် ရုပ်သေးပြဇာတ်ရုံ ဖြစ်သည်။'
      }
    ]
  },
  portuguese: {
    overview: 'A Cidade dos Anjos, onde santuários antigos encontram a ultramodernidade em uma vibrante paisagem sensorial.',
    mustVisit: [
      {
        title: 'O Grande Palácio',
        description: 'A espetacular casa cerimonial dos reis tailandeses e o Templo do Buda de Esmeralda.',
        etiquette: 'Etiqueta: Estrita: ombros e joelhos devem estar cobertos. Proibido sandálias sem tiras.'
      },
      {
        title: 'Museu Nacional de Bangcoc',
        description: 'O maior museu do Sudeste Asiático, exibindo arte e história tailandesas.'
      },
      {
        title: 'Siam Square',
        description: 'O coração da cultura jovem e da moda de Bangcoc.'
      }
    ],
    dining: [
      {
        title: 'Jay Fai',
        description: 'Omelete de carne de caranguejo cozida no carvão, mundialmente famosa e com estrela Michelin.'
      },
      {
        title: 'Mercado Or Tor Kor',
        description: 'Mercado de produtos frescos de luxo conhecido pelos produtos agrícolas de alta qualidade.'
      }
    ],
    otherExperiences: [
      {
        title: 'Jodd Fairs',
        description: 'Um mercado noturno moderno, popular por comida de rua e moda vintage.'
      },
      {
        title: 'Barco expresso do rio Chao Phraya',
        description: 'Experimente a vida no rio e fuja do trânsito como um morador local.'
      }
    ],
    uniqueActivities: [
      {
        title: 'Escola de Culinária Blue Elephant',
        description: 'Aprenda os segredos da culinária real tailandesa em um ambiente histórico.'
      },
      {
        title: 'Tour pelos canais escondidos de Bangcoc',
        description: 'Explore os remansos tranquilos e as casas tradicionais de madeira.'
      }
    ],
    hiddenGems: [
      {
        title: 'Wat Sam Phran',
        description: 'Uma torre rosa de 17 andares com um dragão enorme espiralando ao redor dela.',
        etiquette: 'Solicita-se contemplação silenciosa.'
      },
      {
        title: 'Baan Silapin (Casa do Artista)',
        description: 'Uma casa centenária transformada em galeria e teatro de fantoches.'
      }
    ]
  },
  german: {
    overview: 'Die Stadt der Engel, in der alte Schreine auf Ultramoderne in einer pulsierenden Sinneslandschaft treffen.',
    mustVisit: [
      {
        title: 'Der Große Palast',
        description: 'Das spektakuläre zeremonielle Zuhause der thailändischen Könige und der Tempel des Smaragd-Buddha.',
        etiquette: 'Knigge: Streng: Schultern und Knie müssen bedeckt sein. Keine Sandalen ohne Riemen.'
      },
      {
        title: 'Nationalmuseum Bangkok',
        description: 'Das größte Museum in Südostasien, das thailändische Kunst und Geschichte zeigt.'
      },
      {
        title: 'Siam Square',
        description: 'Das Herzstück der Bangkoker Jugendkultur und Mode.'
      }
    ],
    dining: [
      {
        title: 'Jay Fai',
        description: 'Weltberühmtes Michelin-Stern-Krabbencurry-Omelett, über Holzkohle gekocht.'
      },
      {
        title: 'Or Tor Kor Markt',
        description: 'Gehobener Frischmarkt, bekannt für landwirtschaftliche Produkte höchster Qualität.'
      }
    ],
    otherExperiences: [
      {
        title: 'Jodd Fairs',
        description: 'Ein trendiger Nachtmarkt, beliebt für Street Food und Vintage-Mode.'
      },
      {
        title: 'Chao Phraya Expressboot',
        description: 'Erleben Sie das Flussleben und schlagen Sie den Verkehr wie ein Einheimischer.'
      }
    ],
    uniqueActivities: [
      {
        title: 'Blue Elephant Kochschule',
        description: 'Lernen Sie die Geheimnisse der königlichen thailändischen Küche in einem historischen Ambiente.'
      },
      {
        title: 'Verborgene Bangkok-Kanaltour',
        description: 'Erkunden Sie die ruhigen Backwaters und traditionellen Holzhäuser.'
      }
    ],
    hiddenGems: [
      {
        title: 'Wat Sam Phran',
        description: 'Ein 17-stöckiger rosa Turm, um den sich ein riesiger Drache windet.',
        etiquette: 'Stille Kontemplation erbeten.'
      },
      {
        title: 'Baan Silapin (Künstlerhaus)',
        description: 'Ein jahrhundertealtes Haus, das in eine Galerie und ein Puppentheater umgewandelt wurde.'
      }
    ]
  },
  italian: {
    overview: 'La Città degli Angeli, dove antichi santuari incontrano l\'ultramodernità in un vibrante scenario sensoriale.',
    mustVisit: [
      {
        title: 'Il Grande Palazzo',
        description: 'La spettacolare residenza cerimoniale dei re tailandesi e il Tempio del Buddha di Smeraldo.',
        etiquette: 'Etichetta: Rigorosa: spalle e ginocchia devono essere coperte. Niente sandali senza cinturini.'
      },
      {
        title: 'Museo Nazionale di Bangkok',
        description: 'Il più grande museo del sud-est asiatico, che espone arte e storia tailandese.'
      },
      {
        title: 'Siam Square',
        description: 'Il cuore della cultura giovanile e della moda di Bangkok.'
      }
    ],
    dining: [
      {
        title: 'Jay Fai',
        description: 'Famosa omelette di polpa di granchio con stella Michelin, cotta alla brace.'
      },
      {
        title: 'Mercato Or Tor Kor',
        description: 'Mercato di prodotti freschi di lusso noto per i prodotti agricoli di altissima qualità.'
      }
    ],
    otherExperiences: [
      {
        title: 'Jodd Fairs',
        description: 'Un moderno mercato notturno popolare per lo street food e la moda vintage.'
      },
      {
        title: 'Battello espresso Chao Phraya',
        description: 'Vivi la vita del fiume ed evita il traffico come un abitante del posto.'
      }
    ],
    uniqueActivities: [
      {
        title: 'Scuola di cucina Blue Elephant',
        description: 'Scopri i segreti della cucina reale tailandese in un ambiente storico.'
      },
      {
        title: 'Tour dei canali nascosti di Bangkok',
        description: 'Esplora le tranquille acque secondarie e le tradizionali case di legno.'
      }
    ],
    hiddenGems: [
      {
        title: 'Wat Sam Phran',
        description: 'Una torre rosa di 17 piani con un enorme drago che vi si attorciglia intorno.',
        etiquette: 'Si richiede contemplazione silenziosa.'
      },
      {
        title: 'Baan Silapin (Casa dell\'Artista)',
        description: 'Una casa centenaria trasformata in galleria e teatro di marionette.'
      }
    ]
  },
  hindi: {
    overview: 'देवदूतों का शहर, जहाँ जीवंत संवेदी परिदृश्य में प्राचीन मंदिर अत्याधुनिकता से मिलते हैं।',
    mustVisit: [
      {
        title: 'द ग्रैंड पैलेस',
        description: 'थाई राजाओं का शानदार औपचारिक घर और एमराल्ड बुद्ध का मंदिर।',
        etiquette: 'शिष्टाचार: सख्त: कंधे और घुटने ढके होने चाहिए। बिना पट्टियों वाले सैंडल की अनुमति नहीं है।'
      },
      {
        title: 'बैंकॉक राष्ट्रीय संग्रहालय',
        description: 'दक्षिण पूर्व एशिया का सबसे बड़ा संग्रहालय, जो थाई कला और इतिहास को प्रदर्शित करता है।'
      },
      {
        title: 'स्याम स्क्वायर',
        description: 'बैंकॉक युवा संस्कृति और फैशन की धड़कन।'
      }
    ],
    dining: [
      {
        title: 'जे फई (Jay Fai)',
        description: 'कोयले पर पकाया गया विश्व प्रसिद्ध मिशेलिन-तारांकित केकड़े के मांस का आमलेट।'
      },
      {
        title: 'ओर टोर कोर मार्केट',
        description: 'उच्च गुणवत्ता वाले कृषि उत्पादों के लिए जाना जाने वाला आलीशान ताजा बाजार।'
      }
    ],
    otherExperiences: [
      {
        title: 'जोड फेयर्स (Jodd Fairs)',
        description: 'स्ट्रीट फूड और विंटेज फैशन के लिए लोकप्रिय एक आधुनिक नाइट मार्केट।'
      },
      {
        title: 'चाओ फ़्रया एक्सप्रेस बोट',
        description: 'नदी के जीवन का अनुभव करें और स्थानीय लोगों की तरह ट्रैफिक को मात दें।'
      }
    ],
    uniqueActivities: [
      {
        title: 'ब्लू एलीफेंट कुकिंग स्कूल',
        description: 'ऐतिहासिक परिवेश में रॉयल थाई व्यंजनों के रहस्य सीखें।'
      },
      {
        title: 'हिडन बैंकॉक कैनाल टूर',
        description: 'शांत पानी और पारंपरिक लकड़ी के घरों का अन्वेषण करें।'
      }
    ],
    hiddenGems: [
      {
        title: 'वाट सैम फ्रान',
        description: '17 मंजिला गुलाबी मीनार जिसके चारों ओर एक विशाल ड्रैगन सर्पिल बना हुआ है।',
        etiquette: 'शांत चिंतन का अनुरोध किया गया है।'
      },
      {
        title: 'बान सिलापिन (आर्टिस्ट हाउस)',
        description: 'एक सदी पुराना घर जो गैलरी और कठपुतली थिएटर में बदल गया है।'
      }
    ]
  },
  arabic: {
    overview: 'مدينة الملائكة، حيث تلتقي الأضرحة القديمة بالحداثة الفائقة في مشهد حسي نابض بالحياة.',
    mustVisit: [
      {
        title: 'القصر الكبير',
        description: 'البيت الاحتفالي الرائع لملوك تايلاند ومعبد بوذا الزمردي.',
        etiquette: 'الآداب: صارمة: يجب تغطية الكتفين والركبتين. يمنع ارتداء الصنادل بدون أحزمة.'
      },
      {
        title: 'متحف بانكوك الوطني',
        description: 'أكبر متحف في جنوب شرق آسيا، يعرض الفن والتاريخ التايلاندي.'
      },
      {
        title: 'سيام سكوير',
        description: 'نبض ثقافة الشباب والأزياء في بانكوك.'
      }
    ],
    dining: [
      {
        title: 'جاي فاي (Jay Fai)',
        description: 'عجة لحم السلطعون الشهيرة عالمياً والحائزة على نجمة ميشلان والمطبوخة على الفحم.'
      },
      {
        title: 'سوق أور تور كور (Or Tor Kor)',
        description: 'سوق للمنتجات الطازجة الفاخرة والمعروف بتقديمه لأجود أنواع المنتجات الزراعية.'
      }
    ],
    otherExperiences: [
      {
        title: 'سوق جود فيرز (Jodd Fairs)',
        description: 'سوق ليلي عصري يشتهر بطعام الشارع والأزياء الكلاسيكية.'
      },
      {
        title: 'قارب تشاو فرايا السريع',
        description: 'استمتع بحياة النهر وتجنب الزحام المروري مثل السكان المحليين.'
      }
    ],
    uniqueActivities: [
      {
        title: 'مدرسة بلو أليفانت للطبخ',
        description: 'تعلم أسرار المطبخ التايلاندي الملكي في بيئة تاريخية.'
      },
      {
        title: 'جولة قنوات بانكوك المخفية',
        description: 'استكشف المياه الهادئة والبيوت الخشبية التقليدية.'
      }
    ],
    hiddenGems: [
      {
        title: 'وات سام فران',
        description: 'برج وردي مكون من 17 طابقاً يلتف حوله تنين ضخم.',
        etiquette: 'يُطلب التأمل الهادئ.'
      },
      {
        title: 'بان سيلابين (بيت الفنان)',
        description: 'منزل عمره قرن من الزمان تحول إلى معرض ومسرح للدمى.'
      }
    ]
  },
  vietnamese: {
    overview: 'Thành phố của những thiên thần, nơi các ngôi đền cổ kính gặp gỡ nét hiện đại bậc nhất trong một cảnh quan cảm quan sống động.',
    mustVisit: [
      {
        title: 'Hoàng cung (The Grand Palace)',
        description: 'Ngôi nhà nghi lễ ngoạn mục của các triều đại vua Thái và chùa Phật Ngọc.',
        etiquette: 'Quy định: Nghiêm ngặt: Vai và đầu gối phải được che kín. Không đi dép lê không có quai hậu.'
      },
      {
        title: 'Bảo tàng Quốc gia Bangkok',
        description: 'Bảo tàng lớn nhất Đông Nam Á, trưng bày nghệ thuật và lịch sử Thái Lan.'
      },
      {
        title: 'Siam Square',
        description: 'Nhịp đập của văn hóa trẻ và thời trang Bangkok.'
      }
    ],
    dining: [
      {
        title: 'Đầu bếp Jay Fai',
        description: 'Món trứng cuộn thịt cua đạt sao Michelin nổi tiếng thế giới nấu trên bếp than.'
      },
      {
        title: 'Chợ Or Tor Kor',
        description: 'Chợ thực phẩm tươi sống cao cấp nổi tiếng với các nông sản chất lượng cao nhất.'
      }
    ],
    otherExperiences: [
      {
        title: 'Chợ đêm Jodd Fairs',
        description: 'Một chợ đêm hợp thời trang phổ biến với các món ăn đường phố và thời trang cổ điển.'
      },
      {
        title: 'Thuyền tốc hành sông Chao Phraya',
        description: 'Trải nghiệm cuộc sống trên sông và tránh tắc đường như một người bản địa.'
      }
    ],
    uniqueActivities: [
      {
        title: 'Trường dạy nấu ăn Blue Elephant',
        description: 'Tìm hiểu bí mật của ẩm thực Hoàng gia Thái Lan trong một không gian lịch sử.'
      },
      {
        title: 'Tour du lịch kênh rạch ẩn mình Bangkok',
        description: 'Khám phá những vùng nước yên tĩnh và những ngôi nhà gỗ truyền thống.'
      }
    ],
    hiddenGems: [
      {
        title: 'Chùa Wat Sam Phran',
        description: 'Một tòa tháp màu hồng cao 17 tầng với một con rồng khổng lồ quấn quanh.',
        etiquette: 'Yêu cầu sự chiêm nghiệm tĩnh lặng.'
      },
      {
        title: 'Baan Silapin (Nhà Nghệ Sĩ)',
        description: 'Một ngôi nhà trăm tuổi được biến thành phòng trưng bày và nhà hát múa rối.'
      }
    ]
  },
  indonesian: {
    overview: 'Kota Para Malaikat, tempat kuil kuno bertemu dengan ultra-modernitas dalam lanskap sensorik yang dinamis.',
    mustVisit: [
      {
        title: 'The Grand Palace',
        description: 'Rumah seremonial spektakuler bagi Raja-raja Thailand dan Kuil Buddha Zamrud.',
        etiquette: 'Etika: Ketat: Bahu dan lutut harus tertutup. Tidak boleh memakai sandal tanpa tali.'
      },
      {
        title: 'Museum Nasional Bangkok',
        description: 'Museum terbesar di Asia Tenggara, memamerkan seni dan sejarah Thailand.'
      },
      {
        title: 'Siam Square',
        description: 'Jantung budaya pemuda dan mode Bangkok.'
      }
    ],
    dining: [
      {
        title: 'Jay Fai',
        description: 'Omelet daging kepiting berbintang Michelin yang terkenal di dunia yang dimasak di atas arang.'
      },
      {
        title: 'Pasar Or Tor Kor',
        description: 'Pasar segar kelas atas yang dikenal dengan produk pertanian berkualitas tertinggi.'
      }
    ],
    otherExperiences: [
      {
        title: 'Jodd Fairs',
        description: 'Pasar malam trendi yang populer dengan makanan jalanan dan mode vintage.'
      },
      {
        title: 'Perahu Ekspres Chao Phraya',
        description: 'Rasakan kehidupan sungai dan hindari kemacetan seperti penduduk setempat.'
      }
    ],
    uniqueActivities: [
      {
        title: 'Sekolah Memasak Blue Elephant',
        description: 'Pelajari rahasia masakan Kerajaan Thailand di lingkungan yang bersejarah.'
      },
      {
        title: 'Tur Kanal Bangkok yang Tersembunyi',
        description: 'Jelajahi daerah perairan yang tenang dan rumah kayu tradisional.'
      }
    ],
    hiddenGems: [
      {
        title: 'Wat Sam Phran',
        description: 'Menara merah muda 17 lantai dengan naga raksasa yang melingkar di sekelilingnya.',
        etiquette: 'Mohon menjaga ketenangan.'
      },
      {
        title: 'Baan Silapin (Rumah Artis)',
        description: 'Rumah berusia seabad yang diubah menjadi galeri dan teater boneka.'
      }
    ]
  },
  malay: {
    overview: 'Kota Para Malaikat, di mana kuil purba bertemu ultra-kemodenan dalam landskap sensori yang rancak.',
    mustVisit: [
      {
        title: 'The Grand Palace',
        description: 'Rumah istiadat yang menakjubkan bagi Raja-raja Thai dan Kuil Buddha Zamrud.',
        etiquette: 'Etika: Ketat: Bahu dan lutut mesti ditutup. Tiada selipar tanpa tali.'
      },
      {
        title: 'Muzium Negara Bangkok',
        description: 'Muzium terbesar di Asia Tenggara, mempamerkan seni dan sejarah Thai.'
      },
      {
        title: 'Siam Square',
        description: 'Nadi budaya belia dan fesyen Bangkok.'
      }
    ],
    dining: [
      {
        title: 'Jay Fai',
        description: 'Omelet daging ketam bertaraf bintang Michelin yang terkenal di dunia dimasak menggunakan arang.'
      },
      {
        title: 'Pasar Or Tor Kor',
        description: 'Pasar segar mewah yang terkenal dengan produk pertanian berkualiti tinggi.'
      }
    ],
    otherExperiences: [
      {
        title: 'Jodd Fairs',
        description: 'Pasar malam trendi yang popular dengan makanan jalanan dan fesyen vintaj.'
      },
      {
        title: 'Bot Ekspres Chao Phraya',
        description: 'Alami kehidupan sungai dan elakkan kesesakan lalu lintas seperti penduduk tempatan.'
      }
    ],
    uniqueActivities: [
      {
        title: 'Sekolah Memasak Blue Elephant',
        description: 'Pelajari rahsia masakan Diraja Thai dalam persekitaran yang bersejarah.'
      },
      {
        title: 'Lawatan Terusan Tersembunyi Bangkok',
        description: 'Terokai perairan yang sunyi dan rumah kayu tradisional.'
      }
    ],
    hiddenGems: [
      {
        title: 'Wat Sam Phran',
        description: 'Menara merah jambu 17 tingkat dengan naga besar melingkar di sekelilingnya.',
        etiquette: 'Mohon ketenangan semasa berkunjung.'
      },
      {
        title: 'Baan Silapin (Rumah Artis)',
        description: 'Sebuah rumah berusia seabad yang dijadikan galeri dan teater boneka.'
      }
    ]
  }
};

const filePath = join(process.cwd(), 'src/data/destinations.ts');
let content = readFileSync(filePath, 'utf-8');

// We need to parse the content or use regex to find the Bangkok entries.
// Since it is a complex TS object, a safe way is to replace the entire Bangkok object for each language.

Object.keys(BANGKOK_TRANSLATIONS).forEach(lang => {
  const trans = BANGKOK_TRANSLATIONS[lang];
  
  // Use regex to find the bangkok entry within the language array
  // This is tricky because the structure is nested.
  // Instead of a perfect parser, I will target the specific fields for the 'bangkok' id.
  
  // Find the block: { id: 'bangkok', ... } within lang: [ ... ]
  // This regex is complex because of nesting.
  
  // Simpler approach: find the language bucket, then find the bangkok entry.
  const langBucketRegex = new RegExp(`${lang}: \\[[\\s\\S]*?\\]`, 'g');
  const matches = content.match(langBucketRegex);
  
  if (matches) {
    let bucket = matches[0];
    
    // Find bangkok entry within bucket
    const bangkokEntryRegex = /\{[\s\S]*?id: 'bangkok'[\s\S]*?\}/;
    const bangkokMatch = bucket.match(bangkokEntryRegex);
    
    if (bangkokMatch) {
      let entry = bangkokMatch[0];
      
      // Update overview
      entry = entry.replace(/overview: '.*'/, `overview: '${trans.overview}'`);
      
      // Update mustVisit
      trans.mustVisit.forEach((item: any, idx: number) => {
        // Find the nth item in mustVisit array
        // This is getting very complex for regex.
        // Let's try a different approach: rebuild the bangkok entry string.
      });
      
      // Rebuild approach:
      // I will manually reconstruct the pillars object based on the english one but with translated text.
    }
  }
});

// Actually, the easiest way is to just do a targeted replacement of the strings in the file.
// Or even better, I'll write a script that specifically looks for those English strings in all language buckets and replaces them.

const ENGLISH_STRINGS = [
  'The City of Angels, where ancient shrines meet ultra-modernity in a vibrant sensory landscape.',
  'The spectacular ceremonial home of Thai Kings and the Temple of the Emerald Buddha.',
  'Strict: Shoulders and knees must be covered. No sandals without straps.',
  'The largest museum in Southeast Asia, showcasing Thai art and history.',
  'The heartbeat of Bangkok youth culture and fashion.',
  'World-famous Michelin-starred crab meat omelet cooked over charcoal.',
  'Upscale fresh market known for the highest quality agricultural products.',
  'A trendy night market popular for street food and vintage fashion.',
  'Experience the river life and beat the traffic like a local.',
  'Learn the secrets of Royal Thai cuisine in a historic setting.',
  'Explore the quiet backwaters and traditional wooden houses.',
  'A 17-story pink tower with a massive dragon spiraling around it.',
  'Quiet contemplation requested.',
  'A century-old house turned into a gallery and puppet theater.'
];

Object.keys(BANGKOK_TRANSLATIONS).forEach(lang => {
    const trans = BANGKOK_TRANSLATIONS[lang];
    if (lang === 'english') return;

    // Get all language blocks
    const langStart = content.indexOf(`${lang}: [`);
    if (langStart === -1) return;
    
    let langEnd = -1;
    let braceCount = 0;
    for (let i = langStart; i < content.length; i++) {
        if (content[i] === '[') braceCount++;
        if (content[i] === ']') braceCount--;
        if (braceCount === 0 && content[i] === ']') {
            langEnd = i + 1;
            break;
        }
    }
    
    if (langEnd === -1) return;
    
    let langBlock = content.substring(langStart, langEnd);
    let originalLangBlock = langBlock;

    // Check if the array is empty
    if (langBlock.trim() === `${lang}: []`) {
        const newBangkokEntry = `
  {
    id: 'bangkok',
    name: 'Bangkok',
    thaiName: 'กรุงเทพมหานคร',
    overview: '${trans.overview}',
    pillars: {
      mustVisit: [
        {
          title: '${trans.mustVisit[0].title || 'The Grand Palace'}',
          badge: 'Landmarks',
          description: '${trans.mustVisit[0].description}',
          etiquette: '${trans.mustVisit[0].etiquette}',
          imageLabel: 'grand_palace_bangkok'
        },
        {
          title: '${trans.mustVisit[1].title || 'National Museum Bangkok'}',
          badge: 'Museums',
          description: '${trans.mustVisit[1].description}',
          imageLabel: 'national_museum_bangkok'
        },
        {
          title: '${trans.mustVisit[2].title || 'Siam Square'}',
          badge: 'City Center',
          description: '${trans.mustVisit[2].description}',
          imageLabel: 'siam_square'
        }
      ],
      dining: [
        {
          title: '${trans.dining[0].title || 'Jay Fai'}',
          badge: 'Street Food',
          description: '${trans.dining[0].description}',
          dietary: ['Seafood focus'],
          imageLabel: 'jay_fai'
        },
        {
          title: '${trans.dining[1].title || 'Or Tor Kor Market'}',
          badge: 'Local Market',
          description: '${trans.dining[1].description}',
          imageLabel: 'or_tor_kor'
        }
      ],
      otherExperiences: [
        {
          title: '${trans.otherExperiences[0].title || 'Jodd Fairs'}',
          badge: 'Night Market',
          description: '${trans.otherExperiences[0].description}',
          imageLabel: 'jodd_fairs'
        },
        {
          title: '${trans.otherExperiences[1].title || 'Chao Phraya Express Boat'}',
          badge: 'Public Transport',
          description: '${trans.otherExperiences[1].description}',
          imageLabel: 'chao_phraya_boat'
        }
      ],
      uniqueActivities: [
        {
          title: '${trans.uniqueActivities[0].title || 'Blue Elephant Cooking School'}',
          badge: 'Cooking Class',
          description: '${trans.uniqueActivities[0].description}',
          imageLabel: 'blue_elephant_cooking'
        },
        {
          title: '${trans.uniqueActivities[1].title || 'Hidden Bangkok Canal Tour'}',
          badge: 'Walking Tour',
          description: '${trans.uniqueActivities[1].description}',
          imageLabel: 'canal_tour'
        }
      ],
      hiddenGems: [
        {
          title: '${trans.hiddenGems[0].title || 'Wat Sam Phran'}',
          badge: 'Hidden Gem',
          description: '${trans.hiddenGems[0].description}',
          etiquette: '${trans.hiddenGems[0].etiquette}',
          imageLabel: 'wat_sam_phran'
        },
        {
          title: '${trans.hiddenGems[1].title || 'Baan Silapin (Artist House)'}',
          badge: 'Hidden Gem',
          description: '${trans.hiddenGems[1].description}',
          imageLabel: 'artist_house'
        }
      ]
    }
  }`;
        content = content.replace(originalLangBlock, `${lang}: [${newBangkokEntry}\n]`);
        return;
    }

    // Within langBlock, find bangkok entry
    const bangkokStart = langBlock.indexOf("id: 'bangkok'");
    if (bangkokStart === -1) return;
    
    let bangkokEnd = -1;
    braceCount = 0;
    for (let i = bangkokStart; i < langBlock.length; i++) {
        if (langBlock[i] === '{') braceCount++;
        if (langBlock[i] === '}') braceCount--;
        if (braceCount === 0 && langBlock[i] === '}') {
            bangkokEnd = i + 1;
            break;
        }
    }
    
    if (bangkokEnd === -1) return;
    
    let bangkokBlock = langBlock.substring(bangkokStart, bangkokEnd);
    let originalBangkokBlock = bangkokBlock;
    
    // For languages that already have some translations (Thai, Myanmar, Hebrew), we need to be more specific or aggressive.
    if (lang === 'thai') {
        bangkokBlock = bangkokBlock.replace(/overview: '.*'/, `overview: '${trans.overview}'`);
        bangkokBlock = bangkokBlock.replace(/description: 'พระราชวังที่สวยงามและเป็นที่ประดิษฐานของพระแก้วมรกต'/, `description: '${trans.mustVisit[0].description}'`);
        bangkokBlock = bangkokBlock.replace(/etiquette: 'แต่งกายสุภาพ: สวมกางเกงหรือกระโปรงยาวคลุมเข่า และเสื้อมีแขน'/, `etiquette: '${trans.mustVisit[0].etiquette}'`);
        bangkokBlock = bangkokBlock.replace(/description: 'พิพิธภัณฑ์ที่ใหญ่ที่สุดในเอเชียตะวันออกเฉียงใต้ รวบรวมประวัติศาสตร์ไทย'/, `description: '${trans.mustVisit[1].description}'`);
        bangkokBlock = bangkokBlock.replace(/description: 'ศูนย์กลางแฟชั่นและไลฟ์สไตล์ของวัยรุ่นกรุงเทพฯ'/, `description: '${trans.mustVisit[2].description}'`);
        bangkokBlock = bangkokBlock.replace(/description: 'ไข่เจียวปูชื่อดังระดับมิชลิน รังสรรค์โดยเชฟระดับตำนาน'/, `description: '${trans.dining[0].description}'`);
        bangkokBlock = bangkokBlock.replace(/description: 'ตลาดสดคุณภาพพรีเมียมที่รวบรวมผลผลิตทางการเกษตรที่ดีที่สุด'/, `description: '${trans.dining[1].description}'`);
        bangkokBlock = bangkokBlock.replace(/description: 'ตลาดนัดสุดชิคที่รวมอาหารสตรีทฟู้ดและแฟชั่นวินเทจไว้ในที่เดียว'/, `description: '${trans.otherExperiences[0].description}'`);
        bangkokBlock = bangkokBlock.replace(/description: 'สัมผัสวิถีชีวิตริมน้ำและเลี่ยงรถตู้ด้วยการนั่งเรือด่วน'/, `description: '${trans.otherExperiences[1].description}'`);
        bangkokBlock = bangkokBlock.replace(/description: 'เรียนรู้เคล็ดลับการทำอาหารไทยตำรับชาววังในบรรยากาศคลาสสิก'/, `description: '${trans.uniqueActivities[0].description}'`);
        bangkokBlock = bangkokBlock.replace(/description: 'สำรวจวิถีชีวิตริมคลองและบ้านไม้โบราณที่ยังหลงเหลืออยู่'/, `description: '${trans.uniqueActivities[1].description}'`);
        bangkokBlock = bangkokBlock.replace(/description: 'ตึกสีชมพูสูง 17 ชั้นที่มีมังกรยักษ์พันรอบตัวตึก'/, `description: '${trans.hiddenGems[0].description}'`);
        bangkokBlock = bangkokBlock.replace(/description: 'บ้านไม้เก่าแก่อายุกว่าร้อยปีที่กลายเป็นแกลเลอรีและโรงละครหุ่นละครเล็ก'/, `description: '${trans.hiddenGems[1].description}'`);
    } else if (lang === 'myanmar') {
        bangkokBlock = bangkokBlock.replace(/overview: '.*'/, `overview: '${trans.overview}'`);
        bangkokBlock = bangkokBlock.replace(/description: 'ထိုင်းဘုရင်များ၏ သမိုင်းဝင်နန်းတော်နှင့် မြရုပ်ပွားတော် ကိန်းဝပ်ရာနေရာ။'/, `description: '${trans.mustVisit[0].description}'`);
        bangkokBlock = bangkokBlock.replace(/etiquette: 'တင်းကြပ်သည်- ပုခုံးနှင့် ဒူးများကို ဖုံးအုပ်ထားရမည်။'/, `etiquette: '${trans.mustVisit[0].etiquette}'`);
    } else {
        // Now replace each English string if found (common for other languages that are empty and auto-populated)
        bangkokBlock = bangkokBlock.replace(/'The City of Angels, where ancient shrines meet ultra-modernity in a vibrant sensory landscape.'/, `'${trans.overview}'`);
        bangkokBlock = bangkokBlock.replace(/'The spectacular ceremonial home of Thai Kings and the Temple of the Emerald Buddha.'/, `'${trans.mustVisit[0].description}'`);
        bangkokBlock = bangkokBlock.replace(/'Strict: Shoulders and knees must be covered. No sandals without straps.'/, `'${trans.mustVisit[0].etiquette}'`);
        bangkokBlock = bangkokBlock.replace(/'The largest museum in Southeast Asia, showcasing Thai art and history.'/, `'${trans.mustVisit[1].description}'`);
        bangkokBlock = bangkokBlock.replace(/'The heartbeat of Bangkok youth culture and fashion.'/, `'${trans.mustVisit[2].description}'`);
        bangkokBlock = bangkokBlock.replace(/'World-famous Michelin-starred crab meat omelet cooked over charcoal.'/, `'${trans.dining[0].description}'`);
        bangkokBlock = bangkokBlock.replace(/'Upscale fresh market known for the highest quality agricultural products.'/, `'${trans.dining[1].description}'`);
        bangkokBlock = bangkokBlock.replace(/'A trendy night market popular for street food and vintage fashion.'/, `'${trans.otherExperiences[0].description}'`);
        bangkokBlock = bangkokBlock.replace(/'Experience the river life and beat the traffic like a local.'/, `'${trans.otherExperiences[1].description}'`);
        bangkokBlock = bangkokBlock.replace(/'Learn the secrets of Royal Thai cuisine in a historic setting.'/, `'${trans.uniqueActivities[0].description}'`);
        bangkokBlock = bangkokBlock.replace(/'Explore the quiet backwaters and traditional wooden houses.'/, `'${trans.uniqueActivities[1].description}'`);
        bangkokBlock = bangkokBlock.replace(/'A 17-story pink tower with a massive dragon spiraling around it.'/, `'${trans.hiddenGems[0].description}'`);
        bangkokBlock = bangkokBlock.replace(/'Quiet contemplation requested.'/, `'${trans.hiddenGems[0].etiquette}'`);
        bangkokBlock = bangkokBlock.replace(/'A century-old house turned into a gallery and puppet theater.'/, `'${trans.hiddenGems[1].description}'`);
    }

    // Replace the bangkokBlock in the content
    content = content.replace(originalBangkokBlock, bangkokBlock);
});

writeFileSync(filePath, content);
console.log('Successfully updated destinations.ts with Bangkok translations');
