// Test script to send silent/unclear audio to voice-translate endpoint
// This will help reproduce the hallucination issue

const fs = require('fs');
const http = require('http');

// Create a minimal valid base64 audio string (very short, essentially silent)
// This is a minimal valid webm header that represents silent/unclear audio
const silentAudioBase64 = 'GkXfo0AgQoaBAUL3gQ/9/6AQ=='; // Minimal webm header

const testData = {
  audio: silentAudioBase64,
  mimeType: 'audio/webm',
  targetLanguage: 'Burmese'
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/tour-guide/voice-translate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

function makeRequest() {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('=== Test 1: Silent audio ===');
  try {
    const result1 = await makeRequest();
    console.log('Status:', result1.statusCode);
    console.log('Response:', result1.body);
  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('\n=== Test 2: Silent audio ===');
  try {
    const result2 = await makeRequest();
    console.log('Status:', result2.statusCode);
    console.log('Response:', result2.body);
  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('\n=== Test 3: Silent audio ===');
  try {
    const result3 = await makeRequest();
    console.log('Status:', result3.statusCode);
    console.log('Response:', result3.body);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

runTests();
