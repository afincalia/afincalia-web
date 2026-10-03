import fs from 'node:fs/promises';
import path from 'node:path';

// Read-only GETs to a locally running production build; no API handlers are exported.
// Usage: node scripts/package-review.mjs /absolute/output/directory
const destination = process.argv[2];
if (!destination || !path.isAbsolute(destination) || destination === '/') throw Error('An absolute output directory is required.');
const base = 'http://127.0.0.1:3120';
const buildId = (await fs.readFile('.next/BUILD_ID', 'utf8')).trim();
const pages = JSON.parse(await fs.readFile('.next/server/pages-manifest.json', 'utf8'));
const prerender = JSON.parse(await fs.readFile('.next/prerender-manifest.json', 'utf8'));
const routes = [...new Set([...Object.keys(pages), ...Object.keys(prerender.routes)])]
  .filter(route => !route.startsWith('/_') && !route.startsWith('/api/') && !route.includes('[') && route !== '/qa-preview');
await fs.mkdir(destination, {recursive: true});
if ((await fs.readdir(destination)).length) throw Error('Output directory must be empty to avoid mixing builds.');
await fs.cp('public', destination, {recursive: true});
await fs.cp('.next/static', path.join(destination, '_next/static'), {recursive: true});
const receipt = [];
for (const route of routes) {
  const response = await fetch(base + route);
  if (response.status !== 200 && !(route === '/404' && response.status === 404)) throw Error(`Unexpected status: ${route} ${response.status}`);
  let html = await response.text();
  if (!html.includes('__NEXT_DATA__')) throw Error(`Missing page data: ${route}`);
  html = html.replace(/<meta name="robots"[^>]*>/g, '').replace('</head>', '<meta name="robots" content="noindex,nofollow"/></head>');
  const file = path.join(destination, route === '/' ? 'index.html' : route.slice(1) + '.html');
  await fs.mkdir(path.dirname(file), {recursive: true});
  await fs.writeFile(file, html);
  const data = JSON.parse(html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s)[1]);
  if (data.gssp || data.gsp) {
    const dataPath = `/_next/data/${buildId}${route === '/' ? '/index' : route}.json`;
    const dataResponse = await fetch(base + dataPath);
    if (!dataResponse.ok) throw Error(`Missing navigation data: ${route}`);
    const bytes = await dataResponse.text();
    JSON.parse(bytes);
    const outputPath = path.join(destination, dataPath.slice(1));
    await fs.mkdir(path.dirname(outputPath), {recursive: true});
    await fs.writeFile(outputPath, bytes);
  }
  receipt.push({route, status: response.status, page: data.page, buildId: data.buildId, bytes: Buffer.byteLength(html)});
}
let errorHtml = await fs.readFile('.next/server/pages/500.html', 'utf8');
await fs.writeFile(path.join(destination, '500.html'), errorHtml.replace('</head>', '<meta name="robots" content="noindex,nofollow"/></head>'));
await fs.writeFile(path.join(destination, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
await fs.rm(path.join(destination, 'sitemap.xml'), {force: true});
await fs.writeFile(path.join(destination, '_headers'), '/*\n  X-Robots-Tag: noindex, nofollow\n');
console.log(JSON.stringify({buildId, routes: receipt, htmlCount: receipt.length + 1, apiHandlers: 0}, null, 2));
