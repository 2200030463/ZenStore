const fs = require('fs');

async function getPlatziImages(keyword) {
    const data = await fetch('https://api.escuelajs.co/api/v1/products?limit=200').then(r => r.json());
    let imgs = [];
    data.forEach(p => {
        let title = p.title.toLowerCase();
        let cat = p.category.name.toLowerCase();
        let image = p.images[0].replace(/"/g, '').replace(/[\[\]]/g, '');
        if ((title.includes(keyword) || cat.includes(keyword)) && image.startsWith('http')) {
            imgs.push(image);
        }
    });
    return imgs;
}

async function run() {
    console.log('Pants:', await getPlatziImages('pant'));
    console.log('Sweatshirts:', await getPlatziImages('sweat'));
    console.log('Kids:', await getPlatziImages('kid'));
}
run();
