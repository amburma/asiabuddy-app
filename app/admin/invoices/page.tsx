'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut, FileText, Filter, ChevronDown, ExternalLink, RefreshCw } from 'lucide-react';

export const dynamic = 'force-dynamic';

const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white';

interface Invoice {
  id: string;
  invoice_no: string;
  invoice_date: string;
  country: string;
  customer_name: string;
  customer_contact: string;
  customer_email: string | null;
  service_type: string;
  currency: string;
  base_price: number;
  service_fee: number;
  vat_amount: number;
  total_amount: number;
  payment_method: string;
  issued_by: string;
  remarks: string | null;
  status: string;
  sheet_status: string;
  email_status: string;
  pdf_url: string | null;
  created_at: string;
}

export default function InvoicesPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invoicesLoading, setInvoicesLoading] = useState(false);
  const [issuedByOptions, setIssuedByOptions] = useState<string[]>([]);

  // Filters
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedIssuedBy, setSelectedIssuedBy] = useState('');

  // Pagination
  const [limit] = useState(100);
  const [hasMore, setHasMore] = useState(false);

  // Auth
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: any) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        fetchInvoices();
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  const fetchInvoices = async (loadMore = false) => {
    setInvoicesLoading(true);
    try {
      let query = supabase
        .from('paid_invoices')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(loadMore ? invoices.length + limit : limit);

      // Apply date filter
      if (dateFrom) {
        query = query.gte('invoice_date', dateFrom);
      }
      if (dateTo) {
        query = query.lte('invoice_date', dateTo);
      }

      // Apply issued_by filter
      if (selectedIssuedBy) {
        query = query.eq('issued_by', selectedIssuedBy);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching invoices:', error);
      } else {
        if (loadMore) {
          setInvoices(data || []);
        } else {
          setInvoices(data || []);
        }
        setHasMore((data?.length || 0) >= limit);

        // Extract unique issued_by values for dropdown
        const uniqueIssuedBy = Array.from(
          new Set<string>((data || []).map((inv: Invoice) => inv.issued_by))
        ).filter(Boolean);
        setIssuedByOptions(uniqueIssuedBy);
      }
    } catch (err) {
      console.error('Fetch invoices error:', err);
    } finally {
      setInvoicesLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
  };

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
        fetchInvoices();
      }
    } catch (err: any) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleFilter = () => {
    fetchInvoices();
  };

  const handleResetFilters = () => {
    setDateFrom('');
    setDateTo('');
    setSelectedIssuedBy('');
    fetchInvoices();
  };

  const getStatusBadge = (status: string) => {
    if (status === 'issued') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
          Issued
        </span>
      );
    } else if (status === 'failed') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          Failed
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {status}
        </span>
      );
    }
  };

  const getSyncStatusBadge = (status: string) => {
    if (status === 'success') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
          ✓
        </span>
      );
    } else if (status === 'failed') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          ✗
        </span>
      );
    } else if (status === 'skipped') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          −
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          ⏳
        </span>
      );
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!isLoggedIn) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">AsiaBuddy Admin</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to access the invoices dashboard</p>

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <FileText size={20} className="text-emerald-600" />
          <div>
            <h1 className="text-lg font-bold text-gray-800">Paid Invoices</h1>
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

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={16} className="text-gray-500" />
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Filters</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                Date From
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                Date To
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                Issued By
              </label>
              <select
                value={selectedIssuedBy}
                onChange={e => setSelectedIssuedBy(e.target.value)}
                className={inputCls}
              >
                <option value="">All Operators</option>
                {issuedByOptions.map(email => (
                  <option key={email} value={email}>{email}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={handleFilter}
                disabled={invoicesLoading}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm disabled:opacity-50"
              >
                Apply Filters
              </button>
              <button
                onClick={handleResetFilters}
                disabled={invoicesLoading}
                className="px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* INVOICES TABLE */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">
              Invoices ({invoices.length})
            </h2>
            <button
              onClick={() => fetchInvoices()}
              disabled={invoicesLoading}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              <RefreshCw size={14} className={invoicesLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {invoicesLoading && invoices.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p>Loading invoices...</p>
            </div>
          ) : invoices.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <FileText size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No invoices found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Invoice No</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Issued By</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Service Type</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Service Fee</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Sync</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{invoice.invoice_no}</td>
                      <td className="px-6 py-4 text-gray-600">{invoice.issued_by}</td>
                      <td className="px-6 py-4 text-gray-900">{invoice.customer_name}</td>
                      <td className="px-6 py-4 text-gray-600">{invoice.customer_email || '—'}</td>
                      <td className="px-6 py-4 text-gray-600 capitalize">{invoice.service_type.replace('_', ' ')}</td>
                      <td className="px-6 py-4 text-right font-medium text-gray-900">
                        {invoice.currency} {invoice.total_amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600">
                        {invoice.service_fee > 0 ? `${invoice.currency} ${invoice.service_fee.toFixed(2)}` : '—'}
                      </td>
                      <td className="px-6 py-4 text-center">{getStatusBadge(invoice.status)}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span title="Sheet">{getSyncStatusBadge(invoice.sheet_status)}</span>
                          <span title="Email">{getSyncStatusBadge(invoice.email_status)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{new Date(invoice.invoice_date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-center">
                        {invoice.pdf_url ? (
                          <a
                            href={invoice.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            <ExternalLink size={14} />
                            View
                          </a>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {hasMore && invoices.length >= limit && (
            <div className="px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => fetchInvoices(true)}
                disabled={invoicesLoading}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl text-sm disabled:opacity-50"
              >
                {invoicesLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
