'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/tour-guide/logout', { method: 'POST' })
      router.push('/tourguide')
    } catch {
      // If logout fails, still redirect to login
      router.push('/tourguide')
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm text-[#F5F0E8] hover:text-[#C9A84C] transition-colors"
    >
      <LogOut size={16} />
      Logout
    </button>
  )
}
