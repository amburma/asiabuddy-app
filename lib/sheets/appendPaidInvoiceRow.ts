import { google } from 'googleapis';

// ==========================================
// Types (matching paid_invoices table shape)
// ==========================================
interface PaidInvoiceData {
  invoice_no: string;
  invoice_date: string;
  country: string;
  customer_name: string;
  customer_contact: string;
  customer_email?: string;
  service_type: string;
  currency: string;
  base_price: number;
  service_fee: number;
  vat_amount: number;
  total_amount: number;
  payment_method: string;
  issued_by: string;
  remarks?: string;
}

interface SuccessResult {
  success: true;
}

interface FailureResult {
  success: false;
  error: string;
}

type AppendResult = SuccessResult | FailureResult;

// ==========================================
// Initialize Google Sheets client with Service Account credentials
// ==========================================
function initializeSheetsClient() {
  const rawEnv = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!rawEnv) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set');
  }

  let credentials;
  try {
    // Check if it's Base64 encoded (does not start with typical curly brace JSON token)
    if (!rawEnv.trim().startsWith('{')) {
      const decodedString = Buffer.from(rawEnv.trim(), 'base64').toString('utf8');
      credentials = JSON.parse(decodedString);
    } else {
      credentials = JSON.parse(rawEnv);
    }
  } catch (e) {
    throw new Error('Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON');
  }

  // Create JWT auth client with spreadsheets write scope
  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

// ==========================================
// Append Paid Invoice Row to Google Sheets
// ==========================================
export async function appendPaidInvoiceRow(data: PaidInvoiceData): Promise<AppendResult> {
  try {
    const sheets = initializeSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      return { success: false, error: 'GOOGLE_SHEET_ID environment variable is not set' };
    }

    // Format date for display
    const formattedDate = new Date(data.invoice_date).toLocaleDateString('en-US');

    // Build row in exact column order:
    // Invoice No | Date | Country | Customer Name | Contact | Email | Service Type | Currency | Base Price | Service Fee | VAT | Total | Payment Method | Issued By | Remarks
    const row = [
      data.invoice_no,
      formattedDate,
      data.country,
      data.customer_name,
      data.customer_contact,
      data.customer_email || '',
      data.service_type,
      data.currency,
      data.base_price,
      data.service_fee,
      data.vat_amount,
      data.total_amount,
      data.payment_method,
      data.issued_by,
      data.remarks || '',
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:O', // Columns A through O (15 columns)
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error appending paid invoice row to Google Sheets:', error);
    return { success: false, error: errorMessage };
  }
}
