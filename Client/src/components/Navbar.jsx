import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./Navbar.css";

function Navbar() {

  const { cartCount } = useCart();

  const { wishlistCount } = useWishlist();

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">📚 BookVerse</Link>
      </div>

      <ul className="nav-links">

        <li>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>

        <li>
          <Link className="nav-link" to="/orders">
            Orders
          </Link>
        </li>

        <li>
          <Link className="nav-icon wishlist-icon" to="/wishlist">

            <FaHeart />

            {wishlistCount > 0 && (
              <span className="badge">
                {wishlistCount}
              </span>
            )}

          </Link>
        </li>

        <li>
          <Link className="nav-icon cart-icon" to="/cart">

            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="badge">
                {cartCount}
              </span>
            )}

          </Link>
        </li>

        <li>
          <Link
            className="nav-icon profile-icon"
            to="/profile"
          >
            <FaUser />
          </Link>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;