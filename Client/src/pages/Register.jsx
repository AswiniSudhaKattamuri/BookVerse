import "../pages/Register.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (value === "") {
      setPasswordError("");
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be 7 characters and include uppercase, lowercase, number and special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        name,
        email,
        password,
      });

      toast.success("Registration Successful!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-overlay">
        <div className="register-card">
          <h1 className="logo">📚 BookVerse</h1>

          <h2>Create Account</h2>
          <p>Join BookVerse and start your reading journey</p>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              className="register-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              className="register-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="register-input"
                value={password}
                onChange={handlePasswordChange}
                required
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </span>
            </div>

            {passwordError && (
              <p className="password-error">
                {passwordError}
              </p>
            )}

            <div className="password-container">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                className="register-input"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </span>
            </div>

            <button
              type="submit"
              className="register-btn"
            >
              Create Account
            </button>
          </form>

          <p className="bottom-text">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;