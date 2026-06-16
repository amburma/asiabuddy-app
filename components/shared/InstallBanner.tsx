import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallBanner({ language }: { language: string }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setShowBanner(false);
    setDeferredPrompt(null);
  };

  const messages: Record<string, { title: string; btn: string }> = {
    EN: { title: 'Install ThaiGuide App', btn: 'Install' },
    TH: { title: 'Install ThaiGuide App', btn: 'Install' },
    MM: { title: 'ThaiGuide App Install', btn: 'Install' },
    DE: { title: 'ThaiGuide App installieren', btn: 'Installieren' },
    FR: { title: 'Installer ThaiGuide', btn: 'Installer' },
    ES: { title: 'Instalar ThaiGuide', btn: 'Instalar' },
  };

  const msg = messages[language] || messages.EN;

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-24 left-0 right-0 z-50 flex justify-center px-4">
      <div className="bg-sacred-green text-white rounded-2xl shadow-2xl flex items-center gap-4 px-5 py-4 max-w-sm w-full">
        <img src="/thailand/icons/icon-192x192.png" className="w-10 h-10 rounded-xl" alt="ThaiGuide" />
        <div className="flex-grow">
          <p className="text-xs font-bold uppercase tracking-widest">{msg.title}</p>
          <p className="text-[10px] opacity-60 mt-0.5">AsiaBuddy Services</p>
        </div>
        <button onClick={handleInstall} className="bg-gold-deep text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
          <Download size={14} />
          {msg.btn}
        </button>
        <button onClick={() => setShowBanner(false)} className="opacity-50 hover:opacity-100">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
