"use client";

import { motion } from "motion/react";
import { Info, Sparkles, MapPin, Award, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AboutSectionProps {
  t: (key: string) => string;
  setActiveSection: (section: any) => void;
  isRTL: boolean;
  langCode: string;
}

export default function AboutSection({ t, setActiveSection, isRTL, langCode }: AboutSectionProps) {
  // ရွှေတိဂုံစေတီတော် သမိုင်းကြောင်းနှင့် အဓိကအချက်အလက်များ Data
  const historicalHighlights = [
    {
      id: "history_1",
      icon: Sparkles,
      color: "bg-amber-50 text-amber-600",
    },
    {
      id: "history_2",
      icon: Award,
      color: "bg-gold-soft/10 text-gold-deep",
    },
    {
      id: "history_3",
      icon: MapPin,
      color: "bg-orange-50 text-orange-600",
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full">
      {/* Top Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold-dark via-amber-800 to-amber-950 p-6 md:p-8 text-white shadow-xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.2),transparent_60%)] pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-none font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
            ✨ {t("about_badge") || "Sacred Sanctuary"}
          </Badge>
          <h2 className="serif text-2xl md:text-4xl font-black tracking-tight leading-tight">
            {t("about_title") || "The Golden Wonder of Myanmar"}
          </h2>
          <p className="text-white/80 text-xs md:text-sm font-medium max-w-2xl leading-relaxed">
            {t("about_hero_desc") || "Rising 112 meters above Singuttara Hill, the Shwedagon Pagoda is the most sacred Buddhist stupa in Myanmar, enshrining relics of four past Buddhas."}
          </p>
        </div>
      </motion.div>

      {/* Main Content Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {historicalHighlights.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-gold-soft/10 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between rounded-2xl group">
              <CardHeader className="p-5 pb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-105 duration-200 ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <CardTitle className="serif text-base font-bold text-gold-dark">
                  {t(`${item.id}_title`) || "Historical Fact"}
                </CardTitle>
                <CardDescription className="text-xs font-medium text-muted-foreground pt-1.5 leading-relaxed">
                  {t(`${item.id}_desc`) || "Detailed historical insight regarding the sacred monument."}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Narrative Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-gold-soft/10 bg-white shadow-sm rounded-[2rem] p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-gold-deep border-b border-gold-soft/10 pb-3">
            <Info size={18} />
            <h3 className="serif font-black text-lg">{t("chronicles_title") || "Spiritual Chronicles"}</h3>
          </div>
          
          <div className="text-sm font-medium text-foreground/80 leading-relaxed space-y-4">
            <p>{t("chronicles_p1") || "According to tradition, the Shwedagon Pagoda was built more than 2,600 years ago, making it the oldest Buddhist stupa in the world. The story tells of two merchant brothers, Tapussa and Bhallika, who met the Buddha and received eight of his hairs, which were then enshrined on Singuttara Hill."}</p>
            <p>{t("chronicles_p2") || "Over the centuries, the pagoda was rebuilt and enlarged multiple times by Mon and Burmese monarchs, notably Queen Shinsawbu and King Bayinnaung, transforming it from a small monument into the spectacular gold-plated masterpiece seen today."}</p>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveSection("info")}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-deep to-amber-500 text-white font-bold text-xs rounded-xl shadow-md hover:from-gold-dark hover:to-amber-600 transition-all active:scale-95"
            >
              <span>{t("view_visitor_info") || "Visitor Info"}</span>
              <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
            </button>
            <button
              onClick={() => setActiveSection("ambassador")}
              className="flex items-center gap-2 px-4 py-2.5 border border-gold-soft/30 bg-amber-50/20 text-gold-dark font-bold text-xs rounded-xl hover:bg-amber-50 transition-all"
            >
              <span>{t("ask_history_ai") || "Ask AI about History"}</span>
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}