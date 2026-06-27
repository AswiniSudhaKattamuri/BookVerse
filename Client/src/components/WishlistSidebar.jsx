import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { User, Heart, Package, LogOut } from "lucide-react";

function WishlistSidebar() {
  const storedUser = localStorage.getItem("user");

const [user, setUser] = useState(
  storedUser && storedUser !== "undefined"
    ? JSON.parse(storedUser)
    : null
);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();

        if (data.user) {
          setUser(data.user);
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="wishlist-sidebar">
      <div className="profile-card">
        <div className="profile-avatar">
          <User size={40} />
        </div>

        <div>
          <p>Hello,</p>
          <h3>{user?.name || "Guest"}</h3>
        </div>
      </div>

      <div className="sidebar-menu">
        <div className="menu-item">
          <Package size={20} />
          <span>My Orders</span>
        </div>

        <div className="menu-item active">
          <Heart size={20} />
          <span>My Wishlist</span>
        </div>

        <div className="menu-item">
          <User size={20} />
          <span>Profile</span>
        </div>

        <div className="menu-item" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default WishlistSidebar;