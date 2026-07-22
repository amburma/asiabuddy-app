import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Info, Star, ShieldCheck, Heart } from 'lucide-react';
import { ThaiLanguage } from '../../types/country';
import { UI_TRANSLATIONS } from '../../lib/i18n';

interface Props {
  language: ThaiLanguage;
}

export default function EtiquetteGuide({ language }: Props) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN;
  const sections = t.etiquetteSections || [];
  const tips = t.quickTips || { dos: [], donts: [] };

  return (
    <div className="bg-white min-h-full">
      {/* Header Decoration */}
      <div className="h-2 bg-gradient-to-r from-gold-deep via-sacred-green to-gold-deep" />
      
      <div className="p-8 max-w-4xl mx-auto space-y-12">
        {/* Intro Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sacred-bg text-gold-deep mb-2">
            <Heart size={32} />
          </div>
          <h2 className="text-2xl font-serif text-sacred-green italic">{t.jaiYen}</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold-deep font-bold">{t.labels.culturalSubtitle}</p>
          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            {t.jaiYenDesc}
          </p>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-3xl border border-gold-soft/10 bg-sacred-bg/20 space-y-4 hover:border-gold-deep/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-deep/10 flex items-center justify-center text-gold-deep group-hover:bg-gold-deep group-hover:text-white transition-all">
                  <Star size={16} />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-sacred-green">{section.title}</h3>
              </div>
              <p className="text-[11px] text-gray-700 leading-relaxed italic">{section.content}</p>
              {section.points && (
                <ul className="space-y-2 pt-2">
                  {section.points.map((point: string, pIdx: number) => (
                    <li key={pIdx} className="flex items-start gap-2 text-[10px] text-gray-500">
                      <div className="w-1 h-1 rounded-full bg-gold-deep mt-1.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quick Tips Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-100">
          <div className="p-8 bg-green-50/50 rounded-3xl border border-green-100 space-y-6">
            <div className="flex items-center gap-3 text-green-700">
              <CheckCircle2 size={24} />
              <h4 className="text-sm font-bold uppercase tracking-widest">{t.labels.dos}</h4>
            </div>
            <ul className="space-y-4">
              {tips.dos.map((tip: string, idx: number) => (
                <li key={idx} className="flex items-center gap-3 text-xs font-medium text-green-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 bg-red-50/50 rounded-3xl border border-red-100 space-y-6">
            <div className="flex items-center gap-3 text-red-700">
              <XCircle size={24} />
              <h4 className="text-sm font-bold uppercase tracking-widest">{t.labels.donts}</h4>
            </div>
            <ul className="space-y-4">
              {tips.donts.map((tip: string, idx: number) => (
                <li key={idx} className="flex items-center gap-3 text-xs font-medium text-red-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Advisory Banner */}
        <div className="p-6 bg-sacred-green rounded-3xl text-white flex items-center gap-6 shadow-xl shadow-sacred-green/20">
          <div className="p-4 bg-white/10 rounded-2xl">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-1">{t.legalAdvisory}</h4>
            <p className="text-[10px] text-white/80 leading-relaxed uppercase tracking-wider font-medium">
              {t.legalDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
