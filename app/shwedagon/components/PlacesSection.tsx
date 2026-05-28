"use client";

import { motion } from "motion/react";
import { MapPin, Camera, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PlacesSectionProps {
  t: (key: string) => string;
  setActiveSection: (section: any) => void;
  langCode: string;
}

export default function PlacesSection({ t, setActiveSection, langCode }: PlacesSectionProps) {
  // စေတီတော်ရင်ပြင်ရှိ အဓိကဖူးမြော်လေ့လာရန်နေရာများ စာရင်း
  const sacredPlaces = [
    { id: "place_main_stupa", icon: Star, color: "from-amber-500 to-yellow-500" },
    { id: "place_padamya", icon: MapPin, color: "from-red-500 to-rose-600" },
    { id: "place_planetary_posts", icon: MapPin, color: "from-orange-500 to-amber-600" },
    { id: "place_banyan_tree", icon: MapPin, color: "from-emerald-500 to-teal-600" },
    { id: "place_victory_ground", icon: Star, color: "from-gold-dark to-amber-700" },
    { id: "place_museum", icon: Camera, color: "from-blue-500 to-indigo-600" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full">
      {/* Header View */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-soft/10 pb-4">
        <div className="space-y-1">
          <h2 className="serif text-2xl font-black text-gold-dark tracking-tight">
            {t("places_title") || "Sacred Sites & Landmarks"}
          </h2>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t("places_subtitle") || "Must-visit shrines and holy grounds on the terrace"}
          </p>
        </div>
        <button
          onClick={() => setActiveSection("maps")}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gold-soft/30 hover:border-gold-soft/60 text-gold-dark font-bold text-xs rounded-xl bg-white transition-all hover:bg-amber-50/30"
        >
          <span>{t("view_on_map") || "Open Map View"}</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Grid of Sacred Places */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sacredPlaces.map((place, index) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            className="group cursor-pointer"
            onClick={() => {
              // Global function inside App.tsx to activate specific AI query
              if ((window as any)._askAmbassador) {
                (window as any)._askAmbassador(t(`${place.id}_ai_query`) || `Tell me more details about ${t(`${place.id}_title`)}`);
              }
            }}
          >
            <Card className="border-gold-soft/10 bg-white/90 backdrop-blur-sm shadow-sm h-full flex flex-col justify-between rounded-2xl overflow-hidden transition-all group-hover:shadow-md group-hover:border-gold-soft/30">
              <CardHeader className="p-5 pb-2">
                <div className="flex justify-between items-start gap-4">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${place.color} flex items-center justify-center text-white shadow-sm shrink-0`}>
                    <place.icon size={16} />
                  </div>
                  <Badge variant="outline" className="text-[9px] font-bold tracking-wider border-gold-soft/20 text-gold-soft bg-amber-50/10 px-2 py-0.5 rounded-full uppercase">
                    {t(`${place.id}_type`) || "Shrine"}
                  </Badge>
                </div>
                <CardTitle className="serif text-base font-bold text-gold-dark pt-3 group-hover:text-gold-deep transition-colors">
                  {t(`${place.id}_title`) || "Sacred Spot"}
                </CardTitle>
                <CardDescription className="text-xs font-medium text-muted-foreground pt-1.5 leading-relaxed">
                  {t(`${place.id}_desc`) || "Discover the spiritual and structural essence of this point of devotion."}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-5 pt-2 border-t border-dashed border-gold-soft/10 flex items-center justify-between text-[11px] font-bold text-gold-soft group-hover:text-gold-dark transition-colors">
                <span>{t("click_to_explore_ai") || "Ask AI for local legend ✦"}</span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}