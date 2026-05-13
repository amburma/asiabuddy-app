
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
  EN: [
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
  TH: [
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
  ES: [
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
  ],
  FR: [
    {
      title: "Salutations et l'essentiel",
      phrases: [
        { thai: "สวัสดี", pronunciation: "Sawasdee", english: "Bonjour / Au revoir", audioKey: "sawasdee" },
        { thai: "ขอบคุณ", pronunciation: "Khop Khun", english: "Merci", audioKey: "khop-khun" },
        { thai: "ขอโทษ", pronunciation: "Kho Tot", english: "Excusez-moi / Désolé", audioKey: "kho-tot" },
        { thai: "ใช่", pronunciation: "Chai", english: "Oui", audioKey: "chai" },
        { thai: "ไม่", pronunciation: "Mai", english: "Non", audioKey: "mai" }
      ]
    },
    {
      title: "Se déplacer et commander",
      phrases: [
        { thai: "เท่าไหร่?", pronunciation: "Tao Rai", english: "Combien ça coûte ?", audioKey: "tao-rai" },
        { thai: "ลดได้ไหม?", pronunciation: "Lot Dai Mai", english: "Pouvez-vous me faire une réduction ?", audioKey: "lot-dai-mai" },
        { thai: "ห้องน้ำอยู่ที่ไหน?", pronunciation: "Hong Nam Yu Tee Nai?", english: "Où sont les toilettes ?", audioKey: "hong-nam" },
        { thai: "ไม่เผ็ด", pronunciation: "Mai Phet", english: "Pas épicé", audioKey: "mai-phet" },
        { thai: "อร่อย", pronunciation: "A-roi", english: "Délicieux", audioKey: "a-roi" }
      ]
    },
    {
      title: "Mots-clés essentiels",
      phrases: [
        { thai: "เช็คบิล", pronunciation: "Check bin", english: "L'addition, s'il vous plaît", audioKey: "check-bin" },
        { thai: "น้ำเปล่า", pronunciation: "Nam-plao", english: "Eau", audioKey: "nam-plao" },
        { thai: "พูดไทยไม่ได้", pronunciation: "Poot Thai mai dai", english: "Je ne parle pas thaï", audioKey: "poot-thai-mai-dai" }
      ]
    }
  ],
  DE: [
    {
      title: "Begrüßung & Grundlagen",
      phrases: [
        { thai: "สวัสดี", pronunciation: "Sawasdee", english: "Hallo / Auf Wiedersehen", audioKey: "sawasdee" },
        { thai: "ขอบคุณ", pronunciation: "Khop Khun", english: "Danke", audioKey: "khop-khun" },
        { thai: "ขอโทษ", pronunciation: "Kho Tot", english: "Entschuldigung / Verzeihung", audioKey: "kho-tot" },
        { thai: "ใช่", pronunciation: "Chai", english: "Ja", audioKey: "chai" },
        { thai: "ไม่", pronunciation: "Mai", english: "Nein", audioKey: "mai" }
      ]
    },
    {
      title: "Unterwegs & Bestellen",
      phrases: [
        { thai: "เท่าไหร่?", pronunciation: "Tao Rai", english: "Wie viel kostet das?", audioKey: "tao-rai" },
        { thai: "ลดได้ไหม?", pronunciation: "Lot Dai Mai", english: "Können Sie einen Rabatt geben?", audioKey: "lot-dai-mai" },
        { thai: "ห้องน้ำอยู่ที่ไหน?", pronunciation: "Hong Nam Yu Tee Nai?", english: "Wo ist die Toilette?", audioKey: "hong-nam" },
        { thai: "ไม่เผ็ด", pronunciation: "Mai Phet", english: "Nicht scharf", audioKey: "mai-phet" },
        { thai: "อร่อย", pronunciation: "A-roi", english: "Lecker", audioKey: "a-roi" }
      ]
    },
    {
      title: "Wichtige Schlagworte",
      phrases: [
        { thai: "เช็คบิล", pronunciation: "Check bin", english: "Die Rechnung bitte", audioKey: "check-bin" },
        { thai: "น้ำเปล่า", pronunciation: "Nam-plao", english: "Wasser", audioKey: "nam-plao" },
        { thai: "พูดไทยไม่ได้", pronunciation: "Poot Thai mai dai", english: "Ich spreche kein Thai", audioKey: "poot-thai-mai-dai" }
      ]
    }
  ],
  MM: [
    {
      title: "နှုတ်ဆက်ခြင်းနှင့် အခြေခံများ",
      phrases: [
        { thai: "สวัสดี", pronunciation: "Sawasdee", english: "မင်္ဂลาပါ / နှုတ်ဆက်ပါတယ်", audioKey: "sawasdee" },
        { thai: "ขอบคุณ", pronunciation: "Khop Khun", english: "ကျေးဇူးတင်ပါတယ်", audioKey: "khop-khun" },
        { thai: "ขอโทษ", pronunciation: "Kho Tot", english: "တစ်ဆိတ်လောက် / တောင်းပန်ပါတယ်", audioKey: "kho-tot" },
        { thai: "ใช่", pronunciation: "Chai", english: "ဟုတ်ကဲ့", audioKey: "chai" },
        { thai: "ไม่", pronunciation: "Mai", english: "မဟုတ်ပါဘူး", audioKey: "mai" }
      ]
    },
    {
      title: "သွားလာရေးနှင့် မှာယူခြင်း",
      phrases: [
        { thai: "เท่าไหร่?", pronunciation: "Tao Rai", english: "ဘယ်လောက်လဲ?", audioKey: "tao-rai" },
        { thai: "ลดได้ไหม?", pronunciation: "Lot Dai Mai", english: "စျေးလျှော့ပေးလို့ရမလား?", audioKey: "lot-dai-mai" },
        { thai: "ห้องน้ำอยู่ที่ไหน?", pronunciation: "Hong Nam Yu Tee Nai?", english: "အိမ်သာ ဘယ်မှာလဲ?", audioKey: "hong-nam" },
        { thai: "ไม่เผ็ด", pronunciation: "Mai Phet", english: "မစပ်ဘူး", audioKey: "mai-phet" },
        { thai: "อร่อย", pronunciation: "A-roi", english: "စားလို့ကောင်းတယ်", audioKey: "a-roi" }
      ]
    },
    {
      title: "အရေးကြီးသော သော့ချက်စာလုံးများ",
      phrases: [
        { thai: "เช็คบิล", pronunciation: "Check bin", english: "ရှင်းမယ်", audioKey: "check-bin" },
        { thai: "น้ำเปล่า", pronunciation: "Nam-plao", english: "ရေ", audioKey: "nam-plao" },
        { thai: "พูดไทยไม่ได้", pronunciation: "Poot Thai mai dai", english: "ထိုင်းစကား မပြောတတ်ပါဘူး", audioKey: "poot-thai-mai-dai" }
      ]
    }
  ]
};

export const TRAVELER_TIPS: Record<string, {title: string, content: string}[]> = {
  EN: [
    { title: "The Wai", content: "When saying 'Sawasdee,' it is customary to press your palms together in a prayer-like gesture at chest level and bow slightly." },
    { title: "Market Strategy", content: "When asking for a discount, doing so with a smile usually yields much better results!" },
    { title: "Spiciness", content: "Even if you say 'Mai Phet' (not spicy), Thai food can still have a little kick. If you want zero spice, you can say 'Mai sai prik' (Don't put in chilies)." }
  ],
  TH: [
    { title: "การไหว้", content: "เมื่อพูด 'สวัสดี' ควรพนมมือไว้ที่หน้าอกแล้วก้มหัวเล็กน้อย" },
    { title: "กลยุทธ์ในตลาด", content: "เมื่อขอส่วนลด การทำด้วยรอยยิ้มมักจะได้ผลดีกว่าเสมอ!" },
    { title: "ความเผ็ด", content: "แม้ว่าจะพูด 'ไม่เผ็ด' อาหารไทยก็อาจจะยังเผ็ดเล็กน้อย หากไม่ต้องการเผ็ดเลย ให้พูดว่า 'ไม่ใส่พริก'" }
  ],
  ES: [
    { title: "El Wai", content: "Al decir 'Sawasdee', es costumbre juntar las palmas de las manos a la altura del pecho e inclinarse ligeramente." },
    { title: "Estrategia de Mercado", content: "¡Pedir un descuento con una sonrisa suele dar mejores resultados!" },
    { title: "Picante", content: "Incluso si dices 'Mai Phet' (no picante), la comida tailandesa puede picar un poco. Si quieres cero picante, di 'Mai sai prik'." }
  ],
  FR: [
    { title: "Le Wai", content: "En disant 'Sawasdee', il est d'usage de presser les paumes de vos mains l'une contre l'autre dans un geste de prière au niveau de la poitrine et de s'incliner légèrement." },
    { title: "Stratégie de Marché", content: "Demander une réduction avec un sourire donne généralement de bien meilleurs résultats !" },
    { title: "Épices", content: "Même si vous dites 'Mai Phet' (pas épicé), la cuisine thaïlandaise peut encore avoir un petit piquant. Si vous voulez zéro épice, vous pouvez dire 'Mai sai prik' (Ne mettez pas de piments)." }
  ],
  DE: [
    { title: "Das Wai", content: "Wenn Sie 'Sawasdee' sagen, ist es üblich, die Handflächen in einer gebetsähnlichen Geste auf Brusthöhe zusammenzulegen und sich leicht zu verbeugen." },
    { title: "Marktstrategie", content: "Wenn Sie um einen Rabatt bitten, führt dies mit einem Lächeln normalerweise zu viel besseren Ergebnissen!" },
    { title: "Schärfe", content: "Selbst wenn Sie 'Mai Phet' (nicht scharf) sagen, kann thailändisches Essen noch eine gewisse Schärfe haben. Wenn Sie gar keine Schärfe wollen, können Sie 'Mai sai prik' (keine Chilis hinzufügen) sagen." }
  ],
  MM: [
    { title: "ဝေ (Wai)", content: "'Sawasdee' လို့ပြောတဲ့အခါ ရင်ဘတ်မှာ လက်အုပ်ချီပြီး အနည်းငယ် ဦးညွှတ်တာက ထုံးစံပါ။" },
    { title: "စျေးဝယ်ခြင်း", content: "အပြုံးလေးနဲ့ စျေးလျှော့ခိုင်းရင် အမြဲတမ်း ပိုကောင်းတဲ့ရလဒ်တွေ ရတတ်ပါတယ်။" },
    { title: "အစပ်", content: "'Mai Phet' (မစပ်ဘူး) လို့ပြောပေမယ့် ထိုင်းအစားအစာတွေက နည်းနည်း စပ်နေနိုင်ပါတယ်။ လုံးဝမစပ်စေချင်ရင် 'Mai sai prik' (ငရုတ်သီးမထည့်ပါနဲ့) လို့ ပြောနိုင်ပါတယ်။" }
  ]
};
