import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  getAddresses,
  updateAddress,
} from "../services/addressServices";
import toast from "react-hot-toast";
import "./AddAddress.css";

function EditAddress() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    loadAddress();
  }, []);

  const loadAddress = async () => {
    try {
      const data = await getAddresses();

      const address = data.addresses.find(
        (item) => item._id === id
      );

      if (address) {
        setFormData(address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateAddress(id, formData);

      toast.success("Address Updated Successfully 🎉");

      navigate("/address");
    } catch (error) {
      toast.error("Failed to Update Address");
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

          <h1>Edit Address</h1>

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

            <button type="submit">
              Update Address
            </button>

          </form>

        </div>
      </div>
    </>
  );
}

export default EditAddress;