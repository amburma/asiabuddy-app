export interface LawSection {
  title: string;
  content: string;
  points?: string[];
}

export const LAWS_DATA: Record<string, LawSection[]> = {
  EN: [
    {
      title: "1. Respect for the Monarchy (Lèse-majesté Law)",
      content: "In Thailand, criticizing or insulting the King and the Royal Family is a very serious criminal offense.",
      points: [
        "Section 112: Anyone who defames, insults, or threatens the King, the Queen, or the Heir-apparent can face 3 to 15 years of imprisonment per count.",
        "Caution: This law applies not only to verbal statements but also to writing or sharing content on social media (Facebook, Line, etc.).",
        "Currency: Since Thai Baht banknotes and coins bear the King’s image, never step on money to stop it from rolling."
      ]
    },
    {
      title: "2. 2026 Entry Regulations",
      content: "Essential entry requirements for every visitor to Thailand.",
      points: [
        "Digital Arrival Card (TDAC): Starting in 2026, all travelers must complete a Digital Arrival Card online within 72 hours before arriving in Thailand. Failure to do so may lead to airport delays or denial of entry.",
        "Proof of Funds: If requested by Immigration, travelers must be able to show possession of at least 20,000 Baht per person (or 40,000 Baht per family) or equivalent currency."
      ]
    },
    {
      title: "3. Smoking, Vaping, and Drugs",
      content: "Strict enforcement of substance and tobacco laws.",
      points: [
        "Vaping (Electronic Cigarettes): It is strictly illegal to import, possess, or use electronic cigarettes (vapes) and related equipment in Thailand. Tourists can be arrested, fined heavily, or sentenced to up to 10 years in prison.",
        "Narcotics: Laws regarding illegal drugs like methamphetamines and heroin carry extreme penalties, including the death penalty.",
        "Cannabis: Laws regarding cannabis change frequently. Currently, regulations have tightened to prioritize medical use only; smoking cannabis in public is a punishable offense."
      ]
    }
  ],
  TH: [
    {
      title: "1. การเคารพสถาบันพระมหากษัตริย์ (กฎหมายหมิ่นพระบรมเดชานุภาพ)",
      content: "ในประเทศไทย การวิพากษ์วิจารณ์หรือดูหมิ่นพระมหากษัตริย์และพระบรมวงศานุวงศ์เป็นความผิดทางอาญาร้ายแรง",
      points: [
        "มาตรา 112: ผู้ใดหมิ่นประมาท ดูหมิ่น หรือแสดงความอาฆาตมาดร้ายพระมหากษัตริย์ พระราชินี รัชทายาท อาจได้รับโทษจำคุก 3 ถึง 15 ปีต่อกระทง",
        "ข้อควรระวัง: กฎหมายนี้ไม่เพียงแต่ใช้กับถ้อยคำเท่านั้น แต่ยังรวมถึงการเขียนหรือแบ่งปันเนื้อหาบนโซเชียลมีเดีย (Facebook, Line ฯลฯ) ด้วย",
        "เงินตรา: เนื่องจากธนบัตรและเหรียญมีพระบรมฉายาลักษณ์ อย่าใช้เท้าเหยียบเงินเพื่อหยุดมันจากการกลิ้ง"
      ]
    },
    {
      title: "2. กฎระเบียบในการเข้าเมืองปี 2569",
      content: "ข้อกำหนดที่จำเป็นสำหรับการเข้าประเทศไทยสำหรับนักท่องเที่ยวทุกคน",
      points: [
        "Digital Arrival Card (TDAC): เริ่มในปี 2569 ผู้เดินทางทุกคนต้องลงทะเบียนออนไลน์ภายใน 72 ชั่วโมงก่อนถึงไทย หากไม่ดำเนินการอาจทำให้เกิดความล่าช้าหรือถูกปฏิเสธการเข้าเมือง",
        "หลักฐานการเงิน: หากเจ้าหน้าที่ตรวจคนเข้าเมืองร้องขอ ผู้เดินทางต้องสามารถแสดงหลักฐานการครอบครองเงินสดอย่างน้อย 20,000 บาทต่อคน (หรือ 40,000 บาทต่อครอบครัว)"
      ]
    },
    {
      title: "3. การสูบบุหรี่ การสูบบุหรี่ไฟฟ้า และยาเสพติด",
      content: "การบังคับใช้อย่างเคร่งครัดเกี่ยวกับสารเสพติดและยาสูบ",
      points: [
        "บุหรี่ไฟฟ้า: การนำเข้า ครอบครอง หรือใช้งานบุหรี่ไฟฟ้าถือเป็นเรื่องผิดกฎหมายอย่างเคร่งครัดในประเทศไทย นักท่องเที่ยวอาจถูกจับกุม ปรับหนัก หรือจำคุกสูงสุด 10 ปี",
        "ยาเสพติด: กฎหมายเกี่ยวกับยาเสพติดผิดกฎหมาย เช่น ยาบ้าและเฮโรอีน มีโทษสูงมาก รวมถึงโทษประหารชีวิต",
        "กัญชา: กฎระเบียบเปลี่ยนบ่อย ปัจจุบันเน้นเฉพาะเพื่อทางการแพทย์เท่านั้น การสูบในที่สาธารณะพิจารณาเป็นความผิด"
      ]
    }
  ],
  MM: [
    {
      title: "၁။ ဘုရင်စနစ်ကို လေးစားခြင်း (Lèse-majesté ဥပဒေ)",
      content: "ထိုင်းနိုင်ငံတွင် ဘုရင်နှင့် တော်ဝင်မိသားစုကို ဝေဖန်ခြင်း သို့မဟုတ် စော်ကားခြင်းသည် အလွန်ပြင်းထန်သော ရာဇဝတ်မှုဖြစ်သည်။",
      points: [
        "ပုဒ်မ ၁၁၂- ဘုရင်၊ မိဖုရား သို့မဟုတ် အမွေဆက်ခံသူကို အသရေဖျက်ခြင်း၊ စော်ကားခြင်း သို့မဟုတ် ခြိမ်းခြောက်ခြင်း ပြုလုပ်သူသည် ထောင်ဒဏ် ၃ နှစ်မှ ၁၅ နှစ်အထိ ကျခံရနိုင်သည်။",
        "သတိပေးချက်- ဤဥပဒေသည် နှုတ်ဖြင့်ပြောဆိုခြင်းသာမက လူမှုကွန်ရက် (Facebook, Line စသည်တို့) တွင် ရေးသားခြင်း သို့မဟုတ် မျှဝေခြင်းများတွင်လည်း အကျုံးဝင်ပါသည်။",
        "ငွေကြေး- ထိုင်းဘတ်ငွေများတွင် ဘုရင်၏ပုံပါရှိသောကြောင့် ပိုက်ဆံလိမ့်သွားလျှင် ခြေထောက်ဖြင့် နင်း၍ မတားရပါ။"
      ]
    },
    {
      title: "၂။ ၂၀၂၆ ခုနှစ် ပြည်ဝင်ခွင့်ဆိုင်ရာ စည်းမျဉ်းများ",
      content: "ထိုင်းနိုင်ငံသို့ လာရောက်လည်ပတ်သူတိုင်းအတွက် အခြေခံပြည်ဝင်ခွင့် လိုအပ်ချက်များ။",
      points: [
        "ဒီဂျစ်တယ် ဆိုက်ရောက်ကတ် (TDAC)- ၂၀၂၆ ခုနှစ်မှစ၍ ခရီးသွားအားလုံး ထိုင်းနိုင်ငံသို့ မရောက်မီ ၇၂ နာရီအတွင်း အွန်လိုင်းမှတစ်ဆင့် ဖြည့်စွက်ရပါမည်။",
        "ငွေကြေးပိုင်ဆိုင်မှုပြသခြင်း- လိုအပ်ပါက တစ်ဦးလျှင် ဘတ် ၂၀,၀၀၀ (သို့မဟုတ် တစ်မိသားစုလျှင် ဘတ် ၄၀,၀၀၀) ပြသနိုင်ရပါမည်။"
      ]
    },
    {
      title: "၃။ ဆေးလိပ်၊ ဗေ့ (Vaping) နှင့် မူးယစ်ဆေးဝါးများ",
      content: "မူးယစ်ဆေးဝါးနှင့် ဆေးလိပ်ဥပဒေများကို တင်းတင်းကျပ်ကျပ် ကျင့်သုံးခြင်း။",
      points: [
        "ဗေ့ (အီလက်ထရွန်နစ်ဆေးလိပ်)- ထိုင်းနိုင်ငံအတွင်း ယူဆောင်လာခြင်း၊ ပိုင်ဆိုင်ခြင်း သို့မဟုတ် အသုံးပြုခြင်းသည် လုံးဝတရားမဝင်ပါ။ ထောင်ဒဏ် ၁၀ နှစ်အထိ ကျခံရနိုင်သည်။",
        "မူးယစ်ဆေးဝါး- ပြင်းထန်သော ပြစ်ဒဏ်များရှိပြီး သေဒဏ်အထိ ကျခံရနိုင်သည်။",
        "ကန်နဘစ် (Cannabis)- ဆေးဘက်ဆိုင်ရာ အသုံးပြုမှုအတွက်သာ ခွင့်ပြုထားပြီး လူမြင်ကွင်းတွင် သုံးစွဲခြင်းမှာ ပြစ်မှုဖြစ်သည်။"
      ]
    }
  ],
  ES: [
    {
      title: "1. Respeto a la Monarquía (Ley de Lesa Majestad)",
      content: "En Tailandia, criticar o insultar al Rey y a la Familia Real es un delito penal muy grave.",
      points: [
        "Artículo 112: Cualquier persona que difame, insulte o amenace al Rey, la Reina o el Heredero puede enfrentar de 3 a 15 años de prisión por cada cargo.",
        "Precaución: Esta ley se aplica no solo a declaraciones verbales, sino también a lo escrito o compartido en redes sociales.",
        "Moneda: Como los billetes y monedas llevan la imagen del Rey, nunca pise dinero para evitar que ruede."
      ]
    },
    {
      title: "2. Regulaciones de entrada 2026",
      content: "Requisitos esenciales de entrada para cada visitante a Tailandia.",
      points: [
        "Tarjeta de llegada digital (TDAC): A partir de 2026, todos los viajeros deben completar una TDAC en línea dentro de las 72 horas antes de llegar. No hacerlo puede provocar retrasos o denegación de entrada.",
        "Prueba de fondos: Si se solicita, los viajeros deben mostrar posesión de al menos 20,000 Baht por persona (o 40,000 Baht por familia)."
      ]
    },
    {
      title: "3. Tabaco, vapeo y drogas",
      content: "Aplicación estricta de las leyes sobre sustancias y tabaco.",
      points: [
        "Vapeo (cigarrillos electrónicos): Es estrictamente ilegal importar, poseer o usar vapes. Los turistas pueden ser arrestados, multados o sentenciados a hasta 10 años de prisión.",
        "Narcóticos: Las leyes sobre drogas conllevan penas extremas, incluida la pena de muerte.",
        "Cannabis: Las regulaciones han cambiado para priorizar solo el uso médico; fumar cannabis en público es un delito punible."
      ]
    }
  ],
  FR: [
    {
      title: "1. Respect de la monarchie (loi de lèse-majesté)",
      content: "En Thaïlande, critiquer ou insulter le Roi et la Famille Royale est une infraction pénale très grave.",
      points: [
        "Article 112 : Toute personne qui diffame, insulte ou menace le Roi ou la Reine peut encourir de 3 à 15 ans de prison par chef d'accusation.",
        "Attention : Cette loi s'applique aux déclarations verbales mais aussi au contenu partagé sur les réseaux sociaux.",
        "Monnaie : Comme les billets portent l'image du Roi, ne marchez jamais sur l'argent pour l'empêcher de rouler."
      ]
    },
    {
      title: "2. Réglementation d'entrée 2026",
      content: "Conditions d'entrée essentielles pour chaque visiteur en Thaïlande.",
      points: [
        "Carte d'arrivée numérique (TDAC) : À partir de 2026, tous les voyageurs doivent la remplir en ligne 72h avant l'arrivée. Le non-respect peut entraîner un refus d'entrée.",
        "Preuve de fonds : Sur demande, les voyageurs doivent justifier de 20 000 Bahts par personne (ou 40 000 par famille)."
      ]
    },
    {
      title: "3. Tabac, vapotage et drogues",
      content: "Application stricte des lois sur les substances et le tabac.",
      points: [
        "Vapotage : Il est strictement illégal d'importer ou de posséder des cigarettes électroniques. Les peines peuvent aller jusqu'à 10 ans de prison.",
        "Stupéfiants : Les lois sur les drogues illégales prévoient des peines extrêmes, y compris la peine de mort.",
        "Cannabis : Les réglementations privilégient désormais l'usage médical uniquement ; fumer en public est passible de sanctions."
      ]
    }
  ],
  DE: [
    {
      title: "1. Respekt vor der Monarchie (Lèse-majesté-Gesetz)",
      content: "In Thailand ist die Kritik oder Beleidigung des Königs und der königlichen Familie eine sehr schwere Straftat.",
      points: [
        "Paragraph 112: Jeder, der den König, die Königin oder den Thronfolger diffamiert oder beleidigt, muss mit 3 bis 15 Jahren Haft rechnen.",
        "Achtung: Dies gilt auch für das Schreiben oder Teilen von Inhalten in sozialen Medien.",
        "Währung: Da thailändisches Geld das Bild des Königs trägt, treten Sie niemals darauf, um es am Wegrollen zu hindern."
      ]
    },
    {
      title: "2. Einreisebestimmungen 2026",
      content: "Wichtige Einreisebestimmungen für jeden Besucher Thailands.",
      points: [
        "Digitale Ankunftskarte (TDAC): Ab 2026 müssen alle Reisenden innerhalb von 72 Stunden vor der Ankunft online eine TDAC ausfüllen.",
        "Finanznachweis: Auf Verlangen muss der Besitz von mindestens 20.000 Baht pro Person (oder 40.000 Baht pro Familie) nachgewiesen werden."
      ]
    },
    {
      title: "3. Rauchen, Dampfen und Drogen",
      content: "Strikte Durchsetzung der Suchtmittel- und Tabakgesetze.",
      points: [
        "Vaping (E-Zigaretten): Die Einfuhr, der Besitz oder die Verwendung von E-Zigaretten ist streng illegal. Strafen von bis zu 10 Jahren Haft sind möglich.",
        "Betäubungsmittel: Drogenbesitz führt zu extremen Strafen, einschließlich der Todesstrafe.",
        "Cannabis: Die Vorschriften wurden verschärft und priorisieren nur noch die medizinische Verwendung."
      ]
    }
  ]
};

export const LAWS_PRO_TIP: Record<string, string> = {
  EN: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  TH: "ขณะอยู่ในประเทศไทย สิ่งสำคัญคือต้องเก็บสำเนาหนังสือเดินทางและวีซ่าของคุณ หรือบันทึกภาพถ่ายที่ชัดเจนไว้ในโทรศัพท์ของคุณ คุณต้องสามารถแสดงเอกสารเหล่านี้ได้หากเจ้าหน้าที่รักษาความปลอดภัยหรือตำรวจเรียกตรวจ",
  MM: "ထိုင်းနိုင်ငံသို့ရောက်ရှိနေစဉ် သင်၏ပတ်စပို့နှင့်ဗီဇာမိတ္တူများကို သိမ်းဆည်းထားရန် သို့မဟုတ် သင့်ဖုန်းတွင် ဓာတ်ပုံများကို သိမ်းဆည်းထားရန် အရေးကြီးပါသည်။ လုံခြုံရေး သို့မဟုတ် ရဲအရာရှိများက တောင်းဆိုပါက ၎င်းတို့ကို ပြသနိုင်ရပါမည်။",
  ES: "Mientras esté en Tailandia, es crucial guardar copias de su pasaporte y visa o guardar fotos claras de ellos en su teléfono. Debe poder presentarlos si lo solicitan los oficiales.",
  FR: "Pendant votre séjour en Thaïlande, il est crucial de conserver des copies de votre passeport et de votre visa sur votre téléphone. Vous devez être en mesure de les présenter sur demande.",
  DE: "In Thailand ist es wichtig, Kopien Ihres Reisepasses und Visums auf Ihrem Telefon zu speichern. Sie müssen diese auf Verlangen von Beamten vorzeigen können."
};
