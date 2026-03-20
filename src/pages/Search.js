import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import "./Products.css"; // Reuse product styling

function Search() {
    const { query } = useParams();
    const navigate = useNavigate();
    const { addToWishlist } = useCart();
    const searchQuery = query.toLowerCase();

    const filteredProducts = products.filter(
        item =>
            item.name.toLowerCase().includes(searchQuery) ||
            item.category.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="products-page" style={{ paddingTop: '40px' }}>

            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h1 style={{ fontSize: "28px", fontWeight: "800", textTransform: "uppercase" }}>
                    Search Results for "{query}"
                </h1>
                <p style={{ color: "#7e818c", marginTop: "10px" }}>{filteredProducts.length} items found</p>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="no-products">
                    <p>No products matched your search.</p>
                </div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: "pointer" }}>

                            <div
                                className="wishlist-icon-btn"
                                onClick={(e) => { e.stopPropagation(); addToWishlist(product); toast.success("Added to Wishlist ❤️") }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 8 1.054 12.721-3.04 23.333 4.868 8 15z" />
                                </svg>
                            </div>

                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            <h3>{product.name}</h3>
                            <p>₹{product.price}</p>

                            <div className="product-actions">
                                <button
                                    className="add-to-cart-btn"
                                    onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                                >
                                    VIEW PRODUCT
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
