'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { LogOut, Plus, Pencil, Trash2, X, ArrowUp, ArrowDown, RefreshCw, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white';

interface TransportTicketRoute {
  id: string;
  country: string;
  origin_slug: string;
  origin_display: string;
  destination_slug: string;
  destination_display: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function TransportRoutesPage() {
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [routes, setRoutes] = useState<TransportTicketRoute[]>([]);
  const [routesLoading, setRoutesLoading] = useState(false);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState<TransportTicketRoute | null>(null);
  const [formData, setFormData] = useState({
    country: 'thailand',
    origin_slug: '',
    origin_display: '',
    destination_slug: '',
    destination_display: '',
    display_order: 0,
    is_active: true,
  });
  const [saving, setSaving] = useState(false);

  // Auth
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: any) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        fetchRoutes();
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  const fetchRoutes = async () => {
    setRoutesLoading(true);
    try {
      const { data, error } = await supabase
        .from('transport_ticket_routes')
        .select('*')
        .order('country', { ascending: true })
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching routes:', error);
      } else {
        setRoutes(data || []);
      }
    } catch (err) {
      console.error('Fetch routes error:', err);
    } finally {
      setRoutesLoading(false);
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
        fetchRoutes();
      }
    } catch (err: any) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingRoute(null);
    setFormData({
      country: 'thailand',
      origin_slug: '',
      origin_display: '',
      destination_slug: '',
      destination_display: '',
      display_order: routes.length > 0 ? Math.max(...routes.map(r => r.display_order)) + 1 : 0,
      is_active: true,
    });
    setShowForm(true);
  };

  const handleEdit = (route: TransportTicketRoute) => {
    setEditingRoute(route);
    setFormData({
      country: route.country,
      origin_slug: route.origin_slug,
      origin_display: route.origin_display,
      destination_slug: route.destination_slug,
      destination_display: route.destination_display,
      display_order: route.display_order,
      is_active: route.is_active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this route?')) return;

    try {
      const { error } = await supabase
        .from('transport_ticket_routes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting route:', error);
        alert('Failed to delete route');
      } else {
        fetchRoutes();
      }
    } catch (err) {
      console.error('Delete route error:', err);
      alert('Failed to delete route');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        country: formData.country,
        origin_slug: formData.origin_slug.toLowerCase().trim(),
        origin_display: formData.origin_display.trim(),
        destination_slug: formData.destination_slug.toLowerCase().trim(),
        destination_display: formData.destination_display.trim(),
        display_order: formData.display_order,
        is_active: formData.is_active,
      };

      if (editingRoute) {
        const { error } = await supabase
          .from('transport_ticket_routes')
          .update(payload)
          .eq('id', editingRoute.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('transport_ticket_routes')
          .insert(payload);

        if (error) throw error;
      }

      setShowForm(false);
      setEditingRoute(null);
      fetchRoutes();
    } catch (err: any) {
      console.error('Save route error:', err);
      alert('Failed to save route: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleMoveUp = async (route: TransportTicketRoute) => {
    const routeAbove = routes
      .filter(r => r.country === route.country && r.display_order < route.display_order)
      .sort((a, b) => b.display_order - a.display_order)[0];

    if (!routeAbove) return;

    try {
      await supabase
        .from('transport_ticket_routes')
        .update({ display_order: routeAbove.display_order })
        .eq('id', route.id);

      await supabase
        .from('transport_ticket_routes')
        .update({ display_order: route.display_order })
        .eq('id', routeAbove.id);

      fetchRoutes();
    } catch (err) {
      console.error('Move up error:', err);
    }
  };

  const handleMoveDown = async (route: TransportTicketRoute) => {
    const routeBelow = routes
      .filter(r => r.country === route.country && r.display_order > route.display_order)
      .sort((a, b) => a.display_order - b.display_order)[0];

    if (!routeBelow) return;

    try {
      await supabase
        .from('transport_ticket_routes')
        .update({ display_order: routeBelow.display_order })
        .eq('id', route.id);

      await supabase
        .from('transport_ticket_routes')
        .update({ display_order: route.display_order })
        .eq('id', routeBelow.id);

      fetchRoutes();
    } catch (err) {
      console.error('Move down error:', err);
    }
  };

  const handleToggleActive = async (route: TransportTicketRoute) => {
    try {
      const { error } = await supabase
        .from('transport_ticket_routes')
        .update({ is_active: !route.is_active })
        .eq('id', route.id);

      if (error) throw error;
      fetchRoutes();
    } catch (err) {
      console.error('Toggle active error:', err);
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
        <p className="text-sm text-gray-500 mb-6">Sign in to access transport routes management</p>

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
          <MapPin size={20} className="text-emerald-600" />
          <div>
            <h1 className="text-lg font-bold text-gray-800">Transport Ticket Routes</h1>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchRoutes()}
            disabled={routesLoading}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            <RefreshCw size={14} className={routesLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-red-400 font-medium hover:underline"
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      {/* FORM */}
      {showForm && (
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">
                {editingRoute ? 'Edit Route' : 'Add New Route'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingRoute(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    className={inputCls}
                    required
                  >
                    <option value="thailand">Thailand</option>
                    <option value="myanmar">Myanmar</option>
                    <option value="vietnam">Vietnam</option>
                    <option value="cambodia">Cambodia</option>
                    <option value="laos">Laos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    className={inputCls}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Origin Slug (12Go format)
                  </label>
                  <input
                    type="text"
                    value={formData.origin_slug}
                    onChange={e => setFormData({ ...formData, origin_slug: e.target.value })}
                    placeholder="e.g., bangkok"
                    className={inputCls}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Origin Display Name
                  </label>
                  <input
                    type="text"
                    value={formData.origin_display}
                    onChange={e => setFormData({ ...formData, origin_display: e.target.value })}
                    placeholder="e.g., Bangkok"
                    className={inputCls}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Destination Slug (12Go format)
                  </label>
                  <input
                    type="text"
                    value={formData.destination_slug}
                    onChange={e => setFormData({ ...formData, destination_slug: e.target.value })}
                    placeholder="e.g., phuket"
                    className={inputCls}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Destination Display Name
                  </label>
                  <input
                    type="text"
                    value={formData.destination_display}
                    onChange={e => setFormData({ ...formData, destination_display: e.target.value })}
                    placeholder="e.g., Phuket"
                    className={inputCls}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-400"
                />
                <label htmlFor="is_active" className="text-sm text-gray-700">
                  Active (show on public page)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm disabled:opacity-50"
                >
                  {saving ? 'Saving...' : (editingRoute ? 'Update Route' : 'Add Route')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingRoute(null);
                  }}
                  className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ROUTES TABLE */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">
              Routes ({routes.length})
            </h2>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl text-sm"
            >
              <Plus size={16} /> Add Route
            </button>
          </div>

          {routesLoading && routes.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p>Loading routes...</p>
            </div>
          ) : routes.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <MapPin size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No routes found. Click "Add Route" to create one.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Country</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Origin Slug</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Dest Slug</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Active</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {routes.map((route) => (
                    <tr key={route.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900 capitalize">{route.country}</td>
                      <td className="px-6 py-4 text-gray-900">
                        {route.origin_display} → {route.destination_display}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-mono text-xs">{route.origin_slug}</td>
                      <td className="px-6 py-4 text-gray-600 font-mono text-xs">{route.destination_slug}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleMoveUp(route)}
                            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"
                            title="Move Up"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <span className="text-gray-700 font-medium">{route.display_order}</span>
                          <button
                            onClick={() => handleMoveDown(route)}
                            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"
                            title="Move Down"
                          >
                            <ArrowDown size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleToggleActive(route)}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            route.is_active
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {route.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(route)}
                            className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-emerald-600"
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(route.id)}
                            className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={14} />
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
      </div>
    </div>
  );
}
