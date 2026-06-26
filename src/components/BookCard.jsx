import "./BookCard.css";
import { useState } from "react";
import { addToWishlist, removeFromWishlist} from "../services/wishlistService";
import toast from "react-hot-toast";
import { Heart, ShoppingCart } from "lucide-react";
import { addToCart } from "../services/cartService";
function BookCard({ book,isWishlistPage=false, onRemove }) {
  const [liked, setLiked] = useState(isWishlistPage);

  const handleWishlist = async () => {
  try {
    if (liked) {
      await removeFromWishlist(book._id);
      setLiked(false);
      toast.success("Removed from Wishlist");

      if (onRemove) {
        onRemove();
      }
    } else {
      await addToWishlist(book._id);
      setLiked(true);
      toast.success("Added to Wishlist ");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};
const handleCart = async () => {
  try {
    await addToCart(book._id);
    toast.success("Added to Cart ");
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

          <button className="cart-btn" onClick={handleCart}>
  <ShoppingCart size={18} />
  <span>Add to Cart</span>
</button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;