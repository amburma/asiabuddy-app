const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../debug-output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'foodchat-debug.json');
const SCREENSHOT_DIR = path.join(OUTPUT_DIR, 'screenshots');

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function testWidget(widgetName, modalId, buttonText) {
  console.log(`\n=== Testing ${widgetName} ===`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const capturedData = {
    widget: widgetName,
    modalId: modalId,
    buttonText: buttonText,
    consoleMessages: [],
    pageErrors: [],
    failedRequests: [],
    networkRequests: [],
    success: false
  };

  // Capture console messages
  page.on('console', msg => {
    capturedData.consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location()
    });
  });

  // Capture uncaught exceptions
  page.on('pageerror', error => {
    capturedData.pageErrors.push({
      message: error.message,
      stack: error.stack
    });
  });

  // Capture ALL network requests
  page.on('request', request => {
    capturedData.networkRequests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType()
    });
  });

  // Capture failed requests
  page.on('requestfailed', request => {
    capturedData.failedRequests.push({
      url: request.url(),
      failure: request.failure()
    });
  });

  // Capture responses with status >= 400
  page.on('response', response => {
    if (response.status() >= 400) {
      capturedData.failedRequests.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText()
      });
    }
  });

  try {
    // Navigate to Thailand page
    await page.goto('http://localhost:3000/thailand', { waitUntil: 'networkidle' });
    console.log(`Navigated to Thailand page`);

    // Wait for Essential Guides section to load
    await page.waitForSelector('text=ESSENTIAL GUIDES', { timeout: 10000 });
    console.log(`Essential Guides section found`);

    // Find and click the button by text
    const button = page.locator(`button:has-text("${buttonText}")`).first();
    await button.click();
    console.log(`Clicked button: ${buttonText}`);

    // Wait for modal to appear and any lazy-loaded chunks to load
    await page.waitForTimeout(3000);
    console.log(`Waited 3 seconds for errors to surface`);

    // Take screenshot
    const screenshotPath = path.join(SCREENSHOT_DIR, `${widgetName}-modal.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to ${screenshotPath}`);
    capturedData.screenshot = screenshotPath;

    // Check if modal appeared using Playwright's isVisible() (accounts for CSS visibility)
    const modalVisible = await page.locator('div[role="dialog"]').isVisible().catch(() => false);
    capturedData.modalVisible = modalVisible;
    console.log(`Modal visible (role=dialog): ${modalVisible}`);
    
    // Check for actual GuideModal structure using isVisible()
    const guideModalLocator = page.locator('div.fixed.inset-0.z-\\[60\\]');
    const guideModalVisible = await guideModalLocator.isVisible().catch(() => false);
    capturedData.guideModalVisible = guideModalVisible;
    console.log(`GuideModal visible (fixed inset-0 z-[60]): ${guideModalVisible}`);

    // Check bounding box for actual dimensions
    const boundingBox = await guideModalLocator.boundingBox().catch(() => null);
    capturedData.modalBoundingBox = boundingBox;
    console.log(`Modal bounding box: ${JSON.stringify(boundingBox)}`);

    // Check computed styles
    const styles = await guideModalLocator.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        visibility: computed.visibility,
        opacity: computed.opacity,
        zIndex: computed.zIndex
      };
    }).catch(() => null);
    capturedData.modalStyles = styles;
    console.log(`Modal computed styles: ${JSON.stringify(styles)}`);

    // Check page content after click
    const pageContent = await page.content();
    capturedData.hasFoodGuide = pageContent.includes('Food Guide');
    capturedData.hasTransportGuide = pageContent.includes('Transport Guide');
    capturedData.hasAccommodationGuide = pageContent.includes('Accommodation Guide');
    capturedData.hasTravelTypes = pageContent.includes('Travel Styles');
    console.log(`Page contains Food Guide: ${capturedData.hasFoodGuide}`);
    console.log(`Page contains Transport Guide: ${capturedData.hasTransportGuide}`);
    console.log(`Page contains Accommodation Guide: ${capturedData.hasAccommodationGuide}`);
    console.log(`Page contains Travel Types: ${capturedData.hasTravelTypes}`);

    capturedData.success = true;
  } catch (error) {
    capturedData.pageErrors.push({
      message: error.message,
      stack: error.stack
    });
    console.error(`Error testing ${widgetName}:`, error.message);
  } finally {
    await browser.close();
  }

  return capturedData;
}

async function testMenuWidget(widgetName, buttonText) {
  console.log(`\n=== Testing ${widgetName} ===`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const capturedData = {
    widget: widgetName,
    buttonText: buttonText,
    consoleMessages: [],
    pageErrors: [],
    failedRequests: [],
    networkRequests: [],
    success: false
  };

  // Capture console messages
  page.on('console', msg => {
    capturedData.consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location()
    });
  });

  // Capture uncaught exceptions
  page.on('pageerror', error => {
    capturedData.pageErrors.push({
      message: error.message,
      stack: error.stack
    });
  });

  // Capture ALL network requests
  page.on('request', request => {
    capturedData.networkRequests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType()
    });
  });

  // Capture failed requests
  page.on('requestfailed', request => {
    capturedData.failedRequests.push({
      url: request.url(),
      failure: request.failure()
    });
  });

  // Capture responses with status >= 400
  page.on('response', response => {
    if (response.status() >= 400) {
      capturedData.failedRequests.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText()
      });
    }
  });

  try {
    // Navigate to Thailand page
    await page.goto('http://localhost:3000/thailand', { waitUntil: 'networkidle' });
    console.log(`Navigated to Thailand page`);

    // Open menu (look for menu button)
    const menuButton = page.locator('button:has-text("Menu")').first();
    await menuButton.click();
    console.log(`Opened menu`);
    await page.waitForTimeout(500);

    // Find and click the menu button by text
    const button = page.locator(`button:has-text("${buttonText}")`).first();
    await button.click();
    console.log(`Clicked menu button: ${buttonText}`);

    // Wait for modal to appear and any lazy-loaded chunks to load
    await page.waitForTimeout(3000);
    console.log(`Waited 3 seconds for errors to surface`);

    // Take screenshot
    const screenshotPath = path.join(SCREENSHOT_DIR, `${widgetName}-modal.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to ${screenshotPath}`);
    capturedData.screenshot = screenshotPath;

    // Check for actual GuideModal structure using isVisible()
    const guideModalLocator = page.locator('div.fixed.inset-0.z-\\[60\\]');
    const guideModalVisible = await guideModalLocator.isVisible().catch(() => false);
    capturedData.guideModalVisible = guideModalVisible;
    console.log(`GuideModal visible (fixed inset-0 z-[60]): ${guideModalVisible}`);

    // Check bounding box for actual dimensions
    const boundingBox = await guideModalLocator.boundingBox().catch(() => null);
    capturedData.modalBoundingBox = boundingBox;
    console.log(`Modal bounding box: ${JSON.stringify(boundingBox)}`);

    // Check computed styles
    const styles = await guideModalLocator.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        visibility: computed.visibility,
        opacity: computed.opacity,
        zIndex: computed.zIndex
      };
    }).catch(() => null);
    capturedData.modalStyles = styles;
    console.log(`Modal computed styles: ${JSON.stringify(styles)}`);

    // Check page content after click
    const pageContent = await page.content();
    capturedData.hasMedicalGuide = pageContent.includes('Medical Guide');
    capturedData.hasNightlifeGuide = pageContent.includes('Nightlife Guide');
    capturedData.hasShoppingGuide = pageContent.includes('Shopping Guide');
    capturedData.hasBooking = pageContent.includes('Booking');
    console.log(`Page contains Medical Guide: ${capturedData.hasMedicalGuide}`);
    console.log(`Page contains Nightlife Guide: ${capturedData.hasNightlifeGuide}`);
    console.log(`Page contains Shopping Guide: ${capturedData.hasShoppingGuide}`);
    console.log(`Page contains Booking: ${capturedData.hasBooking}`);

    capturedData.success = true;
  } catch (error) {
    capturedData.pageErrors.push({
      message: error.message,
      stack: error.stack
    });
    console.error(`Error testing ${widgetName}:`, error.message);
  } finally {
    await browser.close();
  }

  return capturedData;
}

async function runTests() {
  console.log('Starting chat widget debugging tests...');
  console.log('Make sure dev server is running at http://localhost:3000');

  const essentialGuidesWidgets = [
    { name: 'FoodChat', modalId: 'food', buttonText: 'Food & Dining' },
    { name: 'TransportChat', modalId: 'transport', buttonText: 'Transport' },
    { name: 'AccommodationChat', modalId: 'accommodation', buttonText: 'Accommodation' },
    { name: 'TripPlannerChat', modalId: 'travel-types', buttonText: 'Travel Types' },
    { name: 'PhrasesChat', modalId: 'phrases', buttonText: 'Essential Phrases' },
    { name: 'EtiquetteChat', modalId: 'etiquette', buttonText: 'Culture & Etiquette' },
    { name: 'BudgetChat', modalId: 'budget', buttonText: 'Budget Tips' },
    { name: 'VisaChat', modalId: 'visa', buttonText: 'Visa Info' },
    { name: 'InfoChat', modalId: 'information', buttonText: 'General Info' }
  ];

  const menuWidgets = [
    { name: 'MedicalChat', buttonText: 'Medical' },
    { name: 'NightlifeChat', buttonText: 'Nightlife' },
    { name: 'ShoppingChat', buttonText: 'Shopping' },
    { name: 'BookingChat', buttonText: 'Booking' },
    { name: 'ConciergeChat', buttonText: 'Concierge' },
    { name: 'HumanOperatorChat', buttonText: 'Human Operator' }
  ];

  const results = [];

  // Test FoodChat specifically first with detailed checks
  console.log('\n=== TESTING FOODCHAT SPECIFICALLY ===');
  const foodChatResult = await testWidget('FoodChat', 'food', 'Food & Dining');
  results.push(foodChatResult);

  // Test remaining EssentialGuides widgets
  console.log('\n=== TESTING REMAINING ESSENTIAL GUIDES WIDGETS ===');
  for (const widget of essentialGuidesWidgets.slice(1)) {
    const result = await testWidget(widget.name, widget.modalId, widget.buttonText);
    results.push(result);
  }

  // Test menu widgets
  console.log('\n=== TESTING MENU WIDGETS ===');
  for (const widget of menuWidgets) {
    const result = await testMenuWidget(widget.name, widget.buttonText);
    results.push(result);
  }

  // Write results to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`\nResults written to ${OUTPUT_FILE}`);

  // Print summary
  console.log('\n=== SUMMARY ===');
  results.forEach(result => {
    const status = result.success && result.pageErrors.length === 0 && result.failedRequests.length === 0 ? 'PASS' : 'FAIL';
    console.log(`${result.widget}: ${status}`);
    if (result.pageErrors.length > 0) {
      console.log(`  Page Errors: ${result.pageErrors.length}`);
      result.pageErrors.forEach(err => console.log(`    - ${err.message}`));
    }
    if (result.failedRequests.length > 0) {
      console.log(`  Failed Requests: ${result.failedRequests.length}`);
      result.failedRequests.forEach(req => console.log(`    - ${req.url} (${req.status || req.failure})`));
    }
    if (result.networkRequests.length > 0) {
      const apiRequests = result.networkRequests.filter(req => req.url.includes('api') || req.url.includes('webhook') || req.url.includes('telegram'));
      if (apiRequests.length > 0) {
        console.log(`  API/Webhook Requests: ${apiRequests.length}`);
        apiRequests.forEach(req => console.log(`    - ${req.method} ${req.url}`));
      }
    }
  });
}

runTests().catch(console.error);
