import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../services/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartCount, setCartCount] = useState(0);

  const loadCartCount = async () => {
    try {

      const data = await getCart();

      setCartCount(data.cart?.items.length || 0);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    loadCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{
  cartCount,
  setCartCount,
  loadCartCount,
}}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);