import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import "./Checkout.css";

function Checkout() {

  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.qty || 0),
    0
  );

  const deliveryFee = totalPrice > 999 || totalPrice === 0 ? 0 : 99;
  const finalTotal = totalPrice + deliveryFee;

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [address, setAddress] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: ""
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    if (!address.name.trim()) return "Enter name";
    if (!address.email.trim()) return "Enter email";
    if (!/^[0-9]{10}$/.test(address.phone))
      return "Enter valid 10 digit phone";
    if (!address.addressLine.trim())
      return "Enter address";
    return null;
  };

  const saveOrder = async (paymentType, orderId) => {
    // 1. Create a safe mock timestamp for immediate local availability
    const newOrder = {
      id: orderId,
      items: cart,
      total: finalTotal,
      address: address,
      payment: paymentType,
      createdAt: { seconds: Math.floor(Date.now() / 1000) }
    };

    // 2. Save directly to localStorage immediately
    const userEmail = address.email;
    const existingOrders = JSON.parse(localStorage.getItem(`orders_${userEmail}`) || "[]");
    existingOrders.push(newOrder);
    localStorage.setItem(`orders_${userEmail}`, JSON.stringify(existingOrders));

    // 3. Attempt Firestore cloud save silently in background
    await setDoc(doc(db, "orders", orderId), {
      id: orderId,
      items: cart,
      total: finalTotal,
      address: address,
      payment: paymentType,
      createdAt: Timestamp.now()
    }).catch(err => {
      console.error("Firebase save failed:", err);
      toast.error("Cloud save failed, but saved locally.");
    });
  };

  const sendEmail = async (orderId) => {
    const orderDetails = cart
      .map(item => `${item.name} ─ Size: ${item.size || 'ONESIZE'} ─ (Qty: ${item.qty}) - ₹${item.price * item.qty}`)
      .join("\n");

    const emailPayload = {
      user_name: address.name,
      user_email: address.email,
      user_phone: address.phone,
      user_address: address.addressLine,
      total_amount: finalTotal,
      total_price: finalTotal,
      total: finalTotal,
      price: finalTotal,
      order_details: orderDetails,
      items: orderDetails,
      products: orderDetails,
      // Added invoice and order generation parameters
      invoice_id: orderId,
      order_id: orderId,
      invoice_date: new Date().toLocaleDateString(),
      company_email: "admin@zenstore.com", // Easily accessible in EmailJS template
    };

    try {
      // 1. Send Order Confirmation / Invoice to the Customer
      await emailjs.send(
        "service_wldmnxw",
        "template_5dwm1i5",
        emailPayload,
        "Z9JY-qsMVrnNEFCyg"
      );

      // 2. Send Invoice Copy to the Company
      await emailjs.send(
        "service_wldmnxw",
        "template_5dwm1i5",
        {
          ...emailPayload,
          // We swap the recipient to the admin email so the company natively gets the same email notification
          user_email: "admin@zenstore.com"
        },
        "Z9JY-qsMVrnNEFCyg"
      );
    } catch (err) {
      console.log("Email Error:", err);
    }
  };

  // 🔥 Razorpay Payment
  const payWithRazorpay = () => {

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    if (finalTotal <= 0) {
      toast.error("Invalid amount");
      return;
    }

    setLoading(true);

    const options = {
      key: "rzp_test_SHaRGPEFA4xvXQ",
      amount: finalTotal * 100,
      currency: "INR",
      name: "Zenstore",
      description: "Order Payment",

      handler: async function (response) {

        console.log("PAYMENT SUCCESS");

        try {
          const generatedOrderId = Math.random().toString(36).substr(2, 9).toUpperCase();
          saveOrder("UPI", generatedOrderId).catch(console.log);
          sendEmail(generatedOrderId).catch(console.log);
          clearCart();
        } catch (err) {
          console.log(err);
        }

        setLoading(false);

        // ✅ Correct React redirect
        setTimeout(() => {
          navigate("/order-success", { replace: true });
        }, 400);
      },

      modal: {
        ondismiss: function () {
          setLoading(false);
        }
      },

      theme: {
        color: "#ff3f6c"
      }
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function () {
      setLoading(false);
      toast.error("Payment Failed");
    });

    rzp.open();
  };

  const placeOrder = async () => {

    if (loading) return;

    if (cart.length === 0) {
      toast.error("Cart empty");
      return;
    }

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    if (paymentMethod === "cod") {

      try {
        setLoading(true);

        const generatedOrderId = Math.random().toString(36).substr(2, 9).toUpperCase();
        saveOrder("COD", generatedOrderId).catch(console.log);
        sendEmail(generatedOrderId).catch(console.log);
        clearCart();

        setLoading(false);

        navigate("/order-success", { replace: true });

      } catch (err) {
        console.log(err);
        setLoading(false);
      }

    } else {
      payWithRazorpay();
    }
  };

  return (
    <div className="checkout-page">

      <div className="checkout-left">
        <h2>Delivery Address</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="state" placeholder="State" onChange={handleChange} />
        <textarea name="addressLine" placeholder="Address" onChange={handleChange} />

        <h3>Payment Method</h3>

        <label>
          <input
            type="radio"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          Cash on Delivery
        </label>

        <br />

        <label>
          <input
            type="radio"
            checked={paymentMethod === "upi"}
            onChange={() => setPaymentMethod("upi")}
          />
          UPI / Razorpay
        </label>
      </div>

      <div className="checkout-right">
        <h3>Order Summary</h3>
        <div className="checkout-items">
          {cart.map((item, index) => (
            <div key={index} className="summary-row" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: '500' }}>{item.name}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Qty: {item.qty} {item.size ? `| Size: ${item.size}` : ''}</p>
              </div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>₹{item.price * item.qty}</p>
            </div>
          ))}
        </div>
        
        <div style={{ borderTop: '1px solid #ddd', margin: '15px 0', paddingTop: '15px' }}>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>{deliveryFee === 0 ? <span style={{ color: 'green' }}>FREE</span> : `₹${deliveryFee}`}</span>
          </div>
          <div className="summary-row total" style={{ fontSize: '20px', marginTop: '10px' }}>
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>
        </div>

        <button
          className="place-order-btn"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? "Processing..." : "PLACE ORDER"}
        </button>
      </div>

    </div>
  );
}

export default Checkout;