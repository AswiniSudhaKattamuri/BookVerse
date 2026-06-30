import { createContext, useContext, useEffect, useState } from "react";
import { getWishlist } from "../services/wishlistService";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const [wishlistCount, setWishlistCount] = useState(0);

  const loadWishlistCount = async () => {
    try {

      const data = await getWishlist();

      setWishlistCount(
        data.wishlist?.books.length || 0
      );

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    loadWishlistCount();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistCount,
        setWishlistCount,
        loadWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);