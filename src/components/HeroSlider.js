import { useState, useEffect } from "react";
import "./HeroSlider.css";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600",
    title: "UP TO 50% OFF",
    subtitle: "NEW ARRIVALS"
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600",
    title: "TRENDING NOW",
    subtitle: "SUMMER COLLECTION"
  }
];

function HeroSlider() {

  const [index, setIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="slider">

      <img src={slides[index].image} alt="" />

      <div className="slider-text">

        <h1>{slides[index].title}</h1>
        <h2>{slides[index].subtitle}</h2>

        <button>SHOP NOW</button>

      </div>

    </div>

  );
}

export default HeroSlider;
