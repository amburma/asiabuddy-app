import { Destination, ThaiLanguage } from '../../types/country';

export const DESTINATIONS: Partial<Record<ThaiLanguage, Destination[]>> = {
  EN: [
  {
    id: 'bangkok',
    name: 'Bangkok',
    thaiName: 'กรุงเทพมหานคร',
    overview: 'The City of Angels, where ancient shrines meet ultra-modernity in a vibrant sensory landscape.',
    bestTime: 'November to March',
    pillars: {
      mustVisit: [
        {
          title: 'The Grand Palace',
          badge: 'Landmarks',
          description: 'The spectacular ceremonial home of Thai Kings and the Temple of the Emerald Buddha.',
          etiquette: 'Strict: Shoulders and knees must be covered. No sandals without straps.',
          imageLabel: 'grand_palace_bangkok'
        },
        {
          title: 'National Museum Bangkok',
          badge: 'Museums',
          description: 'The largest museum in Southeast Asia, showcasing Thai art and history.',
          imageLabel: 'national_museum_bangkok'
        },
        {
          title: 'Siam Square',
          badge: 'City Center',
          description: 'The heartbeat of Bangkok youth culture and fashion.',
          imageLabel: 'siam_square'
        }
      ],
      dining: [
        {
          title: 'Jay Fai',
          badge: 'Street Food',
          description: 'World-famous Michelin-starred crab meat omelet cooked over charcoal.',
          dietary: ['Seafood focus'],
          imageLabel: 'jay_fai'
        },
        {
          title: 'Or Tor Kor Market',
          badge: 'Local Market',
          description: 'Upscale fresh market known for the highest quality agricultural products.',
          imageLabel: 'or_tor_kor'
        }
      ],
      otherExperiences: [
        {
          title: 'Jodd Fairs',
          badge: 'Night Market',
          description: 'A trendy night market popular for street food and vintage fashion.',
          imageLabel: 'jodd_fairs'
        },
        {
          title: 'Chao Phraya Express Boat',
          badge: 'Public Transport',
          description: 'Experience the river life and beat the traffic like a local.',
          imageLabel: 'chao_phraya_boat'
        }
      ],
      uniqueActivities: [
        {
          title: 'Blue Elephant Cooking School',
          badge: 'Cooking Class',
          description: 'Learn the secrets of Royal Thai cuisine in a historic setting.',
          imageLabel: 'blue_elephant_cooking'
        },
        {
          title: 'Hidden Bangkok Canal Tour',
          badge: 'Walking Tour',
          description: 'Explore the quiet backwaters and traditional wooden houses.',
          imageLabel: 'canal_tour'
        }
      ],
      hiddenGems: [
        {
          title: 'Wat Sam Phran',
          badge: 'Hidden Gem',
          description: 'A 17-story pink tower with a massive dragon spiraling around it.',
          etiquette: 'Quiet contemplation requested.',
          imageLabel: 'wat_sam_phran'
        },
        {
          title: 'Baan Silapin (Artist House)',
          badge: 'Hidden Gem',
          description: 'A century-old house turned into a gallery and puppet theater.',
          imageLabel: 'artist_house'
        }
      ]
    }
  },
  {
    id: 'phuket',
    name: 'Phuket',
    thaiName: 'ภูเก็ต',
    overview: 'The Pearl of the Andaman, synonymous with white sands, crystalline waters, and historic Old Town charm.',
    bestTime: 'November to April',
    pillars: {
      mustVisit: [
        {
          title: 'Big Buddha',
          badge: 'Landmarks',
          description: 'A 45-meter tall white marble statue offering panoramic views.',
          etiquette: 'Modest dress required.',
          imageLabel: 'big_buddha_phuket'
        },
        {
          title: 'Phuket Old Town',
          badge: 'Heritage',
          description: 'Colorfoul Sino-Portuguese shophouses and historic heritage.',
          imageLabel: 'phuket_old_town'
        }
      ],
      dining: [
        {
          title: 'Sunday Walking Street Market',
          badge: 'Street Food',
          description: 'The most vibrant food and craft market in Phuket Town.',
          imageLabel: 'phuket_sunday_market'
        },
        {
          title: 'Blue Elephant Phuket',
          badge: 'Authentic',
          description: 'Fine dining in a historic governor’s mansion.',
          imageLabel: 'blue_elephant_phuket'
        }
      ],
      otherExperiences: [
        {
          title: 'Bangla Road',
          badge: 'Nightlife',
          description: 'The center of Phuket nightlife with clubs and bars.',
          imageLabel: 'bangla_road'
        }
      ],
      uniqueActivities: [
        {
          title: 'Thai Cooking Academy',
          badge: 'Cooking Class',
          description: 'Hands-on training in traditional Thai dishes.',
          imageLabel: 'phuket_cooking_class'
        }
      ],
      hiddenGems: [
        {
          title: 'Banana Beach',
          badge: 'Hidden Gem',
          description: 'A secluded beach with crystal clear water and fewer tourists.',
          imageLabel: 'banana_beach'
        }
      ]
    }
  },
  {
    id: 'chiang-mai',
    name: 'Chiang Mai',
    thaiName: 'เชียงใหม่',
    overview: 'The Rose of the North, a sanctuary of Lanna culture, misty mountains, and centuries-old temples.',
    bestTime: 'November to February',
    pillars: {
      mustVisit: [
        {
          title: 'Wat Phra That Doi Suthep',
          badge: 'Landmarks',
          description: 'A golden pagoda perched on a mountain with city views.',
          etiquette: 'Modest dress required.',
          imageLabel: 'doi_suthep'
        },
        {
          title: 'Tha Phae Gate',
          badge: 'Public Square',
          description: 'The historic entrance to the old city and a social hub.',
          imageLabel: 'tha_phae_gate'
        }
      ],
      dining: [
        {
          title: 'Khao Soi Mae Sai',
          badge: 'Street Food',
          description: 'Traditional Northern Thai curry noodles.',
          imageLabel: 'khao_soi_mae_sai'
        }
      ],
      otherExperiences: [
        {
          title: 'Wua Lai Walking Street',
          badge: 'Local Crafts',
          description: 'Famous Saturday market known for silverware and crafts.',
          imageLabel: 'silver_street'
        }
      ],
      uniqueActivities: [
        {
          title: 'Pantawan Cooking School',
          badge: 'Cooking Class',
          description: 'Learn Lanna cooking in a beautiful teak house.',
          imageLabel: 'pantawan_cooking'
        }
      ],
      hiddenGems: [
        {
          title: 'Wat Pha Lat',
          badge: 'Hidden Gem',
          description: 'A peaceful jungle temple tucked away on the mountain.',
          imageLabel: 'wat_pha_lat'
        }
      ]
    }
  },
  {
    id: 'pattaya',
    name: 'Pattaya',
    thaiName: 'พัทยา',
    overview: 'A vibrant coastal city known for its diverse entertainment, family attractions, and island getaways.',
    bestTime: 'November to March',
    pillars: {
      mustVisit: [
        {
          title: 'Sanctuary of Truth',
          badge: 'Landmarks',
          description: 'A massive wooden pavilion filled with intricate carvings.',
          imageLabel: 'sanctuary_of_truth'
        }
      ],
      dining: [
        {
          title: 'The Sky Gallery',
          badge: 'Cafe Culture',
          description: 'Cliffside dining with stunning Gulf of Thailand views.',
          imageLabel: 'sky_gallery_pattaya'
        }
      ],
      otherExperiences: [
        {
          title: 'Walking Street',
          badge: 'Nightlife',
          description: 'World-famous entertainment district after dark.',
          imageLabel: 'pattaya_walking_street'
        }
      ],
      uniqueActivities: [
        {
          title: 'Koh Larn Day Trip',
          badge: 'Nature',
          description: 'Explore clear waters and beaches on a nearby island.',
          imageLabel: 'koh_larn'
        }
      ],
      hiddenGems: [
        {
          title: 'Pattaya Floating Market',
          badge: 'Hidden Gem',
          description: 'Authentic riverside living and local crafts.',
          imageLabel: 'pattaya_floating_market'
        }
      ]
    }
  },
  {
    id: 'krabi',
    name: 'Krabi',
    thaiName: 'กระบี่',
    overview: 'A province of stunning limestone cliffs, emerald lagoons, and world-class rock climbing.',
    bestTime: 'November to April',
    pillars: {
      mustVisit: [
        {
          title: 'Tiger Cave Temple',
          badge: 'Landmarks',
          description: 'A spiritual site requiring a climb of 1,237 steps for a great view.',
          imageLabel: 'tiger_cave_krabi'
        }
      ],
      dining: [
        {
          title: 'Krabi Night Market',
          badge: 'Street Food',
          description: 'Local Southern Thai flavors and fresh seafood market.',
          imageLabel: 'krabi_night_market'
        }
      ],
      otherExperiences: [
        {
          title: 'Railay Beach',
          badge: 'Nature',
          description: 'Accessible only by boat, famous for rock climbing.',
          imageLabel: 'railay_beach'
        }
      ],
      uniqueActivities: [
        {
          title: 'Four Islands Tour',
          badge: 'Nature',
          description: 'Traditional longtail boat tour of islands.',
          imageLabel: 'four_islands'
        }
      ],
      hiddenGems: [
        {
          title: 'Emerald Pool',
          badge: 'Hidden Gem',
          description: 'A natural hot spring with turquoise water in the forest.',
          imageLabel: 'emerald_pool'
        }
      ]
    }
  },
  {
    id: 'ayutthaya',
    name: 'Ayutthaya',
    thaiName: 'พระนครศรีอยုธยา',
    overview: 'The former capital of the Kingdom of Siam, now a UNESCO World Heritage site filled with sprawling ruins.',
    bestTime: 'November to February',
    pillars: {
      mustVisit: [
        {
          title: 'Wat Mahathat',
          badge: 'Landmarks',
          description: 'Famous for the stone Buddha head entwined in tree roots.',
          imageLabel: 'wat_mahathat'
        }
      ],
      dining: [
        {
          title: 'Ayutthaya Night Market',
          badge: 'Local Market',
          description: 'Delicious traditional snacks and giant river prawns.',
          imageLabel: 'ayutthaya_market'
        }
      ],
      otherExperiences: [
        {
          title: 'Ayutthaya Historical Park',
          badge: 'Heritage',
          description: 'Explore the ruins of the ancient Siamese capital.',
          imageLabel: 'ayutthaya_park'
        }
      ],
      uniqueActivities: [
        {
          title: 'Elephant World Tour',
          badge: 'Culture',
          description: 'Eco-friendly interaction and historical ruins.',
          imageLabel: 'ayutthaya_elephant'
        }
      ],
      hiddenGems: [
        {
          title: 'Wat Chaiwatthanaram',
          badge: 'Hidden Gem',
          description: 'One of Ayutthaya’s best-preserved and most beautiful temples.',
          imageLabel: 'wat_chaiwatthanaram'
        }
      ]
    }
  },
  {
    id: 'koh-samui',
    name: 'Koh Samui',
    thaiName: 'เกาะสมุย',
    overview: 'Thailand’s second-largest island, known for its palm-fringed beaches, coconut groves, and luxury resorts.',
    bestTime: 'December to September',
    pillars: {
      mustVisit: [
        {
          title: 'Big Buddha Temple',
          badge: 'Landmarks',
          description: 'A 12-meter golden statue on a small rocky island.',
          imageLabel: 'wat_phra_yai_samui'
        }
      ],
      dining: [
        {
          title: 'Fisherman’s Village',
          badge: 'Dining Experience',
          description: 'A trendy area with beachfront restaurants and boutiques.',
          imageLabel: 'fishermans_village'
        }
      ],
      otherExperiences: [
        {
          title: 'Chaweng Beach',
          badge: 'Nature',
          description: 'The longest and most lively beach on the island.',
          imageLabel: 'chaweng_beach'
        }
      ],
      uniqueActivities: [
        {
          title: 'Ang Thong Marine Park',
          badge: 'Nature',
          description: 'A pristine archipelago of 42 islands with emerald lagoons.',
          imageLabel: 'ang_thong_park'
        }
      ],
      hiddenGems: [
        {
          title: 'Silver Beach',
          badge: 'Hidden Gem',
          description: 'A small, secluded cove with fine sand and calm water.',
          imageLabel: 'silver_beach'
        }
      ]
    }
  }
],
  TH: [
    {
      id: 'bangkok',
      name: 'กรุงเทพมหานคร',
      thaiName: 'กรุงเทพมหานคร',
      overview: 'กรุงเทพมหานคร เมืองหลวงของไทยที่ซึ่งวัดวาอารามเก่าแก่มาบรรจบกับความทันสมัยในภูมิทัศน์ที่เปี่ยมไปด้วยพลัง',
      bestTime: 'พฤศจิกายน ถึง มีนาคม',
      pillars: {
        mustVisit: [
          {
            title: 'พระบรมมหาราชวัง และวัดพระแก้ว',
            badge: 'สถานที่สำคัญ',
            description: 'พระราชวังที่สวยงามและเป็นที่ประดิษฐานของพระแก้วมรกต',
            etiquette: 'การแต่งกาย: ต้องสวมเสื้อมีแขนและกางเกงหรือกระโปรงยาวคลุมเข่า ห้ามสวมรองเท้าแตะที่ไม่มีสายรัด',
            imageLabel: 'grand_palace_bangkok'
          },
          {
            title: 'พิพิธภัณฑสถานแห่งชาติ พระนคร',
            badge: 'พิพิธภัณฑ์',
            description: 'พิพิธภัณฑ์ที่ใหญ่ที่สุดในเอเชียตะวันออกเฉียงใต้ รวบรวมศิลปะและประวัติศาสตร์ไทย',
            imageLabel: 'national_museum_bangkok'
          },
          {
            title: 'สยามสแควร์',
            badge: 'ใจกลางเมือง',
            description: 'ศูนย์กลางแฟชั่นและวัฒนธรรมสมัยใหม่ของวัยรุ่นกรุงเทพฯ',
            imageLabel: 'siam_square'
          }
        ],
        dining: [
          {
            title: 'ร้านเจ๊ไฝ',
            badge: 'สตรีทฟู้ด',
            description: 'ไข่เจียวปูชื่อดังระดับมิชลินที่ปรุงด้วยเตาถ่าน',
            dietary: ['เน้นอาหารทะเล'],
            imageLabel: 'jay_fai'
          },
          {
            title: 'ตลาด อ.ต.ก.',
            badge: 'ตลาดท้องถิ่น',
            description: 'ตลาดสดระดับพรีเมียมที่รักษาระดับคุณภาพสินค้าเกษตรสูงสุด',
            imageLabel: 'or_tor_kor'
          }
        ],
        otherExperiences: [
          {
            title: 'จ๊อดแฟร์',
            badge: 'ตลาดนัดกลางคืน',
            description: 'ตลาดนัดกลางคืนยอดนิยมสำหรับสตรีทฟู้ดและแฟชั่นวินเทจ',
            imageLabel: 'jodd_fairs'
          },
          {
            title: 'เรือด่วนเจ้าพระยา',
            badge: 'การเดินทางสาธารณะ',
            description: 'สัมผัสวิถีชีวิตริมน้ำและเลี่ยงรถตู้ด้วยการนั่งเรือด่วน',
            imageLabel: 'chao_phraya_boat'
          }
        ],
        uniqueActivities: [
          {
            title: 'โรงเรียนสอนทำอาหารบลูเอเลเฟ่นท์',
            badge: 'คลาสทำอาหาร',
            description: 'เรียนรู้เคล็ดลับการทำอาหารไทยตำรับชาววังในบรรยากาศคลาสสิก',
            imageLabel: 'blue_elephant_cooking'
          },
          {
            title: 'ทัวร์คลองกรุงเทพฯ',
            badge: 'ทัวร์เดินชม',
            description: 'สำรวจวิถีชีวิตริมคลองที่เงียบสงบและบ้านไม้โบราณ',
            imageLabel: 'canal_tour'
          }
        ],
        hiddenGems: [
          {
            title: 'วัดสามพราน (วัดมังกร)',
            badge: 'สถานที่ลับ',
            description: 'ตึกสีชมพูสูง 17 ชั้นที่มีมังกรยักษ์พันรอบตัวตึก',
            imageLabel: 'wat_sam_phran'
          },
          {
            title: 'บ้านศิลปิน คลองบางหลวง',
            badge: 'สถานที่ลับ',
            description: 'บ้านไม้เก่าแก่อายุกว่าร้อยปีที่กลายเป็นแกลเลอรีและโรงละครหุ่นละครเล็ก',
            imageLabel: 'artist_house'
          }
        ]
      }
    },
    {
      id: 'phuket',
      name: 'ภูเก็ต',
      thaiName: 'ภูเก็ต',
      overview: 'ไข่มุกแห่งอันดามัน สวรรค์ของการพักผ่อนด้วยหาดทรายขาว น้ำใส และย่านเมืองเก่าที่มีเสน่ห์',
      bestTime: 'พฤศจิกายน ถึง เมษายน',
      pillars: {
        mustVisit: [
          {
            title: 'พระใหญ่ (Big Buddha)',
            badge: 'สถานที่สำคัญ',
            description: 'พระพุทธรูปปางมารวิชัยสูง 45 เมตร พร้อมวิวพาโนรามาทั่วเกาะภูเก็ต',
            etiquette: 'การแต่งกาย: ต้องแต่งกายสุภาพ เรียบร้อย',
            imageLabel: 'big_buddha_phuket'
          },
          {
            title: 'ย่านเมืองเก่าภูเก็ต',
            badge: 'มรดกทางวัฒนธรรม',
            description: 'ชมตึกแถวโบราณสไตล์ชิโนโปรตุกีสที่มีสีสันสดใส',
            imageLabel: 'phuket_old_town'
          }
        ],
        dining: [
          {
            title: 'ตลาดปล่อยของ (Sunday Walking Street)',
            badge: 'สตรีทฟู้ด',
            description: 'ถนนคนเดินวันอาทิตย์ที่รวมอาหารพื้นเมืองและของทำมือมากมาย',
            imageLabel: 'phuket_sunday_market'
          },
          {
            title: 'บลูเอเลเฟ่นท์ ภูเก็ต',
            badge: 'อาหารระดับหรู',
            description: 'สัมผัสประสบการณ์อาหารไทยรสเลิศในจวนผู้ว่าเก่าสุดคลาสสิก',
            imageLabel: 'blue_elephant_phuket'
          }
        ],
        otherExperiences: [
          {
            title: 'ซอยบางลา',
            badge: 'ยามค่ำคืน',
            description: 'ศูนย์กลางความบันเทิงยามค่ำคืนที่โด่งดังไปทั่วโลก',
            imageLabel: 'bangla_road'
          }
        ],
        uniqueActivities: [
          {
            title: 'คลาสสอนทำอาหารภูเก็ต',
            badge: 'กิจกรรมพิเศษ',
            description: 'เรียนรู้การทำอาหารพื้นเมืองภูเก็ตในบรรยากาศท้องถิ่น',
            imageLabel: 'phuket_cooking_class'
          }
        ],
        hiddenGems: [
          {
            title: 'หาดกล้วย (Banana Beach)',
            badge: 'สถานที่ลับ',
            description: 'หาดทรายที่เงียบสงบและน้ำใสสะอาด เหมาะสำหรับการพักผ่อนหลีกหนีความวุ่นวาย',
            imageLabel: 'banana_beach'
          }
        ]
      }
    },
    {
      id: 'chiang-mai',
      name: 'เชียงใหม่',
      thaiName: 'เชียงใหม่',
      overview: 'กุหลาบเวียงพิงค์ ศูนย์กลางวัฒนธรรมล้านนาที่โอบล้อมด้วยขุนเขาและหมอกจางๆ',
      bestTime: 'พฤศจิกายน ถึง กุมภาพันธ์',
      pillars: {
        mustVisit: [
          {
            title: 'วัดพระธาตุดอยสุเทพ',
            badge: 'สถานที่สำคัญ',
            description: 'วัดคู่บ้านคู่เมืองเชียงใหม่ ตั้งอยู่บนยอดเขาสูงเห็นวิวเมืองได้ทั้งเมือง',
            etiquette: 'การแต่งกาย: ต้องแต่งกายสุภาพ เรียบร้อย',
            imageLabel: 'doi_suthep'
          },
          {
            title: 'ประตูท่าแพ',
            badge: 'สัญลักษณ์เมือง',
            description: 'ประตูเมืองโบราณจุดรวมพลและแลนด์มาร์คสำคัญใจกลางเมืองเก่า',
            imageLabel: 'tha_phae_gate'
          }
        ],
        dining: [
          {
            title: 'ข้าวซอยแม่สาย',
            badge: 'สตรีทฟู้ด',
            description: 'ข้าวซอยเนื้อและไก่รสชาติเข้มข้นแบบต้นตำรับเชียงใหม่',
            imageLabel: 'khao_soi_mae_sai'
          }
        ],
        otherExperiences: [
          {
            title: 'ถนนคนเดินวัวลาย',
            badge: 'ศิลปหัตถกรรม',
            description: 'ถนนคนเดินวันเสาร์ที่ขึ้นชื่อเรื่องเครื่องเงินและงานฝีมือ',
            imageLabel: 'silver_street'
          }
        ],
        uniqueActivities: [
          {
            title: 'โรงเรียนสอนทำอาหารปันตาหวัน',
            badge: 'คลาสทำอาหาร',
            description: 'เรียนรู้การทำอาหารล้านนาในบ้านไม้สักโบราณที่สวยงาม',
            imageLabel: 'pantawan_cooking'
          }
        ],
        hiddenGems: [
          {
            title: 'วัดผาลาด',
            badge: 'สถานที่ลับ',
            description: 'วัดลับกลางป่าริมดอยสุเทพที่มีบรรยากาศเงียบสงบและสวยงามดั่งเทพนิยาย',
            imageLabel: 'wat_pha_lat'
          }
        ]
      }
    },
    {
      id: 'pattaya',
      name: 'พัทยา',
      thaiName: 'พัทยา',
      overview: 'เมืองชายทะเลที่มีชีวิตชีวา ขึ้นชื่อเรื่องความบันเทิงที่หลากหลายและเกาะสวยที่อยู่ใกล้แค่เอื้อม',
      bestTime: 'พฤศจิกายน ถึง มีนาคม',
      pillars: {
        mustVisit: [
          {
            title: 'ปราสาทสัจธรรม',
            badge: 'สถานที่สำคัญ',
            description: 'ปราสาทไม้แกะสลักทั้งหลังที่ใหญ่ที่สุดในโลก สะท้อนปรัชญาและศิลปะเอเชีย',
            imageLabel: 'sanctuary_of_truth'
          }
        ],
        dining: [
          {
            title: 'The Sky Gallery',
            badge: 'คาเฟ่และร้านอาหาร',
            description: 'ร้านอาหารริมหน้าผาพร้อมวิวอ่าวไทยที่สวยที่สุดในพัทยา',
            imageLabel: 'sky_gallery_pattaya'
          }
        ],
        otherExperiences: [
          {
            title: 'Walking Street',
            badge: 'ความบันเทิง',
            description: 'ถนนสายบันเทิงยามค่ำคืนที่เป็นสัญลักษณ์ของพัทยา',
            imageLabel: 'pattaya_walking_street'
          }
        ],
        uniqueActivities: [
          {
            title: 'สวนน้ำรามายณะ',
            badge: 'กิจกรรมครอบครัว',
            description: 'สวนน้ำที่ใหญ่ที่สุดในประเทศไทยพร้อมเครื่องเล่นมากมาย',
            imageLabel: 'ramayana_water_park'
          }
        ],
        hiddenGems: [
          {
            title: 'หาดทรายแก้ว',
            badge: 'สถานที่ลับ',
            description: 'หาดทรายขาวละเอียดและน้ำใสเงียบสงบในเขตกองทัพเรือ',
            imageLabel: 'sai_kaew_beach'
          }
        ]
      }
    },
    {
      id: 'krabi',
      name: 'กระบี่',
      thaiName: 'กระบี่',
      overview: 'จังหวัดที่มีทัศนียภาพภูเขาหินปูนสูงชัน หาดทรายขาวสวยน้ำใส และกิจกรรมกลางแจ้งที่น่าตื่นเต้น',
      bestTime: 'พฤศจิกายน ถึง เมษายน',
      pillars: {
        mustVisit: [
          {
            title: 'วัดถ้ำเสือ',
            badge: 'สถานที่สำคัญ',
            description: 'สักการะสิ่งศักดิ์สิทธิ์และชมวิวจากมุมสูงด้วยทางเดินบันได 1,237 ขั้น',
            imageLabel: 'tiger_cave_krabi'
          }
        ],
        dining: [
          {
            title: 'ตลาดโต้รุ่งกระบี่',
            badge: 'สตรีทฟู้ด',
            description: 'ลิ้มลองอาหารใต้รสจัดจ้านและอาหารทะเลสดๆ',
            imageLabel: 'krabi_night_market'
          }
        ],
        otherExperiences: [
          {
            title: 'หาดไร่เลย์',
            badge: 'ธรรมชาติ',
            description: 'หาดทรายที่เข้าถึงได้โดยเรือเท่านั้น โด่งดังเรื่องการปีนผา',
            imageLabel: 'railay_beach'
          }
        ],
        uniqueActivities: [
          {
            title: 'ทัวร์ 4 เกาะกระบี่',
            badge: 'ทะเลและหาดทราย',
            description: 'ล่องเรือหางยาวเที่ยวทะเลแแหวกและเกาะต่างๆ',
            imageLabel: 'four_islands'
          }
        ],
        hiddenGems: [
          {
            title: 'สระมรกต',
            badge: 'สถานที่ลับ',
            description: 'สระน้ำธรรมชาติสีเขียวมรกตใสปิ๊งท่ามกลางป่าดิบชื้น',
            imageLabel: 'emerald_pool'
          }
        ]
      }
    },
    {
      id: 'ayutthaya',
      name: 'พระนครศรีอยุธยา',
      thaiName: 'พระนครศรีอยุธยา',
      overview: 'อดีตราชธานีอันรุ่งเรืองของสยาม ปัจจุบันเป็นเมืองมรดกโลกที่เต็มไปด้วยโบราณสถานอันทรงคุณค่า',
      bestTime: 'พฤศจิกายน ถึง กุมภาพันธ์',
      pillars: {
        mustVisit: [
          {
            title: 'วัดมหาธาตุ',
            badge: 'มรดกโลก',
            description: 'ชมเศียรพระพุทธรูปในรากไม้ จุดเช็คอินระดับโลก',
            imageLabel: 'wat_mahathat'
          }
        ],
        dining: [
          {
            title: 'ตลาดโต้รุ่งอยุธยา',
            badge: 'ตลาดท้องถิ่น',
            description: 'ของกินเล่นสูตรโบราณและกุ้งแม่น้ำเผาตัวใหญ่',
            imageLabel: 'ayutthaya_market'
          }
        ],
        otherExperiences: [
          {
            title: 'อุทยานประวัติศาสตร์พระนครศรีอยุธยา',
            badge: 'สถานที่สำคัญ',
            description: 'สำรวจร่องรอยความเจริญของกรุงศรีอยุธยาผ่านโบราณสถาน',
            imageLabel: 'ayutthaya_park'
          }
        ],
        uniqueActivities: [
          {
            title: 'นั่งช้างชมเมืองเก่า',
            badge: 'กิจกรรมพิเศษ',
            description: 'สัมผัสบรรยากาศย้อนยุคด้วยการนั่งช้างชมโบราณสถาน',
            imageLabel: 'ayutthaya_elephant'
          }
        ],
        hiddenGems: [
          {
            title: 'วัดไชยวัฒนาราม',
            badge: 'สถานที่น่าชม',
            description: 'หนึ่งในวัดที่สวยงามและสมบูรณ์ที่สุดในอยุธยา โดยเฉพาะยามอาทิตย์อัสดง',
            imageLabel: 'wat_chaiwatthanaram'
          }
        ]
      }
    },
    {
      id: 'koh-samui',
      name: 'เกาะสมุย',
      thaiName: 'เกาะสมุย',
      overview: 'เกาะขนาดใหญ่อันดับสองของไทย โดดเด่นด้วยสวนมะพร้าว หาดทรายสวย และรีสอร์ทระดับหรู',
      bestTime: 'ธันวาคม ถึง กันยายน',
      pillars: {
        mustVisit: [
          {
            title: 'วัดพระใหญ่ เกาะสมุย',
            badge: 'สถานที่สำคัญ',
            description: 'พระพุทธรูปองค์ใหญ่สีทองอร่ามที่ตั้งอยู่บนเกาะฟาน',
            imageLabel: 'wat_phra_yai_samui'
          }
        ],
        dining: [
          {
            title: 'Fisherman’s Village (หมู่บ้านชาวประมง)',
            badge: 'แหล่งรวมอาหาร',
            description: 'แหล่งรวมร้านอาหารริมทะเลและถนนคนเดินสุดคึกคัก',
            imageLabel: 'fishermans_village'
          }
        ],
        otherExperiences: [
          {
            title: 'หาดเฉวง',
            badge: 'ทะเลและหาดทราย',
            description: 'หาดทรายที่ยาวและคึกคักที่สุดบนเกาะสมุย',
            imageLabel: 'chaweng_beach'
          }
        ],
        uniqueActivities: [
          {
            title: 'อุทยานแห่งชาติหมู่เกาะอ่างทอง',
            badge: 'ทะเลและธรรมชาติ',
            description: 'หมู่เกาะที่มีทะเลสาบสีมรกตและจุดชมวิวที่สวยที่สุดในอ่าวไทย',
            imageLabel: 'ang_thong_park'
          }
        ],
        hiddenGems: [
          {
            title: 'หาดท้องตะเคียน (Silver Beach)',
            badge: 'สถานที่ลับ',
            description: 'อ่าวเล็กๆ ที่มีความเป็นส่วนตัวและน้ำใสราวกับคริสตัล',
            imageLabel: 'silver_beach'
          }
        ]
      }
    }
  ],
  MM: [
    {
      id: 'bangkok',
      name: 'ဘန်ကောက်',
      thaiName: 'กรุงเทพมหานคร',
      overview: 'ရှေးဟောင်းကိန်းဝပ်ရာ နေရာများနှင့် ခေတ်မီဆန်းသစ်မှုများ ပေါင်းစပ်ထားသော နတ်မင်းကြီးများ၏ မြို့တော်။',
      bestTime: 'နိုဝင်ဘာလမှ မတ်လအထိ',
      pillars: {
        mustVisit: [
          {
            title: 'ဂရန်းပဲလေ့စ် (နန်းတော်)',
            badge: 'အထင်ကရနေရာများ',
            description: 'ထိုင်းဘုရင်များ၏ သမိုင်းဝင်နန်းတော်နှင့် မြရုပ်ပွားတော် ကိန်းဝပ်ရာနေရာ။',
            etiquette: 'တင်းကြပ်သည်- ပုခုံးနှင့် ဒူးများကို ဖုံးအုပ်ထားရမည်။ ကြိုးမပါသော ဖိနပ်များ မစီးရ။',
            imageLabel: 'grand_palace_bangkok'
          },
          {
            title: 'ဘန်ကောက် အမျိုးသားပြတိုက်',
            badge: 'ပြတိုက်များ',
            description: 'အရှေ့တောင်အာရှတွင် အကြီးဆုံးပြတိုက်ဖြစ်ပြီး ထိုင်းအနုပညာနှင့် သမိုင်းကို ပြသထားသည်။',
            imageLabel: 'national_museum_bangkok'
          },
          {
            title: 'Siam Square',
            badge: 'မြို့လယ်ခေါင်',
            description: 'ဘန်ကောက်လူငယ်ယဉ်ကျေးမှုနှင့် ဖက်ရှင်၏ ဗဟိုချက်။',
            imageLabel: 'siam_square'
          }
        ],
        dining: [
          {
            title: 'ကျေးဖိုင် (Jay Fai)',
            badge: 'လမ်းဘေးအစားအစာ',
            description: 'မီးသွေးဖြင့်ချက်ပြုတ်ထားသော ကမ္ဘာကျော် မစ်ရှီလင်းကြယ်ပွင့်ရ ဂဏန်းဥမုန့်။',
            dietary: ['ပင်လယ်စာ အဓိက'],
            imageLabel: 'jay_fai'
          },
          {
            title: 'အောတောကော စျေး (Or Tor Kor)',
            badge: 'ဒေသန္တရစျေး',
            description: 'အရည်အသွေးမြင့် စိုက်ပျိုးရေးထွက်ကုန်များကြောင့် လူသိများသော အဆင့်မြင့်စျေး။',
            imageLabel: 'or_tor_kor'
          }
        ],
        otherExperiences: [
          {
            title: 'Jodd Fairs',
            badge: 'ညစျေး',
            description: 'လမ်းဘေးစာနှင့် ဖက်ရှင်များကြောင့် လူကြိုက်များသော ခေတ်မီညစျေး။',
            imageLabel: 'jodd_fairs'
          },
          {
            title: 'ကျောက်ဖယား အမြန်လှေ',
            badge: 'အများသုံးသယ်ယူပို့ဆောင်ရေး',
            description: 'မြစ်ကမ်းဘေးလူနေမှုကို တွေ့ကြုံခံစားပြီး ဒေသခံများကဲ့သို့ ခရီးသွားပါ။',
            imageLabel: 'chao_phraya_boat'
          }
        ],
        uniqueActivities: [
          {
            title: 'Blue Elephant ဟင်းချက်သင်တန်း',
            badge: 'ဟင်းချက်သင်တန်း',
            description: 'သမိုင်းဝင်နေရာတစ်ခုတွင် ထိုင်းတော်ဝင်ဟင်းလျာများ၏ လျှို့ဝှက်ချက်များကို လေ့လာပါ။',
            imageLabel: 'blue_elephant_cooking'
          },
          {
            title: 'ဘန်ကောက် တူးမြောင်းခရီးစဉ်',
            badge: 'လမ်းလျှောက်ခရီးစဉ်',
            description: 'ငြိမ်သက်သော ရေလမ်းကြောင်းများနှင့် ရိုးရာသစ်သားအိမ်များကို စူးစမ်းပါ။',
            imageLabel: 'canal_tour'
          }
        ],
        hiddenGems: [
          {
            title: 'ဝပ်ဆမ်ဖရန် (နဂါးဘုရား)',
            badge: 'လူသိနည်းသောနေရာများ',
            description: 'နဂါးကြီးပတ်ခွေထားသော ၁၇ ထပ်ရှိ ပန်းရောင်မျှော်စင်။',
            etiquette: 'ငြိမ်သက်စွာ လေ့လာရန် မေတ္တာရပ်ခံသည်။',
            imageLabel: 'wat_sam_phran'
          },
          {
            title: 'အနုပညာရှင်အိမ် (Artist House)',
            badge: 'လူသိနည်းသောနေရာများ',
            description: 'နှစ်ပေါင်းတစ်ရာသက်တမ်းရှိ အိမ်ဟောင်းတစ်ခုဖြစ်ပြီး ယခု ပြခန်းနှင့် ရုပ်သေးပြဇာတ်ရုံ ဖြစ်သည်။',
            imageLabel: 'artist_house'
          }
        ]
      }
    },
    {
      id: 'phuket',
      name: 'ဖူးခက်',
      thaiName: 'ภูเก็ต',
      overview: 'ကမ်းခြေများ၊ ကြည်လင်သောရေပြင်နှင့် သမိုင်းဝင်မြို့ဟောင်းတို့ရှိရာ အန်ဒမันပင်လယ်၏ ပုလဲ။',
      bestTime: 'နိုဝင်ဘာလမှ ဧပြီလအထိ',
      pillars: {
        mustVisit: [
          {
            title: 'ဘုရားကြီး (Big Buddha)',
            badge: 'အထင်ကရနေရာများ',
            description: '၄၅ မီတာမြင့်သော စကျင်ကျောက်ဖြူ ဗုဒ္ဓရုပ်ပွားတော်ကြီး။',
            etiquette: 'ယဉ်ကျေးစွာ ဝတ်ဆင်ရန် လိုအပ်သည်။',
            imageLabel: 'big_buddha_phuket'
          },
          {
            title: 'ဖူးခက်မြို့ဟောင်း',
            badge: 'အမွေအနှစ်',
            description: 'ရောင်စုံစီနို-ပေါ်တူဂီလက်ရာ အိမ်တန်းများနှင့် သမိုင်းဝင်အမွေအနှစ်များ။',
            imageLabel: 'phuket_old_town'
          }
        ],
        dining: [
          {
            title: 'တနင်္ဂနွေ လမ်းလျှောက်စျေး',
            badge: 'လမ်းဘေးအစားအစာ',
            description: 'ဖူးခက်မြို့ရှိ စည်ကားဆုံး အစားအစာနှင့် လက်မှုပညာစျေး။',
            imageLabel: 'phuket_sunday_market'
          },
          {
            title: 'Blue Elephant Phuket',
            badge: 'မူရင်းလက်ရာ',
            description: 'သမိုင်းဝင် အဆောက်အဦးတစ်ခုရှိ အဆင့်မြင့် ထိုင်းတော်ဝင်စားသောက်ဆိုင်။',
            imageLabel: 'blue_elephant_phuket'
          }
        ],
        otherExperiences: [
          {
            title: 'Bangla လမ်း',
            badge: 'ညဘက်အပန်းဖြေမှု',
            description: 'ဖူးခက်ညဘက်အပန်းဖြေမှု၏ ဗဟိုချက်။',
            imageLabel: 'bangla_road'
          }
        ],
        uniqueActivities: [
          {
            title: 'ထိုင်းဟင်းချက်သင်တန်း',
            badge: 'ဟင်းချက်သင်တန်း',
            description: 'ရိုးရာထိုင်းဟင်းလျာများ ချက်ပြုတ်ပုံကို လက်တွေ့လေ့ကျင့်ပါ။',
            imageLabel: 'phuket_cooking_class'
          }
        ],
        hiddenGems: [
          {
            title: 'Banana ကမ်းခြေ',
            badge: 'လူသိနည်းသောနေရာများ',
            description: 'ကြည်လင်သောရေနှင့် ခရီးသွားနည်းသော သီးသန့်ကမ်းခြေ။',
            imageLabel: 'banana_beach'
          }
        ]
      }
    },
    {
      id: 'chiang-mai',
      name: 'ချင်းမိုင်',
      thaiName: 'เชียงใหม่',
      overview: 'မြောက်ပိုင်း၏နှင်းဆီဟု တင်စားရသော လန်နာယဉ်ကျေးမှု၊ တောင်တန်းများနှင့် ရှေးဟောင်းဘုရားကျောင်းများရှိရာနေရာ။',
      bestTime: 'နိုဝင်ဘာလမှ ဖေဖော်ဝါရီလအထိ',
      pillars: {
        mustVisit: [
          {
            title: 'ဒွိုင်ဆုထိပ် ဘုရား',
            badge: 'အထင်ကရနေရာများ',
            description: 'တောင်ပေါ်တွင် တည်ရှိပြီး မြို့မြင်ကွင်းကို ကြည့်ရှုနိုင်သော ရွှေရောင်စေတီတော်။',
            etiquette: 'ယဉ်ကျေးစွာ ဝတ်ဆင်ရန် လိုအပ်သည်။',
            imageLabel: 'doi_suthep'
          },
          {
            title: 'Tha Phae Gate',
            badge: 'မြို့ရင်ပြင်',
            description: 'မြို့ဟောင်း၏ သမိုင်းဝင်ဝင်ပေါက်နှင့် လူစည်ကားရာနေရာ။',
            imageLabel: 'tha_phae_gate'
          }
        ],
        dining: [
          {
            title: 'Khao Soi Mae Sai',
            badge: 'လမ်းဘေးအစားအစာ',
            description: 'မြောက်ပိုင်းထိုင်းရိုးရာ ကာရီခေါက်ဆွဲ။',
            imageLabel: 'khao_soi_mae_sai'
          }
        ],
        otherExperiences: [
          {
            title: 'Wua Lai လမ်းလျှောက်စျေး',
            badge: 'ဒေသထွက်လက်မှုပညာ',
            description: 'ငွေထည်နှင့် လက်မှုပညာများကြောင့် ကျော်ကြားသော စနေနေ့စျေး။',
            imageLabel: 'silver_street'
          }
        ],
        uniqueActivities: [
          {
            title: 'Pantawan ဟင်းချက်သင်တန်း',
            badge: 'ဟင်းချက်သင်တန်း',
            description: 'လှပသော ကျွန်းသစ်အိမ်ကြီးတွင် လန်နာဟင်းလျာများကို လေ့လာပါ။',
            imageLabel: 'pantawan_cooking'
          }
        ],
        hiddenGems: [
          {
            title: 'ဝပ်ဖလပ် (Wat Pha Lat)',
            badge: 'လူသိနည်းသောနေရာများ',
            description: 'တောင်ပေါ်ရှိ တောအုပ်အတွင်း ကိန်းဝပ်နေသော ငြိမ်သက်သည့် ဘုရားကျောင်း။',
            imageLabel: 'wat_pha_lat'
          }
        ]
      }
    },
    {
      id: 'pattaya',
      name: 'ပတ္တယား',
      thaiName: 'พัทยา',
      overview: 'ဖျော်ဖြေရေးမျိုးစုံနှင့် ကျွန်းစုများကြောင့် လူသိများသော ကမ်းရိုးတန်းမြို့။',
      bestTime: 'နိုဝင်ဘာလမှ မတ်လအထိ',
      pillars: {
        mustVisit: [
          {
            title: 'အမှန်တရား ရဲတိုက် (Sanctuary of Truth)',
            badge: 'အထင်ကရနေရာများ',
            description: 'အနုစိတ်လက်ရာများဖြင့် ထုလုပ်ထားသော သစ်သားအဆောက်အဦးကြီး။',
            imageLabel: 'sanctuary_of_truth'
          }
        ],
        dining: [
          {
            title: 'The Sky Gallery',
            badge: 'ကဖေးယဉ်ကျေးမှု',
            description: 'ပင်လယ်မြင်ကွင်းနှင့်အတူ စားသောက်နိုင်သော နေရာ။',
            imageLabel: 'sky_gallery_pattaya'
          }
        ],
        otherExperiences: [
          {
            title: 'Pattaya Walking Street',
            badge: 'ညဘက်အပန်းဖြေမှု',
            description: 'ညဘက်တွင် အလွန်စည်ကားသော ဖျော်ဖြေရေးနယ်မြေ။',
            imageLabel: 'pattaya_walking_street'
          }
        ],
        uniqueActivities: [
          {
            title: 'Koh Larn ကျွန်း ခရီးစဉ်',
            badge: 'သဘာဝ',
            description: 'ကြည်လင်သောရေနှင့် ကမ်းခြေများကို စူးစမ်းပါ။',
            imageLabel: 'koh_larn'
          }
        ],
        hiddenGems: [
          {
            title: 'ပတ္တယား ရေပေါ်စျေး',
            badge: 'လူသိနည်းသောနေရာများ',
            description: 'မြစ်ကမ်းဘေးလူနေမှုပုံစံနှင့် ဒေသထွက်ပစ္စည်းများ။',
            imageLabel: 'pattaya_floating_market'
          }
        ]
      }
    },
    {
      id: 'krabi',
      name: 'ခရာဘီ',
      thaiName: 'กระบี่',
      overview: 'ထုံးကျောက်တောင်ကြီးများ၊ ကြည်လင်သော ရေအိုင်များနှင့် ကျောက်တောင်တက်ခြင်းကြောင့် ကျော်ကြားသော နေရာ။',
      bestTime: 'နိုဝင်ဘာလမှ ဧပြီလအထိ',
      pillars: {
        mustVisit: [
          {
            title: 'ကျားဂူဘုရား (Tiger Cave Temple)',
            badge: 'အထင်ကရနေရာများ',
            description: 'လှပသော မြင်ကွင်းကို ကြည့်ရှုရန် လှေကား ၁,၂၃၇ ထပ် တက်ရသော ဘုရားကျောင်း။',
            imageLabel: 'tiger_cave_krabi'
          }
        ],
        dining: [
          {
            title: 'ခရာဘီ ညစျေး',
            badge: 'လမ်းဘေးအစားအစာ',
            description: 'တောင်ပိုင်းထိုင်းအရသာနှင့် လတ်ဆတ်သော ပင်လယ်စာများ။',
            imageLabel: 'krabi_night_market'
          }
        ],
        otherExperiences: [
          {
            title: 'Railay ကမ်းခြေ',
            badge: 'သဘာဝ',
            description: 'လှေဖြင့်သာ သွားလာနိုင်ပြီး ကျောက်တောင်တက်ခြင်းကြောင့် ကျော်ကြားသည်။',
            imageLabel: 'railay_beach'
          }
        ],
        uniqueActivities: [
          {
            title: 'ကျွန်း ၄ ကျွန်း ခရီးစဉ်',
            badge: 'သဘာဝ',
            description: 'ရိုးရာစက်လှေဖြင့် ကျွန်းများကို လှည့်လည်ကြည့်ရှုပါ။',
            imageLabel: 'four_islands'
          }
        ],
        hiddenGems: [
          {
            title: 'Emerald Pool',
            badge: 'လူသိနည်းသောနေရာများ',
            description: 'တောအုပ်အတွင်းရှိ သဘာဝရေပူစမ်း။',
            imageLabel: 'emerald_pool'
          }
        ]
      }
    },
    {
      id: 'ayutthaya',
      name: 'အယုဓျာ',
      thaiName: 'พระนครศรีอยုธยา',
      overview: 'ရှေးဟောင်းအဆောက်အဦးပျက်များစုဝေးရာ ယူနက်စကို ကမ္ဘာ့အမွေအနှစ်နေရာဖြစ်သော ယခင်ထိုင်းမြို့တော်ဟောင်း။',
      bestTime: 'နိုဝင်ဘာလမှ ဖေဖော်ဝါရီလအထိ',
      pillars: {
        mustVisit: [
          {
            title: 'Wat Mahathat',
            badge: 'အထင်ကရနေရာများ',
            description: 'ညောင်ပင်မြစ်များကြားရှိ ဗုဒ္ဓရုပ်ပွားတော် ဦးခေါင်းကြောင့် ကျော်ကြားသည်။',
            imageLabel: 'wat_mahathat'
          }
        ],
        dining: [
          {
            title: 'အယုဓျာ ညစျေး',
            badge: 'ဒေသန္တရစျေး',
            description: 'ရိုးရာမုန့်များနှင့် မြစ်ပုစွန်ကြီးများ။',
            imageLabel: 'ayutthaya_market'
          }
        ],
        otherExperiences: [
          {
            title: 'အယုဓျာ သမိုင်းဝင်ပန်းခြံ',
            badge: 'အမွေအနှစ်',
            description: 'ရှေးဟောင်း ယိုးဒယားမြို့တော်၏ အကြွင်းအကျန်များကို စူးစမ်းပါ။',
            imageLabel: 'ayutthaya_park'
          }
        ],
        uniqueActivities: [
          {
            title: 'ဆင်စီးခရီးစဉ်',
            badge: 'ယဉ်ကျေးမှု',
            description: 'ရှေးဟောင်းနေရာများကို ဆင်စီး၍ လေ့လာပါ။',
            imageLabel: 'ayutthaya_elephant'
          }
        ],
        hiddenGems: [
          {
            title: 'Wat Chaiwatthanaram',
            badge: 'လူသိနည်းသောနေရာများ',
            description: 'အယုဓျာရှိ အလှပဆုံးနှင့် အကောင်းဆုံးထိန်းသိမ်းထားသော ဘုရားကျောင်းများထဲမှတစ်ခု။',
            imageLabel: 'wat_chaiwatthanaram'
          }
        ]
      }
    },
    {
      id: 'koh-samui',
      name: 'ဂေါ့စမွီ (Koh Samui)',
      thaiName: 'เกาะสมุย',
      overview: 'အုန်းတောများ၊ ကမ်းခြေများနှင့် အဆင့်မြင့်ဟိုတယ်များရှိရာ ထိုင်းနိုင်ငံ၏ ဒုတိယအကြီးဆုံးကျွန်း။',
      bestTime: 'ဒီဇင်ဘာလမှ စက်တင်ဘာလအထိ',
      pillars: {
        mustVisit: [
          {
            title: 'ဘုရားကြီးကျောင်း (Big Buddha)',
            badge: 'အထင်ကရနေရာများ',
            description: 'ကျောက်ဆောင်ကျွန်းလေးပေါ်ရှိ ၁၂ မီတာမြင့်သော ရွှေရောင်ဗုဒ္ဓရုပ်ပွားတော်။',
            imageLabel: 'wat_phra_yai_samui'
          }
        ],
        dining: [
          {
            title: 'တံငါသည်ရွာ (Fisherman’s Village)',
            badge: 'စားသောက်ရေးအတွေ့အကြုံ',
            description: 'ကမ်းခြေဘေး စားသောက်ဆိုင်များနှင့် ဆိုင်ခန်းများရှိရာ နေရာ။',
            imageLabel: 'fishermans_village'
          }
        ],
        otherExperiences: [
          {
            title: 'Chaweng ကမ်းခြေ',
            badge: 'သဘာဝ',
            description: 'ကျွန်းပေါ်တွင် အရှည်ဆုံးနှင့် အစည်ကားဆုံး ကမ်းခြေ။',
            imageLabel: 'chaweng_beach'
          }
        ],
        uniqueActivities: [
          {
            title: 'အန်ထောင် အဏ္ဏဝါပန်းခြံ (Ang Thong)',
            badge: 'သဘာဝ',
            description: 'ကျွန်းစုပေါင်း ၄၂ ကျွန်းရှိသော ရေပြင်ပန်းခြံ။',
            imageLabel: 'ang_thong_park'
          }
        ],
        hiddenGems: [
          {
            title: 'Silver ကမ်းခြေ',
            badge: 'လူသိနည်းသောနေရာများ',
            description: 'ငြိမ်သက်သောရေပြင်နှင့် သဲသောင်ပြင်ရှိသည့် သီးသန့်နေရာလေး။',
            imageLabel: 'silver_beach'
          }
        ]
      }
    }
  ],
  ES: [
    {
      id: 'bangkok',
      name: 'Bangkok',
      thaiName: 'กรุงเทพมหานคร',
      overview: 'La Ciudad de los Ángeles, donde los templos antiguos se encuentran con la ultramodernidad en un vibrante paisaje sensorial.',
      bestTime: 'Noviembre a Marzo',
      pillars: {
        mustVisit: [
          {
            title: 'El Gran Palacio',
            badge: 'Landmarks',
            description: 'La espectacular casa ceremonial de los reyes tailandeses y el Templo del Buda de Esmeralda.',
            etiquette: 'Etiqueta: Estricta: los hombros y las rodillas deben estar cubiertos. No se permiten sandalias sin correas.',
            imageLabel: 'grand_palace_bangkok'
          },
          {
            title: 'Museo Nacional de Bangkok',
            badge: 'Museums',
            description: 'El museo más grande del sudeste asiático, que muestra el arte y la historia tailandeses.',
            imageLabel: 'national_museum_bangkok'
          },
          {
            title: 'Siam Square',
            badge: 'City Center',
            description: 'El corazón de la cultura juvenil y la moda de Bangkok.',
            imageLabel: 'siam_square'
          }
        ],
        dining: [
          {
            title: 'Jay Fai',
            badge: 'Street Food',
            description: 'La mundialmente famosa tortilla de carne de cangrejo con estrella Michelin cocinada al carbón.',
            dietary: ['Seafood focus'],
            imageLabel: 'jay_fai'
          },
          {
            title: 'Mercado Or Tor Kor',
            badge: 'Local Market',
            description: 'Mercado de productos frescos de lujo conocido por sus productos agrícolas de la más alta calidad.',
            imageLabel: 'or_tor_kor'
          }
        ],
        otherExperiences: [
          {
            title: 'Jodd Fairs',
            badge: 'Night Market',
            description: 'Un moderno mercado nocturno popular por su comida callejera y moda vintage.',
            imageLabel: 'jodd_fairs'
          },
          {
            title: 'Barco expreso del río Chao Phraya',
            badge: 'Public Transport',
            description: 'Experimente la vida del río y evite el tráfico como un local.',
            imageLabel: 'chao_phraya_boat'
          }
        ],
        uniqueActivities: [
          {
            title: 'Escuela de cocina Blue Elephant',
            badge: 'Cooking Class',
            description: 'Aprenda los secretos de la cocina real tailandesa en un entorno histórico.',
            imageLabel: 'blue_elephant_cooking'
          },
          {
            title: 'Tour por los canales ocultos de Bangkok',
            badge: 'Walking Tour',
            description: 'Explore los remansos tranquilos y las casas tradicionales de madera.',
            imageLabel: 'canal_tour'
          }
        ],
        hiddenGems: [
          {
            title: 'Wat Sam Phran',
            badge: 'Hidden Gem',
            description: 'Una torre rosa de 17 pisos con un enorme dragón en espiral a su alrededor.',
            etiquette: 'Se solicita contemplación silenciosa.',
            imageLabel: 'wat_sam_phran'
          },
          {
            title: 'Baan Silapin (Casa del Artista)',
            badge: 'Hidden Gem',
            description: 'Una casa centenaria convertida en galería y teatro de marionetas.',
            imageLabel: 'artist_house'
          }
        ]
      }
    },
    {
      id: 'phuket',
      name: 'Phuket',
      thaiName: 'ภูเก็ต',
      overview: 'La Perla de Andamán, sinónimo de arenas blancas, aguas cristalinas y el encanto del casco antiguo histórico.',
      bestTime: 'Noviembre a Abril',
      pillars: {
        mustVisit: [
          {
            title: 'Gran Buda',
            badge: 'Landmarks',
            description: 'Una estatua de mármol blanco de 45 metros de altura que ofrece vistas panorámicas.',
            etiquette: 'Se requiere vestimenta modesta.',
            imageLabel: 'big_buddha_phuket'
          },
          {
            title: 'Casco antiguo de Phuket',
            badge: 'Heritage',
            description: 'Coloridas casas comerciales sino-portuguesas y patrimonio histórico.',
            imageLabel: 'phuket_old_town'
          }
        ],
        dining: [
          {
            title: 'Mercado callejero dominical',
            badge: 'Street Food',
            description: 'El mercado de comida y artesanía más vibrante de la ciudad de Phuket.',
            imageLabel: 'phuket_sunday_market'
          },
          {
            title: 'Blue Elephant Phuket',
            badge: 'Authentic',
            description: 'Cena elegante en una histórica mansión del gobernador.',
            imageLabel: 'blue_elephant_phuket'
          }
        ],
        otherExperiences: [
          {
            title: 'Bangla Road',
            badge: 'Nightlife',
            description: 'El centro de la vida nocturna de Phuket con discotecas y bares.',
            imageLabel: 'bangla_road'
          }
        ],
        uniqueActivities: [
          {
            title: 'Academia de cocina tailandesa',
            badge: 'Cooking Class',
            description: 'Formación práctica en platos tradicionales tailandeses.',
            imageLabel: 'phuket_cooking_class'
          }
        ],
        hiddenGems: [
          {
            title: 'Banana Beach',
            badge: 'Hidden Gem',
            description: 'Una playa aislada con agua cristalina y menos turistas.',
            imageLabel: 'banana_beach'
          }
        ]
      }
    },
    {
      id: 'chiang-mai',
      name: 'Chiang Mai',
      thaiName: 'เชียงใหม่',
      overview: 'La Rosa del Norte, un santuario de la cultura Lanna, montañas brumosas y templos centenarios.',
      bestTime: 'Noviembre a Febrero',
      pillars: {
        mustVisit: [
          {
            title: 'Wat Phra That Doi Suthep',
            badge: 'Landmarks',
            description: 'Una pagoda dorada encaramada en una montaña con vistas a la ciudad.',
            etiquette: 'Se requiere vestimenta modesta.',
            imageLabel: 'doi_suthep'
          },
          {
            title: 'Puerta Tha Phae',
            badge: 'Public Square',
            description: 'La entrada histórica a la ciudad vieja y un centro social.',
            imageLabel: 'tha_phae_gate'
          }
        ],
        dining: [
          {
            title: 'Khao Soi Mae Sai',
            badge: 'Street Food',
            description: 'Fideos al curry tradicionales del norte de Tailandia.',
            imageLabel: 'khao_soi_mae_sai'
          }
        ],
        otherExperiences: [
          {
            title: 'Calle de peatones Wua Lai',
            badge: 'Local Crafts',
            description: 'Famoso mercado de los sábados conocido por la platería y la artesanía.',
            imageLabel: 'silver_street'
          }
        ],
        uniqueActivities: [
          {
            title: 'Escuela de cocina Pantawan',
            badge: 'Cooking Class',
            description: 'Aprenda cocina Lanna en una hermosa casa de teca.',
            imageLabel: 'pantawan_cooking'
          }
        ],
        hiddenGems: [
          {
            title: 'Wat Pha Lat',
            badge: 'Hidden Gem',
            description: 'Un tranquilo templo en la jungla escondido en la montaña.',
            imageLabel: 'wat_pha_lat'
          }
        ]
      }
    },
    {
      id: 'pattaya',
      name: 'Pattaya',
      thaiName: 'พัทยา',
      overview: 'Una vibrante ciudad costera conocida por su diversa oferta de entretenimiento, atracciones familiares y escapadas a las islas.',
      bestTime: 'Noviembre a Marzo',
      pillars: {
        mustVisit: [
          {
            title: 'Santuario de la Verdad',
            badge: 'Landmarks',
            description: 'Un enorme pabellón de madera lleno de intrincadas tallas.',
            imageLabel: 'sanctuary_of_truth'
          }
        ],
        dining: [
          {
            title: 'The Sky Gallery',
            badge: 'Cafe Culture',
            description: 'Cena en un acantilado con impresionantes vistas al golfo de Tailandia.',
            imageLabel: 'sky_gallery_pattaya'
          }
        ],
        otherExperiences: [
          {
            title: 'Walking Street',
            badge: 'Nightlife',
            description: 'Famoso distrito de entretenimiento después del anochecer.',
            imageLabel: 'pattaya_walking_street'
          }
        ],
        uniqueActivities: [
          {
            title: 'Excursión de un día a Koh Larn',
            badge: 'Nature',
            description: 'Explore aguas cristalinas y playas en una isla cercana.',
            imageLabel: 'koh_larn'
          }
        ],
        hiddenGems: [
          {
            title: 'Mercado flotante de Pattaya',
            badge: 'Hidden Gem',
            description: 'Auténtica vida junto al río y artesanías locales.',
            imageLabel: 'pattaya_floating_market'
          }
        ]
      }
    },
    {
      id: 'krabi',
      name: 'Krabi',
      thaiName: 'กระบี่',
      overview: 'Una provincia de impresionantes acantilados de piedra caliza, lagunas esmeralda y escalada de clase mundial.',
      bestTime: 'Noviembre a Abril',
      pillars: {
        mustVisit: [
          {
            title: 'Templo de la Cueva del Tigre',
            badge: 'Landmarks',
            description: 'Un sitio espiritual que requiere una subida de 1.237 escalones para una gran vista.',
            imageLabel: 'tiger_cave_krabi'
          }
        ],
        dining: [
          {
            title: 'Mercado nocturno de Krabi',
            badge: 'Street Food',
            description: 'Sabores locales del sur de Tailandia y mercado de mariscos frescos.',
            imageLabel: 'krabi_night_market'
          }
        ],
        otherExperiences: [
          {
            title: 'Playa Railay',
            badge: 'Nature',
            description: 'Accesible solo en barco, famosa por la escalada en roca.',
            imageLabel: 'railay_beach'
          }
        ],
        uniqueActivities: [
          {
            title: 'Tour de las cuatro islas',
            badge: 'Nature',
            description: 'Tour tradicional en barco de cola larga por las islas.',
            imageLabel: 'four_islands'
          }
        ],
        hiddenGems: [
          {
            title: 'Piscina Esmeralda',
            badge: 'Hidden Gem',
            description: 'Una fuente termal natural con agua turquesa en el bosque.',
            imageLabel: 'emerald_pool'
          }
        ]
      }
    },
    {
      id: 'ayutthaya',
      name: 'Ayutthaya',
      thaiName: 'พระนครศรีอยုธยา',
      overview: 'La antigua capital del Reino de Tailandia, ahora un sitio del Patrimonio Mundial de la UNESCO lleno de ruinas en expansión.',
      bestTime: 'Noviembre a Febrero',
      pillars: {
        mustVisit: [
          {
            title: 'Wat Mahathat',
            badge: 'Landmarks',
            description: 'Famoso por la cabeza de Buda de piedra entrelazada en las raíces de los árboles.',
            imageLabel: 'wat_mahathat'
          }
        ],
        dining: [
          {
            title: 'Mercado nocturno de Ayutthaya',
            badge: 'Local Market',
            description: 'Deliciosos bocadillos tradicionales y langostinos gigantes de río.',
            imageLabel: 'ayutthaya_market'
          }
        ],
        otherExperiences: [
          {
            title: 'Parque Histórico de Ayutthaya',
            badge: 'Heritage',
            description: 'Explore las ruinas de la antigua capital tailandesa.',
            imageLabel: 'ayutthaya_park'
          }
        ],
        uniqueActivities: [
          {
            title: 'Tour Elephant World',
            badge: 'Culture',
            description: 'Interacción ecológica y ruinas históricas.',
            imageLabel: 'ayutthaya_elephant'
          }
        ],
        hiddenGems: [
          {
            title: 'Wat Chaiwatthanaram',
            badge: 'Hidden Gem',
            description: 'Uno de los templos mejor conservados y más bellos de Ayutthaya.',
            imageLabel: 'wat_chaiwatthanaram'
          }
        ]
      }
    },
    {
      id: 'koh-samui',
      name: 'Koh Samui',
      thaiName: 'เกาะสมุย',
      overview: 'La segunda isla más grande de Tailandia, conocida por sus playas bordeadas de palmeras, cocoteros y complejos turísticos de lujo.',
      bestTime: 'Diciembre a Septiembre',
      pillars: {
        mustVisit: [
          {
            title: 'Templo del Gran Buda',
            badge: 'Landmarks',
            description: 'Una estatua dorada de 12 metros en una pequeña isla rocosa.',
            imageLabel: 'wat_phra_yai_samui'
          }
        ],
        dining: [
          {
            title: 'Fisherman’s Village',
            badge: 'Dining Experience',
            description: 'Una zona moderna con restaurantes frente al mar y boutiques.',
            imageLabel: 'fishermans_village'
          }
        ],
        otherExperiences: [
          {
            title: 'Playa Chaweng',
            badge: 'Nature',
            description: 'La playa más larga y animada de la isla.',
            imageLabel: 'chaweng_beach'
          }
        ],
        uniqueActivities: [
          {
            title: 'Parque Marino Ang Thong',
            badge: 'Nature',
            description: 'Un archipiélago prístino de 42 islas con lagunas color esmeralda.',
            imageLabel: 'ang_thong_park'
          }
        ],
        hiddenGems: [
          {
            title: 'Silver Beach',
            badge: 'Hidden Gem',
            description: 'Una cala pequeña y aislada con arena fina y agua tranquila.',
            imageLabel: 'silver_beach'
          }
        ]
      }
    }
  ],
  FR: [
    {
      id: 'bangkok',
      name: 'Bangkok',
      thaiName: 'กรุงเทพมหานคร',
      overview: 'La Cité des Anges, où les sanctuaires anciens rencontrent l\'ultra-modernité dans un paysage sensoriel dynamique.',
      bestTime: 'Novembre à Mars',
      pillars: {
        mustVisit: [
          {
            title: 'Le Grand Palais',
            badge: 'Landmarks',
            description: 'La demeure cérémonielle spectaculaire des rois thaïlandais et le temple du Bouddha d\'Émeraude.',
            etiquette: 'Étiquette : Stricte : les épaules et les genoux doivent être couverts. Pas de sandales sans sangles.',
            imageLabel: 'grand_palace_bangkok'
          },
          {
            title: 'Musée National de Bangkok',
            badge: 'Museums',
            description: 'Le plus grand musée d\'Asie du Sud-Est, présentant l\'art et l\'histoire de la Thaïlande.',
            imageLabel: 'national_museum_bangkok'
          },
          {
            title: 'Siam Square',
            badge: 'City Center',
            description: 'Le cœur de la culture de la jeunesse et de la mode de Bangkok.',
            imageLabel: 'siam_square'
          }
        ],
        dining: [
          {
            title: 'Jay Fai',
            badge: 'Street Food',
            description: 'Célèbre omelette au crabe étoilée au Michelin, cuite au charbon de bois.',
            dietary: ['Seafood focus'],
            imageLabel: 'jay_fai'
          },
          {
            title: 'Marché Or Tor Kor',
            badge: 'Local Market',
            description: 'Marché de produits frais haut de gamme connu pour ses produits agricoles de la plus haute qualité.',
            imageLabel: 'or_tor_kor'
          }
        ],
        otherExperiences: [
          {
            title: 'Jodd Fairs',
            badge: 'Night Market',
            description: 'Un marché nocturne branché populaire pour sa cuisine de rue et sa mode vintage.',
            imageLabel: 'jodd_fairs'
          },
          {
            title: 'Bateau express Chao Phraya',
            badge: 'Public Transport',
            description: 'Découvrez la vie du fleuve et évitez le trafic comme un local.',
            imageLabel: 'chao_phraya_boat'
          }
        ],
        uniqueActivities: [
          {
            title: 'École de cuisine Blue Elephant',
            badge: 'Cooking Class',
            description: 'Apprenez les secrets de la cuisine royale thaïlandaise dans un cadre historique.',
            imageLabel: 'blue_elephant_cooking'
          },
          {
            title: 'Visite des canaux cachés de Bangkok',
            badge: 'Walking Tour',
            description: 'Explorez les backwaters tranquilles et les maisons traditionnelles en bois.',
            imageLabel: 'canal_tour'
          }
        ],
        hiddenGems: [
          {
            title: 'Wat Sam Phran',
            badge: 'Hidden Gem',
            description: 'Une tour rose de 17 étages avec un énorme dragon enroulé autour d\'elle.',
            etiquette: 'Contemplation silencieuse demandée.',
            imageLabel: 'wat_sam_phran'
          },
          {
            title: 'Baan Silapin (Maison de l\'Artiste)',
            badge: 'Hidden Gem',
            description: 'Une maison centenaire transformée en galerie et théâtre de marionnettes.',
            imageLabel: 'artist_house'
          }
        ]
      }
    },
    {
      id: 'phuket',
      name: 'Phuket',
      thaiName: 'ภูเก็ต',
      overview: 'La Perle de l\'Andaman, synonyme de sable blanc, d\'eaux cristallines et du charme historique de la vieille ville.',
      bestTime: 'Novembre à Avril',
      pillars: {
        mustVisit: [
          {
            title: 'Grand Bouddha',
            badge: 'Sites emblématiques',
            description: 'Une statue en marbre blanc de 45 mètres de haut offrant des vues panoramiques.',
            etiquette: 'Tenue correcte exigée.',
            imageLabel: 'big_buddha_phuket'
          },
          {
            title: 'Vieille ville de Phuket',
            badge: 'Patrimoine',
            description: 'Boutiques sino-portugaises colorées et patrimoine historique.',
            imageLabel: 'phuket_old_town'
          }
        ],
        dining: [
          {
            title: 'Marché dominical de la rue piétonne',
            badge: 'Street Food',
            description: 'Le marché alimentaire et artisanal le plus dynamique de la ville de Phuket.',
            imageLabel: 'phuket_sunday_market'
          },
          {
            title: 'Blue Elephant Phuket',
            badge: 'Authentique',
            description: 'Cuisine raffinée dans un manoir historique de gouverneur.',
            imageLabel: 'blue_elephant_phuket'
          }
        ],
        otherExperiences: [
          {
            title: 'Bangla Road',
            badge: 'Vie nocturne',
            description: 'Le centre de la vie nocturne de Phuket avec ses clubs et bars.',
            imageLabel: 'bangla_road'
          }
        ],
        uniqueActivities: [
          {
            title: 'Thai Cooking Academy',
            badge: 'Cours de cuisine',
            description: 'Formation pratique aux plats traditionnels thaïlandais.',
            imageLabel: 'phuket_cooking_class'
          }
        ],
        hiddenGems: [
          {
            title: 'Banana Beach',
            badge: 'Trésor caché',
            description: 'Une plage isolée aux eaux cristallines et moins fréquentée par les touristes.',
            imageLabel: 'banana_beach'
          }
        ]
      }
    },
    {
      id: 'chiang-mai',
      name: 'Chiang Mai',
      thaiName: 'เชียงใหม่',
      overview: 'La Rose du Nord, un sanctuaire de la culture Lanna, des montagnes brumeuses et des temples séculaires.',
      bestTime: 'Novembre à Février',
      pillars: {
        mustVisit: [
          {
            title: 'Wat Phra That Doi Suthep',
            badge: 'Sites emblématiques',
            description: 'Une pagode dorée perchée sur une montagne avec vue sur la ville.',
            etiquette: 'Tenue correcte exigée.',
            imageLabel: 'doi_suthep'
          },
          {
            title: 'Porte Tha Phae',
            badge: 'Place publique',
            description: 'L\'entrée historique de la vieille ville et un centre social.',
            imageLabel: 'tha_phae_gate'
          }
        ],
        dining: [
          {
            title: 'Khao Soi Mae Sai',
            badge: 'Street Food',
            description: 'Nouilles au curry thaïlandaises du Nord traditionnelles.',
            imageLabel: 'khao_soi_mae_sai'
          }
        ],
        otherExperiences: [
          {
            title: 'Rue piétonne Wua Lai',
            badge: 'Artisanat local',
            description: 'Célèbre marché du samedi connu pour l\'argenterie et l\'artisanat.',
            imageLabel: 'silver_street'
          }
        ],
        uniqueActivities: [
          {
            title: 'École de cuisine Pantawan',
            badge: 'Cours de cuisine',
            description: 'Apprenez la cuisine Lanna dans une magnifique maison en teck.',
            imageLabel: 'pantawan_cooking'
          }
        ],
        hiddenGems: [
          {
            title: 'Wat Pha Lat',
            badge: 'Trésor caché',
            description: 'Un temple paisible dans la jungle niché dans la montagne.',
            imageLabel: 'wat_pha_lat'
          }
        ]
      }
    },
    {
      id: 'pattaya',
      name: 'Pattaya',
      thaiName: 'พัทยา',
      overview: 'Une ville côtière dynamique connue pour ses divertissements diversifiés, ses attractions familiales et ses escapades insulaires.',
      bestTime: 'Novembre à Mars',
      pillars: {
        mustVisit: [
          {
            title: 'Sanctuaire de la Vérité',
            badge: 'Sites emblématiques',
            description: 'Un immense pavillon en bois rempli de sculptures complexes.',
            imageLabel: 'sanctuary_of_truth'
          }
        ],
        dining: [
          {
            title: 'The Sky Gallery',
            badge: 'Culture du café',
            description: 'Dîner à flanc de falaise avec une vue imprenable sur le golfe de Thaïlande.',
            imageLabel: 'sky_gallery_pattaya'
          }
        ],
        otherExperiences: [
          {
            title: 'Walking Street',
            badge: 'Vie nocturne',
            description: 'Quartier de divertissement de renommée mondiale après la tombée de la nuit.',
            imageLabel: 'pattaya_walking_street'
          }
        ],
        uniqueActivities: [
          {
            title: 'Excursion d\'une journée à Koh Larn',
            badge: 'Nature',
            description: 'Explorez les eaux cristallines et les plages d\'une île voisine.',
            imageLabel: 'koh_larn'
          }
        ],
        hiddenGems: [
          {
            title: 'Marché flottant de Pattaya',
            badge: 'Trésor caché',
            description: 'Vie authentique au bord du fleuve et artisanat local.',
            imageLabel: 'pattaya_floating_market'
          }
        ]
      }
    },
    {
      id: 'krabi',
      name: 'Krabi',
      thaiName: 'กระบี่',
      overview: 'Une province aux falaises de calcaire imprenables, aux lagons d\'émeraude et à l\'escalade de classe mondiale.',
      bestTime: 'Novembre à Avril',
      pillars: {
        mustVisit: [
          {
            title: 'Temple de la grotte du tigre',
            badge: 'Sites emblématiques',
            description: 'Un site spirituel nécessitant une ascension de 1 237 marches pour une vue imprenable.',
            imageLabel: 'tiger_cave_krabi'
          }
        ],
        dining: [
          {
            title: 'Marché nocturne de Krabi',
            badge: 'Street Food',
            description: 'Saveurs locales du sud de la Thaïlande et marché de fruits de mer frais.',
            imageLabel: 'krabi_night_market'
          }
        ],
        otherExperiences: [
          {
            title: 'Plage de Railay',
            badge: 'Nature',
            description: 'Accessible uniquement par bateau, célèbre pour l\'escalade.',
            imageLabel: 'railay_beach'
          }
        ],
        uniqueActivities: [
          {
            title: 'Tour des quatre îles',
            badge: 'Nature',
            description: 'Tour traditionnel en bateau à longue queue des îles.',
            imageLabel: 'four_islands'
          }
        ],
        hiddenGems: [
          {
            title: 'Piscine d\'émeraude',
            badge: 'Trésor caché',
            description: 'Une source thermale naturelle aux eaux turquoise dans la forêt.',
            imageLabel: 'emerald_pool'
          }
        ]
      }
    },
    {
      id: 'ayutthaya',
      name: 'Ayutthaya',
      thaiName: 'พระนครศรีอยุธยา',
      overview: 'L\'ancienne capitale du royaume de Siam, aujourd\'hui classée au patrimoine mondial de l\'UNESCO, regorgeant de ruines étendues.',
      bestTime: 'Novembre à Febrero',
      pillars: {
        mustVisit: [
          {
            title: 'Wat Mahathat',
            badge: 'Sites emblématiques',
            description: 'Célèbre pour la tête de Bouddha en pierre enlacée dans les racines des arbres.',
            imageLabel: 'wat_mahathat'
          }
        ],
        dining: [
          {
            title: 'Marché nocturne d\'Ayutthaya',
            badge: 'Marché local',
            description: 'Délicieux en-cas traditionnels et crustacés géants de rivière.',
            imageLabel: 'ayutthaya_market'
          }
        ],
        otherExperiences: [
          {
            title: 'Parc historique d\'Ayutthaya',
            badge: 'Patrimoine',
            description: 'Explorez les ruines de l\'ancienne capitale siamoise.',
            imageLabel: 'ayutthaya_park'
          }
        ],
        uniqueActivities: [
          {
            title: 'Tour Elephant World',
            badge: 'Culture',
            description: 'Interaction respectueuse de l\'environnement et ruines historiques.',
            imageLabel: 'ayutthaya_elephant'
          }
        ],
        hiddenGems: [
          {
            title: 'Wat Chaiwatthanaram',
            badge: 'Trésor caché',
            description: 'L\'un des temples les mieux conservés et les plus beaux d\'Ayutthaya.',
            imageLabel: 'wat_chaiwatthanaram'
          }
        ]
      }
    },
    {
      id: 'koh-samui',
      name: 'Koh Samui',
      thaiName: 'เกาะสมุย',
      overview: 'La deuxième plus grande île de Thaïlande, connue pour ses plages bordées de palmiers, ses cocoteraies et ses complexes de luxe.',
      bestTime: 'Décembre à Septembre',
      pillars: {
        mustVisit: [
          {
            title: 'Temple du Grand Bouddha',
            badge: 'Sites emblématiques',
            description: 'Une statue dorée de 12 mètres sur une petite île rocheuse.',
            imageLabel: 'wat_phra_yai_samui'
          }
        ],
        dining: [
          {
            title: 'Village de pêcheurs',
            badge: 'Expérience culinaire',
            description: 'Un quartier branché avec des restaurants en bord de mer et des boutiques.',
            imageLabel: 'fishermans_village'
          }
        ],
        otherExperiences: [
          {
            title: 'Plage de Chaweng',
            badge: 'Nature',
            description: 'La plage la plus longue et la plus animée de l\'île.',
            imageLabel: 'chaweng_beach'
          }
        ],
        uniqueActivities: [
          {
            title: 'Parc marin d\'Ang Thong',
            badge: 'Nature',
            description: 'Un archipel immaculé de 42 îles avec des lagons d\'émeraude.',
            imageLabel: 'ang_thong_park'
          }
        ],
        hiddenGems: [
          {
            title: 'Silver Beach',
            badge: 'Trésor caché',
            description: 'Une petite crique isolée avec du sable fin et une eau calme.',
            imageLabel: 'silver_beach'
          }
        ]
      }
    }
  ],
  DE: [
    {
      id: "bangkok",
      name: "Bangkok",
      thaiName: "กรุงเทพมหานคร",
      overview: "Die Stadt der Engel, wo alte Schreine auf Ultra-Moderne in einer lebendigen sensorischen Landschaft treffen.",
      bestTime: "November bis März",
      pillars: {
        mustVisit: [
          {
            title: "Der Große Palast",
            badge: "Sehenswürdigkeiten",
            description: "Das spektakuläre zeremonielle Zuhause der thailändischen Könige und der Tempel des Smaragd-Buddha.",
            etiquette: "Strenge Kleiderordnung: Schultern und Knie müssen bedeckt sein. Keine Sandalen ohne Riemen.",
            imageLabel: "grand_palace_bangkok"
          },
          {
            title: "Nationalmuseum Bangkok",
            badge: "Museen",
            description: "Das größte Museum in Südostasien, das thailändische Kunst und Geschichte zeigt.",
            imageLabel: "national_museum_bangkok"
          },
          {
            title: "Siam Square",
            badge: "Stadtzentrum",
            description: "Das Herz der Jugendkultur und Mode von Bangkok.",
            imageLabel: "siam_square"
          }
        ],
        dining: [
          {
            title: "Jay Fai",
            badge: "Straßenessen",
            description: "Weltberühmtes Michelin-Sterne-Crab-Meat-Omelett, über Holzkohle zubereitet.",
            dietary: ["Meeresfrüchte-Schwerpunkt"],
            imageLabel: "jay_fai"
          },
          {
            title: "Or Tor Kor Market",
            badge: "Lokaler Markt",
            description: "Gehobener Frischemarkt, bekannt für landwirtschaftliche Produkte höchster Qualität.",
            imageLabel: "or_tor_kor"
          }
        ],
        otherExperiences: [
          {
            title: "Jodd Fairs",
            badge: "Nachtmarkt",
            description: "Ein trendiger Nachtmarkt, beliebt für Street Food und Vintage-Mode.",
            imageLabel: "jodd_fairs"
          },
          {
            title: "Chao Phraya Express Boot",
            badge: "Öffentlicher Verkehr",
            description: "Erleben Sie das Leben am Fluss und umgehen Sie den Verkehr wie ein Einheimischer.",
            imageLabel: "chao_phraya_boat"
          }
        ],
        uniqueActivities: [
          {
            title: "Blue Elephant Kochschule",
            badge: "Kochkurs",
            description: "Lernen Sie die Geheimnisse der königlichen thailändischen Küche in historischem Ambiente.",
            imageLabel: "blue_elephant_cooking"
          },
          {
            title: "Versteckte Kanaltour durch Bangkok",
            badge: "Rundgang",
            description: "Erkunden Sie ruhige Seitenarme und traditionelle Holzhäuser.",
            imageLabel: "canal_tour"
          }
        ],
        hiddenGems: [
          {
            title: "Wat Sam Phran",
            badge: "Geheimtipp",
            description: "Ein 17-stöckiger rosa Turm, um den sich ein riesiger Drache windet.",
            etiquette: "Um stille Kontemplation wird gebeten.",
            imageLabel: "wat_sam_phran"
          },
          {
            title: "Baan Silapin (Künstlerhaus)",
            badge: "Geheimtipp",
            description: "Ein jahrhundertealtes Haus, das in eine Galerie und ein Puppentheater umgewandelt wurde.",
            imageLabel: "artist_house"
          }
        ]
      }
    },
    {
      id: "phuket",
      name: "Phuket",
      thaiName: "ภูเก็ต",
      overview: "Die Perle der Andamanensee, Synonym für weiße Sandstrände, kristallklares Wasser und den Charme der historischen Altstadt.",
      bestTime: "November bis April",
      pillars: {
        mustVisit: [
          {
            title: "Der Große Buddha von Phuket",
            badge: "Sehenswürdigkeiten",
            description: "Eine 45 Meter hohe Marmorstatue mit Panoramablick über die Insel.",
            etiquette: "Angemessene Kleidung erforderlich.",
            imageLabel: "big_buddha_phuket"
          },
          {
            title: "Altstadt von Phuket",
            badge: "Kulturerbe",
            description: "Farbenfrohe sino-portugiesische Geschäftshäuser und historisches Erbe.",
            imageLabel: "phuket_old_town"
          }
        ],
        dining: [
          {
            title: "Sonntags-Straßenmarkt",
            badge: "Straßenessen",
            description: "Der lebendigste Lebensmittel- und Kunsthandwerksmarkt in Phuket Town.",
            imageLabel: "phuket_sunday_market"
          },
          {
            title: "Blue Elephant Phuket",
            badge: "Authentisch",
            description: "Feine Küche im historischen Herrenhaus eines Gouverneurs.",
            imageLabel: "blue_elephant_phuket"
          }
        ],
        otherExperiences: [
          {
            title: "Bangla Road",
            badge: "Nachtleben",
            description: "Das Zentrum des Nachtlebens in Phuket mit Clubs und Bars.",
            imageLabel: "bangla_road"
          }
        ],
        uniqueActivities: [
          {
            title: "Thai Kochakademie",
            badge: "Kochkurs",
            description: "Praxisnahes Training für traditionelle thailändische Gerichte.",
            imageLabel: "phuket_cooking_class"
          }
        ],
        hiddenGems: [
          {
            title: "Banana Beach",
            badge: "Geheimtipp",
            description: "Ein abgelegener Strand mit kristallklarem Wasser und weniger Touristen.",
            imageLabel: "banana_beach"
          }
        ]
      }
    },
    {
      id: "chiang-mai",
      name: "Chiang Mai",
      thaiName: "เชียงใหม่",
      overview: "Die Rose des Nordens, ein Zufluchtsort der Lanna-Kultur, neblige Berge und jahrhundertealte Tempel.",
      bestTime: "November bis Februar",
      pillars: {
        mustVisit: [
          {
            title: "Wat Phra That Doi Suthep",
            badge: "Sehenswürdigkeiten",
            description: "Eine goldene Pagode auf einem Berg mit Blick über die Stadt.",
            etiquette: "Angemessene Kleidung erforderlich.",
            imageLabel: "doi_suthep"
          },
          {
            title: "Tha Phae Tor",
            badge: "Öffentlicher Platz",
            description: "Der historische Eingang zur Altstadt und ein sozialer Mittelpunkt.",
            imageLabel: "tha_phae_gate"
          }
        ],
        dining: [
          {
            title: "Khao Soi Mae Sai",
            badge: "Straßenessen",
            description: "Traditionelle nordthailändische Curry-Nudeln.",
            imageLabel: "khao_soi_mae_sai"
          }
        ],
        otherExperiences: [
          {
            title: "Wua Lai Walking Street",
            badge: "Lokales Handwerk",
            description: "Berühmter Samstagsmarkt, bekannt für Silberwaren und Kunsthandwerk.",
            imageLabel: "silver_street"
          }
        ],
        uniqueActivities: [
          {
            title: "Pantawan Kochschule",
            badge: "Kochkurs",
            description: "Lernen Sie Lanna-Küche in einem wunderschönen Teakholzhaus.",
            imageLabel: "pantawan_cooking"
          }
        ],
        hiddenGems: [
          {
            title: "Wat Pha Lat",
            badge: "Geheimtipp",
            description: "Ein friedlicher Dschungeltempel, versteckt am Berg.",
            imageLabel: "wat_pha_lat"
          }
        ]
      }
    },
    {
      id: "pattaya",
      name: "Pattaya",
      thaiName: "พัทยา",
      overview: "Eine lebhafte Küstenstadt, bekannt für ihr vielfältiges Unterhaltungsprogramm, Familienattraktionen und Inselausflüge.",
      bestTime: "November bis März",
      pillars: {
        mustVisit: [
          {
            title: "Heiligtum der Wahrheit",
            badge: "Sehenswürdigkeiten",
            description: "Ein massiver Holzpavillon voller komplizierter Schnitzereien.",
            imageLabel: "sanctuary_of_truth"
          }
        ],
        dining: [
          {
            title: "The Sky Gallery",
            badge: "Café-Kultur",
            description: "Essen an der Klippe mit atemberaubendem Blick auf den Golf von Thailand.",
            imageLabel: "sky_gallery_pattaya"
          }
        ],
        otherExperiences: [
          {
            title: "Walking Street",
            badge: "Nachtleben",
            description: "Weltberühmtes Vergnügungsviertel nach Einbruch der Dunkelheit.",
            imageLabel: "pattaya_walking_street"
          }
        ],
        uniqueActivities: [
          {
            title: "Koh Larn Tagesausflug",
            badge: "Natur",
            description: "Erkunden Sie klares Wasser und Strände auf einer nahe gelegenen Insel.",
            imageLabel: "koh_larn"
          }
        ],
        hiddenGems: [
          {
            title: "Schwimmender Markt von Pattaya",
            badge: "Geheimtipp",
            description: "Authentisches Leben am Fluss und lokales Kunsthandwerk.",
            imageLabel: "pattaya_floating_market"
          }
        ]
      }
    },
    {
      id: "krabi",
      name: "Krabi",
      thaiName: "กระบี่",
      overview: "Eine Provinz mit atemberaubenden Kalksteinfelsen, smaragdgrünen Lagunen und Weltklasse-Klettermöglichkeiten.",
      bestTime: "November bis April",
      pillars: {
        mustVisit: [
          {
            title: "Tigerhöhlentempel",
            badge: "Sehenswürdigkeiten",
            description: "Eine spirituelle Stätte, die einen Aufstieg von 1.237 Stufen für eine großartige Aussicht erfordert.",
            imageLabel: "tiger_cave_krabi"
          }
        ],
        dining: [
          {
            title: "Krabi Nachtmarkt",
            badge: "Straßenessen",
            description: "Lokale südthailändische Aromen und Markt für frische Meeresfrüchte.",
            imageLabel: "krabi_night_market"
          }
        ],
        otherExperiences: [
          {
            title: "Railay Beach",
            badge: "Natur",
            description: "Nur mit dem Boot erreichbar, berühmt für Felsklettern.",
            imageLabel: "railay_beach"
          }
        ],
        uniqueActivities: [
          {
            title: "Vier-Insel-Tour",
            badge: "Natur",
            description: "Traditionelle Longtail-Bootstour zu den Inseln.",
            imageLabel: "four_islands"
          }
        ],
        hiddenGems: [
          {
            title: "Smaragd-Pool",
            badge: "Geheimtipp",
            description: "Eine natürliche heiße Quelle mit türkisfarbenem Wasser im Wald.",
            imageLabel: "emerald_pool"
          }
        ]
      }
    },
    {
      id: "ayutthaya",
      name: "Ayutthaya",
      thaiName: "พระนครศรีอยุธยา",
      overview: "Die ehemalige Hauptstadt des Königreichs Siam, heute ein UNESCO-Welterbe voller weitläufiger Ruinen.",
      bestTime: "November bis Februar",
      pillars: {
        mustVisit: [
          {
            title: "Wat Mahathat",
            badge: "Sehenswürdigkeiten",
            description: "Berühmt für den steinernen Buddha-Kopf, der in Baumwurzeln verschlungen ist.",
            imageLabel: "wat_mahathat"
          }
        ],
        dining: [
          {
            title: "Ayutthaya Nachtmarkt",
            badge: "Lokaler Markt",
            description: "Köstliche traditionelle Snacks und riesige Flussgarnelen.",
            imageLabel: "ayutthaya_market"
          }
        ],
        otherExperiences: [
          {
            title: "Historischer Park Ayutthaya",
            badge: "Kulturerbe",
            description: "Erkunden Sie die Ruinen der alten siamesischen Hauptstadt.",
            imageLabel: "ayutthaya_park"
          }
        ],
        uniqueActivities: [
          {
            title: "Elephant World Tour",
            badge: "Kultur",
            description: "Umweltfreundliche Interaktion und historische Ruinen.",
            imageLabel: "ayutthaya_elephant"
          }
        ],
        hiddenGems: [
          {
            title: "Wat Chaiwatthanaram",
            badge: "Geheimtipp",
            description: "Einer der am besten erhaltenen und schönsten Tempel Ayutthayas.",
            imageLabel: "wat_chaiwatthanaram"
          }
        ]
      }
    },
    {
      id: "koh-samui",
      name: "Koh Samui",
      thaiName: "เกาะสมุย",
      overview: "Thailands zweitgrößte Insel, bekannt für ihre palmengesäumten Strände, Kokoshaine und Luxusresorts.",
      bestTime: "Dezember bis September",
      pillars: {
        mustVisit: [
          {
            title: "Großer Buddha Tempel",
            badge: "Sehenswürdigkeiten",
            description: "Eine 12 Meter hohe goldene Statue auf einer kleinen felsigen Insel.",
            imageLabel: "wat_phra_yai_samui"
          }
        ],
        dining: [
          {
            title: "Fischerdorf",
            badge: "Speiseerlebnis",
            description: "Ein trendiges Viertel mit Restaurants direkt am Strand und Boutiquen.",
            imageLabel: "fishermans_village"
          }
        ],
        otherExperiences: [
          {
            title: "Chaweng Beach",
            badge: "Natur",
            description: "Der längste und lebhafteste Strand der Insel.",
            imageLabel: "chaweng_beach"
          }
        ],
        uniqueActivities: [
          {
            title: "Ang Thong Marinepark",
            badge: "Natur",
            description: "Ein unberührter Archipel aus 42 Inseln mit smaragdgrünen Lagunen.",
            imageLabel: "ang_thong_park"
          }
        ],
        hiddenGems: [
          {
            title: "Silver Beach",
            badge: "Geheimtipp",
            description: "Eine kleine, abgelegene Bucht mit feinem Sand und ruhigem Wasser.",
            imageLabel: "silver_beach"
          }
        ]
      }
    }
  ]
};
