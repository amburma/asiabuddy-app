"use client";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Globe, ChevronRight } from "lucide-react";
import Footer from "./Footer";

export default function ServicesSection({ t, onAskAmbassador, langCode }: { t: (k: string) => string, onAskAmbassador: (query: string) => void, langCode: string }) {
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
      <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <Card key={i} className="rounded-2xl border-gold-soft/10 hover:border-gold-soft transition-colors shadow-sm bg-white overflow-hidden relative">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-yellow-600 shrink-0">
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
                  className="text-yellow-600 p-0 h-auto font-bold flex items-center gap-1 cursor-pointer"
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
