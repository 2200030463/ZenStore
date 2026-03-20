const fs = require('fs');

const existingProducts = [
    // ================= MEN'S SHIRTS =================
    { id: 1, name: "Classic White Oxford", price: 1299, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400", category: "shirts" },
    { id: 2, name: "Navy Blue Casual", price: 1499, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400", category: "shirts" },
    { id: 3, name: "Slim Fit Checkered", price: 1199, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400", category: "shirts" },
    { id: 4, name: "Linen Summer Shirt", price: 1699, image: "https://images.unsplash.com/photo-1588359348348-2895f5147bf9?w=400", category: "shirts" },
    { id: 5, name: "Black Formal Slim Fit", price: 1599, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400", category: "shirts" },

    // ================= MEN'S T-SHIRTS =================
    { id: 6, name: "Premium Red Tee", price: 699, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", category: "tshirts" },
    { id: 7, name: "Oversized Grey Graphic", price: 899, image: "https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=400", category: "tshirts" },
    { id: 8, name: "Classic Black V-Neck", price: 599, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400", category: "tshirts" },
    { id: 9, name: "Striped Vintage Tee", price: 799, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400", category: "tshirts" },
    { id: 10, name: "Mustard Yellow Essential", price: 650, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400", category: "tshirts" },

    // ================= MEN'S PANTS & TROUSERS =================
    { id: 11, name: "Slim Fit Chinos", price: 1499, image: "https://images.unsplash.com/photo-1624378439575-d1ead6bb0446?w=400", category: "pants" },
    { id: 12, name: "Classic Blue Denim", price: 1999, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", category: "pants" },
    { id: 13, name: "Khaki Cargo Pants", price: 1799, image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=400", category: "pants" },
    { id: 14, name: "Formal Black Trousers", price: 1899, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400", category: "pants" },

    // ================= SWEATSHIRTS & HOODIES =================
    { id: 15, name: "Cozy Grey Hoodie", price: 1999, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", category: "sweatshirts" },
    { id: 16, name: "Urban Streetwear Sweatshirt", price: 1799, image: "https://images.unsplash.com/photo-1578587018452-892bace94f1c?w=400", category: "sweatshirts" },
    { id: 17, name: "Heavyweight Maroon Pullover", price: 2199, image: "https://images.unsplash.com/photo-1606822452243-7182e0571d7c?w=400", category: "sweatshirts" },

    // ================= WOMEN'S FASHION =================
    { id: 18, name: "Floral Summer Wrap Dress", price: 2499, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", category: "women" },
    { id: 19, name: "Elegant Evening Gown", price: 4999, image: "https://images.unsplash.com/photo-1568252542512-9e5b8e974fcd?w=400", category: "women" },
    { id: 20, name: "Silk Blouse Top", price: 1599, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400", category: "women" },
    { id: 21, name: "High Waisted Mom Jeans", price: 1899, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400", category: "women" },
    { id: 22, name: "Beige Trench Coat", price: 3499, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400", category: "women" },

    // ================= KIDS FASHION =================
    { id: 23, name: "Dinosaur Print Tee", price: 499, image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400", category: "kids" },
    { id: 24, name: "Toddler Denim Overalls", price: 999, image: "https://images.unsplash.com/photo-1519238398492-9430c5108a8a?w=400", category: "kids" },
    { id: 25, name: "Girls Ruffle Dress", price: 899, image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=400", category: "kids" },
    { id: 26, name: "Kids Puffer Jacket", price: 1499, image: "https://images.unsplash.com/photo-1471286174890-9c11241eb962?w=400", category: "kids" },

    // ================= FOOTWEAR =================
    { id: 27, name: "Classic White Sneakers", price: 2499, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400", category: "footwear" },
    { id: 28, name: "Red Running Shoes", price: 3499, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", category: "footwear" },
    { id: 29, name: "Leather Oxford Formal", price: 4599, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400", category: "footwear" },
    { id: 30, name: "Women's Strappy Heels", price: 2999, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400", category: "footwear" },
    { id: 31, name: "Suede Ankle Boots", price: 3999, image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400", category: "footwear" },

    // ================= BEAUTY =================
    { id: 32, name: "Matte Ruby Lipstick", price: 599, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", category: "beauty" },
    { id: 33, name: "Hydrating Facial Serum", price: 1299, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400", category: "beauty" },
    { id: 34, name: "Luxury Perfume", price: 2999, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400", category: "beauty" },
    { id: 35, name: "Eyeshadow Palette", price: 1499, image: "https://images.unsplash.com/photo-1512496015851-a1cbfc388fc8?w=400", category: "beauty" },

    // ================= HOME & LIVING =================
    { id: 36, name: "Minimal Ceramic Vase", price: 799, image: "https://images.unsplash.com/photo-1612196808214-b811b61212ed?w=400", category: "home" },
    { id: 37, name: "Premium Linen Bedspread", price: 2499, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400", category: "home" },
    { id: 38, name: "Scented Soy Candle", price: 499, image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400", category: "home" },
    { id: 39, name: "Modern Desk Lamp", price: 1899, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400", category: "home" },

    // ================= ACCESSORIES & BAGS =================
    { id: 40, name: "Classic Silver Watch", price: 4999, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400", category: "accessories" },
    { id: 41, name: "Genuine Leather Wallet", price: 1299, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400", category: "accessories" },
    { id: 42, name: "Designer Crossbody Bag", price: 3499, image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400", category: "accessories" },
    { id: 43, name: "Aviator Sunglasses", price: 1599, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", category: "accessories" },

    // ================= JEWELLERY =================
    { id: 44, name: "Rose Gold Pendant Array", price: 2999, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", category: "jewellery" },
    { id: 45, name: "Diamond Embedded Ring", price: 15999, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400", category: "jewellery" },
    { id: 46, name: "Elegant Pearl Necklace", price: 4599, image: "https://images.unsplash.com/photo-1599643478524-fb66f7f6f592?w=400", category: "jewellery" },
    { id: 47, name: "Sterling Silver Earrings", price: 1899, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400", category: "jewellery" },

    // ================= EXTRA MORE PRODUCTS =================
    { id: 48, name: "Vintage Leather Jacket", price: 5499, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", category: "men" },
    { id: 49, name: "Casual Denim Skirt", price: 1499, image: "https://images.unsplash.com/photo-1583488736153-1250fbd7fa66?w=400", category: "women" },
    { id: 50, name: "Sporty Smart Watch", price: 6999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", category: "accessories" },
    { id: 51, name: "Organic Face Cleanser", price: 499, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", category: "beauty" },
    { id: 52, name: "Comfy Slip-on Loafers", price: 1899, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", category: "footwear" },
    { id: 53, name: "Sleek Water Bottle", price: 699, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400", category: "home" },
    { id: 54, name: "Kids Superhero Cape", price: 399, image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400", category: "kids" },
];

let baseId = 55;
const targetCategories = ["men", "women", "kids", "footwear", "beauty", "home", "accessories"];
const qtyPerCategory = 205;

const adjs = ["Premium", "Classic", "Modern", "Essential", "Vintage", "Luxury", "Casual", "Elegant", "Minimal", "Sporty"];
const names = {
    men: ["Jacket", "Shirt", "T-Shirt", "Jeans", "Trousers", "Sweater", "Suit", "Blazer", "Shorts", "Polo"],
    women: ["Dress", "Blouse", "Skirt", "Jeans", "Tunic", "Cardigan", "Jumpsuit", "Gown", "Top", "Coat"],
    kids: ["Tee", "Overalls", "Pants", "Shorts", "Jacket", "Sweater", "Dress", "Pajamas", "Romper", "Beanie"],
    footwear: ["Sneakers", "Boots", "Loafers", "Sandals", "Heels", "Oxfords", "Slides", "Running Shoes", "Slippers", "Flats"],
    beauty: ["Lipstick", "Serum", "Cleanser", "Moisturizer", "Foundation", "Mascara", "Fragrance", "Toner", "Blush", "Lotion"],
    home: ["Vase", "Lamp", "Cushion", "Rug", "Blanket", "Candle", "Mirror", "Frame", "Bowl", "Planter"],
    accessories: ["Watch", "Wallet", "Bag", "Sunglasses", "Belt", "Scarf", "Hat", "Gloves", "Backpack", "Cap"]
};

// Use reliable dummy image generator
function getImageUrl(category, id) {
    if (category === "men" || category === "women" || category === "kids") return `https://picsum.photos/seed/apparel_${id}/400/500`;
    if (category === "footwear") return `https://picsum.photos/seed/shoes_${id}/400/500`;
    if (category === "beauty") return `https://picsum.photos/seed/beauty_${id}/400/500`;
    if (category === "home") return `https://picsum.photos/seed/home_${id}/400/500`;
    if (category === "accessories") return `https://picsum.photos/seed/acc_${id}/400/500`;
    return `https://picsum.photos/seed/${id}/400/500`;
}

for (const cat of targetCategories) {
    for (let i = 0; i < qtyPerCategory; i++) {
        const id = baseId++;
        const adj = adjs[Math.floor(Math.random() * adjs.length)];
        const noun = names[cat][Math.floor(Math.random() * names[cat].length)];
        const name = `${adj} ${noun} ${Math.floor(Math.random() * 1000)}`;
        const price = Math.floor(Math.random() * 4000) + 499; // Random price between 499 and 4499

        // We ensure we output exactly valid fields
        existingProducts.push({
            id,
            name,
            price,
            image: getImageUrl(cat, id),
            category: cat
        });
    }
}

const fileContent = `const products = ${JSON.stringify(existingProducts, null, 2)};\n\nexport default products;\n`;

fs.writeFileSync('src/data/products.js', fileContent);
console.log('Successfully generated ' + existingProducts.length + ' products in src/data/products.js');
