'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (from the reset link)
    supabase.auth.getUser().then(({ data: { user }, error }: any) => {
      if (error || !user) {
        setError('This reset link has expired or is invalid. Please request a new one.');
      } else {
        setUser(user);
      }
      setLoading(false);
    });
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setUpdating(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setError(error.message || 'Failed to update password. Please try again.');
      } else {
        setSuccess(true);
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push('/admin/paid-invoice');
        }, 3000);
      }
    } catch (err: any) {
      setError('An error occurred. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {success ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Password Updated!</h1>
            <p className="text-sm text-gray-500 mb-6">
              Your password has been successfully updated. Redirecting to login...
            </p>
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
          </>
        ) : error ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Invalid Reset Link</h1>
            <p className="text-sm text-red-500 mb-6">{error}</p>
            <button
              onClick={() => router.push('/admin/paid-invoice')}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm"
            >
              Request New Reset Link
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Set New Password</h1>
            <p className="text-sm text-gray-500 mb-6">Enter your new password below</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="New Password">
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputCls}
                  required
                  minLength={8}
                />
              </Field>

              <Field label="Confirm Password">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputCls}
                  required
                  minLength={8}
                />
              </Field>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={updating}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Update Password'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => router.push('/admin/paid-invoice')}
                className="text-sm text-gray-600 hover:text-gray-700 font-medium"
              >
                ← Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
