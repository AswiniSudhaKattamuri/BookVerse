import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  getAddresses,
  updateAddress,
} from "../services/addressServices";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import "./AddAddress.css";

function EditAddress() {
  const { id } = useParams();
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

    if (location.state?.fromCheckout) {

      navigate("/payment");

    } else {

      navigate("/address");

    }

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
		<button
  className="back-page-btn"
  onClick={handleCancel}
>
  <ArrowLeft size={18} />
  Back
</button>

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

           <div className="address-btns">

  <button
    type="submit"
    className="save-btn"
  >
    Update Address
  </button>



</div>

          </form>

        </div>
      </div>
    </>
  );
}

export default EditAddress;