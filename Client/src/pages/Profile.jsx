import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Profile.css";
import toast from "react-hot-toast";
import { getProfile, updateProfile } from "../services/userService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
function Profile() {

  const navigate = useNavigate();
  const { setCartCount } = useCart();
const { setWishlistCount } = useWishlist();

  const [user, setUser] = useState({});
  

const [editing, setEditing] = useState(false);
useEffect(() => {
  loadProfile();
}, []);

const loadProfile = async () => {
  try {

    const data = await getProfile();

    setUser(data);

  } catch (error) {

    console.log(error);

  }
};
const saveProfile=async()=>{

try{

await updateProfile(user);

toast.success("Profile Updated");

setEditing(false);

}

catch(error){

toast.error("Failed");

}

}

  return (
    <>
      <Navbar />

      <div className="profile-page">

        {/* Left Sidebar */}

        <div className="profile-sidebar">

          <div className="profile-card">

            <div className="avatar">
              👤
            </div>

            <h2>{user.name}</h2>

            {/* <p>BookVerse Reader</p> */}

          </div>

          <button onClick={() => navigate("/orders")}>
            📦 My Orders
          </button>

          <button onClick={() => navigate("/address")}>
            📍 My Addresses
          </button>

          <button onClick={() => navigate("/wishlist")}>
            ❤️ Wishlist
          </button>

         <button
  className="logout-btn"
  onClick={() => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setCartCount(0);
    setWishlistCount(0);

    toast.success("Logged Out");

    navigate("/login");

  }}
>
  🚪 Logout
</button>

        </div>

        {/* Right */}

        <div className="profile-content">

          <div className="section">

         <div className="section-header">

  <h2>Personal Information</h2>

  <div className="profile-buttons">

    {editing && (
      <button
        className="save-btn"
        onClick={saveProfile}
      >
        Save
      </button>
    )}

    <button
      onClick={() => setEditing(!editing)}
    >
      {editing ? "Cancel" : "Edit"}
    </button>

  </div>

</div>

            <div className="info-grid">

              <div>

                <label>Name</label>

                <input
  value={user.name || ""}
  readOnly={!editing}
  onChange={(e) =>
    setUser({
      ...user,
      name: e.target.value,
    })
  }
/>

              </div>

              <div>

                <label>Email</label>

                <input
  value={user.email || ""}
  readOnly={!editing}
  onChange={(e) =>
    setUser({
      ...user,
      email: e.target.value,
    })
  }
/>

              </div>

              <div>

                <label>Phone</label>

               <input
  value={user.phone || ""}
  readOnly={!editing}
  onChange={(e) =>
    setUser({
      ...user,
      phone: e.target.value,
    })
  }
/>
              </div>

              <div>

                <label>Member Since</label>

                <input
                value={
  user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : ""
}
                  readOnly
                />

              </div>

            </div>

          </div>

          <div className="stats">

            <div className="stat-card">

              <h3>📦</h3>

              <h2>{user.orderCount || 0}</h2>

              <p>Orders</p>

            </div>

            <div className="stat-card">

              <h3>❤️</h3>

              <h2>{user.wishlistCount || 0}</h2>

              <p>Wishlist</p>

            </div>

            <div className="stat-card">

              <h3>📍</h3>

              <h2>{user.addressCount || 0}</h2>

              <p>Addresses</p>

            </div>

          </div>

          <div className="section">

            <h2>Quick Actions</h2>

            <div className="actions">

              <button onClick={() => navigate("/orders")}>
                View Orders
              </button>

              <button onClick={() => navigate("/address")}>
                Manage Addresses
              </button>

              <button
onClick={()=>setEditing(true)}
>

Edit Profile

</button>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default Profile;