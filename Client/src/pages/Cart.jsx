import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../services/cartService";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
  }, []);
  const { loadCartCount } = useCart();

  const fetchCart = async () => {
  try {
    const data = await getCart();

    setCartItems(data.cart?.items || []);

    await loadCartCount();   // <-- Update Navbar count

  } catch (error) {
    console.log(error);
  }
};

  const increaseQuantity = async (bookId, quantity) => {
    await updateCartQuantity(bookId, quantity + 1);
    fetchCart();
  };

  const decreaseQuantity = async (bookId, quantity) => {
    if (quantity <= 1) return;

    await updateCartQuantity(bookId, quantity - 1);
    fetchCart();
  };

  const handleRemove = async (bookId) => {
    await removeFromCart(bookId);
    fetchCart();
  };

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  const discount = Math.floor(subtotal * 0.1); // 10% demo discount
  const deliveryCharge = 0;
  const total = subtotal - discount + deliveryCharge;

  return (
    <>
      <Navbar />

      <div className="cart-container">
        {/* Left Section */}
        <div className="cart-left">
          <h2 className="cart-heading">
            🛒 My Cart ({totalItems} items)
          </h2>

          {cartItems.length === 0 ? (
            <h3 className="empty-cart">Your cart is empty.</h3>
          ) : (
            cartItems.map((item) => (
              <div className="cart-card" key={item.book._id}>
                <img
                  src={item.book.image}
                  alt={item.book.title}
                  className="cart-image"
                />

                <div className="cart-details">
                  <h3>{item.book.title}</h3>

                  <p className="author">{item.book.author}</p>

                  <h4>₹{item.book.price}</h4>

                  <p className="delivery">
                    🚚 Free Delivery
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.book._id,
                          item.quantity
                        )
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.book._id,
                          item.quantity
                        )
                      }
                    >
                      +
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        handleRemove(item.book._id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Section */}
        <div className="cart-right">
          <h2 className="price-heading">PRICE DETAILS</h2>

          <div className="summary-row">
            <span>Price ({totalItems} items)</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span className="green">- ₹{discount}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Charges</span>
            <span className="green">FREE</span>
          </div>

          <hr />

          <div className="summary-row total-row">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>

          <hr />

          <p className="saving-text">
            🎉 You saved ₹{discount} on this order
          </p>

          <button
  className="checkout-button"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>
        </div>
      </div>
    </>
  );
}

export default Cart;