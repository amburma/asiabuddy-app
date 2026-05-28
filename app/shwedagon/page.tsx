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
  Camera, 
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
  ShieldCheck
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
import { chatWithAmbassador, translateToMyanmar } from "./services/gemini";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { UI_TRANSLATIONS, FOREIGN_EMBASSIES_INFO } from "./translations";

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
    {/* Base tiers */}
    <path d="M3 21h18" />
    <path d="M5 21l1-3h12l1 3" />
    <path d="M6.5 18l1-2h9l1 2" />
    {/* The Bell (Anda) */}
    <path d="M8.5 16c0-3.5 1.5-6 3.5-6s3.5 2.5 3.5 6" />
    {/* Spire (Hti) and Crown */}
    <path d="M12 10v-2" />
    <path d="M10 8h4" />
    <path d="M10.5 7h3" />
    <path d="M11 6h2" />
    <path d="M12 6v-3" />
    <circle cx="12" cy="2.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

// Types
type Section = "ambassador" | "about" | "info" | "places" | "maps" | "services" | "emergency" | "phrases" | "menu";

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
  const [isAROpen, setIsAROpen] = useState(false);
  const [is360Open, setIs360Open] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isAROpen && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("AR Camera error:", err));
    } else if (!isAROpen && videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  }, [isAROpen]);
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

  const t = (key: string, overrideLang?: string) => {
    const lang = overrideLang || selectedLanguage?.code || "en";
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
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "model", text: "I apologize, but I encountered an error. Please check your connection." }]);
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
      .catch(err => {
        console.error(err);
        setMessages(prev => [...prev, { role: "model", text: "I apologize, but I encountered an error. Please check your connection." }]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
    { id: "phrases", label: "Useful Phrases", icon: Globe },
    { id: "services", label: "Services", icon: Plane },
    { id: "emergency", label: "Emergency", icon: Phone, color: "text-red-500" },
  ];

  return (
    <div className="flex h-screen bg-sacred-bg overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gold-soft/20 shadow-sm">
          <div className="p-6 flex items-center justify-between border-b border-gold-soft/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-soft rounded-full flex items-center justify-center text-white shadow-lg">
                <Pagoda size={24} />
              </div>
              <h1 className="serif font-bold text-lg text-gold-deep leading-tight">Shwedagon<br/>Pagoda</h1>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowWelcome(true)} className="text-gold-deep ml-2">
              <Globe size={20} />
            </Button>
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

        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gold-soft/20 z-50 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Pagoda className="text-gold-soft" size={24} />
            <span className="serif font-bold text-gold-deep">Shwedagon</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setShowWelcome(true)}>
              <Globe className="text-gold-deep" size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
              <Menu />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
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

        {/* Main Content */}
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

            {activeSection === "about" && <AboutSection t={t} setActiveSection={setActiveSection} isRTL={isRTL} />}
            {activeSection === "info" && <InfoSection t={t} setActiveSection={setActiveSection} isRTL={isRTL} />}
            {activeSection === "places" && <PlacesSection t={t} setActiveSection={setActiveSection} />}
            {activeSection === "maps" && (
              <MapsSection 
                is360Open={is360Open} setIs360Open={setIs360Open}
                isAudioOpen={isAudioOpen} setIsAudioOpen={setIsAudioOpen}
                isAROpen={isAROpen} setIsAROpen={setIsAROpen}
                videoRef={videoRef}
                t={t}
              />
            )}
            {activeSection === "phrases" && <PhrasesSection t={t} langName={selectedLanguage?.name || "English"} />}
            {activeSection === "services" && <ServicesSection t={t} onAskAmbassador={handleAskAmbassador} />}
            {activeSection === "emergency" && <EmergencySection t={t} setActiveSection={setActiveSection} />}
            {activeSection === "menu" && <MenuSection t={t} setActiveSection={setActiveSection} navItems={navItems} />}
          </AnimatePresence>
        </main>

        {/* Floating Chat Button (FAB) */}
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
      </div>
  );
}

// --- Sub-sections ---

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

function AboutSection({ t, setActiveSection, isRTL }: { t: (k: string, lang?: string) => string, setActiveSection: (s: Section) => void, isRTL: boolean }) {
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
    </motion.div>
  );
}

function InfoSection({ t, setActiveSection, isRTL }: { t: (k: string) => string, setActiveSection: (s: Section) => void, isRTL: boolean }) {
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
        
        {/* Main Practical Logistics Guide */}
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

        {/* System Instruction Card */}
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

        {/* Floating Navigation Buttons */}
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
    </motion.div>
  );
}

function PlacesSection({ t, setActiveSection }: { t: (k: string) => string, setActiveSection: (s: Section) => void }) {
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
      
      {/* Footer Navigation */}
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
    </motion.div>
  );
}

function MapsSection({ 
  is360Open, setIs360Open, 
  isAudioOpen, setIsAudioOpen, 
  isAROpen, setIsAROpen, 
  videoRef,
  t
}: { 
  is360Open: boolean; setIs360Open: (v: boolean) => void;
  isAudioOpen: boolean; setIsAudioOpen: (v: boolean) => void;
  isAROpen: boolean; setIsAROpen: (v: boolean) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  t: (k: string) => string;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto">
      <SectionHeader title={t('maps')} subtitle={t('findWay')} icon={MapIcon} />
      <div className="p-6 md:p-8 space-y-8 max-w-5xl">
        <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-inner relative group">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.146522716335!2d96.1474931758659!3d16.79834748400494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1ec9637375683%3A0x633902f50244675!2sShwedagon%20Pagoda!5e0!3m2!1sen!2smm!4v1713250000000!5m2!1sen!2smm" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button 
            variant="outline" 
            className="h-16 rounded-2xl border-gold-soft/20 hover:bg-gold-soft/5 text-gold-deep"
            onClick={() => setIs360Open(true)}
          >
            <Eye className="mr-2" /> {t('virtualTour')}
          </Button>
          <Button 
            variant="outline" 
            className="h-16 rounded-2xl border-gold-soft/20 hover:bg-gold-soft/5 text-gold-deep"
            onClick={() => setIsAudioOpen(true)}
          >
            <Volume2 className="mr-2" /> {t('audioGuide')}
          </Button>
          <Button 
            variant="outline" 
            className="h-16 rounded-2xl border-gold-soft/20 hover:bg-gold-soft/5 text-gold-deep"
            onClick={() => setIsAROpen(true)}
          >
            <Camera className="mr-2" /> {t('arNavigation')}
          </Button>
        </div>

        {/* 360 Modal */}
        <AnimatePresence>
          {is360Open && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 flex flex-col"
            >
              <div className="p-4 flex justify-between items-center text-white">
                <h3 className="serif text-xl">{t('panoramaView')}</h3>
                <Button variant="ghost" size="icon" onClick={() => setIs360Open(false)}><X /></Button>
              </div>
              <div className="flex-1 overflow-hidden relative">
                <motion.img 
                  src="https://picsum.photos/seed/shwedagon360/4000/800" 
                  className="h-full max-w-none cursor-grab active:cursor-grabbing"
                  drag="x"
                  dragConstraints={{ left: -3000, right: 0 }}
                />
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="bg-black/40 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                    {t('dragExplore')}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audio Guide Modal */}
        <AnimatePresence>
          {isAudioOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-[100] p-6"
            >
              <Card className="max-w-md mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="serif text-gold-deep">{t('audioGuideMain')}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsAudioOpen(false)}><X /></Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gold-soft" 
                      initial={{ width: 0 }} animate={{ width: "45%" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>02:15</span>
                    <span>05:00</span>
                  </div>
                  <div className="flex justify-center gap-6">
                    <Button variant="ghost" size="icon" className="text-gold-deep"><ChevronRight className="rotate-180" /></Button>
                    <Button size="icon" className="w-12 h-12 rounded-full bg-gold-soft"><Volume2 /></Button>
                    <Button variant="ghost" size="icon" className="text-gold-deep"><ChevronRight /></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AR Modal */}
        <AnimatePresence>
          {isAROpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black"
            >
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl text-white">
                    <h3 className="font-bold">{t('arActive')}</h3>
                    <p className="text-xs opacity-80">{t('pointIdentify')}</p>
                  </div>
                  <Button variant="secondary" size="icon" className="rounded-full" onClick={() => setIsAROpen(false)}><X /></Button>
                </div>
                
                <div className="relative flex-1">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-1/3 left-1/4 bg-gold-soft/80 backdrop-blur-sm text-white p-3 rounded-xl shadow-lg border border-white/20"
                  >
                    <div className="flex items-center gap-2">
                      <Pagoda size={16} />
                      <span className="font-bold">{t('mahaGandhaBell')}</span>
                    </div>
                    <p className="text-[10px] mt-1">15 meters away</p>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    className="absolute top-1/2 right-1/4 bg-forest/80 backdrop-blur-sm text-white p-3 rounded-xl shadow-lg border border-white/20"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} />
                      <span className="font-bold">{t('pyadarshin')}</span>
                    </div>
                    <p className="text-[10px] mt-1">40 meters away</p>
                  </motion.div>
                </div>

                <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl text-white text-center">
                  <p className="text-sm">{t('scanningLandmarks')}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function PhrasesSection({ t, langName }: { t: (k: string) => string, langName: string }) {
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const words = input.trim().split(/\s+/);
    if (words.length > 100) {
      const userMessage = input;
      setMessages(prev => [
        ...prev, 
        { role: "user", text: userMessage },
        { role: "model", text: "⚠️ Please limit your translation request to 100 words." }
      ]);
      setInput("");
      return;
    }

    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await translateToMyanmar(userMessage, messages, langName);
      setMessages(prev => [...prev, { role: "model", text: response }]);
    } catch (error: any) {
      console.error(error);
      const errorMsg = error?.message || "Sorry, an error occurred while translating. Please try again.";
      setMessages(prev => [...prev, { role: "model", text: `❌ ${errorMsg}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const phrases = [
    { script: "မင်္ဂလာပါ", phonetic: "Mingalaba", meaning: "Hello / Greetings" },
    { script: "ကျေးဇူးတင်ပါတယ်", phonetic: "Kyay-zoo-tin-par-te", meaning: "Thank you" },
    { script: "ဟုတ်ကဲ့", phonetic: "Hoat-kae", meaning: "Yes" },
    { script: "မဟုတ်ပါဘူး", phonetic: "Ma-hoat-par-bu", meaning: "No" },
    { script: "ဘယ်လောက်လဲ?", phonetic: "Be-lout-le?", meaning: "How much?" },
    { script: "နားမလည်ပါဘူး", phonetic: "Nar-ma-lae-par-bu", meaning: "I don't understand" },
    { script: "ကူညီပါ!", phonetic: "Koo-nyi-par!", meaning: "Help!" },
    { script: "တောင်းပန်ပါတယ်", phonetic: "Taung-pan-par-te", meaning: "I'm sorry" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto">
      <SectionHeader title={t('phrases')} subtitle={t('basicBurmese')} icon={Globe} />
      <div className="p-6 md:p-8 space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phrases.map((phrase, i) => (
            <Card key={i} className="bg-white border-gold-soft/10 rounded-2xl overflow-hidden group hover:border-gold-soft transition-all">
              <CardContent className="p-6 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <span className="text-2xl font-bold text-gold-deep">{phrase.script}</span>
                  <Badge variant="outline" className="text-xs font-mono">{phrase.phonetic}</Badge>
                </div>
                <Separator className="my-2 bg-gold-soft/10" />
                <p className="text-gray-600 font-medium">{phrase.meaning}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {langName !== "Myanmar" && (
        <Card className="bg-white border-gold-soft/20 rounded-3xl overflow-hidden shadow-lg border-2">
          <CardContent className="p-0">
            <div className="bg-gold-deep p-4 text-white">
              <h3 className="serif text-lg font-bold flex items-center gap-2">
                <MessageSquare size={20} />
                {t('phrasesChatDesc')}
              </h3>
            </div>
            
            <div className="p-4 h-[300px] overflow-y-auto space-y-4 bg-gray-50/50">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">
                  No messages yet. Ask for a phrase to start!
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-gold-deep text-white rounded-tr-none' 
                      : 'bg-white border border-gold-soft/20 text-gray-800 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gold-soft/20 p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gold-soft rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gold-soft rounded-full animate-bounce delay-100" />
                      <div className="w-1.5 h-1.5 bg-gold-soft rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gold-soft/10 bg-white">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('phrasesChatPlaceholder')}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="rounded-full border-gold-soft/30 focus-visible:ring-gold-deep"
                />
                <Button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-gold-deep hover:bg-gold-soft text-white rounded-full px-6"
                >
                  Send
                </Button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 px-2">
                Burmese language specialist • Max 100 words
              </p>
            </div>
          </CardContent>
        </Card>
        )}

        <Card className="bg-gold-soft/5 border-gold-soft/20 rounded-3xl">
          <CardContent className="p-8">
            <h3 className="serif text-xl text-gold-deep mb-4">{t('culturalTip')}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t('culturalTipDesc')}
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

function ServicesSection({ t, onAskAmbassador }: { t: (k: string) => string, onAskAmbassador: (query: string) => void }) {
  const [isExported, setIsExported] = useState(false);

  const handleExport = () => {
    import("canvas-confetti").then(confetti => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#F5F5DC", "#228B22"]
      });
    });
    setIsExported(true);
    setTimeout(() => setIsExported(false), 5000);
  };

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
    { 
      title: t('exportSheets'), 
      desc: t('exportSheetsDesc'), 
      icon: MapIcon, 
      action: handleExport,
      isExport: true
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
                {service.isExport ? (
                  <div className="flex flex-col gap-2 w-full">
                    <Button 
                      onClick={service.action}
                      className="bg-gold-soft hover:bg-gold-deep text-white rounded-xl shadow-md w-full sm:w-auto cursor-pointer"
                    >
                      {isExported ? "✓ Exported Successfully!" : t('exportNow')}
                    </Button>
                    {isExported && (
                      <p className="text-[10px] text-green-600 font-medium">
                        ✨ Your interactive Shwedagon itinerary has been synchronized with Google Sheets successfully!
                      </p>
                    )}
                  </div>
                ) : (
                  <Button 
                    variant="link" 
                    className="text-gold-deep p-0 h-auto font-bold flex items-center gap-1 cursor-pointer"
                    onClick={service.action}
                  >
                    {t('learnMore')} <ChevronRight size={16} />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function EmergencySection({ t, setActiveSection }: { t: (k: string) => string, setActiveSection: (s: Section) => void }) {
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

        {/* Foreign Embassies Button & Modal */}
        <div className="pt-2">
          <Dialog>
            <DialogTrigger asChild>
  <Button 
    variant="outline" 
    className="w-full flex items-center justify-center gap-2 py-6 rounded-2xl border-gold-soft/30 text-gold-deep hover:bg-gold-soft/10 hover:border-gold-soft transition-all font-bold shadow-sm group"
  >
    <MapPin size={20} className="text-gold-soft group-hover:scale-110 transition-transform" />
    {t('foreignEmbassies')}
  </Button>
</DialogTrigger>
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

        {/* More Information Button & Modal */}
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

        {/* Home Button to return to Menu */}
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
    </motion.div>
  );
}

function MenuSection({ t, setActiveSection, navItems }: { t: (k: string) => string, setActiveSection: (s: Section) => void, navItems: any[] }) {
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
    </motion.div>
  );
}