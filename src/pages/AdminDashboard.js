import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, getDocs, updateDoc, doc } from "firebase/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import "./AdminDashboard.css";

function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const q = query(collection(db, "orders"));

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Firebase Timeout")), 3000);
            });

            const querySnapshot = await Promise.race([getDocs(q), timeoutPromise]);
            const ordersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            const localKeys = Object.keys(localStorage).filter(k => k.startsWith('orders_'));
            let allLocalOrders = [];
            localKeys.forEach(k => {
                allLocalOrders = [...allLocalOrders, ...JSON.parse(localStorage.getItem(k) || "[]")];
            });

            const mergedOrders = [...ordersData];
            allLocalOrders.forEach(localOrder => {
                if (!mergedOrders.some(o => o.id === localOrder.id)) {
                    mergedOrders.push(localOrder);
                }
            });

            // Sort by creation date
            mergedOrders.sort((a, b) => {
                const timeA = a.createdAt?.seconds || 0;
                const timeB = b.createdAt?.seconds || 0;
                return timeB - timeA;
            });

            setOrders(mergedOrders);
        } catch (error) {
            console.error("Fetch failed:", error);
            // Fallback
            const localKeys = Object.keys(localStorage).filter(k => k.startsWith('orders_'));
            let allLocalOrders = [];
            localKeys.forEach(k => {
                allLocalOrders = [...allLocalOrders, ...JSON.parse(localStorage.getItem(k) || "[]")];
            });
            allLocalOrders.sort((a, b) => {
                const timeA = a.createdAt?.seconds || 0;
                const timeB = b.createdAt?.seconds || 0;
                return timeB - timeA;
            });
            setOrders(allLocalOrders);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, localEmail, newStatus) => {
        try {
            if (orderId) {
                // Likely a Firebase ID
                await updateDoc(doc(db, "orders", orderId), { status: newStatus });
            }

            // Update locally
            if (localEmail) {
                const existing = JSON.parse(localStorage.getItem(`orders_${localEmail}`) || "[]");
                const updated = existing.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
                localStorage.setItem(`orders_${localEmail}`, JSON.stringify(updated));
            }

            // Update UI
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            toast.success(`Order successfully marked as ${newStatus}!`);

        } catch (err) {
            console.error("Update failed", err);
            // Update locally anyway
            if (localEmail) {
                const existing = JSON.parse(localStorage.getItem(`orders_${localEmail}`) || "[]");
                const updated = existing.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
                localStorage.setItem(`orders_${localEmail}`, JSON.stringify(updated));
                setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            }
            toast.success(`Order locally marked as ${newStatus}!`);
        }
    };

    const generateInvoice = (order) => {
        const pdf = new jsPDF();

        pdf.setFontSize(22);
        pdf.text("Zenstore - Official Invoice", 14, 20);

        pdf.setFontSize(12);
        pdf.text(`Order ID: #${order.id}`, 14, 35);
        pdf.text(`Date: ${order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : new Date().toLocaleDateString()}`, 14, 42);
        pdf.text(`Customer Name: ${order.address?.name || 'N/A'}`, 14, 49);
        pdf.text(`Customer Email: ${order.address?.email || 'N/A'}`, 14, 56);
        pdf.text(`Payment Method: ${order.payment || 'N/A'}`, 14, 63);

        const orderItems = order.items || order.cart || [];
        const tableData = orderItems.map(item => [
            `${item.name} (${item.size || 'ONESIZE'})`,
            item.qty,
            `Rs. ${item.price}`,
            `Rs. ${item.price * item.qty}`
        ]);

        autoTable(pdf, {
            startY: 75,
            head: [['Product Name', 'Quantity', 'Unit Price', 'Total']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [40, 44, 63] } // Dark Grey to match Zenstore theme
        });

        const finalY = pdf.lastAutoTable.finalY || 75;
        pdf.setFontSize(14);
        pdf.text(`Total Amount Paid: Rs. ${order.total || 0}`, 14, finalY + 15);

        // Output footer
        pdf.setFontSize(10);
        pdf.text("Thank you for shopping with Zenstore!", 14, finalY + 30);

        pdf.save(`Zenstore_Invoice_${order.id}.pdf`);
        toast.success(`Invoice generated for Order #${order.id}`);
    };

    if (loading) {
        return <div className="admin-page"><h2 style={{ marginTop: "100px" }}>Loading Orders System...</h2></div>;
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Command Center ERP</h1>
                <p>Operations, Traceability, and Fulfillment Management</p>
            </div>

            <div className="admin-stats">
                <div className="stat-box">
                    <h3>{orders.length}</h3>
                    <p>Total Orders</p>
                </div>
                <div className="stat-box">
                    <h3>₹{orders.reduce((sum, o) => sum + (o.total || 0), 0)}</h3>
                    <p>Gross Revenue</p>
                </div>
                <div className="stat-box">
                    <h3>{orders.filter(o => o.status === 'Fulfilled').length}</h3>
                    <p>Fulfilled</p>
                </div>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td className="admin-order-id">#{order.id?.substring(0, 8)}</td>
                                <td>
                                    <div className="customer-info">
                                        <strong>{order.address?.name}</strong>
                                        <span>{order.address?.email}</span>
                                    </div>
                                </td>
                                <td>{order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : "N/A"}</td>
                                <td>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px' }}>
                                        {(order.items || order.cart || []).map((item, idx) => (
                                            <li key={idx} style={{ marginBottom: '4px' }}>
                                                {item.qty}x {item.name} {item.size ? `(${item.size})` : ''} - ₹{item.price * item.qty}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <span className={`status-badge ${order.status === 'Cancelled' ? 'cancelled' : order.status === 'Fulfilled' ? 'fulfilled' : order.status === 'Shipped' ? 'shipped' : 'pending'}`}>
                                        {order.status === 'Cancelled' ? 'Cancelled' : order.status === 'Fulfilled' ? "Fulfilled" : order.status === 'Shipped' ? "Shipped" : "Pending Processing"}
                                    </span>
                                </td>
                                <td className="admin-amount">₹{order.total}</td>
                                <td className="admin-actions">
                                    {order.status !== 'Fulfilled' && order.status !== 'Shipped' && order.status !== 'Cancelled' && (
                                        <button
                                            className="btn-fulfill"
                                            onClick={() => updateOrderStatus(order.id, order.address?.email, 'Fulfilled')}
                                        >
                                            Fulfill 🚀
                                        </button>
                                    )}
                                    {order.status === 'Fulfilled' && (
                                        <button
                                            className="btn-dispatch"
                                            onClick={() => updateOrderStatus(order.id, order.address?.email, 'Shipped')}
                                            style={{ backgroundColor: '#8b5cf6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', margin: '0 5px' }}
                                        >
                                            Dispatch 📦
                                        </button>
                                    )}
                                    <button className="btn-invoice" onClick={() => generateInvoice(order)}>
                                        📄 Invoice
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
