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
  console.log('\n=== Testing /thailand/flights - Aviasales Widget ===');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const result = {
    page: '/thailand/flights',
    widget: 'Aviasales',
    scriptLoaded: false,
    widgetInjected: false,
    originFieldFound: false,
    originFieldFocusable: false,
    originFieldEditable: false,
    screenshotPath: '',
    notes: ''
  };

  try {
    console.log('Navigating to http://localhost:3000/thailand/flights');
    await page.goto('http://localhost:3000/thailand/flights', { waitUntil: 'networkidle' });
    
    // Wait for the external script to load and inject the widget
    console.log('  ℹ Waiting for Aviasales script to load and inject widget...');
    await page.waitForTimeout(5000);

    // Check if the script was loaded
    const scriptLoaded = await page.evaluate(() => {
      return document.querySelector('script[src*="tpembd.com"]') !== null;
    });
    result.scriptLoaded = scriptLoaded;
    console.log(`  ${scriptLoaded ? '✓' : '✗'} Aviasales script loaded: ${scriptLoaded}`);

    // Check if widget container has children (widget injected)
    const widgetInjected = await page.evaluate(() => {
      const container = document.querySelector('div[class*="flex justify-center"]');
      return container && container.childElementCount > 0;
    });
    result.widgetInjected = widgetInjected;
    console.log(`  ${widgetInjected ? '✓' : '✗'} Widget injected into container: ${widgetInjected}`);

    // Look for Aviasales origin input field - the widget is in an iframe or shadow DOM
    // Try multiple selectors for the origin field
    const originSelectors = [
      'input[placeholder*="origin" i]',
      'input[placeholder*="from" i]',
      'input[name*="origin" i]',
      'input[data-test*="origin" i]',
      'input[type="text"]',
      'input[class*="input"]',
      'input[class*="field"]',
      // Try within iframes
      'iframe input[placeholder*="origin" i]',
      'iframe input[type="text"]'
    ];

    let originField = null;
    for (const selector of originSelectors) {
      try {
        const field = page.locator(selector).first();
        const count = await field.count();
        if (count > 0) {
          console.log(`  ✓ Found potential origin field with selector: ${selector}`);
          originField = field;
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    // Also try to find inputs within iframes
    if (!originField) {
      console.log('  ℹ Checking iframes for widget inputs...');
      const frames = page.frames();
      for (const frame of frames) {
        try {
          const inputs = await frame.locator('input[type="text"]').count();
          if (inputs > 0) {
            console.log(`  ✓ Found ${inputs} input(s) in iframe`);
            originField = frame.locator('input[type="text"]').first();
            break;
          }
        } catch (e) {
          // Continue
        }
      }
    }

    if (!originField) {
      result.notes = 'Origin field not found - widget may be in iframe/shadow DOM or not fully loaded';
      console.log(`  ✗ ${result.notes}`);
    } else {
      result.originFieldFound = true;

      // Test if focusable
      try {
        await originField.focus();
        await page.waitForTimeout(500);
        const isFocused = await originField.evaluate(el => document.activeElement === el);
        result.originFieldFocusable = isFocused;
        console.log(`  ${isFocused ? '✓' : '✗'} Origin field focusable: ${isFocused}`);
      } catch (e) {
        result.notes += ` Focus test failed: ${e.message}; `;
        console.log(`  ✗ Focus test failed: ${e.message}`);
      }

      // Test if editable
      try {
        await originField.fill('Bangkok');
        await page.waitForTimeout(500);
        const value = await originField.inputValue();
        result.originFieldEditable = value === 'Bangkok';
        console.log(`  ${result.originFieldEditable ? '✓' : '✗'} Origin field editable: ${result.originFieldEditable}`);
      } catch (e) {
        result.notes += ` Editable test failed: ${e.message}; `;
        console.log(`  ✗ Editable test failed: ${e.message}`);
      }
    }

    // Take screenshot
    const screenshotPath = path.join(screenshotsDir, 'flights-aviasales-test.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    result.screenshotPath = screenshotPath;
    console.log(`  ✓ Screenshot saved to ${screenshotPath}`);

  } catch (error) {
    result.notes = `Error during test: ${error.message}`;
    console.log(`  ✗ Error: ${error.message}`);
  } finally {
    await browser.close();
  }

  return result;
}

async function testHotelsPage() {
  console.log('\n=== Testing /thailand/hotels - AccommodationChat ===');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const result = {
    page: '/thailand/hotels',
    widget: 'AccommodationChat',
    chatWidgetFound: false,
    firstQuestionFound: false,
    firstQuestionClickable: false,
    screenshotPath: '',
    notes: ''
  };

  try {
    console.log('Navigating to http://localhost:3000/thailand/hotels');
    await page.goto('http://localhost:3000/thailand/hotels', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // AccommodationChat is rendered directly on the page, look for the chat widget container
    const chatWidgetSelectors = [
      'div[class*="flex flex-col h-"]',  // The chat widget has h-[480px]
      'div[class*="rounded-2xl overflow-hidden"]',
      '[class*="AccommodationChat"]',
      'div:has-text("Accommodation")'
    ];

    let chatWidget = null;
    for (const selector of chatWidgetSelectors) {
      try {
        const widget = page.locator(selector).first();
        const count = await widget.count();
        if (count > 0) {
          console.log(`  ✓ Found chat widget with selector: ${selector}`);
          chatWidget = widget;
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    if (!chatWidget) {
      result.notes = 'AccommodationChat widget not found on page';
      console.log(`  ✗ ${result.notes}`);
    } else {
      result.chatWidgetFound = true;
      console.log(`  ✓ Chat widget found`);

      // Scroll to the widget
      await chatWidget.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);

      // Look for first question/button in the chat - these are the option buttons
      // The chat shows options like city selection buttons
      const questionSelectors = [
        'button:has-text("Bangkok")',
        'button:has-text("Phuket")',
        'button:has-text("Pattaya")',
        'button:has-text("Chiang Mai")',
        'div[class*="grid"] button',  // Options are in a grid
        'button[class*="border"]'    // Option buttons have borders
      ];

      let firstQuestion = null;
      for (const selector of questionSelectors) {
        try {
          const q = page.locator(selector).first();
          const count = await q.count();
          if (count > 0) {
            console.log(`  ✓ Found first question button with selector: ${selector}`);
            firstQuestion = q;
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      if (!firstQuestion) {
        result.notes += ' First question button not found in chat; ';
        console.log(`  ✗ First question button not found`);
      } else {
        result.firstQuestionFound = true;

        // Test if clickable
        try {
          await firstQuestion.click();
          await page.waitForTimeout(1000);
          result.firstQuestionClickable = true;
          console.log(`  ✓ First question button clickable`);
        } catch (e) {
          result.notes += ` Click test failed: ${e.message}; `;
          console.log(`  ✗ Click test failed: ${e.message}`);
        }
      }
    }

    // Take screenshot
    const screenshotPath = path.join(screenshotsDir, 'hotels-accommodation-chat-test.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    result.screenshotPath = screenshotPath;
    console.log(`  ✓ Screenshot saved to ${screenshotPath}`);

  } catch (error) {
    result.notes = `Error during test: ${error.message}`;
    console.log(`  ✗ Error: ${error.message}`);
  } finally {
    await browser.close();
  }

  return result;
}

async function runTests() {
  console.log('\n=== Widget Interactivity Tests ===');
  console.log('Make sure the dev server is running on http://localhost:3000\n');

  const flightsResult = await testFlightsPage();
  const hotelsResult = await testHotelsPage();

  const results = [flightsResult, hotelsResult];

  // Save results to JSON
  const resultsPath = path.join(outputDir, 'widget-interactivity-test.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n✓ Results saved to ${resultsPath}`);

  // Print summary
  console.log('\n=== SUMMARY ===');
  console.log(`Flights Page (${flightsResult.page}):`);
  console.log(`  - Aviasales script loaded: ${flightsResult.scriptLoaded ? '✓' : '✗'}`);
  console.log(`  - Widget injected: ${flightsResult.widgetInjected ? '✓' : '✗'}`);
  console.log(`  - Origin field found: ${flightsResult.originFieldFound ? '✓' : '✗'}`);
  console.log(`  - Origin field focusable: ${flightsResult.originFieldFocusable ? '✓' : '✗'}`);
  console.log(`  - Origin field editable: ${flightsResult.originFieldEditable ? '✓' : '✗'}`);
  if (flightsResult.notes) console.log(`  - Notes: ${flightsResult.notes}`);

  console.log(`\nHotels Page (${hotelsResult.page}):`);
  console.log(`  - Chat widget found: ${hotelsResult.chatWidgetFound ? '✓' : '✗'}`);
  console.log(`  - First question button found: ${hotelsResult.firstQuestionFound ? '✓' : '✗'}`);
  console.log(`  - First question button clickable: ${hotelsResult.firstQuestionClickable ? '✓' : '✗'}`);
  if (hotelsResult.notes) console.log(`  - Notes: ${hotelsResult.notes}`);

  return results;
}

runTests().catch(console.error);
