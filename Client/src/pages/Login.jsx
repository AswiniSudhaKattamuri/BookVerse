import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import "../pages/Login.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const { loadCartCount } = useCart();
const { loadWishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

await loadCartCount();
await loadWishlistCount();

toast.success("Login Successful!");
navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-card">
          <h1 className="logo">📚 BookVerse</h1>

          <h2>Welcome Back</h2>
          <p>Sign in to continue your reading journey</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </span>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="bottom-text">
            Don't have an account?{" "}
            <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;