import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.resolve('screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function capture() {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--disable-gpu', '--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 2, // High-DPI crisp screenshots
  });

  const page = await context.newPage();
  const baseUrl = 'http://127.0.0.1:5173';

  // 1. Hero Landing Page
  console.log('1. Capturing Hero Landing Page...');
  await page.goto(`${baseUrl}/#/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '01_hero_landing_page.png'),
    clip: { x: 0, y: 0, width: 1440, height: 960 }
  });

  // 2. Demonstration Impact Metrics
  console.log('2. Capturing Community Safety Pulse Metrics...');
  const pulseEl = page.locator('text=Community Safety Pulse').first();
  if (await pulseEl.isVisible()) {
    await pulseEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  } else {
    await page.evaluate(() => window.scrollBy(0, 520));
  }
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '02_community_safety_pulse_metrics.png'),
    clip: { x: 0, y: 380, width: 1440, height: 600 }
  });

  // 3. Core Civic Value Pillars
  console.log('3. Capturing Core Civic Value Pillars...');
  const pillarsEl = page.locator('text=How KuralGuard Protects').first();
  if (await pillarsEl.isVisible()) {
    await pillarsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  }
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '03_core_civic_value_pillars.png'),
    clip: { x: 0, y: 780, width: 1440, height: 650 }
  });

  // 4. Featured Demo Scenario Callout
  console.log('4. Capturing Featured Demo Scenario Callout...');
  const scenarioEl = page.locator('text=FEATURED STUDENT OBSERVATION').first();
  if (await scenarioEl.isVisible()) {
    await scenarioEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const box = await scenarioEl.boundingBox();
    if (box) {
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '04_featured_demo_scenario_callout.png'),
        clip: { x: 120, y: Math.max(0, box.y - 40), width: 1200, height: 500 }
      });
    }
  }

  // 5. Report Issue: Step 1 Category Selection Grid
  console.log('5. Capturing Report Step 1 Category Selection...');
  await page.goto(`${baseUrl}/#/report`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  // Click 'Road Safety' chip
  const roadChip = page.locator('button:has-text("Road Safety")').first();
  if (await roadChip.isVisible()) {
    await roadChip.click();
    await page.waitForTimeout(300);
  }
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '05_report_step1_category_selection.png'),
    clip: { x: 0, y: 0, width: 1440, height: 850 }
  });

  // 6. Report Issue: GPS Auto-Detection & Geocoded Mini-Map
  console.log('6. Capturing Report Step 1 GPS Location Strip...');
  const gpsBtn = page.locator('button[title*="GPS"], button:has-text("my_location")').first();
  if (await gpsBtn.isVisible()) {
    await gpsBtn.click();
    await page.waitForTimeout(400);
  }
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '06_report_step1_gps_location_strip.png'),
    clip: { x: 0, y: 220, width: 1440, height: 740 }
  });

  // 7. Report Issue: Incident Description, Quick-Tags & Photo Upload
  console.log('7. Capturing Report Step 1 Description, Tags & Photo Upload...');
  // Click a suggested tag
  const missingSignageChip = page.locator('button:has-text("Missing Signage")').first();
  if (await missingSignageChip.isVisible()) {
    await missingSignageChip.click();
    await page.waitForTimeout(200);
  }
  // Click "Pre-fill sample scenario" to populate realistic photo & content
  const prefillBtn = page.locator('button:has-text("Pre-fill sample scenario")').first();
  if (await prefillBtn.isVisible()) {
    await prefillBtn.click();
    await page.waitForTimeout(400);
  }
  await page.evaluate(() => window.scrollBy(0, 420));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '07_report_step1_description_tags_upload.png'),
    clip: { x: 0, y: 350, width: 1440, height: 860 }
  });

  // 8. Report Issue: Anonymous Switch & Preferred Language
  console.log('8. Capturing Report Step 1 Anonymous Switch & Language...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '08_report_step1_anonymous_and_language.png'),
    clip: { x: 0, y: 260, width: 1440, height: 700 }
  });

  // 9. AI Safety Analysis: Real-Time Hazard Triage
  console.log('9. Capturing AI Safety Analysis Hazard Triage...');
  // Load demo flow directly
  await page.goto(`${baseUrl}/#/landing`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const tryDemoBtn = page.locator('button:has-text("Try Interactive Demo"), button:has-text("Try Demo")').first();
  await tryDemoBtn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '09_ai_analysis_hazard_triage.png'),
    clip: { x: 0, y: 0, width: 1440, height: 960 }
  });

  // 10. AI Safety Analysis: Immediate Safety Guidance & Emergency Dialers
  console.log('10. Capturing AI Safety Analysis Immediate Safety Guidance...');
  await page.evaluate(() => window.scrollBy(0, 680));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '10_ai_analysis_immediate_safety_advice.png'),
    clip: { x: 0, y: 150, width: 1440, height: 850 }
  });

  // 11. Generated Community Safety Brief: Official Civic Docket
  console.log('11. Capturing Generated Safety Brief Docket...');
  const createBriefBtn = page.locator('button:has-text("Create Safety Brief")').first();
  if (await createBriefBtn.isVisible()) {
    await createBriefBtn.click();
    await page.waitForTimeout(800);
  } else {
    await page.goto(`${baseUrl}/#/generated-report`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
  }
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '11_generated_safety_brief_docket.png'),
    clip: { x: 0, y: 0, width: 1440, height: 960 }
  });

  // 12. Civic Lifecycle Timeline & Export Utilities
  console.log('12. Capturing Civic Lifecycle Timeline & Actions...');
  await page.evaluate(() => window.scrollBy(0, 750));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '12_civic_lifecycle_timeline_and_actions.png'),
    clip: { x: 0, y: 200, width: 1440, height: 760 }
  });

  // 13. Community Priority Dashboard: KPIs & Search Filters
  console.log('13. Capturing Community Dashboard KPIs & Filters...');
  await page.goto(`${baseUrl}/#/dashboard`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '13_community_dashboard_kpis_and_search.png'),
    clip: { x: 0, y: 0, width: 1440, height: 920 }
  });

  // 14. Community Dashboard: Ward 14 Patrol & Hazard Radar Map
  console.log('14. Capturing Community Dashboard Radar Map & Incidents...');
  await page.evaluate(() => window.scrollBy(0, 520));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '14_community_dashboard_radar_map_and_feed.png'),
    clip: { x: 0, y: 100, width: 1440, height: 860 }
  });

  // 15. Safety & Emergency Resources Directory
  console.log('15. Capturing Safety & Emergency Resources Directory...');
  await page.goto(`${baseUrl}/#/resources`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '15_safety_and_emergency_resources.png'),
    clip: { x: 0, y: 0, width: 1440, height: 960 }
  });

  console.log('All 15 screenshots captured successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
