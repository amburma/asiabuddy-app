'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export const dynamic = 'force-dynamic';

const SERVICE_TYPES = ['tour', 'flight', 'hotel', 'airport_transfer', 'tickets_activities', 'car_rental'] as const;
const CURRENCIES = ['USD', 'THB', 'SGD', 'JPY', 'EUR', 'MMK'] as const;

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

export default function PaidInvoicePage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Form state
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [country, setCountry] = useState('Thailand');
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [serviceType, setServiceType] = useState<typeof SERVICE_TYPES[number]>('tour');
  const [currency, setCurrency] = useState<typeof CURRENCIES[number]>('USD');
  const [basePrice, setBasePrice] = useState('');
  const [serviceFee, setServiceFee] = useState('');
  const [vatAmount, setVatAmount] = useState('0');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [remarks, setRemarks] = useState('');

  // Flight details
  const [airline, setAirline] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [passengers, setPassengers] = useState<string>('');

  // Hotel details
  const [hotelName, setHotelName] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState<string>('');

  // Rental details
  const [rentalCountry, setRentalCountry] = useState('');
  const [rentalCity, setRentalCity] = useState('');
  const [bookingType, setBookingType] = useState<'airport_pickup' | 'drop_off' | 'full_day_tour' | 'half_day_tour' | 'package_tour'>('airport_pickup');
  const [flightNo, setFlightNo] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [pickupPlace, setPickupPlace] = useState('');
  const [noOfPersons, setNoOfPersons] = useState('');
  const [destinationPlace, setDestinationPlace] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [socialApp, setSocialApp] = useState<'whatsapp' | 'line' | 'wechat' | 'viber'>('whatsapp');

  // Generic description
  const [description, setDescription] = useState('');

  // Auth check
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const basePriceNum = parseFloat(basePrice);
      const serviceFeeNum = serviceFee ? parseFloat(serviceFee) : 0;
      const vatAmountNum = parseFloat(vatAmount) || 0;

      if (isNaN(basePriceNum)) {
        setSubmitError('Invalid base price value');
        setSubmitting(false);
        return;
      }

      // Build details object based on service_type
      let details: any = {};

      if (serviceType === 'flight') {
        const passengerList = passengers
          .split('\n')
          .map(p => p.trim())
          .filter(Boolean)
          .map(p => {
            const parts = p.split(',').map(s => s.trim());
            return { name: parts[0] || '', passport: parts[1] || '' };
          });

        details.flight = {
          airline: airline || undefined,
          flightNumber: flightNumber || undefined,
          departure: departure || undefined,
          arrival: arrival || undefined,
          date: flightDate || undefined,
          passengers: passengerList.length > 0 ? passengerList : undefined,
        };
      } else if (serviceType === 'hotel') {
        const guestList = guests
          .split('\n')
          .map(g => g.trim())
          .filter(Boolean)
          .map(g => ({ name: g }));

        details.hotel = {
          hotelName: hotelName || undefined,
          checkIn: checkIn || undefined,
          checkOut: checkOut || undefined,
          guests: guestList.length > 0 ? guestList : undefined,
        };
      } else if (serviceType === 'car_rental') {
        details.rental = {
          country: rentalCountry || undefined,
          city: rentalCity || undefined,
          booking_type: bookingType || undefined,
          flight_no: bookingType !== 'drop_off' ? (flightNo || undefined) : undefined,
          pickup_time: pickupTime || undefined,
          pickup_place: pickupPlace || undefined,
          no_of_persons: noOfPersons ? parseInt(noOfPersons, 10) : undefined,
          destination_place: destinationPlace || undefined,
          destination_address: destinationAddress || undefined,
          social_app: socialApp || undefined,
        };
      } else {
        details.description = description || undefined;
      }

      const payload = {
        invoice_date: invoiceDate,
        country,
        customer_name: customerName,
        customer_contact: customerContact,
        customer_email: customerEmail || undefined,
        service_type: serviceType,
        currency,
        base_price: basePriceNum,
        service_fee: serviceFeeNum,
        vat_amount: vatAmountNum,
        payment_method: paymentMethod,
        remarks: remarks || undefined,
        details,
      };

      const response = await fetch('/api/operator/paid-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || 'Failed to create invoice');
        return;
      }

      setSubmitSuccess(true);
      setInvoiceNo(data.invoice_no);
      setPdfUrl(data.pdf_url || '');

      // Reset form
      setCustomerName('');
      setCustomerContact('');
      setCustomerEmail('');
      setBasePrice('');
      setServiceFee('');
      setVatAmount('0');
      setPaymentMethod('');
      setRemarks('');
      setAirline('');
      setFlightNumber('');
      setDeparture('');
      setArrival('');
      setFlightDate('');
      setPassengers('');
      setHotelName('');
      setCheckIn('');
      setCheckOut('');
      setGuests('');
      setRentalCountry('');
      setRentalCity('');
      setBookingType('airport_pickup');
      setFlightNo('');
      setPickupTime('');
      setPickupPlace('');
      setNoOfPersons('');
      setDestinationPlace('');
      setDestinationAddress('');
      setSocialApp('whatsapp');
      setDescription('');
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
          <p className="text-sm text-gray-500 mb-6">Sign in to access paid invoice creation</p>

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
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Paid Invoice Creation</h1>
          <p className="text-sm text-gray-500">Create and issue paid invoices</p>
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

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">New Paid Invoice</h2>

          {submitSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
              <p className="text-emerald-800 font-medium">Invoice created successfully!</p>
              <p className="text-emerald-600 text-sm mt-1">Invoice No: {invoiceNo}</p>
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 text-sm underline mt-1 block"
                >
                  View PDF
                </a>
              )}
            </div>
          )}

          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-800 text-sm">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Invoice Date">
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={e => setInvoiceDate(e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>

              <Field label="Country">
                <input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Customer Name">
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>

              <Field label="Customer Contact">
                <input
                  type="text"
                  value={customerContact}
                  onChange={e => setCustomerContact(e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>
            </div>

            <Field label="Customer Email (Optional)">
              <input
                type="email"
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
                className={inputCls}
              />
            </Field>

            {/* Service Info */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Service Type">
                <select
                  value={serviceType}
                  onChange={e => setServiceType(e.target.value as typeof SERVICE_TYPES[number])}
                  className={inputCls}
                  required
                >
                  {SERVICE_TYPES.map(type => (
                    <option key={type} value={type}>
                      {type.replace('_', ' ').toUpperCase()}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Currency">
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value as typeof CURRENCIES[number])}
                  className={inputCls}
                  required
                >
                  {CURRENCIES.map(curr => (
                    <option key={curr} value={curr}>
                      {curr}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-3 gap-4">
              <Field label="Base Price">
                <input
                  type="number"
                  step="0.01"
                  value={basePrice}
                  onChange={e => setBasePrice(e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>

              <Field label="Service Fee (Optional)">
                <input
                  type="number"
                  step="0.01"
                  value={serviceFee}
                  onChange={e => setServiceFee(e.target.value)}
                  className={inputCls}
                />
              </Field>

              <Field label="VAT Amount (Optional)">
                <input
                  type="number"
                  step="0.01"
                  value={vatAmount}
                  onChange={e => setVatAmount(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="Payment Method">
              <input
                type="text"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                className={inputCls}
                required
              />
            </Field>

            {/* Conditional Details */}
            {serviceType === 'flight' && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Flight Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Airline">
                    <input
                      type="text"
                      value={airline}
                      onChange={e => setAirline(e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Flight Number">
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={e => setFlightNumber(e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Departure">
                    <input
                      type="text"
                      value={departure}
                      onChange={e => setDeparture(e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Arrival">
                    <input
                      type="text"
                      value={arrival}
                      onChange={e => setArrival(e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Flight Date">
                    <input
                      type="date"
                      value={flightDate}
                      onChange={e => setFlightDate(e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Passengers (One per line: Name, Passport)">
                  <textarea
                    value={passengers}
                    onChange={e => setPassengers(e.target.value)}
                    className={inputCls}
                    rows={3}
                    placeholder="John Doe, A1234567&#10;Jane Smith, B7654321"
                  />
                </Field>
              </div>
            )}

            {serviceType === 'hotel' && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Hotel Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Hotel Name">
                    <input
                      type="text"
                      value={hotelName}
                      onChange={e => setHotelName(e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Check-in Date">
                    <input
                      type="date"
                      value={checkIn}
                      onChange={e => setCheckIn(e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Check-out Date">
                    <input
                      type="date"
                      value={checkOut}
                      onChange={e => setCheckOut(e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Guests (One per line)">
                  <textarea
                    value={guests}
                    onChange={e => setGuests(e.target.value)}
                    className={inputCls}
                    rows={3}
                    placeholder="John Doe&#10;Jane Smith"
                  />
                </Field>
              </div>
            )}

            {serviceType === 'car_rental' && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Car Rental Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Country">
                    <input
                      type="text"
                      value={rentalCountry}
                      onChange={e => setRentalCountry(e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="City">
                    <input
                      type="text"
                      value={rentalCity}
                      onChange={e => setRentalCity(e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Booking Type">
                    <select
                      value={bookingType}
                      onChange={e => setBookingType(e.target.value as any)}
                      className={inputCls}
                    >
                      <option value="airport_pickup">Airport Pick-up (Airport → Hotel)</option>
                      <option value="drop_off">Drop-off (Hotel → Airport)</option>
                      <option value="full_day_tour">Full Day Tour</option>
                      <option value="half_day_tour">Half Day Tour</option>
                      <option value="package_tour">Package Tour</option>
                    </select>
                  </Field>

                  {bookingType !== 'drop_off' && (
                    <Field label="Flight No.">
                      <input
                        type="text"
                        value={flightNo}
                        onChange={e => setFlightNo(e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                  )}

                  <Field label="Pick-up Time">
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={e => setPickupTime(e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Pick-up Place">
                    <input
                      type="text"
                      value={pickupPlace}
                      onChange={e => setPickupPlace(e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="No. of Persons">
                    <input
                      type="number"
                      min="1"
                      value={noOfPersons}
                      onChange={e => setNoOfPersons(e.target.value)}
                      className={inputCls}
                      required
                    />
                  </Field>

                  <Field label="Destination (Drop-off Place)">
                    <input
                      type="text"
                      value={destinationPlace}
                      onChange={e => setDestinationPlace(e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Destination (Drop-off Place) Address">
                    <input
                      type="text"
                      value={destinationAddress}
                      onChange={e => setDestinationAddress(e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Using Social App">
                    <select
                      value={socialApp}
                      onChange={e => setSocialApp(e.target.value as any)}
                      className={inputCls}
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="line">LINE</option>
                      <option value="wechat">WeChat</option>
                      <option value="viber">Viber</option>
                    </select>
                  </Field>
                </div>
              </div>
            )}

            {serviceType !== 'flight' && serviceType !== 'hotel' && serviceType !== 'car_rental' && (
              <Field label="Service Description">
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className={inputCls}
                  rows={3}
                />
              </Field>
            )}

            <Field label="Remarks (Optional)">
              <textarea
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                className={inputCls}
                rows={2}
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-50"
            >
              {submitting ? 'Creating Invoice...' : 'Create Invoice'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
