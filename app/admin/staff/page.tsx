'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { LogOut, ExternalLink } from 'lucide-react';
import { staffTools } from '../../../data/staffTools';

export const dynamic = 'force-dynamic';

const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white';

export default function StaffHubPage() {
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: any) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        setLoginError(error.message);
      } else if (data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
        setLoginEmail('');
        setLoginPassword('');
      }
    } catch (err: any) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">AsiaBuddy Admin</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in to access staff hub</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="admin@example.com"
                className={inputCls}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className={inputCls}
                required
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-50"
            >
              {loginLoading ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Staff Hub</h1>
          <p className="text-sm text-gray-500">Quick access to staff tools and resources</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {staffTools.map((category) => (
          <div key={category.name} className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-4">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow flex items-center justify-between group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-600 transition-colors">
                    {tool.name}
                  </span>
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Affiliate Program Link Converter - Distinct Section */}
        <div className="border-t border-gray-200 pt-6">
          <a
            href="https://asiabuddy.app/link-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 text-emerald-700 font-bold py-4 rounded-xl text-center transition-colors"
          >
            Affiliate Program Link Converter
          </a>
        </div>
      </div>
    </div>
  );
}
