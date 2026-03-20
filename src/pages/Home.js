import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* HIGH END FASHION HERO (Snitch/Zara style) */}
      <section className="fashion-hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
          poster="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=2000"
        >
          {/* We use a stunning fashion image sequence as fallback for Snitch/Zara feel since video might not be local */}
        </video>
        <div className="hero-video-fallback"></div>
        <div className="fashion-hero-content">
          <h1 className="fashion-title">THE NEW ORIGINALS</h1>
          <p className="fashion-subtitle">Autumn / Winter '26 Collection</p>
          <div className="fashion-actions">
            <button className="btn-dark-solid" onClick={() => navigate("/shop/men")}>SHOP MEN</button>
            <button className="btn-light-solid" onClick={() => navigate("/shop/women")}>SHOP WOMEN</button>
          </div>
        </div>
      </section>

      {/* TRENDING NOW SCROLLER */}
      <section className="trending-section">
        <div className="section-title-center">
          <h2>TRENDING NOW</h2>
        </div>
        <div className="trending-scroller">
          <div className="trend-card" onClick={() => navigate("/products/shirts")}>
            <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600" alt="Casual Shirts" />
            <div className="trend-info">
              <h3>RELAXED SHIRTS</h3>
              <p>Explore →</p>
            </div>
          </div>
          <div className="trend-card" onClick={() => navigate("/products/tshirts")}>
            <img src="https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=600" alt="Oversized" />
            <div className="trend-info">
              <h3>OVERSIZED TEES</h3>
              <p>Explore →</p>
            </div>
          </div>
          <div className="trend-card" onClick={() => navigate("/products/sweatshirts")}>
            <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600" alt="Sweatshirts" />
            <div className="trend-info">
              <h3>ESSENTIAL HOODIES</h3>
              <p>Explore →</p>
            </div>
          </div>
          <div className="trend-card" onClick={() => navigate("/products/accessories")}>
            <img src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600" alt="Accessories" />
            <div className="trend-info">
              <h3>ACCESSORIES</h3>
              <p>Explore →</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS SPLIT BANNER (H&M Style) */}
      <section className="hm-split-banner">
        <div className="split-half dark-half" onClick={() => navigate("/products/footwear")}>
          <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800" alt="Footwear" className="split-bg" />
          <div className="split-text">
            <h2>FRESH KICKS</h2>
            <span>Shop Footwear</span>
          </div>
        </div>
        <div className="split-half light-half" onClick={() => navigate("/products/jewellery")}>
          <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800" alt="Jewellery" className="split-bg" />
          <div className="split-text">
            <h2>MINIMAL METALS</h2>
            <span>Shop Jewellery</span>
          </div>
        </div>
      </section>

      {/* SHOP BY DEPARTMENT GRID */}
      <section className="department-section">
        <div className="section-title-center">
          <h2>SHOP BY DEPARTMENT</h2>
        </div>
        <div className="department-grid">
          <div className="dept-item" onClick={() => navigate("/shop/men")}>MEN</div>
          <div className="dept-item" onClick={() => navigate("/shop/women")}>WOMEN</div>
          <div className="dept-item" onClick={() => navigate("/shop/kids")}>KIDS</div>
          <div className="dept-item" onClick={() => navigate("/products/beauty")}>BEAUTY</div>
          <div className="dept-item" onClick={() => navigate("/products/home")}>HOME</div>
        </div>
      </section>

      {/* PREMIUM FAST FASHION FOOTER (Snitch / Myntra inspired) */}
      <footer className="fashion-footer">
        <div className="footer-top-row">
          <div className="footer-column">
            <h3>ONLINE SHOPPING</h3>
            <p onClick={() => navigate("/shop/men")}>Men</p>
            <p onClick={() => navigate("/shop/women")}>Women</p>
            <p onClick={() => navigate("/shop/kids")}>Kids</p>
            <p onClick={() => navigate("/products/home")}>Home & Living</p>
            <p onClick={() => navigate("/products/beauty")}>Beauty</p>
          </div>
          <div className="footer-column">
            <h3>CUSTOMER POLICIES</h3>
            <p onClick={() => navigate("/contact")}>Contact Us</p>
            <p onClick={() => navigate("/contact")}>FAQ</p>
            <p onClick={() => navigate("/contact")}>T&C</p>
            <p onClick={() => navigate("/contact")}>Terms Of Use</p>
            <p onClick={() => navigate("/orders")}>Track Orders</p>
            <p onClick={() => navigate("/contact")}>Shipping</p>
            <p onClick={() => navigate("/orders")}>Cancellation</p>
            <p onClick={() => navigate("/orders")}>Returns</p>
          </div>
          <div className="footer-column">
            <h3>EXPERIENCE ZENSTORE APP</h3>
            <div className="app-buttons">
              <button className="download-btn">Get it on Google Play</button>
              <button className="download-btn">Download on App Store</button>
            </div>
            <h3 style={{ marginTop: "30px" }}>KEEP IN TOUCH</h3>
            <div className="social-icons">
              <span>FB</span>
              <span>IG</span>
              <span>TW</span>
              <span>YT</span>
            </div>
          </div>
          <div className="footer-column guarantees">
            <div className="guarantee-item">
              <strong>100% ORIGINAL</strong> guarantee for all products at zenstore.com
            </div>
            <div className="guarantee-item">
              <strong>Return within 14 days</strong> of receiving your order
            </div>
          </div>
        </div>

        <div className="footer-search-tags">
          <strong>POPULAR SEARCHES</strong>
          <p>Makeup | Dresses For Girls | T-Shirts | Sandals | Headphones | Babydolls | Blazers For Men | Handbags | Ladies Watches | Bags | Sport Shoes | Reebok Shoes | Puma Shoes | Boxers | Wallets | Tops | Earrings | Fastrack Watches | Kurtis | Nike | Smart Watches | Titan Watches | Designer Blouse | Gowns | Rings</p>
        </div>

        <div className="footer-copyright">
          <p>In case of any concern, Contact Us</p>
          <p>© {new Date().getFullYear()} www.zenstore.com. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default Home;
