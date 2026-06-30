import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import { Toaster } from "react-hot-toast";
import { AIProvider } from "./context/AIContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AIBookProvider } from "./context/AIBookContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <AuthProvider>

  <CartProvider>

    <WishlistProvider>

      <AIProvider>
		<AIBookProvider>

        <Toaster />

        <App />
		</AIBookProvider>

      </AIProvider>

    </WishlistProvider>

  </CartProvider>

</AuthProvider>

  </StrictMode>
);