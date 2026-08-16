import { supabaseAdmin } from './supabaseAdmin';
import { hashPassword } from './auth';

// Reusable function to create a package-tier Tour Guide account from a booking
export async function createTourGuideAccountForBooking(
  bookingId: string,
  tourDays: number,
  customerInfo: {
    customer_name?: string;
    customer_phone?: string;
    customer_email?: string;
  },
  adminId?: string
): Promise<{ success: boolean; accountId?: string; error?: string; username?: string; password?: string }> {
  try {
    // Generate username from customer name or booking ID
    const baseUsername = customerInfo.customer_name 
      ? customerInfo.customer_name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 12)
      : `booking_${bookingId.substring(0, 8)}`;
    
    // Generate a random password (admin can change it later)
    const randomPassword = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10).toUpperCase();
    
    const passwordHash = await hashPassword(randomPassword);
    
    // Calculate hours: tour_days × 2
    const totalHoursAllocated = tourDays * 2;
    
    // Prepare account data
    const accountData = {
      username: baseUsername,
      password_hash: passwordHash,
      source: 'package' as const,
      booking_id: bookingId,
      phone_or_whatsapp: customerInfo.customer_phone || null,
      total_hours_allocated: totalHoursAllocated,
      created_by_admin_id: adminId || null,
      status: 'active' as const,
    };
    
    // Insert account
    const { data: account, error: accountError } = await supabaseAdmin
      .from('tour_guide_accounts')
      .insert(accountData)
      .select('id')
      .single();
    
    if (accountError) {
      console.error('Error creating tour guide account for booking:', accountError);
      return { success: false, error: accountError.message };
    }
    
    // Insert into tour_guide_usage for package accounts
    const { error: usageError } = await supabaseAdmin
      .from('tour_guide_usage')
      .insert({
        account_id: account.id,
        total_cost_usd: 0,
        feature_breakdown: {},
        live_session_seconds: 0,
        status: 'active',
      });
    
    if (usageError) {
      console.error('Error creating usage record for booking account:', usageError);
      // Rollback account creation
      await supabaseAdmin
        .from('tour_guide_accounts')
        .delete()
        .eq('id', account.id);
      
      return { success: false, error: 'Failed to create usage record' };
    }
    
    console.log(`[AUTO_ACCOUNT] Created Tour Guide account ${account.id} for booking ${bookingId} with ${tourDays} tour days (${totalHoursAllocated} hours)`);
    console.log(`[AUTO_ACCOUNT] Credentials - Username: ${baseUsername}, Password: ${randomPassword}`);
    
    return { 
      success: true, 
      accountId: account.id,
      username: baseUsername,
      password: randomPassword
    };
    
  } catch (error) {
    console.error('Error in createTourGuideAccountForBooking:', error);
    return { success: false, error: 'Internal server error' };
  }
}
