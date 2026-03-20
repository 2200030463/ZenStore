import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import "./Products.css";

const categoryHeaders = {
  footwear: {
    hero: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1600",
    title: "Footwear Collection",
    subtitle: "STEP UP YOUR STYLE GAME"
  },
  beauty: {
    hero: "https://images.unsplash.com/photo-1616683693504-ceea7a9ea610?w=1600",
    title: "Beauty & Grooming",
    subtitle: "PREMIUM ESSENTIALS"
  },
  home: {
    hero: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600",
    title: "Home & Living",
    subtitle: "REDEFINE YOUR SPACE"
  },
  accessories: {
    hero: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600",
    title: "Premium Accessories",
    subtitle: "THE PERFECT FINISHING TOUCH"
  },
  jewellery: {
    hero: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600",
    title: "Fine Jewellery",
    subtitle: "ELEGANCE IN EVERY DETAIL"
  },
  shirts: {
    hero: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1600",
    title: "Men's Shirts",
    subtitle: "SHARP FORMALS & CASUALS"
  },
  tshirts: {
    hero: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1600",
    title: "Graphic & Classic Tees",
    subtitle: "EVERYDAY ESSENTIALS"
  },
  sweatshirts: {
    hero: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1600",
    title: "Hoodies & Sweatshirts",
    subtitle: "STAY WARM, STAY STYLISH"
  },
  pants: {
    hero: "https://images.unsplash.com/photo-1624378439575-d1ead6bb0446?w=1600",
    title: "Trousers & Denim",
    subtitle: "THE PERFECT FIT"
  },
  handbags: {
    hero: "https://images.unsplash.com/photo-1590874103328-7acfb13c9e6d?w=1600",
    title: "Handbags & More",
    subtitle: "CARRY YOUR STYLE"
  }
};

function Products() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToWishlist } = useCart();

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(15000);

  // Clear filters when category changes
  useEffect(() => {
    setSelectedBrands([]);
    setMaxPrice(15000);
  }, [category]);

  const categoryProducts = products.filter(
    item => item.category === category
  );

  const availableBrands = useMemo(() => {
    const brandsSet = new Set();
    categoryProducts.forEach(p => {
      const firstWord = p.name.split(' ')[0];
      if (firstWord && firstWord.length > 2) brandsSet.add(firstWord);
    });
    return Array.from(brandsSet).slice(0, 10);
  }, [categoryProducts]);

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = categoryProducts.filter(p => {
    let brandMatch = true;
    if (selectedBrands.length > 0) {
      brandMatch = selectedBrands.some(b => p.name.includes(b));
    }
    let priceMatch = p.price <= maxPrice;
    return brandMatch && priceMatch;
  });

  const headerData = categoryHeaders[category] || {
    hero: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600",
    title: category.toUpperCase(),
    subtitle: "EXPLORE THE COLLECTION"
  };

  return (
    <div className="products-page">

      {/* DYNAMIC CATEGORY HERO */}
      <div className="category-hero" style={{ backgroundImage: `url(${headerData.hero})` }}>
        <div className="category-hero-overlay">
          <h1 className="category-title">{headerData.title}</h1>
          <p className="category-subtitle">{headerData.subtitle}</p>
        </div>
      </div>

      <div className="products-container">

        <aside className="filters-sidebar">
          <div className="filter-header">
            <h3>FILTERS</h3>
            <button className="clear-all" onClick={() => { setSelectedBrands([]); setMaxPrice(15000); }}>CLEAR ALL</button>
          </div>

          <div className="filter-section">
            <h4>BRAND</h4>
            <div className="filter-list">
              {availableBrands.map(brand => (
                <label key={brand} className="filter-label">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>PRICE</h4>
            <div className="price-slider">
              <input
                type="range"
                min="0"
                max="15000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="price-range-text">
                ₹0 - ₹{maxPrice}
              </div>
            </div>
          </div>

        </aside>

        <div className="products-grid">

          {filteredProducts.length === 0 ? (
            <div className="no-products">No products matched your filters.</div>
          ) : (
            filteredProducts.map(product => (

              <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: "pointer" }}>

                <div
                  className="wishlist-icon-btn"
                  onClick={(e) => { e.stopPropagation(); addToWishlist(product); toast.success("Added to Wishlist ❤️") }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 8 1.054 12.721-3.04 23.333 4.868 8 15z" />
                  </svg>
                </div>

                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.brand}
                  />
                  {product.rating && (
                    <div className="product-rating-box">
                      {product.rating} <span className="star-icon">★</span> | {product.ratingCount}
                    </div>
                  )}
                </div>

                <div className="myntra-product-info">
                  <h3 className="myntra-brand">{product.brand}</h3>
                  <h4 className="myntra-title">{product.title}</h4>

                  <div className="myntra-price-row">
                    <span className="myntra-current-price">Rs. {product.price}</span>
                    <span className="myntra-original-price">Rs. {product.mrp}</span>
                    <span className="myntra-discount">{product.discountDisplay}</span>
                  </div>
                </div>

                <div className="product-actions">
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                  >
                    VIEW PRODUCT
                  </button>
                </div>

              </div>

            ))
          )}

        </div>
      </div>

    </div>
  );

}

export default Products;
