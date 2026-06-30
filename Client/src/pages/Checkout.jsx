import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCart } from "../services/cartService";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAddresses } from "../services/addressServices";
function Checkout() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
	const [address, setAddress] = useState(null);
  useEffect(() => {
  loadCart();
  loadAddress();
}, []);
const loadCart = async () => {
  try {

    const data = await getCart();

    const items = data.cart?.items || [];

    setCart(items);

    if (items.length === 0) {

      toast.error("Your cart is empty");

      navigate("/cart");

    }

  } catch (error) {

    console.log(error);

  }
};

 
  const subtotal = cart.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

const deliveryCharge =
  subtotal === 0
    ? 0
    : subtotal > 999
    ? 0
    : 50;
  const discount = Math.floor(subtotal * 0.1);
  const total = subtotal + deliveryCharge - discount;
const navigate = useNavigate();

const handlePlaceOrder = async () => {
  try {

    await placeOrder(paymentMethod);

    toast.success("Order Placed Successfully 🎉");

    navigate("/order-success");

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to Place Order"
    );

  }
};

const loadAddress = async () => {
  try {

    const data = await getAddresses();

    const defaultAddress =
      data.addresses.find(
        (item) => item.isDefault
      ) || data.addresses[0];

    setAddress(defaultAddress || null);

  } catch (error) {
    console.log(error);
  }
};

const handleContinue = () => {

  if (!address) {

    toast.error("Please add a delivery address");

    navigate("/address");

    return;

  }

  navigate("/payment");

};
  return (
    <>
      <Navbar />

      <div className="checkout-container">
        <div className="checkout-left">
          <div className="address-card">
            <h2>📍 Delivery Address</h2>

            <div className="address-box">

{address ? (

  <>

    <h3>{address.fullName}</h3>

    <p>

      {address.house}

      <br/>

      {address.street}

      <br/>

      {address.city},

      {address.state}

      <br/>

      {address.pincode}

    </p>

    <p>
      📞 {address.phone}
    </p>

    <button
  className="change-address"
  onClick={() =>
  navigate("/address", {
    state: {
      fromCheckout: true,
    },
  })
}
>
  Change Address
</button>

  </>

) : (

  <>

    <h3>No Address Found</h3>

    <p>
      Please add a delivery address.
    </p>

    <button
  className="continue-address-btn"
  onClick={() =>
  navigate("/address", {
    state: {
      fromCheckout: true,
    },
  })
}
>
  + Add Address
</button>

  </>

)}

</div>
			

            <h2 className="summary-heading">
              📚 Order Summary
            </h2>

            {cart.map((item) => (
              <div className="checkout-item" key={item.book._id}>
                <img
                  src={item.book.image}
                  alt={item.book.title}
                />

                <div>
                  <h3>{item.book.title}</h3>
                  <p>{item.book.author}</p>
                  <h4>₹{item.book.price}</h4>
                  <p>Quantity : {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-right">
          <h2>Price Details</h2>

          <div className="price-row">
            <span>Price ({cart.length} Items)</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="price-row">
            <span>Delivery Charges</span>
            <span>
              {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
            </span>
          </div>

          <div className="price-row">
            <span>Discount</span>
            <span className="green">- ₹{discount}</span>
          </div>

          <hr />

          <div className="price-row total-row">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>
		  <button
  className="place-order-btn"
  onClick={handleContinue}
>
  CONTINUE
</button>

          
        </div>
      </div>
    </>
  );
}

export default Checkout;