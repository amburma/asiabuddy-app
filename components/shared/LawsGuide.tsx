import { motion } from 'motion/react';
import { Gavel, AlertTriangle, Scale, Info, ShieldAlert } from 'lucide-react';
import { LAWS_DATA, LAWS_PRO_TIP } from '../../data/thailand/lawsData';
import { ThaiLanguage } from '../../types/country';
import { UI_TRANSLATIONS } from '../../lib/i18n';

interface Props {
  language: ThaiLanguage;
}

export default function LawsGuide({ language }: Props) {
  const uiT = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN;
  const data = LAWS_DATA[language] || LAWS_DATA['EN'];
  const proTip = LAWS_PRO_TIP[language] || LAWS_PRO_TIP['EN'];

  return (
    <div className="bg-white min-h-full">
      {/* Risk Level Indicator */}
      <div className="bg-red-50 p-4 border-b border-red-100 flex items-center justify-center gap-3">
        <AlertTriangle className="text-red-600 animate-pulse" size={20} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-red-700">
          {uiT.lawsModalSubtitle || 'Strict Law Enforcement in Thailand • Updated for 2026'}
        </span>
      </div>

      <div className="p-8 max-w-4xl mx-auto space-y-12">
        {/* Intro Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sacred-bg text-gold-deep mb-2">
            <Gavel size={32} />
          </div>
          <h2 className="text-2xl font-serif text-sacred-green italic">
            {uiT.lawsModalTitle || 'Key Laws for Visitors'}
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            {uiT.lawsModalIntro || 'Essential regulations that every visitor to Thailand must know. Thai law can be very strict with heavy penalties for infractions.'}
          </p>
        </div>

        {/* Laws Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-3xl border border-gold-soft/10 bg-white space-y-4 hover:border-red-200 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                  <Scale size={16} />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-sacred-green">{section.title}</h3>
              </div>
              <p className="text-[11px] text-gray-700 leading-relaxed italic">{section.content}</p>
              {section.points && (
                <ul className="space-y-2 pt-2">
                  {section.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-[10px] text-gray-500">
                      <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Pro Tip Section */}
        <div className="p-8 bg-sacred-bg/30 rounded-3xl border border-gold-soft/20 flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-white rounded-2xl shadow-sm text-gold-deep">
            <ShieldAlert size={32} />
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-sacred-green">
              {uiT.lawsProTipTitle || 'Expert Pro-Tip'}
            </h4>
            <p className="text-[11px] text-gray-600 leading-relaxed italic">
              {proTip}
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 italic">
          <Info size={16} className="text-gray-400" />
          <p className="text-[10px] text-gray-400">
            {uiT.lawsDisclaimer || 'Disclaimer: This information is for guidance only. Laws change and you should consult official government resources for final legal advice.'}
          </p>
        </div>
      </div>
    </div>
  );
}
