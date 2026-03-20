import { useNavigate } from "react-router-dom";

function Men() {

  const navigate = useNavigate();

  const categories = [
    {
      name: "Shirts",
      key: "shirts",
      image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400"
    },
    {
      name: "T-Shirts",
      key: "tshirts",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
    },
    {
      name: "Sweatshirts",
      key: "sweatshirts",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"
    },
    {
      name: "Pants",
      key: "pants",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"
    },
    {
      name: "Shoes",
      key: "shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    }
  ];

  return (

    <div className="home">

      <h2>Men Categories</h2>

      <div className="product-grid">

        {categories.map(cat => (

          <div
            className="product-card"
            key={cat.key}
            onClick={() => navigate(`/products/${cat.key}`)}
            style={{ cursor: "pointer" }}
          >

            <img src={cat.image} alt={cat.name} />

            <h3>{cat.name}</h3>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Men;
