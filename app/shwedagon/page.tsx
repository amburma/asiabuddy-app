"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Info, 
  Map as MapIcon, 
  Sparkles, 
  Phone, 
  Plane, 
  Home,
  MessageSquare, 
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Globe,
  Accessibility,
  Clock,
  Shirt,
  MapPin,
  Volume2,
  Eye,
  Gift,
  Bus,
  ShieldCheck,
  BookOpen,
  Bookmark,
  Heart,
  Plus,
  Minus,
  Copy,
  Check,
  Search,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { chatWithAmbassador } from "./services/gemini";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { UI_TRANSLATIONS, FOREIGN_EMBASSIES_INFO } from "./translations";
import PrayersSection from "./components/PrayersSection";
import AdhihtanJournal, { ADHIHTAN_TRANSLATIONS } from "./components/AdhihtanJournal";
import Footer from "./components/Footer";

// Custom Shwedagon Pagoda Icon
const Pagoda = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21h18" />
    <path d="M5 21l1-3h12l1 3" />
    <path d="M6.5 18l1-2h9l1 2" />
    <path d="M8.5 16c0-3.5 1.5-6 3.5-6s3.5 2.5 3.5 6" />
    <path d="M12 10v-2" />
    <path d="M10 8h4" />
    <path d="M10.5 7h3" />
    <path d="M11 6h2" />
    <path d="M12 6v-3" />
    <circle cx="12" cy="2.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

// Types
export type Section = "ambassador" | "about" | "info" | "places" | "maps" | "services" | "emergency" | "phrases" | "menu" | "prayers" | "adhihtan";

interface Language {
  code: string;
  name: string;
  flag: string;
  localName: string;
}

const LANGUAGES: Language[] = [
  { code: "my", name: "Myanmar", localName: "မြန်မာ", flag: "🇲🇲" },
  { code: "en", name: "English", localName: "English", flag: "🌐" },
  { code: "es", name: "Spanish", localName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", localName: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italian", localName: "Italiano", flag: "🇮🇹" },
  { code: "de", name: "German", localName: "Deutsch", flag: "🇩🇪" },
  { code: "pt", name: "Portuguese", localName: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Russian", localName: "Русский", flag: "🇷🇺" },
  { code: "he", name: "Hebrew", localName: "עברית", flag: "🇮🇱" },
  { code: "zh", name: "Chinese", localName: "中文", flag: "🇨🇳" },
  { code: "hi", name: "Hindi", localName: "हिन्दी", flag: "🇮🇳" },
  { code: "ja", name: "Japanese", localName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", localName: "한국어", flag: "🇰🇷" },
  { code: "th", name: "Thai", localName: "ไทย", flag: "🇹🇭" },
  { code: "ms", name: "Malay", localName: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "id", name: "Indonesian", localName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "vi", name: "Vietnamese", localName: "Tiếng Việt", flag: "🇻🇳" },
];

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>("ambassador");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isAdhihtanQuickOpen, setIsAdhihtanQuickOpen] = useState(false);
  const [quickGatha, setQuickGatha] = useState("");
  const [quickBeads, setQuickBeads] = useState(0);
  const [quickNote, setQuickNote] = useState("");
  const [quickToast, setQuickToast] = useState("");

  const triggerQuickBeadTactile = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  const handleSaveQuickAdhihtan = () => {
    const lang = selectedLanguage?.code || "en";
    const newLog = {
      id: Math.random().toString(36).substring(7),
      date: new Date().toLocaleDateString(lang, { month: "short", day: "numeric", year: "numeric" }),
      gatha: quickGatha.trim() || "-",
      beads: quickBeads,
      note: quickNote.trim() || "",
      timestamp: Date.now()
    };

    let storedLogs = [];
    const stored = localStorage.getItem("shwedagon_adhihtan_logs");
    if (stored) {
      try {
        storedLogs = JSON.parse(stored);
      } catch (e) {}
    }
    const updated = [newLog, ...storedLogs];
    localStorage.setItem("shwedagon_adhihtan_logs", JSON.stringify(updated));

    setQuickGatha("");
    setQuickBeads(0);
    setQuickNote("");
    setIsAdhihtanQuickOpen(false);

    const successMsg = ADHIHTAN_TRANSLATIONS["success_toast"]?.[lang] || ADHIHTAN_TRANSLATIONS["success_toast"]?.["en"];
    setQuickToast(successMsg);
    setTimeout(() => {
      setQuickToast("");
    }, 4000);

    window.dispatchEvent(new Event("shwedagon_adhihtan_updated"));
  };

  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    { role: "model", text: "Mingalaba! I am your Shwedagon Pagoda Ambassador. How may I assist you with your journey to the Golden Land today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const PRAYERS_TRANSLATIONS: Record<string, string> = {
    en: "Prayers & Devotions",
    my: "ဘုရားရှိခိုးနှင့် ပူဇော်မှုများ",
    es: "Oraciones y Devociones",
    fr: "Prières et Dévotions",
    it: "Preghiere e Devozioni",
    de: "Gebete und Andachten",
    pt: "Orações e Devoções",
    ru: "Молитвы и Богослужения",
    he: "תפילות ומסירות",
    zh: "祈祷与朝拜",
    hi: "प्रार्थना और भक्ति",
    ja: "祈りと信仰",
    ko: "기도와 예배",
    th: "บทสวดมนต์และการสักการะ",
    ms: "Doa & Khusyuk",
    id: "Doa & Kebaktian",
    vi: "Kinh Nguyện & Thành Kính"
  };

  const t = (key: string, overrideLang?: string) => {
    const lang = overrideLang || selectedLanguage?.code || "en";
    if (key === "prayers") {
      return PRAYERS_TRANSLATIONS[lang] || PRAYERS_TRANSLATIONS["en"];
    }
    if (key === "adhihtan") {
      return ADHIHTAN_TRANSLATIONS["adhihtan"]?.[lang] || ADHIHTAN_TRANSLATIONS["adhihtan"]?.["en"] || "Adhihtan Journal";
    }
    return UI_TRANSLATIONS[lang]?.[key] || UI_TRANSLATIONS["en"][key] || key;
  };

  const isRTL = selectedLanguage?.code === "he";

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatWithAmbassador(userMessage, messages, selectedLanguage?.name || "English");
      setMessages(prev => [...prev, { role: "model", text: response || "I apologize, but I am having trouble connecting. Please try again." }]);
    } catch (error: any) {
      console.error(error);
      const errorMsg = error?.message || "I apologize, but I encountered an error. Please check your connection.";
      setMessages(prev => [...prev, { role: "model", text: `❌ ${errorMsg}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskAmbassador = (query: string) => {
    setActiveSection("ambassador");
    setMessages(prev => [...prev, { role: "user", text: query }]);
    setIsLoading(true);
    chatWithAmbassador(query, messages, selectedLanguage?.name || "English")
      .then(response => {
        setMessages(prev => [...prev, { role: "model", text: response || "I apologize, but I am having trouble connecting. Please try again." }]);
      })
      .catch((err: any) => {
        console.error(err);
        const errorMsg = err?.message || "I apologize, but I encountered an error. Please check your connection.";
        setMessages(prev => [...prev, { role: "model", text: `❌ ${errorMsg}` }]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    (window as any).__askAmbassador = handleAskAmbassador;
    return () => {
      delete (window as any).__askAmbassador;
    };
  }, [handleAskAmbassador]);

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    setMessages([
      { role: "model", text: t('ambassadorGreeting', lang.code) }
    ]);
  };

  const startApp = () => {
    if (selectedLanguage) {
      setShowWelcome(false);
      setActiveSection("about");
    }
  };

  if (showWelcome) {
    return (
      <div className="fixed inset-0 z-[200] bg-sacred-bg flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gold-soft/20"
        >
          <div className="bg-gold-soft p-8 text-center text-white relative overflow-hidden">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Pagoda size={80} className="mx-auto mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]" />
            </motion.div>
            <h1 className="serif text-3xl font-bold mb-2">{t('welcome')}</h1>
            <p className="text-white/80 italic">{t('goldenWonder')}</p>
          </div>
          
          <div className="p-8">
            <h2 className="serif text-xl text-center text-gold-deep mb-6">{t('selectLang')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[40vh] overflow-y-auto p-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                    selectedLanguage?.code === lang.code 
                      ? "bg-gold-soft border-gold-soft text-white shadow-md" 
                      : "bg-gray-50 border-gray-100 text-gray-700 hover:border-gold-soft/30"
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold uppercase opacity-60">{lang.name}</span>
                    <span className="text-sm font-medium">{lang.localName}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button 
                disabled={!selectedLanguage}
                onClick={startApp}
                className="bg-gold-soft hover:bg-gold-deep text-white px-12 py-6 rounded-full text-lg serif font-bold shadow-xl transition-all disabled:opacity-50"
              >
                {t('startJourney')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const navItems = [
    { id: "ambassador", label: "Ambassador", icon: MessageSquare },
    { id: "about", label: "About / History", icon: Info },
    { id: "info", label: "Information", icon: Clock },
    { id: "places", label: "Famous Places", icon: Pagoda },
    { id: "maps", label: "Maps", icon: MapIcon },
    { id: "prayers", label: "Prayers & Devotions", icon: Sparkles, color: "text-gold-deep" }, 
    { id: "adhihtan", label: "Adhihtan Journal", icon: BookOpen, color: "text-amber-600" }, 
    { id: "phrases", label: "Useful Phrases", icon: Globe },
    { id: "services", label: "Services", icon: Plane },
    { id: "emergency", label: "Emergency", icon: Phone, color: "text-red-500" },
  ];

  return (
    <div className="flex h-screen bg-sacred-bg overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gold-soft/20 shadow-sm">
          <div className="p-6 flex items-center justify-between border-b border-gold-soft/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-soft rounded-full flex items-center justify-center text-white shadow-lg">
                <Pagoda size={24} />
              </div>
              <h1 className="serif font-bold text-lg text-gold-deep leading-tight">Shwedagon<br/>Pagoda</h1>
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsAdhihtanQuickOpen(true)} 
                className="h-10 w-10 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all border border-amber-200/40 relative shadow-inner p-0 flex items-center justify-center shrink-0"
                title={ADHIHTAN_TRANSLATIONS["tooltip"]?.[selectedLanguage?.code || "en"] || "Quick Adhihtan Note"}
              >
                <BookOpen size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-1 ring-white animate-pulse" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowWelcome(true)} className="text-gold-deep w-10 h-10 rounded-full">
                <Globe size={18} />
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as Section)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeSection === item.id 
                      ? "bg-gold-soft/10 text-gold-deep font-medium" 
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <item.icon size={20} className={item.color} />
                  <span>{t(item.id)}</span>
                  {activeSection === item.id && (
                    <motion.div layoutId="active-nav" className="ml-auto w-1.5 h-1.5 bg-gold-soft rounded-full" />
                  )}
                </button>
              ))}
            </nav>
          </ScrollArea>
          <div className="p-4 border-t border-gold-soft/10">
            <div className="bg-cream/50 p-3 rounded-lg flex items-center gap-3">
              <Globe size={16} className="text-gold-deep" />
              <span className="text-xs font-medium text-gold-deep">{selectedLanguage?.name} Supported</span>
            </div>
          </div>
        </aside>

        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gold-soft/20 z-50 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Pagoda className="text-gold-soft" size={24} />
            <span className="serif font-bold text-gold-deep">Shwedagon</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsAdhihtanQuickOpen(true)}
              className="h-10 w-10 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all border border-amber-200/40 relative shadow-inner p-0 flex items-center justify-center shrink-0"
              title={ADHIHTAN_TRANSLATIONS["tooltip"]?.[selectedLanguage?.code || "en"] || "Quick Adhihtan Note"}
            >
              <BookOpen size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-1 ring-white animate-pulse" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowWelcome(true)} className="w-10 h-10 rounded-full">
              <Globe className="text-gold-deep" size={18} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
              <Menu />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className="fixed inset-0 bg-white z-[60] flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-4 border-b">
                <span className="serif font-bold text-gold-deep">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X />
                </Button>
              </div>
              <div className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id as Section);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl ${
                      activeSection === item.id ? "bg-gold-soft/10 text-gold-deep" : "text-gray-600"
                    }`}
                  >
                    <item.icon size={24} className={item.color} />
                    <span className="text-lg font-medium">{t(item.id)}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 flex flex-col relative pt-16 md:pt-0">
          <AnimatePresence mode="wait">
            {activeSection === "ambassador" && (
              <motion.div
                key="ambassador"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col h-full"
              >
                <header className="p-4 md:p-6 border-b border-gold-soft/10 bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gold-soft rounded-full flex items-center justify-center text-white shadow-md">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h2 className="serif font-bold text-xl text-gold-deep">{t('ambassador')} Chat</h2>
                      <p className="text-xs text-gray-500">Expert guidance in {selectedLanguage?.name}</p>
                    </div>
                  </div>
                </header>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-sm ${
                        msg.role === "user" 
                          ? "bg-gold-soft text-white rounded-tr-none" 
                          : "bg-white border border-gold-soft/10 rounded-tl-none"
                      }`}>
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{msg.text}</ReactMarkdown>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gold-soft/10 p-4 rounded-2xl rounded-tl-none flex gap-2">
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-gold-soft rounded-full" />
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-gold-soft rounded-full" />
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-gold-soft rounded-full" />
                      </div>
                    </div>
                  )}
                  <Footer langCode={selectedLanguage?.code || "en"} />
                </div>

                <div className="p-4 md:p-6 bg-white border-t border-gold-soft/10">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder={t('askPlaceholder')}
                        className="h-12 rounded-xl border-gold-soft/20 focus-visible:ring-gold-soft px-4"
                      />
                    </div>
                    <Button onClick={handleSend} className="h-12 w-12 rounded-xl bg-gold-soft hover:bg-gold-deep shadow-lg">
                      <ChevronRight />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === "about" && <AboutSection t={t} setActiveSection={setActiveSection} isRTL={isRTL} langCode={selectedLanguage?.code || "en"} />}
            {activeSection === "info" && <InfoSection t={t} setActiveSection={setActiveSection} isRTL={isRTL} langCode={selectedLanguage?.code || "en"} />}
            {activeSection === "places" && <PlacesSection t={t} setActiveSection={setActiveSection} langCode={selectedLanguage?.code || "en"} />}
            {activeSection === "maps" && (
              <MapsSection 
                lang={selectedLanguage?.code || "en"}
                t={t}
              />
            )}
            {activeSection === "phrases" && <PhrasesSection t={t} lang={selectedLanguage?.code || "en"} langName={selectedLanguage?.name || "English"} />}
            {activeSection === "services" && <ServicesSection t={t} onAskAmbassador={handleAskAmbassador} langCode={selectedLanguage?.code || "en"} />}
            {activeSection === "emergency" && <EmergencySection t={t} setActiveSection={setActiveSection} langCode={selectedLanguage?.code || "en"} />}
            {activeSection === "menu" && <MenuSection t={t} setActiveSection={setActiveSection} navItems={navItems} langCode={selectedLanguage?.code || "en"} />}

            {activeSection === "prayers" && (
              <PrayersSection 
                t={t} 
                langCode={selectedLanguage?.code || "en"} 
                setActiveSection={setActiveSection} 
              />
            )}

            {activeSection === "adhihtan" && (
              <AdhihtanJournal 
                langCode={selectedLanguage?.code || "en"} 
              />
            )}
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {activeSection !== "ambassador" && (
            <motion.button
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveSection("ambassador")}
              className="fixed bottom-6 right-6 w-14 h-14 bg-gold-soft text-white rounded-full shadow-2xl flex items-center justify-center z-40 transition-shadow hover:shadow-gold-soft/40 border-2 border-white/50"
            >
              <MessageSquare size={26} />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-white rounded-full"
              />
            </motion.button>
          )}
        </AnimatePresence>

        <Dialog open={isAdhihtanQuickOpen} onOpenChange={setIsAdhihtanQuickOpen}>
          <DialogContent className="max-w-md bg-white rounded-3xl p-6 border border-amber-100 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="serif text-amber-900 flex items-center gap-2">
                <Sparkles className="text-amber-500 animate-pulse" size={18} />
                {ADHIHTAN_TRANSLATIONS["header_title"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["header_title"]?.["en"]}
              </DialogTitle>
              <DialogDescription className="text-xs text-amber-700/70">
                {ADHIHTAN_TRANSLATIONS["subtitle"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["subtitle"]?.["en"]}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                  <Bookmark size={11} />
                  Verse / Gāthā
                </label>
                <Input
                  value={quickGatha}
                  onChange={(e) => setQuickGatha(e.target.value)}
                  placeholder={ADHIHTAN_TRANSLATIONS["placeholder_gatha"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["placeholder_gatha"]?.["en"]}
                  className="h-10 rounded-xl border-amber-100 text-gray-700 text-sm font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                  <Plus className="text-amber-600" size={11} />
                  {ADHIHTAN_TRANSLATIONS["bead_count_label"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["bead_count_label"]?.["en"]}
                </label>
                <div className="flex items-center justify-between bg-orange-50/40 px-3 py-2 rounded-2xl border border-amber-100/30">
                  <Button size="icon" variant="ghost" onClick={() => setQuickBeads(prev => prev > 0 ? prev - 1 : 0)} className="w-8 h-8 rounded-lg hover:bg-amber-100 text-amber-800 shrink-0">
                    <Minus size={14} />
                  </Button>
                  <span className="font-mono font-black text-amber-950 text-sm">{quickBeads} Rounds (Mala)</span>
                  <Button size="icon" variant="ghost" onClick={() => { setQuickBeads(prev => prev + 1); triggerQuickBeadTactile(); }} className="w-8 h-8 rounded-lg hover:bg-amber-100 text-amber-800 shrink-0">
                    <Plus size={14} />
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                  <Heart size={11} />
                  Reflection / Notes
                </label>
                <textarea
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                  placeholder={ADHIHTAN_TRANSLATIONS["placeholder_note"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["placeholder_note"]?.["en"]}
                  rows={3}
                  className="w-full rounded-xl border border-amber-100 p-2.5 text-xs text-gray-700 placeholder-amber-900/30 font-medium focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <DialogFooter className="flex items-center gap-2 mt-2">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setQuickGatha("");
                  setQuickBeads(0);
                  setQuickNote("");
                  setIsAdhihtanQuickOpen(false);
                }}
                className="rounded-xl hover:bg-gray-100 text-gray-600 font-medium text-xs h-10"
              >
                {ADHIHTAN_TRANSLATIONS["button_close"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["button_close"]?.["en"]}
              </Button>
              <Button 
                onClick={handleSaveQuickAdhihtan}
                disabled={!quickGatha.trim() && !quickNote.trim() && quickBeads === 0}
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-amber-500/20 px-6 h-10"
              >
                {ADHIHTAN_TRANSLATIONS["button_save"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["button_save"]?.["en"]}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AnimatePresence>
          {quickToast && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/20"
            >
              <span className="font-medium text-sm text-white">{quickToast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}

function SectionHeader({ title, subtitle, icon: Icon }: { title: string; subtitle: string; icon: any }) {
  return (
    <header className="p-6 md:p-8 border-b border-gold-soft/10 bg-white/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gold-soft rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3">
          <Icon size={28} className="-rotate-3" />
        </div>
        <div>
          <h2 className="serif font-bold text-2xl text-gold-deep">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}

function AboutSection({ t, setActiveSection, isRTL, langCode }: { t: (k: string, lang?: string) => string, setActiveSection: (s: Section) => void, isRTL: boolean, langCode: string }) {
  const fullDetail = t('aboutFullDetail');
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto">
      <SectionHeader title={t('about')} subtitle={t('spiritualJourney')} icon={Info} />
      <div className="p-6 md:p-8 space-y-8 max-w-4xl">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="p-0 space-y-6">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://thutatravel.com/wp-content/uploads/2018/01/002_1920_1080-1500x844.jpg" 
                alt="Shwedagon Pagoda at Night" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1623063529241-768fd587ca83?auto=format&fit=crop&q=80&w=1200';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white text-lg serif italic">"{t('welcome')}"</p>
              </div>
            </div>
            <div className="text-gray-700 leading-relaxed markdown-content">
              {fullDetail ? (
                <div className="max-w-none">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{fullDetail}</ReactMarkdown>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xl font-medium text-gold-deep serif">{t('aboutIntro')}</p>
                  <p>{t('aboutRelics')}</p>
                  <p>{t('aboutHistory')}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-gold-soft/10 rounded-2xl">
            <CardHeader>
              <CardTitle className="serif text-gold-deep">{t('goldenStupa')}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 markdown-content">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{t('goldenStupaDesc')}</ReactMarkdown>
            </CardContent>
          </Card>
          <Card className="bg-white border-gold-soft/10 rounded-2xl">
            <CardHeader>
              <CardTitle className="serif text-gold-deep">{t('spiritualSignificance')}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 markdown-content">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{t('spiritualSignificanceDesc')}</ReactMarkdown>
            </CardContent>
          </Card>
        </div>

        <div className={`pb-12 flex items-center justify-between gap-4 w-full px-2 ${isRTL ? "flex-row-reverse" : ""}`}>
          <Button 
            onClick={() => setActiveSection('menu')}
            className="group relative w-14 h-14 bg-white border-2 border-gold-soft hover:bg-gold-soft/5 text-gold-deep rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center shrink-0"
          >
            <div className="w-8 h-8 bg-gold-soft/10 rounded-lg flex items-center justify-center group-hover:rotate-[-12deg] transition-transform">
              <Home size={20} className="text-gold-deep" />
            </div>
          </Button>

          <Button 
            onClick={() => setActiveSection('info')}
            className="group relative flex-1 max-w-[280px] h-14 bg-gold-soft hover:bg-gold-deep text-white rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <div className={`flex items-center justify-between gap-3 px-6 w-full ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shrink-0">
                  <Info size={18} />
                </div>
                <span className="font-bold tracking-wide uppercase text-sm truncate">
                  {t('info')}
                </span>
              </div>
              <ChevronRight size={18} className={`transition-transform shrink-0 ${isRTL ? "rotate-180 group-hover:-translate-x-1 text-white/50" : "group-hover:translate-x-1"}`} />
            </div>
            <div className="absolute inset-x-0 -bottom-1 h-1 bg-black/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </div>
      </div>
      <Footer langCode={langCode} />
    </motion.div>
  );
}

function InfoSection({ t, setActiveSection, isRTL, langCode }: { t: (k: string) => string, setActiveSection: (s: Section) => void, isRTL: boolean, langCode: string }) {
  const logistics = [
    { icon: Shirt, title: t('dressCode'), desc: t('dressCodeDesc') },
    { icon: Accessibility, title: t('accessibility'), desc: t('accessibilityDesc') },
    { icon: MapPin, title: t('entryPoints'), desc: t('entryPointsDesc') },
    { icon: Clock, title: t('openingHours'), desc: t('openingHoursDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto bg-sacred-bg pb-24">
      <SectionHeader title={t('info')} subtitle={t('visitorInfo')} icon={Clock} />
      <div className="p-6 md:p-8 space-y-10 max-w-4xl mx-auto">
        
        <Card className="bg-white border-gold-soft/10 rounded-[2rem] overflow-hidden shadow-sm">
          <CardHeader className="bg-gold-soft/5 border-b border-gold-soft/10 p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold-soft rounded-2xl text-white shadow-lg shadow-gold-soft/20">
                <Bus size={24} />
              </div>
              <CardTitle className="serif text-gold-deep text-2xl font-bold tracking-tight">
                {t('practicalLogistics').split('\n')[0].replace('### ', '').replace('**', '') || "Essential Visitor Guide"}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-8 text-gray-700 leading-relaxed markdown-content space-y-4">
             <ReactMarkdown rehypePlugins={[rehypeRaw]}>{t('practicalLogistics')}</ReactMarkdown>
          </CardContent>
        </Card>

        <Card className="bg-gold-soft/5 border-dashed border-2 border-gold-soft/20 rounded-[2rem] overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-2xl text-gold-deep shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <div className="flex-1">
                <h3 className="serif font-bold text-xl text-gold-deep mb-2">{t('systemInstruction')}</h3>
                <div className="text-sm text-gray-600 leading-relaxed markdown-content">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{t('systemInstructionDesc')}</ReactMarkdown>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {logistics.map((item, i) => (
            <Card key={i} className="group hover:border-gold-soft/40 transition-all duration-500 rounded-[2rem] overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-8 flex flex-col gap-6">
                <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center text-gold-deep group-hover:bg-gold-soft group-hover:text-white transition-all duration-300 shadow-inner group-hover:rotate-6">
                  <item.icon size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="serif font-bold text-xl text-gold-deep mb-4 group-hover:text-gold-soft transition-colors">{item.title}</h3>
                  <div className="text-sm text-gray-600 leading-relaxed markdown-content">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.desc}</ReactMarkdown>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center pt-10 border-t border-gold-soft/10 gap-4">
          <Button 
            size="lg"
            variant="outline"
            onClick={() => setActiveSection('menu')}
            className="group border-gold-deep text-gold-deep hover:bg-gold-soft/10 rounded-2xl shadow-lg transition-all flex items-center gap-2 px-6"
          >
            <Home size={20} className="transition-transform group-hover:scale-110" />
          </Button>

          <Button 
            size="lg"
            onClick={() => setActiveSection('places')}
            className="group bg-gold-deep hover:bg-gold-soft text-white rounded-2xl shadow-xl transition-all flex items-center gap-2 px-8"
          >
            <span className="font-bold">{t('places')}</span>
            <ChevronRight size={20} className={`transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
          </Button>
        </div>
      </div>
      <Footer langCode={langCode} />
    </motion.div>
  );
}

function PlacesSection({ t, setActiveSection, langCode }: { t: (k: string) => string, setActiveSection: (s: Section) => void, langCode: string }) {
  const places = [
    { 
      title: t('rubyEyeBuddha'), 
      desc: t('rubyEyeBuddhaDesc'), 
      img: "https://thutatravel.com/wp-content/uploads/2020/03/Padamyar-Myetshin-Image-Shwedagon_001.jpg",
      fallback: "https://i.pinimg.com/originals/21/72/7a/21727aa0f0b48da70564619ba195b090.jpg"
    },
    { title: t('mainStupa'), desc: t('mainStupaDesc'), img: "https://thutatravel.com/wp-content/uploads/2020/03/Weizar-Zawgyi.jpg" },
    { title: t('naungdawgyi'), desc: t('naungdawgyiDesc'), img: "https://thutatravel.com/wp-content/uploads/2020/03/ShinSawPu-Pagoda-Shwedagon.jpg" },
    { title: t('mahaGandhaBell'), desc: t('mahaGandhaBellDesc'), img: "https://thutatravel.com/wp-content/uploads/2020/03/Shinmahtee-Shwedagon.jpg" },
    { title: t('shinItzagawna'), desc: t('shinItzagawnaDesc'), img: "https://thutatravel.com/wp-content/uploads/2020/03/Shin-Issa-Gawna-Buddha-Image_03.jpg" },
    { title: t('sandawtwin'), desc: t('sandawtwinDesc'), img: "https://thutatravel.com/wp-content/uploads/2020/03/SanDawTwin-Shwedagon.jpg" },
    { 
      title: t('boBoAung'), 
      desc: t('boBoAungDesc'), 
      img: "https://thutatravel.com/wp-content/uploads/2020/03/Boe-Boe-Aungs-Buddha-Image_02.jpg" 
    },
    { 
      title: t('latpatlet'), 
      desc: t('latpatletDesc'), 
      img: "https://thutatravel.com/wp-content/uploads/2020/03/Latpatlet-Buddha-Shwedagon.jpg" 
    },
    { 
      title: t('pyadarshin'), 
      desc: t('pyadarshinDesc'), 
      img: "https://thutatravel.com/wp-content/uploads/2020/03/Padashin-Buddha-Image-Shwedagon_02.jpg" 
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto bg-sacred-bg pb-24">
      <SectionHeader title={t('places')} subtitle={t('keyShrines')} icon={Pagoda} />
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {places.map((place, i) => (
          <Card key={i} className="overflow-hidden rounded-[2rem] border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white group">
            <div className="h-64 overflow-hidden relative">
              <img 
                src={place.img} 
                alt={place.title} 
                referrerPolicy="no-referrer" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (place.fallback && target.src !== place.fallback) {
                    target.src = place.fallback;
                  } else if (target.src !== "https://picsum.photos/seed/temple/800/600") {
                    target.src = "https://picsum.photos/seed/temple/800/600";
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <CardHeader className="p-6">
              <CardTitle className="serif text-gold-deep text-2xl mb-4 group-hover:text-gold-soft transition-colors tracking-tight">
                {place.title}
              </CardTitle>
              <div className="text-gray-600 leading-relaxed text-sm prose-sm markdown-content">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{place.desc}</ReactMarkdown>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      
      <div className="px-8 pb-12 flex justify-between items-center max-w-5xl mx-auto w-full">
        <Button 
          variant="outline"
          onClick={() => setActiveSection('menu')}
          className="group border-gold-deep text-gold-deep hover:bg-gold-soft/10 rounded-2xl shadow-lg transition-all flex items-center gap-2 px-6"
        >
          <Home size={20} className="transition-transform group-hover:scale-110" />
          <span className="font-bold uppercase tracking-wider text-xs">{t('menu')}</span>
        </Button>

        <Button 
          onClick={() => setActiveSection('maps')}
          className="group bg-gold-deep hover:bg-gold-soft text-white rounded-2xl shadow-lg shadow-gold-deep/20 transition-all flex items-center gap-2 px-8 py-6 h-auto"
        >
          <MapIcon size={20} className="transition-transform group-hover:rotate-12" />
          <span className="font-black uppercase tracking-widest text-sm">{t('maps')}</span>
          <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      <Footer langCode={langCode} />
    </motion.div>
  );
}

const MAP_TRANSLATIONS: Record<string, { title: string; desc: string; button: string }> = {
  en: {
    title: "Interactive Guide Map",
    desc: "Explore a curated, interactive map of Shwedagon Pagoda detailing pavilions, shrines, and surrounding locations.",
    button: "Open in Google Maps"
  },
  my: {
    title: "အပြန်အလှန်အကျိုးပြု လမ်းညွှန်မြေပုံ",
    desc: "ရွှေတိဂုံစေတီတော် တန်ဆောင်းများ၊ သာသနိကအဆောက်အအုံများနှင့် ဝန်းကျင်နေရာများကို အပြန်အလှန်အကျိုးပြုမြေပုံတွင် လေ့လာပါ။",
    button: "Google Maps တွင် ဖွင့်ပါ"
  },
  es: {
    title: "Mapa Guía Interactivo",
    desc: "Explore un mapa curado e interactivo de la Pagoda Shwedagon detallando pabellones, santuarios y ubicaciones circundantes.",
    button: "Abrir en Google Maps"
  },
  fr: {
    title: "Carte Guide Interactive",
    desc: "Explorez une carte interactive et soignée de la pagode Shwedagon détaillant les pavillons, sanctuaires et lieux environnants.",
    button: "Ouvrir dans Google Maps"
  },
  it: {
    title: "Mappa Guida Interattiva",
    desc: "Esplora una mappa interattiva curata della Pagoda Shwedagon che dettaglia padiglioni, santuari e luoghi circostanti.",
    button: "Apri in Google Maps"
  },
  de: {
    title: "Interaktive Führerkarte",
    desc: "Erkunden Sie eine kuratierte, interaktive Karte der Shwedagon-Pagode mit Details zu Pavillons, Schreinen und umliegenden Orten.",
    button: "In Google Maps öffnen"
  },
  pt: {
    title: "Mapa Guia Interativo",
    desc: "Explore um mapa interativo e curado da Pagoda Shwedagon detalhando pavilhões, santuários e locais circundantes.",
    button: "Abrir no Google Maps"
  },
  ru: {
    title: "Интерактивная карта-путеводитель",
    desc: "Изучите отредактированную интерактивную карту пагоды Шведагон с деталями павильонов, святынь и окружающих мест.",
    button: "Открыть в Google Maps"
  },
  he: {
    title: "מפת מדריך אינטראקטיבית",
    desc: "חקור מפה אינטראקטיבית מעוצבת של פגודת שוודגון המפרטת ביתנים, מקדשים ומקומות סביב.",
    button: "פתח ב-Google Maps"
  },
  zh: {
    title: "互动导游地图",
    desc: "探索一张精心策划的瑞光大金塔互动地图，详细介绍亭台、神殿和周边地点。",
    button: "在谷歌地图中打开"
  },
  hi: {
    title: "इंटरैक्टिव गाइड मैप",
    desc: "श्वेडागन पैगोडा का एक क्यूरेटेड, इंटरैक्टिव मैप एक्सप्लोर करें जो पवेलियन, श्राइन और आसपास के स्थानों का विवरण देता है।",
    button: "Google Maps में खोलें"
  },
  ja: {
    title: "インタラクティブガイドマップ",
    desc: "シュエダゴン・パゴダの厳選されたインタラクティブマップで、パビリオン、礼拝所、周辺の場所を詳しく探索してください。",
    button: "Google Mapsで開く"
  },
  ko: {
    title: "인터랙티브 가이드 맵",
    desc: "슈웨다곤 파고다의 큐레이션된 인터랙티브 맵으로 파빌리온, 사당 및 주변 위치를 자세히 탐색하세요.",
    button: "Google Maps에서 열기"
  },
  th: {
    title: "แผนที่แนะนำแบบโต้ตอบ",
    desc: "สำรวจแผนที่โต้ตอบที่คัดสรรมาของเจดีย์ชเวดากอนที่อธิบายรายละเอียดของศาลา ศาสนสถาน และสถานที่โดยรอบ",
    button: "เปิดใน Google Maps"
  },
  ms: {
    title: "Peta Panduan Interaktif",
    desc: "Terokai peta interaktif yang dikurasi Pagoda Shwedagon yang merinci pavilion, kuil dan lokasi sekitar.",
    button: "Buka di Google Maps"
  },
  id: {
    title: "Peta Panduan Interaktif",
    desc: "Jelajahi peta interaktif yang dikurasi Pagoda Shwedagon yang merinci paviliun, kuil, dan lokasi sekitarnya.",
    button: "Buka di Google Maps"
  },
  vi: {
    title: "Bản Đồ Hướng Dẫn Tương Tác",
    desc: "Khám phá bản đồ tương tác được tuyển chọn của Chùa Shwedagon chi tiết các đình, tháp và địa điểm xung quanh.",
    button: "Mở trong Google Maps"
  }
};

function MapsSection({ lang, t }: { lang: string; t: (k: string) => string }) {
  const ui = MAP_TRANSLATIONS[lang] || MAP_TRANSLATIONS["en"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto">
      <SectionHeader title={t('maps')} subtitle={t('interactiveMap')} icon={MapIcon} />
      <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
        <Card className="bg-white border-gold-soft/10 rounded-[2rem] overflow-hidden shadow-sm">
          <CardContent className="p-8 space-y-6">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gold-soft/10 to-amber-50/30 relative">
              <img 
                src="https://thutatravel.com/wp-content/uploads/2018/01/002_1920_1080-1500x844.jpg" 
                alt="Shwedagon Pagoda Aerial View" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1623063529241-768fd587ca83?auto=format&fit=crop&q=80&w=1200';
                }}
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button 
                  size="lg"
                  onClick={() => window.open("https://www.google.com/maps/place/Shwedagon+Pagoda/@16.7986,96.1505,17z", "_blank")}
                  className="bg-white text-gold-deep hover:bg-gold-soft hover:text-white shadow-xl px-8 py-6 rounded-full font-bold text-lg transition-all"
                >
                  <MapIcon size={24} className="mr-2" />
                  {ui.button}
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="serif text-xl font-bold text-gold-deep">{ui.title}</h3>
              <p className="text-gray-600 leading-relaxed">{ui.desc}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer langCode={lang} />
    </motion.div>
  );
}

const OFFLINE_PHRASES = [
  { script: "မင်္ဂလာပါ", phonetic: "Mingalaba", category: "greetings", meanings: { en: "Hello / Greetings", my: "မင်္ဂလာပါ", es: "Hola", fr: "Bonjour", it: "Ciao", de: "Hallo", pt: "Olá", ru: "Привет", he: "שלום", zh: "你好", hi: "नमस्ते", ja: "こんにちは", ko: "안녕하세요", th: "สวัสดี", ms: "Hai", id: "Halo", vi: "Xin chào" } },
  { script: "ကျေးဇူးတင်ပါသည်", phonetic: "Kyay zu tin par", category: "greetings", meanings: { en: "Thank you", my: "ကျေးဇူးတင်ပါသည်", es: "Gracias", fr: "Merci", it: "Grazie", de: "Danke", pt: "Obrigado", ru: "Спасибо", he: "תודה", zh: "谢谢", hi: "धन्यवाद", ja: "ありがとう", ko: "감사합니다", th: "ขอบคุณ", ms: "Terima kasih", id: "Terima kasih", vi: "Cảm ơn" } },
  { script: "တော်လှန်းပါ", phonetic: "Thau lan par", category: "etiquette", meanings: { en: "Excuse me", my: "တော်လှန်းပါ", es: "Disculpe", fr: "Excusez-moi", it: "Scusi", de: "Entschuldigung", pt: "Com licença", ru: "Извините", he: "סליחה", zh: "不好意思", hi: "क्षमा करें", ja: "すみません", ko: "실례합니다", th: "ขอโทษ", ms: "Maaf", id: "Maaf", vi: "Xin lỗi" } },
  { script: "ဘယ်လိုလမ်းသွားရမလဲ", phonetic: "Be lo lan thar ya mal", category: "directions", meanings: { en: "How do I get there?", my: "ဘယ်လိုလမ်းသွားရမလဲ", es: "¿Cómo llego allí?", fr: "Comment y aller?", it: "Come arrivo lì?", de: "Wie komme ich dorthin?", pt: "Como chegar lá?", ru: "Как туда добраться?", he: "איך להגיע לשם?", zh: "怎么去那里？", hi: "वहां कैसे जाएं?", ja: "そこへどう行けばいいですか？", ko: "거기 어떻게 가요?", th: "ไปที่นั่นยังไง", ms: "Bagaimana nak pergi ke sana?", id: "Bagaimana cara ke sana?", vi: "Làm sao để đến đó?" } },
  { script: "ဘာစားချင်လဲ", phonetic: "Ba sa chin mal", category: "dining", meanings: { en: "What would you like to eat?", my: "ဘာစားချင်လဲ", es: "¿Qué te gustaría comer?", fr: "Qu'est-ce que vous aimeriez manger?", it: "Cosa vorresti mangiare?", de: "Was möchtest du essen?", pt: "O que você gostaria de comer?", ru: "Что вы хотите поесть?", he: "מה היית רוצה לאכול?", zh: "你想吃什么？", hi: "आप क्या खाना चाहेंगे?", ja: "何を食べたいですか？", ko: "뭐 먹고 싶어요?", th: "คุณอยากกินอะไร", ms: "Apa awak nak makan?", id: "Apa yang ingin Anda makan?", vi: "Bạn muốn ăn gì?" } },
  { script: "ကူညီပါ", phonetic: "Ku yee par", category: "emergency", meanings: { en: "Help!", my: "ကူညီပါ", es: "¡Ayuda!", fr: "À l'aide!", it: "Aiuto!", de: "Hilfe!", pt: "Socorro!", ru: "Помогите!", he: "עזרה!", zh: "救命！", hi: "मदद!", ja: "助けて！", ko: "도와주세요!", th: "ช่วยด้วย", ms: "Tolong!", id: "Tolong!", vi: "Cứu tôi!" } },
];

const PHRASES_LOCALIZED_UI: Record<string, any> = {
  en: {
    searchPlaceholder: "Search phrases or meanings...",
    allCategories: "All phrases",
    categoryGreetings: "Greetings",
    categoryEtiquette: "Pagoda Etiquette",
    categoryDirections: "Directions & Travel",
    categoryDining: "Food & Dining",
    categoryEmergency: "Emergency & Help",
    quizTab: "Practice Quiz",
    dictionaryTab: "Offline Phrasebook",
    flashcardsTab: "Learning Flashcards",
    quizCorrect: "Correct! 🎉",
    quizIncorrect: "Incorrect! Study the phrase and try again. 💡",
    quizHeader: "Practice Quiz",
    quizSub: "Test your Burmese completely offline!",
    score: "Score",
    streak: "Streak",
    question: "Question",
    whatsTheBurmeseFor: "What's the Burmese for:",
    categoryFilter: "Filter category",
    tapToFlip: "Tap card to flip",
    nextQuestion: "Next question",
    playAgain: "Play again",
    copySuccess: "Copied successfully! 📋",
    copyBtn: "Copy script"
  },
  my: {
    searchPlaceholder: "ဝါကျများ သို့မဟုတ် အဓိပ္ပါယ်များကို ရှာဖွေပါ...",
    allCategories: "ဝါကျအားလုံး",
    categoryGreetings: "နှုတ်ဆက်ခြင်း",
    categoryEtiquette: "ဘုရားကျောင်းအလေ့အထုံ",
    categoryDirections: "လမ်းညွှန်နှင့် ခရီးသွား",
    categoryDining: "အစားအသောက်",
    categoryEmergency: "အရေးပေါ်နှင့် ကူညီမှု",
    quizTab: "လေ့ကျင့်မေးခွန်း",
    dictionaryTab: "အော့ဖ်လိုင်းဝါကျစာအုပ်",
    flashcardsTab: "လေ့လာရန်ကတ်များ",
    quizCorrect: "မှန်ကန်ပါသည်! 🎉",
    quizIncorrect: "မှားနေပါသည်! ဝါကျကို လေ့လာပြီး ထပ်စမ်းကြည့်ပါ။ 💡",
    quizHeader: "လေ့ကျင့်မေးခွန်း",
    quizSub: "မြန်မာဘာသာစကားကို အပြည့်အဝ အော့ဖ်လိုင်းတွင် စမ်းသပ်ပါ!",
    score: "ရမှတ်",
    streak: "ဆက်တိုက်မှန်",
    question: "မေးခွန်း",
    whatsTheBurmeseFor: "ဤအရာအတွက် မြန်မာစကားမှာ:",
    categoryFilter: "အမျိုးအစားစစ်ဆေး",
    tapToFlip: "ကတ်ကို နှိပ်ပါ",
    nextQuestion: "နောက်မေးခွန်း",
    playAgain: "ပြန်ကစားပါ",
    copySuccess: "ကူးယူမှု အောင်မြင်ပါသည်! 📋",
    copyBtn: "စာကူးယူပါ"
  },
  es: {
    searchPlaceholder: "Buscar frases o significados...",
    allCategories: "Todas las frases",
    categoryGreetings: "Saludos",
    categoryEtiquette: "Etiqueta del Templo",
    categoryDirections: "Direcciones y Viajes",
    categoryDining: "Comida y Restauración",
    categoryEmergency: "Emergencias y Ayuda",
    quizTab: "Cuestionario Práctico",
    dictionaryTab: "Guía de Conversación Offline",
    flashcardsTab: "Tarjetas de Aprendizaje",
    quizCorrect: "¡Correcto! 🎉",
    quizIncorrect: "¡Incorrecto! Estudia la frase y vuelve a intentarlo. 💡",
    quizHeader: "Cuestionario Práctico",
    quizSub: "¡Pon a prueba tu birmano completamente fuera de línea!",
    score: "Puntuación",
    streak: "Racha",
    question: "Pregunta",
    whatsTheBurmeseFor: "¿Cuál es la expresión birmana para:",
    categoryFilter: "Filtrar categoría",
    tapToFlip: "Toca la tarjeta para voltear",
    nextQuestion: "Siguiente pregunta",
    playAgain: "Jugar de nuevo",
    copySuccess: "¡Copiado con éxito! 📋",
    copyBtn: "Copiar escritura"
  },
  fr: {
    searchPlaceholder: "Rechercher des phrases ou significations...",
    allCategories: "Toutes les phrases",
    categoryGreetings: "Salutations",
    categoryEtiquette: "Étiquette de la Pagode",
    categoryDirections: "Directions et Voyages",
    categoryDining: "Restauration",
    categoryEmergency: "Urgences et Aide",
    quizTab: "Quiz Pratique",
    dictionaryTab: "Guide de Conversation Hors Ligne",
    flashcardsTab: "Cartes d'Apprentissage",
    quizCorrect: "Correct ! 🎉",
    quizIncorrect: "Incorrect ! Étudiez la phrase et réessayez. 💡",
    quizHeader: "Quiz Pratique",
    quizSub: "Testez vos connaissances en birman complètement hors ligne !",
    score: "Score",
    streak: "Série",
    question: "Question",
    whatsTheBurmeseFor: "Quelle est l'expression birmane pour :",
    categoryFilter: "Filtrer la catégorie",
    tapToFlip: "Appuyez pour retourner la carte",
    nextQuestion: "Question suivante",
    playAgain: "Rejouer",
    copySuccess: "Copié avec succès ! 📋",
    copyBtn: "Copier le texte"
  },
  it: {
    searchPlaceholder: "Cerca frasi o significati...",
    allCategories: "Tutte le frasi",
    categoryGreetings: "Saluti",
    categoryEtiquette: "Etichetta della Pagoda",
    categoryDirections: "Direzioni e Viaggi",
    categoryDining: "Cibo e Ristorazione",
    categoryEmergency: "Emergenze e Aiuto",
    quizTab: "Quiz Pratico",
    dictionaryTab: "Conversazione Offline",
    flashcardsTab: "Flashcard d'Apprendimento",
    quizCorrect: "Corretto! 🎉",
    quizIncorrect: "Errato! Studia la frase e riprova. 💡",
    quizHeader: "Quiz Pratico",
    quizSub: "Metti alla prova il tuo birmano completamente offline!",
    score: "Punteggio",
    streak: "Serie",
    question: "Domanda",
    whatsTheBurmeseFor: "Qual è l'espressione birmana per:",
    categoryFilter: "Filtra Categoria",
    tapToFlip: "Tocca la tessera per girarla",
    nextQuestion: "Prossima Domanda",
    playAgain: "Gioca Ancora",
    copySuccess: "Copiato con successo! 📋",
    copyBtn: "Copia Scrittura"
  },
  de: {
    searchPlaceholder: "Phrasen oder Bedeutungen suchen...",
    allCategories: "Alle Sätze",
    categoryGreetings: "Begrüßungen",
    categoryEtiquette: "Pagoden-Etikette",
    categoryDirections: "Wegbeschreibung & Reisen",
    categoryDining: "Essen & Trinken",
    categoryEmergency: "Notfall & Hilfe",
    quizTab: "Übungs-Quiz",
    dictionaryTab: "Sprachführer Offline",
    flashcardsTab: "Lernkarten",
    quizCorrect: "Richtig! 🎉",
    quizIncorrect: "Falsch! Lerne die Redewendung und versuche es erneut. 💡",
    quizHeader: "Übungs-Quiz",
    quizSub: "Testen Sie Ihre Burmesisch-Kenntnisse komplett offline!",
    score: "Punkte",
    streak: "Serie",
    question: "Frage",
    whatsTheBurmeseFor: "Was ist der burmesische Ausdruck für:",
    categoryFilter: "Kategorie filtern",
    tapToFlip: "Karte antippen zum Umdrehen",
    nextQuestion: "Nächste Frage",
    playAgain: "Nochmal spielen",
    copySuccess: "Erfolgreich kopiert! 📋",
    copyBtn: "Schrift kopieren"
  },
  pt: {
    searchPlaceholder: "Pesquisar frases ou significados...",
    allCategories: "Todas as frases",
    categoryGreetings: "Saudações",
    categoryEtiquette: "Etiqueta do Templo",
    categoryDirections: "Direções & Viagem",
    categoryDining: "Alimentação & Bebidas",
    categoryEmergency: "Emergência & Ajuda",
    quizTab: "Quiz de Treino",
    dictionaryTab: "Guia de Conversação",
    flashcardsTab: "Cartões de Aprendizagem",
    quizCorrect: "Correto! 🎉",
    quizIncorrect: "Incorreto! Estude a frase e tente novamente. 💡",
    quizHeader: "Quiz de Treino",
    quizSub: "Teste suas habilidades de birmanês totalmente offline!",
    score: "Pontuação",
    streak: "Sequência",
    question: "Pergunta",
    whatsTheBurmeseFor: "Qual é a expressão birmanesa para:",
    categoryFilter: "Filtrar por categoria",
    tapToFlip: "Toque no cartão para virar",
    nextQuestion: "Próxima Pergunta",
    playAgain: "Jogar Novamente",
    copySuccess: "Copiado com sucesso! 📋",
    copyBtn: "Copiar Escrita"
  },
  ru: {
    searchPlaceholder: "Поиск фраз или значений...",
    allCategories: "Все фразы",
    categoryGreetings: "Приветствия",
    categoryEtiquette: "Правила пагоды",
    categoryDirections: "Маршруты и поездки",
    categoryDining: "Еда и напитки",
    categoryEmergency: "Экстренная помощь",
    quizTab: "Практический тест",
    dictionaryTab: "Разговорник оффлайн",
    flashcardsTab: "Обучающие карточки",
    quizCorrect: "Правильно! 🎉",
    quizIncorrect: "Неправильно! Изучите фразу и попробуйте еще раз. 💡",
    quizHeader: "Практический тест",
    quizSub: "Проверьте свои знания бирманского языка полностью в автономном режиме!",
    score: "Счет",
    streak: "Серия",
    question: "Вопрос",
    whatsTheBurmeseFor: "Какое бирманское выражение используется для:",
    categoryFilter: "Фильтр категорий",
    tapToFlip: "Нажмите на карточку, чтобы перевернуть ее",
    nextQuestion: "Следующий вопрос",
    playAgain: "Сыграть еще раз",
    copySuccess: "Успешно скопировано! 📋",
    copyBtn: "Копировать текст"
  },
  he: {
    searchPlaceholder: "חפש ביטויים או פירושים...",
    allCategories: "כל הביטויים",
    categoryGreetings: "ברכות לשלום",
    categoryEtiquette: "נימוסי הפגודה",
    categoryDirections: "כיוונים ונסיעות",
    categoryDining: "אוכל ומזון",
    categoryEmergency: "חירום ועזרה",
    quizTab: "בחן את עצמך",
    dictionaryTab: "שיחון אופליין",
    flashcardsTab: "כרטיסיות לימוד",
    quizCorrect: "נכון מאוד! 🎉",
    quizIncorrect: "טעות! למד את הביטוי ונסה שוב. 💡",
    quizHeader: "מבחן בורמзית אופליין",
    quizSub: "בחן את כישורי הבורמזית שלך באופן לא מקוון לחלוטין!",
    score: "ציון",
    streak: "רצף",
    question: "שאלה",
    whatsTheBurmeseFor: "מהו הביטוי הבורמזי עבור:",
    categoryFilter: "סנן קטגוריה",
    tapToFlip: "לחץ על הכרטיסייה כדי להפוך",
    nextQuestion: "השאלה הבאה",
    playAgain: "שחק שוב",
    copySuccess: "הועתק בהצלחה! 📋",
    copyBtn: "העתק ביטוי"
  },
  zh: {
    searchPlaceholder: "搜索短语或释义...",
    allCategories: "所有常用语",
    categoryGreetings: "社交问候",
    categoryEtiquette: "寺庙礼仪",
    categoryDirections: "交通与问路",
    categoryDining: "餐饮美食",
    categoryEmergency: "紧急求助",
    quizTab: "模拟小测试",
    dictionaryTab: "离线常用语手册",
    flashcardsTab: "词汇卡片",
    quizCorrect: "回答正确！🎉",
    quizIncorrect: "回答错误！掌握该表达后重试。💡",
    quizHeader: "缅语能力测试",
    quizSub: "在离线状态下随时测试您的缅甸语掌握水平！",
    score: "积分",
    streak: "连胜",
    question: "问题",
    whatsTheBurmeseFor: "以下短语的缅语表达是：",
    categoryFilter: "选择类别",
    tapToFlip: "轻点卡片进行翻转",
    nextQuestion: "下一题",
    playAgain: "重新开始",
    copySuccess: "复制成功！📋",
    copyBtn: "复制文字"
  },
  hi: {
    searchPlaceholder: "वाक्यांश या अर्थ खोजें...",
    allCategories: "सभी वाक्यांश",
    categoryGreetings: "अभिवादन",
    categoryEtiquette: "शिष्टाचार पैगोडा",
    categoryDirections: "दिशा और यात्रा",
    categoryDining: "भोजन और पेय",
    categoryEmergency: "आपातकालीन सहायता",
    quizTab: "अभ्यास प्रश्नोत्तरी",
    dictionaryTab: "वाक्यांशपुस्तिका ऑफ़लाइन",
    flashcardsTab: "लर्निंग फ्लैशकार्ड",
    quizCorrect: "सही है! 🎉",
    quizIncorrect: "गलत! वाक्यांश का अध्ययन करें और पुनः प्रयास करें। 💡",
    quizHeader: "प्रश्नोत्तरी",
    quizSub: "पूरी तरह से ऑफ़लाइन बर्मी भाषा कौशल का परीक्षण करें!",
    score: "स्कोर",
    streak: "लगातार सही",
    question: "प्रश्न",
    whatsTheBurmeseFor: "इसके लिए बर्मी वाक्यांश क्या है:",
    categoryFilter: "श्रेणी फ़िल्टर",
    tapToFlip: "पलटने के लिए कार्ड पर टैप करें",
    nextQuestion: "अगला प्रश्न",
    playAgain: "फिर से खेलें",
    copySuccess: "सफलतापूर्वक कॉपी किया गया! 📋",
    copyBtn: "कॉपी करें"
  },
  ja: {
    searchPlaceholder: "フレーズや意味を検索...",
    allCategories: "すべての表現",
    categoryGreetings: "挨拶・会話",
    categoryEtiquette: "パゴダの参拝マナー",
    categoryDirections: "道案内・移動",
    categoryDining: "食事・ショッピング",
    categoryEmergency: "緊急事態・トラブル",
    quizTab: "練習クイズ",
    dictionaryTab: "旅行会話集オフライン",
    flashcardsTab: "学習カード",
    quizCorrect: "正解です！🎉",
    quizIncorrect: "不正解！フレーズを覚えて再挑戦。💡",
    quizHeader: "会話クイズ",
    quizSub: "完全オフラインでビルマ語力をテストしましょう！",
    score: "スコア",
    streak: "連続正解",
    question: "問題",
    whatsTheBurmeseFor: "次の意味を表すビルマ語はどちらですか：",
    categoryFilter: "カテゴリを絞り込む",
    tapToFlip: "タップしてカードを裏返す",
    nextQuestion: "次の問題",
    playAgain: "もう一度プレイ",
    copySuccess: "コピーに成功しました！📋",
    copyBtn: "文字をコピー"
  },
  ko: {
    searchPlaceholder: "구문 또는 뜻 검색...",
    allCategories: "모든 표현",
    categoryGreetings: "인사 및 소셜",
    categoryEtiquette: "불탑 예절",
    categoryDirections: "방향 및 교통",
    categoryDining: "식사 및 음식",
    categoryEmergency: "긴급 및 구조",
    quizTab: "연습 퀴즈",
    dictionaryTab: "오프라인 회화 수첩",
    flashcardsTab: "학습 카드",
    quizCorrect: "정답입니다! 🎉",
    quizIncorrect: "오답입니다! 표현을 공부하고 다시 도전하세요. 💡",
    quizHeader: "미얀마어 퀴즈",
    quizSub: "완벽한 오프라인 환경에서 미얀마어 실력을 테스트하세요!",
    score: "점수",
    streak: "연속 정답",
    question: "문항",
    whatsTheBurmeseFor: "다음 표현을 뜻하는 미얀마어는 무엇일까요:",
    categoryFilter: "카테고리 필터",
    tapToFlip: "뒤집으려면 카드를 터치하세요",
    nextQuestion: "다음 문항",
    playAgain: "다시 하기",
    copySuccess: "성공적으로 복사되었습니다! 📋",
    copyBtn: "스크립트 복사"
  },
  th: {
    searchPlaceholder: "ค้นหาวลีหรือความหมาย...",
    allCategories: "วลีทั้งหมด",
    categoryGreetings: "คำทักทาย",
    categoryEtiquette: "ข้อควรปฏิบัติในวัดเจดีย์",
    categoryDirections: "ทิศทางและการขนส่ง",
    categoryDining: "การรับประทานอาหาร",
    categoryEmergency: "ช่วยเหลือกรณีฉุกเฉิน",
    quizTab: "แบบทดสอบฝึกฝน",
    dictionaryTab: "คู่มือสนทนาออฟไลน์",
    flashcardsTab: "บัตรคำคำศัพท์",
    quizCorrect: "ถูกต้องแล้ว! 🎉",
    quizIncorrect: "ไม่ถูกต้อง! เรียนรู้วลีนี้แล้วลองใหม่อีกครั้ง 💡",
    quizHeader: "คำถามทดสอบภาษาเมียนมา",
    quizSub: "ทดสอบภาษาเมียนมาของท่านแบบออฟไลน์ได้อย่างเต็มที่!",
    score: "คะแนน",
    streak: "สถิติติดต่อกัน",
    question: "คำถาม",
    whatsTheBurmeseFor: "สำนวนพม่าสำหรับประโยคนี้คืออะไร:",
    categoryFilter: "กรองประเภท",
    tapToFlip: "แตะบัตรเพื่อพลิกคำศัพท์",
    nextQuestion: "คำถามถัดไป",
    playAgain: "เล่นใหม่อีกครั้ง",
    copySuccess: "คัดลอกเรียบร้อยแล้ว! 📋",
    copyBtn: "คัดลอกตัวอักษร"
  },
  ms: {
    searchPlaceholder: "Cari frasa atau makna...",
    allCategories: "Semua Frasa",
    categoryGreetings: "Salam & Teguran",
    categoryEtiquette: "Adab Melawat Tokong",
    categoryDirections: "Arah & Pengangkutan",
    categoryDining: "Makanan & Pesanan",
    categoryEmergency: "Kecemasan & Tolong",
    quizTab: "Kuiz Latihan",
    dictionaryTab: "Buku Frasa Offline",
    flashcardsTab: "Kad Imbasan",
    quizCorrect: "Betul! 🎉",
    quizIncorrect: "Salah! Kaji semula frasa itu dan cuba lagi. 💡",
    quizHeader: "Kuiz Latihan",
    quizSub: "Uji kemahiran bahasa Myanmar anda secara luar talian sepenuhnya!",
    score: "Markah",
    streak: "Siri Betul",
    question: "Soalan",
    whatsTheBurmeseFor: "Apakah ungkapan Burma untuk:",
    categoryFilter: "Tapis Kategori",
    tapToFlip: "Ketik kad untuk menterbalikkan",
    nextQuestion: "Soalan Seterusnya",
    playAgain: "Main Semula",
    copySuccess: "Berjaya disalin! 📋",
    copyBtn: "Salin Skrip"
  },
  id: {
    searchPlaceholder: "Cari frasa atau arti...",
    allCategories: "Semua Frasa",
    categoryGreetings: "Salam & Sosial",
    categoryEtiquette: "Etika di Pagoda",
    categoryDirections: "Arah & Perjalanan",
    categoryDining: "Makanan & Minuman",
    categoryEmergency: "Darurat & Bantuan",
    quizTab: "Kuis Latihan",
    dictionaryTab: "Buku Frasa Offline",
    flashcardsTab: "Kartu Flashcard",
    quizCorrect: "Benar! 🎉",
    quizIncorrect: "Salah! Pelajari frasa ini dan coba lagi. 💡",
    quizHeader: "Kuis Latihan",
    quizSub: "Uji keterampilan bahasa Myanmar Anda sepenuhnya secara offline!",
    score: "Skor",
    streak: "Sesi Beruntun",
    question: "Pertanyaan",
    whatsTheBurmeseFor: "Apa ungkapan bahasa Burma untuk:",
    categoryFilter: "Filter Kategori",
    tapToFlip: "Ketuk kartu untuk membalik halaman",
    nextQuestion: "Pertanyaan Berikutnya",
    playAgain: "Main Lagi",
    copySuccess: "Salin berhasil! 📋",
    copyBtn: "Salin Tulisan"
  },
  vi: {
    searchPlaceholder: "Tìm kiếm cụ cụm hoặc nghĩa...",
    allCategories: "Tất cả cụm từ",
    categoryGreetings: "Chào hỏi & Giao tiếp",
    categoryEtiquette: "Nghi lễ tại Chùa",
    categoryDirections: "Phương hướng & Đi lại",
    categoryDining: "Ẩm thực & Thức ăn",
    categoryEmergency: "Khấn cấp & Trợ giúp",
    quizTab: "Trắc nghiệm",
    dictionaryTab: "Sổ tay Từ vựng Ngoại tuyến",
    flashcardsTab: "Thẻ Ghi nhớ Flashcard",
    quizCorrect: "Chính xác! 🎉",
    quizIncorrect: "Chưa đúng! Hãy ôn lại cụm từ và thử lại nhé. 💡",
    quizHeader: "Trắc nghiệm Tiếng Myanmar",
    quizSub: "Kiểm tra kỹ năng tiếng Myanmar hoàn toàn ngoại tuyến!",
    score: "Điểm",
    streak: "Chuỗi liên tiếp",
    question: "Câu hỏi",
    whatsTheBurmeseFor: "Cụm từ tiếng Myanmar tương ứng nào dành cho:",
    categoryFilter: "Bộ lọc chuyên mục",
    tapToFlip: "Nhấp vào thẻ để lật xem nghĩa",
    nextQuestion: "Câu tiếp theo",
    playAgain: "Chơi lại",
    copySuccess: "Đã sao chép thành công! 📋",
    copyBtn: "Sao chép chữ"
  }
};

function PhrasesSection({ t, lang, langName }: { t: (k: string) => string, lang: string, langName: string }) {
  const ui = PHRASES_LOCALIZED_UI[lang] || PHRASES_LOCALIZED_UI["en"];
  
  const [activeTab, setActiveTab] = useState<"dictionary" | "flashcards" | "quiz">("dictionary");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<{ script: string; phonetic: string }[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const categories = [
    { id: "all", label: ui.allCategories },
    { id: "greetings", label: ui.categoryGreetings },
    { id: "etiquette", label: ui.categoryEtiquette },
    { id: "directions", label: ui.categoryDirections },
    { id: "dining", label: ui.categoryDining },
    { id: "emergency", label: ui.categoryEmergency }
  ];

  const filteredPhrases = OFFLINE_PHRASES.filter(phrase => {
    const meaning = phrase.meanings[lang] || phrase.meanings["en"];
    const matchesSearch = meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          phrase.phonetic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          phrase.script.includes(searchQuery);
    const matchesCategory = categoryFilter === "all" || phrase.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (phraseText: string, index: number) => {
    navigator.clipboard.writeText(phraseText).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleFlipCard = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const setupQuizQuestion = (index: number) => {
    const currentCorrect = OFFLINE_PHRASES[index];
    if (!currentCorrect) return;

    const others = OFFLINE_PHRASES.filter((_, idx) => idx !== index);
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5);
    const distractors = shuffledOthers.slice(0, 3).map(p => ({ script: p.script, phonetic: p.phonetic }));

    const options = [
      { script: currentCorrect.script, phonetic: currentCorrect.phonetic },
      ...distractors
    ];

    setShuffledOptions(options.sort(() => Math.random() - 0.5));
    setSelectedOption(null);
    setIsAnswered(false);
    setIsWrongAnswer(false);
  };

  useEffect(() => {
    if (activeTab === "quiz") {
      setQuizIndex(0);
      setQuizScore(0);
      setQuizStreak(0);
      setQuizFinished(false);
      setupQuizQuestion(0);
    }
  }, [activeTab]);

  const handleAnswerQuiz = (optionScript: string) => {
    if (isAnswered) return;
    
    const correctPhrase = OFFLINE_PHRASES[quizIndex];
    setSelectedOption(optionScript);
    setIsAnswered(true);

    if (optionScript === correctPhrase.script) {
      setQuizScore(score => score + 1);
      setQuizStreak(streak => streak + 1);
      setIsWrongAnswer(false);
    } else {
      setQuizStreak(0);
      setIsWrongAnswer(true);
    }
  };

  const handleNextQuiz = () => {
    const nextIdx = quizIndex + 1;
    if (nextIdx < OFFLINE_PHRASES.length) {
      setQuizIndex(nextIdx);
      setupQuizQuestion(nextIdx);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setQuizStreak(0);
    setQuizFinished(false);
    setupQuizQuestion(0);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto">
      <SectionHeader title={t('phrases')} subtitle={t('basicBurmese')} icon={Globe} />
      
      <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto">
        <div className="flex bg-cream/30 p-1.5 rounded-2xl border border-gold-soft/20 gap-1">
          <button
            onClick={() => setActiveTab("dictionary")}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl text-center transition-all ${
              activeTab === "dictionary"
                ? "bg-gold-deep text-white shadow"
                : "text-gray-600 hover:text-gold-deep hover:bg-gold-soft/5"
            }`}
          >
            {ui.dictionaryTab}
          </button>
          <button
            onClick={() => setActiveTab("flashcards")}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl text-center transition-all ${
              activeTab === "flashcards"
                ? "bg-gold-deep text-white shadow"
                : "text-gray-600 hover:text-gold-deep hover:bg-gold-soft/5"
            }`}
          >
            {ui.flashcardsTab}
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl text-center transition-all ${
              activeTab === "quiz"
                ? "bg-gold-deep text-white shadow"
                : "text-gray-600 hover:text-gold-deep hover:bg-gold-soft/5"
            }`}
          >
            {ui.quizTab}
          </button>
        </div>

        {activeTab === "dictionary" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-soft h-5 w-5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={ui.searchPlaceholder}
                  className="pl-12 rounded-2xl border-gold-soft/20 focus-visible:ring-gold-deep bg-white h-12"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-2xl border transition-all ${
                    categoryFilter === cat.id
                      ? "bg-gold-soft/10 text-gold-deep border-gold-deep/30"
                      : "bg-white text-gray-600 border-gray-100 hover:border-gold-soft"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPhrases.map((phrase, i) => {
                const phraseIndex = OFFLINE_PHRASES.findIndex(p => p.script === phrase.script);
                const meaning = phrase.meanings[lang] || phrase.meanings["en"];
                return (
                  <Card key={i} className="bg-white border-gold-soft/10 rounded-2xl overflow-hidden shadow-sm hover:shadow hover:border-gold-soft transition-all">
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex justify-between items-start gap-3">
                        <div className="space-y-1">
                          <span className="text-3xl font-bold text-gold-deep block tracking-wider">{phrase.script}</span>
                          <span className="inline-block bg-cream text-gold-deep text-xs font-semibold font-mono px-2.5 py-1 rounded-full">{phrase.phonetic}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleCopy(phrase.script, phraseIndex)}
                          className="text-gold-soft hover:text-gold-deep hover:bg-gold-soft/5 rounded-xl h-10 w-10 shrink-0"
                          title={ui.copyBtn}
                        >
                          {copiedIndex === phraseIndex ? <Check className="text-green-600" size={18} /> : <Copy size={18} />}
                        </Button>
                      </div>

                      <Separator className="bg-gold-soft/5" />
                      
                      <div className="flex justify-between items-center">
                        <p className="text-gray-700 font-semibold text-sm">{meaning}</p>
                        <Badge variant="secondary" className="bg-gray-50 text-[10px] text-gray-500 hover:bg-gray-50 uppercase tracking-widest px-2 font-mono">
                          {phrase.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {filteredPhrases.length === 0 && (
                <div className="col-span-full py-16 text-center text-gray-400 font-medium italic">
                  No phrases found matching yours criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "flashcards" && (
          <div className="space-y-6">
            <p className="text-center text-xs text-gray-400 font-medium italic mt-2">
              {ui.tapToFlip}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {OFFLINE_PHRASES.map((phrase, i) => {
                const isFlipped = !!flippedCards[i];
                const meaning = phrase.meanings[lang] || phrase.meanings["en"];
                return (
                  <div 
                    key={i} 
                    onClick={() => handleFlipCard(i)}
                    className="h-44 w-full cursor-pointer perspective"
                  >
                    <div className={`relative w-full h-full duration-500 transform-style transition-all ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}>
                      <Card className="absolute inset-0 bg-white border-2 border-gold-soft/10 rounded-2xl flex flex-col justify-between p-5 backface-hidden shadow-sm hover:border-gold-soft/50 transition-all">
                        <Badge variant="outline" className="self-start text-[9px] uppercase tracking-wider text-gray-400">
                          {phrase.category}
                        </Badge>
                        <div className="text-center">
                          <p className="text-base font-bold text-gray-800 leading-snug px-2">{meaning}</p>
                        </div>
                        <span className="text-[10px] text-gold-soft font-semibold tracking-wider text-center uppercase">
                          TAP CARD TO TRANSLATE
                        </span>
                      </Card>

                      <Card className="absolute inset-x-0 inset-y-0 w-full h-full bg-amber-50/50 border-2 border-gold-soft rounded-2xl flex flex-col justify-between p-5 rotate-y-180 backface-hidden shadow">
                        <Badge className="self-start bg-gold-soft/15 text-gold-deep hover:bg-gold-soft/15 text-[9px] uppercase tracking-wider font-mono">
                          Burmese
                        </Badge>
                        <div className="text-center space-y-2">
                          <p className="text-3xl font-extrabold text-gold-deep tracking-wider">{phrase.script}</p>
                          <p className="text-xs font-mono font-bold text-gray-600 tracking-wide">phonetic: {phrase.phonetic}</p>
                        </div>
                        <span className="text-[10px] text-gold-deep/50 text-center font-bold tracking-wider uppercase">
                          TAP CARD
                        </span>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "quiz" && (
          <Card className="bg-white border border-gold-soft/20 rounded-[2.5rem] shadow-xl overflow-hidden">
            <CardHeader className="bg-gold-deep p-6 text-white text-center space-y-2">
              <CardTitle className="serif text-2xl font-bold flex items-center justify-center gap-2">
                <Award size={26} className="text-yellow-200" />
                {ui.quizHeader}
              </CardTitle>
              <CardDescription className="text-white/80 max-w-md mx-auto text-xs leading-relaxed">
                {ui.quizSub}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 md:p-8 shrink-0">
              {!quizFinished ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <span className="bg-cream/50 text-gold-deep px-3 py-1.5 rounded-full font-mono">
                      {ui.question} {quizIndex + 1} / {OFFLINE_PHRASES.length}
                    </span>
                    <div className="flex gap-4">
                      <span className="text-green-600 font-mono">
                        {ui.score}: {quizScore}
                      </span>
                      <span className="text-amber-600 font-mono flex items-center gap-1">
                        🔥 {ui.streak}: {quizStreak}
                      </span>
                    </div>
                  </div>

                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold-soft transition-all duration-300"
                      style={{ width: `${((quizIndex + 1) / OFFLINE_PHRASES.length) * 100}%` }}
                    />
                  </div>

                  <div className="text-center py-4 space-y-3 bg-cream/10 rounded-2xl border border-gold-soft/10 p-4">
                    <p className="text-xs text-gold-soft uppercase font-bold tracking-widest">{ui.whatsTheBurmeseFor}</p>
                    <p className="serif text-2xl md:text-3xl font-extrabold text-gold-deep leading-normal">
                      &ldquo;{OFFLINE_PHRASES[quizIndex]?.meanings[lang] || OFFLINE_PHRASES[quizIndex]?.meanings["en"]}&rdquo;
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {shuffledOptions.map((opt, idx) => {
                      const isSelected = selectedOption === opt.script;
                      const isCorrectAnswer = opt.script === OFFLINE_PHRASES[quizIndex]?.script;
                      
                      let btnStyle = "border-gray-100 hover:border-gold-soft bg-white text-gray-800";
                      
                      if (isAnswered) {
                        if (isCorrectAnswer) {
                          btnStyle = "border-green-500 bg-green-50 text-green-800 shadow-sm ring-1 ring-green-500";
                        } else if (isSelected) {
                          btnStyle = "border-red-500 bg-red-50 text-red-800 ring-1 ring-red-500";
                        } else {
                          btnStyle = "border-gray-50 bg-gray-50/50 text-gray-400 pointer-events-none";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleAnswerQuiz(opt.script)}
                          className={`w-full p-5 rounded-2xl border-2 font-semibold text-left transition-all duration-200 flex flex-col gap-1 shadow-sm hover:translate-y-[-1px] ${btnStyle}`}
                        >
                          <span className="text-2xl font-bold tracking-wider">{opt.script}</span>
                          <span className="text-xs font-mono opacity-80">{opt.phonetic}</span>
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl text-center space-y-3 border flex flex-col items-center justify-between gap-2"
                    >
                      {isWrongAnswer ? (
                        <p className="text-sm font-bold text-red-600">{ui.quizIncorrect}</p>
                      ) : (
                        <p className="text-sm font-bold text-green-600">{ui.quizCorrect}</p>
                      )}
                      
                      <Button 
                        onClick={handleNextQuiz}
                        className="w-full sm:w-auto bg-gold-deep hover:bg-gold-soft text-white px-8 h-12 rounded-xl text-xs font-bold uppercase tracking-wider"
                      >
                        {ui.nextQuestion}
                      </Button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="w-20 h-20 bg-gold-soft/20 text-gold-deep rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Award size={48} className="animate-pulse" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="serif text-3xl font-bold text-gold-deep">Quiz Completed!</h3>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                      You scored <strong className="text-gold-deep">{quizScore}</strong> out of <strong className="text-gold-deep">{OFFLINE_PHRASES.length}</strong> phrases correctly!
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Button 
                      onClick={handleRestartQuiz}
                      className="bg-gold-deep hover:bg-gold-soft text-white px-8 h-12 rounded-xl text-xs font-bold uppercase tracking-wider"
                    >
                      {ui.playAgain}
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="bg-gold-soft/5 border-gold-soft/20 rounded-3xl overflow-hidden shadow-inner pt-2">
          <CardContent className="p-6 md:p-8">
            <h3 className="serif text-xl text-gold-deep mb-3 font-semibold flex items-center gap-2">
              <Sparkles size={20} className="text-gold-soft" />
              {t('culturalTip')}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed font-normal">
              {t('culturalTipDesc')}
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer langCode={lang} />
    </motion.div>
  );
}

function ServicesSection({ t, onAskAmbassador, langCode }: { t: (k: string) => string, onAskAmbassador: (query: string) => void, langCode: string }) {
  const services = [
    { 
      title: t('carRentals'), 
      desc: t('carRentalsDesc'), 
      icon: Plane,
      action: () => onAskAmbassador("Tell me about car rental choices, rules, and recommendations near Shwedagon Pagoda.")
    },
    { 
      title: t('flightTickets'), 
      desc: t('flightTicketsDesc'), 
      icon: Plane,
      action: () => onAskAmbassador("Could you list options, domestic airlines, and tips for booking flights to and within Myanmar?")
    },
    { 
      title: t('visaGuidance'), 
      desc: t('visaGuidanceDesc'), 
      icon: Globe,
      action: () => onAskAmbassador("What are the visa requirements, eVisa processing time, and entry regulations for tourists visiting Myanmar?")
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto">
      <SectionHeader title={t('services')} subtitle={t('logisticsFacilitate')} icon={Plane} />
      <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <Card key={i} className="rounded-2xl border-gold-soft/10 hover:border-gold-soft transition-colors shadow-sm bg-white overflow-hidden relative">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-gold-deep shrink-0">
                  <service.icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{service.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs text-gray-500">{service.desc}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between pb-6 pt-0">
                <Button 
                  variant="link" 
                  className="text-gold-deep p-0 h-auto font-bold flex items-center gap-1 cursor-pointer"
                  onClick={service.action}
                >
                  {t('learnMore')} <ChevronRight size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer langCode={langCode} />
    </motion.div>
  );
}

function EmergencySection({ t, setActiveSection, langCode }: { t: (k: string) => string, setActiveSection: (s: Section) => void, langCode: string }) {
  const contacts = [
    { name: t('touristPolice'), phone: "199, 01-549309", icon: Phone },
    { name: t('ambulance'), phone: "192, 01-295133", icon: Phone },
    { name: t('fireDepartment'), phone: "191, 01-252011", icon: Phone },
    { name: t('yangonHospital'), phone: "01-256112, 01-256123", icon: Phone },
  ];

  const parsePhones = (phoneStr: string) => {
    return phoneStr.split(',').map(p => p.trim());
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto">
      <SectionHeader title={t('emergency')} subtitle={t('priorityAssistance')} icon={Phone} />
      <div className="p-6 md:p-8 space-y-6 max-w-2xl">
        <div className="bg-red-50 border border-red-100 p-6 rounded-3xl space-y-4">
          <p className="text-red-600 font-bold flex items-center gap-2">
            <Phone size={20} />
            {t('immediateAssistance')}
          </p>
          <div className="grid grid-cols-1 gap-3">
            {contacts.map((contact, i) => (
              <div key={i} className="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm">
                <span className="font-medium text-gray-700">{contact.name}</span>
                <div className="flex gap-2">
                  {parsePhones(contact.phone).map((p, idx) => (
                    <span key={idx}>
                      <a 
                        href={`tel:${p.replace(/\s+/g, '').replace(/-/g, '')}`} 
                        className="text-red-500 font-bold text-lg hover:underline"
                      >
                        {p}
                      </a>
                      {idx < parsePhones(contact.phone).length - 1 && <span className="text-gray-400 font-bold">,</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Card className="rounded-2xl border-gold-soft/10">
          <CardHeader>
            <CardTitle className="serif text-gold-deep">{t('safetyTips')}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <p>• {t('safetyTip1')}</p>
            <p>• {t('safetyTip2')}</p>
            <p>• {t('safetyTip3')}</p>
          </CardContent>
        </Card>

        <div className="pt-2">
          <Dialog>
            <DialogTrigger
              render={
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 py-6 rounded-2xl border-gold-soft/30 text-gold-deep hover:bg-gold-soft/10 hover:border-gold-soft transition-all font-bold shadow-sm group"
                >
                  <MapPin size={20} className="text-gold-soft group-hover:scale-110 transition-transform" />
                  {t('foreignEmbassies')}
                </Button>
              }
            />
            <DialogContent className="max-w-2xl max-h-[85vh] w-[95vw] rounded-3xl p-0 overflow-hidden flex flex-col border-gold-soft/20 shadow-2xl">
              <div className="bg-gold-deep p-6 text-white">
                <DialogHeader>
                  <DialogTitle className="serif text-2xl flex items-center gap-3">
                    <Globe className="text-gold-soft" size={28} />
                    {t('foreignEmbassies')}
                  </DialogTitle>
                  <DialogDescription className="text-gold-soft/80 text-sm">
                    Contact details and locations of diplomatic missions in Myanmar
                  </DialogDescription>
                </DialogHeader>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 bg-sacred-bg/30">
                <div className="markdown-content">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {FOREIGN_EMBASSIES_INFO}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="p-4 border-t border-gold-soft/10 bg-white flex justify-end">
                <DialogClose render={
                  <Button variant="ghost" className="rounded-xl text-gray-500 hover:text-gold-deep">
                    Close
                  </Button>
                } />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="pt-2">
          <Dialog>
            <DialogTrigger
              render={
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 py-6 rounded-2xl border-gold-soft/30 text-gold-deep hover:bg-gold-soft/10 hover:border-gold-soft transition-all font-bold shadow-sm group"
                >
                  <Info size={20} className="text-gold-soft group-hover:scale-110 transition-transform" />
                  {t('moreInfoBtn')}
                </Button>
              }
            />
            <DialogContent className="max-w-2xl max-h-[85vh] w-[95vw] rounded-3xl p-0 overflow-hidden flex flex-col border-gold-soft/20 shadow-2xl">
              <div className="bg-gold-deep p-6 text-white">
                <DialogHeader>
                  <DialogTitle className="serif text-2xl flex items-center gap-3">
                    <ShieldCheck className="text-gold-soft" size={28} />
                    {t('emergencyContacts')}
                  </DialogTitle>
                  <DialogDescription className="text-gold-soft/80 text-sm">
                    Comprehensive emergency and important numbers across Myanmar
                  </DialogDescription>
                </DialogHeader>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 bg-sacred-bg/30">
                <div className="markdown-content">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {t('detailedEmergencyInfo')}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="p-4 border-t border-gold-soft/10 bg-white flex justify-end">
                <DialogClose render={
                  <Button variant="ghost" className="rounded-xl text-gray-500 hover:text-gold-deep">
                    Close
                  </Button>
                } />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="pt-8 pb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setActiveSection('menu')}
            className="rounded-2xl border-gold-soft/30 text-gold-deep hover:bg-gold-soft/10 hover:border-gold-soft transition-all shadow-sm h-12 w-12"
          >
            <Home size={24} />
          </Button>
        </div>
      </div>
      <Footer langCode={langCode} />
    </motion.div>
  );
}

function MenuSection({ t, setActiveSection, navItems, langCode }: { t: (k: string) => string, setActiveSection: (s: Section) => void, navItems: any[], langCode: string }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnim = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex-1 overflow-y-auto bg-sacred-bg pb-20"
    >
      <SectionHeader title={t('menu')} subtitle={t('spiritualJourney')} icon={Menu} />
      
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              variants={itemAnim}
              whileHover={{ 
                scale: 1.05, 
                translateY: -5,
                boxShadow: "0 20px 25px -5px rgba(212, 175, 55, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(item.id as Section)}
              className="group relative flex flex-col items-center justify-center p-6 bg-white border border-gold-soft/10 rounded-[2rem] shadow-sm hover:border-gold-soft/40 transition-all overflow-hidden aspect-square"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${item.color || "bg-gold-soft/10 text-gold-deep"} group-hover:bg-gold-soft group-hover:text-white group-hover:rotate-6 shadow-inner`}>
                <item.icon size={32} className="md:size-10" />
              </div>
              <span className="serif font-bold text-sm md:text-base text-gold-deep text-center leading-tight">
                {t(item.id)}
              </span>
              
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold-soft/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-gold-soft/10 transition-colors" />
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={16} className="text-gold-soft" />
              </div>
            </motion.button>
          ))}
        </motion.div>

        <div className="mt-12 text-center p-8 bg-gold-soft/5 rounded-[3rem] border border-gold-soft/10">
          <Pagoda size={40} className="mx-auto text-gold-soft mb-4 opacity-40" />
          <h3 className="serif text-gold-deep font-bold text-lg mb-2">Shwedagon Digital Guide</h3>
          <p className="text-sm text-gray-500 italic max-w-sm mx-auto">
            "The Golden Wonder of the East, a symbol of faith and resilience."
          </p>
        </div>
      </div>
      <Footer langCode={langCode} />
    </motion.div>
  );
}
