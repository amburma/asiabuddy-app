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

// Widget definitions with their trigger selectors
// Based on actual UI: EssentialGuides has buttons, TravelToolbox has different buttons
const widgets = [
  {
    name: 'FoodChat',
    triggerSelector: 'button:has-text("Food & Dining")',
    modalSelector: '[class*="modal"]',
    triggerType: 'essential-guide',
    needsMenu: false
  },
  {
    name: 'TransportChat',
    triggerSelector: 'button:has-text("Transport")',
    modalSelector: '[class*="modal"]',
    triggerType: 'essential-guide',
    needsMenu: false
  },
  {
    name: 'AccommodationChat',
    triggerSelector: 'button:has-text("Accommodation")',
    modalSelector: '[class*="modal"]',
    triggerType: 'essential-guide',
    needsMenu: false
  },
  {
    name: 'TripPlannerChat',
    triggerSelector: 'button:has-text("Travel Types")',
    modalSelector: '[class*="modal"]',
    triggerType: 'essential-guide',
    needsMenu: false
  },
  {
    name: 'MedicalChat',
    triggerSelector: 'button:has-text("Medical")',
    modalSelector: '[class*="modal"]',
    triggerType: 'travel-toolbox',
    needsMenu: true,
    note: 'Button is in menu'
  },
  {
    name: 'NightlifeChat',
    triggerSelector: 'button:has-text("Nightlife")',
    modalSelector: '[class*="modal"]',
    triggerType: 'travel-toolbox',
    needsMenu: true,
    note: 'Button is in menu'
  },
  {
    name: 'ShoppingChat',
    triggerSelector: 'button:has-text("Shopping")',
    modalSelector: '[class*="modal"]',
    triggerType: 'travel-toolbox',
    needsMenu: true,
    note: 'Button is in menu'
  },
  {
    name: 'PhrasesChat',
    triggerSelector: 'button:has-text("Essential Phrases")',
    modalSelector: '[class*="modal"]',
    triggerType: 'travel-toolbox',
    needsMenu: true,
    note: 'Button is in menu'
  },
  {
    name: 'EtiquetteGuide',
    triggerSelector: 'button:has-text("Etiquette")',
    modalSelector: '[class*="modal"]',
    triggerType: 'travel-toolbox',
    needsMenu: true,
    note: 'Button is in menu'
  },
  {
    name: 'LawsGuide',
    triggerSelector: 'button:has-text("Key Laws")',
    modalSelector: '[class*="modal"]',
    triggerType: 'travel-toolbox',
    needsMenu: true,
    note: 'Button is in menu'
  },
  {
    name: 'InfoChat',
    triggerSelector: 'button:has-text("General Info")',
    modalSelector: '[class*="modal"]',
    triggerType: 'essential-guide',
    needsMenu: false
  },
  {
    name: 'VisaChat',
    triggerSelector: 'button:has-text("Visa Info")',
    modalSelector: '[class*="modal"]',
    triggerType: 'essential-guide',
    needsMenu: false
  },
  {
    name: 'BudgetChat',
    triggerSelector: 'button:has-text("Budget Tips")',
    modalSelector: '[class*="modal"]',
    triggerType: 'essential-guide',
    needsMenu: false
  },
  {
    name: 'ConciergeChat',
    triggerSelector: 'span:has-text("Concierge")',
    modalSelector: 'h2:has-text("Concierge")',
    triggerType: 'page-view',
    needsMenu: true,
    note: 'ConciergeChat view - span text in menu'
  },
  {
    name: 'HumanOperatorChat',
    triggerSelector: 'button:has-text("Book Now")',
    modalSelector: '[class*="modal"]',
    triggerType: 'book-now-button',
    needsMenu: false,
    needsScroll: true,
    note: 'Bottom of page, needs scroll'
  },
  {
    name: 'BookingChat',
    triggerSelector: 'button[id="menu-booking-btn"]',
    modalSelector: '[class*="modal"]',
    triggerType: 'travel-toolbox',
    needsMenu: true,
    note: 'Button has ID menu-booking-btn, needs to be clicked as button not span'
  }
];

async function testSingleWidget(widget) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const result = {
    name: widget.name,
    triggerFound: false,
    modalVisible: false,
    screenshotPath: '',
    consoleErrors: [],
    failedRequests: [],
    notes: widget.note || ''
  };

  // Capture console errors
  const consoleErrors = [];
  const consoleLogs = [];
  page.on('console', msg => {
    const logEntry = {
      type: msg.type(),
      text: msg.text()
    };
    consoleLogs.push(logEntry);
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Capture failed network requests
  const failedRequests = [];
  page.on('response', response => {
    if (response.status() >= 400) {
      failedRequests.push({
        url: response.url(),
        status: response.status()
      });
    }
  });

  try {
    console.log(`\nTesting ${widget.name}...`);
    console.log('Navigating to http://localhost:3000/thailand');
    await page.goto('http://localhost:3000/thailand', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000); // Wait for page to fully load

    // If widget needs menu, open it first
    if (widget.needsMenu) {
      console.log(`  ℹ Widget button is in menu, opening menu...`);
      // Look for menu button - try various selectors
      const menuButtons = [
        'button[id="menu-toggle"]',
        'button:has-text("Menu")',
        'svg:has(text="☰")',
        'button[aria-label="Menu"]',
        'button:nth-child(2)',  // Often second element in header
      ];
      
      let menuOpened = false;
      for (const menuSelector of menuButtons) {
        const menuBtn = page.locator(menuSelector).first();
        try {
          if (await menuBtn.count() > 0) {
            await menuBtn.click();
            await page.waitForTimeout(1000);
            menuOpened = true;
            console.log(`  ℹ Menu opened`);
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      
      if (!menuOpened) {
        result.notes = `Could not open menu to find trigger button`;
        console.log(`  ✗ ${result.notes}`);
        // Take screenshot anyway
        const screenshotPath = path.join(screenshotsDir, `${widget.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        result.screenshotPath = screenshotPath;
        return result;
      }
    }

    // For HumanOperatorChat, scroll to bottom first
    if (widget.needsScroll || widget.name === 'HumanOperatorChat') {
      console.log(`  ℹ Scrolling to find ${widget.name}...`);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
    }

    // Find trigger button
    const trigger = page.locator(widget.triggerSelector).first();
    let triggerCount = await trigger.count();
    
    // If trigger not found and selector targets span, try to find parent button
    if (triggerCount === 0 && widget.triggerSelector.includes('span')) {
      console.log(`  ℹ Direct selector not found, trying parent button approach...`);
      const spanText = widget.triggerSelector.match(/has-text\("([^"]+)"\)/)?.[1];
      if (spanText) {
        const parentBtn = page.locator(`button:has(span:has-text("${spanText}"))`).first();
        triggerCount = await parentBtn.count();
        if (triggerCount > 0) {
          console.log(`  ✓ Found parent button`);
          // Click parent instead
          await parentBtn.scrollIntoViewIfNeeded();
          await parentBtn.click();
          await page.waitForTimeout(3000);
          result.triggerFound = true;
        }
      }
    } else if (triggerCount === 0) {
      result.notes = `Trigger button not found with selector: ${widget.triggerSelector}`;
      console.log(`  ✗ ${result.notes}`);
    } else {
      result.triggerFound = true;
      console.log(`  ✓ Trigger found`);

      // Scroll to trigger and click
      await trigger.scrollIntoViewIfNeeded();
      await trigger.click();
      await page.waitForTimeout(3000); // Wait for modal to appear
    }

    // Only proceed with modal checking if trigger was found
    if (result.triggerFound) {
      // For page-view widgets like ConciergeChat, look for the content heading instead of modal
      if (widget.triggerType === 'page-view') {
        // Look for the concierge heading
        const heading = page.locator('h2:has-text("Concierge")').first();
        const headingCount = await heading.count();
        
        if (headingCount > 0) {
          const isVisible = await heading.isVisible();
          if (isVisible) {
            result.modalVisible = true;
            console.log(`  ✓ Page view visible with heading`);
          }
        }
      } else {
        // For modal-based widgets, try multiple modal selectors
        const modalSelectors = [
          '.fixed.inset-0',
          '[class*="modal"]',
          '[role="dialog"]',
          '[class*="GuideModal"]',
          'div[class*="fixed"][class*="inset-0"]',  // More generic
          '.fixed.inset-0.z-\\[60\\]',  // PhrasesChat/LawsGuide specific
          '[class*="z-\\[60\\]"]'  // Alternative for z-[60]
        ];
        
        let modalFound = false;
        let modalVisible = false;
        
        for (const selector of modalSelectors) {
          const modal = page.locator(selector).first();
          const modalCount = await modal.count();
          
          if (modalCount > 0) {
            modalFound = true;
            const isVisible = await modal.isVisible();
            if (isVisible) {
              modalVisible = true;
              console.log(`  ✓ Modal visible with selector: ${selector}`);
              break;
            }
          }
        }
        
        result.modalVisible = modalVisible;
        
        if (!modalVisible) {
          if (modalFound) {
            result.notes = 'Modal element found but not visible';
            console.log(`  ✗ Modal found but not visible`);
          } else {
            result.notes = 'No modal element found after clicking trigger';
            console.log(`  ✗ ${result.notes}`);
          }
        }
      }

      // Take screenshot
      const screenshotPath = path.join(screenshotsDir, `${widget.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      result.screenshotPath = screenshotPath;
      console.log(`  ✓ Screenshot saved`);

      // Capture console errors and logs for this widget
      result.consoleErrors = [...consoleErrors];
      result.failedRequests = [...failedRequests];
      result.consoleLogs = consoleLogs.slice(-5); // Last 5 console messages
    }

  } catch (error) {
    result.notes = `Error during test: ${error.message}`;
    console.log(`  ✗ Error: ${error.message}`);
  } finally {
    await browser.close();
  }

  return result;
}

async function verifyWidgets() {
  const results = [];

  for (const widget of widgets) {
    const result = await testSingleWidget(widget);
    results.push(result);
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Save results to JSON
  const resultsPath = path.join(outputDir, 'widget-verification.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n✓ Results saved to ${resultsPath}`);

  return results;
}

verifyWidgets().then(results => {
  console.log('\n=== SUMMARY ===');
  results.forEach(r => {
    console.log(`${r.name}: ${r.triggerFound ? '✓' : '✗'} trigger, ${r.modalVisible ? '✓' : '✗'} modal visible`);
  });
}).catch(console.error);
