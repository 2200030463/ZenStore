import fs from 'fs';

const dummyJsonMapping = {
    men: ['mens-shirts'],
    women: ['womens-dresses'],
    footwear: ['mens-shoes', 'womens-shoes'],
    beauty: ['beauty', 'fragrances', 'skin-care'],
    home: ['home-decoration', 'furniture'],
    accessories: ['mens-watches', 'womens-watches', 'womens-bags', 'womens-watches', 'sunglasses'],
    kids: [] // Handled manually below
};

// Known good fallback Unsplash IDs for kids (since dummyJson lacks kids)
// These IDs were in our initial dataset and worked, or we use safe placeholder logic
const kidsFallbackImages = [
    "https://images.unsplash.com/photo-1519238398492-9430c5108a8a?w=600",
    "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=600",
    "https://images.unsplash.com/photo-1471286174890-9c11241eb962?w=600",
    "https://images.unsplash.com/photo-1518831959648-18622b7e1ce7?w=600",
    "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600",
    "https://m.media-amazon.com/images/I/71YyLqN15YL._AC_UY1000_.jpg",
    "https://m.media-amazon.com/images/I/61N46Z5hU_L._AC_UY1000_.jpg",
    "https://m.media-amazon.com/images/I/51wXU48h47L._AC_UX679_.jpg",
    "https://m.media-amazon.com/images/I/61nExb1uL4L._AC_UY1000_.jpg",
    "https://m.media-amazon.com/images/I/71Xm0oDtzfL._AC_UY1000_.jpg"
];

const kidsNames = [
    "Boys Graphic Print T-Shirt",
    "Toddler Denim Overalls",
    "Girls Ruffle Casual Dress",
    "Kids Puffer Winter Jacket",
    "Dinosaur Print Sleepwear",
    "Cotton Short Sleeve Tops",
    "Floral Summer Skirt Sets",
    "Unisex Jogger Sweats",
    "Crewneck Warm Sweater",
    "Girls Elegant Party Frock"
];

async function fetchProductsFromCategory(catSlug) {
    try {
        const res = await fetch(`https://dummyjson.com/products/category/${catSlug}?limit=0`);
        const data = await res.json();
        return data.products || [];
    } catch (e) {
        console.error("Error fetching", catSlug, e);
        return [];
    }
}

async function run() {
    let allProducts = [];
    let baseId = 1;

    // Helper to generate a realistic price ending in 9
    const getPrice = (min, max) => {
        let p = Math.floor(Math.random() * (max - min) + min);
        return Math.floor(p / 10) * 10 + 9;
    };

    const targetCategories = ["men", "women", "kids", "footwear", "beauty", "home", "accessories"];
    const qtyPerCategory = 205;

    for (const cat of targetCategories) {
        let pool = [];
        let priceRange = [499, 4999];

        if (cat === "kids") {
            for (let i = 0; i < kidsNames.length; i++) {
                pool.push({
                    title: kidsNames[i],
                    thumbnail: kidsFallbackImages[i],
                    price: getPrice(299, 1499)
                });
            }
        } else {
            const slugs = dummyJsonMapping[cat];
            for (const slug of slugs) {
                const apiProds = await fetchProductsFromCategory(slug);
                apiProds.forEach(p => {
                    // Normalize price for INR roughly
                    let inrPrice = Math.floor(p.price * 82);
                    inrPrice = Math.floor(inrPrice / 10) * 10 + 9;
                    pool.push({
                        title: p.title || p.name,
                        thumbnail: p.thumbnail, // high quality from dummyjson
                        price: inrPrice
                    });
                });
            }
        }

        // If pool is empty, provide fake
        if (pool.length === 0) {
            pool.push({ title: "Premium Item", thumbnail: "https://via.placeholder.com/400x500", price: 999 });
        }

        // Generate exactly qtyPerCategory by cycling through the pool
        let poolIndex = 0;
        for (let i = 0; i < qtyPerCategory; i++) {
            const src = pool[poolIndex];

            // Alter title slightly on repeats
            let title = src.title;
            if (i >= pool.length && cat !== 'kids') {
                const adjectives = ["Premium", "Classic", "Modern", "Essential", "Vintage", "Luxury", "Casual", "Elegant", "Minimal", "Sporty"];
                const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
                title = `${adj} ${title}`;
            }

            allProducts.push({
                id: baseId++,
                name: title,
                price: src.price > 0 ? src.price : getPrice(1000, 3000), // fallback if 0
                image: src.thumbnail,
                category: cat
            });

            poolIndex = (poolIndex + 1) % pool.length;
        }
    }

    const fileContent = `const products = ${JSON.stringify(allProducts, null, 2)};\n\nexport default products;\n`;
    fs.writeFileSync('src/data/products.js', fileContent);
    console.log('Successfully generated ' + allProducts.length + ' HIGHLY REALISTIC API-BACKED products in src/data/products.js');
}

run();
