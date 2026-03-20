import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const CartContext =
  createContext();

export function CartProvider(
  { children }
) {

  const [cart, setCart] =
    useState(() => {

      const saved =
        localStorage.getItem("cart");

      return saved ? JSON.parse(saved) : [];
    });

  const [wishlist, setWishlist] =
    useState(() => {
      const savedWishlist = localStorage.getItem("wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    });


  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);


  const addToCart = (product) => {

    const identifier = product.cartId || product.id;
    const exist =
      cart.find(
        item =>
          (item.cartId || item.id) === identifier
      );

    if (exist) {

      setCart(
        cart.map(item =>
          (item.cartId || item.id) === identifier
            ? {
              ...item,
              qty:
                Number(item.qty) + 1
            }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          price:
            Number(product.price),
          qty: 1
        }
      ]);

    }

  };


  const removeFromCart =
    (id) => {

      setCart(
        cart.filter(
          item =>
            (item.cartId || item.id) !== id
        )
      );

    };


  const increaseQty =
    (id) => {

      setCart(
        cart.map(item =>
          (item.cartId || item.id) === id
            ? {
              ...item,
              qty:
                Number(item.qty) + 1
            }
            : item
        )
      );

    };


  const decreaseQty =
    (id) => {

      setCart(
        cart.map(item =>
          (item.cartId || item.id) === id &&
            item.qty > 1
            ? {
              ...item,
              qty:
                Number(item.qty) - 1
            }
            : item
        )
      );

    };


  const clearCart = () => {

    setCart([]);
  };

  const addToWishlist = (product) => {
    const exist = wishlist.find(item => item.id === product.id);
    if (!exist) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };


  const cartCount =
    cart.reduce(
      (total, item) =>
        total +
        Number(item.qty || 1),
      0
    );


  const cartTotal =
    cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
        Number(item.qty || 1),
      0
    );


  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        cartCount,
        cartTotal,
        wishlist,
        addToWishlist,
        removeFromWishlist
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export function useCart() {

  return useContext(
    CartContext
  );

}
