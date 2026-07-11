// Test script to check each Gemini API key individually
const https = require('https');

// Load keys from environment (you'll need to set these manually)
const keys = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean);

async function testKey(key, index) {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      contents: [{
        parts: [{ text: "Hello" }]
      }]
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: `/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${key}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({
            keyIndex: index + 1,
            status: res.statusCode,
            success: res.statusCode === 200,
            error: response.error || null,
            response: response
          });
        } catch (e) {
          resolve({
            keyIndex: index + 1,
            status: res.statusCode,
            success: false,
            error: 'Parse error',
            rawBody: body
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({
        keyIndex: index + 1,
        status: 'ERROR',
        success: false,
        error: error.message
      });
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  console.log(`Testing ${keys.length} Gemini API keys...\n`);
  
  const results = await Promise.all(keys.map((key, index) => testKey(key, index)));
  
  results.forEach(result => {
    console.log(`Key ${result.keyIndex}:`);
    console.log(`  Status: ${result.status}`);
    console.log(`  Success: ${result.success}`);
    if (result.error) {
      console.log(`  Error: ${JSON.stringify(result.error, null, 2)}`);
    }
    console.log('');
  });
}

main().catch(console.error);
