import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <AuthProvider>

      <CartProvider>

        <WishlistProvider>

          <Toaster position="top-right" />

          <App />

        </WishlistProvider>

      </CartProvider>

    </AuthProvider>

  </StrictMode>
);