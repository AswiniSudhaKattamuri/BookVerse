import { Link } from "react-router-dom";
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import {useState} from "react";
import "./Footer.css";

function Footer() {
	const [email, setEmail] = useState("");
  return (
    <footer className="footer">

      <div className="footer-top"></div>

      <div className="footer-container">

        <div className="footer-about">

         <div className="footer-logo">
    
    <div>
        <h2> 📚 BookVerse</h2>
        <span className="tagline">
            Discover • Read • Explore
        </span>
    </div>
</div>

          <p>
            Your AI-powered online bookstore to
            discover, explore and enjoy your next
            favorite read.
          </p>

          <div className="newsletter">

            <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

           <button
  onClick={() => {

   if (!email.trim()) {
  toast.error("Please enter your email");
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  toast.error("Please enter a valid email address");
  return;
}

toast.success("🎉 Thanks for subscribing!");
setEmail("");

  }}
>
  <ArrowRight size={18} />
</button>					

          </div>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/wishlist">Wishlist</Link>

          <Link to="/orders">Orders</Link>

          <Link to="/profile">Profile</Link>

        </div>

        <div className="footer-links">

          <h3>Support</h3>

          <Link to="/">Help Center</Link>

          <Link to="/">Privacy Policy</Link>

          <Link to="/">Terms & Conditions</Link>

          <Link to="/">FAQs</Link>

        </div>

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>

            <Mail size={17} />

            support@bookverse.com

          </p>

          <p>

            <Phone size={17} />

            +91 78427 27933

          </p>

          <p>

            <MapPin size={17} />

            Balabhadrapuram, India

          </p>

        </div>

      </div>
  <div className="footer-stats">

    <div>
        <h3>15K+</h3>
        <p>Books</p>
    </div>

    <div>
        <h3>10K+</h3>
        <p>Readers</p>
    </div>

    <div>
        <h3>AI</h3>
        <p>Recommendations</p>
    </div>

</div>

      <div className="footer-bottom">

        <p>

          © 2026 BookVerse • Crafted with ❤️ by
          <strong> Aswini Sudha Kattamuri</strong>

        </p>

      </div>

    </footer>
  );
}

export default Footer;