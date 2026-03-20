const fs = require('fs');
const https = require('https');

async function checkImage(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
        }).on('error', (e) => {
            resolve({ url, status: 'Error: ' + e.message });
        });
    });
}

async function main() {
    const file = fs.readFileSync('src/data/products.js', 'utf8');
    const urls = [...file.matchAll(/https:\/\/images\.unsplash\.com\/[^"']+/g)].map(m => m[0]);
    let broken = 0;
    for (let url of [...new Set(urls)]) {
        const res = await checkImage(url);
        if (String(res.status).startsWith('4') || String(res.status).startsWith('Error')) {
            console.log(`BROKEN: ${url}`);
            broken++;
        }
    }
    console.log(`Done. ${broken} broken out of ${urls.length} urls checked.`);
}
main();
