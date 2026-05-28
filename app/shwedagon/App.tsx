// app/shwedagon/App.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Info,
  Map as Mapicon,
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

// ⚠️ သတိပြုရန် - ဤဝန်ဆောင်မှုများနှင့် translations များကို နောက်အဆင့်များတွင် ဆောက်ပါမည်။
import { chatWithAmbassador } from "./services/gemini";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { UI_TRANSLATIONS, FOREIGN_EMBASSIES_INFO } from "./translations";
import PrayersSection from "./components/PrayersSection";
import AdhihtanJournal from "./components/AdhihtanJournal";
import Footer from "./components/Footer";
// app/shwedagon/App.tsx
"use client";

import { useState, useEffect, useRef } from "react"; [cite: 1]
import {
  Info,
  Map as MapIcon, // PDF ထဲရှိ Mapicon အစား MapIcon အဖြစ် သတ်မှတ်သည် [cite: 1]
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
} from "lucide-react"; [cite: 1]
import { motion, AnimatePresence } from "motion/react"; [cite: 2]
import { Button } from "@/components/ui/button"; [cite: 2]
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; [cite: 3]
import { ScrollArea } from "@/components/ui/scroll-area"; [cite: 3]
import { Badge } from "@/components/ui/badge"; [cite: 4]
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; [cite: 4]
import { Input } from "@/components/ui/input"; [cite: 5]
import { Separator } from "@/components/ui/separator"; [cite: 5]
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; [cite: 6]
import { chatWithAmbassador } from "./services/gemini"; [cite: 7]
import ReactMarkdown from "react-markdown"; [cite: 7]
import rehypeRaw from "rehype-raw"; [cite: 7]
import { UI_TRANSLATIONS, FOREIGN_EMBASSIES_INFO } from "./translations"; [cite: 8]
import PrayersSection from "./components/PrayersSection"; [cite: 8]
import AdhihtanJournal, { ADHIHTAN_TRANSLATIONS } from "./components/AdhihtanJournal"; [cite: 8]
import Footer from "./components/Footer"; [cite: 9]

// Custom Shwedagon Pagoda Icon [cite: 9]
const Pagoda = ({ size = 24, className = "" }: { size?: number; className?: string }) => ( [cite: 9]
  <svg
    width={size}
    height={size} [cite: 9]
    viewBox="0 0 24 24" [cite: 9]
    fill="none" [cite: 9]
    stroke="currentColor" [cite: 9]
    strokeWidth="1.5" [cite: 9]
    strokeLinecap="round" [cite: 9]
    strokeLinejoin="round" [cite: 9]
    className={className} [cite: 9]
  >
    {/* Base tiers */} [cite: 9]
    <path d="M3 21h18" /> [cite: 9]
    <path d="M5 21l1-3h12l1 3" /> [cite: 9]
    <path d="M6.5 18l1-2h9l1 2" /> [cite: 9]
    {/* The Bell (Anda) */} [cite: 9]
    <path d="M8.5 16c0-3.5 1.5-6 3.5-6s3.5 2.5 3.5 6" /> [cite: 9]
    {/* Spire (Hti) and Crown */} [cite: 9]
    <path d="M12 10v-2" /> [cite: 9]
    <path d="M10 8h4" /> [cite: 9]
    <path d="M10.5 7h3" /> [cite: 9]
    <path d="M11 6h2" /> [cite: 9]
    <path d="M12 6v-3" /> [cite: 9]
    <circle cx="12" cy="2.5" r="0.8" fill="currentColor" stroke="none" /> [cite: 9]
  </svg>
);

// Types [cite: 10]
type Section = "ambassador" | "about" | "info" | "places" | "maps" | "services" | "emergency" | "phrases" | "menu" | "prayers" | "adhihtan"; [cite: 10]

interface Language { [cite: 10]
  code: string; [cite: 10]
  name: string; [cite: 10]
  flag: string; [cite: 10]
  localName: string; [cite: 10]
}

const LANGUAGES: Language[] = [ [cite: 11]
  { code: "my", name: "Myanmar", localName: "မြန်မာ", flag: "🇲🇲" }, [cite: 11]
  { code: "en", name: "English", localName: "English", flag: "🇺🇸" }, [cite: 11]
  { code: "es", name: "Spanish", localName: "Español", flag: "ES" }, [cite: 11]
  { code: "fr", name: "French", localName: "Français", flag: "FR" }, [cite: 11]
  { code: "it", name: "Italian", localName: "Italiano", flag: "IT" }, [cite: 11]
  { code: "de", name: "German", localName: "Deutsch", flag: "DE" }, [cite: 11]
  { code: "pt", name: "Portuguese", localName: "Português", flag: "PT" }, [cite: 11]
  { code: "ru", name: "Russian", localName: "Русский", flag: "RU" }, [cite: 11]
  { code: "he", name: "Hebrew", localName: "עברית", flag: "IL" }, [cite: 11]
  { code: "zh", name: "Chinese", localName: "中文", flag: "CN" }, [cite: 11]
  { code: "hi", name: "Hindi", localName: "हिन्दी", flag: "IN" }, [cite: 12]
  { code: "ja", name: "Japanese", localName: "日本語", flag: "JP" }, [cite: 12]
  { code: "ko", name: "Korean", localName: "한국어", flag: "KR" }, [cite: 12]
  { code: "th", name: "Thai", localName: "ไทย", flag: "TH" }, [cite: 12]
  { code: "ms", name: "Malay", localName: "Bahasa Melayu", flag: "MY" }, [cite: 13]
  { code: "id", name: "Indonesian", localName: "Bahasa Indonesia", flag: "ID" }, [cite: 13]
  { code: "vi", name: "Vietnamese", localName: "Tiếng Việt", flag: "VN" } [cite: 13]
];

export default function App() { [cite: 13]
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null); [cite: 13]
  const [showWelcome, setShowWelcome] = useState(true); [cite: 14]
  const [activeSection, setActiveSection] = useState<Section>("ambassador"); [cite: 14]
  const [isMenuOpen, setIsMenuOpen] = useState(false); [cite: 14]

  // States for Quick Adhihtan Modal & Toasts [cite: 15]
  const [isAdhihtanQuickOpen, setIsAdhihtanQuickOpen] = useState(false); [cite: 15]
  const [quickGatha, setQuickGatha] = useState(""); [cite: 15]
  const [quickBeads, setQuickBeads] = useState(0); [cite: 16]
  const [quickNote, setQuickNote] = useState(""); [cite: 16]
  const [quickToast, setQuickToast] = useState(""); [cite: 16]

  // Haptic feedback function for bead counting [cite: 17]
  const triggerQuickBeadTactile = () => { [cite: 17]
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)(); [cite: 17]
      const osc = audioCtx.createOscillator(); [cite: 17]
      const gainNode = audioCtx.createGain(); [cite: 18]
      osc.type = "sine"; [cite: 18]
      osc.frequency.setValueAtTime(120, audioCtx.currentTime); [cite: 18]
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime); [cite: 18]
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15); [cite: 18]
      osc.connect(gainNode); [cite: 18]
      gainNode.connect(audioCtx.destination); [cite: 18]
      osc.start(); [cite: 18]
      osc.stop(audioCtx.currentTime + 0.15); [cite: 19]
    } catch (e) {}
  };

  const handleSaveQuickAdhihtan = () => { [cite: 19]
    const lang = selectedLanguage?.code || "en"; [cite: 19]
    const newLog = { [cite: 20]
      id: Math.random().toString(36).substring(7), [cite: 20]
      date: new Date().toLocaleDateString(lang, { month: "short", day: "numeric", year: "numeric" }), [cite: 20]
      gatha: quickGatha.trim() || "-", [cite: 20]
      beads: quickBeads, [cite: 21]
      note: quickNote.trim() || "", [cite: 21]
      timestamp: Date.now() [cite: 21]
    };

    let storedLogs = []; [cite: 21]
    const stored = localStorage.getItem("shwedagon_adhihtan_logs"); [cite: 21]
    if (stored) { [cite: 22]
      try {
        storedLogs = JSON.parse(stored); [cite: 22]
      } catch (e) {}
    }
    const updated = [newLog, ...storedLogs]; [cite: 22]
    localStorage.setItem("shwedagon_adhihtan_logs", JSON.stringify(updated)); [cite: 22]

    // Reset inputs [cite: 23]
    setQuickGatha(""); [cite: 23]
    setQuickBeads(0); [cite: 23]
    setQuickNote(""); [cite: 23]
    setIsAdhihtanQuickOpen(false); [cite: 23]

    // Show indicator toast [cite: 23]
    const successMsg = ADHIHTAN_TRANSLATIONS["success_toast"]?.[lang] || ADHIHTAN_TRANSLATIONS["success_toast"]?.["en"]; [cite: 23]
    setQuickToast(successMsg); [cite: 23]
    setTimeout(() => { [cite: 23]
      setQuickToast(""); [cite: 24]
    }, 4000);

    // Notify any active Adhihtan page counters [cite: 24]
    window.dispatchEvent(new Event("shwedagon_adhihtan_updated")); [cite: 24]
  };

  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([ [cite: 25]
    { role: "model", text: "Mingalaba! I am your Shwedagon Pagoda Ambassador. How may I assist you with your journey to the Golden Land today?" } [cite: 25]
  ]);
  const [input, setInput] = useState(""); [cite: 26]
  const [isLoading, setIsLoading] = useState(false); [cite: 26]
  const scrollRef = useRef<HTMLDivElement>(null); [cite: 26]

  useEffect(() => { [cite: 27]
    if (scrollRef.current) { [cite: 27]
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight; [cite: 27]
    }
  }, [messages]); [cite: 27]

  const PRAYERS_TRANSLATIONS: Record<string, string> = { [cite: 28]
    en: "Prayers & Devotions", [cite: 28]
    my: "ဘုရားရှိခိုးနှင့် ပူဇော်မှုများ", [cite: 28]
    es: "Oraciones y Devociones", [cite: 28]
    fr: "Prières et Dévotions", [cite: 28]
    it: "Preghiere e Devozioni", [cite: 28]
    de: "Gebete und Andachten", [cite: 28]
    pt: "Orações e Devoções", [cite: 28]
    ru: "Молитвы и Богослужения", [cite: 28]
    he: "תפילות וירותומ" [cite: 28]
  };

  const t = (key: string, overrideLang?: string) => { [cite: 29]
    const lang = overrideLang || selectedLanguage?.code || "en"; [cite: 29]
    if (key === "prayers") { [cite: 30]
      return PRAYERS_TRANSLATIONS[lang] || PRAYERS_TRANSLATIONS["en"]; [cite: 30]
    }
    if (key === "adhihtan") { [cite: 31]
      return ADHIHTAN_TRANSLATIONS["adhihtan"]?.[lang] || ADHIHTAN_TRANSLATIONS["adhihtan"]?.["en"] || "Adhihtan Journal"; [cite: 31]
    }
    return UI_TRANSLATIONS[lang]?.[key] || UI_TRANSLATIONS["en"]?.[key] || key; [cite: 32]
  };

  const isRTL = selectedLanguage?.code === "he"; [cite: 32]

  const handleSend = async () => { [cite: 33]
    if (!input.trim()) return; [cite: 33]
    const userMessage = input; [cite: 33]
    setMessages(prev => [...prev, { role: "user", text: userMessage }]); [cite: 34]
    setInput(""); [cite: 34]
    setIsLoading(true); [cite: 34]
    try {
      const response = await chatWithAmbassador(userMessage, messages, selectedLanguage?.name || "English"); [cite: 35]
      setMessages(prev => [...prev, { role: "model", text: response || "I apologize, but I am having trouble connecting. Please try again." }]); [cite: 36]
    } catch (error: any) {
      console.error(error); [cite: 37]
      const errorMsg = error?.message || "I apologize, but I encountered an error. Please check your connection."; [cite: 37]
      setMessages(prev => [...prev, { role: "model", text: `Error: ${errorMsg}` }]); [cite: 39]
    } finally {
      setIsLoading(false); [cite: 39]
    }
  };

  const handleAskAmbassador = (query: string) => { [cite: 40]
    setActiveSection("ambassador"); [cite: 40]
    setMessages(prev => [...prev, { role: "user", text: query }]); [cite: 40]
    setIsLoading(true); [cite: 40]
    chatWithAmbassador(query, messages, selectedLanguage?.name || "English") [cite: 41]
      .then(response => {
        setMessages(prev => [...prev, { role: "model", text: response || "I apologize, but I am having trouble connecting. Please try again." }]); [cite: 41]
      })
      .catch((err: any) => {
        console.error(err); [cite: 41]
        const errorMsg = err?.message || "I apologize, but I encountered an error. Please check your connection."; [cite: 41]
        setMessages(prev => [...prev, { role: "model", text: `Error: ${errorMsg}` }]); [cite: 41]
      })
      .finally(() => {
        setIsLoading(false); [cite: 41]
      });
  };

  useEffect(() => { [cite: 42]
    (window as any)._askAmbassador = handleAskAmbassador; [cite: 42]
    return () => { [cite: 42]
      delete (window as any)._askAmbassador; [cite: 42]
    };
  }, [handleAskAmbassador]); [cite: 42]

  const handleLanguageSelect = (lang: Language) => { [cite: 43]
    setSelectedLanguage(lang); [cite: 43]
    setMessages([ [cite: 43]
      { role: "model", text: t('ambassadorGreeting', lang.code) } [cite: 44]
    ]);
  };

  const startApp = () => { [cite: 44]
    if (selectedLanguage) { [cite: 44]
      setShowWelcome(false); [cite: 44]
      setActiveSection("about"); [cite: 44]
    }
  };
  // ==========================================
  // အပိုင်း (၂) UI LAYOUT CODE များ စတင်ခြင်း
  // ==========================================

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 flex flex-col justify-between p-4 md:p-8 selection:bg-gold-light/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_50%)] pointer-events-none" />
        
        <header className="w-full max-w-4xl mx-auto flex justify-between items-center py-4 border-b border-gold-soft/20 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-deep to-gold-light flex items-center justify-center text-white shadow-md animate-pulse">
              <Pagoda size={22} />
            </div>
            <div>
              <h1 className="serif font-black text-xl tracking-wide text-gold-deep">AsiaBuddy</h1>
              <p className="text-[10px] font-bold tracking-widest text-gold-soft uppercase leading-none">Shwedagon Edition</p>
            </div>
          </div>
          <Badge variant="outline" className="border-gold-soft/40 text-gold-deep font-medium text-xs bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            v1.0.0
          </Badge>
        </header>

        <main className="w-full max-w-4xl mx-auto flex flex-col items-center text-center my-auto py-8 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-8 group"
          >
            <div className="absolute inset-0 bg-gold-light/20 rounded-full blur-3xl group-hover:bg-gold-light/30 transition-all duration-700" />
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-gradient-to-br from-gold-deep via-amber-500 to-gold-light p-1 shadow-2xl rotate-3 group-hover:rotate-6 transition-all duration-500">
              <div className="w-full h-full bg-white rounded-[2.3rem] flex items-center justify-center text-gold-deep shadow-inner bg-gradient-to-tr from-amber-50 to-white">
                <Pagoda size={72} className="md:size-84 text-gold-deep" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full shadow-lg border border-gold-soft/30 text-gold-deep flex items-center gap-1">
              <Sparkles size={14} className="text-amber-500 animate-spin-slow" />
              <span className="serif font-bold text-xs">ရန်ကုန်</span>
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="serif text-3xl md:text-5xl font-black text-gold-dark mb-4 tracking-tight leading-tight max-w-2xl"
          >
            Explore Shwedagon Pagoda <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold-deep bg-clip-text text-transparent">With Your AI Guide</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-sm md:text-base max-w-lg mb-8 font-medium leading-relaxed"
          >
            Select your preferred language to begin an enlightened, self-guided pilgrimage through Myanmar's most sacred golden monument.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-2xl bg-white/70 backdrop-blur-md border border-gold-soft/20 rounded-[2rem] p-6 shadow-xl mb-8"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold-soft mb-4 flex items-center justify-center gap-2">
              <Globe size={14} /> Available Languages / ဘာသာစကားများ
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto pr-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                    selectedLanguage?.code === lang.code
                      ? "bg-gradient-to-r from-gold-deep to-amber-500 border-gold-deep text-white shadow-md font-bold scale-[1.02]"
                      : "bg-white border-amber-100 hover:border-gold-soft/50 hover:bg-amber-50/50 text-foreground font-medium"
                  }`}
                >
                  <span className="text-xl shrink-0">{lang.flag}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs truncate">{lang.name}</span>
                    <span className={`text-[10px] opacity-80 truncate ${selectedLanguage?.code === lang.code ? "text-white" : "text-muted-foreground"}`}>
                      {lang.localName}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-xs"
          >
            <Button
              size="lg"
              onClick={startApp}
              disabled={!selectedLanguage}
              className={`w-full py-6 text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl ${
                selectedLanguage
                  ? "bg-gradient-to-r from-gold-dark via-amber-600 to-gold-deep hover:from-gold-deep hover:to-amber-500 text-white shadow-gold-deep/20 hover:scale-[1.02]"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {selectedLanguage ? "Enter Experience →" : "Select Language"}
            </Button>
          </motion.div>
        </main>

        <footer className="w-full max-w-4xl mx-auto text-center py-4 border-t border-gold-soft/10 text-[11px] font-semibold text-gold-soft tracking-wider mt-8 z-10">
          © 2026 ASIABUDDY APP — SHWEDAGON SACRED GUIDE COMPANION
        </footer>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-sacred-bg flex selection:bg-gold-light/30 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Sidebar Desktop Navigation */}
      <aside className="hidden lg:flex flex-col w-72 bg-gradient-to-b from-white to-amber-50/30 border-r border-gold-soft/20 h-screen sticky top-0 p-6 shadow-sm overflow-y-auto">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gold-soft/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-deep to-amber-500 flex items-center justify-center text-white shadow-md">
            <Pagoda size={22} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="serif font-black text-lg tracking-wide text-gold-deep">AsiaBuddy</span>
              <span className="text-xs">{selectedLanguage?.flag}</span>
            </div>
            <p className="text-[9px] font-bold tracking-widest text-gold-soft uppercase leading-none">Shwedagon Guide</p>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          {[
            { id: "ambassador", icon: MessageSquare, color: "bg-orange-50 text-orange-600" },
            { id: "about", icon: Info, color: "bg-amber-50 text-amber-600" },
            { id: "info", icon: Clock, color: "bg-yellow-50 text-yellow-600" },
            { id: "prayers", icon: Award, color: "bg-red-50 text-red-600" },
            { id: "adhihtan", icon: BookOpen, color: "bg-emerald-50 text-emerald-600" },
            { id: "places", icon: MapPin, color: "bg-teal-50 text-teal-600" },
            { id: "maps", icon: MapIcon, color: "bg-blue-50 text-blue-600" },
            { id: "services", icon: Bus, color: "bg-indigo-50 text-indigo-600" },
            { id: "phrases", icon: Volume2, color: "bg-purple-50 text-purple-600" },
            { id: "emergency", icon: Phone, color: "bg-rose-50 text-rose-600" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 group ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-gold-deep/10 to-amber-500/5 text-gold-dark border-l-4 border-gold-deep pl-3 shadow-inner"
                  : "text-muted-foreground hover:text-gold-dark hover:bg-amber-50/50"
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-transform group-hover:scale-105 duration-200 ${item.color}`}>
                <item.icon size={16} />
              </div>
              <span className="truncate">{t(item.id)}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gold-soft/10 space-y-3">
          <Button
            variant="outline"
            onClick={() => setIsAdhihtanQuickOpen(true)}
            className="w-full justify-start gap-2.5 py-5 border-emerald-200 hover:border-emerald-400 bg-emerald-50/40 text-emerald-800 font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            <Plus size={14} className="text-emerald-600" />
            <span>{t("quick_adhihtan_btn") || "Quick Bead Count"}</span>
          </Button>

          <button
            onClick={() => {
              setShowWelcome(true);
              setSelectedLanguage(null);
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-gold-deep border border-dashed border-gold-soft/20 hover:border-gold-soft/50 transition-all bg-white"
          >
            <span className="flex items-center gap-2">
              <span>{selectedLanguage?.flag}</span>
              <span>Change Language</span>
            </span>
            <Globe size={12} className="text-gold-soft" />
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-hidden">
        {/* Mobile Top Header */}
        <header className="lg:hidden bg-white/80 backdrop-blur-md border-b border-gold-soft/10 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-amber-50 rounded-xl transition-colors text-gold-dark"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-deep to-amber-500 flex items-center justify-center text-white shadow-sm">
                <Pagoda size={18} />
              </div>
              <div>
                <h1 className="serif font-black text-sm tracking-wide text-gold-deep leading-tight">AsiaBuddy</h1>
                <p className="text-[8px] font-bold tracking-widest text-gold-soft uppercase leading-none">Shwedagon</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setIsAdhihtanQuickOpen(true)}
              className="w-8 h-8 rounded-lg border-emerald-200 bg-emerald-50/50 text-emerald-700 shadow-sm"
            >
              <Plus size={15} />
            </Button>
            <Badge variant="outline" className="border-gold-soft/30 text-gold-deep text-[10px] bg-amber-50/30 px-2.5 py-0.5 rounded-full font-bold">
              {t(activeSection)}
            </Badge>
          </div>
        </header>

        {/* Mobile Sidebar Slide Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black z-50 lg:hidden"
              />
              <motion.aside
                initial={{ x: isRTL ? "100%" : "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: isRTL ? "100%" : "-100%" }}
                transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                className="fixed top-0 bottom-0 left-0 right-auto z-50 w-72 bg-gradient-to-b from-white to-amber-50/40 p-5 flex flex-col h-full shadow-2xl lg:hidden overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-4 border-b border-gold-soft/10 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-deep to-amber-500 flex items-center justify-center text-white shadow-sm">
                      <Pagoda size={18} />
                    </div>
                    <div>
                      <h2 className="serif font-black text-base text-gold-deep leading-tight">AsiaBuddy</h2>
                      <p className="text-[8px] font-bold tracking-widest text-gold-soft uppercase leading-none">Sacred Companion</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-rose-50 rounded-xl text-muted-foreground hover:text-rose-600 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="space-y-1 flex-1">
                  {[
                    { id: "ambassador", icon: MessageSquare, color: "bg-orange-50 text-orange-600" },
                    { id: "about", icon: Info, color: "bg-amber-50 text-amber-600" },
                    { id: "info", icon: Clock, color: "bg-yellow-50 text-yellow-600" },
                    { id: "prayers", icon: Award, color: "bg-red-50 text-red-600" },
                    { id: "adhihtan", icon: BookOpen, color: "bg-emerald-50 text-emerald-600" },
                    { id: "places", icon: MapPin, color: "bg-teal-50 text-teal-600" },
                    { id: "maps", icon: MapIcon, color: "bg-blue-50 text-blue-600" },
                    { id: "services", icon: Bus, color: "bg-indigo-50 text-indigo-600" },
                    { id: "phrases", icon: Volume2, color: "bg-purple-50 text-purple-600" },
                    { id: "emergency", icon: Phone, color: "bg-rose-50 text-rose-600" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id as Section);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-gold-deep/10 to-amber-500/5 text-gold-dark border-l-4 border-gold-deep pl-2.5 shadow-inner"
                          : "text-muted-foreground hover:text-gold-dark hover:bg-amber-50/50"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${item.color}`}>
                        <item.icon size={15} />
                      </div>
                      <span className="truncate">{t(item.id)}</span>
                    </button>
                  ))}
                </nav>

                <div className="pt-4 border-t border-gold-soft/10 space-y-2.5 mt-4">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowWelcome(true);
                      setSelectedLanguage(null);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-gold-deep border border-dashed border-gold-soft/20 transition-all bg-white"
                  >
                    <span className="flex items-center gap-2">
                      <span>{selectedLanguage?.flag}</span>
                      <span>Change Language</span>
                    </span>
                    <Globe size={11} className="text-gold-soft" />
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
        // ==========================================
  // အပိုင်း (၃) MAIN CONTENT VIEWPORT စတင်ခြင်း
  // ==========================================

        <main className="flex-1 overflow-y-auto relative bg-sacred-bg/20 focus:outline-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="h-full flex flex-col"
            >
              {activeSection === "ambassador" && (
                <div className="flex-1 flex flex-col h-full bg-white lg:bg-transparent">
                  {/* Chat Sub-Header */}
                  <div className="p-4 md:p-6 border-b border-gold-soft/10 bg-white/60 backdrop-blur-md flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <h2 className="serif font-black text-base md:text-lg text-gold-dark leading-snug">
                          {t("ambassador")} Chat Guide
                        </h2>
                        <p className="text-[11px] font-semibold text-muted-foreground">
                          AI Expert Assistant • {selectedLanguage?.name} Mode
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-amber-50 text-amber-800 border border-amber-100 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                      Online
                    </Badge>
                  </div>

                  {/* Chat Message Scroll Log */}
                  <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-sacred-bg/10">
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`flex gap-3 max-w-[88%] md:max-w-[75%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 shadow-sm ${
                            msg.role === "user" 
                              ? "bg-gradient-to-br from-gold-deep to-amber-500 text-white" 
                              : "bg-white border border-gold-soft/20 text-gold-deep"
                          }`}>
                            {msg.role === "user" ? "You" : <Pagoda size={14} />}
                          </div>
                          
                          <div className={`p-4 rounded-2xl shadow-sm border ${
                            msg.role === "user"
                              ? "bg-gradient-to-br from-gold-dark to-amber-700 text-white border-gold-dark rounded-tr-none text-sm font-medium"
                              : "bg-white text-foreground border-gold-soft/10 rounded-tl-none text-sm leading-relaxed font-medium selection:bg-gold-light/20 shadow-amber-900/[0.01]"
                          }`}>
                            <div className="prose prose-sm max-w-none break-words selection:text-amber-900">
                              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{msg.text}</ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[50%] items-center">
                          <div className="w-8 h-8 rounded-lg bg-white border border-gold-soft/20 flex items-center justify-center text-gold-deep shrink-0 shadow-sm">
                            <Pagoda size={14} className="animate-spin-slow" />
                          </div>
                          <div className="bg-white border border-gold-soft/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center shadow-sm">
                            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-gold-soft rounded-full" />
                            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-gold-soft rounded-full" />
                            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-gold-soft rounded-full" />
                          </div>
                        </div>
                      </div>
                    )}
                    <Footer langCode={selectedLanguage?.code || "en"} />
                  </div>

                  {/* Chat Input Bar */}
                  <div className="p-4 bg-white border-t border-gold-soft/10 shadow-lg relative z-10">
                    <div className="max-w-4xl mx-auto flex items-center gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder={t("askPlaceholder") || "Ask anything about Shwedagon..."}
                        disabled={isLoading}
                        className="h-12 rounded-xl border-amber-100 focus-visible:ring-gold-deep bg-amber-50/20 text-sm font-medium px-4"
                      />
                      <Button 
                        onClick={handleSend} 
                        disabled={isLoading || !input.trim()}
                        className="h-12 w-12 rounded-xl bg-gradient-to-r from-gold-dark via-amber-600 to-gold-deep hover:from-gold-deep hover:to-amber-500 text-white shadow-md shrink-0 transition-transform active:scale-95"
                      >
                        <ChevronRight size={18} className={isRTL ? "rotate-180" : ""} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Connected Component Switches For Dynamic Dashboard Active Tabs */}
              {activeSection === "about" && <AboutSection t={t} setActiveSection={setActiveSection} isRTL={isRTL} langCode={selectedLanguage?.code || "en"} />}
              {activeSection === "info" && <InfoSection t={t} setActiveSection={setActiveSection} isRTL={isRTL} langCode={selectedLanguage?.code || "en"} />}
              {activeSection === "places" && <PlacesSection t={t} setActiveSection={setActiveSection} langCode={selectedLanguage?.code || "en"} />}
              {activeSection === "maps" && <MapsSection lang={selectedLanguage?.code || "en"} t={t} />}
              {activeSection === "phrases" && <PhrasesSection t={t} lang={selectedLanguage?.code || "en"} langName={selectedLanguage?.name || "English"} />}
              {activeSection === "services" && <ServicesSection t={t} onAskAmbassador={handleAskAmbassador} langCode={selectedLanguage?.code || "en"} />}
              {activeSection === "emergency" && <EmergencySection t={t} setActiveSection={setActiveSection} langCode={selectedLanguage?.code || "en"} />}
              {activeSection === "prayers" && <PrayersSection t={t} langCode={selectedLanguage?.code || "en"} setActiveSection={setActiveSection} />}
              {activeSection === "adhihtan" && <AdhihtanJournal langCode={selectedLanguage?.code || "en"} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Ambassador Chat FAB Trigger Button */}
      <AnimatePresence>
        {activeSection !== "ambassador" && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setActiveSection("ambassador")}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-gold-deep via-amber-500 to-gold-light text-white rounded-full shadow-2xl flex items-center justify-center z-40 border-2 border-white/40 shadow-gold-deep/30 group cursor-pointer"
          >
            <MessageSquare size={22} className="group-hover:rotate-12 transition-transform duration-300" />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-white rounded-full -z-10"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Quick Adhihtan Bead Note Counter Dialog Modal overlay */}
      <Dialog open={isAdhihtanQuickOpen} onOpenChange={setIsAdhihtanQuickOpen}>
        <DialogContent className="max-w-md w-[92vw] sm:w-full bg-white/95 backdrop-blur-md rounded-[2rem] p-6 border border-amber-100 shadow-2xl z-[100]">
          <DialogHeader>
            <DialogTitle className="serif text-amber-900 flex items-center gap-2 font-black text-lg">
              <Sparkles className="text-amber-500 animate-pulse" size={18} />
              {ADHIHTAN_TRANSLATIONS["header_title"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["header_title"]?.["en"]}
            </DialogTitle>
            <DialogDescription className="text-xs text-amber-700/70 font-semibold mt-1">
              {ADHIHTAN_TRANSLATIONS["subtitle"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["subtitle"]?.["en"]}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Gatha Verse Input row */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
                <Bookmark size={12} className="text-amber-600" /> Verse / Gāthā / အဓိဋ္ဌာန်ပုဒ်
              </label>
              <Input
                value={quickGatha}
                onChange={(e) => setQuickGatha(e.target.value)}
                placeholder={ADHIHTAN_TRANSLATIONS["placeholder_gatha"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["placeholder_gatha"]?.["en"]}
                className="h-11 rounded-xl border-amber-100 text-foreground text-sm font-medium bg-amber-50/10 focus-visible:ring-amber-500"
              />
            </div>

            {/* Bead Counts Controller row */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
                <Plus className="text-amber-600" size={12} /> {ADHIHTAN_TRANSLATIONS["bead_count_label"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["bead_count_label"]?.["en"]}
              </label>
              <div className="flex items-center justify-between bg-gradient-to-r from-amber-50/60 to-orange-50/40 px-4 py-2.5 rounded-xl border border-amber-100/40 shadow-inner">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setQuickBeads(prev => (prev > 0 ? prev - 1 : 0))}
                  className="w-8 h-8 rounded-lg hover:bg-amber-100 text-amber-950 shrink-0"
                >
                  <Minus size={14} className="stroke-[2.5]" />
                </Button>
                <span className="font-mono font-black text-amber-950 text-sm tracking-wide">
                  {quickBeads} {selectedLanguage?.code === "my" ? "ပတ် (အကြိမ်)" : "Rounds (Mala)"}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setQuickBeads(prev => prev + 1);
                    triggerQuickBeadTactile();
                  }}
                  className="w-8 h-8 rounded-lg hover:bg-amber-100 text-amber-950 shrink-0"
                >
                  <Plus size={14} className="stroke-[2.5]" />
                </Button>
              </div>
            </div>

            {/* Reflection Textarea row */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
                <Heart size={12} className="text-amber-600" /> Reflection Notes / မှတ်စု
              </label>
              <textarea
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                placeholder={ADHIHTAN_TRANSLATIONS["placeholder_note"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["placeholder_note"]?.["en"]}
                rows={3}
                className="w-full rounded-xl border border-amber-100 p-3 text-xs bg-amber-50/10 text-foreground placeholder-amber-900/30 font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all resize-none"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-row items-center justify-end gap-2 mt-2 border-t border-amber-100/30 pt-3">
            <Button
              variant="ghost"
              onClick={() => {
                setQuickGatha("");
                setQuickBeads(0);
                setQuickNote("");
                setIsAdhihtanQuickOpen(false);
              }}
              className="rounded-xl hover:bg-muted text-muted-foreground font-bold text-xs h-10 px-4"
            >
              {ADHIHTAN_TRANSLATIONS["button_close"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["button_close"]?.["en"]}
            </Button>
            <Button
              onClick={handleSaveQuickAdhihtan}
              disabled={!quickGatha.trim() && !quickNote.trim() && quickBeads === 0}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl font-bold text-xs shadow-md px-5 h-10 transition-all disabled:opacity-50"
            >
              {ADHIHTAN_TRANSLATIONS["button_save"]?.[selectedLanguage?.code || "en"] || ADHIHTAN_TRANSLATIONS["button_save"]?.["en"]}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Global Toast Success Alerts for Quick Beads logs saving */}
      <AnimatePresence>
        {quickToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
            className="fixed top-6 left-1/2 z-[150] bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xl border border-emerald-500/30 flex items-center gap-2"
          >
            <span>{quickToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}