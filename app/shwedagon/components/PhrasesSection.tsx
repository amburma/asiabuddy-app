import React, { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Volume2, Copy, Check, Search, Home } from "lucide-react";

interface Phrase {
  id: string;
  category: "general" | "greetings" | "shopping" | "directions" | "pagoda";
  english: string;
  myanmar: string;
  pronunciation: string;
}

interface PhrasesSectionProps {
  t: (key: string) => string;
  lang: string;
  langName: string;
}

const PHRASES_DATA: Phrase[] = [
  // Greetings
  { id: "g1", category: "greetings", english: "Hello / Mingalaba", myanmar: "မင်္ဂလာပါ", pronunciation: "Min-ga-la-ba" },
  { id: "g2", category: "greetings", english: "Thank you", myanmar: "ကျေးဇူးတင်ပါတယ်", pronunciation: "Kyay-zoo-tin-ba-deh" },
  { id: "g3", category: "greetings", english: "Goodbye", myanmar: "သွားတော့မယ်နော်", pronunciation: "Thwar-daw-meh-naw" },
  { id: "g4", category: "greetings", english: "How are you?", myanmar: "နေကောင်းလား။", pronunciation: "Nay-kaung-lar?" },
  { id: "g5", category: "greetings", english: "Yes", myanmar: "ဟုတ်ကဲ့", pronunciation: "Hoke-keh" },
  { id: "g6", category: "greetings", english: "No", myanmar: "မဟုတ်ပါဘူး", pronunciation: "Ma-hoke-par-boo" },

  // Pagoda Custom Phrases
  { id: "p1", category: "pagoda", english: "Where is the Shwedagon Pagoda?", myanmar: "ရွှေတိဂုံဘုရား ဘယ်နားမှာလဲ။", pronunciation: "Shway-da-gon Hpa-yar beh-nar-mhar-leh?" },
  { id: "p2", category: "pagoda", english: "Where can I leave my shoes?", myanmar: "ဖိနပ်ဘယ်မှာ အပ်ရမလဲ။", pronunciation: "Pha-nat beh-mhar at-ya-mah-leh?" },
  { id: "p3", category: "pagoda", english: "Where can I buy flowers / candles?", myanmar: "ပန်းနဲ့ ဖယောင်းတိုင် ဘယ်မှာဝယ်ရမလဲ။", pronunciation: "Pann neh hpa-yaung-taing beh-mhar weh-ya-mah-leh?" },
  { id: "p4", category: "pagoda", english: "Where is my planetary post (e.g., Sunday)?", myanmar: "မွေးနံဂျီခေါင်း (ဥပမာ- တနင်္ဂနွေ) ဘယ်နားမှာလဲ။", pronunciation: "Mway-nan jyae-gaung beh-nar-mhar-leh?" },

  // General / Directions
  { id: "d1", category: "directions", english: "Where is the restroom?", myanmar: "အိမ်သာ ဘယ်နားမှာလဲ။", pronunciation: "Ein-thar beh-nar-mhar-leh?" },
  { id: "d2", category: "directions", english: "How much is this?", myanmar: "ဒါ ဘယ်လောက်လဲ။", pronunciation: "Dar beh-lောက်-leh?" },
  { id: "d3", category: "directions", english: "Can you help me?", myanmar: "ကူညီပေးလို့ရမလား။", pronunciation: "Koo-nyi-pay-lo hya-ma-lar?" },
  { id: "d4", category: "directions", english: "Excuse me / Sorry", myanmar: "ကန်တော့ပါ / အားနာပါတယ်", pronunciation: "Ka-daw-par / Arr-nar-ba-deh" }
];

export default function PhrasesSection({ t, lang, langName }: PhrasesSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Phrases" },
    { id: "greetings", label: "Greetings" },
    { id: "pagoda", label: "Pagoda Custom" },
    { id: "directions", label: "Directions & Help" }
  ];

  // TTS (Text-to-Speech) Functionality
  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      // Cancel previous speaking
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "my-MM"; // Set to Myanmar language pack if supported by device
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  // Clipboard Copy Functionality
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Filtering Logic
  const filteredPhrases = PHRASES_DATA.filter((phrase) => {
    const matchesCategory = activeCategory === "all" || phrase.category === activeCategory;
    const matchesSearch =
      phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.myanmar.includes(searchQuery) ||
      phrase.pronunciation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex-1 flex flex-col h-full bg-sacred-bg"
    >
      {/* Header Section */}
      <header className="p-6 md:p-8 border-b border-gold-soft/10 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gold-soft rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3">
            <Volume2 size={28} className="-rotate-3" />
          </div>
          <div>
            <h2 className="serif font-bold text-2xl text-gold-deep">
              {t("phrases") || "Useful Phrases"}
            </h2>
            <p className="text-sm text-gray-500">
              Learn basic Myanmar phrases for your pilgrimage. (Target: {langName})
            </p>
          </div>
        </div>
      </header>

      {/* Controls: Search and Categories */}
      <div className="p-6 max-w-4xl w-full mx-auto space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search phrases in English, Myanmar or Pronunciation..."
            className="pl-12 h-12 rounded-xl border-gold-soft/20 focus-visible:ring-gold-soft"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-gold-soft border-gold-soft text-white shadow-sm"
                  : "bg-white border-gray-100 text-gray-600 hover:border-gold-soft/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Phrases Grid List */}
      <div className="flex-1 overflow-y-auto px-6 pb-12 max-w-4xl w-full mx-auto">
        {filteredPhrases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPhrases.map((phrase) => (
              <Card
                key={phrase.id}
                className="bg-white border border-gold-soft/10 rounded-2xl shadow-sm hover:border-gold-soft/30 transition-all duration-200 overflow-hidden"
              >
                <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-gold-soft/10 text-gold-deep inline-block mb-2">
                      {phrase.category}
                    </span>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">
                      {phrase.english}
                    </h4>
                    <h3 className="serif text-xl font-bold text-gold-deep leading-relaxed mb-1">
                      {phrase.myanmar}
                    </h3>
                    <p className="text-xs italic text-gray-600 font-medium bg-gray-50 px-2.5 py-1.5 rounded-xl inline-block mt-1">
                      🗣️ {phrase.pronunciation}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-gray-50">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopy(phrase.myanmar, phrase.id)}
                      className="w-9 h-9 rounded-xl hover:bg-gray-100 text-gray-500"
                      title="Copy Myanmar Text"
                    >
                      {copiedId === phrase.id ? (
                        <Check size={16} className="text-emerald-600" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleSpeak(phrase.myanmar)}
                      className="w-9 h-9 rounded-xl hover:bg-gold-soft/10 text-gold-deep"
                      title="Listen to Sound"
                    >
                      <Volume2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 text-sm font-medium">
            No phrases found matching your search.
          </div>
        )}
      </div>
    </motion.div>
  );
}