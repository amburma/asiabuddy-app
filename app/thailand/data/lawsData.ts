export interface LawSection {
  title: string;
  content: string;
  points?: string[];
}

export const LAWS_DATA: Record<string, LawSection[]> = {
  EN: [
  {
    "title": "1. Respect for the Monarchy (Lèse-majesté Law)",
    "content": "In Thailand, criticizing or insulting the King and the Royal Family is a very serious criminal offense.",
    "points": [
      "Section 112: Anyone who defames, insults, or threatens the King, the Queen, or the Heir-apparent can face 3 to 15 years of imprisonment per count.",
      "Caution: This law applies not only to verbal statements but also to writing or sharing content on social media (Facebook, Line, etc.).",
      "Currency: Since Thai Baht banknotes and coins bear the King’s image, never step on money to stop it from rolling."
    ]
  },
  {
    "title": "2. 2026 Entry Regulations",
    "content": "Essential entry requirements for every visitor to Thailand.",
    "points": [
      "Digital Arrival Card (TDAC): Starting in 2026, all travelers must complete a Digital Arrival Card online within 72 hours before arriving in Thailand. Failure to do so may lead to airport delays or denial of entry.",
      "Proof of Funds: If requested by Immigration, travelers must be able to show possession of at least 20,000 Baht per person (or 40,000 Baht per family) or equivalent currency."
    ]
  },
  {
    "title": "3. Smoking, Vaping, and Drugs",
    "content": "Strict enforcement of substance and tobacco laws.",
    "points": [
      "Vaping (Electronic Cigarettes): It is strictly illegal to import, possess, or use electronic cigarettes (vapes) and related equipment in Thailand. Tourists can be arrested, fined heavily, or sentenced to up to 10 years in prison.",
      "Narcotics: Laws regarding illegal drugs like methamphetamines and heroin carry extreme penalties, including the death penalty.",
      "Cannabis: Laws regarding cannabis change frequently. Currently, regulations have tightened to prioritize medical use only; smoking cannabis in public is a punishable offense."
    ]
  }
],
  TH: [
  {
    "title": "1. การเคารพสถาบันพระมหากษัตริย์ (กฎหมายหมิ่นประมาทพระมหากษัตริย์)",
    "content": "ในประเทศไทย การวิพากษ์วิจารณ์หรือดูหมิ่นพระมหากษัตริย์และพระบรมวงศานุวงศ์เป็นความผิดทางอาญาร้ายแรง",
    "points": [
      "มาตรา 112: ผู้ใดหมิ่นประมาท ดูหมิ่น หรือแสดงความอาฆาตมาดร้ายพระมหากษัตริย์ พระราชินี รัชทายาท อาจได้รับโทษจำคุก 3 ถึง 15 ปีต่อกระทง",
      "ข้อควรระวัง: กฎหมายนี้ไม่เพียงแต่ใช้กับถ้อยคำเท่านั้น แต่ยังรวมถึงการเขียนหรือแบ่งปันเนื้อหาบนโซเชียลมีเดียด้วย",
      "เงินตรา: เนื่องจากธนบัตรและเหรียญมีพระบรมฉายาลักษณ์ อย่าใช้เท้าเหยียบเงิน"
    ]
  },
  {
    "title": "2. กฎระเบียบในการเข้าเมืองปี 2569",
    "content": "ข้อกำหนดที่จำเป็นสำหรับการเข้าประเทศไทย",
    "points": [
      "Digital Arrival Card (TDAC): เริ่มในปี 2569 ผู้เดินทางทุกคนต้องลงทะเบียนออนไลน์ภายใน 72 ชั่วโมงก่อนถึงไทย หากไม่ดำเนินการอาจทำให้เกิดความล่าช้าหรือถูกปฏิเสธการเข้าเมือง",
      "หลักฐานการเงิน: เจ้าหน้าที่อาจขอดูเงินสดขั้นต่ำ 20,000 บาทต่อคน (หรือ 40,000 บาทต่อครอบครัว)"
    ]
  },
  {
    "title": "3. การสูบบุหรี่ การสูบบุหรี่ไฟฟ้า และยาเสพติด",
    "content": "การบังคับใช้อย่างเคร่งครัดเกี่ยวกับสารเสพติดและยาสูบ",
    "points": [
      "บุหรี่ไฟฟ้า: การนำเข้า ครอบครอง หรือใช้งานบุหรี่ไฟฟ้าถือเป็นเรื่องผิดกฎหมายอย่างร้ายแรง นักท่องเที่ยวอาจถูกจับกุม ปรับหนัก หรือจำคุกสูงสุด 10 ปี",
      "ยาเสพติด: ยาเสพติดให้โทษร้ายแรงมีโทษสูงสุดถึงประหารชีวิต",
      "กัญชา: กฎระเบียบมีความเข้มงวดมากขึ้น โดยเน้นการใช้เพื่อทางการแพทย์เท่านั้น การสูบในที่สาธารณะมีความผิด"
    ]
  }
],
  MM: [
  {
    "title": "၁။ ဘုရင်စနစ်ကို လေးစားခြင်း",
    "content": "ထိုင်းနိုင်ငံတွင် ဘုရင်နှင့် တော်ဝင်မိသားစုကို ဝေဖန်ခြင်း သသို့မဟုတ် စော်ကားခြင်းသည် အလွန်ပြင်းထန်သော ရာဇဝတ်မှုဖြစ်သည်။",
    "points": [
      "ပုဒ်မ ၁၁၂- ဘုရင်၊ မိဖုရား သို့မဟုတ် အမွေဆက်ခံသူကို အသရေဖျက်ခြင်း၊ စော်ကားခြင်း သို့မဟုတ် ခြိမ်းခြောက်ခြင်း ပြုလုပ်သူသည် ထောင်ဒဏ် ၃ နှစ်မှ ၁၅ နှစ်အထိ ကျခံရနိုင်သည်။"
    ]
  }
],
  ES: [
  {
    "title": "1. Respeto a la Monarquía (Ley de Lesa Majestad)",
    "content": "En Tailandia, criticar o insultar al Rey y a la Familia Real es un delito penal muy grave.",
    "points": [
      "Artículo 112: Cualquier persona que difame, insulte o amenace al Rey, la Reina o el Heredero puede enfrentar de 3 a 15 años de prisión.",
      "Precaución: Esta ley se aplica no solo a declaraciones verbales, sino también a lo escrito o compartido en redes sociales.",
      "Moneda: Como los billetes y monedas llevan la imagen del Rey, nunca pise dinero."
    ]
  },
  {
    "title": "2. Regulaciones de entrada 2026",
    "content": "Requisitos esenciales de entrada para cada visitante a Tailandia.",
    "points": [
      "Tarjeta de llegada digital (TDAC): a partir de 2026, todos los viajeros deben completar una tarjeta de llegada digital en línea dentro de las 72 horas antes de llegar a Tailandia.",
      "Prueba de fondos: si la inmigración lo solicita, los viajeros deben poder mostrar la posesión de al menos 20,000 Baht por persona."
    ]
  }
],
  FR: [
  {
    "title": "1. Respect de la Monarchie (Loi de Lèse-majesté)",
    "content": "En Thaïlande, critiquer ou insulter le roi et la famille royale est une infraction pénale très grave.",
    "points": [
      "Article 112 : Toute personne qui diffame, insulte ou menace le roi, la reine ou l'héritier présomptif peut faire face à une peine de 3 à 15 ans de prison par chef d'accusation.",
      "Attention : Cette loi s'applique non seulement aux déclarations verbales, mais aussi à la rédaction ou au partage de contenu sur les réseaux sociaux.",
      "Monnaie : Puisque les billets et les pièces thaïlandais portent l'image du roi, ne marchez jamais sur l'argent pour l'empêcher de rouler."
    ]
  }
],
  DE: [
  {
    "title": "1. Respekt vor der Monarchie (Lèse-majesté-Gesetz)",
    "content": "In Thailand ist es eine sehr schwere Straftat, den König und die königliche Familie zu kritisieren oder zu beleidigen.",
    "points": [
      "Paragraph 112: Jeder, der den König, die Königin oder den Thronfolger diffamiert, beleidigt oder bedroht, muss mit einer Freiheitsstrafe von 3 bis 15 Jahren pro Anklagepunkt rechnen.",
      "Achtung: Dieses Gesetz gilt nicht nur für mündliche Aussagen, sondern auch für das Schreiben oder Teilen von Inhalten in sozialen Medien.",
      "Währung: Da thailändische Banknoten und Münzen das Bild des Königs tragen, treten Sie niemals auf Geld."
    ]
  }
]
};

export const LAWS_PRO_TIP: Record<string, string> = {
  EN: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  TH: "ขณะอยู่ในประเทศไทย สิ่งสำคัญคือต้องเก็บสำเนาหนังสือเดินทางและวีซ่าของคุณ หรือบันทึกภาพถ่ายที่ชัดเจนไว้ในโทรศัพท์ของคุณ คุณต้องสามารถแสดงเอกสารเหล่านี้ได้หากเจ้าหน้าที่รักษาความปลอดภัยหรือตำรวจเรียกตรวจ",
  MM: "ထိုင်းနိုင်ငံသို့ရောက်ရှိနေစဉ် သင်၏ပတ်စပို့နှင့်ဗီဇာမိတ္တူများကို သိမ်းဆည်းထားရန် သို့မဟုတ် သင့်ဖုန်းတွင် ၎င်းတို့၏ ဓာတ်ပုံများကို သိမ်းဆည်းထားရန် အရေးကြီးပါသည်။",
  ES: "Mientras esté en Tailandia, es crucial guardar copias de su pasaporte y visa o guardar fotos claras de ellos en su teléfono.",
  FR: "Pendant votre séjour en Thaïlande, il est crucial de conserver des copies de votre passeport et de votre visa ou d'en enregistrer des photos claires sur votre téléphone.",
  DE: "Während Ihres Aufenthalts in Thailand ist es wichtig, Kopien Ihres Reisepasses und Visums aufzubewahren oder klare Fotos davon auf Ihrem Telefon zu speichern."
};
