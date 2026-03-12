const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--enable-features=SharedArrayBuffer']
  });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    // Exclude basic vite warnings if any
    console.log('PAGE LOG:', msg.text());
  });
  
  await page.exposeFunction('logMessage', (data) => {
      console.log("From worker (parsed):", data);
  });
  
  await page.goto('http://localhost:5500/test_worker.html');
  await page.evaluate(() => {
    const worker = new Worker('js/shogi-worker.js');
    worker.onmessage = (e) => {
        window.logMessage(JSON.stringify(e.data));
        if (e.data && e.data.type === 'ready') {
            worker.postMessage({ type: 'command', command: 'isready' });
        }
    };
    worker.postMessage({ type: 'init' });
  });

  await new Promise(resolve => setTimeout(resolve, 5000));
  await browser.close();
})();
