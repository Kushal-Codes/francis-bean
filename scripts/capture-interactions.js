/**
 * Capture Menu Section & Open Chat Window Screenshots
 */

async function captureInteractions() {
  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('4173')) || tabs[0];
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

    // 1. Desktop Menu Section
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1100,
      deviceScaleFactor: 2,
      mobile: false,
    });
    await send('Runtime.evaluate', {
      expression: `document.getElementById('menu').scrollIntoView({ behavior: 'instant' });`,
    });
    await new Promise((r) => setTimeout(r, 800));

    const fs = await import('fs');
    const shotMenu = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('qa-screenshots/desktop-menu-section.png', Buffer.from(shotMenu.result.data, 'base64'));
    console.log('Saved qa-screenshots/desktop-menu-section.png');

    // 2. Open Beanie Chatbot
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('button[aria-label="Open chat with Beanie the cafe assistant"]');
        if (btn) btn.click();
      })()`,
    });
    await new Promise((r) => setTimeout(r, 800));

    const shotChat = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('qa-screenshots/desktop-chat-open.png', Buffer.from(shotChat.result.data, 'base64'));
    console.log('Saved qa-screenshots/desktop-chat-open.png');

    ws.close();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

captureInteractions();
