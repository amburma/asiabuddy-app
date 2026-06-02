'use client'

import { useEffect } from 'react'

export default function ThailandPage() {
  useEffect(() => {
    window.location.href = 'http://localhost:3001/thailand/'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-white">Redirecting to Thailand Guide...</p>
    </div>
  )
}
