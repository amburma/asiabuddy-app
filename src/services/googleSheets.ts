import { google } from 'googleapis';

// Initialize Google Sheets client with Service Account credentials
let sheetsClient: any = null;
let driveClient: any = null;

/**
 * Initialize Google Sheets client with Service Account credentials
 */
function initializeSheetsClient() {
  try {
    if (sheetsClient) {
      return sheetsClient;
    }

    // Parse Service Account JSON from environment variable with Base64 support
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
      console.error('Critical: Absolutely unable to resolve Service Account credentials format.');
      throw e;
    }

    // Create JWT auth client with both Drive and Sheets scopes
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/spreadsheets.readonly'
      ]
    });

    // Initialize Sheets client
    sheetsClient = google.sheets({ version: 'v4', auth });

    return sheetsClient;
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw error;
  }
}

/**
 * Find a folder by name in Google Drive
 * @param folderName - Name of the folder to find
 * @param parentFolderId - Optional parent folder ID to search within
 * @returns Folder ID or null if not found
 */
async function findFolderByName(folderName: string, parentFolderId?: string): Promise<string | null> {
  try {
    const drive = google.drive({ version: 'v3', auth: initializeSheetsClient() });

    const query = parentFolderId
      ? `name='${folderName}' and '${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`
      : `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;

    const response = await drive.files.list({
      q: query,
      fields: 'files(id, name)',
      pageSize: 1,
    });

    const files = response.data.files;
    if (files && files.length > 0 && files[0].id) {
      return files[0].id;
    }

    return null;
  } catch (error) {
    console.error(`Error finding folder '${folderName}':`, error);
    return null;
  }
}

/**
 * Get all Google Sheets files in a folder
 * @param folderId - Google Drive folder ID
 * @returns Array of sheet file info (id, name)
 */
async function getSheetsInFolder(folderId: string): Promise<Array<{ id: string; name: string }>> {
  try {
    const drive = google.drive({ version: 'v3', auth: initializeSheetsClient() });

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
      fields: 'files(id, name)',
    });

    return (response.data.files || []).filter(file => file.id && file.name).map(file => ({
      id: file.id!,
      name: file.name!
    }));
  } catch (error) {
    console.error('Error getting sheets in folder:', error);
    return [];
  }
}

/**
 * Read all data from a Google Sheet
 * @param spreadsheetId - Google Sheets spreadsheet ID
 * @returns Array of rows (each row is an array of cell values)
 */
async function readSheetData(spreadsheetId: string): Promise<any[][]> {
  try {
    const sheets = initializeSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A:Z', // Read columns A through Z
      valueRenderOption: 'UNFORMATTED_VALUE',
      dateTimeRenderOption: 'FORMATTED_STRING',
    });

    return response.data.values || [];
  } catch (error) {
    console.error(`Error reading sheet ${spreadsheetId}:`, error);
    return [];
  }
}

/**
 * Get pricing data from the Thailand Pricing folder
 * This function:
 * 1. Finds the Thailand folder
 * 2. Finds the Pricing subfolder
 * 3. Reads all 6 pricing sheets
 * @returns Object with sheet names as keys and their data as values
 */
export async function getThailandPricingData(): Promise<Record<string, any[][]>> {
  try {
    console.log('Fetching Thailand pricing data from Google Drive...');

    // Get Thailand folder ID from environment or find by name
    let thailandFolderId: string | null = process.env.GOOGLE_DRIVE_FOLDER_ID_THAILAND || null;
    
    if (!thailandFolderId) {
      // Try to find folder by name if ID not provided
      thailandFolderId = await findFolderByName('Thailand');
      if (!thailandFolderId) {
        throw new Error('Thailand folder not found. Please set GOOGLE_DRIVE_FOLDER_ID_THAILAND environment variable.');
      }
    }

    console.log(`Thailand folder ID: ${thailandFolderId}`);

    // Find Pricing subfolder
    const pricingFolderId = await findFolderByName('Pricing', thailandFolderId);
    if (!pricingFolderId) {
      throw new Error('Pricing folder not found in Thailand folder');
    }

    console.log(`Pricing folder ID: ${pricingFolderId}`);

    // Get all sheets in Pricing folder
    const sheets = await getSheetsInFolder(pricingFolderId);
    console.log(`Found ${sheets.length} sheets in Pricing folder`);

    if (sheets.length === 0) {
      console.warn('No sheets found in Pricing folder');
      return {};
    }

    // Read data from all sheets
    const pricingData: Record<string, any[][]> = {};
    for (const sheet of sheets) {
      console.log(`Reading sheet: ${sheet.name}`);
      const data = await readSheetData(sheet.id);
      pricingData[sheet.name] = data;
      console.log(`  - Read ${data.length} rows from ${sheet.name}`);
    }

    console.log('Successfully fetched all pricing data');
    return pricingData;
  } catch (error) {
    console.error('Error getting Thailand pricing data:', error);
    throw error;
  }
}

/**
 * Format pricing data for Gemini AI context
 * Converts raw sheet data into a readable text format
 * @param pricingData - Raw pricing data from sheets
 * @returns Formatted text string for AI context
 */
export function formatPricingDataForAI(pricingData: Record<string, any[][]>): string {
  let formattedText = 'THAILAND PRICING DATA:\n\n';

  for (const [sheetName, rows] of Object.entries(pricingData)) {
    if (rows.length === 0) continue;

    formattedText += `=== ${sheetName.toUpperCase()} ===\n`;

    // Use first row as headers
    const headers = rows[0];
    formattedText += `Headers: ${headers.join(' | ')}\n\n`;

    // Add data rows (limit to first 20 rows to avoid token limits)
    const dataRows = rows.slice(1, 21);
    for (const row of dataRows) {
      if (row.length > 0) {
        formattedText += `${row.join(' | ')}\n`;
      }
    }

    if (rows.length > 21) {
      formattedText += `... and ${rows.length - 21} more rows\n`;
    }

    formattedText += '\n';
  }

  return formattedText;
}

/**
 * Get formatted pricing data ready for Gemini AI
 * This is a convenience function that combines fetching and formatting
 * @returns Formatted pricing data text
 */
export async function getPricingDataForAI(): Promise<string> {
  try {
    const pricingData = await getThailandPricingData();
    return formatPricingDataForAI(pricingData);
  } catch (error) {
    console.error('Error getting pricing data for AI:', error);
    return 'Pricing data is currently unavailable. Please try again later.';
  }
}

/**
 * Get all Google Docs files in a folder
 * @param folderId - Google Drive folder ID
 * @returns Array of doc file info (id, name)
 */
async function getDocsInFolder(folderId: string): Promise<Array<{ id: string; name: string }>> {
  try {
    const drive = google.drive({ version: 'v3', auth: initializeSheetsClient() });

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.document' and trashed=false`,
      fields: 'files(id, name)',
    });

    return (response.data.files || []).filter(file => file.id && file.name).map(file => ({
      id: file.id!,
      name: file.name!
    }));
  } catch (error) {
    console.error('Error getting docs in folder:', error);
    return [];
  }
}

/**
 * Read content from a Google Doc
 * @param docId - Google Docs document ID
 * @returns Document text content
 */
async function readGoogleDoc(docId: string): Promise<string> {
  try {
    const drive = google.drive({ version: 'v3', auth: initializeSheetsClient() });

    // Export doc as plain text
    const response = await drive.files.export({
      fileId: docId,
      mimeType: 'text/plain',
    });

    return response.data as string;
  } catch (error) {
    console.error(`Error reading Google Doc ${docId}:`, error);
    return '';
  }
}

/**
 * Get all PDF files in a folder
 * @param folderId - Google Drive folder ID
 * @returns Array of PDF file info (id, name)
 */
async function getPdfFilesInFolder(folderId: string): Promise<Array<{ id: string; name: string }>> {
  try {
    const drive = google.drive({ version: 'v3', auth: initializeSheetsClient() });

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType='application/pdf' and trashed=false`,
      fields: 'files(id, name)',
    });

    return (response.data.files || []).filter(file => file.id && file.name).map(file => ({
      id: file.id!,
      name: file.name!
    }));
  } catch (error) {
    console.error('Error getting PDF files in folder:', error);
    return [];
  }
}

/**
 * Download and read a PDF file from Google Drive
 * @param fileId - Google Drive file ID
 * @returns PDF file buffer
 */
async function downloadPdfFile(fileId: string): Promise<Buffer> {
  try {
    const drive = google.drive({ version: 'v3', auth: initializeSheetsClient() });

    const response = await drive.files.get({
      fileId: fileId,
      alt: 'media',
    }, { responseType: 'arraybuffer' });

    return Buffer.from(response.data as ArrayBuffer);
  } catch (error) {
    console.error(`Error downloading PDF file ${fileId}:`, error);
    return Buffer.alloc(0);
  }
}

/**
 * Get tour itinerary data from the Thailand Tours folder
 * This function:
 * 1. Finds the Thailand folder
 * 2. Finds the Tours subfolder
 * 3. Reads all Google Docs with tour itineraries
 * @returns Object with doc names as keys and their content as values
 */
export async function getThailandTourData(): Promise<Record<string, string>> {
  try {
    console.log('Fetching Thailand tour data from Google Drive...');

    // Get Thailand folder ID from environment or find by name
    let thailandFolderId: string | null = process.env.GOOGLE_DRIVE_FOLDER_ID_THAILAND || null;
    
    if (!thailandFolderId) {
      thailandFolderId = await findFolderByName('Thailand');
      if (!thailandFolderId) {
        throw new Error('Thailand folder not found. Please set GOOGLE_DRIVE_FOLDER_ID_THAILAND environment variable.');
      }
    }

    console.log(`Thailand folder ID: ${thailandFolderId}`);

    // Find Tours subfolder
    const toursFolderId = await findFolderByName('Tours', thailandFolderId);
    if (!toursFolderId) {
      console.warn('Tours folder not found in Thailand folder');
      return {};
    }

    console.log(`Tours folder ID: ${toursFolderId}`);

    // Get all docs in Tours folder
    const docs = await getDocsInFolder(toursFolderId);
    console.log(`Found ${docs.length} tour documents in Tours folder`);

    if (docs.length === 0) {
      console.warn('No tour documents found in Tours folder');
      return {};
    }

    // Read content from all docs
    const tourData: Record<string, string> = {};
    for (const doc of docs) {
      console.log(`Reading tour document: ${doc.name}`);
      const content = await readGoogleDoc(doc.id);
      tourData[doc.name] = content;
      console.log(`  - Read ${content.length} characters from ${doc.name}`);
    }

    console.log('Successfully fetched all tour data');
    return tourData;
  } catch (error) {
    console.error('Error getting Thailand tour data:', error);
    throw error;
  }
}

/**
 * Get policy data from the Thailand Policies folder
 * This function:
 * 1. Finds the Thailand folder
 * 2. Finds the Policies subfolder
 * 3. Reads all PDF files with policy documents
 * @returns Object with PDF names as keys and their extracted text as values
 */
export async function getThailandPolicyData(): Promise<Record<string, string>> {
  try {
    console.log('Fetching Thailand policy data from Google Drive...');

    // Get Thailand folder ID from environment or find by name
    let thailandFolderId: string | null = process.env.GOOGLE_DRIVE_FOLDER_ID_THAILAND || null;
    
    if (!thailandFolderId) {
      thailandFolderId = await findFolderByName('Thailand');
      if (!thailandFolderId) {
        throw new Error('Thailand folder not found. Please set GOOGLE_DRIVE_FOLDER_ID_THAILAND environment variable.');
      }
    }

    console.log(`Thailand folder ID: ${thailandFolderId}`);

    // Find Policies subfolder
    const policiesFolderId = await findFolderByName('Policies', thailandFolderId);
    if (!policiesFolderId) {
      console.warn('Policies folder not found in Thailand folder');
      return {};
    }

    console.log(`Policies folder ID: ${policiesFolderId}`);

    // Get all PDFs in Policies folder
    const pdfs = await getPdfFilesInFolder(policiesFolderId);
    console.log(`Found ${pdfs.length} PDF files in Policies folder`);

    if (pdfs.length === 0) {
      console.warn('No PDF files found in Policies folder');
      return {};
    }

    // Download and extract text from all PDFs
    const policyData: Record<string, string> = {};
    
    // Dynamically import pdf-parse to avoid requiring it if not used
    let pdfParse: any;
    try {
      pdfParse = await import('pdf-parse');
    } catch (error) {
      console.error('pdf-parse package not found. Please install it with: npm install pdf-parse');
      throw new Error('pdf-parse package is required for reading PDF files');
    }

    for (const pdf of pdfs) {
      console.log(`Processing PDF: ${pdf.name}`);
      const buffer = await downloadPdfFile(pdf.id);
      
      if (buffer.length > 0) {
        try {
          const data = await pdfParse(buffer);
          policyData[pdf.name] = data.text;
          console.log(`  - Extracted ${data.text.length} characters from ${pdf.name}`);
        } catch (error) {
          console.error(`  - Error parsing PDF ${pdf.name}:`, error);
          policyData[pdf.name] = '';
        }
      }
    }

    console.log('Successfully fetched all policy data');
    return policyData;
  } catch (error) {
    console.error('Error getting Thailand policy data:', error);
    throw error;
  }
}

/**
 * Format tour data for Gemini AI context
 * Converts raw tour doc data into a readable text format
 * @param tourData - Raw tour data from Google Docs
 * @returns Formatted text string for AI context
 */
export function formatTourDataForAI(tourData: Record<string, string>): string {
  let formattedText = 'THAILAND TOUR ITINERARIES:\n\n';

  for (const [docName, content] of Object.entries(tourData)) {
    if (!content) continue;

    formattedText += `=== ${docName.toUpperCase()} ===\n`;
    
    // Limit content to first 3000 characters to avoid token limits
    const truncatedContent = content.length > 3000 
      ? content.substring(0, 3000) + '\n... (content truncated)'
      : content;
    
    formattedText += `${truncatedContent}\n\n`;
  }

  return formattedText;
}

/**
 * Format policy data for Gemini AI context
 * Converts raw policy PDF data into a readable text format
 * @param policyData - Raw policy data from PDFs
 * @returns Formatted text string for AI context
 */
export function formatPolicyDataForAI(policyData: Record<string, string>): string {
  let formattedText = 'THAILAND POLICIES AND CANCELLATION RULES:\n\n';

  for (const [pdfName, content] of Object.entries(policyData)) {
    if (!content) continue;

    formattedText += `=== ${pdfName.toUpperCase()} ===\n`;
    
    // Limit content to first 3000 characters to avoid token limits
    const truncatedContent = content.length > 3000 
      ? content.substring(0, 3000) + '\n... (content truncated)'
      : content;
    
    formattedText += `${truncatedContent}\n\n`;
  }

  return formattedText;
}

/**
 * Get formatted tour data ready for Gemini AI
 * This is a convenience function that combines fetching and formatting
 * @returns Formatted tour data text
 */
export async function getTourDataForAI(): Promise<string> {
  try {
    const tourData = await getThailandTourData();
    return formatTourDataForAI(tourData);
  } catch (error) {
    console.error('Error getting tour data for AI:', error);
    return 'Tour data is currently unavailable. Please try again later.';
  }
}

/**
 * Get formatted policy data ready for Gemini AI
 * This is a convenience function that combines fetching and formatting
 * @returns Formatted policy data text
 */
export async function getPolicyDataForAI(): Promise<string> {
  try {
    const policyData = await getThailandPolicyData();
    return formatPolicyDataForAI(policyData);
  } catch (error) {
    console.error('Error getting policy data for AI:', error);
    return 'Policy data is currently unavailable. Please try again later.';
  }
}
