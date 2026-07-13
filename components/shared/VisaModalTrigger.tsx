'use client'

interface VisaModalTriggerProps {
  country: string
  language: string
  children: React.ReactNode
}

export default function VisaModalTrigger({ country, language, children }: VisaModalTriggerProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('openGuideModal', {
      detail: { modalId: 'visa', language }
    }))
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#B8962E] font-medium transition-colors bg-transparent border-0 p-0 cursor-pointer"
    >
      {children}
    </button>
  )
}
