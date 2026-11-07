import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const server = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1'], { stdio: 'pipe' });
let browser;
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try { const response = await fetch('http://127.0.0.1:5173'); if (response.ok) { ready = true; break; } } catch {}
    await sleep(500);
  }
  if (!ready) throw new Error('Vite server did not start');
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:5173');
  await page.getByText('RIG2D STUDIO').waitFor();
  await page.locator('canvas').waitFor({ timeout: 15000 });
  await page.getByRole('button', { name: 'Enregistrer' }).click();
  await page.screenshot({ path: 'rig2d-smoke.png', fullPage: true });
  if (errors.length) throw new Error('Browser runtime errors: ' + errors.join('; '));
  console.log('Browser smoke test passed');
} finally {
  if (browser) await browser.close();
  server.kill();
}
