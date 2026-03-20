import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  // Load user on page load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    // Scroll effect for glassy navbar
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className={`mega-navbar ${scrolled ? "scrolled" : ""}`}>

      {/* LEFT: LOGO */}
      <div className="nav-left">
        <Link to="/" className="mega-logo">
          ZEN<span className="dot">.</span>
        </Link>
      </div>

      {/* CENTER: CATEGORY LINKS */}
      <div className="nav-center">
        <Link to="/shop/men" className="nav-link">MEN</Link>
        <Link to="/shop/women" className="nav-link">WOMEN</Link>
        <Link to="/shop/kids" className="nav-link">KIDS</Link>
        <Link to="/products/footwear" className="nav-link">FOOTWEAR</Link>
        <Link to="/products/beauty" className="nav-link">BEAUTY</Link>
        <Link to="/products/home" className="nav-link">HOME</Link>
        <Link to="/products/accessories" className="nav-link">ACCESSORIES</Link>
      </div>

      {/* RIGHT: ACTIONS (SEARCH, PROFILE, CART) */}
      <div className="nav-right">

        {/* Search */}
        <div className="mega-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for products, brands..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                navigate(`/search/${e.target.value.trim()}`);
                e.target.value = ''; // clear input after search
              }
            }}
          />
        </div>

        {/* Profile Dropdown */}
        <div className="mega-profile" onMouseLeave={() => setOpen(false)}>
          <div className="profile-trigger" onMouseEnter={() => setOpen(true)}>
            <span className="profile-icon">👤</span>
            <span className="profile-name">{user ? user.name.split(" ")[0] : "Profile"}</span>
          </div>

          {open && (
            <div className="mega-dropdown-wrapper">
              <div className="mega-dropdown">
                <div className="dropdown-header">
                  <h3>{user ? `Welcome, ${user.name}` : "Welcome"}</h3>
                  {user ? (
                    <Link to="/profile" className="manage-account-link" onClick={() => setOpen(false)}>
                      Manage your account
                    </Link>
                  ) : (
                    <p>To access account and manage orders</p>
                  )}
                  {!user && (
                    <button className="dropdown-login-btn" onClick={() => navigate("/login")}>
                      LOGIN / SIGNUP
                    </button>
                  )}
                </div>

                <div className="dropdown-links">
                  <Link to="/orders" onClick={() => setOpen(false)}>📦 Orders</Link>
                  <Link to="/wishlist" onClick={() => setOpen(false)}>❤️ Wishlist</Link>
                  <Link to="/about" onClick={() => setOpen(false)}>👨‍💻 About Me</Link>
                  <Link to="/contact" onClick={() => setOpen(false)}>📞 Contact Us</Link>
                  <Link to="/admin" onClick={() => setOpen(false)} className="admin-link">⚙️ Admin Dashboard</Link>
                </div>

                {user && (
                  <div className="dropdown-footer">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="mega-cart">
          <span className="cart-icon">🛍️</span>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          <span className="cart-text">Cart</span>
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
