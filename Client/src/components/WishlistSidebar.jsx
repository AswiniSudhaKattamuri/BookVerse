import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";
import "./WishlistSidebar.css";
import {
  User,
  Heart,
  Package,
  LogOut,
  MapPin,
  ShoppingCart,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";

function WishlistSidebar() {
  const storedUser = localStorage.getItem("user");
  const navigate = useNavigate();
const location = useLocation();

const { cartCount } = useCart();
const { wishlistCount } = useWishlist();

const [user, setUser] = useState(
  storedUser && storedUser !== "undefined"
    ? JSON.parse(storedUser)
    : null
);

  useEffect(() => {
    const loadProfile = async () => {
  try {

    const data = await getProfile();

    setUser(data);

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

  } catch (error) {

    console.log(error);

  }
};

    loadProfile();
  }, []);

 const handleLogout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  toast.success("Logged out successfully 👋");

  navigate("/login");

};

  return (
    <div className="wishlist-sidebar">
     <div className="profile-card">

  <div className="profile-avatar">

    {user?.name
      ? user.name.charAt(0).toUpperCase()
      : "G"}

  </div>

  <div>

    <p>Welcome Back 👋</p>

    <h3>{user?.name || "Guest"}</h3>

   

  </div>

</div>

      <div className="sidebar-menu">

  <div
    className={`menu-item ${
      location.pathname === "/orders"
        ? "active"
        : ""
    }`}
    onClick={() => navigate("/orders")}
  >
    <Package size={20} />
    <span>My Orders</span>
  </div>

  <div
    className={`menu-item ${
      location.pathname === "/wishlist"
        ? "active"
        : ""
    }`}
    onClick={() => navigate("/wishlist")}
  >
    <Heart size={20} />
    <span>Wishlist ({wishlistCount})</span>
  </div>

  <div
    className={`menu-item ${
      location.pathname === "/profile"
        ? "active"
        : ""
    }`}
    onClick={() => navigate("/profile")}
  >
    <User size={20} />
    <span>Profile</span>
  </div>

  <div
    className={`menu-item ${
      location.pathname === "/address"
        ? "active"
        : ""
    }`}
    onClick={() => navigate("/address")}
  >
    <MapPin size={20} />
    <span>Addresses</span>
  </div>

  <div
  className={`menu-item ${
    location.pathname === "/cart"
      ? "active"
      : ""
  }`}
  onClick={() => navigate("/cart")}
>
  <ShoppingCart size={20} />
  <span>Cart ({cartCount})</span>
</div>

  <div
    className="menu-item logout"
    onClick={handleLogout}
  >
    <LogOut size={20} />
    <span>Logout</span>
  </div>

</div>
    </div>
  );
}

export default WishlistSidebar;