import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Wishlist() {
    const { wishlist, removeFromWishlist } = useCart();
    const navigate = useNavigate();

    return (
        <div className="products-page" style={{ paddingTop: '40px' }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h1 style={{ fontSize: "36px", fontWeight: "900", letterSpacing: "2px" }}>MY WISHLIST</h1>
                <p style={{ color: "#7e818c" }}>{wishlist.length} items</p>
            </div>

            {wishlist.length === 0 ? (
                <div style={{ textAlign: "center", padding: "50px 0" }}>
                    <h3 style={{ color: "#282c3f", marginBottom: "10px" }}>Your wishlist is empty!</h3>
                    <p style={{ color: "#7e818c", marginBottom: "20px" }}>Save items that you like in your wishlist.</p>
                    <button
                        onClick={() => navigate("/")}
                        style={{ padding: "10px 30px", backgroundColor: "#ff3f6c", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                        CONTINUE SHOPPING
                    </button>
                </div>
            ) : (
                <div className="products-grid">
                    {wishlist.map(product => (
                        <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: "pointer" }}>
                            <div
                                className="wishlist-icon-btn"
                                onClick={(e) => { e.stopPropagation(); removeFromWishlist(product.id); toast.success("Removed from Wishlist") }}
                                style={{ color: "#ff3f6c" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
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

export default Wishlist;
