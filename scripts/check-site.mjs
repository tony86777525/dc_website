import { chromium } from 'playwright-core';
import {mkdir} from 'node:fs/promises';
await mkdir('artifacts',{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try {
for (const width of [1440,390]) {
const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for (const route of ['/','/work/demo/']) {
await page.goto('http://127.0.0.1:4322'+route);await page.waitForTimeout(1500);
if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+route+' '+width);
if(route==='/work/demo/'){await page.locator('.ss-stage').waitFor();await page.getByText('建立完成',{exact:true}).waitFor({state:'visible'});await page.waitForTimeout(1000);}
await page.screenshot({path:`artifacts/${route==='/'?'home':'case'}-${width}.png`,fullPage:true});
}
if(errors.length)throw Error(errors.join('\n'));
console.log(`PASS ${width}px: both routes, no overflow or browser errors, reduced-motion render`);await page.close();
}
}finally{await browser.close();}
