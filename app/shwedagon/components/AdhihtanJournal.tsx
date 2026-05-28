"use client";

import { useState, useEffect } from "react";
import { BookOpen, Calendar, Bookmark, Heart, Trash2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const ADHIHTAN_TRANSLATIONS: Record<string, Record<string, string>> = {
  adhihtan: { en: "Adhihtan Journal", my: "အဓိဋ္ဌာန်ပုတီးစိပ်မှတ်တမ်း" },
  header_title: { en: "Quick Adhihtan Record", my: "အဓိဋ္ဌာန်မှတ်တမ်းအသစ်" },
  subtitle: { en: "Log your spiritual focus and bead rounds on the terrace", my: "ရင်ပြင်တော်ပေါ်ရှိ ဝတ်ပြုမှုနှင့် ပုတီးစိပ်ပတ်ရေများကို မှတ်တမ်းတင်ပါ" },
  placeholder_gatha: { en: "e.g., Itipi So, Shwe Nyane Htot...", my: "ဥပမာ- ဣတိပိသော၊ သဗ္ဗညုတဉာဏ်တော်..." },
  bead_count_label: { en: "Bead Counts (Mala)", my: "ပုတီးစိပ်ပတ်ရေ" },
  placeholder_note: { en: "Your spiritual reflection or wish...", my: "ဆုတောင်း သို့မဟုတ် စိတ်ငြိမ်းချမ်းမှု မှတ်စု..." },
  button_close: { en: "Cancel", my: "ပယ်ဖျက်" },
  button_save: { en: "Save Log", my: "သိမ်းဆည်းမည်" },
  success_toast: { en: "Devotional log saved to journal!", my: "အဓိဋ္ဌာန်မှတ်တမ်းကို အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ။" }
};

interface AdhihtanLog {
  id: string;
  date: string;
  gatha: string;
  beads: number;
  note: string;
  timestamp: number;
}

interface AdhihtanJournalProps {
  langCode: string;
}

export default function AdhihtanJournal({ langCode }: AdhihtanJournalProps) {
  const [logs, setLogs] = useState<AdhihtanLog[]>([]);

  const loadLogs = () => {
    const stored = localStorage.getItem("shwedagon_adhihtan_logs");
    if (stored) {
      try {
        setLogs(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing adhihtan logs:", e);
      }
    }
  };

  useEffect(() => {
    loadLogs();
    window.addEventListener("shwedagon_adhihtan_updated", loadLogs);
    return () => window.removeEventListener("shwedagon_adhihtan_updated", loadLogs);
  }, []);

  const handleDelete = (id: string) => {
    const updated = logs.filter(log => log.id !== id);
    localStorage.setItem("shwedagon_adhihtan_logs", JSON.stringify(updated));
    setLogs(updated);
    
    // Trigger custom event to update status globally if needed
    window.dispatchEvent(new Event("shwedagon_adhihtan_updated"));
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full bg-sacred-bg/5">
      {/* Header Info */}
      <div className="space-y-1">
        <h2 className="serif text-2xl font-black text-gold-dark tracking-tight flex items-center gap-2">
          <Sparkles className="text-gold-soft" size={24} />
          {ADHIHTAN_TRANSLATIONS["adhihtan"]?.[langCode] || ADHIHTAN_TRANSLATIONS["adhihtan"]?.["en"]}
        </h2>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {langCode === "my" ? "မိမိပြုလုပ်ခဲ့သော ကုသိုလ်များနှင့် ပုတီးစိပ်မှတ်တမ်းစာအုပ်" : "Personal sacred history of mantras and devotion rounds"}
        </p>
      </div>

      {/* Logs View List */}
      {logs.length === 0 ? (
        <Card className="border-gold-soft/10 bg-white/70 backdrop-blur-sm rounded-[2rem] p-8 text-center border-dashed">
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-gold-soft mx-auto mb-3">
            <BookOpen size={20} />
          </div>
          <h4 className="serif font-bold text-sm text-gold-dark mb-1">
            {langCode === "my" ? "မှတ်တမ်းမရှိသေးပါ" : "No Records Found"}
          </h4>
          <p className="text-xs text-muted-foreground font-medium max-w-xs mx-auto leading-normal">
            {langCode === "my" ? "ညာဘက်အပေါ် (သို့) အောက်ခြေရှိ Floating Button မှတစ်ဆင့် ပုတီးစိပ်မှတ်တမ်း တင်နိုင်ပါသည်" : "Tap the quick addition '+' or message icons on layouts to build your sacred journal logs."}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <Card key={log.id} className="border-gold-soft/10 bg-white shadow-sm hover:shadow-md transition-all rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground bg-gray-100 px-2.5 py-1 rounded-lg">
                    <Calendar size={10} />
                    <span>{log.date}</span>
                  </div>
                  <div className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg shadow-sm">
                    ✨ {log.beads} {langCode === "my" ? "ပတ် (အကြိမ်)" : "Rounds (Mala)"}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h4 className="serif font-black text-base text-gold-dark flex items-center gap-2">
                    <Bookmark size={14} className="text-amber-600 shrink-0" />
                    <span className="break-words">{log.gatha}</span>
                  </h4>
                  {log.note && (
                    <p className="text-xs font-medium text-foreground/80 leading-relaxed pl-3 border-l-2 border-gold-soft/30 italic bg-amber-50/10 py-1 rounded-r-lg">
                      <Heart size={10} className="inline mr-1 text-rose-500" /> {log.note}
                    </p>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => handleDelete(log.id)}
                className="p-2.5 text-muted-foreground hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all self-end sm:self-center shrink-0 border border-transparent hover:border-rose-100"
                title="Delete Record"
              >
                <Trash2 size={16} />
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}