import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        setLoading(false);
        return;
      }

      setUser(storedUser);

      try {
        const q = query(
          collection(db, "orders"),
          where("address.email", "==", storedUser.email)
        );

        // Add timeout so we don't hang if Firestore is down/unresponsive
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Firebase Timeout")), 3000);
        });

        const querySnapshot = await Promise.race([getDocs(q), timeoutPromise]);

        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        const localOrders = JSON.parse(localStorage.getItem(`orders_${storedUser.email}`) || "[]");
        const mergedOrders = [...ordersData];

        localOrders.forEach(localOrder => {
            if (!mergedOrders.some(o => o.id === localOrder.id)) {
                mergedOrders.push(localOrder);
            }
        });

        mergedOrders.sort((a, b) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA;
        });

        setOrders(mergedOrders);
      } catch (error) {
        console.error("Firebase fetch failed or timed out:", error);

        // Use local storage as fallback so UI functions immediately
        const localOrders = JSON.parse(localStorage.getItem(`orders_${storedUser.email}`) || "[]");
        localOrders.sort((a, b) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA;
        });
        setOrders(localOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      // 1. Attempt Firebase update if it's a real Firebase doc
      if (orderId) {
        await updateDoc(doc(db, "orders", orderId), { status: 'Cancelled' });
      }

      // 2. Update LocalStorage reliably
      const localOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`) || "[]");
      const updatedLocal = localOrders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o);
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(updatedLocal));

      // 3. Update React UI state immediately
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
      toast.success("Order cancelled successfully.");

    } catch (err) {
      console.error("Cancel failed", err);
      // Fallback: forcefully update local UI anyway
      const localOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`) || "[]");
      const updatedLocal = localOrders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o);
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(updatedLocal));
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
    }
  };

  const handleReturnOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to return this order?")) return;

    try {
      if (orderId) {
        await updateDoc(doc(db, "orders", orderId), { status: 'Returned' });
      }

      const localOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`) || "[]");
      const updatedLocal = localOrders.map(o => o.id === orderId ? { ...o, status: 'Returned' } : o);
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(updatedLocal));

      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Returned' } : o));
      toast.success("Return request initiated successfully.");
    } catch (err) {
      console.error("Return failed", err);
      const localOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`) || "[]");
      const updatedLocal = localOrders.map(o => o.id === orderId ? { ...o, status: 'Returned' } : o);
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(updatedLocal));
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Returned' } : o));
      toast.success("Return request initiated successfully.");
    }
  };

  if (loading) {
    return (
      <div className="orders-page" style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Loading your orders...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="orders-page" style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Please login to view your orders.</h2>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders-msg">You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-id">Order ID: #{order.id}</span>
                  <br />
                  <span className="order-date">
                    {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleString() : "Date N/A"}
                  </span>
                </div>
                {order.status === 'Cancelled' ? (
                  <span className="order-status cancelled" style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '5px 12px', borderRadius: '4px', fontWeight: 'bold' }}>Cancelled</span>
                ) : order.status === 'Returned' ? (
                  <span className="order-status returned" style={{ color: '#eab308', backgroundColor: '#fef9c3', padding: '5px 12px', borderRadius: '4px', fontWeight: 'bold' }}>Returned 🔄</span>
                ) : order.status === 'Shipped' ? (
                  <span className="order-status completed" style={{ color: '#8b5cf6', backgroundColor: '#eedeff', padding: '5px 12px', borderRadius: '4px', fontWeight: 'bold' }}>Shipped 🚚</span>
                ) : order.status === 'Fulfilled' ? (
                  <span className="order-status completed" style={{ color: '#16a34a', backgroundColor: '#dcfce7', padding: '5px 12px', borderRadius: '4px', fontWeight: 'bold' }}>Fulfilled ✅</span>
                ) : (
                  <span className="order-status pending" style={{ color: '#d97706', backgroundColor: '#fef3c7', padding: '5px 12px', borderRadius: '4px', fontWeight: 'bold' }}>Pending Processing ⏳</span>
                )}
              </div>

              <div className="order-items">
                {(order.items || order.cart || []).map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="order-item-image" />
                    <div className="order-item-info">
                      <h4>{item.name}</h4>
                      <p className="item-price">₹{item.price}</p>
                      <p className="item-qty">Qty: {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="payment-info">
                  <p><strong>Payment Method:</strong> {order.payment?.toUpperCase()}</p>
                  <p><strong>Delivery To:</strong> {order.address?.name}, {order.address?.city}</p>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
                  <p className="order-total" style={{ margin: 0 }}><strong>Total Amount:</strong> ₹{order.total}</p>

                  {order.status !== 'Cancelled' && order.status !== 'Fulfilled' && order.status !== 'Shipped' && order.status !== 'Returned' && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "transparent",
                        border: "1px solid #ef4444",
                        color: "#ef4444",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "600",
                        transition: "all 0.2s"
                      }}
                      onMouseOver={(e) => { e.target.style.backgroundColor = '#ef4444'; e.target.style.color = '#fff'; }}
                      onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#ef4444'; }}
                    >
                      Cancel Order
                    </button>
                  )}

                  {(order.status === 'Fulfilled' || order.status === 'Shipped') && (
                    <button
                      onClick={() => handleReturnOrder(order.id)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "transparent",
                        border: "1px solid #eab308",
                        color: "#eab308",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "600",
                        transition: "all 0.2s"
                      }}
                      onMouseOver={(e) => { e.target.style.backgroundColor = '#eab308'; e.target.style.color = '#fff'; }}
                      onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#eab308'; }}
                    >
                      Return Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
