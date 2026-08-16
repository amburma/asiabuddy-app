'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { LogOut, UserPlus, Trash2, Plus, RotateCcw, Ban } from 'lucide-react';

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

export default function TourGuideAccountPage() {
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Form state
  const [source, setSource] = useState<'package' | 'purchased' | 'trial'>('package');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [tourDays, setTourDays] = useState('');
  const [phoneOrWhatsapp, setPhoneOrWhatsapp] = useState('');
  const [totalHoursAllocated, setTotalHoursAllocated] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Accounts list state
  const [accounts, setAccounts] = useState<any[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState('');
  
  // Top-up modal state
  const [topUpAccountId, setTopUpAccountId] = useState<string | null>(null);
  const [topUpHours, setTopUpHours] = useState('');
  const [topUpError, setTopUpError] = useState('');
  const [topUpSubmitting, setTopUpSubmitting] = useState(false);

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

  const fetchAccounts = async () => {
    setAccountsLoading(true);
    setAccountsError('');
    try {
      const response = await fetch('/api/admin/tour-guide/accounts');
      const data = await response.json();
      
      if (!response.ok) {
        setAccountsError(data.error || 'Failed to fetch accounts');
      } else {
        setAccounts(data.data || []);
      }
    } catch (err: any) {
      setAccountsError('An error occurred while fetching accounts');
    } finally {
      setAccountsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchAccounts();
    }
  }, [isLoggedIn]);

  const handleTerminate = async (accountId: string) => {
    if (!confirm('Are you sure you want to terminate this account? This will disable it from further use.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/tour-guide/accounts/${accountId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'terminate' }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Failed to terminate account');
      } else {
        fetchAccounts(); // Refresh the list
      }
    } catch (err) {
      alert('An error occurred while terminating the account');
    }
  };

  const handleReactivate = async (accountId: string) => {
    try {
      const response = await fetch(`/api/admin/tour-guide/accounts/${accountId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reactivate' }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Failed to reactivate account');
      } else {
        fetchAccounts(); // Refresh the list
      }
    } catch (err) {
      alert('An error occurred while reactivating the account');
    }
  };

  const handleTopUp = async () => {
    if (!topUpAccountId) return;

    const hours = parseFloat(topUpHours);
    if (isNaN(hours) || hours <= 0) {
      setTopUpError('Please enter a valid positive number of hours');
      return;
    }

    setTopUpError('');
    setTopUpSubmitting(true);

    try {
      const response = await fetch(`/api/admin/tour-guide/accounts/${topUpAccountId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'topup', hours }),
      });

      if (!response.ok) {
        const data = await response.json();
        setTopUpError(data.error || 'Failed to top up account');
      } else {
        setTopUpAccountId(null);
        setTopUpHours('');
        fetchAccounts(); // Refresh the list
      }
    } catch (err) {
      setTopUpError('An error occurred while topping up the account');
    } finally {
      setTopUpSubmitting(false);
    }
  };

  const handleDelete = async (accountId: string, isPackageTier: boolean) => {
    let confirmMessage = 'Are you sure you want to delete this account? This is permanent and cannot be undone.';
    
    if (isPackageTier) {
      confirmMessage += ' This is a package-tier account linked to a booking.';
    }

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/tour-guide/accounts/${accountId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Failed to delete account');
      } else {
        fetchAccounts(); // Refresh the list
      }
    } catch (err) {
      alert('An error occurred while deleting the account');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);
    setSubmitting(true);

    try {
      const payload: any = {
        source,
        username,
        password,
      };

      if (source === 'package') {
        if (!tourDays) {
          setSubmitError('Tour days is required for package accounts');
          setSubmitting(false);
          return;
        }
        payload.tour_days = parseInt(tourDays, 10);
        if (bookingId) {
          payload.booking_id = bookingId;
        }
      } else {
        if (!phoneOrWhatsapp) {
          setSubmitError('Phone/WhatsApp is required for purchased and trial accounts');
          setSubmitting(false);
          return;
        }
        payload.phone_or_whatsapp = phoneOrWhatsapp;

        if (source === 'purchased') {
          if (!totalHoursAllocated) {
            setSubmitError('Total hours allocated is required for purchased accounts');
            setSubmitting(false);
            return;
          }
          payload.total_hours_allocated = parseFloat(totalHoursAllocated);
        }
      }

      const response = await fetch('/api/admin/tour-guide/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || 'Failed to create account');
      } else {
        setSubmitSuccess(true);
        // Reset form
        setUsername('');
        setPassword('');
        setBookingId('');
        setTourDays('');
        setPhoneOrWhatsapp('');
        setTotalHoursAllocated('');
      }
    } catch (err: any) {
      setSubmitError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
          <p className="text-sm text-gray-500 mb-6">Sign in to access Tour Guide account management</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <Field label="Email">
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="admin@example.com"
                className={inputCls}
                required
              />
            </Field>

            <Field label="Password">
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className={inputCls}
                required
              />
            </Field>

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
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <UserPlus size={20} className="text-emerald-600" />
          <div>
            <h1 className="text-lg font-bold text-gray-800">Tour Guide Account Creation</h1>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs text-red-400 font-medium hover:underline"
        >
          <LogOut size={13} /> Logout
        </button>
      </header>

      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Create New Tour Guide Account</h2>

          {submitSuccess && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm">
              Account created successfully!
            </div>
          )}

          {submitError && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Account Source">
              <select
                value={source}
                onChange={e => setSource(e.target.value as 'package' | 'purchased' | 'trial')}
                className={inputCls}
              >
                <option value="package">Package (auto-issued at booking)</option>
                <option value="purchased">Purchased (manual)</option>
                <option value="trial">Trial (120 seconds)</option>
              </select>
            </Field>

            <Field label="Username">
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                className={inputCls}
                required
              />
            </Field>

            <Field label="Password">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className={inputCls}
                required
                minLength={8}
              />
            </Field>

            {source === 'package' && (
              <>
                <Field label="Tour Days">
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={tourDays}
                    onChange={e => setTourDays(e.target.value)}
                    placeholder="Enter number of tour days"
                    className={inputCls}
                    required
                  />
                </Field>
                <Field label="Booking ID (optional)">
                  <input
                    type="text"
                    value={bookingId}
                    onChange={e => setBookingId(e.target.value)}
                    placeholder="Enter booking ID for record-keeping"
                    className={inputCls}
                  />
                </Field>
              </>
            )}

            {source !== 'package' && (
              <>
                <Field label="Phone / WhatsApp">
                  <input
                    type="text"
                    value={phoneOrWhatsapp}
                    onChange={e => setPhoneOrWhatsapp(e.target.value)}
                    placeholder="Enter phone or WhatsApp number"
                    className={inputCls}
                    required
                  />
                </Field>

                {source === 'purchased' && (
                  <Field label="Total Hours Allocated">
                    <input
                      type="number"
                      step="0.01"
                      value={totalHoursAllocated}
                      onChange={e => setTotalHoursAllocated(e.target.value)}
                      placeholder="Enter total hours"
                      className={inputCls}
                      required
                    />
                  </Field>
                )}

                {source === 'trial' && (
                  <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm">
                    Trial accounts are limited to 120 seconds of usage.
                  </div>
                )}
              </>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-50"
            >
              {submitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Accounts List Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Tour Guide Accounts</h2>

          {accountsLoading && (
            <div className="text-gray-500 text-sm">Loading accounts...</div>
          )}

          {accountsError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {accountsError}
            </div>
          )}

          {!accountsLoading && !accountsError && accounts.length === 0 && (
            <div className="text-gray-500 text-sm">No accounts found</div>
          )}

          {!accountsLoading && !accountsError && accounts.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-bold text-gray-600 uppercase tracking-wider text-xs">Username</th>
                    <th className="text-left py-3 px-2 font-bold text-gray-600 uppercase tracking-wider text-xs">Source</th>
                    <th className="text-left py-3 px-2 font-bold text-gray-600 uppercase tracking-wider text-xs">Status</th>
                    <th className="text-left py-3 px-2 font-bold text-gray-600 uppercase tracking-wider text-xs">Hours Allocated</th>
                    <th className="text-left py-3 px-2 font-bold text-gray-600 uppercase tracking-wider text-xs">Hours Consumed</th>
                    <th className="text-left py-3 px-2 font-bold text-gray-600 uppercase tracking-wider text-xs">Created At</th>
                    <th className="text-left py-3 px-2 font-bold text-gray-600 uppercase tracking-wider text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.id} className="border-b border-gray-100">
                      <td className="py-3 px-2 text-gray-800">{account.username}</td>
                      <td className="py-3 px-2 text-gray-600 capitalize">{account.source}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          account.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                          account.status === 'capped' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {account.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-gray-800">{account.total_hours_allocated}</td>
                      <td className="py-3 px-2 text-gray-600">{account.hours_consumed || 0}</td>
                      <td className="py-3 px-2 text-gray-500">
                        {new Date(account.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          {account.status === 'active' || account.status === 'capped' ? (
                            <button
                              onClick={() => handleTerminate(account.id)}
                              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium"
                            >
                              <Ban size={12} /> Terminate
                            </button>
                          ) : (
                            <button
                              onClick={() => handleReactivate(account.id)}
                              className="flex items-center gap-1 text-xs text-emerald-500 hover:text-emerald-700 font-medium"
                            >
                              <RotateCcw size={12} /> Reactivate
                            </button>
                          )}
                          <button
                            onClick={() => setTopUpAccountId(account.id)}
                            className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 font-medium"
                          >
                            <Plus size={12} /> Top Up
                          </button>
                          <button
                            onClick={() => handleDelete(account.id, !!account.booking_id)}
                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top Up Modal */}
        {topUpAccountId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Top Up Account</h3>
              
              {topUpError && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {topUpError}
                </div>
              )}

              <Field label="Hours to Add">
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={topUpHours}
                  onChange={e => setTopUpHours(e.target.value)}
                  placeholder="Enter hours"
                  className={inputCls}
                  required
                />
              </Field>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setTopUpAccountId(null);
                    setTopUpHours('');
                    setTopUpError('');
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTopUp}
                  disabled={topUpSubmitting}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm disabled:opacity-50"
                >
                  {topUpSubmitting ? 'Adding...' : 'Add Hours'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
