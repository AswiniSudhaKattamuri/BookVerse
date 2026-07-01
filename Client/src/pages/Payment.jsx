import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { getCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";
import "./Payment.css";
import { useCart } from "../context/CartContext";
import OTPModal from "../components/OTPModal";
import UPIModal from "../components/UPIModal";
function Payment() {

  const navigate = useNavigate();
  const { setCartCount } = useCart();

  const [cart, setCart] = useState([]);
  const [showUPI,setShowUPI]=useState(false);
const [showOTPModal, setShowOTPModal] = useState(false);
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

  const [showBankLogin, setShowBankLogin] = useState(false);

const [bankUsername, setBankUsername] = useState("");

const [bankPassword, setBankPassword] = useState("");


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
  const handleRealPayment = async () => {

  try {

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Before placeOrder");

    await placeOrder(paymentMethod);

    console.log("After placeOrder");

    setCartCount(0);

    toast.success("Payment Successful 🎉");

    navigate("/order-success");

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message || "Payment Failed"
    );

  } finally {

    setLoading(false);

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

  if (paymentMethod === "UPI") {

    setShowUPI(true);

    return;

  }

  if (paymentMethod === "Credit / Debit Card") {

    if (
      !cardNumber ||
      !expiry ||
      !cvv ||
      !cardHolder
    ) {

      toast.error("Fill all card details");

      return;

    }

    setShowOTPModal(true);


    return;

  }

  if (paymentMethod === "Net Banking") {

    if (!bank) {

      toast.error("Select your bank");

      return;

    }

    setShowBankLogin(true);

    return;

  }

  await handleRealPayment();

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
      {paymentMethod === "Cash on Delivery"
  ? "📦 Place Order"
  : `💳 Pay ₹${total}`}
    </>
  )}
</button>

        </div>

      </div>
	  {showBankLogin && (

<div className="bank-modal">

<div className="bank-card">

<h2>{bank} Net Banking</h2>

<input
placeholder="Username"
value={bankUsername}
onChange={(e)=>setBankUsername(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={bankPassword}
onChange={(e)=>setBankPassword(e.target.value)}
/>

<button
onClick={()=>{

if(!bankUsername || !bankPassword){

toast.error("Enter credentials");

return;

}

setShowBankLogin(false);
setShowOTPModal(true);

}}
>

Login

</button>

</div>

</div>

)}

{showOTPModal && (
  <OTPModal
    title="OTP Verification"
    onCancel={() => setShowOTPModal(false)}
    onVerify={async () => {

      setShowOTPModal(false);

      await handleRealPayment();

    }}
  />
)}

{showUPI && (

<UPIModal

total={total}

onClose={() => setShowUPI(false)}

onSelect={(app) => {

  toast.success(`${app} Selected`);

  setShowUPI(false);

  setShowOTPModal(true);

}}

/>

)}

    </>
  );
}

export default Payment;