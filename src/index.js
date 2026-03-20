import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/* CART CONTEXT */
import { CartProvider } from "./context/CartContext";

/* GLOBAL CSS */
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
