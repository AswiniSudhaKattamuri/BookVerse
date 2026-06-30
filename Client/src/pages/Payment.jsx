import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { getCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";
import "./Payment.css";
import { useCart } from "../context/CartContext";
import QRCode from "react-qr-code";
function Payment() {

  const navigate = useNavigate();
  const { setCartCount } = useCart();

  const [cart, setCart] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState(
    "Cash on Delivery"
  );

  const [loading, setLoading] = useState(false);

  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvv, setCvv] = useState("");

  const [cardHolder, setCardHolder] = useState("");

  const [bank, setBank] = useState("");

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {

      const data = await getCart();

      setCart(data.cart?.items || []);

    } catch (error) {

      console.log(error);

    }
  };

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.book.price * item.quantity,
    0
  );

  const delivery = subtotal > 999 ? 0 : 50;

  const discount = Math.floor(subtotal * 0.1);

  const total = subtotal + delivery - discount;

  const handlePayment = async () => {

    if (
      paymentMethod === "UPI" &&
      !upiId.trim()
    ) {

      toast.error("Enter your UPI ID");

      return;

    }

    if (
      paymentMethod === "Credit / Debit Card"
    ) {

      if (
        !cardNumber ||
        !expiry ||
        !cvv ||
        !cardHolder
      ) {

        toast.error(
          "Fill all card details"
        );

        return;

      }

    }

    if (
      paymentMethod === "Net Banking" &&
      !bank
    ) {

      toast.error(
        "Select your bank"
      );

      return;

    }

    try {

      setLoading(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      await placeOrder(paymentMethod);

setCartCount(0);
switch (paymentMethod) {

  case "Cash on Delivery":
    toast.success("Order Placed Successfully 📦");
    break;

  case "UPI":
    toast.success("UPI Payment Successful 🎉");
    break;

  case "Credit / Debit Card":
    toast.success("Card Payment Successful 💳");
    break;

  case "Net Banking":
    toast.success("Bank Payment Successful 🏦");
    break;

  default:
    toast.success("Order Successful 🎉");
}

navigate("/order-success");
    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Payment Failed"
      );

    } finally {

      setLoading(false);

    }
  };

   return (
    <>
      <Navbar />

      <div className="payment-page">

        <div className="payment-left">

          <h2>Select Payment Method</h2>

          <label className="payment-option">
            <input
              type="radio"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            <div>
              <h3>📦 Cash on Delivery</h3>
              <p>Pay when your books arrive.</p>
            </div>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            <div>
              <h3>📱 UPI</h3>
              <p>Google Pay, PhonePe, Paytm...</p>
            </div>
          </label>

          {paymentMethod === "UPI" && (
            <div className="payment-input">

              {paymentMethod === "UPI" && (

<div className="upi-box">

<h3>Scan QR to Pay</h3>

<div className="qr-container">

<QRCode
value={`upi://pay?pa=bookverse@oksbi&pn=BookVerse&am=${total}&cu=INR`}
size={180}
/>

</div>

<p>

UPI ID

<strong>

bookverse@oksbi

</strong>

</p>

</div>

)}

            </div>
          )}

          <label className="payment-option">
            <input
              type="radio"
              value="Credit / Debit Card"
              checked={
                paymentMethod ===
                "Credit / Debit Card"
              }
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />

            <div>

              <h3>💳 Credit / Debit Card</h3>

              <p>
                Visa • MasterCard • RuPay
              </p>

            </div>

          </label>

          {paymentMethod ===
            "Credit / Debit Card" && (

            <div className="card-form">

              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(e.target.value)
                }
              />

              <div className="card-row">

                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) =>
                    setExpiry(e.target.value)
                  }
                />

                <input
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value)
                  }
                />

              </div>

              <input
                type="text"
                placeholder="Card Holder Name"
                value={cardHolder}
                onChange={(e) =>
                  setCardHolder(e.target.value)
                }
              />

            </div>

          )}

          <label className="payment-option">

            <input
              type="radio"
              value="Net Banking"
              checked={
                paymentMethod ===
                "Net Banking"
              }
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />

            <div>

              <h3>🏦 Net Banking</h3>

              <p>All major banks supported</p>

            </div>

          </label>

          {paymentMethod ===
            "Net Banking" && (

            <div className="payment-input">

              <select
                value={bank}
                onChange={(e) =>
                  setBank(e.target.value)
                }
              >

                <option value="">
                  Select Bank
                </option>

                <option>SBI</option>

                <option>HDFC</option>

                <option>ICICI</option>

                <option>Axis Bank</option>

                <option>Kotak</option>

              </select>

            </div>

          )}

        </div>

        <div className="payment-right">

          <h2>Order Summary</h2>

          {cart.map((item) => (

            <div
              className="summary-item"
              key={item.book._id}
            >

              <img
                src={item.book.image}
                alt={item.book.title}
              />

              <div>

                <h4>
                  {item.book.title}
                </h4>

                <p>
                  ₹{item.book.price}
                  {" × "}
                  {item.quantity}
                </p>

              </div>

            </div>

          ))}

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>
              {delivery === 0
                ? "FREE"
                : `₹${delivery}`}
            </span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span>- ₹{discount}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

         <button
  className="pay-btn"
  onClick={handlePayment}
  disabled={loading}
>
  {loading ? (
    <>
      <span className="loader"></span>
      Processing Payment...
    </>
  ) : (
    <>
      <span className="shine"></span>
      ✨ PLACE ORDER
    </>
  )}
</button>

        </div>

      </div>

    </>
  );
}

export default Payment;