import "./ProductDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, addToWishlist } = useCart();

    const product = products.find((p) => String(p.id) === String(id));
    const [selectedSize, setSelectedSize] = useState("");
    const [pincode, setPincode] = useState("");
    const [deliveryMsg, setDeliveryMsg] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div style={{ textAlign: "center", padding: "100px" }}>
                <h2>Product not found</h2>
                <button onClick={() => navigate("/")} className="btn-light-solid">Go Home</button>
            </div>
        );
    }

    // Generate realistic attributes
    const brand = product.name.split(" ")[0] || "ZEN";
    const mrp = Math.floor(product.price * 1.6); // 60% markup for MRP
    const discount = Math.floor(((mrp - product.price) / mrp) * 100);

    const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
    const reviewsCount = Math.floor(Math.random() * 5000) + 100;

    // Sizes based on category
    let sizes = ["S", "M", "L", "XL", "XXL"];
    if (product.category === "footwear") sizes = ["6", "7", "8", "9", "10", "11"];
    if (product.category === "beauty" || product.category === "home" || product.category === "accessories" || product.category === "jewellery") {
        sizes = ["ONESIZE"];
    }

    const handleAddToCart = () => {
        if (sizes[0] !== "ONESIZE" && !selectedSize) {
            toast.error("Please select a size");
            return;
        }
        // Create detailed cart item
        const cartItem = {
            ...product,
            size: selectedSize || "ONESIZE",
            cartId: `${product.id}-${selectedSize || "ONESIZE"}`
        };
        addToCart(cartItem);
        toast.success("Added to Bag 🛍️");
    };

    const handleWishlist = () => {
        addToWishlist(product);
        toast.success("Saved to Wishlist ❤️");
    };

    const checkDelivery = () => {
        if (pincode.length === 6) {
            setDeliveryMsg("🚚 Delivery available by " + new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toDateString());
        } else {
            setDeliveryMsg("❌ Please enter a valid 6-digit Pincode");
        }
    };

    // Similar Products
    const similarProducts = products
        .filter((p) => p.category === product.category && String(p.id) !== String(id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

    return (
        <div className="pd-container">
            {/* Top Breadcrumbs */}
            <div className="pd-breadcrumbs">
                <span onClick={() => navigate("/")}>Home</span>  /
                <span onClick={() => navigate(`/shop/${product.category}`)}> {product.category}</span>  /
                <b> {product.name}</b>
            </div>

            <div className="pd-main">
                {/* Left: Product Images */}
                <div className="pd-image-section">
                    <div className="pd-image-grid">
                        <img src={product.image} alt={product.name} className="pd-main-img" />
                        <img src={product.image} alt={`${product.name} alternate`} style={{ filter: "brightness(0.95)" }} />
                        <img src={product.image} alt={`${product.name} view 3`} style={{ transform: "scaleX(-1)" }} />
                        <img src={product.image} alt={`${product.name} view 4`} style={{ filter: "contrast(1.1)" }} />
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="pd-details-section">
                    <h1 className="pd-brand">{brand}</h1>
                    <h2 className="pd-title">{product.name}</h2>

                    <div className="pd-rating-box">
                        <span className="pd-stars">{rating} ★</span>
                        <span className="pd-reviews">| {reviewsCount} Ratings</span>
                    </div>

                    <div className="pd-price-container">
                        <span className="pd-current-price">₹{product.price}</span>
                        <span className="pd-mrp">MRP <s>₹{mrp}</s></span>
                        <span className="pd-discount">({discount}% OFF)</span>
                    </div>
                    <p className="pd-tax-inclusive">inclusive of all taxes</p>

                    {/* Sizes */}
                    <div className="pd-size-selector">
                        <div className="pd-size-header">
                            <h3>SELECT SIZE</h3>
                            <span className="pd-size-chart">SIZE CHART &gt;</span>
                        </div>
                        <div className="pd-size-buttons">
                            {sizes.map((sz) => (
                                <button
                                    key={sz}
                                    className={`pd-size-btn ${selectedSize === sz ? 'selected' : ''}`}
                                    onClick={() => setSelectedSize(sz)}
                                >
                                    {sz}
                                </button>
                            ))}
                        </div>
                        {selectedSize && <p className="pd-size-recommend">We recommend selecting your standard size.</p>}
                    </div>

                    {/* Actions */}
                    <div className="pd-action-buttons">
                        <button className="pd-add-bag" onClick={handleAddToCart}>
                            🛍️ ADD TO BAG
                        </button>
                        <button className="pd-wishlist-btn" onClick={handleWishlist}>
                            🤍 WISHLIST
                        </button>
                    </div>

                    {/* Delivery & Pincode */}
                    <div className="pd-delivery-section">
                        <h3 className="pd-section-heading">DELIVERY OPTIONS 🚚</h3>
                        <div className="pd-pincode-box">
                            <input
                                type="text"
                                placeholder="Enter Pincode"
                                maxLength="6"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value.replace(/\D/, ''))}
                            />
                            <button onClick={checkDelivery}>Check</button>
                        </div>
                        {deliveryMsg && <p className="pd-delivery-msg">{deliveryMsg}</p>}

                        <ul className="pd-delivery-perks">
                            <li>100% Original Products</li>
                            <li>Pay on delivery might be available</li>
                            <li>Easy 14 days returns and exchanges</li>
                            <li>Try & Buy might be available</li>
                        </ul>
                    </div>

                    {/* Product Details Section */}
                    <div className="pd-info-section">
                        <h3 className="pd-section-heading">PRODUCT DETAILS 📝</h3>
                        <p>Premium {product.category} item carefully handcrafted with sustainable and premium materials. Experience maximum comfort and uncompromised style with {brand}.</p>

                        <div className="pd-specifications">
                            <div className="pd-spec-item">
                                <span>Material</span>
                                <strong>Premium Blend</strong>
                            </div>
                            <div className="pd-spec-item">
                                <span>Occasion</span>
                                <strong>Casual / Daily Wear</strong>
                            </div>
                            <div className="pd-spec-item">
                                <span>Care Instructions</span>
                                <strong>Machine Wash</strong>
                            </div>
                            <div className="pd-spec-item">
                                <span>Origin</span>
                                <strong>Imported</strong>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Similar Products Bottom Section */}
            <div className="pd-similar-section">
                <h3 className="pd-similar-title">SIMILAR PRODUCTS</h3>
                <div className="pd-similar-grid">
                    {similarProducts.map((sim) => (
                        <div className="pd-similar-card" key={sim.id} onClick={() => navigate(`/product/${sim.id}`)}>
                            <img src={sim.image} alt={sim.name} />
                            <div className="pd-sim-details">
                                <h4>{sim.name.split(" ")[0]}</h4>
                                <p>{sim.name}</p>
                                <strong>₹{sim.price}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default ProductDetails;
