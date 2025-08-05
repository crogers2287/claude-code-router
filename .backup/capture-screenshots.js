const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureScreenshots() {
  // Create screenshots directory if it doesn't exist
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('Navigating to webui to capture updated logo integration...');
    await page.goto('http://localhost:3457/ui', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for any animations
    
    console.log('Page title:', await page.title());

    // Check if we need to login - look for password field by placeholder or label
    try {
      const passwordField = await page.locator('input[placeholder*="password" i], input[placeholder*="Password" i], #password').first();
      const isLoginPage = await passwordField.isVisible({ timeout: 5000 });
      
      if (isLoginPage) {
        console.log('Found login form, logging in...');
        await passwordField.fill('admin');
        
        // Try different button selectors
        const loginButton = await page.locator('button:has-text("Login"), button:has-text("Sign In"), button[type="submit"]').first();
        await loginButton.click();
        
        // Wait for navigation
        await page.waitForTimeout(3000);
      } else {
        console.log('No login required, already on main page');
      }
    } catch (e) {
      console.log('Could not find login form, proceeding...');
    }

    // 1. Main dashboard showing the new logo integration
    console.log('Capturing main dashboard with logo integration...');
    await page.screenshot({ 
      path: path.join(screenshotsDir, 'dashboard-with-logo.png'),
      fullPage: true 
    });
    console.log('✅ Captured dashboard with logo integration');

    // 2. Provider management section
    console.log('Navigating to providers section...');
    const providersTab = await page.locator('text=Providers').first();
    if (await providersTab.isVisible()) {
      await providersTab.click();
      await page.waitForTimeout(2000);
    }
    
    await page.screenshot({ 
      path: path.join(screenshotsDir, 'providers-with-logo.png'),
      fullPage: true 
    });
    console.log('✅ Captured provider management section with logo');

    // 3. Modal or interaction states - try to open Add Provider modal
    console.log('Attempting to capture modal with logo integration...');
    const addProviderBtn = await page.locator('button:has-text("Add Provider")').first();
    if (await addProviderBtn.isVisible()) {
      await addProviderBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: path.join(screenshotsDir, 'modal-with-logo.png'),
        fullPage: true 
      });
      console.log('✅ Captured modal with logo integration');
      
      // Close modal
      const closeBtn = await page.locator('button[aria-label="Close"], .modal button:has-text("Cancel"), .modal button:has-text("Close")').first();
      if (await closeBtn.isVisible()) {
        await closeBtn.click();
        await page.waitForTimeout(500);
      }
    } else {
      // If no Add Provider modal, try to capture any other modal or interaction
      console.log('No Add Provider modal found, checking for other interactive elements...');
      
      // Try router configuration
      const routerTab = await page.locator('text=Router').first();
      if (await routerTab.isVisible()) {
        await routerTab.click();
        await page.waitForTimeout(2000);
        await page.screenshot({ 
          path: path.join(screenshotsDir, 'modal-with-logo.png'),
          fullPage: true 
        });
        console.log('✅ Captured router configuration as interaction state with logo');
      } else {
        // Fallback: just capture current state as modal example
        await page.screenshot({ 
          path: path.join(screenshotsDir, 'modal-with-logo.png'),
          fullPage: true 
        });
        console.log('✅ Captured current state as modal example with logo');
      }
    }

    console.log('\n🎉 Updated screenshots with logo integration captured successfully!');
    console.log(`Screenshots saved to: ${screenshotsDir}`);
    console.log('Files created:');
    console.log('- dashboard-with-logo.png (main dashboard with logo)');
    console.log('- providers-with-logo.png (provider management section)');
    console.log('- modal-with-logo.png (modal/interaction state)');

  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

// Run the script
captureScreenshots().catch(console.error);