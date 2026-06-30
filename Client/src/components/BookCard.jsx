import "./BookCard.css";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { addToWishlist, removeFromWishlist} from "../services/wishlistService";
import toast from "react-hot-toast";
import { Heart, ShoppingCart } from "lucide-react";
import { addToCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
function BookCard({ book,isWishlistPage=false, onRemove }) {
  const [liked, setLiked] = useState(isWishlistPage);
  const { cartCount, setCartCount } = useCart();
  const [added, setAdded] = useState(false);
  

const { wishlistCount, setWishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleWishlist = async () => {
  try {

    if (liked) {

      await removeFromWishlist(book._id);

      setLiked(false);

      setWishlistCount(Math.max(wishlistCount - 1, 0));

      toast.success("Removed from Wishlist");

      if (onRemove) {
        onRemove();
      }

    } else {

      await addToWishlist(book._id);

      setLiked(true);

      setWishlistCount(wishlistCount + 1);

      toast.success("Added to Wishlist ❤️");

    }

  } catch (error) {

    toast.error("Something went wrong");

  }
};
const handleBuyNow = async () => {
  try {

    await addToCart(book._id);

    navigate("/checkout");

  } catch (error) {

    toast.error("Unable to proceed");

  }
};
const handleCart = async () => {

  if (added) {
    toast("Already in Cart 🛒");
    return;
  }

  try {

    await addToCart(book._id);

    setAdded(true);

    setCartCount((prev) => prev + 1);

    toast.success("Added to Cart 🛒");

  } catch (error) {

    toast.error("Failed to add to Cart");

  }

};

  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} className="book-image" />

      <div className="book-content">
        <h3>{book.title}</h3>
        <p className="author">{book.author}</p>
        <p className="price">₹{book.price}</p>

        <div className="card-actions">

  <button
    className={`wishlist-btn ${liked ? "active" : ""}`}
    onClick={handleWishlist}
  >
    <Heart
      size={20}
      fill={liked ? "#ef4444" : "none"}
      color={liked ? "#ef4444" : "#ffffff"}
    />
  </button>

  <button
  className={`cart-btn ${added ? "added-btn" : ""}`}
  onClick={handleCart}
>
  {added ? (
    <>
      ✅ <span>Added</span>
    </>
  ) : (
    <>
      <ShoppingCart size={16}/>
      <span>Add</span>
    </>
  )}
</button>

  <button
    className="buy-btn"
    onClick={handleBuyNow}
  >
    ⚡ Buy
  </button>

</div>
</div>
</div>
  );
}

export default BookCard;