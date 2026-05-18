import MarkdownRenderer from './MarkdownRenderer';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  footer?: string;
  children: React.ReactNode;
}

export default function GuideModal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  footer,
  children,
}: GuideModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-sacred-bg border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-deep/10 flex items-center justify-center text-gold-deep">
                  {icon}
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-sacred-green leading-none mb-1">
                    {title}
                  </h2>
                  {subtitle && (
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter text-gold-deep">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-8 scroll-smooth bg-white scrollbar-thin scrollbar-thumb-gold-soft scrollbar-track-transparent">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center italic text-[10px] text-gray-400">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}