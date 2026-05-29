"use client";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import Footer from "./Footer";

type Section = string;

export default function PrayersSection({ t, langCode, setActiveSection }: { t: (k: string) => string, langCode: string, setActiveSection: (s: Section) => void }) {
  const prayers = [
    {
      title: "Itipiso (The Nine Attributes of the Buddha)",
      content: "Itipi so bhagavā arahaṃ sammāsambuddho vijjācaraṇasampanno sugato lokavidū anuttaro purisadammasārathi satthā devamanussānaṃ buddho bhagavāti.",
      translation: "Thus indeed is the Blessed One: worthy, fully self-enlightened, endowed with knowledge and conduct, well-gone, knower of the world, unsurpassed trainer of persons to be tamed, teacher of gods and humans, enlightened, blessed."
    },
    {
      title: "Dhamma Vandana (Homage to the Dhamma)",
      content: "Svākkhāto bhagavatā dhammo sandiṭṭhiko akāliko ehipassiko opanayiko paccattaṃ veditabbo viññūhīti.",
      translation: "Well-expounded is the Dhamma of the Blessed One, visible here and now, timeless, inviting inspection, onward-leading, to be experienced by the wise for themselves."
    },
    {
      title: "Sangha Vandana (Homage to the Sangha)",
      content: "Supaṭipanno bhagavato sāvakasaṅgho ujupaṭipanno bhagavato sāvakasaṅgho ñāyapaṭipanno bhagavato sāvakasaṅgho sāmīcipaṭipanno bhagavato sāvakasaṅgho.",
      translation: "Of good conduct is the Sangha of the Blessed One's disciples; of upright conduct is the Sangha; of wise conduct is the Sangha; of proper conduct is the Sangha."
    },
    {
      title: "Metta Sutta (Loving-kindness)",
      content: "Sabbe sattā sukhitā hontu. Sabbe sattā averā hontu. Sabbe sattā abyāpajjhā hontu. Sabbe sattā anīghā hontu. Sabbe sattā sukhī attānaṃ pariharantu.",
      translation: "May all beings be happy. May all beings be free from enmity. May all beings be free from affliction. May all beings be free from distress. May all beings sustain themselves in happiness."
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto">
      <div className="p-6 md:p-8 space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="text-yellow-600" size={28} />
          <h2 className="text-2xl font-bold text-yellow-700">Prayers & Devotions</h2>
        </div>
        {prayers.map((prayer, i) => (
          <Card key={i} className="rounded-2xl border-yellow-100 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-yellow-700 text-lg">{prayer.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700 italic leading-relaxed text-sm">{prayer.content}</p>
              <p className="text-gray-500 text-sm leading-relaxed border-t border-yellow-50 pt-3">{prayer.translation}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer langCode={langCode} />
    </motion.div>
  );
}
