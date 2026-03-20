import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useCart();

  // SAFE CALCULATIONS
  const totalItems = cart.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
      Number(item.qty || 0),
    0
  );

  const deliveryFee =
    totalPrice > 999 || totalPrice === 0 ? 0 : 99;

  const finalTotal = totalPrice + deliveryFee;

  return (
    <div className="cart-page">
      {/* LEFT SIDE */}
      <div className="cart-left">
        <h2>
          Shopping Bag ({totalItems} items)
        </h2>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty Cart" style={{ width: '150px', marginBottom: '20px', opacity: 0.8 }} />
            <h3 style={{ color: '#282c3f', marginBottom: '10px' }}>Your cart is empty!</h3>
            <p style={{ color: '#7e818c', marginBottom: '20px' }}>Add items to it now.</p>
            <button onClick={() => navigate('/')} style={{ padding: '10px 30px', backgroundColor: '#ff3f6c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>SHOP NOW</button>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.cartId || item.id}
              className="cart-item"
            >
              <img
                src={item.image}
                alt={item.name}
                className="cart-image"
              />

              <div className="cart-details">
                <h3 onClick={() => navigate(`/product/${item.id}`)} style={{ cursor: "pointer", color: "#282c3f", ':hover': { color: "#ff3f6c" } }}>{item.name}</h3>
                <p style={{ margin: "5px 0", fontSize: "12px", color: "#535665" }}>Size: <strong>{item.size || "ONESIZE"}</strong></p>

                <p className="cart-price">
                  ₹{Number(item.price)}
                </p>

                <div className="cart-qty">
                  <button
                    onClick={() =>
                      decreaseQty(item.cartId || item.id)
                    }
                  >
                    −
                  </button>

                  <span>
                    {Number(item.qty)}
                  </span>

                  <button
                    onClick={() =>
                      increaseQty(item.cartId || item.id)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(item.cartId || item.id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="cart-right">
        <h3>Price Details</h3>

        <div className="summary-row">
          <span>
            Items ({totalItems})
          </span>
          <span>₹{totalPrice}</span>
        </div>

        <div className="summary-row">
          <span>Delivery</span>
          <span>
            {deliveryFee === 0
              ? "FREE"
              : `₹${deliveryFee}`}
          </span>
        </div>

        <hr />

        <div className="summary-row total">
          <span>Total Amount</span>
          <span>₹{finalTotal}</span>
        </div>

        <button
          className="place-order"
          disabled={cart.length === 0}
          onClick={() =>
            navigate("/checkout")
          }
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}

export default Cart;