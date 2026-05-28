$content = @'
import { useState, useEffect } from 'react';
import { X, Share, Plus } from 'lucide-react';

export default function IOSInstallBanner({ language }: { language: string }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    const dismissed = localStorage.getItem('ios_install_dismissed');
    if (isIOS && !isInStandaloneMode && !dismissed) {
      setTimeout(() => setShowBanner(true), 3000);
    }
  }, []);

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('ios_install_dismissed', 'true');
  };

  const messages: Record<string, { title: string; step1: string; step2: string; step3: string }> = {
    EN: { title: 'Install ThaiGuide', step1: 'Tap the Share button', step2: 'Scroll and tap "Add to Home Screen"', step3: 'Tap "Add" to install' },
    MM: { title: 'ThaiGuide Install လုပ်ပါ', step1: 'Share ခလုတ် နှိပ်ပါ', step2: '"Add to Home Screen" ရွေးပါ', step3: '"Add" နှိပ်ပါ' },
    TH: { title: 'ติดตั้ง ThaiGuide', step1: 'แตะปุ่ม Share', step2: 'แตะ "Add to Home Screen"', step3: 'แตะ "Add"' },
    DE: { title: 'ThaiGuide installieren', step1: 'Teilen-Taste tippen', step2: '"Zum Home-Bildschirm" wählen', step3: '"Hinzufügen" tippen' },
    FR: { title: 'Installer ThaiGuide', step1: 'Appuyer sur Partager', step2: 'Choisir "Sur l\'écran d\'accueil"', step3: 'Appuyer sur "Ajouter"' },
    ES: { title: 'Instalar ThaiGuide', step1: 'Tocar Compartir', step2: 'Tocar "Añadir a inicio"', step3: 'Tocar "Añadir"' },
  };

  const msg = messages[language] || messages.EN;

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-gold-soft/20 p-6 max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src="/thailand/icons/icon-192x192.png" className="w-10 h-10 rounded-xl" alt="ThaiGuide" />
            <p className="font-bold text-sacred-green text-sm uppercase tracking-widest">{msg.title}</p>
          </div>
          <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="w-7 h-7 rounded-full bg-sacred-bg flex items-center justify-center text-gold-deep font-bold text-xs">1</div>
            <span>{msg.step1}</span>
            <Share size={16} className="text-blue-500 ml-auto" />
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="w-7 h-7 rounded-full bg-sacred-bg flex items-center justify-center text-gold-deep font-bold text-xs">2</div>
            <span>{msg.step2}</span>
            <Plus size={16} className="text-gray-500 ml-auto" />
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="w-7 h-7 rounded-full bg-sacred-bg flex items-center justify-center text-gold-deep font-bold text-xs">3</div>
            <span>{msg.step3}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
          <div className="w-8 h-1 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
'@

Set-Content -Path "C:\Users\Thuta_Dell\Documents\GitHub\asiabuddy-main\asiabuddy-app\app\thailand\src\components\IOSInstallBanner.tsx" -Value $content -Encoding UTF8