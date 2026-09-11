export default function KeyTakeawayBox({ content }: { content: string }) {
  return (
    <div className="my-8 p-6 bg-[#F5F0E8] border-l-[4px] border-[#D4AF37] rounded-lg">
      <div className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wide mb-2">
        📌 Key Takeaway
      </div>
      <p className="text-[#0D0D0D] text-base leading-relaxed">
        {content}
      </p>
    </div>
  )
}