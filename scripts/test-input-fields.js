const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Ensure debug-output directory exists
const outputDir = path.join(__dirname, '..', 'debug-output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const screenshotsDir = path.join(outputDir, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function testFlightsPage() {
  console.log('\n=== Testing /thailand/flights - Aviasales Origin Field ===');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const result = {
    page: '/thailand/flights',
    widgetLoaded: false,
    fieldFound: false,
    fieldFocusable: false,
    fieldEditable: false,
    screenshotPath: '',
    notes: ''
  };

  try {
    console.log('Navigating to http://localhost:3000/thailand/flights');
    await page.goto('http://localhost:3000/thailand/flights', { waitUntil: 'domcontentloaded' });
    
    // Wait for the Aviasales script to load and render
    console.log('  Waiting for Aviasales widget to load...');
    await page.waitForTimeout(5000);

    // Check if the script was injected
    const scriptLoaded = await page.evaluate(() => {
      return document.querySelector('script[src*="tpembd.com"]') !== null;
    });
    
    if (scriptLoaded) {
      result.widgetLoaded = true;
      console.log('  ✓ Aviasales script loaded');
    } else {
      result.notes = 'Aviasales script not loaded';
      console.log('  ✗ Aviasales script not loaded');
    }

    // The Aviasales widget likely renders in an iframe or shadow DOM
    // Try to find iframes first
    const frames = page.frames();
    console.log(`  Found ${frames.length} frames on page`);

    let originField = null;
    
    // Try to find input in main page first
    const mainPageSelectors = [
      'input[type="text"]',
      'input[placeholder]',
      'input',
    ];

    for (const selector of mainPageSelectors) {
      const fields = page.locator(selector);
      const count = await fields.count();
      if (count > 0) {
        console.log(`  Found ${count} input(s) with selector: ${selector}`);
        // Try each input to see if any are from the widget
        for (let i = 0; i < Math.min(count, 5); i++) {
          const field = fields.nth(i);
          try {
            const placeholder = await field.getAttribute('placeholder');
            const name = await field.getAttribute('name');
            console.log(`    Input ${i}: placeholder="${placeholder}", name="${name}"`);
            
            // Look for origin-related fields
            if (placeholder && (placeholder.toLowerCase().includes('origin') || placeholder.toLowerCase().includes('from') || placeholder.toLowerCase().includes('departure'))) {
              originField = field;
              result.fieldFound = true;
              console.log(`  ✓ Found origin field`);
              break;
            }
          } catch (e) {
            // Continue
          }
        }
        if (originField) break;
      }
    }

    // If not found in main page, try iframes
    if (!originField && frames.length > 1) {
      console.log('  Searching in iframes...');
      for (const frame of frames) {
        if (frame === page.mainFrame()) continue;
        try {
          const frameInputs = frame.locator('input[type="text"]');
          const count = await frameInputs.count();
          if (count > 0) {
            console.log(`  Found ${count} input(s) in iframe`);
            for (let i = 0; i < count; i++) {
              const field = frameInputs.nth(i);
              try {
                const placeholder = await field.getAttribute('placeholder');
                if (placeholder && (placeholder.toLowerCase().includes('origin') || placeholder.toLowerCase().includes('from'))) {
                  originField = field;
                  result.fieldFound = true;
                  console.log(`  ✓ Found origin field in iframe`);
                  break;
                }
              } catch (e) {
                // Continue
              }
            }
            if (originField) break;
          }
        } catch (e) {
          // Frame might not be accessible
        }
        if (originField) break;
      }
    }

    if (!originField) {
      result.notes = result.widgetLoaded 
        ? 'Widget loaded but origin field not found (likely in inaccessible iframe or shadow DOM)'
        : 'Widget script not loaded';
      console.log(`  ✗ ${result.notes}`);
      
      // Take screenshot for debugging
      const screenshotPath = path.join(screenshotsDir, 'flights-origin-not-found.png');
      await page.screenshot({ path: screenshotPath, fullPage: false });
      result.screenshotPath = screenshotPath;
      
      await browser.close();
      return result;
    }

    // Test if field is focusable
    try {
      await originField.focus();
      await page.waitForTimeout(500);
      const isFocused = await originField.evaluate(el => document.activeElement === el);
      
      if (isFocused) {
        result.fieldFocusable = true;
        console.log('  ✓ Field is focusable');
      } else {
        result.notes += 'Field found but not focusable. ';
        console.log('  ✗ Field not focusable');
      }
    } catch (e) {
      result.notes += `Error focusing field: ${e.message}. `;
      console.log(`  ✗ Error focusing: ${e.message}`);
    }

    // Test if field is editable by typing
    try {
      await originField.fill('Bangkok');
      await page.waitForTimeout(500);
      const value = await originField.inputValue();
      
      if (value === 'Bangkok') {
        result.fieldEditable = true;
        console.log('  ✓ Field is editable');
      } else {
        result.notes += `Field found but not editable (value: "${value}"). `;
        console.log(`  ✗ Field not editable (value: "${value}")`);
      }
    } catch (e) {
      result.notes += `Error typing in field: ${e.message}. `;
      console.log(`  ✗ Error typing: ${e.message}`);
    }

    // Take screenshot
    const screenshotPath = path.join(screenshotsDir, 'flights-origin-test.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    result.screenshotPath = screenshotPath;
    console.log('  ✓ Screenshot saved');

  } catch (error) {
    result.notes = `Error during test: ${error.message}`;
    console.log(`  ✗ Error: ${error.message}`);
  } finally {
    await browser.close();
  }

  return result;
}

async function testHotelsPage() {
  console.log('\n=== Testing /thailand/hotels - AccommodationChat First Question ===');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const result = {
    page: '/thailand/hotels',
    chatWidgetFound: false,
    questionFieldFound: false,
    questionFocusable: false,
    questionEditable: false,
    screenshotPath: '',
    notes: ''
  };

  try {
    console.log('Navigating to http://localhost:3000/thailand/hotels');
    await page.goto('http://localhost:3000/thailand/hotels', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    // The AccommodationChat widget is already rendered on the page (no trigger needed)
    // Look for the chat widget container
    const chatWidgetSelectors = [
      '[class*="AccommodationChat"]',
      'div[class*="chat"]',
      'div[class*="accommodation" i]',
    ];

    let chatWidget = null;
    for (const selector of chatWidgetSelectors) {
      const widget = page.locator(selector).first();
      const count = await widget.count();
      if (count > 0) {
        console.log(`  ✓ Found chat widget with selector: ${selector}`);
        chatWidget = widget;
        result.chatWidgetFound = true;
        break;
      }
    }

    if (!chatWidget) {
      result.notes = 'AccommodationChat widget not found on page';
      console.log(`  ✗ ${result.notes}`);
      
      // Take screenshot for debugging
      const screenshotPath = path.join(screenshotsDir, 'hotels-widget-not-found.png');
      await page.screenshot({ path: screenshotPath, fullPage: false });
      result.screenshotPath = screenshotPath;
      
      await browser.close();
      return result;
    }

    // Look for the first question input in the chat
    // The AccommodationChat uses input fields for short answer steps (nights, guests, checkin_date)
    // But the first question is "city" which uses option buttons, not text input
    // So we need to either:
    // 1. Click through to a text input step, OR
    // 2. Test the option buttons instead
    
    // Let's first check what the current question is
    const questionText = await page.locator('p.text-xs.font-serif').first().textContent();
    console.log(`  Current question: "${questionText}"`);

    // Look for option buttons (for city selection)
    const optionButtons = page.locator('button:has-text("Bangkok")');
    const optionCount = await optionButtons.count();
    
    if (optionCount > 0) {
      console.log(`  ✓ Found option buttons (city selection)`);
      result.questionFieldFound = true;
      
      // Test clicking an option button
      try {
        await optionButtons.first().click();
        await page.waitForTimeout(2000);
        console.log('  ✓ Option button clickable');
        
        // Now look for the next input (nights - which is a text input)
        const textInput = page.locator('input[type="text"]').first();
        const inputCount = await textInput.count();
        
        if (inputCount > 0) {
          result.questionFieldFound = true;
          console.log('  ✓ Found text input after selection');
          
          // Test if field is focusable
          try {
            await textInput.focus();
            await page.waitForTimeout(500);
            const isFocused = await textInput.evaluate(el => document.activeElement === el);
            
            if (isFocused) {
              result.questionFocusable = true;
              console.log('  ✓ Text input is focusable');
            } else {
              result.notes += 'Text input found but not focusable. ';
              console.log('  ✗ Text input not focusable');
            }
          } catch (e) {
            result.notes += `Error focusing text input: ${e.message}. `;
            console.log(`  ✗ Error focusing: ${e.message}`);
          }

          // Test if field is editable by typing
          try {
            await textInput.fill('3');
            await page.waitForTimeout(500);
            const value = await textInput.inputValue();
            
            if (value === '3') {
              result.questionEditable = true;
              console.log('  ✓ Text input is editable');
            } else {
              result.notes += `Text input found but not editable (value: "${value}"). `;
              console.log(`  ✗ Text input not editable (value: "${value}")`);
            }
          } catch (e) {
            result.notes += `Error typing in text input: ${e.message}. `;
            console.log(`  ✗ Error typing: ${e.message}`);
          }
        } else {
          result.notes = 'Option button clicked but no text input appeared';
          console.log(`  ✗ ${result.notes}`);
        }
      } catch (e) {
        result.notes = `Error clicking option button: ${e.message}`;
        console.log(`  ✗ Error clicking: ${e.message}`);
      }
    } else {
      // Try to find text input directly (might be on a different step)
      const textInputs = page.locator('input[type="text"]');
      const inputCount = await textInputs.count();
      
      if (inputCount > 0) {
        result.questionFieldFound = true;
        console.log(`  ✓ Found ${inputCount} text input(s)`);
        
        const textInput = textInputs.first();
        
        // Test if field is focusable
        try {
          await textInput.focus();
          await page.waitForTimeout(500);
          const isFocused = await textInput.evaluate(el => document.activeElement === el);
          
          if (isFocused) {
            result.questionFocusable = true;
            console.log('  ✓ Text input is focusable');
          } else {
            result.notes += 'Text input found but not focusable. ';
            console.log('  ✗ Text input not focusable');
          }
        } catch (e) {
          result.notes += `Error focusing text input: ${e.message}. `;
          console.log(`  ✗ Error focusing: ${e.message}`);
        }

        // Test if field is editable by typing
        try {
          await textInput.fill('3');
          await page.waitForTimeout(500);
          const value = await textInput.inputValue();
          
          if (value === '3') {
            result.questionEditable = true;
            console.log('  ✓ Text input is editable');
          } else {
            result.notes += `Text input found but not editable (value: "${value}"). `;
            console.log(`  ✗ Text input not editable (value: "${value}")`);
          }
        } catch (e) {
          result.notes += `Error typing in text input: ${e.message}. `;
          console.log(`  ✗ Error typing: ${e.message}`);
        }
      } else {
        result.notes = 'No option buttons or text inputs found in chat widget';
        console.log(`  ✗ ${result.notes}`);
      }
    }

    // Take screenshot
    const screenshotPath = path.join(screenshotsDir, 'hotels-question-test.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    result.screenshotPath = screenshotPath;
    console.log('  ✓ Screenshot saved');

  } catch (error) {
    result.notes = `Error during test: ${error.message}`;
    console.log(`  ✗ Error: ${error.message}`);
  } finally {
    await browser.close();
  }

  return result;
}

async function runTests() {
  console.log('=== Input Field Interactivity Tests ===');
  console.log('Make sure the dev server is running on http://localhost:3000\n');

  const flightsResult = await testFlightsPage();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const hotelsResult = await testHotelsPage();

  // Save results
  const results = {
    timestamp: new Date().toISOString(),
    flights: flightsResult,
    hotels: hotelsResult
  };

  const resultsPath = path.join(outputDir, 'input-field-tests.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n✓ Results saved to ${resultsPath}`);

  // Print summary
  console.log('\n=== SUMMARY ===');
  console.log(`Flights (/thailand/flights):`);
  console.log(`  - Widget loaded: ${flightsResult.widgetLoaded ? '✓' : '✗'}`);
  console.log(`  - Origin field found: ${flightsResult.fieldFound ? '✓' : '✗'}`);
  console.log(`  - Origin field focusable: ${flightsResult.fieldFocusable ? '✓' : '✗'}`);
  console.log(`  - Origin field editable: ${flightsResult.fieldEditable ? '✓' : '✗'}`);
  if (flightsResult.notes) console.log(`  - Notes: ${flightsResult.notes}`);
  
  console.log(`\nHotels (/thailand/hotels):`);
  console.log(`  - Chat widget found: ${hotelsResult.chatWidgetFound ? '✓' : '✗'}`);
  console.log(`  - Question field found: ${hotelsResult.questionFieldFound ? '✓' : '✗'}`);
  console.log(`  - Question field focusable: ${hotelsResult.questionFocusable ? '✓' : '✗'}`);
  console.log(`  - Question field editable: ${hotelsResult.questionEditable ? '✓' : '✗'}`);
  if (hotelsResult.notes) console.log(`  - Notes: ${hotelsResult.notes}`);

  return results;
}

runTests().catch(console.error);
