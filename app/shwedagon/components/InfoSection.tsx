"use client";

import { motion } from "motion/react";
import { Clock, Shirt, Accessibility, AlertCircle, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InfoSectionProps {
  t: (key: string) => string;
  setActiveSection: (section: any) => void;
  isRTL: boolean;
  langCode: string;
}

export default function InfoSection({ t, setActiveSection, isRTL, langCode }: InfoSectionProps) {
  // Visitor Guidelines & Information Data Cards
  const guideCards = [
    {
      id: "info_hours",
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      id: "info_dress",
      icon: Shirt,
      color: "bg-orange-50 text-orange-600",
    },
    {
      id: "info_accessibility",
      icon: Accessibility,
      color: "bg-teal-50 text-teal-600",
    },
    {
      id: "info_rules",
      icon: AlertCircle,
      color: "bg-rose-50 text-rose-600",
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full">
      {/* Header Introduction */}
      <div className="space-y-1">
        <h2 className="serif text-2xl font-black text-gold-dark tracking-tight">
          {t("info_title") || "Visitor Information & Guidelines"}
        </h2>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("info_subtitle") || "Essential details for an auspicious and respectful pilgrimage"}
        </p>
      </div>

      {/* Grid Guide Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guideCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card className="border-gold-soft/10 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all h-full rounded-2xl overflow-hidden">
              <CardHeader className="p-5 pb-2 flex flex-row items-center gap-3 space-y-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${card.color}`}>
                  <card.icon size={18} />
                </div>
                <CardTitle className="serif text-base font-bold text-gold-dark">
                  {t(`${card.id}_title`) || "Guideline"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-1 text-xs font-medium text-muted-foreground leading-relaxed">
                {t(`${card.id}_desc`) || "Important detail or instruction regarding this protocol."}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Interactive Assistance Row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-amber-50/50 backdrop-blur-sm border border-gold-soft/20 rounded-[1.5rem] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <h4 className="serif font-bold text-sm text-gold-dark">
            {t("info_query_title") || "Need real-time dress code or entry updates?"}
          </h4>
          <p className="text-xs font-medium text-muted-foreground leading-normal max-w-xl">
            {t("info_query_desc") || "Ask our AI Shwedagon Ambassador regarding specialized seasonal festival hours, specific elevator access, or local custom queries."}
          </p>
        </div>

        <button
          onClick={() => setActiveSection("ambassador")}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-dark via-amber-600 to-gold-deep hover:from-gold-deep hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 shrink-0"
        >
          <MessageSquare size={14} />
          <span>{t("ask_ambassador_btn") || "Chat with AI Guide"}</span>
        </button>
      </motion.div>
    </div>
  );
}