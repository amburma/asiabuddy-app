'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UI_TRANSLATIONS } from '../../lib/i18n'

export default function TourGuideLoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const t = UI_TRANSLATIONS.EN.tourGuideAuth || {
    title: 'Tour Guide',
    loginTitle: 'Tour Guide Login',
    username: 'Username',
    password: 'Password',
    loginButton: 'Login',
    loggingIn: 'Logging in...',
    invalidCredentials: 'Invalid username or password',
    loginError: 'Login failed. Please try again.'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/tour-guide/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        router.push('/tourguide/dashboard')
      } else {
        setError(t.invalidCredentials)
      }
    } catch (err) {
      setError(t.loginError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-[#0D0D0D] border border-[#C9A84C] rounded-lg p-8">
        <h1 className="text-2xl font-bold text-[#F5F0E8] text-center mb-6">
          {t.loginTitle}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#F5F0E8] mb-2">
              {t.username}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#C9A84C] rounded-md text-[#F5F0E8] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
              placeholder={t.username}
              required
              autoComplete="username"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#F5F0E8] mb-2">
              {t.password}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#C9A84C] rounded-md text-[#F5F0E8] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
              placeholder={t.password}
              required
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[44px] bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-md hover:bg-[#b8942f] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#0D0D0D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-[#0D0D0D] border-t-transparent rounded-full animate-spin" />
                <span>{t.loggingIn}</span>
              </div>
            ) : (
              t.loginButton
            )}
          </button>
        </form>
      </div>
    </div>
  )
}