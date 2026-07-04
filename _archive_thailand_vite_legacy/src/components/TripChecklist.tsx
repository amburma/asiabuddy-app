import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  RotateCcw, 
  ChevronRight, 
  X,
  FileText,
  CreditCard,
  Smartphone,
  ShieldAlert,
  HeartPlus,
  MapPin,
  ClipboardList,
  CheckCircle
} from 'lucide-react';
import { UI_TRANSLATIONS } from '../i18n';
import { SupportedLanguage } from '../types';

interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  isCustom?: boolean;
}

interface TripChecklistProps {
  language: SupportedLanguage;
  onClose: () => void;
}

export const TripChecklist: React.FC<TripChecklistProps> = ({ language, onClose }) => {
  const uiT = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN;
  const t = (uiT as any).checklist;

  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [customText, setCustomText] = useState('');

  // Initial items setup
  const getDefaultItems = (): ChecklistItem[] => {
    return [
      { id: 'passport', text: t.items.passport, category: 'docs', completed: false },
      { id: 'flights', text: t.items.flights, category: 'docs', completed: false },
      { id: 'hotel', text: t.items.hotel, category: 'docs', completed: false },
      { id: 'insurance', text: t.items.insurance, category: 'docs', completed: false },
      { id: 'vaccine', text: t.items.vaccine, category: 'docs', completed: false },
      { id: 'backups', text: t.items.backups, category: 'docs', completed: false },
      
      { id: 'cash', text: t.items.cash, category: 'finance', completed: false },
      { id: 'cards', text: t.items.cards, category: 'finance', completed: false },
      
      { id: 'sim', text: t.items.sim, category: 'electronics', completed: false },
      { id: 'power', text: t.items.power, category: 'electronics', completed: false },
      { id: 'adapter', text: t.items.adapter, category: 'electronics', completed: false },
      { id: 'maps', text: t.items.maps, category: 'electronics', completed: false },
      
      { id: 'medicine', text: t.items.medicine, category: 'health', completed: false },
      { id: 'firstaid', text: t.items.firstaid, category: 'health', completed: false },
      { id: 'sunscreen', text: t.items.sunscreen, category: 'health', completed: false },
      { id: 'clothing', text: t.items.clothing, category: 'health', completed: false },
      
      { id: 'transport', text: t.items.transport, category: 'safety', completed: false },
      { id: 'address', text: t.items.address, category: 'safety', completed: false },
      { id: 'emergency', text: t.items.emergency, category: 'safety', completed: false },
      { id: 'advisories', text: t.items.advisories, category: 'safety', completed: false },
      
      { id: 'numbers', text: t.items.numbers, category: 'app', completed: false },
      { id: 'phrases', text: t.items.phrases, category: 'app', completed: false },
      { id: 'vat', text: t.items.vat, category: 'app', completed: false },
    ];
  };

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('thailand_trip_checklist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Sync with translated text from i18n
        const synced = parsed.map((item: ChecklistItem) => {
          if (item.isCustom) return item;
          const defaultItem = getDefaultItems().find(d => d.id === item.id);
          return defaultItem ? { ...item, text: defaultItem.text } : item;
        });
        setItems(synced);
      } catch (e) {
        setItems(getDefaultItems());
      }
    } else {
      setItems(getDefaultItems());
    }
  }, [language]);

  // Save to localStorage
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('thailand_trip_checklist', JSON.stringify(items));
    }
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;
    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      text: customText.trim(),
      category: 'custom',
      completed: false,
      isCustom: true
    };
    setItems([...items, newItem]);
    setCustomText('');
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const resetAll = () => {
    if (window.confirm(t.resetBtn + '?')) {
      setItems(getDefaultItems());
    }
  };

  const completedCount = items.filter(i => i.completed).length;
  const progress = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  const categories = [
    { id: 'docs', label: t.categories.docs, icon: FileText },
    { id: 'finance', label: t.categories.finance, icon: CreditCard },
    { id: 'electronics', label: t.categories.electronics, icon: Smartphone },
    { id: 'health', label: t.categories.health, icon: HeartPlus },
    { id: 'safety', label: t.categories.safety, icon: ShieldAlert },
    { id: 'app', label: t.categories.app, icon: ClipboardList },
    { id: 'custom', label: t.categories.custom, icon: Plus },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white w-full max-w-2xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-sacred-green p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-gold-deep" />
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest">{t.title}</h2>
              <p className="text-xs text-white/70 font-medium">{t.subtitle}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gold-deep"
              />
            </div>
            <span className="text-sm font-bold text-gold-deep">{progress}%</span>
          </div>
        </div>

        {/* Categories & Items Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50/50">
          {categories.map((cat) => {
            const catItems = items.filter(item => item.category === cat.id);
            if (cat.id !== 'custom' && catItems.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <cat.icon className="w-4 h-4 text-sacred-green" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-sacred-green">{cat.label}</h3>
                </div>

                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {catItems.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`group flex items-start gap-3 p-3 rounded-xl transition-all border ${
                          item.completed 
                            ? 'bg-white border-gray-100' 
                            : 'bg-white border-gray-200 hover:border-gold-deep/30'
                        }`}
                      >
                        <button 
                          onClick={() => toggleItem(item.id)}
                          className="mt-0.5"
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-sacred-green" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300" />
                          )}
                        </button>
                        <span className={`flex-1 text-sm leading-snug transition-all ${
                          item.completed 
                          ? 'text-gray-400 line-through italic' 
                          : 'text-gray-700'
                        }`}>
                          {item.text}
                        </span>
                        {item.isCustom && (
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {cat.id === 'custom' && (
                    <form onSubmit={addCustomItem} className="flex gap-2">
                      <input 
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder={t.addPlaceholder}
                        className="flex-1 text-sm px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-deep/20 focus:border-gold-deep transition-all"
                      />
                      <button 
                        type="submit"
                        className="p-2 bg-sacred-green text-white rounded-xl hover:bg-sacred-green/90 transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
          <button 
            onClick={resetAll}
            className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest px-4 py-2"
          >
            <RotateCcw className="w-4 h-4" />
            {t.resetBtn}
          </button>
          
          <div className="flex gap-2">
            {/* Optional Export PDF could go here */}
            {progress === 100 && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gold-deep text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-gold-deep/20"
              >
                100% Prepared!
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
