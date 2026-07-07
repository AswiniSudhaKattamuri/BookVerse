import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./Navbar.css";

function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">

        <div className="logo">
          <Link to="/">📚 BookVerse</Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>

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
            <Link
              className="nav-icon wishlist-icon"
              to="/wishlist"
            >
              <FaHeart />

              {wishlistCount > 0 && (
                <span className="badge">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </li>

          <li>
            <Link
              className="nav-icon cart-icon"
              to="/cart"
            >
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


      <div
        className={`mobile-nav-overlay ${
          menuOpen ? "show" : ""
        }`}
        onClick={closeMenu}
      ></div>


      <div
        className={`mobile-nav-drawer ${
          menuOpen ? "open" : ""
        }`}
      >

        <div className="mobile-nav-header">

          <h2>📚 BookVerse</h2>

          <button onClick={closeMenu}>
            <FaTimes />
          </button>

        </div>


        <div className="mobile-nav-links">

          <Link to="/" onClick={closeMenu}>
            🏠 Home
          </Link>

          <Link to="/orders" onClick={closeMenu}>
            📦 My Orders
          </Link>

          <Link to="/wishlist" onClick={closeMenu}>
            <span>
              <FaHeart />
              Wishlist
            </span>

            {wishlistCount > 0 && (
              <strong>{wishlistCount}</strong>
            )}
          </Link>

          <Link to="/cart" onClick={closeMenu}>
            <span>
              <FaShoppingCart />
              Cart
            </span>

            {cartCount > 0 && (
              <strong>{cartCount}</strong>
            )}
          </Link>

          <Link to="/profile" onClick={closeMenu}>
            <span>
              <FaUser />
              Profile
            </span>
          </Link>

        </div>

      </div>
    </>
  );
}

export default Navbar;