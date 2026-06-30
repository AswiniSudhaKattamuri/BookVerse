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

                    <CheckCircle
                        size={90}
                        color="#22c55e"
                    />

                    <h1>
                        Order Placed Successfully!
                    </h1>

                    <p>
                        Thank you for shopping with BookVerse.
                    </p>

                    <button
                        onClick={() => navigate("/orders")}
                    >
                        View My Orders
                    </button>

                </div>

            </div>
        </>
    );
}

export default OrderSuccess;