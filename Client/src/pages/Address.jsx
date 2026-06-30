import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  getAddresses,
  deleteAddress,
  setDefaultAddress,
} from "../services/addressServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Address.css";

function Address() {
  const [addresses, setAddresses] = useState([]);

  const navigate = useNavigate();
	const location = useLocation();
  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
  try {
    const data = await getAddresses();

    

    setAddresses(data.addresses);
  } catch (error) {
    console.log(error);
  }
};

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id);
      toast.success("Address Deleted");
      loadAddresses();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleDefault = async (id) => {
  try {

    await setDefaultAddress(id);

    toast.success("Delivery Address Selected");

    if (location.state?.fromCheckout) {

      navigate("/payment");

      return;

    }

    loadAddresses();

  } catch (error) {

    toast.error("Failed");

  }
};

  return (
    <>
      <Navbar />

      <div className="address-page">

    <div className="address-header">

  <div className="header-left">

    {location.state?.fromCheckout && (

      <button
        className="back-btn"
        onClick={() => navigate("/payment")}
      >
        ← Back
      </button>

    )}

    <h1>
      {location.state?.fromCheckout
        ? "Select Delivery Address"
        : "My Addresses"}
    </h1>

  </div>

  <button
    className="add-address-btn"
    onClick={() =>
      navigate("/add-address", {
        state: location.state,
      })
    }
  >
    + Add New Address
  </button>

</div>

    {addresses.length === 0 ? (

        <div className="no-address">

            <h2>No Address Found</h2>

            <p>Add your first delivery address.</p>

        </div>

    ) : (

        <div className="address-list">

            {addresses.map((address) => (

                <div
                    className="address-card"
                    key={address._id}
                >

                    <div className="address-top">

                        {address.isDefault && (
                            <span className="default-badge">
                                ⭐ Default
                            </span>
                        )}

                    </div>

                    <h3>{address.fullName}</h3>

                    <p>📞 {address.phone}</p>

                    <p>
                        📍 {address.house},
                        {" "}
                        {address.street}
                    </p>

                    <p>
                        {address.city},
                        {" "}
                        {address.state}
                    </p>

                    <p>{address.pincode}</p>

                    {address.landmark && (
                        <p>
                            Landmark :
                            {" "}
                            {address.landmark}
                        </p>
                    )}

                    <div className="address-actions">

                        {location.state?.fromCheckout ? (

    <button
        className="deliver-btn"
        onClick={() => handleDefault(address._id)}
    >
        Deliver Here
    </button>

) : (

    !address.isDefault && (

        <button
            className="deliver-btn"
            onClick={() => handleDefault(address._id)}
        >
            Set as Default
        </button>

    )

)}

                        <button
    className="edit-btn"
    onClick={() =>
  navigate(`/edit-address/${address._id}`, {
    state: location.state,
  })
}
>
    Edit
</button>

                        <button
                            className="delete-btn"
                            onClick={() =>
                                handleDelete(address._id)
                            }
                        >
                            Delete
                        </button>

                    </div>

                </div>

            ))}

        </div>

    )}

</div>
    </>
  );
}

export default Address;