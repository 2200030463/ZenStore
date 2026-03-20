import { useParams, useNavigate } from "react-router-dom";
import "./Department.css";

const departmentData = {
    men: {
        hero: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1600",
        title: "MEN'S FASHION",
        subtitle: "UP TO 50% OFF ON PREMIUM MENSWEAR",
        categories: [
            { name: "Shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400", link: "/products/shirts" },
            { name: "T-Shirts", image: "https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=400", link: "/products/tshirts" },
            { name: "Sweatshirts", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", link: "/products/sweatshirts" },
            { name: "Trousers", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", link: "/products/pants" },
            { name: "Shoes", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400", link: "/products/footwear" },
            { name: "Accessories", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400", link: "/products/accessories" }
        ],
        brands: [
            "NIKE",
            "ADIDAS",
            "PUMA",
            "TOMMY HILFIGER"
        ]
    },
    women: {
        hero: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600",
        title: "WOMEN'S FASHION",
        subtitle: "TRENDING STYLES REDEFINED",
        categories: [
            { name: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", link: "/products/women" },
            { name: "Tops", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400", link: "/products/women" },
            { name: "Jewellery", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400", link: "/products/jewellery" },
            { name: "Beauty", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", link: "/products/beauty" },
            { name: "Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400", link: "/products/footwear" },
            { name: "Handbags", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400", link: "/products/handbags" }
        ],
        brands: [
            "ZARA",
            "H&M",
            "MAC",
            "MANGO"
        ]
    },
    kids: {
        hero: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1600",
        title: "KIDS' FASHION",
        subtitle: "CUTE, COMFY, AND PLAYFUL",
        categories: [
            { name: "Boys T-Shirts", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400", link: "/products/kids" },
            { name: "Girls Dresses", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=400", link: "/products/kids" },
            { name: "Infant Care", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400", link: "/products/kids" },
            { name: "Toys & Games", image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400", link: "/products/kids" }
        ],
        brands: [
            "DISNEY",
            "MOTHERCARE",
            "GAP KIDS",
            "CARTERS"
        ]
    }
};

function Department() {
    const { dept } = useParams();
    const navigate = useNavigate();

    // Route fallback if category doesn't match
    const data = departmentData[dept] || departmentData["men"];

    return (
        <div className="department-page">

            {/* MEGA HERO BANNER */}
            <div className="dept-hero" style={{ backgroundImage: `url(${data.hero})` }}>
                <div className="dept-hero-overlay">
                    <h1 className="dept-title">{data.title}</h1>
                    <p className="dept-subtitle">{data.subtitle}</p>
                </div>
            </div>

            {/* CATEGORIES TO BAG - MYNTRA CIRCLE CARDS */}
            <section className="dept-section">
                <h2 className="dept-section-title">CATEGORIES TO BAG</h2>
                <div className="dept-categories">
                    {data.categories.map((cat, index) => (
                        <div className="dept-circle-card" key={index} onClick={() => navigate(cat.link)}>
                            <div className="dept-circle-img">
                                <img src={cat.image} alt={cat.name} />
                            </div>
                            <h3>{cat.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* BIGGEST DEALS BANNER */}
            <section className="dept-section deals-section">
                <h2 className="dept-section-title">BIGGEST DEALS ON TOP BRANDS</h2>
                <div className="deals-grid">
                    <div className="deal-card" onClick={() => navigate(data.categories[0].link)}>
                        <div className="deal-info">
                            <h4>Casual Wear</h4>
                            <p>MIN 40% OFF</p>
                        </div>
                    </div>
                    <div className="deal-card" onClick={() => navigate(data.categories[1].link)}>
                        <div className="deal-info">
                            <h4>Premium Picks</h4>
                            <p>MIN 50% OFF</p>
                        </div>
                    </div>
                    <div className="deal-card" onClick={() => navigate(data.categories[2].link)}>
                        <div className="deal-info">
                            <h4>Activewear</h4>
                            <p>FLAT 30% OFF</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPLORE TOP BRANDS */}
            <section className="dept-section brands-section">
                <h2 className="dept-section-title">EXPLORE TOP BRANDS</h2>
                <div className="brands-grid">
                    {data.brands.map((brandInfo, index) => (
                        <div className="brand-card" key={index}>
                            <h3 className="brand-text-logo">{brandInfo}</h3>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default Department;
