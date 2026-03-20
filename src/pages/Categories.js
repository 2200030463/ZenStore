import "./Categories.css";

function Categories() {
  return (
    <div className="categories-page">

      {/* LEFT SIDEBAR */}
      <div className="sidebar">
        <h3>Categories</h3>

        <div className="sidebar-item">Men's Wear</div>
        <div className="sidebar-item">Women's Wear</div>
        <div className="sidebar-item">Kids Wear</div>
        <div className="sidebar-item">Footwear</div>
        <div className="sidebar-item">Beauty & Grooming</div>
        <div className="sidebar-item">Home & Living</div>
        <div className="sidebar-item">Accessories</div>
        <div className="sidebar-item">Jewellery</div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="main-content">

        <h2>In The Spotlight</h2>

        <div className="circle-grid">
          <div className="circle-card">What's New</div>
          <div className="circle-card">Valentine Shop</div>
          <div className="circle-card">Wedding Edit</div>
          <div className="circle-card">Hot Deals</div>
          <div className="circle-card">Budget Picks</div>
          <div className="circle-card">Top Rated</div>
        </div>

        <h2>Zenstore Universe</h2>

        <div className="circle-grid">
          <div className="circle-card">Luxe</div>
          <div className="circle-card">Trending</div>
          <div className="circle-card">International</div>
          <div className="circle-card">House of Brands</div>
        </div>

      </div>
    </div>
  );
}

export default Categories;
