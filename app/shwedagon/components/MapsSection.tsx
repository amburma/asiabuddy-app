"use client";

import { motion } from "motion/react";
import { Map as MapIcon, MapPin, Compass, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface MapsSectionProps {
  lang: string;
  t: (key: string) => string;
}

export default function MapsSection({ lang, t }: MapsSectionProps) {
  const gates = [
    { id: "gate_south", direction: "South (Main)", feature: "Elevator & Escalator" },
    { id: "gate_north", direction: "North", feature: "Sacred Pathways" },
    { id: "gate_east", direction: "East", feature: "Traditional Market Walk" },
    { id: "gate_west", direction: "West", feature: "Escalator Access" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full">
      <div className="space-y-1">
        <h2 className="serif text-2xl font-black text-gold-dark tracking-tight">
          {t("maps_title") || "Interactive Terrace Map Guide"}
        </h2>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("maps_subtitle") || "Navigate the four cardinal devotional ascents"}
        </p>
      </div>

      <Card className="border-gold-soft/10 bg-white/90 backdrop-blur-sm shadow-sm overflow-hidden rounded-[2rem]">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-br from-amber-50/20 to-orange-50/10 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.08),transparent_70%)] pointer-events-none" />
          
          <div className="w-20 h-20 rounded-full bg-amber-50 border border-gold-soft/30 flex items-center justify-center text-gold-deep shadow-inner mb-4">
            <Compass size={36} className="animate-spin-slow" />
          </div>
          
          <h3 className="serif font-bold text-gold-dark text-base mb-1">
            {t("map_visual_placeholder") || "Sacred Platform Topography View"}
          </h3>
          <p className="text-xs text-muted-foreground text-center max-w-sm font-medium leading-normal mb-4">
            {t("map_visual_desc") || "Use the cardinal directions below to navigate the devotional pathways or inquire with our AI Ambassador for specific gate configurations."}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {gates.map((gate, idx) => (
          <motion.div
            key={gate.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="border-gold-soft/10 bg-white shadow-sm rounded-xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-gold-deep flex items-center justify-center shrink-0 shadow-sm">
                <Navigation size={14} className="rotate-45" />
              </div>
              <div className="min-w-0">
                <h4 className="serif font-bold text-xs text-gold-dark truncate">
                  {t(`${gate.id}_title`) || gate.direction}
                </h4>
                <p className="text-[10px] font-medium text-muted-foreground truncate">
                  {t(`${gate.id}_desc`) || gate.feature}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}