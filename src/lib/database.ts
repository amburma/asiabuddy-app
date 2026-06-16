import { supabase } from '../config/supabase';

export interface User {
  telegram_id: number;
  username?: string;
  created_at: string;
}

export interface ChatHistory {
  id: number;
  telegram_id: number;
  role: 'user' | 'model';
  message_text: string;
  country: string;
  timestamp: string;
}

export interface Booking {
  id: string;
  telegram_id: number;
  tour_type: 'tour' | 'flight' | 'car' | 'taxi';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  details: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  booking_id: string;
  amount: number;
  status: 'unpaid' | 'paid';
  pdf_url?: string;
  created_at: string;
  updated_at: string;
}

// User CRUD operations
export async function createUser(telegramId: number, username?: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert({ telegram_id: telegramId, username })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error creating user:', error);
    return null;
  }
}

export async function getUser(telegramId: number): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegramId)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching user:', error);
    return null;
  }
}

export async function getOrCreateUser(telegramId: number, username?: string): Promise<User | null> {
  try {
    let user = await getUser(telegramId);
    
    if (!user) {
      user = await createUser(telegramId, username);
    }
    
    return user;
  } catch (error) {
    console.error('Unexpected error in getOrCreateUser:', error);
    return null;
  }
}

export async function updateUser(telegramId: number, username?: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ username })
      .eq('telegram_id', telegramId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error updating user:', error);
    return null;
  }
}

// Chat History CRUD operations
export async function addChatMessage(
  telegramId: number,
  role: 'user' | 'model',
  messageText: string,
  country: string = 'thailand',
  salespersonId?: string | null
): Promise<ChatHistory | null> {
  try {
    const insertData: any = {
      telegram_id: telegramId,
      role,
      message_text: messageText,
      country
    };

    if (salespersonId) {
      insertData.salesperson_id = salespersonId;
    }

    const { data, error } = await supabase
      .from('chat_histories')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error adding chat message:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error adding chat message:', error);
    return null;
  }
}

export async function getChatHistory(
  telegramId: number,
  limit: number = 50,
  country: string = 'thailand'
): Promise<ChatHistory[]> {
  try {
    const { data, error } = await supabase
      .from('chat_histories')
      .select('*')
      .eq('telegram_id', telegramId)
      .eq('country', country)
      .order('timestamp', { ascending: true })
      .order('id', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching chat history:', error);
    return [];
  }
}

export async function getRecentChatHistory(
  telegramId: number,
  limit: number = 10,
  country: string = 'thailand'
): Promise<ChatHistory[]> {
  try {
    const { data, error } = await supabase
      .from('chat_histories')
      .select('*')
      .eq('telegram_id', telegramId)
      .eq('country', country)
      .order('timestamp', { ascending: true })
      .order('id', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent chat history:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching recent chat history:', error);
    return [];
  }
}

export async function deleteChatHistory(telegramId: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('chat_histories')
      .delete()
      .eq('telegram_id', telegramId);

    if (error) {
      console.error('Error deleting chat history:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error deleting chat history:', error);
    return false;
  }
}

// User Metrics
export async function getUserMetrics(telegramId: number): Promise<{
  totalMessages: number;
  userMessages: number;
  modelMessages: number;
  firstMessageDate: string | null;
  lastMessageDate: string | null;
}> {
  try {
    const { data, error } = await supabase
      .from('chat_histories')
      .select('role, timestamp')
      .eq('telegram_id', telegramId);

    if (error) {
      console.error('Error fetching user metrics:', error);
      return {
        totalMessages: 0,
        userMessages: 0,
        modelMessages: 0,
        firstMessageDate: null,
        lastMessageDate: null,
      };
    }

    const messages = data || [];
    const userMessages = messages.filter((m) => m.role === 'user').length;
    const modelMessages = messages.filter((m) => m.role === 'model').length;
    const firstMessageDate = messages.length > 0 ? messages[0].timestamp : null;
    const lastMessageDate = messages.length > 0 ? messages[messages.length - 1].timestamp : null;

    return {
      totalMessages: messages.length,
      userMessages,
      modelMessages,
      firstMessageDate,
      lastMessageDate,
    };
  } catch (error) {
    console.error('Unexpected error fetching user metrics:', error);
    return {
      totalMessages: 0,
      userMessages: 0,
      modelMessages: 0,
      firstMessageDate: null,
      lastMessageDate: null,
    };
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all users:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching all users:', error);
    return [];
  }
}

// Booking CRUD operations
export async function createBooking(
  telegramId: number,
  tourType: 'tour' | 'flight' | 'car' | 'taxi',
  details: Record<string, any>,
  salespersonId?: string | null
): Promise<Booking | null> {
  try {
    const insertData: any = {
      telegram_id: telegramId,
      tour_type: tourType,
      status: 'pending',
      details
    };

    if (salespersonId) {
      insertData.salesperson_id = salespersonId;
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error creating booking:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error creating booking:', error);
    return null;
  }
}

export async function getBooking(bookingId: string): Promise<Booking | null> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (error) {
      console.error('Error fetching booking:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching booking:', error);
    return null;
  }
}

export async function getUserBookings(telegramId: number): Promise<Booking[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('telegram_id', telegramId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user bookings:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching user bookings:', error);
    return [];
  }
}

export async function updateBookingStatus(
  bookingId: string,
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
): Promise<Booking | null> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      console.error('Error updating booking status:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error updating booking status:', error);
    return null;
  }
}

// Invoice CRUD operations
export async function createInvoice(
  bookingId: string,
  amount: number,
  pdfUrl?: string
): Promise<Invoice | null> {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .insert({
        booking_id: bookingId,
        amount,
        status: 'unpaid',
        pdf_url: pdfUrl
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating invoice:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error creating invoice:', error);
    return null;
  }
}

export async function getInvoice(invoiceId: string): Promise<Invoice | null> {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .single();

    if (error) {
      console.error('Error fetching invoice:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching invoice:', error);
    return null;
  }
}

export async function getBookingInvoices(bookingId: string): Promise<Invoice[]> {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('booking_id', bookingId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching booking invoices:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching booking invoices:', error);
    return [];
  }
}

export async function updateInvoiceStatus(
  invoiceId: string,
  status: 'unpaid' | 'paid'
): Promise<Invoice | null> {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .update({ status })
      .eq('id', invoiceId)
      .select()
      .single();

    if (error) {
      console.error('Error updating invoice status:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error updating invoice status:', error);
    return null;
  }
}
