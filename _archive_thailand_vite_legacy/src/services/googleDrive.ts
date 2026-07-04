import { google } from 'googleapis';
import { Readable } from 'stream';

// Initialize Google Drive client with Service Account credentials
let driveClient: any = null;

/**
 * Initialize Google Drive client with Service Account credentials
 */
function initializeDriveClient() {
  try {
    if (driveClient) {
      return driveClient;
    }

    // Parse Service Account JSON from environment variable
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJson) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set');
    }

    const credentials = JSON.parse(serviceAccountJson);

    // Create JWT auth client
    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ['https://www.googleapis.com/auth/drive']
    );

    // Initialize Drive client
    driveClient = google.drive({ version: 'v3', auth });

    return driveClient;
  } catch (error) {
    console.error('Error initializing Google Drive client:', error);
    throw error;
  }
}

/**
 * Upload a file from Telegram to Google Drive
 * @param fileStreamOrBuffer - File stream or buffer from Telegram
 * @param fileName - Name of the file to upload
 * @param mimeType - MIME type of the file
 * @param country - Country code for selecting the appropriate folder (default: 'thailand')
 * @returns Google Drive File ID or Web View Link, or null on failure
 */
export async function uploadTelegramFileToDrive(
  fileStreamOrBuffer: Buffer | Readable,
  fileName: string,
  mimeType: string,
  country: string = 'thailand'
): Promise<string | null> {
  try {
    // Initialize Drive client
    const drive = initializeDriveClient();

    // Get the target folder ID based on country
    // Environment variables: GOOGLE_DRIVE_FOLDER_ID_THAILAND, GOOGLE_DRIVE_FOLDER_ID_MYANMAR, etc.
    const folderIdEnvVar = `GOOGLE_DRIVE_FOLDER_ID_${country.toUpperCase()}`;
    const folderId = process.env[folderIdEnvVar] || process.env.GOOGLE_DRIVE_FOLDER_ID;
    
    if (!folderId) {
      throw new Error(`Neither ${folderIdEnvVar} nor GOOGLE_DRIVE_FOLDER_ID environment variable is set`);
    }

    // Prepare file metadata
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    // Prepare media object
    const media = {
      mimeType: mimeType,
      body: fileStreamOrBuffer,
    };

    // Upload file to Google Drive
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    const fileId = response.data.id;
    const webViewLink = response.data.webViewLink;

    console.log(`File uploaded successfully to Google Drive. File ID: ${fileId}`);

    // Return webViewLink if available, otherwise return fileId
    return webViewLink || fileId || null;
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    
    // Return null on failure to prevent program crash
    return null;
  }
}

/**
 * Get a public shareable link for a Google Drive file
 * @param fileId - Google Drive File ID
 * @returns Public shareable link or null on failure
 */
export async function getPublicFileLink(fileId: string): Promise<string | null> {
  try {
    const drive = initializeDriveClient();

    // Set file permissions to public
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Get file details with webViewLink
    const response = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink',
    });

    return response.data.webViewLink || null;
  } catch (error) {
    console.error('Error getting public file link:', error);
    return null;
  }
}
