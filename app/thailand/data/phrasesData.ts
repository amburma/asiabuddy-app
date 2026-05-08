
export interface Phrase {
  thai: string;
  pronunciation: string;
  english: string;
  audioKey: string;
}

export interface PhraseCategory {
  title: string;
  phrases: Phrase[];
}

export const ESSENTIAL_PHRASES: Record<string, PhraseCategory[]> = {
  english: [
    {
      title: "Greetings & Basics",
      phrases: [
        { thai: "สวัสดี", pronunciation: "Sawasdee", english: "Hello / Goodbye", audioKey: "sawasdee" },
        { thai: "ขอบคุณ", pronunciation: "Khop Khun", english: "Thank you", audioKey: "khop-khun" },
        { thai: "ขอโทษ", pronunciation: "Kho Tot", english: "Excuse me / Sorry", audioKey: "kho-tot" },
        { thai: "ใช่", pronunciation: "Chai", english: "Yes", audioKey: "chai" },
        { thai: "ไม่", pronunciation: "Mai", english: "No", audioKey: "mai" }
      ]
    },
    {
      title: "Getting Around & Ordering",
      phrases: [
        { thai: "เท่าไหร่?", pronunciation: "Tao Rai", english: "How much is this?", audioKey: "tao-rai" },
        { thai: "ลดได้ไหม?", pronunciation: "Lot Dai Mai", english: "Can you give a discount?", audioKey: "lot-dai-mai" },
        { thai: "ห้องน้ำอยู่ที่ไหน?", pronunciation: "Hong Nam Yu Tee Nai?", english: "Where is the bathroom?", audioKey: "hong-nam" },
        { thai: "ไม่เผ็ด", pronunciation: "Mai Phet", english: "Not spicy", audioKey: "mai-phet" },
        { thai: "อร่อย", pronunciation: "A-roi", english: "Delicious", audioKey: "a-roi" }
      ]
    },
    {
      title: "Essential Keywords",
      phrases: [
        { thai: "เช็คบิล", pronunciation: "Check bin", english: "Check, please", audioKey: "check-bin" },
        { thai: "น้ำเปล่า", pronunciation: "Nam-plao", english: "Water", audioKey: "nam-plao" },
        { thai: "พูดไทยไม่ได้", pronunciation: "Poot Thai mai dai", english: "I can't speak Thai", audioKey: "poot-thai-mai-dai" }
      ]
    }
  ],
  thai: [
    {
      title: "คำทักทายและพื้นฐาน",
      phrases: [
        { thai: "สวัสดี", pronunciation: "Sawasdee", english: "สวัสดี / ลาจาก", audioKey: "sawasdee" },
        { thai: "ขอบคุณ", pronunciation: "Khop Khun", english: "ขอบคุณ", audioKey: "khop-khun" },
        { thai: "ขอโทษ", pronunciation: "Kho Tot", english: "ขอโทษ", audioKey: "kho-tot" },
        { thai: "ใช่", pronunciation: "Chai", english: "ใช่", audioKey: "chai" },
        { thai: "ไม่", pronunciation: "Mai", english: "ไม่ใช่/ไม่", audioKey: "mai" }
      ]
    },
    {
      title: "การเดินทางและสั่งอาหาร",
      phrases: [
        { thai: "เท่าไหร่?", pronunciation: "Tao Rai", english: "ราคาเท่าไหร่?", audioKey: "tao-rai" },
        { thai: "ลดได้ไหม?", pronunciation: "Lot Dai Mai", english: "ลดราคาได้ไหม?", audioKey: "lot-dai-mai" },
        { thai: "ห้องน้ำอยู่ที่ไหน?", pronunciation: "Hong Nam Yu Tee Nai?", english: "ห้องน้ำอยู่ที่ไหน?", audioKey: "hong-nam" },
        { thai: "ไม่เผ็ด", pronunciation: "Mai Phet", english: "ไม่เผ็ด", audioKey: "mai-phet" },
        { thai: "อร่อย", pronunciation: "A-roi", english: "อร่อย", audioKey: "a-roi" }
      ]
    },
    {
      title: "คำสำคัญที่จำเป็น",
      phrases: [
        { thai: "เช็คบิล", pronunciation: "Check bin", english: "เก็บเงินด้วย", audioKey: "check-bin" },
        { thai: "น้ำเปล่า", pronunciation: "Nam-plao", english: "น้ำเปล่า", audioKey: "nam-plao" },
        { thai: "พูดไทยไม่ได้", pronunciation: "Poot Thai mai dai", english: "พูดไทยไม่ได้", audioKey: "poot-thai-mai-dai" }
      ]
    }
  ],
  spanish: [
    {
      title: "Saludos y Básicos",
      phrases: [
        { thai: "สวัสดี", pronunciation: "Sawasdee", english: "Hola / Adiós", audioKey: "sawasdee" },
        { thai: "ขอบคุณ", pronunciation: "Khop Khun", english: "Gracias", audioKey: "khop-khun" },
        { thai: "ขอโทษ", pronunciation: "Kho Tot", english: "Disculpe / Lo siento", audioKey: "kho-tot" },
        { thai: "ใช่", pronunciation: "Chai", english: "Sí", audioKey: "chai" },
        { thai: "ไม่", pronunciation: "Mai", english: "No", audioKey: "mai" }
      ]
    },
    {
      title: "Moverse y Pedir",
      phrases: [
        { thai: "เท่าไหร่?", pronunciation: "Tao Rai", english: "¿Cuánto cuesta?", audioKey: "tao-rai" },
        { thai: "ลดได้ไหม?", pronunciation: "Lot Dai Mai", english: "¿Me da un descuento?", audioKey: "lot-dai-mai" },
        { thai: "ห้องน้ำอยู่ที่ไหน?", pronunciation: "Hong Nam Yu Tee Nai?", english: "¿Dónde está el baño?", audioKey: "hong-nam" },
        { thai: "ไม่เผ็ด", pronunciation: "Mai Phet", english: "No picante", audioKey: "mai-phet" },
        { thai: "อร่อย", pronunciation: "A-roi", english: "Delicioso", audioKey: "a-roi" }
      ]
    },
    {
      title: "Palabras Clave",
      phrases: [
        { thai: "เช็คบิล", pronunciation: "Check bin", english: "La cuenta, por favor", audioKey: "check-bin" },
        { thai: "น้ำเปล่า", pronunciation: "Nam-plao", english: "Agua", audioKey: "nam-plao" },
        { thai: "พูดไทยไม่ได้", pronunciation: "Poot Thai mai dai", english: "No hablo tailandés", audioKey: "poot-thai-mai-dai" }
      ]
    }
  ]
};

export const TRAVELER_TIPS: Record<string, {title: string, content: string}[]> = {
  english: [
    { title: "The Wai", content: "When saying 'Sawasdee,' it is customary to press your palms together in a prayer-like gesture at chest level and bow slightly." },
    { title: "Market Strategy", content: "When asking for a discount, doing so with a smile usually yields much better results!" },
    { title: "Spiciness", content: "Even if you say 'Mai Phet' (not spicy), Thai food can still have a little kick. If you want zero spice, you can say 'Mai sai prik' (Don't put in chilies)." }
  ],
  thai: [
    { title: "การไหว้", content: "เมื่อพูด 'สวัสดี' ควรพนมมือไว้ที่หน้าอกแล้วก้มหัวเล็กน้อย" },
    { title: "กลยุทธ์ในตลาด", content: "เมื่อขอส่วนลด การทำด้วยรอยยิ้มมักจะได้ผลดีกว่าเสมอ!" },
    { title: "ความเผ็ด", content: "แม้ว่าจะพูด 'ไม่เผ็ด' อาหารไทยก็อาจจะยังเผ็ดเล็กน้อย หากไม่ต้องการเผ็ดเลย ให้พูดว่า 'ไม่ใส่พริก'" }
  ],
  spanish: [
    { title: "El Wai", content: "Al decir 'Sawasdee', es costumbre juntar las palmas de las manos a la altura del pecho e inclinarse ligeramente." },
    { title: "Estrategia de Mercado", content: "¡Pedir un descuento con una sonrisa suele dar mejores resultados!" },
    { title: "Picante", content: "Incluso si dices 'Mai Phet' (no picante), la comida tailandesa puede picar un poco. Si quieres cero picante, di 'Mai sai prik'." }
  ],
  french: [
    { title: "Le Wai", content: "En disant 'Sawasdee', il est d'usage de presser les paumes de vos mains l'une contre l'autre dans un geste de prière au niveau de la poitrine et de s'incliner légèrement." },
    { title: "Stratégie de Marché", content: "Demander une réduction avec un sourire donne généralement de bien meilleurs résultats !" },
    { title: "Épices", content: "Même si vous dites 'Mai Phet' (pas épicé), la cuisine thaïlandaise peut encore avoir un petit piquant. Si vous voulez zéro épice, vous pouvez dire 'Mai sai prik' (Ne mettez pas de piments)." }
  ],
  russian: [
    { title: "Вай", content: "Говоря «Савасди», принято прижимать ладони друг к другу в молитвенном жесте на уровне груди и слегка кланяться." },
    { title: "Рыночная стратегия", content: "Просьба о скидке с улыбкой обычно дает гораздо лучшие результаты!" },
    { title: "Острота", content: "Даже если вы скажете «Май Пхет» (не остро), тайская еда все равно может быть немного острой. Если вы хотите вообще без специй, вы можете сказать «Май сай прик» (Не кладите чили)." }
  ],
  chinese: [
    { title: "合十礼 (Wai)", content: "说“Sawasdee”时，习惯上将手掌合拢在胸前做祈祷状，并微微鞠躬。" },
    { title: "市场策略", content: "带著微笑要求打折通常会产生更好的效果！" },
    { title: "辣度", content: "即使你说“Mai Phet”（不辣），泰国菜可能仍然有一点辣味。如果你想要完全不辣，你可以说“Mai sai prik”（不要放辣椒）。" }
  ],
  japanese: [
    { title: "ワイ (Wai)", content: "「サワッディー」と言うときは、胸の高さで両手を合わせ、軽くお辞儀をするのが習慣です。" },
    { title: "市場での戦略", content: "笑顔で値引きをお願いすると、通常はずっと良い結果が得られます！" },
    { title: "辛さ", content: "「マイ・ペット」（辛くない）と言っても、タイ料理には少し辛味がある場合があります。全く辛くないのがいい場合は、「マイ・サイ・プリック」（唐辛子を入れないで）と言ってください。" }
  ],
  korean: [
    { title: "와이 (Wai)", content: "'사왓디'라고 말할 때, 가슴 높이에서 두 손바닥을 합장하고 가볍게 고개를 숙이는 것이 관례입니다." },
    { title: "시장 전략", content: "미소를 지으며 할인을 요청하면 대개 훨씬 더 좋은 결과를 얻을 수 있습니다!" },
    { title: "맵기", content: "'마이 펫'(안 맵게)이라고 말해도 태국 음식은 여전히 약간 매울 수 있습니다. 완전히 안 맵게 원하신다면 '마이 사이 프릭'(고추 넣지 마세요)이라고 하시면 됩니다." }
  ],
  myanmar: [
    { title: "ဝေ (Wai)", content: "'Sawasdee' လို့ပြောတဲ့အခါ ရင်ဘတ်မှာ လက်အုပ်ချီပြီး အနည်းငယ် ဦးညွှတ်တာက ထုံးစံပါ။" },
    { title: "စျေးဝယ်ခြင်း", content: "အပြုံးလေးနဲ့ စျေးလျှော့ခိုင်းရင် အမြဲတမ်း ပိုကောင်းတဲ့ရလဒ်တွေ ရတတ်ပါတယ်။" },
    { title: "အစပ်", content: "'Mai Phet' (မစပ်ဘူး) လို့ပြောပေမယ့် ထိုင်းအစားအစာတွေက နည်းနည်း စပ်နေနိုင်ပါတယ်။ လုံးဝမစပ်စေချင်ရင် 'Mai sai prik' (ငရုတ်သီးမထည့်ပါနဲ့) လို့ ပြောနိုင်ပါတယ်။" }
  ]
};
