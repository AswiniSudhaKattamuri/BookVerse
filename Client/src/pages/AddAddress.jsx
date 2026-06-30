import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addAddress } from "../services/addressServices";
import toast from "react-hot-toast";
import "./AddAddress.css";



function AddAddress() {
  const navigate = useNavigate();
	const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addAddress(formData);

      if (location.state?.fromCheckout) {

  toast.success("Address Saved");

  navigate("/payment");

} else {

  toast.success("Address Saved");

  navigate("/address");

}
    } catch (error) {
      toast.error("Failed to Add Address");
    }
  };
  const handleCancel = () => {

  if (location.state?.fromCheckout) {

    navigate("/payment");

  } else {

    navigate("/address");

  }

};

  return (
    <>
      <Navbar />

      <div className="add-address-page">
        <div className="add-address-card">
          <h1>Add New Address</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="house"
              placeholder="House / Flat No"
              value={formData.house}
              onChange={handleChange}
            />

            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
            />

            <div className="row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
              />

              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
            </div>

            <div className="address-btns">

  <button
    type="submit"
    className="save-btn"
  >
    Save Address
  </button>

  <button
    type="button"
    className="cancel-btn"
    onClick={handleCancel}
  >
    Cancel
  </button>

</div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddAddress;