const fs = require('fs');

const existingProducts = [
    // Keeping the original first 50 or so as the true base
    { id: 1, name: "Classic White Oxford", price: 1299, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400", category: "men" },
    { id: 2, name: "Navy Blue Casual", price: 1499, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400", category: "men" },
    { id: 3, name: "Slim Fit Checkered", price: 1199, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400", category: "men" },
    { id: 4, name: "Linen Summer Shirt", price: 1699, image: "https://images.unsplash.com/photo-1588359348348-2895f5147bf9?w=400", category: "men" },
    { id: 5, name: "Black Formal Slim Fit", price: 1599, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400", category: "men" },
    { id: 18, name: "Floral Summer Wrap Dress", price: 2499, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", category: "women" },
    { id: 19, name: "Elegant Evening Gown", price: 4999, image: "https://images.unsplash.com/photo-1568252542512-9e5b8e974fcd?w=400", category: "women" },
    { id: 23, name: "Dinosaur Print Tee", price: 499, image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400", category: "kids" },
    { id: 27, name: "Classic White Sneakers", price: 2499, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400", category: "footwear" },
    { id: 32, name: "Matte Ruby Lipstick", price: 599, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", category: "beauty" },
    { id: 36, name: "Minimal Ceramic Vase", price: 799, image: "https://images.unsplash.com/photo-1612196808214-b811b61212ed?w=400", category: "home" },
    { id: 40, name: "Classic Silver Watch", price: 4999, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400", category: "accessories" },
];

let baseId = 100;

// High quality photo IDs from Unsplash representing each category perfectly
const categoryImages = {
    men: [
        "1596755094514-f87e34085b2c", "1583743814966-8936f5b7be1a", "1603252109303-2751441dd157",
        "1588359348348-2895f5147bf9", "1602810318383-e386cc2a3ccf", "1521572163474-6864f9cf17ab",
        "1618354691438-25bc04584c23", "1576566588028-4147f3842f27", "1581655353564-df123a1eb820",
        "1624378439575-d1ead6bb0446", "1542272604-787c3835535d", "1555689502-c4b22d76c56f",
        "1594633312681-425c7b97ccd1", "1556821840-3a63f95609a7", "1578587018452-892bace94f1c"
    ],
    women: [
        "1595777457583-95e059d581b8", "1568252542512-9e5b8e974fcd", "1503342217505-b0a15ec3261c",
        "1541099649105-f69ad21f3246", "1539533113208-f6df8cc8b543", "1583488736153-1250fbd7fa66",
        "1494155106197-0bf857b2ab10", "1515886657613-9f3515b0c78f", "1485230895920-ee9dc1572d42"
    ],
    kids: [
        "1622290291468-a28f7a7dc6a8", "1519238398492-9430c5108a8a", "1514090458221-65bb69cf63e6",
        "1471286174890-9c11241eb962", "1587654780291-39c9404d746b", "1518831959648-18622b7e1ce7",
        "1602488219502-4fd32d0c24cb", "1519241047957-be31d7379a5d"
    ],
    footwear: [
        "1600185365483-26d7a4cc7519", "1542291026-7eec264c27ff", "1595950653106-6c9ebd614d3a",
        "1543163521-1bf539c55dd2", "1520639888713-7851133b1ed0", "1549298916-b41d501d3772",
        "1508605307374-2cc687b1c318", "1560769629-975ec94e6a86", "1551107696-a4b0c5a0d9a2"
    ],
    beauty: [
        "1586495777744-4413f21062fa", "1620916566398-39f1143ab7be", "1541643600914-78b084683601",
        "1512496015851-a1cbfc388fc8", "1556228578-0d85b1a4d571", "1596462502278-27bf85033e54",
        "1615396590525-2ec7100bc035", "1596462502596-f95ae5ec0904"
    ],
    home: [
        "1612196808214-b811b61212ed", "1522771739844-6a9f6d5f14af", "1602928321679-560bb453f190",
        "1507473885765-e6ed057f782c", "1602143407151-7111542de6e8", "1618221195710-dd6be18fa228",
        "1586023492125-27b2c045efd7", "1616486029423-aa4954460a5e"
    ],
    accessories: [
        "1524805444758-089113d48a6d", "1627123424574-724758594e93", "1584916201218-f4242ceb4809",
        "1511499767150-a48a237f0083", "1523275335684-37898b6baf30", "1593452485549-361ee7d51b3f",
        "1611591437281-460bfbe1220a", "1599643478524-fb66f7f6f592", "1535632066927-ab7c9ab60908"
    ]
};

// Realistic naming components
const generators = {
    men: {
        brands: ["Puma", "Levi's", "U.S. Polo Assn.", "Nike", "Tommy Hilfiger", "H&M", "Wrogn", "Roadster", "Jack & Jones", "Calvin Klein"],
        styles: ["Graphic Printed", "Solid Pure Cotton", "Slim Fit", "Checked Casual", "Relaxed Fit", "Straight Fit", "Colorblocked", "Regular Fit", "Vintage"],
        types: ["T-Shirt", "Shirt", "Jeans", "Chinos", "Polo T-Shirt", "Sweatshirt", "Jacket", "Shorts", "Trousers"]
    },
    women: {
        brands: ["Biba", "H&M", "Zara", "Mango", "Forever 21", "Vero Moda", "ONLY", "Urbanic", "Libas", "Sassafras"],
        styles: ["Floral Printed", "Solid A-Line", "High-Rise Wide-Leg", "Ribbed Knit", "Ruched Bodycon", "Classic Fit", "Embroidered", "Oversized", "Flared"],
        types: ["Dress", "Kurta", "Jeans", "Sweater", "Crop Top", "Trench Coat", "Midi Skirt", "Jumpsuit", "Maxi Dress"]
    },
    kids: {
        brands: ["Mothercare", "H&M Kids", "Carter's", "GAP Kids", "United Colors of Benetton", "Gini & Jony", "Peppermint", "Liliput"],
        styles: ["Boys Graphic", "Girls Printed", "Toddler Solid", "Unisex Striped", "Boys Casual", "Girls Festive", "Infant Cotton", "Kids Playwear"],
        types: ["Bodysuit", "Jersey Dress", "Tee", "Pullover Hoodie", "Chinos", "Pajama Set", "Shorts", "Jacket", "Romper"]
    },
    footwear: {
        brands: ["Nike", "Adidas Originals", "Puma", "Vans", "Converse", "Skechers", "Reebok", "Crocs", "Bata", "Woodland", "New Balance"],
        styles: ["Air Force 1 '07", "Stan Smith", "Smash V2 L", "Old Skool Canvas", "Chuck Taylor All Star", "Go Walk 5", "Classic Leather", "Swift Run"],
        types: ["Sneakers", "Running Shoes", "Walking Shoes", "Casual Shoes", "Loafers", "Formal Shoes", "Sandals", "Slip-Ons"]
    },
    beauty: {
        brands: ["MAC", "Maybelline New York", "Lakme Absolute", "L'Oreal Paris", "Huda Beauty", "KAY Beauty", "Clinique", "The Ordinary", "Plum", "Nykaa"],
        styles: ["Prep + Prime Fix+", "Fit Me Matte", "Revitalift Anti-Aging", "Moisture Surge 100H", "Nude Palette", "Matte Transferproof", "Hydrating Vitamin C"],
        types: ["Foundation", "Lipstick", "Serum", "Eyeshadow Palette", "Blush", "Face Wash", "Moisturizer", "Mascara", "Highlighter"]
    },
    home: {
        brands: ["IKEA", "Home Centre", "Bombay Dyeing", "Prestige", "Philips", "Wakefit", "Milton", "D'Decor", "Borosil"],
        styles: ["Solid Wood", "Orthopedic Memory Foam", "Smart Hue Wi-Fi", "100% Cotton", "Minimalist Ceramic", "Stainless Steel", "Handwoven", "Aesthetic"],
        types: ["Coffee Table", "Mattress", "Smart Bulb", "Bedsheet", "Vase", "Cookware Set", "Rug", "Table Lamp", "Wall Art", "Cushion Cover"]
    },
    accessories: {
        brands: ["Fossil", "Ray-Ban", "Casio", "Titan", "Hidesign", "Tommy Hilfiger", "Fastrack", "Daniel Wellington", "Guess", "Michael Kors"],
        styles: ["Chronograph Men's", "Unisex Aviator", "Vintage Series Digital", "Neo Analog", "Genuine Leather", "Polarized Square", "Rose Gold-Plated", "Slim Bifold"],
        types: ["Watch", "Sunglasses", "Handbag", "Wallet", "Backpack", "Belt", "Crossbody Bag", "Pendant Necklace", "Earrings"]
    }
};

const priceRanges = {
    men: [499, 3999],
    women: [699, 4999],
    kids: [299, 1999],
    footwear: [1499, 12999],
    beauty: [299, 3499],
    home: [399, 15999],
    accessories: [799, 14999]
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const targetCategories = ["men", "women", "kids", "footwear", "beauty", "home", "accessories"];
const qtyPerCategory = 1000;

for (const cat of targetCategories) {
    const imagesList = categoryImages[cat];
    const gen = generators[cat];
    const [minPrice, maxPrice] = priceRanges[cat];

    for (let i = 0; i < qtyPerCategory; i++) {
        const id = baseId++;

        // Build realistic name: Brand + Style + Type
        const brand = getRandomFrom(gen.brands);
        const style = getRandomFrom(gen.styles);
        const type = getRandomFrom(gen.types);
        const name = `${brand} ${style} ${type}`;

        // Build realistic price
        // Make it end in 99, 90, 50, or 00 mostly
        let price = getRandomInt(minPrice, maxPrice);
        const mod10 = price % 10;
        if (mod10 !== 9 && mod10 !== 0) {
            price = Math.floor(price / 10) * 10 + 9; // force ends in 9
        }

        // Pick image from pool
        const imageId = imagesList[i % imagesList.length];
        const imageUrl = `https://images.unsplash.com/photo-${imageId}?w=500&q=80`;

        existingProducts.push({
            id,
            name,
            price,
            image: imageUrl,
            category: cat
        });
    }
}

const fileContent = `const products = ${JSON.stringify(existingProducts, null, 2)};\n\nexport default products;\n`;

fs.writeFileSync('src/data/products.js', fileContent);
console.log('Successfully generated ' + existingProducts.length + ' HIGHLY REALISTIC products in src/data/products.js');
