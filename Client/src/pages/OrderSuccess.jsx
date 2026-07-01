import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./OrderSuccess.css";

function OrderSuccess() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="success-page">

        <div className="success-card">

          <div className="success-icon">
            <CheckCircle size={95} />
          </div>

          <h1>🎉 Order Confirmed!</h1>

          <p className="success-message">
            Your payment was successful and your books are now being prepared for shipment.
          </p>

          <div className="delivery-box">

            <h3>📦 Estimated Delivery</h3>

            <p>Within <strong>3 - 5 Business Days</strong></p>

          </div>

          <div className="success-buttons">

            <button
              className="orders-btn"
              onClick={() => navigate("/orders")}
            >
              📦 View My Orders
            </button>

            <button
              className="shop-btn"
              onClick={() => navigate("/")}
            >
              📚 Continue Shopping
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default OrderSuccess;