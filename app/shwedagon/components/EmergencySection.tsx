"use client";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { FOREIGN_EMBASSIES_INFO } from "../translations";
import Footer from "./Footer";

type Section = string;

export default function EmergencySection({ t, setActiveSection, langCode }: { t: (k: string) => string, setActiveSection: (s: Section) => void, langCode: string }) {
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
            <CardTitle className="text-yellow-600">{t('safetyTips')}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <p>• {t('safetyTip1')}</p>
            <p>• {t('safetyTip2')}</p>
            <p>• {t('safetyTip3')}</p>
          </CardContent>
        </Card>

        <div className="pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-6 rounded-2xl border-yellow-300 text-yellow-700 hover:bg-yellow-50 transition-all font-bold shadow-sm"
              >
                <MapPin size={20} />
                {t('foreignEmbassies')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] w-[95vw] rounded-3xl p-0 overflow-hidden flex flex-col">
              <div className="bg-yellow-700 p-6 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">{t('foreignEmbassies')}</DialogTitle>
                  <DialogDescription className="text-yellow-100">{t('priorityAssistance')}</DialogDescription>
                </DialogHeader>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {FOREIGN_EMBASSIES_INFO}
                  </ReactMarkdown>
                </div>
              </div>
              <div className="p-4 border-t flex justify-end">
                <DialogClose asChild>
                  <Button variant="ghost" className="rounded-xl text-gray-500 hover:text-gray-700">
                    Close
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Footer langCode={langCode} />
    </motion.div>
  );
}
