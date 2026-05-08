export interface LawSection {
  title: string;
  content: string;
  points?: string[];
}

export const LAWS_DATA: Record<string, LawSection[]> = {
  english: [
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
  thai: [
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
  chinese: [
  {
    "title": "1. 尊重王室（大不敬罪）",
    "content": "在泰国，批评或侮辱国王和王室是非常严重的刑事犯罪。",
    "points": [
      "第112条：任何诽谤、侮辱或威胁国王、王后或继承人的人可能面临3至15年的监禁。",
      "注意：该法律不仅适用于口头陈述，也适用于在社交媒体上编写或分享的内容。",
      "货币：由于泰铢纸币和硬币印有国王画像，切勿用脚踩踏钱币。"
    ]
  },
  {
    "title": "2. 2026年入境规定",
    "content": "每位访问泰国的游客都必须遵守的入境要求。",
    "points": [
      "电子入境卡 (TDAC)：从2026年开始，所有旅客必须在抵泰前72小时内完成在线电子入境卡。否则可能导致入境延误或被拒绝入境。",
      "资金证明：如果移民局要求，旅客必须能出示至少每人2万泰铢（或每户4万泰铢）或等值外币。"
    ]
  },
  {
    "title": "3. 吸烟、电子烟和药物",
    "content": "泰国严格执行违禁品和烟草法律。",
    "points": [
      "电子烟：在泰国进口、持有或使用电子烟及其相关设备是非法行为。游客可能会被逮捕、处以巨额罚款或最高10年的监禁。",
      "麻醉品：有关冰毒和海洛因等非法药物的法律惩罚极重，包括死刑。",
      "大麻：法规频繁变动。目前已收紧至仅限医疗用途；在公共场合吸食大麻是违法行为。"
    ]
  }
],
  spanish: [
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
  french: [
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
  portuguese: [
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
  russian: [
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
  german: [
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
  italian: [
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
  hindi: [
  {
    "title": "1. राजशाही के प्रति सम्मान (लेसे-मैजेस्टे कानून)",
    "content": "थाईलैंड में, राजा और शाही परिवार की आलोचना करना या उनका अपमान करना एक बहुत ही गंभीर आपराधिक अपराध है।",
    "points": [
      "धारा 112: जो कोई भी राजा, रानी या उत्तराधिकारी को बदनाम करता है, उसका अपमान करता है या उसे धमकी देता है, उसे प्रति मामले में 3 से 15 साल की कैद हो सकती है।",
      "सावधानी: यह कानून न केवल मौखिक बयानों पर बल्कि सोशल मीडिया पर सामग्री लिखने या साझा करने पर भी लागू होता है।",
      "मुद्रा: चूंकि थाई बात के नोटों और सिक्ков पर राजा की छवि होती है, इसलिए पैसे को लुढ़कने से रोकने के लिए कभी भी उस पर पैर न रखें।"
    ]
  }
],
  japanese: [
  {
    "title": "1. 王室への敬意（不敬罪）",
    "content": "タイでは、国王や王室を批判したり侮辱したりすることは非常に深刻な刑事犯罪です。",
    "points": [
      "第112条：国王、王妃、または継承者を中傷、侮辱、または脅迫した者は、3年から15年の禁錮刑に処される可能性があります。",
      "注意：この法律は口頭での発言だけでなく、ソーシャルメディアでの書き込みや共有にも適用されます。",
      "通貨：タイバーツの紙幣や硬貨には国王の肖像が描かれているため、決してお金を踏んではいけません。"
    ]
  }
],
  korean: [
  {
    "title": "1. 왕실에 대한 존중 (왕실 모독죄)",
    "content": "태국에서 국왕과 왕실을 비판하거나 모욕하는 것은 매우 심각한 형사 범죄입니다.",
    "points": [
      "제112조: 국왕, 왕비 또는 후계자를 비방, 모욕 또는 위협하는 사람은 건당 3년에서 15년의 징역형에 처해질 수 있습니다.",
      "주의: 이 법은 구두 진술뿐만 아니라 소셜 미디어에 글을 쓰거나 공유하는 것에도 적용됩니다.",
      "화폐: 태국 바트 지폐와 동전에는 국왕의 초상이 그려져 있으므로, 돈을 밟지 마십시오."
    ]
  }
],
  myanmar: [
  {
    "title": "၁။ ဘုရင်စနစ်ကို လေးစားခြင်း",
    "content": "ထိုင်းနိုင်ငံတွင် ဘုရင်နှင့် တော်ဝင်မိသားစုကို ဝေဖန်ခြင်း သို့မဟုတ် စော်ကားခြင်းသည် အလွန်ပြင်းထန်သော ရာဇဝတ်မှုဖြစ်သည်။",
    "points": [
      "ပုဒ်မ ၁၁၂- ဘုရင်၊ မိဖုရား သို့မဟုတ် အမွေဆက်ခံသူကို အသရေဖျက်ခြင်း၊ စော်ကားခြင်း သို့မဟုတ် ခြိမ်းခြောက်ခြင်း ပြုလုပ်သူသည် ထောင်ဒဏ် ၃ နှစ်မှ ၁၅ နှစ်အထိ ကျခံရနိုင်သည်။"
    ]
  }
],
  malay: [
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
  indonesian: [
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
  vietnamese: [
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
  arabic: [
  {
    "title": "1. احترام الملكية (قانون إهانة الذات الملكية)",
    "content": "في تايلاند، يعد انتقاد أو إهانة الملك والعائلة المالكية جريمة جنائية شديدة الخطورة.",
    "points": [
      "المادة 112: أي شخص يشوه سمعة الملك أو الملكة أو ولي العهد أو يهينهم أو يهددهم يمكن أن يواجه السجن لمدة تتراوح بين 3 إلى 15 عامًا لكل تهمة.",
      "تنبيه: لا ينطبق هذا القانون على التصريحات الشفهية فحسب، بل يشمل أيضًا الكتابة أو مشاركة المحتوى على وسائل التواصل الاجتماعي.",
      "العملة: نظرًا لأن الأوراق النقدية والعملات المعدنية التايلاندية تحمل صورة الملك، فلا تدس أبدًا على المال."
    ]
  }
],
  bengali: [
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
  dutch: [
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
  filipino: [
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
  farsi: [
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
  polish: [
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
  romanian: [
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
  swedish: [
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
  turkish: [
  {
    "title": "1. Monarşiye Saygı",
    "content": "Tayland'da Kral ve Kraliyet Ailesi'ni eleştirmek veya onlara hakaret etmek çok ciddi bir suçtur.",
    "points": [
      "Madde 112: Kral'a, Kraliçe'ye veya Veliaht Prens'e hakaret eden herkes 3 ila 15 yıl hapis cezası ile karşı karşıya kalabilir."
    ]
  }
],
  hebrew: [
  {
    "title": "1. כבוד למלוכה (חוק לז-מז'סטה)",
    "content": "בתאילנד, ביקורת או העלבה של המלך ומשפחת המלוכה היא עבירה פלילית חמורה ביותר.",
    "points": [
      "סעיף 112: כל מי שמוציא דיבה, מעליב או מאיים על המלך, המלכה או יורש העצר עלול לעמוד בפني 3 עד 15 שנות מאסר לכל אישום."
    ]
  }
],
};

export const LAWS_PRO_TIP: Record<string, string> = {
  english: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  thai: "ขณะอยู่ในประเทศไทย สิ่งสำคัญคือต้องเก็บสำเนาหนังสือเดินทางและวีซ่าของคุณ หรือบันทึกภาพถ่ายที่ชัดเจนไว้ในโทรศัพท์ของคุณ คุณต้องสามารถแสดงเอกสารเหล่านี้ได้หากเจ้าหน้าที่รักษาความปลอดภัยหรือตำรวจเรียกตรวจ",
  chinese: "在泰国期间，务必保留护照和签证的复印件，或在手机中保存清晰的照片。如安全人员或警察要求，您必须能够出示这些文档。",
  spanish: "Mientras esté en Tailandia, es crucial guardar copias de su pasaporte y visa o guardar fotos claras de ellos en su teléfono.",
  french: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  portuguese: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  russian: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  german: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  italian: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  hindi: "थाईलैंड में रहते हुए, अपने पासपोर्ट और वीजा की प्रतियां रखना या अपने फोन पर उनकी स्पष्ट तस्वीरें सहेजना महत्वपूर्ण है।",
  japanese: "タイに滞在中は、パスポートやビザのコピーを保管するか、スマートフォンの鮮明な写真を保存しておくことが重要です。",
  korean: "태국에 머무는 동안 여권과 비자의 사본을 보관하거나 휴대폰에 선명한 사진을 저장해 두는 것이 중요합니다.",
  myanmar: "ထိုင်းနိုင်ငံသို့ရောက်ရှိနေစဉ် သင်၏ပတ်စပို့နှင့်ဗီဇာမိတ္တူများကို သိမ်းဆည်းထားရန် သို့မဟုတ် သင့်ဖုန်းတွင် ၎င်းတို့၏ ဓာတ်ပုံများကို သိမ်းဆည်းထားရန် အရေးကြီးပါသည်။",
  malay: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  indonesian: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  vietnamese: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  arabic: "أثناء وجودك في تايلاند، من الأهمية بمكان الاحتفاظ بنسخ من جواز سفرك وتأشيرتك أو حفظ صور واضحة لها على هاتفك.",
  bengali: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  dutch: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  filipino: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  farsi: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  polish: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  romanian: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  swedish: "While in Thailand, it is crucial to keep copies of your passport and visa or save clear photos of them on your phone. You must be able to present them if requested by security or police officers.",
  turkish: "Tayland'dayken pasaportunuzun ve vizenizin kopyalarını yanınızda bulundurmanız veya telefonunuza fotoğraflarını kaydetmeniz çok önemlidir.",
  hebrew: "בזמן השהות בתאילנד, חשוב לשמור עותקים של הדרכון והוויזה שלך או לשמור תמונות ברורות שלהם בטלפון.",
};