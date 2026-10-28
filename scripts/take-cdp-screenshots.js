/**
 * Precision CDP Screenshot and Layout Auditor
 */

async function run() {
  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('4173')) || tabs[0];
    if (!tab) {
      console.error('No tab found!');
      process.exit(1);
    }

    console.log('Connecting to tab:', tab.webSocketDebuggerUrl);
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && callbacks.has(data.id)) {
        callbacks.get(data.id)(data);
        callbacks.delete(data.id);
      }
    };

    const send = (method, params = {}) => {
      return new Promise((resolve) => {
        const msgId = id++;
        callbacks.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    };

    await new Promise((resolve) => (ws.onopen = resolve));
    console.log('WebSocket connected!');

    // Set mobile viewport 390x844 with deviceScaleFactor: 2 and mobile: true
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await send('Page.navigate', { url: 'http://localhost:4173/' });
    await new Promise((r) => setTimeout(r, 1500));

    // Audit layout & inspect header elements
    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const header = document.querySelector('header');
        const headerRect = header ? header.getBoundingClientRect() : null;
        const brand = document.querySelector('a[aria-label="Francis Bean Home"]');
        const brandRect = brand ? brand.getBoundingClientRect() : null;
        const mobileControls = document.querySelector('.flex.md\\\\:hidden');
        const mobileControlsRect = mobileControls ? mobileControls.getBoundingClientRect() : null;
        const buttons = mobileControls ? Array.from(mobileControls.querySelectorAll('button')).map(b => ({
          aria: b.getAttribute('aria-label'),
          rect: b.getBoundingClientRect()
        })) : [];

        // Check if anything overflows 390px
        const overflowElements = Array.from(document.querySelectorAll('*'))
          .filter(el => {
            const r = el.getBoundingClientRect();
            return r.right > 390.5;
          })
          .map(el => ({
            tag: el.tagName,
            cls: el.className,
            right: el.getBoundingClientRect().right,
            width: el.getBoundingClientRect().width,
          }))
          .slice(0, 10);

        return {
          windowInnerWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          headerRect,
          brandRect,
          mobileControlsRect,
          buttons,
          overflowElements
        };
      })()`,
      returnByValue: true,
    });

    console.log('Layout Audit Result:', JSON.stringify(evalRes.result?.value, null, 2));

    // Take screenshot
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const fs = await import('fs');
    fs.writeFileSync('qa-screenshots/mobile-cdp-perfect.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved qa-screenshots/mobile-cdp-perfect.png');

    // Also take desktop 1440x900 screenshot
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false,
    });
    await new Promise((r) => setTimeout(r, 1000));
    const shotDesktop = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('qa-screenshots/desktop-cdp-perfect.png', Buffer.from(shotDesktop.result.data, 'base64'));
    console.log('Saved qa-screenshots/desktop-cdp-perfect.png');

    ws.close();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
